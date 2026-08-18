import Link from "next/link";

import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";

/**
 * Branded 404. Next serves this with a real 404 status, so search
 * engines drop dead URLs while people get somewhere useful to go.
 */
export default function NotFound() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1">
      <section className="flex min-h-[70vh] items-center pt-40 pb-24">
        <Container>
          <p className="label-gcb text-muted">404 - Page not found</p>
          <h1 className="font-display text-phi-4 mt-4 max-w-2xl tracking-tight text-balance">
            That page is not on the racks.
          </h1>
          <p className="text-muted mt-6 max-w-xl leading-relaxed">
            The address may have changed or never existed. Everything we stock
            and everything we have written is one step from here.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <GcbButton href="/" size="md" variant="light">
              Back to the home page
            </GcbButton>
            <Link
              href="/products"
              className="chip-gcb border-warm-black rounded-full border px-5 py-2.5 text-sm"
            >
              Browse products
            </Link>
            <Link
              href="/blog"
              className="chip-gcb border-warm-black rounded-full border px-5 py-2.5 text-sm"
            >
              Read The Journal
            </Link>
            <Link
              href="/contact"
              className="chip-gcb border-warm-black rounded-full border px-5 py-2.5 text-sm"
            >
              Contact us
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
