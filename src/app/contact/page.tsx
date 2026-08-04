import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to ${siteConfig.name} about materials, specifications and supply across the UAE.`,
};

export default function ContactPage() {
  return (
    <main className="flex-1 pt-40 pb-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="label-gcb text-muted">Contact</p>
            <SplitHeading
              as="h1"
              className="font-display mt-6 text-4xl leading-tight tracking-tight text-balance sm:text-5xl"
            >
              Tell us what you are building.
            </SplitHeading>
            <Reveal className="mt-8">
              <p className="text-muted max-w-md leading-relaxed">
                Specifications, availability, samples — or just the shape of an
                idea. We reply within one working day.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <p className="label-gcb text-muted">Email</p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-2 inline-block underline underline-offset-4"
              >
                {siteConfig.contact.email}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </main>
  );
}
