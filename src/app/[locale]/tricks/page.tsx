import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CatalogView } from "@/components/tricks/CatalogView";

export default async function TricksCatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("catalog");
  return (
    <div className="container py-10 space-y-6">
      <header className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </header>
      <Suspense fallback={null}>
        <CatalogView />
      </Suspense>
    </div>
  );
}
