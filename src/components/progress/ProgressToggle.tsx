"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
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

  // Si el truco está bloqueado, ningún botón es accionable. La opción
  // "locked" tampoco es nunca accionable por el usuario: ese estado es
  // derivado de los prerequisitos, no algo que se pueda fijar a mano.
  const groupDisabled = status === "locked";

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{tTrick("setStatus")}</p>
      <div
        role="radiogroup"
        aria-disabled={groupDisabled}
        className={cn(
          "grid grid-cols-2 gap-2 sm:grid-cols-4",
          groupDisabled && "opacity-60"
        )}
      >
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const active = status === opt.value;
          const optionDisabled = groupDisabled || opt.value === "locked";
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              aria-disabled={optionDisabled}
              disabled={optionDisabled}
              onClick={() => {
                if (optionDisabled) return;
                onChange(opt.value);
              }}
              title={
                opt.value === "locked"
                  ? tTrick("lockedHint")
                  : undefined
              }
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background hover:bg-accent",
                optionDisabled &&
                  "cursor-not-allowed border-border/60 bg-muted text-muted-foreground hover:bg-muted"
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
