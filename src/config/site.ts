/**
 * Single source of truth for company details that appear in metadata,
 * structured data, the header and the footer.
 */
export type GroupCompany = {
  name: string;
  role: string;
  href?: string;
  logo?: string;
  here?: boolean;
};

/**
 * The Lapiz Group of Companies - rendered as the fan deck on /about.
 * href only where a site is live; the rest are "in the making"
 * (owner, 2026-08-18). Global Classic is the you-are-here card.
 */
const lapizGroup: GroupCompany[] = [
    {
      name: "Lapiz Blue General Trading LLC",
      role: "Construction chemicals",
      href: "https://www.lapizblue.com",
      logo: "/brands/lapizblue.png",
    },
    {
      name: "Alsama Metal Coatings & Ind LLC",
      role: "Metal coatings",
    },
    {
      name: "Global Classic Building Materials LLC",
      role: "Stone, bathware & care",
      here: true,
    },
    {
      name: "Montolite Building Materials LLC",
      role: "Building materials",
    },
    {
      name: "Sixty Newton Technical Services LLC",
      role: "The application arm",
      href: "https://www.60newton.com",
    },
];

export const siteConfig = {
  name: "Global Classic Building Materials",
  shortName: "GCB",
  legalName: "Global Classic Building Materials LLC",
  tagline: "Surfaces for enduring interiors",
  description:
    "Global Classic Building Materials supplies natural stone, marble, terrazzo and finishing materials across the UAE - for contractors, developers and consultants building interiors meant to last.",
  url: "https://www.gcbuae.com",
  locale: "en_AE",
  contact: {
    email: "info@gcbuae.com",
    phone: "+971 52 992 7827",
    whatsapp: "971529927827",
  },
  address: {
    street: "9M62+45M, Al Sajaa, Al Jlail",
    city: "Sharjah",
    region: "Sharjah",
    postalCode: "",
    country: "AE",
  },
  social: {
    linkedin: "",
    instagram: "https://www.instagram.com/globalclassic.bmt/",
  },
  group: lapizGroup,
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
      blurb: "Made of fragments, finished as one - floors and precast pieces.",
    },
    {
      slug: "faucets",
      label: "Faucets & Taps",
      blurb: "Brassware with weight in the hand - mixers, taps and matched accessories.",
    },
    {
      slug: "wash-basins",
      label: "Wash Basins",
      blurb: "Every installation type, from table top sinks to pedestals.",
    },
    {
      slug: "water-closets",
      label: "Water Closets",
      blurb: "Rimless WCs, smart flushing and the systems behind the wall.",
    },
    {
      slug: "showers-enclosures",
      label: "Showers & Enclosures",
      blurb: "Rain showers, panels and tempered glass, one category.",
    },
    {
      slug: "wellness",
      label: "Wellness",
      blurb: "Bathtubs, whirlpools, spas, saunas and steam.",
    },
    {
      slug: "water-heaters",
      label: "Water Heaters",
      blurb: "One-litre instant units to 500-litre plant tanks.",
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
