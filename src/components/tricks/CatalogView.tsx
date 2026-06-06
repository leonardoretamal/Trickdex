"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { tricks } from "@/data/tricks";
import { CatalogFilters } from "./CatalogFilters";
import { TrickGrid } from "./TrickGrid";

export function CatalogView() {
  const t = useTranslations("catalog");
  const tTricks = useTranslations();
  const searchParams = useSearchParams();

  const level = searchParams.get("level");
  const family = searchParams.get("family");
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.toLowerCase().trim() ?? "";

  const filtered = React.useMemo(() => {
    return tricks.filter((tr) => {
      if (level && String(tr.level) !== level) return false;
      if (family && tr.family !== family) return false;
      if (q) {
        const name = tTricks(`tricks.${tr.id}.name`);
        const short = tTricks(`tricks.${tr.id}.short`);
        if (
          !name.toLowerCase().includes(q) &&
          !short.toLowerCase().includes(q) &&
          !tr.id.includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [level, family, q, tTricks]);

  return (
    <div className="space-y-6">
      <CatalogFilters />
      <p className="text-sm text-muted-foreground">
        {t("resultsCount", { count: filtered.length })}
      </p>
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground">
          {t("empty")}
        </div>
      ) : (
        <TrickGrid tricks={filtered} />
      )}
    </div>
  );
}
