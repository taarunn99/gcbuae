import type { MetadataRoute } from "next";

import { quartzFamilies, quartzShades } from "@/config/kalingastone-quartz";
import { marbleFamilies, marbleShades } from "@/config/kalingastone-marble";
import {
  terrazzoCollections,
  terrazzoShades,
} from "@/config/kalingastone-terrazzo";
import { jaquarCategories } from "@/config/jaquar";
import { siteConfig } from "@/config/site";

// GOVERNANCE §6: auto-generated sitemap. Every future collection, brand-hub
// and shade page must be added here (or generated from its data source) the
// moment it exists - no orphan URLs, nothing indexable left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const core: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/kalingastone/quartz",
    "/kalingastone/marble",
    "/kalingastone/terrazzo",
    "/kalingastone/terrazzo/fluting",
    "/jaquar",
    "/about",
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

  return [
    ...core,
    ...jaquarUrls,
    ...families,
    ...shades,
    ...terrazzoCollectionUrls,
    ...terrazzoShadeUrls,
    ...marbleFamilyUrls,
    ...marbleShadeUrls,
  ];
}
