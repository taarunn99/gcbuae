import type { Metadata } from "next";


import { Reveal } from "@/components/motion/reveal";
import { ContactHero } from "@/components/sections/contact-hero";
import { Container } from "@/components/ui/container";

import { ContactChannels } from "@/components/sections/contact-channels";
import { ContactForm } from "@/components/sections/contact-form";
import { AmbientClip } from "@/components/ui/ambient-clip";

export const metadata: Metadata = {
  title: "Contact - AED Quotes & Trade Pricing",
  description:
    "Send a BOQ, spec or idea to Global Classic, Sharjah - AED quotes on KalingaStone slabs, Jaquar and FILA within one working day, delivery across the UAE.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1">
      <ContactHero />

      <ContactChannels />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[1fr_0.618fr]">
            <Reveal>
              <ContactForm />
            </Reveal>
            <Reveal
              className="border-warm-black relative aspect-[3/4] overflow-hidden rounded-3xl border"
              aria-label="Slow travel across the veining of a KalingaStone marble slab"
            >
              <AmbientClip name="marble-vein" />
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
