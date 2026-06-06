import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { tricks, getTrickBySlug } from "@/data/tricks";
import { TrickDetail } from "@/components/tricks/TrickDetail";

export function generateStaticParams() {
  return tricks.map((tr) => ({ slug: tr.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const trick = getTrickBySlug(slug);
  if (!trick) return {};
  const t = await getTranslations({
    locale,
    namespace: "tricks",
  });
  return {
    title: t(`${trick.id}.name`),
    description: t(`${trick.id}.short`),
  };
}

export default async function TrickPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const trick = getTrickBySlug(slug);
  if (!trick) notFound();
  return <TrickDetail trick={trick} />;
}
