/**
 * The Journal registry - single source of truth for the blog, built
 * from the owner's BLOG-PACKAGE.md (2026-08-18). Slugs, title tags and
 * meta descriptions are VERBATIM from the package and may never be
 * edited (expansion protocol §7); the package's [LINK] targets are
 * mapped onto the routes this site actually has. Everything derives
 * from this array: routes, sitemap, RSS, JSON-LD, related posts, the
 * category pages, and the per-post product CTA (the owner's
 * interlinking button). One primary query per post - this registry IS
 * the cannibalization check demanded by GOVERNANCE §1.
 */

export type BlogCategory =
  | "stone-guides"
  | "care-maintenance"
  | "bathrooms"
  | "wellness"
  | "buying-guides";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  kind: "pillar" | "cluster";
  primaryQuery: string;
  secondaryQueries: string[];
  datePublished: string;
  dateModified: string;
  heroAlt: string;
  /** The owner's interlink button - the product page this post sells. */
  productCta: { href: string; label: string };
  /** Related posts (same cluster), slugs in display order. */
  related: string[];
  readMinutes: number;
};

export const BLOG_CATEGORIES: {
  slug: BlogCategory;
  label: string;
  intro: string;
}[] = [
  {
    slug: "stone-guides",
    label: "Stone Guides",
    intro:
      "Engineered marble, quartz and terrazzo explained the way specifiers need them explained: composition, honest comparisons, formats and where each surface belongs. These guides are written from a Sharjah warehouse that holds all three materials as full slabs, not from a search results page. Start with a pillar guide for the whole picture, or jump to the comparison that answers your exact question - every post opens with the direct answer and earns the detail afterwards.",
  },
  {
    slug: "care-maintenance",
    label: "Care & Maintenance",
    intro:
      "Stone fails in the UAE for local reasons: sand underfoot, hard water on vanities, acids in the kitchen and heat everywhere. This cluster covers the whole discipline - daily cleaning, sealing, stain removal and the etch-or-stain diagnosis that decides the fix - with product chemistry matched to each stone. The routines are short and the banned list is shorter; follow both and a floor polished this year still reads polished in ten.",
  },
  {
    slug: "bathrooms",
    label: "Bathrooms",
    intro:
      "Taps, showers, sanitaryware and the finishes that survive desalinated hard water. These guides tier the brands honestly, explain PVD coatings, size shower systems to real building pressure and settle the wall-hung question - always from the buyer's side of the counter. Whether you are specifying one villa master bath or forty apartment washrooms, the decisions are the same four or five, and each post takes one of them apart.",
  },
  {
    slug: "wellness",
    label: "Wellness & Spa",
    intro:
      "Whirlpool baths, spas and the physics of enjoying hot water in a hot country. The UAE inverts spa ownership: chillers matter as much as heaters, covers fight sun rather than snow, and filled weight decides what a villa roof can carry. These guides cover the buying decision, the installation planning nobody warns you about, and the maintenance calendar that keeps water clean through a Gulf summer.",
  },
  {
    slug: "buying-guides",
    label: "Buying Guides",
    intro:
      "Prices in honest AED ranges, quote comparisons that expose weak suppliers, and specification advice for commercial floors. This cluster exists because stone buying in the UAE runs on opaque numbers and confident traders; the antidote is knowing what drives a quote, what documentation to demand and which questions make a broker go quiet. Written by a stockist with slabs on racks, and priced accordingly.",
  },
];

const P = "2026-08-18";

export const BLOG_POSTS: BlogPostMeta[] = [
  // ---------------- PILLARS ----------------
  {
    slug: "engineered-marble-complete-guide",
    title: "Engineered Marble: The Complete Guide (2026)",
    description:
      "What engineered marble is, how it's made, costs in the UAE, and where it outperforms natural stone. A specifier's guide.",
    category: "stone-guides",
    kind: "pillar",
    primaryQuery: "engineered marble",
    secondaryQueries: ["artificial marble", "engineered marble vs natural", "composite marble uae"],
    datePublished: P,
    dateModified: P,
    heroAlt: "White engineered marble slab with grey veining in a factory finishing hall",
    productCta: { href: "/kalingastone/marble", label: "Browse the engineered marble range" },
    related: ["quartz-countertops-complete-guide", "quartz-vs-marble", "engineered-marble-vs-natural-marble", "is-engineered-marble-good-for-kitchens"],
    readMinutes: 9,
  },
  {
    slug: "quartz-countertops-complete-guide",
    title: "Quartz Countertops: The Complete UAE Guide",
    description:
      "Everything on quartz worktops: composition, heat and stain behaviour, slab sizes, edges, and Dubai pricing.",
    category: "stone-guides",
    kind: "pillar",
    primaryQuery: "quartz countertops uae",
    secondaryQueries: ["quartz slabs", "quartz worktop dubai", "engineered quartz"],
    datePublished: P,
    dateModified: P,
    heroAlt: "White quartz worktop with waterfall island edge in a modern kitchen",
    productCta: { href: "/kalingastone/quartz", label: "Browse the quartz range" },
    related: ["engineered-marble-complete-guide", "quartz-vs-granite-uae", "quartz-slab-sizes-thickness", "does-quartz-stain-or-scratch"],
    readMinutes: 9,
  },
  {
    slug: "terrazzo-flooring-complete-guide",
    title: "Terrazzo Flooring: The Complete Guide",
    description:
      "Terrazzo composition, tiles vs slabs vs poured, pros and cons, and why it suits UAE villas and commercial floors.",
    category: "stone-guides",
    kind: "pillar",
    primaryQuery: "terrazzo flooring",
    secondaryQueries: ["terrazzo tiles uae", "terrazzo pros and cons", "terrazzo slab"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Terrazzo floor with green and grey marble chips sweeping through a sunlit room",
    productCta: { href: "/kalingastone/terrazzo", label: "Browse the terrazzo range" },
    related: ["terrazzo-pros-and-cons", "terrazzo-tiles-vs-slabs", "terrazzo-kitchen-bathroom", "terrazzo-design-trends-2026"],
    readMinutes: 8,
  },
  {
    slug: "bathroom-fittings-guide-uae",
    title: "Bathroom Fittings: A UAE Buyer's Guide",
    description:
      "Taps, showers, sanitaryware and finishes that survive UAE hard water. What to specify and what to skip.",
    category: "bathrooms",
    kind: "pillar",
    primaryQuery: "bathroom fittings uae",
    secondaryQueries: ["bathroom accessories dubai", "best bathroom fittings brands", "sanitary ware uae"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Brushed brass basin mixer on a white stone vanity against a sage wall",
    productCta: { href: "/jaquar", label: "Explore the Jaquar range" },
    related: ["best-bathroom-brands-uae", "how-to-choose-shower-system", "wall-hung-vs-floor-mounted-toilet", "black-vs-brushed-metal-bathroom-finishes"],
    readMinutes: 9,
  },
  {
    slug: "marble-care-maintenance-guide",
    title: "Marble Care & Maintenance: The UAE Guide",
    description:
      "How to clean, seal and restore marble in UAE conditions. Products, mistakes, and a maintenance calendar.",
    category: "care-maintenance",
    kind: "pillar",
    primaryQuery: "marble maintenance",
    secondaryQueries: ["marble care uae", "how to maintain marble floors", "marble cleaning guide"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Stone care still life with cleaning bottle, sage cloth and brush on marble",
    productCta: { href: "/fila", label: "Browse FILA surface care" },
    related: ["how-to-clean-marble-floors-uae", "remove-stains-from-marble", "how-to-seal-marble", "marble-etching-vs-staining"],
    readMinutes: 9,
  },
  {
    slug: "jacuzzi-spa-buyers-guide-uae",
    title: "Jacuzzi & Spa Buyer's Guide for UAE Homes",
    description:
      "Choosing a home jacuzzi or spa in the UAE: types, sizes, installation, running costs, and rooftop rules.",
    category: "wellness",
    kind: "pillar",
    primaryQuery: "jacuzzi uae",
    secondaryQueries: ["home spa dubai", "buy jacuzzi dubai", "whirlpool bathtub"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Rooftop terrace spa pool at dusk with stone deck and sage planters",
    productCta: { href: "/jaquar", label: "Explore Jaquar wellness" },
    related: ["jacuzzi-vs-hot-tub-vs-spa", "jacuzzi-maintenance-uae", "whirlpool-bath-installation-guide", "bathroom-fittings-guide-uae"],
    readMinutes: 8,
  },
  // ---------------- CLUSTERS ----------------
  {
    slug: "quartz-vs-marble",
    title: "Quartz vs Marble: Which Should You Choose?",
    description:
      "Composition, durability, cost and looks compared, with UAE-specific guidance for kitchens, bathrooms and floors.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "quartz vs marble",
    secondaryQueries: ["difference between quartz and marble", "marble or quartz countertop"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Quartz slab and marble slab samples leaning side by side against a wall",
    productCta: { href: "/kalingastone", label: "Compare the KalingaStone materials" },
    related: ["engineered-marble-complete-guide", "quartz-countertops-complete-guide", "quartz-vs-granite-uae"],
    readMinutes: 6,
  },
  {
    slug: "engineered-marble-vs-natural-marble",
    title: "Engineered vs Natural Marble: Honest Comparison",
    description:
      "Where engineered marble beats quarried stone, where it doesn't, and how to decide for a UAE project.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "engineered marble vs natural marble",
    secondaryQueries: ["artificial vs real marble", "composite marble comparison"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Edges of engineered and natural marble slabs meeting under studio light",
    productCta: { href: "/kalingastone/marble", label: "See the engineered marble shades" },
    related: ["engineered-marble-complete-guide", "quartz-vs-marble", "marble-look-without-natural-marble"],
    readMinutes: 5,
  },
  {
    slug: "marble-price-dubai",
    title: "Marble Prices in Dubai (2026): Real Ranges",
    description:
      "What marble actually costs per square metre in Dubai, by type and grade, and what drives the price.",
    category: "buying-guides",
    kind: "cluster",
    primaryQuery: "marble price dubai",
    secondaryQueries: ["marble cost uae", "marble per square meter price"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Marble slabs with paper tags standing on warehouse racks",
    productCta: { href: "/kalingastone/marble", label: "Price the marble range" },
    related: ["engineered-marble-complete-guide", "marble-slab-supplier-uae-how-to-choose", "quartz-countertop-price-dubai"],
    readMinutes: 6,
  },
  {
    slug: "marble-slab-supplier-uae-how-to-choose",
    title: "How to Choose a Marble Slab Supplier in UAE",
    description:
      "What separates a serious slab supplier from a trader: stock, viewing, technical support, and after-sales.",
    category: "buying-guides",
    kind: "cluster",
    primaryQuery: "marble slab supplier uae",
    secondaryQueries: ["marble supplier dubai", "stone supplier abu dhabi"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Gloved hand tilting a marble slab on a warehouse rack for inspection",
    productCta: { href: "/kalingastone/marble", label: "View slabs in stock" },
    related: ["engineered-marble-complete-guide", "marble-price-dubai", "commercial-flooring-stone-guide"],
    readMinutes: 6,
  },
  {
    slug: "best-marble-flooring-villa-uae",
    title: "Best Marble for Villa Flooring in the UAE",
    description:
      "Which marbles work for UAE villa floors: light palettes, engineered options, finishes, and slab formats.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "marble flooring villa",
    secondaryQueries: ["best marble for flooring uae", "villa flooring dubai"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Pale marble floor in an empty villa hallway with tall windows",
    productCta: { href: "/kalingastone/marble", label: "Browse flooring marbles" },
    related: ["engineered-marble-complete-guide", "engineered-marble-vs-natural-marble", "how-to-clean-marble-floors-uae"],
    readMinutes: 5,
  },
  {
    slug: "marble-bathroom-ideas",
    title: "Marble Bathroom Ideas That Age Well",
    description:
      "Marble bathroom design that outlasts trends: palettes, bookmatching, fluting, and pairing stone with metal finishes.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "marble bathroom",
    secondaryQueries: ["marble bathroom design", "luxury bathroom uae"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Bookmatched marble feature wall behind a stone vanity with brass tap",
    productCta: { href: "/kalingastone/marble", label: "Find your bathroom marble" },
    related: ["engineered-marble-complete-guide", "bathroom-fittings-guide-uae", "small-bathroom-design-uae"],
    readMinutes: 5,
  },
  {
    slug: "is-engineered-marble-good-for-kitchens",
    title: "Is Engineered Marble Good for Kitchens?",
    description:
      "Where engineered marble works in kitchens, where quartz is smarter, and how the resin behaves near heat.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "engineered marble kitchen",
    secondaryQueries: ["engineered marble countertop", "marble worktop kitchen"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Engineered marble kitchen island with a folded sage linen towel",
    productCta: { href: "/kalingastone/marble", label: "See kitchen-ready marbles" },
    related: ["engineered-marble-complete-guide", "quartz-countertops-complete-guide", "quartz-vs-granite-uae"],
    readMinutes: 5,
  },
  {
    slug: "quartz-vs-granite-uae",
    title: "Quartz vs Granite for UAE Kitchens",
    description:
      "Hardness, heat, sealing and price compared for the two default worktop stones in the UAE market.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "quartz vs granite",
    secondaryQueries: ["granite vs quartz countertops uae", "which is better quartz or granite"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Quartz and granite worktop samples edge to edge on a workbench",
    productCta: { href: "/kalingastone/quartz", label: "Browse the quartz range" },
    related: ["quartz-countertops-complete-guide", "quartz-vs-marble", "does-quartz-stain-or-scratch"],
    readMinutes: 5,
  },
  {
    slug: "quartz-slab-sizes-thickness",
    title: "Quartz Slab Sizes & Thickness Explained",
    description:
      "Standard and jumbo quartz slab dimensions, thickness options, and how format drives design and waste.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "quartz slab sizes",
    secondaryQueries: ["quartz thickness", "jumbo quartz slab"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Jumbo quartz slab lying on a fabrication table with a measuring rule",
    productCta: { href: "/kalingastone/quartz", label: "See slab formats in stock" },
    related: ["quartz-countertops-complete-guide", "quartz-countertop-price-dubai", "white-quartz-countertops-styles"],
    readMinutes: 5,
  },
  {
    slug: "does-quartz-stain-or-scratch",
    title: "Does Quartz Stain or Scratch? Straight Answers",
    description:
      "What actually damages quartz worktops, what doesn't, and the few habits that keep them flawless.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "does quartz stain",
    secondaryQueries: ["does quartz scratch", "quartz countertop problems"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Coffee spill beading on a white quartz worktop beside a sage cloth",
    productCta: { href: "/kalingastone/quartz", label: "Browse stain-proof quartz" },
    related: ["quartz-countertops-complete-guide", "quartz-vs-granite-uae", "stone-cleaning-products-guide"],
    readMinutes: 5,
  },
  {
    slug: "white-quartz-countertops-styles",
    title: "White Quartz Countertops: Choosing the Right White",
    description:
      "Calacatta-look, Carrara-look and pure whites compared, and which white quartz suits UAE kitchens.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "white quartz countertops",
    secondaryQueries: ["calacatta quartz", "white quartz kitchen"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Three white quartz samples fanned: plain, Carrara-look and Calacatta-look",
    productCta: { href: "/kalingastone/quartz/colours/white", label: "Browse the white quartz shades" },
    related: ["quartz-countertops-complete-guide", "quartz-slab-sizes-thickness", "marble-look-without-natural-marble"],
    readMinutes: 5,
  },
  {
    slug: "quartz-countertop-price-dubai",
    title: "Quartz Countertop Prices in Dubai (2026)",
    description:
      "Installed quartz worktop pricing in AED, what drives the quote, and how to compare offers.",
    category: "buying-guides",
    kind: "cluster",
    primaryQuery: "quartz price dubai",
    secondaryQueries: ["quartz countertop cost uae", "quartz per square meter"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Bridge saw cutting a white quartz slab with water spray",
    productCta: { href: "/kalingastone/quartz", label: "Price the quartz range" },
    related: ["quartz-countertops-complete-guide", "marble-price-dubai", "quartz-slab-sizes-thickness"],
    readMinutes: 5,
  },
  {
    slug: "terrazzo-pros-and-cons",
    title: "Terrazzo Flooring: Pros and Cons, Honestly",
    description:
      "The genuine advantages and drawbacks of terrazzo, and who should and shouldn't choose it.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "terrazzo pros and cons",
    secondaryQueries: ["terrazzo disadvantages", "is terrazzo good"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Polished terrazzo surface in raking light showing chips and grind",
    productCta: { href: "/kalingastone/terrazzo", label: "Browse the terrazzo range" },
    related: ["terrazzo-flooring-complete-guide", "terrazzo-tiles-vs-slabs", "commercial-flooring-stone-guide"],
    readMinutes: 5,
  },
  {
    slug: "terrazzo-tiles-vs-slabs",
    title: "Terrazzo Tiles vs Slabs vs Poured: Which Format?",
    description:
      "Three ways to get a terrazzo floor compared: cost, speed, joints and where each format wins.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "terrazzo tiles",
    secondaryQueries: ["terrazzo slab", "poured terrazzo vs tiles"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Stack of terrazzo tiles beside a large terrazzo slab against a wall",
    productCta: { href: "/kalingastone/terrazzo", label: "See terrazzo formats" },
    related: ["terrazzo-flooring-complete-guide", "terrazzo-pros-and-cons", "terrazzo-design-trends-2026"],
    readMinutes: 5,
  },
  {
    slug: "terrazzo-kitchen-bathroom",
    title: "Terrazzo in Kitchens & Bathrooms: What Works",
    description:
      "Using terrazzo beyond floors: worktops, walls, showers, and the finishes that make wet areas safe.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "terrazzo bathroom",
    secondaryQueries: ["terrazzo kitchen", "terrazzo countertop"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Full-height terrazzo shower walls with a brushed metal shower column",
    productCta: { href: "/kalingastone/terrazzo", label: "Browse wet-area terrazzo" },
    related: ["terrazzo-flooring-complete-guide", "marble-bathroom-ideas", "terrazzo-tiles-vs-slabs"],
    readMinutes: 5,
  },
  {
    slug: "terrazzo-design-trends-2026",
    title: "Terrazzo Design in 2026: Beyond the Speckle",
    description:
      "Where terrazzo design is going: oversized chips, fluting, tonal palettes and terrazzo furniture.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "terrazzo design",
    secondaryQueries: ["terrazzo trends", "terrazzo interior design"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Palladiana terrazzo floor with oversized marble fragments in a gallery",
    productCta: { href: "/kalingastone/terrazzo/fluting", label: "See the fluted terrazzo" },
    related: ["terrazzo-flooring-complete-guide", "terrazzo-tiles-vs-slabs", "terrazzo-kitchen-bathroom"],
    readMinutes: 5,
  },
  {
    slug: "best-bathroom-brands-uae",
    title: "Best Bathroom Brands in the UAE: Honest Tiers",
    description:
      "The sanitaryware and fittings brands that matter in the UAE market, tiered by build quality and value.",
    category: "bathrooms",
    kind: "cluster",
    primaryQuery: "best bathroom brands uae",
    secondaryQueries: ["sanitary ware brands", "bathroom fittings brands dubai"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Coordinated brushed graphite bathroom fittings arranged on white marble",
    productCta: { href: "/jaquar", label: "Explore the Jaquar range" },
    related: ["bathroom-fittings-guide-uae", "black-vs-brushed-metal-bathroom-finishes", "how-to-choose-shower-system"],
    readMinutes: 6,
  },
  {
    slug: "how-to-choose-shower-system",
    title: "How to Choose a Shower System",
    description:
      "Rain heads, hand showers, thermostatics and concealed valves explained, sized for UAE water pressure.",
    category: "bathrooms",
    kind: "cluster",
    primaryQuery: "shower system guide",
    secondaryQueries: ["rain shower uae", "thermostatic shower", "concealed shower"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Round rain shower head releasing water strands against dark green stone",
    productCta: { href: "/jaquar", label: "Browse Jaquar showers" },
    related: ["bathroom-fittings-guide-uae", "best-bathroom-brands-uae", "small-bathroom-design-uae"],
    readMinutes: 5,
  },
  {
    slug: "wall-hung-vs-floor-mounted-toilet",
    title: "Wall-Hung vs Floor-Mounted Toilets",
    description:
      "The real differences: cleaning, cost, installation and reliability, decided for UAE apartments and villas.",
    category: "bathrooms",
    kind: "cluster",
    primaryQuery: "wall hung toilet",
    secondaryQueries: ["wall mounted vs floor toilet", "concealed cistern"],
    datePublished: P,
    dateModified: P,
    heroAlt: "White wall-hung toilet floating above a continuous stone floor",
    productCta: { href: "/jaquar", label: "Browse Jaquar sanitaryware" },
    related: ["bathroom-fittings-guide-uae", "small-bathroom-design-uae", "how-to-choose-shower-system"],
    readMinutes: 5,
  },
  {
    slug: "black-vs-brushed-metal-bathroom-finishes",
    title: "Matte Black vs Brushed Metals in Bathrooms",
    description:
      "How black, brass, graphite and blush gold finishes wear in UAE water, and how to choose one family.",
    category: "bathrooms",
    kind: "cluster",
    primaryQuery: "matte black taps",
    secondaryQueries: ["brushed brass bathroom", "pvd finish taps"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Four basin taps in matte black, brushed brass, graphite and blush gold",
    productCta: { href: "/jaquar", label: "See the PVD finish families" },
    related: ["bathroom-fittings-guide-uae", "marble-bathroom-ideas", "best-bathroom-brands-uae"],
    readMinutes: 5,
  },
  {
    slug: "small-bathroom-design-uae",
    title: "Small Bathroom Design That Feels Larger",
    description:
      "Layout, large-format stone, wall-hung fittings and light: making compact UAE bathrooms feel generous.",
    category: "bathrooms",
    kind: "cluster",
    primaryQuery: "small bathroom design",
    secondaryQueries: ["small bathroom ideas uae", "compact bathroom"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Compact washroom wrapped in one pale stone with frameless glass",
    productCta: { href: "/jaquar", label: "Fit out a compact bathroom" },
    related: ["bathroom-fittings-guide-uae", "marble-bathroom-ideas", "wall-hung-vs-floor-mounted-toilet"],
    readMinutes: 5,
  },
  {
    slug: "how-to-clean-marble-floors-uae",
    title: "How to Clean Marble Floors in the UAE",
    description:
      "The correct daily and weekly routine for marble in sandy, hard-water conditions, and what never to use.",
    category: "care-maintenance",
    kind: "cluster",
    primaryQuery: "how to clean marble floors",
    secondaryQueries: ["marble floor cleaning uae", "marble cleaner"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Dust mop gliding across a pale marble floor in morning light",
    productCta: { href: "/fila", label: "Get the right marble cleaner" },
    related: ["marble-care-maintenance-guide", "remove-stains-from-marble", "stone-cleaning-products-guide"],
    readMinutes: 5,
  },
  {
    slug: "remove-stains-from-marble",
    title: "How to Remove Stains from Marble",
    description:
      "Poultice methods by stain type: oil, tea, rust, ink, and when a mark is an etch, not a stain.",
    category: "care-maintenance",
    kind: "cluster",
    primaryQuery: "how to remove stains from marble",
    secondaryQueries: ["marble stain removal", "marble poultice"],
    datePublished: P,
    dateModified: P,
    heroAlt: "White poultice paste covered with film on a stained marble surface",
    productCta: { href: "/fila", label: "Browse FILA problem solvers" },
    related: ["marble-care-maintenance-guide", "marble-etching-vs-staining", "how-to-seal-marble"],
    readMinutes: 5,
  },
  {
    slug: "how-to-seal-marble",
    title: "How to Seal Marble (And When Not To)",
    description:
      "Choosing and applying impregnating sealers, testing whether stone needs sealing, and honest limits.",
    category: "care-maintenance",
    kind: "cluster",
    primaryQuery: "how to seal marble",
    secondaryQueries: ["marble sealer", "sealing natural stone"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Water drops beading on a freshly sealed honed marble surface",
    productCta: { href: "/fila", label: "Browse FILA protectors" },
    related: ["marble-care-maintenance-guide", "remove-stains-from-marble", "marble-etching-vs-staining"],
    readMinutes: 5,
  },
  {
    slug: "marble-etching-vs-staining",
    title: "Marble Etching vs Staining: Know the Difference",
    description:
      "Why the distinction decides the fix, how to diagnose in ten seconds, and the repair path for each.",
    category: "care-maintenance",
    kind: "cluster",
    primaryQuery: "marble etching",
    secondaryQueries: ["etch marks on marble", "marble dull spots"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Dull etched glass ring on a dark polished marble tabletop",
    productCta: { href: "/fila", label: "Fix it with FILA care" },
    related: ["marble-care-maintenance-guide", "remove-stains-from-marble", "how-to-seal-marble"],
    readMinutes: 5,
  },
  {
    slug: "stone-cleaning-products-guide",
    title: "Stone Cleaning Products: What to Use Where",
    description:
      "A straight guide to neutral cleaners, degreasers, rust removers and protectors across marble, quartz and terrazzo.",
    category: "care-maintenance",
    kind: "cluster",
    primaryQuery: "stone cleaning products",
    secondaryQueries: ["stone cleaner uae", "fila stone care"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Four care bottles on a stone shelf above marble, quartz and terrazzo tiles",
    productCta: { href: "/fila", label: "Browse the FILA system" },
    related: ["marble-care-maintenance-guide", "how-to-clean-marble-floors-uae", "how-to-seal-marble"],
    readMinutes: 5,
  },
  {
    slug: "jacuzzi-vs-hot-tub-vs-spa",
    title: "Jacuzzi vs Hot Tub vs Spa: The Differences",
    description:
      "What the three terms actually mean, whirlpool baths vs outdoor spas, and which fits a UAE home.",
    category: "wellness",
    kind: "cluster",
    primaryQuery: "jacuzzi vs hot tub",
    secondaryQueries: ["spa vs jacuzzi difference", "whirlpool vs jacuzzi"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Indoor whirlpool bath and outdoor deck spa in a split composition",
    productCta: { href: "/jaquar", label: "Explore Jaquar wellness" },
    related: ["jacuzzi-spa-buyers-guide-uae", "jacuzzi-maintenance-uae", "whirlpool-bath-installation-guide"],
    readMinutes: 5,
  },
  {
    slug: "jacuzzi-maintenance-uae",
    title: "Jacuzzi & Spa Maintenance in the UAE",
    description:
      "Water care, filters and covers in high heat: keeping a spa clean and cool through a Gulf summer.",
    category: "wellness",
    kind: "cluster",
    primaryQuery: "jacuzzi maintenance",
    secondaryQueries: ["hot tub maintenance uae", "spa water care"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Spa water testing vial held over a half-covered outdoor spa in hard sun",
    productCta: { href: "/jaquar", label: "Explore Jaquar wellness" },
    related: ["jacuzzi-spa-buyers-guide-uae", "jacuzzi-vs-hot-tub-vs-spa", "whirlpool-bath-installation-guide"],
    readMinutes: 5,
  },
  {
    slug: "whirlpool-bath-installation-guide",
    title: "Whirlpool Bath Installation: What to Plan",
    description:
      "Plumbing, power, access panels and structure: the decisions before a whirlpool bath goes in.",
    category: "wellness",
    kind: "cluster",
    primaryQuery: "whirlpool bath installation",
    secondaryQueries: ["jacuzzi bathtub installation", "whirlpool bath uae"],
    datePublished: P,
    dateModified: P,
    heroAlt: "White whirlpool bath in a stone surround with access panel detail",
    productCta: { href: "/jaquar", label: "Browse Jaquar whirlpools" },
    related: ["jacuzzi-spa-buyers-guide-uae", "bathroom-fittings-guide-uae", "jacuzzi-vs-hot-tub-vs-spa"],
    readMinutes: 5,
  },
  {
    slug: "engineered-stone-vs-porcelain-slabs",
    title: "Engineered Stone vs Porcelain Slabs",
    description:
      "Quartz and engineered marble against large-format porcelain: performance, cost, edges and repair.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "engineered stone vs porcelain",
    secondaryQueries: ["porcelain slab vs quartz", "sintered stone comparison"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Mitred edges of solid engineered stone and thin porcelain compared",
    productCta: { href: "/kalingastone", label: "Compare engineered stone" },
    related: ["engineered-marble-complete-guide", "quartz-countertops-complete-guide", "marble-look-without-natural-marble"],
    readMinutes: 5,
  },
  {
    slug: "commercial-flooring-stone-guide",
    title: "Stone Flooring for Commercial Spaces in UAE",
    description:
      "Specifying terrazzo, engineered marble and quartz for retail, hospitality and office floors: traffic, slip, upkeep.",
    category: "buying-guides",
    kind: "cluster",
    primaryQuery: "commercial stone flooring",
    secondaryQueries: ["commercial flooring uae", "retail flooring stone"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Vast honed terrazzo floor in an empty retail lobby with glass front",
    productCta: { href: "/products", label: "Specify from the full range" },
    related: ["engineered-marble-complete-guide", "terrazzo-flooring-complete-guide", "terrazzo-pros-and-cons"],
    readMinutes: 5,
  },
  {
    slug: "how-to-choose-bathroom-vanity-top",
    title: "Choosing a Bathroom Vanity Top",
    description:
      "Quartz, engineered marble and integrated basins compared for the surface that takes the most daily abuse.",
    category: "bathrooms",
    kind: "cluster",
    primaryQuery: "bathroom vanity top",
    secondaryQueries: ["vanity countertop material", "basin countertop"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Stone vanity top with integrated basin and brushed brass tap",
    productCta: { href: "/kalingastone/quartz", label: "Browse vanity-ready quartz" },
    related: ["quartz-countertops-complete-guide", "bathroom-fittings-guide-uae", "marble-bathroom-ideas"],
    readMinutes: 5,
  },
  {
    slug: "marble-look-without-natural-marble",
    title: "The Marble Look Without Natural Marble",
    description:
      "Engineered marble, veined quartz and porcelain ranked by how convincingly each delivers marble's look.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "marble look alternatives",
    secondaryQueries: ["fake marble that looks real", "marble alternative countertop"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Engineered marble, veined quartz and porcelain surfaces compared in raking light",
    productCta: { href: "/kalingastone/marble", label: "See the truest marble look" },
    related: ["engineered-marble-complete-guide", "quartz-countertops-complete-guide", "engineered-stone-vs-porcelain-slabs"],
    readMinutes: 5,
  },
  {
    slug: "kalingastone-price-uae",
    title: "KalingaStone Price in the UAE (2026): Real AED Ranges",
    description:
      "What KalingaStone quartz, marble and terrazzo slabs actually cost in the UAE, in AED, from the authorized reseller's own racks.",
    category: "buying-guides",
    kind: "cluster",
    primaryQuery: "kalingastone price",
    secondaryQueries: ["kalingastone price uae", "kalingastone slab price", "kalingastone quartz price"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Engineered stone slabs with price tags on warehouse racks",
    productCta: { href: "/kalingastone", label: "Price the KalingaStone range" },
    related: ["marble-price-dubai", "quartz-countertop-price-dubai", "kalingastone-vs-caesarstone"],
    readMinutes: 6,
  },
  {
    slug: "kalingastone-vs-caesarstone",
    title: "KalingaStone vs Caesarstone: The UAE Comparison",
    description:
      "Two engineered stone brands compared for UAE buyers: range, slab formats, certifications, price bands and where each wins.",
    category: "stone-guides",
    kind: "cluster",
    primaryQuery: "kalingastone vs caesarstone",
    secondaryQueries: ["caesarstone alternative uae", "engineered stone brands uae"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Two white quartz slab samples compared side by side against a wall",
    productCta: { href: "/kalingastone/quartz", label: "Browse KalingaStone quartz" },
    related: ["quartz-countertops-complete-guide", "kalingastone-price-uae", "engineered-stone-vs-porcelain-slabs"],
    readMinutes: 6,
  },
  {
    slug: "quartz-countertops-sharjah",
    title: "Quartz Countertops in Sharjah: Supplier, Prices, Stock",
    description:
      "Quartz worktops for Sharjah projects: real AED ranges, slab stock at Al Sajaa, delivery zones and how trade buyers order.",
    category: "buying-guides",
    kind: "cluster",
    primaryQuery: "quartz countertops sharjah",
    secondaryQueries: ["quartz supplier sharjah", "quartz slabs sharjah"],
    datePublished: P,
    dateModified: P,
    heroAlt: "White quartz worktop and island in a bright apartment kitchen",
    productCta: { href: "/kalingastone/quartz", label: "See quartz stock at Al Sajaa" },
    related: ["quartz-countertops-complete-guide", "quartz-countertop-price-dubai", "quartz-slab-sizes-thickness"],
    readMinutes: 5,
  },
  {
    slug: "hard-water-stains-on-marble",
    title: "Hard Water Stains on Marble: The UAE Fix",
    description:
      "Why UAE tap water marks marble, how to remove mineral deposits safely, and the habits that stop the white film returning.",
    category: "care-maintenance",
    kind: "cluster",
    primaryQuery: "hard water stains on marble",
    secondaryQueries: ["water marks on marble", "limescale on marble uae"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Hard water mineral spots on a dark marble vanity beside a tap",
    productCta: { href: "/fila", label: "Get the stone-safe descaler" },
    related: ["how-to-clean-marble-floors-uae", "marble-etching-vs-staining", "how-to-seal-marble"],
    readMinutes: 5,
  },
  {
    slug: "jaquar-vs-grohe",
    title: "Jaquar vs Grohe: An Honest UAE Comparison",
    description:
      "Cartridges, finishes, spares and price compared for the two bathroom brands UAE buyers shortlist most, with a clear verdict by project type.",
    category: "bathrooms",
    kind: "cluster",
    primaryQuery: "jaquar vs grohe",
    secondaryQueries: ["grohe vs jaquar which is better", "jaquar or grohe uae"],
    datePublished: P,
    dateModified: P,
    heroAlt: "Two basin mixers in chrome and brushed graphite compared on marble",
    productCta: { href: "/jaquar", label: "Explore the Jaquar range" },
    related: ["best-bathroom-brands-uae", "bathroom-fittings-guide-uae", "black-vs-brushed-metal-bathroom-finishes"],
    readMinutes: 6,
  },
];

export const blogPostBySlug = new Map(BLOG_POSTS.map((p) => [p.slug, p]));

export const blogCategoryBySlug = new Map(
  BLOG_CATEGORIES.map((c) => [c.slug, c]),
);

export function blogHero(slug: string): string {
  return `/blog-images/${slug}.webp`;
}

export function postsInCategory(category: BlogCategory): BlogPostMeta[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}
