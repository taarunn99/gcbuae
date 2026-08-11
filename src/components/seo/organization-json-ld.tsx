import { siteConfig } from "@/config/site";

/**
 * Organization structured data for search results.
 *
 * Unfilled siteConfig fields resolve to `undefined` so JSON.stringify drops
 * them - Google treats empty-string values as malformed rather than absent.
 */
export function OrganizationJsonLd() {
  const { address, contact, social } = siteConfig;
  const sameAs = [social.linkedin, social.instagram].filter(Boolean);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    // GOVERNANCE §6: Organization + LocalBusiness org-wide. Geo coordinates
    // and opening hours get added when Tarun supplies the showroom details.
    "@type": ["Organization", "LocalBusiness"],
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street || undefined,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode || undefined,
      addressCountry: address.country,
    },
  };

  if (contact.phone) {
    jsonLd.contactPoint = {
      "@type": "ContactPoint",
      telephone: contact.phone,
      email: contact.email,
      contactType: "sales",
      areaServed: "AE",
    };
  }

  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escaping `<` keeps a stray "</script>" in any config value from
        // closing the tag early.
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
