import { setRequestLocale, getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressStats } from "@/components/progress/ProgressStats";
import { ProgressByLevel } from "@/components/progress/ProgressByLevel";
import { ProgressActions } from "@/components/progress/ProgressActions";

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("progress");

  return (
    <div className="container py-10 space-y-8">
      <header className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">{t("summary")}</h2>
        <ProgressStats />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">{t("byLevel")}</h2>
        <Card>
          <CardContent className="p-5">
            <ProgressByLevel />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <ProgressActions />
      </section>
    </div>
  );
}
