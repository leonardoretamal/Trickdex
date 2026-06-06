"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { TrickStatus } from "@/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, Sparkles, Lock } from "lucide-react";

export interface ProgressToggleProps {
  trickId: string;
  status: TrickStatus;
  onChange: (status: TrickStatus) => void;
}

const OPTIONS: { value: TrickStatus; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "locked", icon: Lock },
  { value: "available", icon: Sparkles },
  { value: "learning", icon: Sparkles },
  { value: "mastered", icon: CheckCircle2 },
];

export function ProgressToggle({ status, onChange }: ProgressToggleProps) {
  const t = useTranslations("status");
  const tTrick = useTranslations("trickPage");

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{tTrick("setStatus")}</p>
      <div
        role="radiogroup"
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const active = status === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-colors",
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background hover:bg-accent"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {t(opt.value)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
