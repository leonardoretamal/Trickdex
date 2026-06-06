import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Trickdex",
    template: "%s · Trickdex",
  },
  description:
    "Tu roadmap de tricking, de cero a experto. Aprende nivel a nivel con un catálogo claro, prerequisitos y progreso local.",
  applicationName: "Trickdex",
  authors: [{ name: "Trickdex" }],
  keywords: [
    "tricking",
    "martials arts",
    "acrobatics",
    "flips",
    "kicks",
    "roadmap",
    "learning",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
