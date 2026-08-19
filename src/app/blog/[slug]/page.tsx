import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogFaq } from "@/components/sections/blog/blog-faq";
import { PostCard } from "@/components/sections/blog/post-card";
import { PostBody, anchorId } from "@/components/sections/blog/post-body";
import { Breadcrumb, breadcrumbJsonLd, type Crumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  BLOG_POSTS,
  blogCategoryBySlug,
  blogHero,
  blogPostBySlug,
} from "@/config/blog";
import { getBlogContent } from "@/content/blog";
import { siteConfig } from "@/config/site";

/**
 * The Journal post template (BLOG-PACKAGE.md build spec, mapped to the
 * house system): 68ch reading column on the phi scale, the package's
 * direct answer as a PLAIN first paragraph (blockquote forbidden -
 * extraction pattern), anchored question H2s with bronze rules, sticky
 * TOC on pillars, the owner's product CTA band, FAQ accordion with
 * answers in the DOM, related posts from the cluster map, and
 * Article + FAQPage + BreadcrumbList schema built from the same data
 * the page renders.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug.get(slug);
  if (!post) return {};
  return {
    title: { absolute: post.title },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: [{ url: blogHero(post.slug) }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostBySlug.get(slug);
  if (!post) notFound();
  const content = getBlogContent(slug);
  const category = blogCategoryBySlug.get(post.category)!;
  const related = post.related
    .map((r) => blogPostBySlug.get(r))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Journal", href: "/blog" },
    { label: category.label, href: `/blog/category/${category.slug}` },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        image: `${siteConfig.url}${blogHero(post.slug)}`,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
        author: {
          "@type": "Organization",
          name: siteConfig.legalName,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.legalName,
          url: siteConfig.url,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      breadcrumbJsonLd(crumbs),
    ],
  };

  return (
    <main className="theme-forest bg-background text-foreground flex-1 pt-32 pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Container>
        <Breadcrumb items={crumbs} />

        <header className="mt-10 max-w-3xl">
          <p className="label-gcb text-bronze">
            {category.label}
            <span className="text-warm-black/40">
              {" "}· {post.readMinutes} min read ·{" "}
              {new Date(post.datePublished).toLocaleDateString("en-AE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </p>
          <h1 className="font-display text-warm-black text-phi-3 mt-4 leading-tight tracking-tight text-balance">
            {post.title}
          </h1>
        </header>

        <figure className="border-warm-black relative mt-10 aspect-[2/1] overflow-hidden border sm:aspect-[21/9]">
          <Image
            src={blogHero(post.slug)}
            alt={post.heroAlt}
            fill
            sizes="(min-width: 90rem) 1344px, 100vw"
            quality={90}
            className="object-cover"
            preload
          />
        </figure>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,68ch)_1fr]">
          <article>
            {/* The package's direct answer - a PLAIN first paragraph,
                never a blockquote (AI Overview extraction pattern). */}
            <p className="text-warm-black text-phi-1 leading-relaxed font-light">
              {content.answer}
            </p>

            <PostBody sections={content.sections} />

            {/* The owner's interlink CTA - straight to the product page
                this post sells, plus the BOQ path. */}
            <aside className="bg-warm-black mt-16 rounded-3xl p-8 sm:p-10">
              <p className="label-gcb text-ink/60">From the warehouse</p>
              <p className="font-display text-ink text-phi-1 mt-3 leading-snug">
                Every material in this guide is on racks at Al Sajaa,
                priced in AED for project volume.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <GcbButton href={post.productCta.href} size="md">
                  {post.productCta.label}
                </GcbButton>
                <Link
                  href="/contact"
                  className="chip-gcb border-ink/60 text-ink inline-flex items-center rounded-full border px-5 py-2.5 text-sm"
                >
                  Price your BOQ
                </Link>
              </div>
            </aside>

            <section className="mt-16" aria-label="Frequently asked questions">
              <h2 className="font-display text-warm-black text-phi-2 tracking-tight">
                Questions, answered.
              </h2>
              <div className="mt-6">
                <BlogFaq items={content.faq} />
              </div>
            </section>

            {/* Author block - the Organization, honestly */}
            <div className="border-warm-black/20 mt-14 flex flex-wrap items-center gap-4 border-t pt-8">
              <div>
                <p className="font-display text-warm-black">
                  {siteConfig.legalName}
                </p>
                <p className="text-warm-black/60 mt-1 text-sm leading-relaxed">
                  Written from the Al Sajaa warehouse, Sharjah - slabs on
                  racks, not stock photography.{" "}
                  <Link href="/about" className="u-line text-warm-black">
                    About the company
                  </Link>
                </p>
              </div>
            </div>
          </article>

          {/* Sticky TOC - pillars only, desktop only */}
          {post.kind === "pillar" && (
            <nav
              aria-label="On this page"
              className="hidden lg:block"
            >
              <div className="sticky top-28">
                <p className="label-gcb text-warm-black/60">On this page</p>
                <ul className="border-warm-black/15 mt-4 space-y-3 border-l pl-5">
                  {content.sections.map((section) => (
                    <li key={section.h2}>
                      <a
                        href={`#${anchorId(section.h2)}`}
                        className="text-warm-black/70 hover:text-warm-black text-sm leading-snug transition-colors"
                      >
                        {section.h2}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-24" aria-label="Related guides">
            <p className="label-gcb text-warm-black/60">Keep reading</p>
            <h2 className="font-display text-warm-black text-phi-2 mt-3 tracking-tight">
              Related guides.
            </h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PostCard key={r.slug} post={r} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
