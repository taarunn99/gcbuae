import { BLOG_CATEGORIES, BLOG_POSTS } from "@/config/blog";
import { filaCategories } from "@/config/fila";
import { jaquarCategories } from "@/config/jaquar";
import { siteConfig } from "@/config/site";

/**
 * llms.txt - the curated map answer engines and LLM crawlers read first
 * (AI Overviews, ChatGPT, Claude, Perplexity). Generated from the same
 * registries as the sitemap so it never drifts. Spec: llmstxt.org.
 */

export const dynamic = "force-static";

export function GET() {
  const base = siteConfig.url;

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> UAE wholesale supplier of KalingaStone engineered quartz, marble and terrazzo slabs (authorized reseller), Jaquar bathroom fittings (authorized dealer) and FILA surface care. Full slabs stocked at Al Sajaa, Sharjah; AED trade pricing; delivery to every emirate. B2B supply for contractors, developers, fabricators and interior design companies - supply-only, with authorized applicators available.`,
    "",
    `Company details: ${siteConfig.contact.email} - showroom and warehouse at Al Sajaa Industrial Area, Sharjah, UAE. Part of the Lapiz Group of Companies.`,
    "",
    "## Product ranges",
    "",
    `- [KalingaStone hub](${base}/kalingastone): 128 shades across three engineered materials`,
    `- [Quartz slabs](${base}/kalingastone/quartz): 69 shades, 7 series, NSF food safe, up to 3300 x 2000 mm`,
    `- [Engineered marble slabs](${base}/kalingastone/marble): 35 shades, repolishable, 304 x 125 cm`,
    `- [Terrazzo slabs](${base}/kalingastone/terrazzo): 24 shades, A1 fire class, exterior ready`,
    `- [Jaquar bathroom fittings](${base}/jaquar): 1,480 catalogued products with SKUs`,
    ...jaquarCategories.map(
      (c) => `- [Jaquar ${c.label}](${base}/jaquar/${c.slug})`,
    ),
    `- [FILA surface care](${base}/fila): 34 professional products, official distribution`,
    ...filaCategories.map((c) => `- [FILA ${c.label}](${base}/fila/${c.slug})`),
    "",
    "## Buying",
    "",
    `- [Contact and AED quotes](${base}/contact): BOQ pricing within one working day`,
    `- [About the company](${base}/about): 2024 Sharjah company in the Lapiz Group`,
    "",
    "## The Journal (guides and pricing)",
    "",
    ...BLOG_CATEGORIES.map(
      (c) => `- [${c.label}](${base}/blog/category/${c.slug})`,
    ),
    "",
    ...BLOG_POSTS.map(
      (p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
