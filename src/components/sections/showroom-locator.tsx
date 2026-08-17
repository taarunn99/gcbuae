import Link from "next/link";

import { LocationMap } from "@/components/ui/expand-map";
import { siteConfig } from "@/config/site";

/**
 * Where we are - a small closing beat under the materials explorer
 * (owner request, 2026-08-17): the expanding map card, centred, with a
 * real link to the contact page so the section carries a crawlable path.
 * Server component; the card itself is the client island. The card slot
 * reserves the EXPANDED footprint (360x280 plus the hint line) so the
 * spring never shifts the layout around it - the fixed-behind footer
 * needs this section opaque and in normal flow.
 */
export function ShowroomLocator() {
  return (
    <section
      aria-label="Where we are"
      className="bg-background relative pb-24 lg:pb-32"
    >
      <div className="container-gcb flex flex-col items-center text-center">
        <p className="label-gcb text-warm-black/60">Where we are</p>
        <h2 className="font-display text-warm-black mt-3 text-2xl tracking-tight">
          {siteConfig.address.city}, United Arab Emirates
        </h2>
        <div className="mt-10 flex h-[320px] w-[360px] items-start justify-center">
          <LocationMap
            location={`${siteConfig.address.city}, United Arab Emirates`}
            coordinates="25.2048° N, 55.2708° E"
          />
        </div>
        <p className="text-warm-black/70 mt-6 max-w-md leading-relaxed">
          Slabs on racks, samples on the table - see the materials in person
          before you specify.
        </p>
        <Link
          href="/contact"
          className="chip-gcb border-warm-black text-warm-black mt-6 inline-flex items-center rounded-full border px-5 py-2 text-sm"
        >
          Plan a visit
        </Link>
      </div>
    </section>
  );
}
