import { BLOG_POSTS, blogHero } from "@/config/blog";
import { siteConfig } from "@/config/site";

/** RSS feed for The Journal - static, generated from the registry. */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const items = BLOG_POSTS.map((post) => {
    const url = `${siteConfig.url}/blog/${post.slug}`;
    return [
      "    <item>",
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <description>${escapeXml(post.description)}</description>`,
      `      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>`,
      `      <enclosure url="${siteConfig.url}${blogHero(post.slug)}" type="image/webp" length="0" />`,
      "    </item>",
    ].join("\n");
  }).join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>The Journal - ${escapeXml(siteConfig.name)}</title>`,
    `    <link>${siteConfig.url}/blog</link>`,
    "    <description>Field notes from the slab trade: guides to engineered marble, quartz, terrazzo, bathroom fittings and stone care for UAE project buyers.</description>",
    "    <language>en-ae</language>",
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
