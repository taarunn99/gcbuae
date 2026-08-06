import type { MetadataRoute } from "next";

import { quartzFamilies, quartzShades } from "@/config/kalingastone-quartz";
import { siteConfig } from "@/config/site";

// GOVERNANCE §6: auto-generated sitemap. Every future collection, brand-hub
// and shade page must be added here (or generated from its data source) the
// moment it exists — no orphan URLs, nothing indexable left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const core: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/kalingastone/quartz",
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

  return [...core, ...families, ...shades];
}
