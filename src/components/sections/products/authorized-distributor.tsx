import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Container } from "@/components/ui/container";

/**
 * The authorizations - Global Classic is a certified KalingaStone
 * reseller AND FILA's Preferred UAE Distributor for 2026, and the
 * paperwork proves both. Golden split: the claim on the 1.618 column,
 * the framed certificates on the other, presented like a wall (subtle
 * lift on hover, each viewable as PDF). Wording follows the documents
 * exactly.
 */
export function AuthorizedDistributor() {
  return (
    <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24 sm:py-28">
      <Container className="relative z-10">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-gcb text-bronze">Certified, on paper</p>
            <p className="label-gcb text-ink/50">
              KalingaStone letter · FILA certificate, valid 2026
            </p>
          </div>
          <RuleIn className="bg-ink/30 mt-4 w-full" />
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.618fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="font-display text-phi-3 max-w-xl tracking-tight text-balance">
                Authorized - in writing, twice.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-ink/80 mt-8 max-w-xl text-lg leading-relaxed">
                Global Classic Building Material Trading LLC is certified
                through the official KalingaStone channel as an authorized
                reseller for the Northern Emirates, UAE - and
                certified by FILA Surface Chemicals Trading LLC as a Preferred
                UAE Distributor of FILA surface care for 2026.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-ink/60 mt-6 max-w-xl text-sm leading-relaxed">
                Every product we quote traces to the manufacturer&rsquo;s own
                channel - no grey imports, no substituted material. Ask for
                either certificate with any quotation; they travel with our
                paperwork.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/certificates/kalingastone-authorized-reseller.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip-gcb border-ink/40 rounded-full border px-5 py-2.5 text-sm"
                >
                  KalingaStone letter (PDF)
                </a>
                <a
                  href="/certificates/fila-preferred-distributor.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip-gcb border-ink/40 rounded-full border px-5 py-2.5 text-sm"
                >
                  FILA certificate (PDF)
                </a>
              </div>
            </Reveal>
          </div>

          {/* The certificates, framed on the wall */}
          <Reveal delay={0.15}>
            <div className="mx-auto w-full max-w-[380px] space-y-8">
              <a
                href="/certificates/kalingastone-authorized-reseller.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <span className="border-ink/20 bg-ink/5 block rotate-[-1.5deg] rounded-lg border p-3 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02] group-hover:rotate-0">
                  <Image
                    src="/certificates/authorized-reseller-letter.webp"
                    alt="Authorized Reseller letter certifying Global Classic Building Material Trading LLC as a KalingaStone reseller for the Northern Emirates, UAE"
                    width={900}
                    height={1273}
                    quality={90}
                    sizes="380px"
                    className="h-auto w-full rounded-sm"
                    loading="lazy"
                  />
                </span>
                <span className="label-gcb text-ink/60 mt-3 block text-center">
                  KalingaStone - click to read
                </span>
              </a>
              <a
                href="/certificates/fila-preferred-distributor.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <span className="border-ink/20 bg-ink/5 block rotate-[1.5deg] rounded-lg border p-3 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02] group-hover:rotate-0">
                  <Image
                    src="/certificates/fila-preferred-distributor.webp"
                    alt="FILA certificate - Global Classic Buildings Material Trading LLC SPC named Preferred UAE Distributor, valid for 2026, signed by the CEO of FILA Surface Chemicals Trading LLC"
                    width={1400}
                    height={1014}
                    quality={90}
                    sizes="380px"
                    className="h-auto w-full rounded-sm"
                    loading="lazy"
                  />
                </span>
                <span className="label-gcb text-ink/60 mt-3 block text-center">
                  FILA - click to read
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
