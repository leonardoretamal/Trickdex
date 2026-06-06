import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    // Permite llamar claves opcionales (p.ej. `tips`) sin que el build
    // explote si todavía no hemos añadido esa entrada. La función se
    // ejecuta también en runtime; devolvemos string vacío para no
    // mostrar el placeholder "tricks.<id>.tips" al usuario.
    getMessageFallback: ({ key }) => "",
    onError: () => {
      // Silenciamos los MISSING_MESSAGE en build: los logs se
      // quedan solo en consola de dev si los necesitamos.
    },
  };
});
