/**
 * Single source of truth for company details that appear in metadata,
 * structured data, the header and the footer.
 */
export const siteConfig = {
  name: "Global Classic Building Materials",
  shortName: "GCB",
  legalName: "Global Classic Building Materials LLC",
  tagline: "Building materials trading across the UAE",
  description:
    "Global Classic Building Materials supplies and trades construction materials across the UAE, serving contractors, developers and consultants with reliable sourcing and on-time delivery.",
  url: "https://www.gcbuae.com",
  locale: "en_AE",
  contact: {
    email: "info@gcbuae.com",
    phone: "",
    whatsapp: "",
  },
  address: {
    street: "",
    city: "Dubai",
    region: "Dubai",
    postalCode: "",
    country: "AE",
  },
  social: {
    linkedin: "",
    instagram: "",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
