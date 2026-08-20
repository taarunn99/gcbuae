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
    // "GCB UAE" is the branded query buyers actually type; naming it here
    // ties that query to this entity even though the visible copy never
    // says it.
    alternateName: [siteConfig.shortName, "GCB UAE"],
    url: siteConfig.url,
    // Google requires >=112px square for Organization logo; apple-icon is
    // 180x180 and served at a stable path (no build hash).
    logo: `${siteConfig.url}/apple-icon.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street || undefined,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode || undefined,
      addressCountry: address.country,
    },
    // Entity web: GCB is a Lapiz Group company (owner, 2026-08-18). The
    // group's web home is lapizblue.com - naming it links the two
    // knowledge-graph entities the partnership plan builds on.
    parentOrganization: {
      "@type": "Organization",
      name: "Lapiz Group of Companies",
      url: "https://www.lapizblue.com",
    },
  };

  if (contact.phone) {
    jsonLd.contactPoint = [
      {
        "@type": "ContactPoint",
        telephone: contact.phone,
        email: contact.email,
        contactType: "sales",
        areaServed: "AE",
      },
      {
        "@type": "ContactPoint",
        telephone: contact.landline,
        email: contact.salesEmail,
        contactType: "customer service",
        areaServed: "AE",
      },
    ];
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
