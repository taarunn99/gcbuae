"use client";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import SoftAurora from "@/components/ui/soft-aurora/soft-aurora";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Contact page hero: a slow aurora in the brand's own light — limestone and
 * bronze bands drifting over warm black — that leans toward the cursor. The
 * playfulness is the interaction: the light follows whoever is about to say
 * hello. Under prefers-reduced-motion the canvas never mounts and the section
 * stands on its gradient alone.
 */
export function ContactHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-warm-black text-ink grain-gcb relative flex min-h-[92svh] items-end overflow-hidden pt-40 pb-20 sm:pb-28">
      {!prefersReducedMotion && (
        <div aria-hidden className="absolute inset-0">
          <SoftAurora
            speed={0.75}
            scale={1.3}
            brightness={0.85}
            color1="#f7f8f5"
            color2="#6f8f78"
            noiseFrequency={2.2}
            noiseAmplitude={1.0}
            // Band rides high in the taller section so its wander (plus the
            // cursor offset) stays clear of the text at the bottom.
            bandHeight={0.74}
            bandSpread={1.1}
            octaveDecay={0.12}
            layerOffset={2.4}
            colorSpeed={0.5}
            enableMouseInteraction
            mouseInfluence={0.3}
            // While hovered, the glow beats like a heart — lub-dub at ~66bpm.
            pulseStrength={0.85}
            pulseRate={1.1}
          />
        </div>
      )}

      {/* Seats the text against the aurora's brightest region. */}
      <div
        aria-hidden
        className="from-warm-black/45 pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t to-transparent"
      />

      <div className="container-gcb relative z-10 text-center">
        <Reveal>
          <p className="label-gcb text-bronze">Contact</p>
        </Reveal>
        <SplitHeading
          as="h1"
          className="font-display mx-auto mt-6 max-w-3xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl"
        >
          Tell us what you are building.
        </SplitHeading>
        <Reveal delay={0.2} className="mt-6">
          <p className="text-ink/75 mx-auto max-w-md leading-relaxed">
            Specifications, availability, samples — or just the shape of an
            idea. We reply within one working day.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-8">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="label-gcb text-ink/80 hover:text-ink underline underline-offset-4 transition-colors"
          >
            {siteConfig.contact.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
