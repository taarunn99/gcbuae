import type { Metadata } from "next";

import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { ContactHero } from "@/components/sections/contact-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to ${siteConfig.name} about materials, specifications and supply across the UAE.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1">
      <ContactHero />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[1fr_0.618fr]">
            <Reveal>
              <ContactForm />
            </Reveal>
            <Reveal className="border-warm-black relative hidden aspect-[3/4] overflow-hidden rounded-3xl border lg:block">
              <Image
                src="/home/contact-still.webp"
                alt="Stone slab samples wrapped in sage linen with a marble fragment and olive branch"
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                quality={90}
                className="object-cover"
                loading="lazy"
              />
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
