import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

/**
 * Reach us — the location as an object, not an embed: a stylized
 * palette-drawn map card with a pulsing pin (pure CSS ping), the plus
 * code set at display size like coordinates on a chart, and the three
 * ways in. The card opens Google Maps directions; no third-party map
 * script ever loads (GOVERNANCE §4).
 */

const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=9M62%2B45M%20Al%20Sajaa%20Al%20Jlail%20Sharjah";

export function ReachUs() {
  return (
    <section className="border-warm-black border-t py-24 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.618fr] lg:gap-20">
          {/* The map card */}
          <Reveal>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open directions to the Global Classic warehouse in Google Maps"
              className="group border-warm-black relative block overflow-hidden rounded-xl border shadow-xl"
            >
              <Image
                src="/products/editorial/warehouse-map.webp"
                alt="Stylised map of the Al Sajaa industrial district, Sharjah, with the Global Classic warehouse pinned"
                width={1000}
                height={750}
                quality={90}
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              {/* The pulse — pure CSS, sits on the pin */}
              <span
                aria-hidden
                className="absolute top-[48%] left-[61%] block size-3"
              >
                <span className="bg-bronze absolute inset-0 animate-ping rounded-full opacity-60" />
                <span className="bg-bronze absolute inset-0 rounded-full" />
              </span>
              <span className="label-gcb text-ink absolute bottom-4 left-5 rounded-full bg-black/35 px-3.5 py-1.5 backdrop-blur-sm">
                Open directions →
              </span>
            </a>
          </Reveal>

          <div>
            <p className="label-gcb text-muted">Reach us</p>
            <h2 className="font-display text-phi-3 mt-5 max-w-xl tracking-tight text-balance">
              One warehouse. Every emirate.
            </h2>

            {/* The plus code, set like chart coordinates */}
            <Reveal delay={0.1}>
              <p className="font-display text-phi-2 text-muted mt-8 tracking-wide">
                9M62+45M
                <span className="text-foreground ml-4 text-base tracking-normal">
                  Al Sajaa · Al Jlail · Sharjah
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-muted mt-6 max-w-xl leading-relaxed">
                Slabs on the racks, samples at the desk, coffee if you&rsquo;re
                staying. Come see the stone in person — or send the site address
                and we&rsquo;ll bring the stone to you.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <ul className="mt-10 flex flex-wrap gap-3">
                <li>
                  <a
                    href={DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip-gcb border-border/50 rounded-full border px-5 py-2.5 text-sm"
                  >
                    Directions
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+97165312015"
                    className="chip-gcb border-border/50 rounded-full border px-5 py-2.5 text-sm"
                  >
                    06 531 2015
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/971529927827"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip-gcb border-border/50 rounded-full border px-5 py-2.5 text-sm"
                  >
                    WhatsApp — 052 992 7827
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
