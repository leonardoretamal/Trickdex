import { setRequestLocale, getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="container max-w-3xl py-10 space-y-8">
      <header className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </header>

      <Section title={t("whatIsTitle")} body={t("whatIsBody")} />
      <Section title={t("philosophyTitle")} body={t("philosophyBody")} />
      <Section title={t("dataTitle")} body={t("dataBody")} />
      <Section title={t("roadmapTitle")} body={t("roadmapBody")} />
      <Section title={t("creditsTitle")} body={t("creditsBody")} />
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </CardContent>
    </Card>
  );
}
