import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { PostCard } from "@/components/sections/blog/post-card";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import { BLOG_CATEGORIES, BLOG_POSTS, blogPostBySlug } from "@/config/blog";

/**
 * The Journal index - editorial asymmetric grid per BLOG-PACKAGE.md,
 * on the house palette: one featured post, card grid, quiet text
 * category tabs (real links to indexed category pages, no client
 * filter state), and the showroom CTA band. Now indexable: 39 real
 * posts live behind it.
 */
export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Field notes from the slab trade: honest guides to engineered marble, quartz, terrazzo, bathroom fittings and stone care, written for UAE project buyers.",
  alternates: { canonical: "/blog" },
};

const FEATURED_SLUG = "quartz-vs-marble";

export default function BlogIndexPage() {
  const featured = blogPostBySlug.get(FEATURED_SLUG)!;
  const rest = BLOG_POSTS.filter((p) => p.slug !== FEATURED_SLUG);

  return (
    <main className="theme-forest bg-background text-foreground flex-1 pt-40 pb-0">
      <Container>
        <Reveal instant>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-gcb text-muted">The Journal · Global Classic</p>
            <p className="label-gcb text-muted">{BLOG_POSTS.length} guides</p>
          </div>
          <RuleIn className="mt-4 w-full" />
        </Reveal>

        <SplitHeading instant
          as="h1"
          className="font-display text-phi-4 mt-12 max-w-4xl tracking-tight text-balance"
        >
          Field notes from the slab trade.
        </SplitHeading>

        {/* Category tabs - quiet text links, not pills */}
        <nav aria-label="Journal categories" className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {BLOG_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className="u-line label-gcb text-warm-black/70 hover:text-warm-black transition-colors"
            >
              {category.label}
            </Link>
          ))}
        </nav>

        {/* Featured */}
        <div className="mt-14">
          <PostCard post={featured} featured />
        </div>

        {/* The grid */}
        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>

      {/* Showroom CTA band */}
      <section className="bg-warm-black grain-gcb relative mt-24 overflow-hidden py-20">
        <Container className="relative z-10">
          <p className="label-gcb text-ink/60">Beyond the reading</p>
          <h2 className="font-display text-ink text-phi-2 mt-3 max-w-2xl leading-tight tracking-tight">
            See the materials in person.
          </h2>
          <p className="text-ink/70 mt-4 max-w-xl leading-relaxed">
            Every guide here is written from slabs on racks at Al Sajaa,
            Sharjah. Walk the stock, tag your slabs, price your BOQ.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <GcbButton href="/contact" size="md" variant="light">
              Plan a visit
            </GcbButton>
            <Link
              href="/products"
              className="chip-gcb border-ink/60 text-ink inline-flex items-center rounded-full border px-5 py-2.5 text-sm"
            >
              The Materials Issue
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
