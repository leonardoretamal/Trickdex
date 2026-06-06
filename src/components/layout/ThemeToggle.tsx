"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ThemeChoice = "light" | "dark" | "system";

const OPTIONS: { value: ThemeChoice }[] = [
  { value: "light" },
  { value: "dark" },
  { value: "system" },
];

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("common");

  // `theme` es el valor crudo (puede ser "system"); `resolvedTheme` es el
  // tema realmente aplicado ("light" | "dark"). El check debe resaltar la
  // opción cruda del usuario, no el resuelto.
  const current = (theme as ThemeChoice) ?? "system";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("theme")}>
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t("theme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {OPTIONS.map((opt) => {
          const active = current === opt.value;
          return (
            <DropdownMenuItem
              key={opt.value}
              role="menuitemradio"
              aria-checked={active}
              onClick={() => setTheme(opt.value)}
              className={cn(
                "justify-between",
                active && "bg-primary/10 text-primary focus:bg-primary/15 focus:text-primary"
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Check
                  className={cn(
                    "h-3.5 w-3.5 transition-opacity",
                    active ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden
                />
                {t(`theme${opt.value.charAt(0).toUpperCase()}${opt.value.slice(1)}`)}
              </span>
              {active && <span className="sr-only"> ({t("active")})</span>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
