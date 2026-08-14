import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import { filaSolutions } from "@/config/fila";
import { filaProductBySlug } from "@/config/fila-products";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "FILA Solutions - What To Do If | Surface Problems Solved, UAE" },
  description:
    "Grout haze after tiling, rust on marble, limescale in bathrooms, efflorescence before laying - the FILA answer to each surface problem, from the printed catalogue. Supplied wholesale in the UAE by Global Classic.",
  alternates: { canonical: "/fila/solutions" },
};

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "FILA", href: "/fila" },
  { label: "Solutions", href: "/fila/solutions" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "FAQPage",
      mainEntity: filaSolutions.map((s) => ({
        "@type": "Question",
        name: s.problem,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${s.answer} FILA ${s.slugs
            .map((slug) => filaProductBySlug.get(slug)?.name)
            .join(" and FILA ")} - supplied wholesale in the UAE by Global Classic (${siteConfig.url}/fila).`,
        },
      })),
    },
  ],
};

export default function FilaSolutionsPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="pt-40 pb-14">
        <Container>
          <Breadcrumb items={crumbs} />
          <h1 className="fila-display mt-10 text-[clamp(2.6rem,6vw,5.5rem)]">
            What to do if.
          </h1>
          <span className="fila-bar mt-6" data-fila-bar />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0B0B0C]/80">
            Ten problems a UAE site actually calls about, each answered with
            the product the FILA catalogue itself prescribes. Wholesale supply
            only - send the surface and the symptom with the BOQ.
          </p>
        </Container>
      </section>

      <section className="pb-10">
        <div className="relative overflow-hidden">
          <Image
            src="/images/fila/heroes/solutions-band.webp"
            alt="Stained stone transitioning to clean sealed stone"
            width={2560}
            height={1097}
            sizes="100vw"
            className="h-auto w-full"
            preload
          />
        </div>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {filaSolutions.map((s, i) => (
              <div key={s.problem} data-fila-card className="fila-card rounded-xl bg-white p-7">
                <p className="fila-display text-4xl text-[#0B0B0C]/12">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="fila-display mt-2 text-xl leading-snug">{s.problem}</h2>
                <span className="fila-bar mt-3" data-fila-bar />
                <p className="mt-4 text-sm leading-relaxed text-[#0B0B0C]/75">{s.answer}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.slugs.map((slug) => {
                    const p = filaProductBySlug.get(slug)!;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/fila/${slug}`}
                          className="fila-display inline-block rounded-full bg-[#FED400] px-4 py-1.5 text-xs transition-colors hover:bg-[#0B0B0C] hover:text-[#FED400]"
                        >
                          {p.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0B0C] py-16 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="fila-display max-w-xl text-2xl leading-snug">
            A problem not listed? Send a photo of the surface on WhatsApp.
          </p>
          <GcbButton href="/contact" size="md" variant="dark">
            Ask the desk
          </GcbButton>
        </Container>
      </section>
    </main>
  );
}
