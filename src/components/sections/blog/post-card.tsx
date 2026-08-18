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
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
      aria-label={post.title}
    >
      <div className="border-warm-black relative aspect-[4/3] overflow-hidden border">
        <Image
          src={blogHero(post.slug)}
          alt={post.heroAlt}
          fill
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <p className="label-gcb text-bronze mt-4">
        {category?.label}
        <span className="text-warm-black/40"> · {post.readMinutes} min read</span>
      </p>
      <h3
        className={
          featured
            ? "font-display text-warm-black text-phi-2 mt-2 leading-tight tracking-tight"
            : "font-display text-warm-black text-phi-1 mt-2 leading-snug tracking-tight"
        }
      >
        {post.title}
      </h3>
      <p className="text-warm-black/70 mt-2 leading-relaxed">
        {post.description}
      </p>
    </Link>
  );
}
