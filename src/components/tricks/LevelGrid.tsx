"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Sparkles, CheckCircle2, Lock, CircleDashed, Hammer, Zap, ArrowUp, Sun, RotateCw, Footprints, Repeat } from "lucide-react";
import type { Level, TrickStatus } from "@/types";
import { cn } from "@/lib/utils";
import { useProgressStore, useIsHydrated } from "@/stores/progressStore";
import { getTricksByLevel } from "@/data/tricks";

const ICONS: Record<Level, React.ComponentType<{ className?: string }>> = {
  1: Sun,
  2: ArrowUp,
  3: RotateCw,
  4: Footprints,
  5: Hammer,
  6: Zap,
  7: Sparkles,
  8: Repeat,
};

const STYLES: Record<Level, string> = {
  1: "from-[hsl(var(--level-1))]/15 to-transparent border-[hsl(var(--level-1))]/30",
  2: "from-[hsl(var(--level-2))]/15 to-transparent border-[hsl(var(--level-2))]/30",
  3: "from-[hsl(var(--level-3))]/15 to-transparent border-[hsl(var(--level-3))]/30",
  4: "from-[hsl(var(--level-4))]/15 to-transparent border-[hsl(var(--level-4))]/30",
  5: "from-[hsl(var(--level-5))]/15 to-transparent border-[hsl(var(--level-5))]/30",
  6: "from-[hsl(var(--level-6))]/15 to-transparent border-[hsl(var(--level-6))]/30",
  7: "from-[hsl(var(--level-7))]/15 to-transparent border-[hsl(var(--level-7))]/30",
  8: "from-[hsl(var(--level-8))]/15 to-transparent border-[hsl(var(--level-8))]/30",
};

export function LevelGrid() {
  const t = useTranslations("levels");
  const hydrated = useIsHydrated();
  const derived = useProgressStore((s) => s.getDerived);

  const statuses: Record<string, TrickStatus> = hydrated ? derived() : {};

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {([1, 2, 3, 4, 5, 6, 7, 8] as Level[]).map((lvl) => {
        const tricks = getTricksByLevel(lvl);
        const mastered = tricks.filter(
          (t) => statuses[t.id] === "mastered"
        ).length;
        const learning = tricks.filter(
          (t) => statuses[t.id] === "learning"
        ).length;
        const total = tricks.length;
        const Icon = ICONS[lvl];
        const progressPct = total > 0 ? (mastered / total) * 100 : 0;
        return (
          <Link
            key={lvl}
            href={{
              pathname: "/tricks",
              query: { level: String(lvl) },
            }}
            className={cn(
              "group relative flex flex-col gap-3 overflow-hidden rounded-lg border bg-card p-5 transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "bg-gradient-to-br",
              STYLES[lvl]
            )}
          >
            <div className="flex items-start justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-background/60 text-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                L{lvl}
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">
                {t(`${lvl}.title` as `levels.${Level}.title`)}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {t(`${lvl}.description` as `levels.${Level}.description`)}
              </p>
            </div>
            <div className="mt-auto space-y-2">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>
                  {mastered}/{total}
                </span>
                <span className="flex items-center gap-1">
                  {learning > 0 && (
                    <>
                      <Sparkles className="h-3 w-3 text-neon-cyan" />
                      {learning}
                    </>
                  )}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
