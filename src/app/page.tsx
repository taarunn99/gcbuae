import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

// Placeholder holding page. It exists to exercise the animation stack end to
// end — Lenis scrolling, a GSAP SplitText reveal, and Motion scroll entrances —
// and gets replaced wholesale once the design direction is in.
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
      <section className="flex min-h-dvh items-center py-32">
        <Container>
          <Reveal>
            <p className="text-muted font-mono text-xs tracking-[0.2em] uppercase">
              {siteConfig.shortName} — {siteConfig.address.city}, UAE
            </p>
          </Reveal>

          <SplitHeading
            as="h1"
            delay={0.15}
            className="font-display mt-8 max-w-5xl text-5xl leading-[0.95] font-medium tracking-tight text-balance sm:text-7xl lg:text-8xl"
          >
            {siteConfig.name}
          </SplitHeading>

          <Reveal delay={0.35} className="mt-8 max-w-xl">
            <p className="text-muted text-lg leading-relaxed">
              {siteConfig.description}
            </p>
          </Reveal>

          <Reveal delay={0.5} className="mt-16">
            <p className="text-muted font-mono text-xs tracking-[0.2em] uppercase">
              Scroll
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-border bg-surface border-t py-32">
        <Container>
          <SplitHeading className="font-display max-w-3xl text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
            A building materials partner for contractors, developers and
            consultants across the Emirates.
          </SplitHeading>

          <RevealGroup className="mt-20 grid gap-12 sm:grid-cols-3">
            {capabilities.map((item, index) => (
              <RevealItem key={item.title}>
                <span className="text-muted font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-xl font-medium">
                  {item.title}
                </h3>
                <p className="text-muted mt-3 leading-relaxed">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <footer className="border-border border-t py-16">
        <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted font-mono text-xs tracking-[0.2em] uppercase">
            {siteConfig.legalName}
          </p>
          <p className="text-muted font-mono text-xs tracking-[0.2em] uppercase">
            Site in development
          </p>
        </Container>
      </footer>
    </main>
  );
}
