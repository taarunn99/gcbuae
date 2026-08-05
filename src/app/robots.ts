import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// GOVERNANCE §6: allow all, point at the sitemap. Keep this file the ONLY
// robots source — no meta noindex anywhere (the mistake killing a
// competitor's homepage).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
