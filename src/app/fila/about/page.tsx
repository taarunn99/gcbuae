import type { Metadata } from "next";
import Image from "next/image";

import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { filaBrand, filaStats } from "@/config/fila";

export const metadata: Metadata = {
  title: { absolute: "About FILA - Since 1943 | Surface Care, Italy to the UAE" },
  description:
    "FILA Industria Chimica, founded 1943: Marchio Storico registered, ISO 9001/14001, Indoor Air Comfort Gold, and a Dubai JLT office serving the UAE since 2012.",
  alternates: { canonical: "/fila/about" },
};

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "FILA", href: "/fila" },
  { label: "About", href: "/fila/about" },
];

const story: [string, string][] = [
  ["1943", `Born as "${filaBrand.nameOrigin}" - founded by ${filaBrand.founders}. Shoe polish, household cleaners and furniture paste wax first; the surfaces followed.`],
  ["1990", "FILA MP90 - the first stain repellent for polished porcelain. The protector line that still carries the name today."],
  ["2012", "FILA Middle East opens in Dubai - the branch at Fortune Tower, JLT that serves the Gulf to this day."],
  ["2019", "The new Innovation Center opens: 800 m2 of laboratories, MP90 ECO XTREME and FOB XTREME Advanced Technology launch."],
  ["2022", "Indoor Air Comfort Gold by Eurofins - first in its sector in Italy. FILA SALVADOCCIA launches."],
  ["2025", "Transition to Societa Benefit - a Benefit Corporation under Italian law, family owned with managerial governance."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "Organization",
      name: "FILA INDUSTRIA CHIMICA SPA",
      foundingDate: "1943",
      url: "https://www.filasolutions.com",
      description: filaBrand.mission,
    },
  ],
};

export default function FilaAboutPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="pt-40 pb-16">
        <Container>
          <Breadcrumb items={crumbs} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.618fr_1fr] lg:items-end">
            <div>
              <h1 className="fila-display text-[clamp(2.6rem,6vw,5.5rem)]">
                Who
                <br />
                we
                <br />
                are.
              </h1>
              <span className="fila-bar mt-6" data-fila-bar />
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0B0B0C]/80">
                {filaBrand.mission} {filaBrand.heritage}; expertise taken to{" "}
                {filaBrand.reach}, with {filaBrand.partnerships} across ceramic,
                natural stone, wood, terracotta and concrete manufacturers.
              </p>
            </div>
            <figure className="overflow-hidden rounded-xl">
              <Image
                src="/images/fila/brand/founders-sales-team-1943.webp"
                alt="The FILA founders and sales team, 1943"
                width={640}
                height={480}
                className="h-auto w-full"
                preload
              />
            </figure>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0B0C] py-16 text-white">
        <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {filaStats.map(([value, label]) => (
            <div key={label}>
              <p className="fila-display text-5xl text-[#FED400]">{value}</p>
              <p className="mt-2 text-sm text-white/70">{label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="fila-display text-4xl">Eighty years, six turns.</h2>
          <span className="fila-bar mt-4" data-fila-bar />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {story.map(([year, body]) => (
              <div key={year} data-fila-card className="fila-card rounded-xl bg-white p-6">
                <p className="fila-display text-3xl text-[#FED400]" style={{ WebkitTextStroke: "1px #0B0B0C" }}>
                  {year}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#0B0B0C]/75">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[#0B0B0C]/10 py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.618fr]">
            <figure className="overflow-hidden rounded-xl">
              <Image
                src="/images/fila/brand/innovation-center-instrument.webp"
                alt="Instrument bench inside the FILA Innovation Center laboratories"
                width={640}
                height={480}
                className="h-auto w-full"
                loading="lazy"
              />
            </figure>
            <div>
              <h2 className="fila-display text-4xl">Certified, sustainably.</h2>
              <span className="fila-bar mt-4" data-fila-bar />
              <ul className="mt-6 space-y-3">
                {[
                  filaBrand.certifications,
                  `${filaBrand.waterBased}; 100% of electricity from renewable sources; 100% recyclable secondary packaging (FSC)`,
                  "Innovation Center: 800 m2 of laboratories; products 100% made in Italy",
                  `FILA Academy: ${filaBrand.academyYears}, ${filaBrand.academyTrained}, founding member of Assoposa`,
                  filaBrand.middleEast,
                  "Supplied in the UAE wholesale by Global Classic - bulk and project quantities only, with Lapiz Blue as official distribution",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FED400]" />
                    <span className="leading-relaxed text-[#0B0B0C]/80">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
