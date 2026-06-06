import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles, Network, BookOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelGrid } from "@/components/tricks/LevelGrid";
import { TrickGrid } from "@/components/tricks/TrickGrid";
import { tricks } from "@/data/tricks";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const featured = tricks.filter((tr) =>
    ["backflip", "butterfly-kick", "full", "tornado"].includes(tr.id)
  );

  return (
    <div className="container py-10 space-y-12">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" />
          MVP · v0.1
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-balance">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" variant="neon">
            <Link href="/tricks?level=1">
              {t("ctaPrimary")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/tricks">{t("ctaSecondary")}</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold">
          {t("levelsHeading")}
        </h2>
        <LevelGrid />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold">{t("featuresTitle")}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<BookOpen className="h-5 w-5" />}
            title={t("feature1Title")}
            desc={t("feature1Desc")}
          />
          <FeatureCard
            icon={<Network className="h-5 w-5" />}
            title={t("feature2Title")}
            desc={t("feature2Desc")}
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5" />}
            title={t("feature3Title")}
            desc={t("feature3Desc")}
          />
          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title={t("feature4Title")}
            desc={t("feature4Desc")}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold">{t("tricksHeading")}</h2>
        <TrickGrid tricks={featured} />
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
