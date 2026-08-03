import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { siteConfig } from "@/config/site";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";

import "./globals.css";

// Both are variable fonts — passing an explicit `weight` would downgrade them
// to static instances and cost an extra request per weight. globals.css maps
// these CSS variables onto Tailwind's font utilities.
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans-variable",
  display: "swap",
});

// Set at weight 300 in CSS. Manrope has no italic, so any italic belongs here.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#101114" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-dvh flex-col">
        <OrganizationJsonLd />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
