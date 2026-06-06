"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useProgressStore, useIsHydrated } from "@/stores/progressStore";
import { tricks } from "@/data/tricks";
import { computeAvailability } from "@/data/relations";
import type { TrickStatus } from "@/types";

export function ProgressStats() {
  const t = useTranslations("progress");
  const hydrated = useIsHydrated();
  const raw = useProgressStore((s) => s.status);

  // Recalcular derivado a partir del estado crudo + reglas de disponibilidad
  const merged: Record<string, TrickStatus> = {};
  for (const tr of tricks) {
    merged[tr.id] = (raw[tr.id] as TrickStatus) ?? "available";
  }
  const derived = hydrated ? computeAvailability(merged) : merged;

  const counts = { mastered: 0, learning: 0, available: 0, locked: 0 };
  for (const v of Object.values(derived)) {
    counts[v]++;
  }
  const total = tricks.length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat label={t("totalTricks")} value={total} />
      <Stat label={t("mastered")} value={counts.mastered} tone="lime" />
      <Stat label={t("learning")} value={counts.learning} tone="cyan" />
      <Stat label={t("available")} value={counts.available} tone="muted" />
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number;
  tone?: "default" | "lime" | "cyan" | "muted";
}) {
  const toneClass = {
    default: "",
    lime: "text-neon-lime",
    cyan: "text-neon-cyan",
    muted: "text-muted-foreground",
  }[tone];
  return (
    <div className="rounded-lg border border-border/60 bg-card p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`mt-1 font-display text-2xl font-bold ${toneClass}`}>
        {value}
      </p>
    </div>
  );
}
