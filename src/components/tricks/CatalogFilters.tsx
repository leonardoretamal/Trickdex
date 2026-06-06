"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TrickFamily, TrickStatus } from "@/types";

const FAMILIES: TrickFamily[] = [
  "flip",
  "twist",
  "kick",
  "vault",
  "ground",
  "transition",
];

const STATUSES: TrickStatus[] = [
  "available",
  "learning",
  "mastered",
  "locked",
];

export function CatalogFilters() {
  const t = useTranslations("catalog");
  const tFamilies = useTranslations("families");
  const tStatus = useTranslations("status");
  const router = useRouter();
  const searchParams = useSearchParams();

  const level = searchParams.get("level") ?? "";
  const family = searchParams.get("family") ?? "";
  const status = searchParams.get("status") ?? "";
  const q = searchParams.get("q") ?? "";

  const setParam = React.useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (!value) next.delete(key);
      else next.set(key, value);
      const qs = next.toString();
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router, searchParams]
  );

  const clear = () => router.replace("?", { scroll: false });

  const hasFilters = !!(level || family || status || q);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchPlaceholder")}
            defaultValue={q}
            onChange={(e) => setParam("q", e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={level || "all"}
          onValueChange={(v) => setParam("level", v === "all" ? "" : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filterLevel")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filterLevel")}: {t("all")}</SelectItem>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((l) => (
              <SelectItem key={l} value={String(l)}>
                L{l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={family || "all"}
          onValueChange={(v) => setParam("family", v === "all" ? "" : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filterFamily")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filterFamily")}: {t("all")}</SelectItem>
            {FAMILIES.map((f) => (
              <SelectItem key={f} value={f}>
                {tFamilies(f)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={status || "all"}
          onValueChange={(v) => setParam("status", v === "all" ? "" : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filterStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filterStatus")}: {t("all")}</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {tStatus(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clear}>
          <X className="mr-1 h-3 w-3" />
          {t("clearFilters")}
        </Button>
      )}
    </div>
  );
}
