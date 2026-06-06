"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, BookOpen, Zap, ArrowRight } from "lucide-react";
import type { Trick, TrickStatus } from "@/types";
import { getTrickById } from "@/data/tricks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MediaPreview } from "./MediaPreview";
import { LevelBadge } from "./LevelBadge";
import { ProgressToggle } from "@/components/progress/ProgressToggle";
import { StatusBadge } from "./StatusBadge";
import { useProgressStore, useIsHydrated } from "@/stores/progressStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { computeAvailability } from "@/data/relations";
import { tricks } from "@/data/tricks";
import { Label } from "@/components/ui/label";

export interface TrickDetailProps {
  trick: Trick;
}

export function TrickDetail({ trick }: TrickDetailProps) {
  const t = useTranslations();
  const tPage = useTranslations("trickPage");
  const tNav = useTranslations("nav");
  const hydrated = useIsHydrated();
  const status = useProgressStore((s) => s.status[trick.id]);
  const note = useProgressStore((s) => s.notes[trick.id]) ?? "";
  const setStatus = useProgressStore((s) => s.setStatus);
  const setNote = useProgressStore((s) => s.setNote);

  const derived: Record<string, TrickStatus> = React.useMemo(() => {
    const raw = useProgressStore.getState().status;
    const merged: Record<string, TrickStatus> = {};
    for (const tr of tricks) {
      merged[tr.id] = (raw[tr.id] as TrickStatus) ?? "available";
    }
    return hydrated ? computeAvailability(merged) : merged;
  }, [hydrated]);

  const currentStatus = status
    ? status
    : derived[trick.id] ?? "available";

  const handleStatusChange = (s: TrickStatus) => {
    setStatus(trick.id, s);
  };

  const prereqs = trick.prerequisites
    .map((id) => getTrickById(id))
    .filter((t): t is Trick => Boolean(t));
  const variations = trick.variations
    .map((id) => getTrickById(id))
    .filter((t): t is Trick => Boolean(t));
  const entries = trick.entries
    .map((id) => getTrickById(id))
    .filter((t): t is Trick => Boolean(t));
  const exits = trick.exits
    .map((id) => getTrickById(id))
    .filter((t): t is Trick => Boolean(t));

  const name = t(`tricks.${trick.id}.name`);
  const description = t(`tricks.${trick.id}.description`);
  // `tips` es opcional. Comprobamos con `has` para evitar logs de
  // MISSING_MESSAGE en build para trucos que aún no tienen tips.
  const tipsKey = `tricks.${trick.id}.tips` as Parameters<typeof t.has>[0];
  const tips = t.has(tipsKey) ? t(tipsKey) : null;

  return (
    <div className="container py-8 space-y-8">
      <Link
        href="/tricks"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {tNav("tricks")}
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr,1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <LevelBadge level={trick.level} />
            <StatusBadge status={currentStatus} />
            <Badge variant="muted">
              {t(`families.${trick.family}` as `families.${Trick["family"]}`)}
            </Badge>
            <Badge variant="outline">
              {tPage("difficulty")} {trick.difficulty}/5
            </Badge>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {name}
          </h1>
          <MediaPreview media={trick.media} alt={name} className="shadow-lg" />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4" />
                {tNav("about")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{description}</p>
              {tips && (
                <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-foreground">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {tPage("tip")}
                  </p>
                  <p className="mt-1">{tips}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {tPage("yourProgress")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressToggle
                trickId={trick.id}
                status={currentStatus}
                onChange={handleStatusChange}
              />
              <div className="space-y-2">
                <Label htmlFor="note" className="text-sm">
                  {tPage("addNote")}
                </Label>
                <Textarea
                  id="note"
                  placeholder={tPage("notePlaceholder")}
                  defaultValue={note}
                  onBlur={(e) => setNote(trick.id, e.target.value)}
                />
                <p className="text-[11px] text-muted-foreground">
                  {tPage("saveNote")}
                </p>
              </div>
            </CardContent>
          </Card>

          <RelationCard
            title={tPage("prerequisites")}
            items={prereqs}
            statusMap={derived}
            emptyText={tPage("none")}
          />
          <RelationCard
            title={tPage("variations")}
            items={variations}
            statusMap={derived}
            emptyText={tPage("none")}
          />
          <RelationCard
            title={tPage("entries")}
            items={entries}
            statusMap={derived}
            emptyText={tPage("none")}
          />
          <RelationCard
            title={tPage("exits")}
            items={exits}
            statusMap={derived}
            emptyText={tPage("none")}
          />
        </aside>
      </div>
    </div>
  );
}

function RelationCard({
  title,
  items,
  statusMap,
  emptyText,
}: {
  title: string;
  items: Trick[];
  statusMap: Record<string, TrickStatus>;
  emptyText: string;
}) {
  const t = useTranslations();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Zap className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{emptyText}</p>
        ) : (
          <ul className="space-y-1.5">
            {items.map((tr) => (
              <li key={tr.id}>
                <Link
                  href={`/tricks/${tr.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-md border border-border/40 bg-card px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: `hsl(var(--level-${tr.level}))` }}
                      aria-hidden
                    />
                    {t(`tricks.${tr.id}.name`)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    L{tr.level}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
