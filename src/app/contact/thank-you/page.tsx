import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import { siteConfig } from "@/config/site";

/**
 * Post-submit landing (owner spec, 2026-08-19). noindex: a thank-you
 * page in the index is a wasted crawl and a broken entry point - and
 * keeping it out of the sitemap makes it a clean GA4 conversion goal.
 */
export const metadata: Metadata = {
  title: "Message sent - Thank you",
  description:
    "Your enquiry is on its way to Global Classic, Sharjah - a person replies within one working day with AED pricing against live slab stock.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/contact/thank-you" },
};

export default function ThankYouPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1">
      <section className="flex min-h-[70vh] items-center pt-40 pb-24">
        <Container>
          <p className="label-gcb text-warm-black/60">Message sent</p>
          <h1 className="font-display text-phi-4 mt-4 max-w-2xl tracking-tight text-balance">
            Thank you. It is on its way.
          </h1>
          <p className="text-warm-black/70 mt-6 max-w-xl leading-relaxed">
            A person reads every enquiry - expect a reply within one working
            day. If it is urgent, WhatsApp reaches us fastest.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <GcbButton
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              size="md"
              variant="light"
            >
              WhatsApp us now
            </GcbButton>
            <Link
              href="/products"
              className="chip-gcb border-warm-black rounded-full border px-5 py-2.5 text-sm"
            >
              Browse products
            </Link>
            <Link
              href="/"
              className="chip-gcb border-warm-black rounded-full border px-5 py-2.5 text-sm"
            >
              Back to the home page
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
