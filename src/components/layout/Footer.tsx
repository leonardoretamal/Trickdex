import { useTranslations } from "next-intl";
import { Github } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/60 py-8 mt-16">
      <div className="container flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <p>{t("madeWith")}</p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          {t("viewSource")}
        </a>
      </div>
    </footer>
  );
}
