import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/sections/blog/post-card";
import { Breadcrumb, breadcrumbJsonLd, type Crumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import {
  BLOG_CATEGORIES,
  blogCategoryBySlug,
  postsInCategory,
  type BlogCategory,
} from "@/config/blog";
import { siteConfig } from "@/config/site";

/**
 * Journal category pages - indexed with their own intro paragraphs per
 * the package spec, listing the category's guides as cards.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = blogCategoryBySlug.get(category as BlogCategory);
  if (!cat) return {};
  return {
    title: `${cat.label} - The Journal`,
    description: cat.intro.slice(0, 155).replace(/\s+\S*$/, "") + "...",
    alternates: { canonical: `/blog/category/${cat.slug}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = blogCategoryBySlug.get(category as BlogCategory);
  if (!cat) notFound();
  const posts = postsInCategory(cat.slug);

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Journal", href: "/blog" },
    { label: cat.label, href: `/blog/category/${cat.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${cat.label} - The Journal`,
        url: `${siteConfig.url}/blog/category/${cat.slug}`,
        hasPart: posts.map((p) => ({
          "@type": "Article",
          headline: p.title,
          url: `${siteConfig.url}/blog/${p.slug}`,
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
        <h1 className="font-display text-warm-black text-phi-3 mt-10 tracking-tight">
          {cat.label}
        </h1>
        <p className="text-warm-black/75 mt-6 max-w-2xl leading-relaxed">
          {cat.intro}
        </p>
        <RuleIn className="mt-10 w-full" />
        <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </main>
  );
}
