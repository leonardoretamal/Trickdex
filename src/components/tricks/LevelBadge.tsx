import * as React from "react";
import { useTranslations } from "next-intl";
import type { Level } from "@/types";
import { cn } from "@/lib/utils";

const levelClass: Record<Level, string> = {
  1: "bg-level-1/20 text-[hsl(var(--level-1))] border-[hsl(var(--level-1))]/40",
  2: "bg-level-2/20 text-[hsl(var(--level-2))] border-[hsl(var(--level-2))]/40",
  3: "bg-level-3/20 text-[hsl(var(--level-3))] border-[hsl(var(--level-3))]/40",
  4: "bg-level-4/20 text-[hsl(var(--level-4))] border-[hsl(var(--level-4))]/40",
  5: "bg-level-5/20 text-[hsl(var(--level-5))] border-[hsl(var(--level-5))]/40",
  6: "bg-level-6/20 text-[hsl(var(--level-6))] border-[hsl(var(--level-6))]/40",
  7: "bg-level-7/20 text-[hsl(var(--level-7))] border-[hsl(var(--level-7))]/40",
  8: "bg-level-8/20 text-[hsl(var(--level-8))] border-[hsl(var(--level-8))]/40",
};

export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  const t = useTranslations("levels");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        levelClass[level],
        className
      )}
    >
      L{level} · {t(`${level}.title` as `levels.${Level}.title`)}
    </span>
  );
}
