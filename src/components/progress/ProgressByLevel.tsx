"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Sparkles, CheckCircle2, Hammer, Target } from "lucide-react";
import { useProgressStore, useIsHydrated } from "@/stores/progressStore";
import { tricks, getTricksByLevel } from "@/data/tricks";
import { computeAvailability } from "@/data/relations";
import type { TrickStatus } from "@/types";
import { cn } from "@/lib/utils";

export function ProgressByLevel() {
  const t = useTranslations("levels");
  const tProgress = useTranslations("progress");
  const hydrated = useIsHydrated();
  const raw = useProgressStore((s) => s.status);

  const merged: Record<string, TrickStatus> = {};
  for (const tr of tricks) {
    merged[tr.id] = (raw[tr.id] as TrickStatus) ?? "available";
  }
  const derived = hydrated ? computeAvailability(merged) : merged;

  return (
    <div className="space-y-3">
      {([1, 2, 3, 4, 5, 6, 7, 8] as const).map((lvl) => {
        const list = getTricksByLevel(lvl);
        const mastered = list.filter((tr) => derived[tr.id] === "mastered").length;
        const total = list.length;
        const pct = total > 0 ? (mastered / total) * 100 : 0;
        return (
          <div key={lvl} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                L{lvl} · {t(`${lvl}.title` as `levels.${1|2|3|4|5|6|7|8}.title`)}
              </span>
              <span className="text-xs text-muted-foreground">
                {mastered}/{total}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
