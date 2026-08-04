import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { FilmSequence } from "@/components/sections/film/film-sequence";
import { Hero } from "@/components/sections/hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

// Everything below the hero is still placeholder, pending design direction.
const capabilities = [
  {
    title: "Sourcing",
    body: "Direct supplier relationships across the GCC and beyond, matched to project specifications.",
  },
  {
    title: "Supply",
    body: "Stocked inventory and scheduled deliveries that keep site programmes on track.",
  },
  {
    title: "Support",
    body: "Technical guidance from tender stage through to handover.",
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />

      <section className="border-border bg-surface border-t py-32">
        <Container>
          <SplitHeading className="font-display max-w-3xl text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
            A building materials partner for contractors, developers and
            consultants across the Emirates.
          </SplitHeading>

          <RevealGroup className="mt-20 grid gap-12 sm:grid-cols-3">
            {capabilities.map((item, index) => (
              <RevealItem key={item.title}>
                <span className="label-gcb text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-2xl">{item.title}</h3>
                <p className="text-muted mt-3 leading-relaxed">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <FilmSequence />

      <footer className="border-border border-t py-16">
        <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <p className="label-gcb text-muted">{siteConfig.legalName}</p>
          </Reveal>
          <Reveal>
            <p className="label-gcb text-muted">Site in development</p>
          </Reveal>
        </Container>
      </footer>
    </main>
  );
}
