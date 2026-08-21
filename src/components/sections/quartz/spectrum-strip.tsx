import Image from "next/image";
import Link from "next/link";

import { quartzFamilies, shadesOfFamily } from "@/config/kalingastone-quartz";

/**
 * The colour-family split as a spectrum of the actual catalogue: all 69
 * swatches in one band, sorted white → veined → beige → grey → dark.
 * Each band is a link to its colour-family page. Server component -
 * every swatch and link is in the HTML; the interaction is pure CSS.
 */
export function SpectrumStrip() {
  return (
    <div>
      <div className="flex gap-1">
        {quartzFamilies.map((f) => {
          const members = shadesOfFamily(f.id);
          return (
            <Link
              key={f.id}
              href={`/kalingastone/quartz/colours/${f.slug}`}
              className="group min-w-0"
              style={{ flexGrow: members.length, flexBasis: 0 }}
              title={`${f.label} - ${members.length} shades`}
            >
              <span className="text-muted group-hover:text-foreground mb-2 block truncate text-[0.65rem] tracking-wide uppercase transition-colors">
                {f.label}
                <span className="ml-1.5">{members.length}</span>
              </span>
              <span className="flex h-16 gap-px overflow-hidden rounded-md transition-transform duration-300 ease-out group-hover:scale-y-110 sm:h-20">
                {members.map((s) => (
                  <span key={s.slug} className="relative min-w-0 flex-1">
                    <Image
                      src={`/kalingastone/quartz/swatches-v2/${s.slug}.webp`}
                      alt={`${s.name} swatch`}
                      fill
                      sizes="32px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </span>
                ))}
              </span>
              <span className="bg-verde mt-2 block h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          );
        })}
      </div>
      <p className="text-muted mt-4 text-sm">
        All 69 shades, sorted by colour - open a band to browse its range.
      </p>
    </div>
  );
}
