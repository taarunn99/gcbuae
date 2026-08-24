import { siteConfig } from "@/config/site";

/**
 * WebSite structured data - the lever for the "site name" Google shows in
 * results and for tying the brand query "global classic" to this domain
 * (owner, 2026-08-24: the site ranked for "gcb" but not the full name).
 * Google reads this on the home page; rendering it site-wide alongside
 * OrganizationJsonLd is harmless and keeps the @id join in one place.
 *
 * No SearchAction: the site has no visitor-facing search URL, and schema
 * must mirror real functionality.
 */
export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    // The concise, on-page brand ("Global Classic" appears in the header,
    // footer and body of every page) - Google prefers the short widely
    // used name, with the acronym and full name as alternates.
    name: siteConfig.brandName,
    alternateName: [siteConfig.shortName, siteConfig.name],
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
