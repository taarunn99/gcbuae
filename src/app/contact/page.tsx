import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { ContactHero } from "@/components/sections/contact-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

import { ContactForm } from "./contact-form";

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
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
