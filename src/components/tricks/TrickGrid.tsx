"use client";

import * as React from "react";
import type { Trick, TrickStatus } from "@/types";
import { TrickCard } from "./TrickCard";
import { useProgressStore, useIsHydrated } from "@/stores/progressStore";

export interface TrickGridProps {
  tricks: Trick[];
}

export function TrickGrid({ tricks }: TrickGridProps) {
  const hydrated = useIsHydrated();
  const derived = useProgressStore((s) => s.getDerived);

  // Antes de hidratar, mostramos todo como "available" para evitar mismatch.
  const statuses: Record<string, TrickStatus> = hydrated ? derived() : {};

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tricks.map((trick) => (
        <TrickCard
          key={trick.id}
          trick={trick}
          status={statuses[trick.id] ?? "available"}
        />
      ))}
    </div>
  );
}
