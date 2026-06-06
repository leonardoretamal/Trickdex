"use client";

import * as React from "react";
import type { MediaClip } from "@/types";
import { cn } from "@/lib/utils";

export interface MediaPreviewProps {
  media: MediaClip[];
  alt: string;
  className?: string;
}

/**
 * Renderiza un preview en loop. Prefiere webm, fallback mp4, y siempre muestra
 * un poster cuando esté disponible. Si no hay video, muestra el poster como
 * placeholder.
 */
export function MediaPreview({ media, alt, className }: MediaPreviewProps) {
  const webm = media.find((m) => m.kind === "webm");
  const mp4 = media.find((m) => m.kind === "mp4");
  const gif = media.find((m) => m.kind === "gif");
  const poster = media.find((m) => m.kind === "poster");

  const hasVideo = Boolean(webm || mp4);
  const sources: { type: string; src: string }[] = [];
  if (webm) sources.push({ type: "video/webm", src: webm.src });
  if (mp4) sources.push({ type: "video/mp4", src: mp4.src });

  if (!hasVideo && !gif && !poster) {
    return (
      <div
        className={cn(
          "flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted text-xs text-muted-foreground",
          className
        )}
      >
        —
      </div>
    );
  }

  if (!hasVideo && gif) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={gif.src}
        alt={alt}
        className={cn(
          "aspect-video w-full rounded-md object-cover",
          className
        )}
      />
    );
  }

  return (
    <video
      className={cn(
        "aspect-video w-full rounded-md object-cover bg-muted",
        className
      )}
      autoPlay
      loop
      muted
      playsInline
      poster={poster?.src}
      aria-label={alt}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
