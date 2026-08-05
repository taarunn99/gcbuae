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
    <section className="bg-warm-black text-ink relative flex min-h-[64svh] items-end overflow-hidden pt-40 pb-16 sm:pb-20">
      {!prefersReducedMotion && (
        <div aria-hidden className="absolute inset-0">
          <SoftAurora
            speed={0.75}
            scale={1.3}
            brightness={0.85}
            color1="#f5efe4"
            color2="#c9a36a"
            noiseFrequency={2.2}
            noiseAmplitude={1.0}
            bandHeight={0.62}
            bandSpread={1.1}
            octaveDecay={0.12}
            layerOffset={2.4}
            colorSpeed={0.5}
            enableMouseInteraction
            mouseInfluence={0.38}
            // While hovered, the glow beats like a heart — lub-dub at ~66bpm.
            pulseStrength={0.85}
            pulseRate={1.1}
          />
        </div>
      )}

      {/* Seats the text against the aurora's brightest region. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/45 to-transparent"
      />

      <div className="container-gcb relative z-10">
        <Reveal>
          <p className="label-gcb text-bronze">Contact</p>
        </Reveal>
        <SplitHeading
          as="h1"
          className="font-display mt-6 max-w-3xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl"
        >
          Tell us what you are building.
        </SplitHeading>
        <Reveal delay={0.2} className="mt-6">
          <p className="text-ink/75 max-w-md leading-relaxed">
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
