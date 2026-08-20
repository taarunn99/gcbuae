import Link from "next/link";

import { LocationMap } from "@/components/ui/expand-map";
import { siteConfig } from "@/config/site";

/**
 * Where we are - the expanding map card with a visit-details column
 * (owner, 2026-08-20: the lone small card left too much white on
 * desktop). Mobile keeps the centred single-column beat; lg+ pairs the
 * bigger card with address, phones and email so the section reads like
 * a visiting card. Server component; the map card is the client island.
 * The card slot reserves the EXPANDED footprint so the spring never
 * shifts the layout - the fixed-behind footer needs this section
 * opaque and in normal flow.
 */

const DETAILS: { label: string; lines: string[] }[] = [
  {
    label: "Showroom & warehouse",
    lines: ["9M62+45M, Al Sajaa Industrial", "Al Jlail, Sharjah, UAE"],
  },
  {
    label: "Call",
    lines: [siteConfig.contact.phone, siteConfig.contact.landline],
  },
  {
    label: "Write",
    lines: [siteConfig.contact.email, siteConfig.contact.salesEmail],
  },
];

export function ShowroomLocator() {
  return (
    <section
      aria-label="Where we are"
      className="bg-background relative pb-24 lg:pb-32"
    >
      <div className="container-gcb">
        <div className="text-center">
          <p className="label-gcb text-warm-black/60">Where we are</p>
          <h2 className="font-display text-warm-black mt-3 text-2xl tracking-tight sm:text-3xl">
            Al Sajaa, {siteConfig.address.city}, United Arab Emirates
          </h2>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
          {/* w-full + cap: fixed slots horizontally scrolled sub-360px
              phones (mobile audit, 2026-08-19); lg reserves the bigger
              expanded footprint. */}
          <div className="flex h-[320px] w-full max-w-[360px] items-start justify-center lg:h-[460px] lg:max-w-[660px] lg:flex-1">
            <LocationMap
              location={`Al Sajaa, ${siteConfig.address.city}, UAE`}
              coordinates="25.3604° N, 55.6503° E"
            />
          </div>

          {/* The visiting card - fills the desktop whitespace */}
          <div className="w-full max-w-[360px] shrink-0 text-center lg:w-72 lg:pt-2 lg:text-left">
            <dl className="space-y-6">
              {DETAILS.map((detail) => (
                <div key={detail.label}>
                  <dt className="label-gcb text-warm-black/50">
                    {detail.label}
                  </dt>
                  {detail.lines.map((line) => (
                    <dd
                      key={line}
                      className="text-warm-black/80 mt-1.5 text-sm leading-relaxed"
                    >
                      {line}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
            <p className="text-warm-black/70 mt-8 max-w-md leading-relaxed">
              Slabs on racks, samples on the table - see the materials in
              person before you specify.
            </p>
            <Link
              href="/contact"
              className="chip-gcb border-warm-black text-warm-black mt-6 inline-flex items-center rounded-full border px-5 py-2 text-sm"
            >
              Plan a visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
