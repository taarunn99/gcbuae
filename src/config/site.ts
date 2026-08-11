/**
 * Single source of truth for company details that appear in metadata,
 * structured data, the header and the footer.
 */
export const siteConfig = {
  name: "Global Classic Building Materials",
  shortName: "GCB",
  legalName: "Global Classic Building Materials LLC",
  tagline: "Surfaces for enduring interiors",
  description:
    "Global Classic Building Materials supplies natural stone, marble, terrazzo and finishing materials across the UAE — for contractors, developers and consultants building interiors meant to last.",
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
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
  ],
  products: [
    {
      slug: "quartz",
      label: "Quartz",
      blurb: "Engineered quartz surfaces for counters, cladding and floors.",
    },
    {
      slug: "naturally-engineered-marble",
      label: "Naturally Engineered Marble",
      blurb: "The depth of natural stone with engineered consistency.",
    },
    {
      slug: "terrazzo",
      label: "Terrazzo",
      blurb: "Made of fragments, finished as one — floors and precast pieces.",
    },
    {
      slug: "showers",
      label: "Showers",
      blurb: "Enclosures and shower systems, built to be used daily.",
    },
    {
      slug: "taps",
      label: "Taps",
      blurb: "Brassware with weight in the hand.",
    },
    {
      slug: "sanitaryware",
      label: "Sanitaryware",
      blurb: "Basins, WCs and fittings for considered bathrooms.",
    },
    {
      slug: "shower-trays",
      label: "Shower Trays",
      blurb: "Low-profile stone-resin trays that stand up to standing on.",
    },
    {
      slug: "sealers-cleaners",
      label: "Sealers & Cleaners",
      blurb: "Care systems that keep marble looking newly laid.",
    },
  ],
  contactRecipient: "info@gcbuae.com",
} as const;

export type SiteConfig = typeof siteConfig;
