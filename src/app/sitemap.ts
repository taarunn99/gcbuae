import type { MetadataRoute } from "next";

import { quartzFamilies, quartzShades } from "@/config/kalingastone-quartz";
import { marbleFamilies, marbleShades } from "@/config/kalingastone-marble";
import {
  terrazzoCollections,
  terrazzoShades,
} from "@/config/kalingastone-terrazzo";
import { jaquarCategories } from "@/config/jaquar";
import { filaCategories } from "@/config/fila";
import { filaProducts } from "@/config/fila-products";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/config/blog";
import { siteConfig } from "@/config/site";

// GOVERNANCE §6: auto-generated sitemap. Every future collection, brand-hub
// and shade page must be added here (or generated from its data source) the
// moment it exists - no orphan URLs, nothing indexable left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const core: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/kalingastone",
    "/kalingastone/quartz",
    "/kalingastone/marble",
    "/kalingastone/terrazzo",
    "/kalingastone/terrazzo/fluting",
    "/jaquar",
    "/about",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  // Quartz colour-category and per-shade pages, generated from the data
  // source so a catalogue update can never orphan a URL.
  const families: MetadataRoute.Sitemap = quartzFamilies.map((f) => ({
    url: `${siteConfig.url}/kalingastone/quartz/colours/${f.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const shades: MetadataRoute.Sitemap = quartzShades.map((s) => ({
    url: `${siteConfig.url}/kalingastone/quartz/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const terrazzoCollectionUrls: MetadataRoute.Sitemap = terrazzoCollections.map(
    (c) => ({
      url: `${siteConfig.url}/kalingastone/terrazzo/collections/${c.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  const terrazzoShadeUrls: MetadataRoute.Sitemap = terrazzoShades.map((s) => ({
    url: `${siteConfig.url}/kalingastone/terrazzo/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const marbleFamilyUrls: MetadataRoute.Sitemap = marbleFamilies.map((f) => ({
    url: `${siteConfig.url}/kalingastone/marble/colours/${f.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const marbleShadeUrls: MetadataRoute.Sitemap = marbleShades.map((s) => ({
    url: `${siteConfig.url}/kalingastone/marble/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const jaquarUrls: MetadataRoute.Sitemap = jaquarCategories.flatMap((c) => [
    {
      url: `${siteConfig.url}/jaquar/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...c.collections.map((col) => ({
      url: `${siteConfig.url}/jaquar/${c.slug}/${col.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ]);

  const filaUrls: MetadataRoute.Sitemap = [
    "/fila",
    "/fila/solutions",
    "/fila/about",
    "/fila/projects",
    ...filaCategories.map((c) => `/fila/${c.slug}`),
    ...filaProducts.map((p) => `/fila/${p.slug}`),
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/fila" ? 0.7 : 0.5,
  }));

  // The Journal - every post and category page, generated from the
  // registry so a new post can never be orphaned.
  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: "monthly",
    priority: p.kind === "pillar" ? 0.7 : 0.6,
  }));

  const blogCategories: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((c) => ({
    url: `${siteConfig.url}/blog/category/${c.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    ...blogPosts,
    ...blogCategories,
    ...core,
    ...jaquarUrls,
    ...filaUrls,
    ...families,
    ...shades,
    ...terrazzoCollectionUrls,
    ...terrazzoShadeUrls,
    ...marbleFamilyUrls,
    ...marbleShadeUrls,
  ];
}
