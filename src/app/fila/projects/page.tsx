import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import { filaProjects } from "@/config/fila";
import { filaProducts } from "@/config/fila-products";

export const metadata: Metadata = {
  title: { absolute: "FILA Reference Projects - Canova to the Apple Store" },
  description:
    "Where FILA is specified: the Gipsoteca di Canova, Hotel Mondrian Qatar, the Library of Birmingham and Apple Store Piazza Liberty, with printed product lists.",
  alternates: { canonical: "/fila/projects" },
};

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "FILA", href: "/fila" },
  { label: "Projects", href: "/fila/projects" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [breadcrumbJsonLd(crumbs)],
};

const slugFor = (name: string) =>
  filaProducts.find((p) => p.name === name)?.slug;

export default function FilaProjectsPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="pt-40 pb-16">
        <Container>
          <Breadcrumb items={crumbs} />
          <h1 className="fila-display mt-10 text-[clamp(2.6rem,6vw,5.5rem)]">
            Proven on the
            <br />
            world&apos;s floors.
          </h1>
          <span className="fila-bar mt-6" data-fila-bar />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0B0B0C]/80">
            The references FILA prints in its own profile - museums, libraries
            and flagship retail, each with the exact products specified. The
            same systems ship from Sharjah for UAE projects; the Armani Hotel
            Dubai fronts the Middle East guide itself.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {filaProjects.map((project) => (
              <article key={project.name} data-fila-card className="fila-card overflow-hidden rounded-xl bg-white">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={`/images/fila/brand/${project.image}.webp`}
                    alt={`${project.name}, ${project.place} - surfaces maintained with FILA`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <h2 className="fila-display text-2xl">{project.name}</h2>
                  <p className="mt-1 text-sm text-[#0B0B0C]/60">{project.place}</p>
                  <span className="fila-bar mt-4" data-fila-bar />
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.products.map((name) => {
                      const slug = slugFor(name);
                      return slug ? (
                        <li key={name}>
                          <Link
                            href={`/fila/${slug}`}
                            className="fila-display inline-block rounded-full bg-[#FED400] px-4 py-1.5 text-xs transition-colors hover:bg-[#0B0B0C] hover:text-[#FED400]"
                          >
                            {name}
                          </Link>
                        </li>
                      ) : (
                        <li key={name}>
                          <span className="fila-display inline-block rounded-full border border-[#0B0B0C]/20 px-4 py-1.5 text-xs text-[#0B0B0C]/60">
                            {name} (wider range)
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0B0C] py-16 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="fila-display max-w-xl text-2xl leading-snug">
            Specifying a maintenance system for a UAE project?
          </p>
          <GcbButton href="/contact" size="md" variant="dark">
            Send the surface schedule
          </GcbButton>
        </Container>
      </section>
    </main>
  );
}
