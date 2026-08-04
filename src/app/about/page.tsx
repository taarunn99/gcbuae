import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-40 pb-32">
      <Container>
        <p className="label-gcb text-muted">About</p>
        <SplitHeading
          as="h1"
          className="font-display mt-6 max-w-4xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl"
        >
          Classic is not an era. It is a standard we supply to.
        </SplitHeading>

        <Reveal className="mt-12 max-w-xl">
          <p className="text-muted text-lg leading-relaxed">
            {siteConfig.description}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 max-w-xl">
          <p className="text-muted leading-relaxed">
            The full story — people, projects and partners — is being written.
            Until then, the materials speak on the{" "}
            <a
              href="/products"
              className="text-foreground underline underline-offset-4"
            >
              products page
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </main>
  );
}
