import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("notFound");
  return (
    <html lang={locale}>
      <body className="grid min-h-screen place-items-center bg-background text-foreground">
        <div className="space-y-2 text-center">
          <h1 className="font-display text-4xl font-bold">404</h1>
          <p className="text-muted-foreground">{t("title")}</p>
          <Link href="/" className="text-sm text-primary underline">
            {t("back")}
          </Link>
        </div>
      </body>
    </html>
  );
}
