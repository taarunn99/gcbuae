import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// GOVERNANCE §6: auto-generated sitemap. Every future collection, brand-hub
// and shade page must be added here (or generated from its data source) the
// moment it exists — no orphan URLs, nothing indexable left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/about", "/contact"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
