import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Fraunces, Manrope } from "next/font/google";

import { RouteTransition } from "@/components/layout/route-transition";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { SiteHeader } from "@/components/layout/site-header";
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

// Set at weight 300 in CSS. Manrope has no italic, so any italic belongs
// here — the true italic is loaded because the film quotes use it.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-variable",
  display: "swap",
});

// Only for the huge material words in the scroll film — Cormorant's hairlines
// don't hold up at 12vw over moving video. The opsz axis keeps it display-cut.
const film = Fraunces({
  subsets: ["latin"],
  variable: "--font-film-variable",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    // GOVERNANCE §6: "Primary Query — Global Classic UAE" pattern.
    template: "%s — Global Classic UAE",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
    languages: { en: "/", "x-default": "/" },
  },
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
  themeColor: "#f7f8f5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${film.variable} antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-dvh flex-col">
        <OrganizationJsonLd />
        <SiteHeader />
        <WhatsAppFab />
        <SmoothScrollProvider>
          {/* Solid, stacked above the fixed footer so the page lifts away
              from it during the stacked-reveal. */}
          <div className="bg-background relative z-20 shadow-[0_30px_60px_-20px_rgba(12,21,16,0.5)]">
            {children}
          </div>
          <SiteFooter />
        </SmoothScrollProvider>
        <RouteTransition />
      </body>
    </html>
  );
}
