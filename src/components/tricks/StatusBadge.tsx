import * as React from "react";
import { useTranslations } from "next-intl";
import { Lock, CheckCircle2, Sparkles, CircleDashed } from "lucide-react";
import type { TrickStatus } from "@/types";
import { cn } from "@/lib/utils";

const STYLES: Record<TrickStatus, string> = {
  locked:
    "bg-muted text-muted-foreground border-border",
  available:
    "bg-secondary text-secondary-foreground border-border",
  learning:
    "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/40",
  mastered:
    "bg-neon-lime/15 text-neon-lime border-neon-lime/40",
};

const ICONS: Record<TrickStatus, React.ComponentType<{ className?: string }>> = {
  locked: Lock,
  available: CircleDashed,
  learning: Sparkles,
  mastered: CheckCircle2,
};

export function StatusBadge({ status }: { status: TrickStatus }) {
  const t = useTranslations("status");
  const Icon = ICONS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        STYLES[status]
      )}
    >
      <Icon className="h-3 w-3" />
      {t(status)}
    </span>
  );
}
