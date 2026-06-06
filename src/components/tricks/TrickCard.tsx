"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  RotateCcw,
  RotateCw,
  Zap,
  TrendingUp,
  Circle,
  ArrowLeftRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Trick, TrickStatus, TrickFamily } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { MediaPreview } from "./MediaPreview";
import { LevelBadge } from "./LevelBadge";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

const FAMILY_ICON: Record<TrickFamily, LucideIcon> = {
  flip: RotateCcw,
  twist: RotateCw,
  kick: Zap,
  vault: TrendingUp,
  ground: Circle,
  transition: ArrowLeftRight,
};

export interface TrickCardProps {
  trick: Trick;
  status?: TrickStatus;
  className?: string;
}

export function TrickCard({ trick, status = "available", className }: TrickCardProps) {
  const t = useTranslations();
  const name = t(`tricks.${trick.id}.name`);
  const short = t(`tricks.${trick.id}.short`);

  return (
    <Link
      href={`/tricks/${trick.slug}`}
      className={cn("group block focus:outline-none", className)}
    >
      <Card className="h-full overflow-hidden border-border/60 transition-all group-hover:border-primary/40 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="relative">
          <MediaPreview media={trick.media} alt={name} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <CardContent className="space-y-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <LevelBadge level={trick.level} />
            <StatusBadge status={status} />
          </div>
          <div>
            <h3 className="font-semibold leading-tight">{name}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {short}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            {(() => {
              const FamilyIcon = FAMILY_ICON[trick.family];
              return <FamilyIcon className="h-3 w-3" aria-hidden />;
            })()}
            <span>{t(`families.${trick.family}` as `families.${TrickFamily}`)}</span>
            <span className="mx-1">·</span>
            <span>
              {t("trickPage.difficulty")} {trick.difficulty}/5
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
