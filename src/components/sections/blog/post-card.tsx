import Image from "next/image";
import Link from "next/link";

import {
  blogCategoryBySlug,
  blogHero,
  type BlogPostMeta,
} from "@/config/blog";

/**
 * Journal card - the index and related-posts unit. Whole card is one
 * crawlable link; category tag in the accent, phi display title,
 * one-line excerpt, read time.
 */
export function PostCard({
  post,
  featured = false,
}: {
  post: BlogPostMeta;
  featured?: boolean;
}) {
  const category = blogCategoryBySlug.get(post.category);
  // The featured card follows the page h1 directly, so it carries the
  // h2 slot (Lighthouse heading-order, 2026-08-20).
  const Heading = featured ? "h2" : "h3";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <div className="border-warm-black relative aspect-[4/3] overflow-hidden border">
        <Image
          src={blogHero(post.slug)}
          alt={post.heroAlt}
          fill
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading={featured ? "eager" : "lazy"}
          fetchPriority={featured ? "high" : undefined}
        />
      </div>
      <p className="label-gcb text-warm-black/65 mt-4">
        {category?.label}
        <span className="text-warm-black/60"> · {post.readMinutes} min read</span>
      </p>
      <Heading
        className={
          featured
            ? "font-display text-warm-black text-phi-2 mt-2 leading-tight tracking-tight"
            : "font-display text-warm-black text-phi-1 mt-2 leading-snug tracking-tight"
        }
      >
        {post.title}
      </Heading>
      <p className="text-warm-black/70 mt-2 leading-relaxed">
        {post.description}
      </p>
    </Link>
  );
}
