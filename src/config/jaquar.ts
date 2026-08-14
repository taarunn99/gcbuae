/**
 * Jaquar brand hub data - every name, claim, spec and SKU below is
 * VERBATIM from uae.jaquar.com (scraped 2026-08-11). Never invent or
 * extend collection names, SKUs, warranty terms or tech claims; where
 * Jaquar's own copy is the source, it is quoted or tightly paraphrased.
 * Collections here are the curated majors per category (the full grids
 * run longer); products listed are the types actually shown on the
 * range pages, with sample SKUs only where scraped.
 */

export type JaquarCollection = {
  name: string;
  slug: string;
  /** Factual positioning drawn from the scrape or the printed catalogue. */
  blurb: string;
  /** Product types as printed on the range pages. */
  productTypes: string[];
  /** Sample SKUs, only where actually scraped or printed. */
  skuSamples?: string[];
  /** Positioning line as printed in the 2025-2026 catalogue. */
  tagline?: string;
  /** Finish card codes as printed for this range (see FINISH_CODE_NAMES). */
  finishCodes?: string[];
  /** Printed "*For projects only" - contract framing, never retail. */
  projectsOnly?: boolean;
  /** Cross-link to a related range ("fusion" <-> "fusion-prime"). */
  related?: { label: string; href: string };
};

export type JaquarCategory = {
  slug: string;
  label: string;
  /** The one primary query this page owns. */
  query: string;
  /** Answer-first opening (40-80 words, hyphens only). */
  intro: string;
  collections: JaquarCollection[];
  /** Finish options, exactly as filtered on uae.jaquar.com. */
  finishes: string[];
  /** Tech claims, verbatim or tightly paraphrased. */
  claims: { title: string; body: string }[];
  /** Spec table rows - the content no UAE competitor publishes. */
  specs: [string, string][];
  faqs: { q: string; a: string }[];
};

/** The 10 metal finishes filtered on faucet/shower ranges. */
export const METAL_FINISHES = [
  "Chrome",
  "Gold Bright PVD",
  "Gold Matt PVD",
  "Blush Gold Bright PVD",
  "Antique Bronze",
  "Antique Copper",
  "Black Chrome",
  "Black Matt",
  "Graphite",
  "Stainless Steel",
];

/** Ceramic finishes on sanitaryware. */
export const CERAMIC_FINISHES = [
  "White",
  "White Matt",
  "Beige Matt",
  "Black Matt",
  "Grey Matt",
];

export const jaquarBrand = {
  founded: "1960",
  countries: "55+",
  turnover: "$930M+ turnover (2025-26)",
  bathroomsPerYear: "3.6M bathrooms delivered every year",
  fittingsSold: "52.9M+ bath fittings sold",
  tapsPerDay: "125,000 taps produced per day",
  warranty: "10-year warranty on faucets and sanitaryware",
  showrooms: "40 Jaquar World showrooms worldwide",
  tiers: "Artize (luxury) - Jaquar (premium) - Essco (value)",
  uaeShowroom:
    "Jaquar World Dubai - Building SZ 21, Sheikh Zayed Road, Al Quoz 3, Dubai",
  uaeTollFree: "800-527827",
};

export const jaquarCategories: JaquarCategory[] = [
  {
    slug: "faucets",
    label: "Faucets",
    query: "jaquar faucets UAE",
    intro:
      "Jaquar faucets are the core of the brand that produces 125,000 taps a day - single-lever mixers, thermostats, sensor and pressmatic taps across collections from Aria to Kubix Prime, in ten finishes from Chrome to Gold Bright PVD. Global Classic supplies the range across the UAE from Sharjah, with a 10-year warranty behind every cartridge.",
    collections: [
      {
        name: "Aria",
        slug: "aria",
        blurb:
          "Soft-arc contemporary levers - the range the brand fronts its faucet catalogue with.",
        productTypes: [
          "Single Lever Basin Mixer",
          "Single Lever Basin Mixer with Popup Waste",
          "Single Lever High Neck Basin Mixer",
          "Single Lever Bath & Shower Mixer",
        ],
        skuSamples: ["ARI-CHR-39001B", "ARI-CHR-39051B", "ARI-CHR-39005B"],
      },
      {
        name: "Kubix Prime",
        slug: "kubix-prime",
        blurb:
          "The cubist flagship - sharp geometry in all ten finishes, from Antique Bronze to Stainless Steel.",
        productTypes: [
          "Single Lever Basin Mixer",
          "Single Lever Bath & Shower Mixer",
          "Single Lever Bath & Shower Mixer 3-in-1 System",
          "Exposed Part Kit of Single Lever In-wall Diverter",
          "Deck Mounted Stop Valve",
        ],
        skuSamples: ["KUP-CHR-35119PM", "KUP-CHR-35125PM"],
        finishCodes: ["CHR", "ABR", "ACR", "BCH", "BLM", "GRF", "SSF"],
      },
      {
        name: "Fusion Prime",
        slug: "fusion-prime",
        blurb:
          "The newest prime-tier release at the top of Jaquar's faucet grid.",
        productTypes: [
          "Single Lever Basin Mixer",
          "Single Lever Bath & Shower Mixer",
          "Single Lever Shower Mixer",
        ],
        related: { label: "Jaquar Fusion", href: "/jaquar/faucets/fusion" },
      },
      {
        name: "Laguna",
        slug: "laguna",
        tagline: "An Iconic Form With Timeless Simplicity",
        blurb:
          "A rounded, water-smoothed profile shared across Jaquar's faucet, sanitaryware and whirlpool lines - designed by Matteo Thun & Antonio Rodriguez, and the only range with printed dual-tone finishes.",
        productTypes: [
          "Single Lever Basin Mixer",
          "Single Lever Bath & Shower Mixer",
          "Single Lever Bidet Mixer with Popup Waste",
        ],
        finishCodes: [
          "CHR",
          "ABR",
          "ACR",
          "BCH",
          "BLM",
          "GRF",
          "SSF",
          "BBC",
          "BGM",
          "GMG",
        ],
      },
      {
        name: "Continental Prime",
        slug: "continental-prime",
        blurb:
          "The classic quarter-turn family, refreshed to prime specification.",
        productTypes: [
          "Basin Mixer",
          "Bath & Shower Mixer",
          "Pillar Cock",
          "Angle Valve",
        ],
      },
      {
        name: "Sensor Taps",
        slug: "sensor-taps",
        blurb:
          "Touch-free operation that saves up to 59% of water - Jaquar's own figure - for washrooms that meet green-building briefs. Battery and 9V transformer operated versions per the 2025-2026 catalogue.",
        productTypes: [
          "Sensor Basin Faucet",
          "Deck Mounted Sensor Faucet",
          "Wall Mounted Sensor Faucet",
        ],
      },
      /* ---- Catalogue 2025-2026 ranges (docs/jaquar-catalogue.md) ---- */
      {
        name: "Opal Prime",
        slug: "opal-prime",
        tagline: "New, Modern, Minimalistic Style",
        blurb:
          "A modern, minimalistic single lever range of 30 products, from basin and high neck basin mixers to 3-in-1 bath & shower systems, H type bath fillers and in-wall stop valves. The lead basin mixer carries registered design no. 276010 and delivers 14.7 l/min at 3 bar; the wall mounted shower mixer runs to 32 l/min.",
        productTypes: [
          "Single lever basin mixer",
          "Single lever high neck basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Single lever shower mixer, wall mounted",
          "Single lever mono sink mixer",
          "3 hole basin mixer, wall mounted",
          "H type bath filler",
          "In-wall stop valve",
        ],
        skuSamples: ["OPP-15011BPM", "OPP-15119PM", "OPP-15223PM", "OPP-15053PM"],
        finishCodes: ["CHR", "ABR", "ACR", "BCH", "BLM", "GRF", "SSF"],
      },
      {
        name: "Vignette Prime",
        slug: "vignette-prime",
        tagline: "Inspiring Forms. Decorative Contours.",
        blurb:
          "Decorative contours on a single lever architecture, 31 products deep: basin mixers, wall mounted bath & shower and shower mixers, sink mixers, a 2-way in-wall diverter with built-in non-return valve, and in-wall stop valves. Basin mixers deliver 13.62 l/min and shower mixers up to 33.26 l/min, at 3 bar.",
        productTypes: [
          "Single lever basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Single lever shower mixer, wall mounted",
          "Single lever mono sink mixer",
          "Basin tap",
          "3 hole basin mixer, wall mounted",
          "H type bath and shower mixer",
          "In-wall stop valve",
        ],
        skuSamples: ["VGP-81011B", "VGP-81119", "VGP-81223", "VGP-81421"],
        finishCodes: ["CHR", "ABR", "ACR", "BCH", "BLM", "GRF", "SSF"],
      },
      {
        name: "Ornamix Prime",
        slug: "ornamix-prime",
        tagline: "The Ring of Perfection",
        blurb:
          "A single lever range of 30 products carrying registered design nos. 276011, 276012 and 276013 across its basin and shower mixers. Runs from basin mixers at 15.98-16.64 l/min at 3 bar to 3-in-1 bath & shower systems, H type bath fillers and in-wall stop valves, with 35 mm cartridge manual valve kits and Aquamax 3-way diverter kits.",
        productTypes: [
          "Single lever basin mixer",
          "Single lever high neck basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Single lever shower mixer, wall mounted",
          "Single lever mono sink mixer",
          "3 hole basin mixer, wall mounted",
          "H type bath filler",
          "In-wall stop valve",
        ],
        skuSamples: ["ORP-10011BPM", "ORP-10119PM", "ORP-10433PM", "ORP-10223PM"],
        finishCodes: ["CHR", "ABR", "ACR", "BCH", "BLM", "GRF", "SSF"],
      },
      {
        name: "Alive",
        slug: "alive",
        tagline: "The Beauty of Asymmetry",
        blurb:
          "An asymmetric single lever range of 24 products, from basin mixers and basin taps to H type bath fillers and in-wall stop valves, with 35 mm cartridge manual valve kits and Aquamax 3-way diverter kits. Basin mixers deliver 13.48 l/min at 3 bar.",
        productTypes: [
          "Single lever basin mixer",
          "Single lever high neck basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Basin tap",
          "High neck basin tap",
          "H type bath filler",
          "H type bath and shower mixer",
          "In-wall stop valve",
        ],
        skuSamples: ["ALI-85011B", "ALI-85119", "ALI-85223", "ALI-85053"],
        finishCodes: ["CHR", "ABR", "ACR", "BCH", "BLM", "GRF", "SSF"],
      },
      {
        name: "Queen's Prime",
        slug: "queens-prime",
        tagline: "Regal Elegance of the Victorian Era",
        blurb:
          "A Victorian-styled range printed in two sub-themes, Hampton and Balmoral - bridging the past and the present with regal aesthetics. 27 products from single lever and monoblock basin mixers to deck mounted bath & shower mixers with telephone shower crutch and 950 mm high rise legs. The shower mixer is printed at 72.20 l/min at 3 bar.",
        productTypes: [
          "Single lever basin mixer",
          "Monoblock basin mixer",
          "3 hole basin mixer",
          "Bath & shower mixer, wall mounted",
          "Bath & shower mixer, deck mounted",
          "Shower mixer",
          "Sink mixer, wall mounted",
          "In-wall stop valve",
        ],
        skuSamples: ["QQP-7001BPM", "QQP-7267PM", "QQP-7271PM", "QQP-7433PM"],
        finishCodes: ["CHR", "ABR", "ACR", "BCH", "BLM", "GRF", "SSF"],
      },
      {
        name: "Queen's",
        slug: "queens",
        blurb:
          "The classic quarter turn range of 29 products, from monoblock and 3 hole basin mixers to deck mounted bath & shower mixers with telephone shower crutch, a bath tub filler consisting of two control valves and spout, and in-wall stop valves. The shower mixer is printed at 73.3 l/min at 3 bar.",
        productTypes: [
          "Monoblock basin mixer",
          "3 hole basin mixer",
          "Bath & shower mixer, wall mounted",
          "Bath & shower mixer, deck mounted",
          "Bath tub filler",
          "Shower mixer",
          "Mono sink mixer",
          "In-wall stop valve",
        ],
        skuSamples: ["QQT-7167B", "QQT-7217", "QQT-7095", "QQT-7271"],
        finishCodes: ["CHR", "ABR", "ACR", "BCH", "BLM", "GRF", "SSF"],
      },
      {
        name: "Rendezvous",
        slug: "rendezvous",
        blurb:
          "A classic range offered in Chrome and Auric Gold, 13 products across basin taps, wall mounted bath & shower mixers including a 3-in-1 system, bib taps and valves. The shower mixer is printed at 94.00 l/min at 3 bar.",
        productTypes: [
          "Basin tap",
          "Bath & shower mixer, wall mounted",
          "Bath & shower mixer 3-in-1 system, wall mounted",
          "Shower mixer",
          "Bib tap",
          "Angle valve",
          "In-wall stop valve",
        ],
        skuSamples: ["CTL-8011", "CTL-8217", "CTL-8267", "CTL-8209"],
        finishCodes: ["CHR", "GLD"],
      },
      {
        name: "Lyric",
        slug: "lyric",
        tagline: "A Minimalistic Classic. Typically Smooth.",
        blurb:
          "A minimalistic classic in single lever form, 29 products from basin and bidet mixers to wall mounted shower mixers, sink mixers and in-wall stop valves, with 35 mm cartridge manual valve kits and Aquamax 3-way diverter kits. Basin mixers deliver 14.80 l/min at 3 bar.",
        productTypes: [
          "Single lever basin mixer",
          "Single lever high neck basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Single lever shower mixer, wall mounted",
          "Single lever bidet mixer",
          "Single lever mono sink mixer",
          "3 hole basin mixer, wall mounted",
          "In-wall stop valve",
        ],
        skuSamples: ["LYR-38001B", "LYR-38119", "LYR-38213B", "LYR-38421"],
      },
      {
        name: "Solo",
        slug: "solo",
        tagline: "Proud and Elegant. Creating an Impression.",
        blurb:
          "A 56-product range spanning basin, bath, shower, sink and bidet fittings, from single lever basin mixers to a bath tub filler consisting of two control valves and spout. Includes 35 mm and 40 mm cartridge in-wall valves, monoblock mixers and sink pillar taps; the shower mixer is printed at 94.00 l/min at 3 bar.",
        productTypes: [
          "Single lever basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Monoblock basin mixer",
          "3 hole basin mixer",
          "Bath tub filler",
          "H type bath filler",
          "Sink pillar tap",
          "In-wall stop valve",
        ],
        skuSamples: ["SOL-6001B", "SOL-6119", "SOL-6095", "SOL-6613B"],
      },
      {
        name: "Florentine",
        slug: "florentine",
        tagline: "Heralding Perfection In Straight Lines",
        blurb:
          "A straight-line range of 67 products - the deepest faucet table in the catalogue. Runs from mini basin mixers to 4-hole and 5-hole deck mounted bath & shower mixers, a mono sink mixer with pull-out handspray, and a bath tub filler consisting of two control valves and spout, on 35 mm and 40 mm cartridge in-wall valves.",
        productTypes: [
          "Single lever basin mixer",
          "Single lever mini basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Single lever bath & shower mixer, deck mounted",
          "Mono sink mixer with pull-out handspray",
          "3 hole basin mixer",
          "5-hole bath & shower mixer, deck mounted",
          "Bath tub filler",
        ],
        skuSamples: ["FLR-5001B", "FLR-5177B", "FLR-5277A", "FLR-5095N"],
      },
      {
        name: "Florentine Prime",
        slug: "florentine-prime",
        tagline: "The Classic, Reborn",
        blurb:
          "The Florentine language carried into the Prime series - 35 products from single lever basin and bidet mixers to 3-in-1 bath & shower systems, a mono sink mixer with pull-out handspray, and in-wall stop valves, with 35 mm cartridge manual valve kits.",
        productTypes: [
          "Single lever basin mixer",
          "Single lever high neck basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Single lever shower mixer, wall mounted",
          "Single lever bidet mixer",
          "Mono sink mixer with pull-out handspray",
          "3-hole basin mixer",
          "In-wall stop valve",
        ],
        skuSamples: ["FLP-5001BPM", "FLP-5119PM", "FLP-5177BPM", "FLP-5281PM"],
      },
      {
        name: "Continental",
        slug: "continental",
        tagline: "Elegance at its Best",
        blurb:
          "A quarter turn classic of 23 products with a full kitchen set - sink mixers, mono sink mixers, sink taps and pillar taps with swivel, raised J shaped and special extended spouts - alongside basin taps, monoblock mixers, wall and deck mounted bath & shower mixers, and in-wall stop valves in reduced body and extra heavy body variants.",
        productTypes: [
          "Basin tap",
          "Monoblock basin mixer",
          "Bath & shower mixer, wall mounted",
          "Bath & shower mixer, deck mounted",
          "Sink mixer, wall mounted",
          "Mono sink mixer",
          "Sink pillar tap",
          "In-wall stop valve",
        ],
        skuSamples: ["CON-011KN", "CON-167KNB", "CON-319KN", "CON-083KN"],
      },
      {
        name: "Astra",
        slug: "astra",
        tagline: "Form Meets Functionality.",
        blurb:
          "A functional range of 14 products: basin taps, monoblock basin mixers with swivel pipe and casted round shape spouts, wall mounted bath & shower and sink mixers, bib taps and angle valves. The sink mixer with swivel pipe spout is printed at 33.19 l/min at 3 bar.",
        productTypes: [
          "Basin tap",
          "Monoblock basin mixer",
          "Bath & shower mixer, wall mounted",
          "Shower mixer",
          "Sink mixer, wall mounted",
          "Sink tap",
          "Bib tap",
          "Angle valve",
        ],
        skuSamples: ["AQT-3011", "AQT-3171B", "AQT-3209", "AQT-3309"],
      },
      {
        name: "Arc",
        slug: "arc",
        tagline: "Controlled Fluidity, Smooth Architecture",
        blurb:
          "An 11-product range built around joystick operation: basin and bidet mixers, 3 hole basin mixers including a wall mounted version, and in-wall joystick manual valve and diverter bodies, the diverter on a 40 mm cartridge. The joystick basin mixer delivers 11.77 l/min at 3 bar.",
        productTypes: [
          "Joystick basin mixer",
          "Joystick bidet mixer",
          "3 hole basin mixer",
          "3 hole basin mixer, wall mounted",
          "In-wall body of joystick manual valve",
          "In-wall body of joystick diverter",
        ],
        skuSamples: ["ARC-87011B", "ARC-87213B", "ARC-87433", "ARC-87065C"],
        finishCodes: ["CHR", "BCH", "BLM", "ACR", "GRF", "ABR", "SSF"],
      },
      {
        name: "Pressmatic Taps",
        slug: "pressmatic",
        tagline: "Saves Water Every Second",
        blurb:
          "Non-concussive self-closing taps, 14 products deep: basin taps in deck, wall mounted and 65 mm extension body variants, bib taps, urinal valves metered at 2.0 and 3.85 litres per flush, elbow operated extended lever versions, and foot operated valve assemblies for basins.",
        productTypes: [
          "Non-concussive basin tap",
          "Non-concussive basin tap, wall mounted",
          "Non-concussive bib tap",
          "Non-concussive urinal valve",
          "Non-concussive in-wall urinal valve",
          "Non-concussive tap with elbow operated extended lever",
          "Exposed foot operated non-concussive valve",
        ],
        skuSamples: ["PRS-031", "PRS-043", "PRS-077", "PRS-STL-033EF"],
      },
      {
        name: "Medi Series",
        slug: "medi-series",
        blurb:
          "Elbow-action taps for hygiene-critical installations, built on the Florentine body. 4 products: a single lever basin mixer, basin tap and bib tap with extended lever handles, and a wall mounted single lever sink mixer with extended lever handle, at 16.44-17.96 l/min at 3 bar.",
        productTypes: [
          "Single lever basin mixer with extended lever handle",
          "Basin tap with extended lever handle",
          "Bib tap with extended lever handle",
          "Single lever sink mixer with extended lever handle, wall mounted",
        ],
        skuSamples: ["FLR-5033B", "FLR-5031N", "FLR-5043N", "FLR-5166"],
      },
      {
        name: "Floor Mounted",
        slug: "floor-mounted",
        tagline: "Fresh. Dynamic. Striking.",
        blurb:
          "Floor mounted single lever bath mixers for freestanding bathtubs, 13 products in a two-part system: the ALD-121 in-floor basic set plus exposed part kits styled to twelve collections - Laguna, Lyric, Aria, Alive, Kubix Prime, Florentine, Solo, Florentine Prime, Fusion, Vignette Prime, Opal Prime and Ornamix Prime.",
        productTypes: [
          "Basic set for floor mounted single lever bath mixer",
          "Exposed parts of floor mounted single lever bath mixer",
        ],
        skuSamples: ["ALD-121", "LAG-91121K", "KUP-35121KPM", "FLP-5121KPM"],
      },
      {
        name: "Eko",
        slug: "eko",
        projectsOnly: true,
        blurb:
          "Supplied for projects only, as printed in the catalogue. 23 products for volume specification: single lever basin, extended basin, bath & shower, shower and sink mixers, basin and bib taps, a combo pack of basin mixer, wall mixer and sliding rail, and a reduced body in-wall stop valve. Basin mixers run 16-17.4 l/min at 3 bar.",
        productTypes: [
          "Single lever basin mixer",
          "Single lever extended basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Single lever shower mixer, wall mounted",
          "Single lever sink mixer, wall mounted",
          "Basin tap",
          "Bib tap",
          "In-wall stop valve",
        ],
        skuSamples: ["EKO-33001B", "EKO-33119", "EKO-33163", "EKO-33069"],
      },
      {
        name: "Fusion",
        slug: "fusion",
        tagline: "Solidarity with Solid Lines and Circles",
        blurb:
          "Solid lines and circles in a single lever range of 40 products: extended and high neck basin mixers, high flow in-wall manual valves with bath and diverter spouts, a 40 mm cartridge in-wall shower valve, H type bath fillers and in-wall stop valves. Extended basin mixers deliver 15.89 l/min at 3 bar.",
        productTypes: [
          "Single lever extended basin mixer",
          "Single lever high neck basin mixer",
          "Single lever bath & shower mixer, wall mounted",
          "Single lever shower mixer, wall mounted",
          "Single lever sink mixer, wall mounted",
          "3 hole basin mixer, wall mounted",
          "H type bath filler",
          "In-wall stop valve",
        ],
        skuSamples: ["FUS-29023B", "FUS-29119", "FUS-29135", "FUS-29223"],
        related: {
          label: "Jaquar Fusion Prime",
          href: "/jaquar/faucets/fusion-prime",
        },
      },
      {
        name: "Allied",
        slug: "allied",
        blurb:
          "The concealed engineering behind the exposed ranges: 40 products of in-wall bodies - manual valves and diverters on 35 mm and 40 mm cartridges, and Aquamax thermostatic shower mixer bodies at 42-56 l/min at 3 bar - plus thermostatic valves for health faucets, health faucet kits, basin and click clack wastes, bottle traps and urinal spreaders.",
        productTypes: [
          "In-wall body of single lever manual valve",
          "In-wall body of single lever diverter",
          "Aquamax in-wall body of thermostatic shower mixer",
          "In-wall body of thermostatic valve for health faucet",
          "Health faucet kit",
          "Basin waste",
          "Click clack basin waste",
          "Bottle trap",
        ],
        skuSamples: ["ALD-233N", "ALD-783N", "ALD-649C", "ALD-729"],
      },
      {
        name: "Aquamax Thermostat",
        slug: "aquamax-thermostat",
        blurb:
          "Thermostatic showering as a two-part system, 50 products deep: Aquamax in-wall thermostatic bodies in single function, 2-way and 3-way diverter versions (56, 42 and 52 l/min at 3 bar) with exposed part kits styled to Laguna, Arc, Kubix Prime, Opal Prime, Ornamix Prime, Vignette Prime, Aria, Lyric, Alive, Queen's Prime, Florentine, Florentine Prime and Fusion.",
        productTypes: [
          "Aquamax in-wall body of thermostatic shower mixer",
          "Aquamax exposed part kit of thermostatic shower mixer",
          "Aquamax exposed part kit with 2-way diverter",
          "Aquamax exposed part kit with 3-way diverter",
          "Aquamax exposed part kit of single lever shower mixer with 3-way diverter",
        ],
        skuSamples: ["ALD-661N", "LAG-91661NK", "QQP-7683NKPM", "ALI-85681NK"],
      },
      {
        name: "Thermostatic Mixers",
        slug: "thermostatic-mixers",
        blurb:
          "Exposed thermostatic control across the collections: 19 products spanning multifunction shower valves with integrated diverter and rigid riser provision, thermostatic bar valves, wall and deck mounted thermostatic bath & shower mixers and a 4-hole deck mounted mixer, in Opal Prime, Florentine Prime, Florentine, Eko and Arc designs. Bar valves are printed at 36.43 l/min at 3 bar.",
        productTypes: [
          "Multifunction thermostatic shower valve",
          "Thermostatic bar valve",
          "Thermostatic bath & shower mixer, wall mounted",
          "Thermostatic bath & shower mixer, deck mounted",
          "Exposed thermostatic bath & shower mixer",
          "Thermostatic shower valve",
          "4-hole thermostatic bath & shower mixer, deck mounted",
        ],
        skuSamples: ["OPP-15653PM", "FLR-5655", "EKO-33673LWR", "ARC-87677"],
      },
      {
        name: "Bathtub Spouts",
        slug: "bathtub-spouts",
        blurb:
          "Bath spouts matched to the faucet collections, 38 products in wall flange and diverter versions across Laguna, Arc, Kubix Prime, Ornamix Prime, Opal Prime, Alive, Continental, Continental Prime, Florentine, Florentine Prime, Queen's, Queen's Prime, Fusion, Vignette Prime, Rendezvous and D-Shape designs. Includes a stainless steel Florentine spout and 20 mm variants printed at 47 l/min at 3 bar.",
        productTypes: [
          "Bath spout with wall flange",
          "Bath spout with diverter & wall flange",
          "Bath spout (20 mm) with wall flange",
          "Basin spout with wall flange",
          "Bath spout heavy casted body with diverter",
        ],
        skuSamples: ["SPJ-91429", "SPJ-35463PM", "SPJ-5429S", "SPJ-463PM"],
      },
      {
        name: "Spout Operating Taps",
        slug: "spout-operating-taps",
        blurb:
          "Taps operated by the spout itself. 2 products: a spout operated pillar tap at 18.37 l/min and a spout operated bib tap at 18.53 l/min, both at 3 bar.",
        productTypes: ["Spout operated pillar tap", "Spout operated bib tap"],
        skuSamples: ["SOT-83011", "SOT-83037"],
      },
    ],
    finishes: METAL_FINISHES,
    claims: [
      {
        title: "Cartridges tested for half a million cycles",
        body: "Jaquar cartridges are half-a-million-cycle tested for a trouble-free operating life of up to 20 years, with a brass spindle instead of plastic to avoid breakage.",
      },
      {
        title: "450+ hours of salt spray",
        body: "Finishes carry 0.3 micron chrome over 10 micron nickel, salt-spray tested beyond 450 hours - the PVD golds and bronzes are built for Gulf humidity.",
      },
      {
        title: "Honeycomb aerator",
        body: "An integrated honeycomb-structured aerator protects against lime build-up and keeps the stream soft at any pressure.",
      },
      {
        title: "Advanced water-saving flow regulator",
        body: "Flow restrictors save up to 80% of water; sensor faucets up to 59% - certified across WRAS, KIWA, ISO, CE and more.",
      },
    ],
    specs: [
      ["Warranty", "10 yr metal parts & braided hose - 5 yr colour finishes, sensor & Showertronic"],
      ["Cartridge life", "500,000 cycles tested - up to 20 years"],
      ["Plating", "0.3µ chrome + 10µ nickel, 450+ hr salt spray"],
      ["Finishes", "10 - Chrome to Gold Bright PVD and Stainless Steel"],
      ["Water saving", "Flow regulator up to 80% - sensor taps up to 59%"],
      ["Certifications", "WRAS - KIWA - ISO - CE - SASO and more"],
    ],
    faqs: [
      {
        q: "What warranty do Jaquar faucets carry in the UAE?",
        a: "10 years on the faucet's metal parts and braided hose, per Jaquar's printed warranty table. Colour-finish faucets, sensor faucets and Showertronic carry 5 years. All honoured in the UAE through Jaquar's service network - toll-free 800-527827 - with Global Classic supporting supply and replacement paperwork from Sharjah.",
      },
      {
        q: "Which Jaquar faucet finishes are available?",
        a: "Ten finishes across the premium ranges: Chrome, Gold Bright PVD, Gold Matt PVD, Blush Gold Bright PVD, Antique Bronze, Antique Copper, Black Chrome, Black Matt, Graphite and Stainless Steel.",
      },
      {
        q: "Do you supply Jaquar faucets for full projects?",
        a: "Yes - wholesale supply is the core of what Global Classic does. Send the BOQ and volume pricing in AED comes back usually within one working day, with delivery across the whole of the UAE.",
      },
    ],
  },
  {
    slug: "sanitary-ware",
    label: "Sanitaryware",
    query: "jaquar sanitary ware UAE",
    intro:
      "Jaquar sanitaryware runs from rimless wall-hung WCs to the Bidspa electronic WC - 4.8 million pieces a year, Anti-Germ glazing, 3/6-litre dual flush and a 10-year warranty. Global Classic is a sanitary ware supplier for the UAE, stocking and delivering the range from Sharjah to every emirate, wholesale.",
    collections: [
      {
        name: "Kubix Prime",
        slug: "kubix-prime",
        blurb:
          "The flagship ceramic line - rimless, blind-installation wall-hung WCs and matching basins.",
        productTypes: [
          "Rimless Blind Installation Wall Hung WC",
          "Blind Installation Wall Hung Bidet",
          "Rimless Bowl With Cistern",
          "Table Top Basin",
        ],
        skuSamples: ["KUS-WHT-35953BIUFSMPM", "KUS-BLM-35153PM"],
      },
      {
        name: "Bidspa",
        slug: "bidspa",
        blurb:
          "The electronic WC range - automatic, rimless, in floor-mounted, back-to-wall and wall-hung formats.",
        productTypes: [
          "Automatic Rimless Floor Mounted WC",
          "Bidspa Rimless Back To Wall WC",
          "Bidspa Rimless Blind Installation Wall Hung WC",
          "Bidspa Rimless Single Piece WC",
          "Bidspa Rimless Wall Hung WC",
        ],
        skuSamples: ["ITS-WHT-89853S300PPPM", "ITS-WHT-6953NBIPP"],
      },
      {
        name: "Laguna",
        slug: "laguna",
        blurb:
          "Soft-profile ceramics matching the Laguna faucet and whirlpool families.",
        productTypes: ["Wall Hung WC", "Counter Top Basin", "Pedestal Basin"],
      },
      {
        name: "Opal Prime",
        slug: "opal-prime",
        blurb: "Slim-rim basins and WCs in the prime ceramic specification.",
        productTypes: [
          "Wall Hung WC",
          "Table Top Basin",
          "Under Counter Basin",
        ],
      },
      {
        name: "Vignette Prime",
        slug: "vignette-prime",
        blurb:
          "Sculpted prime-tier ceramics with matching whirlpool and faucet ranges.",
        productTypes: ["Wall Hung WC", "Counter Top Basin"],
      },
      {
        name: "Arc",
        slug: "arc",
        blurb:
          "Curved-geometry ceramics from the family that spans faucets to whirlpools.",
        productTypes: ["Wall Hung WC", "Table Top Basin"],
      },
      /* ---- Catalogue 2025-2026 ranges (docs/jaquar-catalogue.md) ---- */
      {
        name: "D'Arc",
        slug: "d-arc",
        tagline: "Understated Elegance. Defined Workmanship",
        blurb:
          "A focused pair in white: a rimless blind installation wall hung WC with UF soft close slim seat cover at 355 x 525 x 380 mm, and a counter top basin at 615 x 415 x 150 mm. Two pieces, one architectural line.",
        productTypes: ["Wall hung WCs", "Counter top basins"],
        skuSamples: ["DRS-WHT-37953BIUFSM", "DRS-WHT-37601"],
      },
      {
        name: "Aria",
        slug: "aria",
        blurb:
          "A 19-piece range spanning basins, pedestals, WCs and bidets, led by tankless technology: a wall hung WC with sensor flush in battery and electric operated form, plus tankless single piece WCs with sensor operated single flush. Coupled, back to wall and blind installation formats cover P180 and S240 to S300 trap distances, all with UF soft close slim seat covers.",
        productTypes: [
          "Table top basins",
          "Wall hung basins",
          "Pedestals",
          "Tankless sensor WCs",
          "Single piece WCs",
          "Coupled WCs",
          "Back to wall WCs",
          "Bidets",
        ],
        skuSamples: [
          "ARS-WHT-39901",
          "ARS-WHT-39961NBIUFSMTL",
          "ARS-WHT-39751P180UFSMZ",
          "ARS-WHT-39851S300UFSMTL",
        ],
      },
      {
        name: "Fonte",
        slug: "fonte",
        tagline: "Exquisite Design. Sublime Purity.",
        blurb:
          "Nine pieces built around one basin family: table top, under counter and wall hung basins with full and half pedestals, a rimless wall hung WC, and coupled WC bowls with dual flush cistern fittings in S220 and P180 trap options. Seat covers are UF soft close throughout.",
        productTypes: [
          "Table top basins",
          "Under counter basins",
          "Wall hung basins",
          "Pedestals",
          "Wall hung WCs",
          "Coupled WCs",
        ],
        skuSamples: [
          "FNS-WHT-40931",
          "FNS-WHT-40801",
          "FNS-WHT-40953UF",
          "FNS-WHT-40751S220UFSMZ",
        ],
      },
      {
        name: "JDR Designer Range",
        slug: "jdr-designer-range",
        tagline: "Modernity Gets New Sophistication",
        blurb:
          "New in the 2025-2026 catalogue, JDR is a basin-led designer range: 18 pieces across table top, thin rim, semi recessed and wall hung corner formats. Thin rim shapes run rectangular, square, oval and round, with White Matt and Black Matt offered alongside standard White.",
        productTypes: [
          "Table top basins",
          "Thin rim basins",
          "Semi recessed basins",
          "Wall hung corner basins",
        ],
        skuSamples: [
          "JDS-WHT-25905",
          "JDS-BLM-25907N",
          "JDS-WHM-25911",
          "JDS-WHT-25503",
        ],
      },
      {
        name: "Urinals",
        slug: "urinals",
        blurb:
          "Five commercial urinals from 355 x 340 x 535 mm to 480 x 300 x 740 mm: back inlet models, a spreader hole variant and a without-sensor unit, all supplied with fixing accessories.",
        productTypes: [
          "Urinals",
          "Back inlet urinals",
          "Spreader hole urinals",
        ],
        skuSamples: ["URS-WHT-13253N", "URS-WHT-13255", "URS-WHT-13261H"],
      },
      {
        name: "Disabled-Friendly Sanitaryware",
        slug: "disabled-friendly",
        blurb:
          "Four pieces specified for accessible washrooms: a 650 x 565 x 155 mm wall hung basin, a 350 x 750 x 340 mm wall hung WC, a rimless back to wall WC and a rimless coupled bowl with cistern, both in P180 trap. Seat covers are UF soft close across the set.",
        productTypes: [
          "Wall hung basins",
          "Wall hung WCs",
          "Back to wall WCs",
          "Coupled WCs",
        ],
        skuSamples: [
          "DIS-WHT-93801",
          "DIS-WHT-93951UF",
          "DIS-WHT-93955P180UF",
          "DIS-WHT-93753NP180UFSMZ",
        ],
      },
      {
        name: "Solo",
        slug: "solo",
        blurb:
          "Twenty one pieces covering the full sanitaryware brief: basins with pedestals, single piece WCs across S110, S220 and S300 plus P180 traps, coupled bowls, bidets and wall hung WCs including an in-built jet model. Seats run PP and UF soft close, and the blind installation wall hung WC comes in White Matt and Black Matt as well as White.",
        productTypes: [
          "Table top basins",
          "Counter top basins",
          "Wall hung basins",
          "Pedestals",
          "Single piece WCs",
          "Coupled WCs",
          "Wall hung WCs",
          "Bidets",
        ],
        skuSamples: [
          "SLS-WHT-6901",
          "SLS-WHT-6851S220PP",
          "SLS-BLM-6953BIUFSM",
          "SLS-WHT-6951JUFSM",
        ],
      },
      {
        name: "Florentine",
        slug: "florentine",
        blurb:
          "Eight pieces around soft oval geometry: table top and under counter basins, a wall hung basin with full pedestal, and a rimless wall hung WC with UF soft close slim seat cover at 355 x 555 x 370 mm.",
        productTypes: [
          "Table top basins",
          "Under counter basins",
          "Wall hung basins",
          "Pedestals",
          "Wall hung WCs",
        ],
        skuSamples: ["FLS-WHT-5931", "FLS-WHT-5701", "FLS-WHT-5801"],
      },
      {
        name: "Continental",
        slug: "continental",
        blurb:
          "The 26-piece workhorse range: basins in table top, under counter and wall hung formats with pedestals, coupled WC bowls in P180, S220 and S300 traps including a single side flush variant, rimless single piece WCs, and wall hung WCs with in-built jet in PP or UF seat options.",
        productTypes: [
          "Table top basins",
          "Under counter basins",
          "Wall hung basins",
          "Pedestals",
          "Coupled WCs",
          "Single piece WCs",
          "Wall hung WCs",
          "Bidets",
        ],
        skuSamples: [
          "CNS-WHT-905",
          "CNS-WHT-959JUF",
          "CNS-WHT-853S300SPPSM",
          "CNS-WHT-153",
        ],
      },
      {
        name: "Lyric",
        slug: "lyric",
        blurb:
          "Twelve pieces led by a thin rim triangular table top basin at 600 x 410 x 100 mm. Single piece WCs cover S220, S300 and P180 traps, two of them with sensor and manual operated single flush cistern fittings; all seat covers are UF soft close slim.",
        productTypes: [
          "Table top basins",
          "Wall hung basins",
          "Pedestals",
          "Wall hung WCs",
          "Single piece WCs",
          "Coupled WCs",
        ],
        skuSamples: [
          "LYS-WHT-38901N",
          "LYS-WHT-38851S300UFSMN",
          "LYS-WHT-38851S220UFSMSNR",
          "LYS-WHT-38751S250UFSMZ",
        ],
      },
      {
        name: "Queen's Prime",
        slug: "queens-prime",
        blurb:
          "Twelve pieces in a soft-edged classic profile: wall hung, under counter and table top basins, a rimless wall hung WC, coupled bowls with dual flush or single side flush cisterns in P180 and S250 traps, a back to wall WC, and floor mounted and wall hung bidets. UF soft close seat covers throughout.",
        productTypes: [
          "Wall hung basins",
          "Under counter basins",
          "Table top basins",
          "Pedestals",
          "Wall hung WCs",
          "Coupled WCs",
          "Back to wall WCs",
          "Bidets",
        ],
        skuSamples: [
          "QPS-WHT-7803PM",
          "QPS-WHT-7953UFPM",
          "QPS-WHT-7753P180UFPMZ",
          "QPS-WHT-7151PM",
        ],
      },
      {
        name: "Ornamix Prime",
        slug: "ornamix-prime",
        blurb:
          "Ten pieces with tankless flushing at the centre: a wall hung WC with sensor flush and a single piece WC with sensor and manual operated single flush, alongside rimless coupled bowls in P180 and S250 traps, a back to wall WC, an integrated wall hung basin and a blind installation bidet. Seats are UF soft close slim across the range.",
        productTypes: [
          "Table top basins",
          "Integrated wall hung basins",
          "Tankless sensor WCs",
          "Single piece WCs",
          "Coupled WCs",
          "Wall hung WCs",
          "Back to wall WCs",
          "Bidets",
        ],
        skuSamples: [
          "ONS-WHT-10901",
          "ONS-WHT-10961BIUFSMTL",
          "ONS-WHT-10851S300UFSMTL",
          "ONS-WHT-10753P180UFSMZ",
        ],
      },
      {
        name: "Fusion",
        slug: "fusion",
        blurb:
          "A compact four-piece set: a 545 x 545 x 180 mm counter top basin, a wall hung WC with PP soft close seat cover, and a rimless single piece WC with dual flush cistern fitting in S300 trap and UF soft close slim seat.",
        productTypes: [
          "Counter top basins",
          "Wall hung WCs",
          "Single piece WCs",
        ],
        skuSamples: [
          "FSS-WHT-29601",
          "FSS-WHT-29951PP",
          "FSS-WHT-29853S300UFSM",
        ],
      },
    ],
    finishes: CERAMIC_FINISHES,
    claims: [
      {
        title: "Anti-Germ Glazing",
        body: "Fluoro-polymer in the glaze forms a hydrophobic shield that prevents the build-up of bacteria and germs, with glazed traps for clean, odour-free WCs.",
      },
      {
        title: "3/6-litre dual flush",
        body: "Two push-button dual-flush technology gives the choice of a 3-litre or 6-litre flush - silent flushing, proven by 100-ball and ink tests.",
      },
      {
        title: "Rimless + blind installation",
        body: "Rimless bowls with no side windows for installation - cleaner lines, cleaner maintenance, tested to 400 kg load for WCs and 100 kg for basins.",
      },
      {
        title: "Seats that outlast the spec",
        body: "Soft-closing detachable UF seat covers carry over 150 kg and a 5-year soft-close guarantee.",
      },
    ],
    specs: [
      ["Warranty", "10 yr ceramic body - 5 yr UF seat cover - 2 yr mechanical parts"],
      ["Flush", "Dual 3L / 6L - adjustable to 2L / 4L"],
      ["Glaze", "Anti-Germ fluoro-polymer, glazed traps"],
      ["Load tests", "400 kg WC - 100 kg basin - 150 kg seat"],
      [
        "Ceramic finishes",
        "White, White Matt, Beige Matt, Black Matt, Grey Matt",
      ],
      ["Trap types", "P type and S type"],
    ],
    faqs: [
      {
        q: "Is Jaquar sanitaryware suitable for hotel and commercial projects?",
        a: "Yes - rimless WCs with Anti-Germ glazing and 3/6-litre dual flush are specified for hospitality and commercial washrooms, and Global Classic supplies project quantities from Sharjah stock with delivery across the whole of the UAE.",
      },
      {
        q: "What colours does Jaquar sanitaryware come in?",
        a: "Beyond classic White: White Matt, Beige Matt, Black Matt and Grey Matt across the premium ranges, with P-type and S-type trap options.",
      },
      {
        q: "What is the Bidspa?",
        a: "Jaquar's electronic WC range - automatic operation and rimless bowls, available floor-mounted, back-to-wall, single-piece and wall-hung.",
      },
    ],
  },
  {
    slug: "showers",
    label: "Showers",
    query: "jaquar showers UAE",
    intro:
      "Jaquar showers cover overhead rain showers, Octane hand showers and full shower concepts - up to five flow patterns, Rubit anti-limescale nozzles and Booster technology that builds a full shower feel at low pressure. Supplied across the UAE by Global Classic from Sharjah, with up to a 10-year warranty.",
    collections: [
      {
        name: "Overhead Showers",
        slug: "overhead-showers",
        blurb:
          "Maze Prime and the rain-shower family - square, round, oval and rectangular heads.",
        productTypes: [
          "Maze Prime Square Shape Single Function Shower",
          "Round Shape Maze Overhead Shower",
        ],
        skuSamples: ["OHS-CHR-1679", "OHS-CHR-1633"],
      },
      {
        name: "Octane Showers",
        slug: "octane-showers",
        blurb:
          "The flexi-nozzle series - TriFlow heads that switch flow with a click.",
        productTypes: [
          "Octane Flexi Nozzle TriFlow Hand Shower",
          "Octane Rotor TriFlow Hand Shower",
          "Octane Slider TriFlow Overhead Shower",
        ],
        skuSamples: ["HSH-CHR-1773", "HSH-CHR-1777", "OHS-CHR-1745"],
      },
      {
        name: "Hand Showers",
        slug: "hand-showers",
        blurb:
          "Single to multi-flow hand showers matched to every mixer range.",
        productTypes: ["Single Function Hand Shower", "Multi Flow Hand Shower"],
      },
      {
        name: "Cloud Shower",
        slug: "cloud-shower",
        blurb: "The soft-rain concept head in Jaquar's shower line-up.",
        productTypes: ["Cloud Overhead Shower"],
      },
      {
        name: "Body Showers",
        slug: "body-showers",
        blurb: "Wall-mounted body jets that complete a full shower concept.",
        productTypes: ["Body Shower Jet"],
      },
      /* ---- Catalogue 2025-2026 ranges (docs/jaquar-catalogue.md) ---- */
      {
        name: "Shower Panels",
        slug: "shower-panels",
        blurb:
          "Eleven wall mounted panels from 1400 to 1600 mm tall, offering shower stall capability in a small bathroom. The line runs the Curve Neo in white aluminium finish (marked NEW in the catalogue), anti fingerprint stainless steel models, and Glassy panels in white or black tempered glass with thermostat mixers; My Home GB ships with a flow restrictor at 8.0 LPM at 3 bar pressure.",
        productTypes: [
          "Thermostat mixer panels",
          "Non-thermostat panels",
          "Stainless steel panels",
          "Tempered glass panels",
        ],
        skuSamples: [
          "SHP-WHT-TMCURVENEO",
          "SHP-SSF-ST88158B",
          "SHP-BLK-ST86112",
          "SHP-SSF-SPMYHOMEGB",
        ],
      },
      {
        name: "Shower Accessories",
        slug: "shower-accessories",
        blurb:
          "Thirty nine installation components: exposed shower pipes in flat, round and L-type formats with diverter provision for simultaneous working of showers, slide rails with hand shower kits, casted, square, Victorian and ceiling shower arms up to 600 mm long, wall outlets, brackets and flexible metal hoses in 8 mm and 12 mm dia.",
        productTypes: [
          "Exposed shower pipes",
          "Slide rails",
          "Shower arms",
          "Ceiling shower arms",
          "Wall outlets",
          "Shower hoses",
          "Wall brackets",
        ],
        skuSamples: ["SHA-1215F", "SHA-1110", "SHA-485", "SHA-549D8"],
      },
    ],
    finishes: METAL_FINISHES,
    claims: [
      {
        title: "Five flows",
        body: "Up to five flow patterns matched to mood - Normal, Massage, Mist, Cascade and Soft - switched with the Click Position System.",
      },
      {
        title: "Rubit anti-limescale",
        body: "Spray jets in elastic silicon shed lime scale with a wipe - no blocked nozzles in hard Gulf water.",
      },
      {
        title: "Booster technology",
        body: "Jaquar Booster creates the sensation of a full shower regardless of water pressure - the answer to low-pressure apartment risers.",
      },
      {
        title: "Thermo insulation",
        body: "The shower body stays cool to the touch, preventing scalding in hot-line installations.",
      },
    ],
    specs: [
      ["Warranty", "Up to 10 years"],
      ["Flow patterns", "Up to 5 - Normal, Massage, Mist, Cascade, Soft"],
      ["Nozzles", "Rubit elastic silicon, anti-limescale"],
      ["Pressure", "Booster technology for low-pressure lines"],
      ["Finishes", "10 metal finishes incl. PVD golds"],
    ],
    faqs: [
      {
        q: "Do Jaquar rain showers work at low water pressure?",
        a: "Yes - Jaquar Booster technology is designed to create a full-shower sensation regardless of pressure, which matters in older UAE apartment buildings with gravity risers.",
      },
      {
        q: "How do the nozzles handle hard water?",
        a: "Rubit technology moulds the spray jets in elastic silicon, so lime scale wipes off the face instead of blocking it - built for Gulf water hardness.",
      },
    ],
  },
  {
    slug: "shower-enclosures",
    label: "Shower Enclosures",
    query: "shower enclosures UAE",
    intro:
      "Jaquar shower enclosures run from the Ritz Collection to fully frameless walk-ins - tempered glass in 6, 8 and 10 mm, brass hardware tested to half a million cycles, and a design-installation-maintenance service in one. Global Classic supplies and coordinates enclosures across the UAE from Sharjah.",
    collections: [
      {
        name: "Ritz Collection",
        slug: "ritz-collection",
        blurb:
          "The signature enclosure series, built left- and right-handed in sizes from 1201 to 2800 mm.",
        productTypes: ["Ritz R830G Left Version", "Ritz R830G Right Version"],
        skuSamples: ["JSE-CHR-R830G1216L", "JSE-CHR-R830G1216R"],
      },
      {
        name: "Frameless",
        slug: "frameless",
        blurb:
          "Wall-to-wall, corner and tub-mounted enclosures with no visible frame - just glass and brass.",
        productTypes: [
          "Frameless Wall to Wall Enclosure",
          "Frameless Corner Enclosure",
          "Frameless Tub Mounted Enclosure",
        ],
        skuSamples: ["JSE-CHR-820G1216H19X", "JSE-CHR-840G1620H19X"],
      },
      {
        name: "Framed",
        slug: "framed",
        blurb: "The framed range - structure on show, sizes to 4200 mm.",
        productTypes: [
          "Framed Corner Enclosure",
          "Framed Wall to Wall Enclosure",
        ],
      },
      {
        name: "Sliding Range",
        slug: "sliding-range",
        blurb:
          "Sliding doors on brass-encapsulated ball-bearing rollers with a 5-year roller warranty.",
        productTypes: ["Sliding Door Enclosure", "Sliding Corner Enclosure"],
      },
      {
        name: "Shower Tray",
        slug: "shower-tray",
        blurb:
          "The matching low-profile trays that finish the enclosure install.",
        productTypes: ["Shower Tray"],
      },
    ],
    finishes: ["Chrome hardware", "SS 304 stabilisers"],
    claims: [
      {
        title: "Tempered in-house",
        body: "Glass options of 6, 8 and 10 mm, tempered on Jaquar's own fully automatic unit - 4 to 5 times stronger than float glass, proven by fragmentation, zebra, ball-drop and free-fall tests.",
      },
      {
        title: "Hardware that holds",
        body: "Brass hinges tested for 500,000 cycles and rated to 25 kg per hinge, with SS 304 stabilisers and a 5-year hardware warranty.",
      },
      {
        title: "Rise and fall doors",
        body: "Doors rise 6-8 mm off the floor while opening and settle back to seal - no dragging, no gap.",
      },
      {
        title: "Easy Clean glass",
        body: "Anti-limescale treatment keeps the glass clear in hard water - one-stop design, installation and maintenance.",
      },
    ],
    specs: [
      ["Glass", "Tempered 6 / 8 / 10 mm"],
      ["Strength", "4-5x float glass - EN 14450, IS 14900"],
      ["Hinges", "Brass, 500,000 cycles, 25 kg per hinge"],
      ["Rollers", "Ball bearing in brass - 5-year warranty"],
      ["Sizes", "600 mm up to 4200 mm bands"],
      ["Hardware warranty", "5 years"],
    ],
    faqs: [
      {
        q: "What sizes do Jaquar shower enclosures come in?",
        a: "Standard bands run from 600-800 mm up to 3801-4200 mm, with the Ritz Collection built in 1201-2800 mm left- and right-hand versions - and cut-to-site coordination handled with the install.",
      },
      {
        q: "What glass thickness should a UAE villa enclosure use?",
        a: "Jaquar tempers 6, 8 and 10 mm; frameless walk-ins typically specify 8 or 10 mm for stiffness. All glass is 4-5 times stronger than float and tested to EN 14450.",
      },
    ],
  },
  {
    slug: "whirlpools",
    label: "Whirlpools",
    query: "whirlpool bathtub UAE",
    intro:
      "Jaquar whirlpools are 140-190 cm hydro-massage and air-massage tubs across eleven ranges from Arc to Laguna - water pumps of 1.0 to 1.4 HP per model, 0.9 HP air blowers, chromotherapy and Antibac surfaces, designed by European specialists. Supplied across the UAE by Global Classic from Sharjah, with the full 13-model specification sheet published below.",
    collections: [
      {
        name: "Arc",
        slug: "arc",
        blurb:
          "The 1900 x 900 mm flagship - 8 slim water jets, 4 back jets, 16 air jets, chromotherapy.",
        productTypes: ["Arc (Combi System)", "Arc (Water System)"],
        skuSamples: ["JWP-WHT-ARC190CX", "JWP-WHT-ARC190WX"],
      },
      {
        name: "Kubix Prime",
        slug: "kubix-prime",
        blurb: "The cubist geometry at 180 cm, in combi and water systems.",
        productTypes: [
          "Kubix Prime (Combi System)",
          "Kubix Prime (Water System)",
        ],
        skuSamples: ["JWP-WHT-KUBIXPM180CX", "JWP-WHT-KUBIXPM180WX"],
      },
      {
        name: "Opal Prime",
        slug: "opal-prime",
        blurb: "Soft-radius 180 cm tubs in the prime specification.",
        productTypes: [
          "Opal Prime (Combi System)",
          "Opal Prime (Water System)",
        ],
        skuSamples: ["JWP-WHT-OPALPM180CX"],
      },
      {
        name: "Vignette Prime",
        slug: "vignette-prime",
        blurb: "The sculpted 190 cm range matching Vignette Prime ceramics.",
        productTypes: [
          "Vignette Prime (Combi System)",
          "Vignette Prime (Water System)",
        ],
        skuSamples: ["JWP-WHT-VGNT190CX"],
      },
      {
        name: "D'arc",
        slug: "darc",
        blurb: "The asymmetric-curve tub of the family, at 180 cm.",
        productTypes: ["D'arc (Combi System)", "D'arc (Water System)"],
        skuSamples: ["JWP-WHT-DARC180CX"],
      },
      {
        name: "Kubix",
        slug: "kubix",
        blurb: "The original cubist tub, combi and water systems.",
        productTypes: ["Kubix (Combi System)", "Kubix (Water System)"],
      },
      /* ---- Catalogue 2025-2026 ranges (docs/jaquar-catalogue.md) ---- */
      {
        name: "Alive",
        slug: "alive",
        blurb:
          "A single-size system at 1800 x 800 x 470 mm in whirlpool and airpool combi or water builds, with matching front and side panels. The spec sheet prints 8 water jets, 12 air jets and 4 back jets on a 1.4 HP water pump with 0.90 HP air blower, chromotherapy, digital control and an SS202 steel frame.",
        productTypes: [
          "Whirlpool and airpool combi systems",
          "Water systems",
          "Panels",
        ],
        skuSamples: [
          "JWP-WHT-ALIVE180CX",
          "JWP-WHT-ALIVE180WX",
          "JWA-WHT-FP180X",
        ],
      },
      {
        name: "Fonte",
        slug: "fonte",
        blurb:
          "The widest run in the line: 1500, 1600 and 1700 x 750 x 420 mm plus 1800 x 800 x 450 mm, each in water or whirlpool and airpool combi builds, with project variants carrying 6 water and 12 air jets and a level sensor electronic key pad. Pumps are printed per size: 1.0 HP on the 1800 x 800 and 1 HP on the 1500 x 750 and 1700 x 750, with a 0.90 HP air blower throughout.",
        productTypes: [
          "Whirlpool and airpool combi systems",
          "Water systems",
          "Project systems",
          "Panels",
        ],
        skuSamples: [
          "JWP-WHT-FONTE180CX",
          "JWP-WHT-FONTE150CX",
          "JWP-WHT-FONTE160PWX",
          "JWA-WHT-FONT160FPX",
        ],
      },
      {
        name: "Fonte-R",
        slug: "fonte-r",
        blurb:
          "A square-format 1500 x 1500 x 470 mm tub in combi and water system builds. It prints 8 water jets and 16 air jets with no back jets, on a 1.4 HP water pump with 0.90 HP air blower, chromotherapy and digital control.",
        productTypes: ["Combi systems", "Water systems"],
        skuSamples: ["JWP-WHT-POINT150CX", "JWP-WHT-POINT150WX"],
      },
      {
        name: "Fusion",
        slug: "fusion",
        blurb:
          "A corner-plan 1400 x 1400 x 450 mm system in water or combi builds with a matching angular panel. The spec sheet prints 6 water jets, 12 air jets and 4 back jets on a 1.0 HP water pump with 0.90 HP air blower.",
        productTypes: ["Combi systems", "Water systems", "Angular panels"],
        skuSamples: ["JWP-WHT-GMI140CX", "JWP-WHT-GMI140WX", "JWA-WHT-FUSNCPX"],
      },
      {
        name: "Laguna",
        slug: "laguna",
        blurb:
          "A slim 1800 x 700 x 450 mm footprint in whirlpool and airpool combi or water system builds, with front and side panels. It prints 6 water jets, 12 air jets and 4 back jets on a 1.4 HP water pump with 0.90 HP air blower, chromotherapy and digital control.",
        productTypes: [
          "Whirlpool and airpool combi systems",
          "Water systems",
          "Panels",
        ],
        skuSamples: [
          "JWP-WHT-LAGUNA170CX",
          "JWP-WHT-LAGUNA170WX",
          "JWA-WHT-FPLAG170X",
        ],
      },
    ],
    finishes: ["White PMMA acrylic"],
    claims: [
      {
        title: "European-designed systems",
        body: "Created by specialist designers from Europe: hydro-massage water jets, air massage and chromotherapy in green, yellow, blue and red moods.",
      },
      {
        title: "Pumps rated per model",
        body: "The Arc combi runs a 1.4 HP water pump through 8 slim jets and 4 back jets with a 0.9 HP blower; the compact Fonte and Fusion formats run 1.0 HP pumps - every rating is per-model on the printed specification sheet, never a blanket figure.",
      },
      {
        title: "Hygiene engineered in",
        body: "Antibac hygienic surfaces, Y-shaped housings that drain completely, food-grade PVC pipes with antibacterial inner coating - no standing water, no bacteria formation.",
      },
      {
        title: "Triple-tested electrics",
        body: "Every tub passes a European 3-tier test - earthing resistance, insulation and high voltage - with a safety vacuum breaker that cuts the motor on suction blockage.",
      },
    ],
    specs: [
      ["Sizes", "1400 x 1400 to 1900 x 900 mm - 13 models"],
      ["Water pumps", "1.0 HP (Fonte, Fusion formats) to 1.4 HP - per model"],
      ["Air system", "0.9 HP blower - 12 or 16 air jets per model"],
      ["Shell", "PMMA acrylic, PU Green reinforced, SS202 frame"],
      ["Extras", "Chromotherapy - digital controls - headrests - system clean"],
      ["Warranty", "5 yr body & jets - 2 yr electrical parts"],
    ],
    faqs: [
      {
        q: "What is the difference between a combi and water system whirlpool?",
        a: "Water systems run hydro-massage jets only; combi systems add an air blower - the Arc combi pairs a 1.4 HP water pump with a 0.9 HP air blower through 16 air jets. Both come in the same tub designs.",
      },
      {
        q: "Do Jaquar whirlpools fit standard UAE bathrooms?",
        a: "The 13 catalogued models run 1400 x 1400 mm (Fusion) to 1900 x 900 mm (Arc, Vignette Prime) - standard alcove and freestanding bathroom dimensions. The full printed specification sheet is published on this page for design coordination.",
      },
    ],
  },
  /* ---------- New categories from the 2025-2026 catalogue ---------- */
  {
    slug: "bathtubs",
    label: "Bathtubs",
    query: "jaquar bathtub UAE",
    intro:
      "Jaquar bathtubs run freestanding sculptural tubs from 1600 x 750 to 1800 x 800 mm and thirty built-in configurations matched to eleven design families, all on the printed 12 mm three-layer acrylic build - transparent acrylic top, polymer layer, polyurethane layer. Global Classic supplies the range wholesale from Sharjah, with drain kits, panels and headrests, delivered to every emirate.",
    collections: [
      {
        name: "Freestanding Bathtubs",
        slug: "freestanding",
        blurb:
          "Eight sculptural tubs from 1600 x 750 mm to 1800 x 800 mm, with built-in overflows and pop-up wastes; the Queens tub is offered with chrome or gold overflow, waste and legs. Bodies carry the printed 12 mm three-layer acrylic build: special transparent acrylic top layer, special polymer layer and polyurethane layer.",
        productTypes: ["Freestanding bathtubs"],
        skuSamples: [
          "JBT-WHT-FSBTLG6001",
          "JBT-WHT-FSBTMAD1778",
          "JBT-WHT-FSBTPB278X",
          "JBT-WHT-FSBT167543X",
        ],
      },
      {
        name: "Built-In Bathtubs",
        slug: "built-in",
        blurb:
          "Thirty drop-in configurations across the Arc, Kubix, Kubix Prime, Opal Prime, D'Arc, Fonte, Fonte R, Alive, Vignette Prime, Fusion and Laguna families, in sizes up to 1900 x 900 x 470 mm. Framed versions carry powder coated MS frames with matched front and side panels, drain pipes and Base Europa installation kits.",
        productTypes: [
          "Built-in bathtubs",
          "Framed bathtubs",
          "Front panels",
          "Side panels",
        ],
        skuSamples: [
          "JBT-WHT-KUBIXP180FX",
          "JBT-WHT-DARC180FX",
          "JBT-WHT-FONT170FX",
          "JBT-WHT-LAGUNA180FX",
        ],
      },
      {
        name: "Bathtub Accessories",
        slug: "accessories",
        blurb:
          "Completion hardware for the bathtub programme: drain pipes with overflow in 80 cm and 100 cm lengths plus a 70-80 mm overflow system, with-filler variants, the Base Europa installation kit, and Comfort and Sophi headrests in black.",
        productTypes: ["Drain pipes", "Installation kits", "Headrests"],
        skuSamples: [
          "JWA-CHR-132201",
          "JWA-CHR-DRNPIPE100",
          "IWA-CHR-ACC00510X",
          "JWA-BLK-HRCP750GAC06",
        ],
      },
    ],
    finishes: ["White acrylic", "Chrome and gold fittings (Queens freestanding)"],
    claims: [
      {
        title: "Three layers, 12 mm",
        body: "The printed build: a special transparent acrylic top layer over a special polymer layer over polyurethane - 12 mm of shell engineered for chemical resistance and heat retention.",
      },
      {
        title: "Eleven matched families",
        body: "Built-in tubs are styled to the same families as the faucets and ceramics - Arc to Laguna - so a bathroom specifies as one language, not a mix of vendors.",
      },
      {
        title: "Framed for install",
        body: "Framed versions arrive on powder coated MS frames with matched front and side panels - the install detail that keeps site work off the critical path.",
      },
      {
        title: "Completion hardware included in the programme",
        body: "Drain pipes with overflow, Base Europa installation kits and headrests ship from the same catalogue - one BOQ line per bathroom, not five suppliers.",
      },
    ],
    specs: [
      ["Freestanding sizes", "1600 x 750 to 1800 x 800 mm - 8 tubs"],
      ["Built-in sizes", "Up to 1900 x 900 x 470 mm - 30 configurations"],
      ["Shell", "12 mm three-layer acrylic build"],
      ["Families", "Arc, Kubix, Kubix Prime, Opal Prime, D'Arc, Fonte, Fonte R, Alive, Vignette Prime, Fusion, Laguna"],
      ["Warranty", "5 yr non-electrical parts (per the printed matrix)"],
    ],
    faqs: [
      {
        q: "Freestanding or built-in - which Jaquar bathtub should a project specify?",
        a: "Freestanding tubs are the sculptural statement - eight designs with built-in overflow and pop-up waste. Built-in tubs drop into a marble or tiled deck and match eleven Jaquar design families, with framed versions carrying their own MS frames and panels. Both build on the same 12 mm three-layer acrylic.",
      },
      {
        q: "What is a Jaquar bathtub made of?",
        a: "The catalogue prints a 12 mm three-layer build: a special transparent acrylic top layer, a special polymer layer and a polyurethane layer - the same PMMA acrylic family used on the whirlpool line.",
      },
      {
        q: "Do you deliver Jaquar bathtubs across the UAE?",
        a: "Yes - wholesale from Global Classic's Sharjah warehouse to every emirate, with drain kits, panels and installation hardware quoted on the same BOQ, usually within one working day.",
      },
    ],
  },
  {
    slug: "flushing-systems",
    label: "Flushing Systems",
    query: "jaquar flushing system UAE",
    intro:
      "Jaquar flushing systems run from i-Flush in-pipeline mechanisms that work from 0.8 bar to exposed flush valves, slim in-wall cisterns and eleven designer control plates. Dual flush is 3/6 litres adjustable to 2/4, frames are rated to 400 kg, and flush valves carry a 10-year warranty. Global Classic supplies the range wholesale from Sharjah across the UAE.",
    collections: [
      {
        name: "i-Flush",
        slug: "i-flush",
        blurb:
          "Installed directly in the pipeline, i-Flush replaces the concealed cistern with an in-wall flushing mechanism in 20 mm and 32 mm bodies, with dual flush push button actuation and a printed flow rate of 1.2 l/sec. The 32 mm body works efficiently from a minimum 0.8 bar dynamic pressure and permits repeated flushing with no refill wait; floor mounting frame variants ship with P-type or S-type drain pipe connection sets for wall hung WCs.",
        productTypes: [
          "In-wall flushing systems",
          "Floor mounting frame bodies",
          "Exposed part kits",
        ],
        skuSamples: ["FLV-1075N", "FLV-1073", "FLV-1075FP", "FLV-1073FS"],
        finishCodes: ["CHR", "ABR", "ACR", "BCH", "BLM", "GRF"],
      },
      {
        name: "Flush Valves",
        slug: "flush-valves",
        blurb:
          "Thirteen exposed and Metropole in-wall flush valves in 32 mm and 40 mm sizes. Regular valves print 10.00 l/f adjustable from 4-20 l/f or a fixed 6.0 l/f; dual flow models print 3.0/6.0 l/f, with round flange, square flange or rectangular dual flush plate options for western commodes.",
        productTypes: [
          "Regular flush valves",
          "Dual flow flush valves",
          "Metropole in-wall flush valves",
        ],
        skuSamples: ["FLV-1015", "FLV-1029", "FLV-1085N", "FLV-1089DFP"],
      },
      {
        name: "In-Wall Cisterns",
        slug: "cisterns",
        blurb:
          "Single piece in-wall cisterns in slim and front or top actuation bodies, with wall or floor mounting frames and P-type or S-type drain pipe connection sets for wall hung WCs. Dual flush prints 3/6 litres adjustable to 2/4; the floor standing frame is rated up to 400 kg with a fixed 135 mm centre to centre inlet/outlet distance, 0-200 mm adjustable legs and no chiselling of the wall required, while anti-condensation lining wraps the tank and supply bend.",
        productTypes: [
          "Slim in-wall cisterns",
          "Front or top actuation cisterns",
          "Wall mounting frame variants",
          "Floor mounting frame variants",
        ],
        skuSamples: ["JCS-WHT-2400WS", "JCS-WHT-2400FP", "JCS-WHT-2431S"],
      },
      {
        name: "Flush Plates",
        slug: "flush-plates",
        blurb:
          "Eleven control plates matched to the design families that specify them: Laguna, Continental Prime, Opal, Kubix, Fusion, Ornamix Prime, Vignette Prime, Alive, Aria, Queens Prime and D'arc. One actuation architecture, eleven faces.",
        productTypes: ["Control plates"],
        skuSamples: ["JCP-912415", "JCP-2415", "JCP-392415", "JCP-372415"],
      },
    ],
    finishes: METAL_FINISHES,
    claims: [
      {
        title: "i-Flush needs no cistern",
        body: "Installed directly in the pipeline with dual flush actuation - the 32 mm body works from a minimum 0.8 bar dynamic pressure and flushes repeatedly with no refill wait.",
      },
      {
        title: "Frames engineered for wall hung WCs",
        body: "Floor standing frames rated up to 400 kg, legs adjustable 0-200 mm, inlet and outlet fixed at 135 mm centres - and no chiselling of the wall required.",
      },
      {
        title: "Water discipline built in",
        body: "Dual flush at 3/6 litres, adjustable to 2/4 litres on site - the specification UAE green-building briefs ask for, in print.",
      },
      {
        title: "Warranted in tiers, honestly",
        body: "Flush valves carry 10 years, concealed cistern bodies and mechanisms 7, sensor flushing systems 5 - per Jaquar's printed warranty table, not a blanket claim.",
      },
    ],
    specs: [
      ["Dual flush", "3/6 L adjustable to 2/4 L"],
      ["i-Flush", "Works from 0.8 bar - 20 mm and 32 mm bodies - 1.2 l/sec"],
      ["Frame", "400 kg rated - 0-200 mm legs - 135 mm centres"],
      ["Flush valves", "32 / 40 mm - 4-20 l/f adjustable or 3/6 l/f dual flow"],
      ["Control plates", "11 designer faces matched to the collections"],
      ["Warranty", "10 yr flush valve - 7 yr concealed cistern - 5 yr sensor"],
    ],
    faqs: [
      {
        q: "What is Jaquar i-Flush and when should it be specified?",
        a: "i-Flush installs directly in the pipeline and replaces the concealed cistern entirely - dual flush actuation, 1.2 l/sec flow, repeated flushing with no refill wait. The 32 mm body works from just 0.8 bar dynamic pressure, which suits low-pressure risers where cistern refills lag.",
      },
      {
        q: "How much load can the in-wall frame for a wall hung WC take?",
        a: "The printed rating is up to 400 kg on the floor standing frame, with 0-200 mm adjustable legs and a fixed 135 mm centre-to-centre inlet/outlet - installed without chiselling the wall.",
      },
      {
        q: "Can the 3/6 litre dual flush be reduced further?",
        a: "Yes - the catalogue prints the dual flush as 3/6 litres adjustable to 2/4 litres, a site-level adjustment that halves the small flush for water-conscious projects.",
      },
      {
        q: "What warranty do Jaquar flushing systems carry?",
        a: "Per the printed matrix: flush valves 10 years, concealed cistern body and working mechanism 7 years, wall hung cisterns 2 years, sensor flushing systems 5 years.",
      },
    ],
  },
  {
    slug: "wellness",
    label: "Wellness",
    query: "jaquar spa UAE",
    intro:
      "Jaquar wellness spans fourteen spas from two-seaters to the 5900 mm Hydrozone swim spa, Hemlock wood saunas in stove and infrared builds, and steam generators laddering 4 to 24 kW. Controllers run Balboa, Gecko and SV-series; shells are four-layer thermo bond. Global Classic supplies and coordinates the range for UAE villas, hotels and fitness projects from Sharjah.",
    collections: [
      {
        name: "Spas",
        slug: "spas",
        blurb:
          "Fourteen spas from two-seat units at 1650 x 1650 x 740 mm to the five-seat Hydrozone swim spa at 5900 x 2300 x 1300 mm, with jet counts running to 93 on the nine-seat Palladium. Controllers span SV2, SV3, SV4, Gecko and Balboa; variable output heaters run from 1.3 kW on Gemini to 6 kW on Hydrozone, Palladium and Aquagym Max, with electrical requirements from 13 amp up to a maximum 60 amps.",
        productTypes: ["Swim spas", "Seated spas", "Spa hard covers"],
        skuSamples: [
          "WSP-WHT-SPA5S590VX",
          "WSP-SLV-SPA8S3520VX",
          "JSP-WHT-SPABREVA5S",
          "WSP-SLV-SPAFISHER",
        ],
      },
      {
        name: "Saunas",
        slug: "saunas",
        blurb:
          "Five cabins in Hemlock wood, from the single-seat Solo One infrared at 900 x 1050 x 1900 mm to 2-3 seater stove heater rooms at 1750 x 1200 x 2100 mm. Infrared models print carbon heaters at 1750 W and 2490 W; fit-outs include LED and chromo lighting, Bluetooth, MP3 and touch controls.",
        productTypes: ["Stove heater saunas", "Infrared saunas"],
        skuSamples: ["JSA-NAW-T16120", "JSA-NAW-DLX9011", "JSA-NAW-S004175"],
      },
      {
        name: "Steam Solutions",
        slug: "steam-solutions",
        blurb:
          "Steam generators ladder from 4 kW to 24 kW across eight ratings: 4, 6, 9, 12, 15, 18, 22.5 and 24 kW, paired with round or square control panels in white or black. The range closes with the Smart Vapour steam stool: 4.5 kW capacity, black matt, with chromotherapy light.",
        productTypes: ["Steam generators", "Control panels", "Steam stools"],
        skuSamples: [
          "JSG-WHT-NMID40",
          "JSG-WHT-NMID240",
          "JSG-BLK-CPROUND",
          "JSG-BLK-PIUVAP5000ST",
        ],
      },
    ],
    finishes: ["White acrylic shells", "Silver shells", "Hemlock wood"],
    claims: [
      {
        title: "Controllers the industry trusts",
        body: "Balboa, Gecko and SV-series spa controllers per model, with programmable circulation pumps, illuminated topside controls and dual controllers on the big formats.",
      },
      {
        title: "Four-layer thermo bond shells",
        body: "Thermo bond 4-layer shell construction with 25 mm high-density PU insulation foam on the Balboa models - heat stays in the water, not the plant bill.",
      },
      {
        title: "From two seats to a swim lane",
        body: "Fisher 2 and Gemini for terraces, Palladium's nine seats and 93 jets for hospitality, and the 5.9-metre Hydrozone swim spa with 6 kW heating and up to 60 amp electrical spec.",
      },
      {
        title: "Steam sized by the kilowatt",
        body: "Eight generator ratings from 4 to 24 kW with round or square control panels - sized to the steam room, not guessed.",
      },
    ],
    specs: [
      ["Spa formats", "14 models - 1650 x 1650 mm to 5900 x 2300 mm"],
      ["Spa heaters", "1.3 kW to 6 kW variable output per model"],
      ["Electrical", "13 amp to max 60 amps per model"],
      ["Saunas", "Hemlock wood - stove and infrared (1750 / 2490 W carbon)"],
      ["Steam generators", "4 / 6 / 9 / 12 / 15 / 18 / 22.5 / 24 kW"],
      ["Warranty", "5 yr non-electrical - 2 yr electrical and spa shell"],
    ],
    faqs: [
      {
        q: "What electrical supply does a Jaquar spa need?",
        a: "It is printed per model: from 13 amps on the two-seat Nuovo up to a maximum 60 amps on the Hydrozone swim spa. Heaters are variable output, 1.3 kW to 6 kW depending on model - the full p334 features sheet travels with our quotations.",
      },
      {
        q: "What is a swim spa?",
        a: "A spa long enough to swim against a current - the Hydrozone runs 5900 x 2300 x 1300 mm with a swim lane and separate spa seating for five, holding 1,530 litres in the spa and 7,030 in the swim section.",
      },
      {
        q: "Stove or infrared sauna - what is the difference?",
        a: "Stove heater cabins heat the air with an electric stone stove; infrared models use carbon heaters printed at 1750 W and 2490 W that warm the body directly at lower air temperatures. Both are built in Hemlock wood with LED and chromo lighting.",
      },
      {
        q: "How is a steam generator sized?",
        a: "By steam room volume - the ladder runs 4, 6, 9, 12, 15, 18, 22.5 and 24 kW. Send the room dimensions and glass area with the enquiry and the rating comes back with the AED pricing.",
      },
    ],
  },
  {
    slug: "accessories",
    label: "Accessories",
    query: "jaquar bathroom accessories UAE",
    intro:
      "Jaquar bathroom accessories run six design families - Continental to the crystal-detailed Rendezvous - across towel rails, dispensers, paper holders, shelves, hooks and mirrors, plus a commercial washroom line of HEPA-filtered hand dryers, sensor soap dispensers and AISI 304 paper towel dispensers. Global Classic supplies both wholesale from Sharjah, matched to the faucet collections they echo.",
    collections: [
      {
        name: "Continental",
        slug: "continental",
        blurb:
          "The broadest accessory family at 30 pieces: towel rails, rings and shelves with stainless steel options, soap dispensers in glass or metallic bottle, paper holders including a shelf variant, shower baskets, and swivel, oval and 3X magnifying pivotal mirrors.",
        productTypes: [
          "Towel rails",
          "Towel rings",
          "Towel shelves",
          "Soap dispensers",
          "Paper holders",
          "Robe hooks",
          "Shower baskets",
          "Mirrors",
        ],
        skuSamples: ["ACN-1121N", "ACN-1137N", "ACN-1181S", "ACN-1193N"],
      },
      {
        name: "Continental Prime",
        slug: "continental-prime",
        blurb:
          "Twenty pieces, all in chrome: a 300 mm grab bar, towel rails at 450 and 600 mm, square and round towel rings, soap dish and glass bottle dispenser, tumbler and toilet brush holders, paper holders with lid and spare, 600 mm glass and towel shelves, and robe hooks.",
        productTypes: [
          "Grab bars",
          "Towel rails",
          "Towel rings",
          "Soap dispensers",
          "Tumbler holders",
          "Paper holders",
          "Shelves",
          "Robe hooks",
        ],
        skuSamples: [
          "CPA-CHR-1101",
          "CPA-CHR-1111L450",
          "CPA-CHR-1171",
          "CPA-CHR-1153",
        ],
      },
      {
        name: "Kubix Prime",
        slug: "kubix-prime",
        blurb:
          "Twenty squared-profile pieces: toilet roll holders with shelf or stainless steel flap, towel ring, soap dispenser with glass bottle, tumbler and WC brush holders, double coat hook, 600 mm shelves with stainless steel hangers, and a 630 x 445 mm rectangular swivel mirror.",
        productTypes: [
          "Paper holders",
          "Towel rings",
          "Soap dispensers",
          "Tumbler holders",
          "Brush holders",
          "Coat hooks",
          "Shelves",
          "Mirrors",
        ],
        skuSamples: ["AKP-35757P", "AKP-35753PS", "AKP-35781PS", "AKP-35795"],
      },
      {
        name: "Queen's",
        slug: "queens",
        blurb:
          "Ten pieces built for daily service: a twin type paper holder, robe hooks, 600 mm towel shelves with lower hangers, stainless steel grab bars in 300, 450 and 600 mm, a retractable stainless steel cloth liner and a 550 mm glass shelf.",
        productTypes: [
          "Paper holders",
          "Robe hooks",
          "Towel shelves",
          "Grab bars",
          "Cloth liners",
          "Glass shelves",
        ],
        skuSamples: ["AQN-7755", "AHS-1501", "AHS-1565", "AHS-1581H"],
      },
      {
        name: "Rendezvous Crystal Collection",
        slug: "rendezvous-crystal",
        blurb:
          "Nine crystal-detailed pieces: a 600 mm towel rail and 450 mm towel shelf, a 550 mm glass shelf, towel ring, tumbler holder, soap dish, toilet paper holder, and double coat and robe hooks.",
        productTypes: [
          "Towel rails",
          "Towel shelves",
          "Glass shelves",
          "Towel rings",
          "Tumbler holders",
          "Soap dishes",
          "Paper holders",
          "Hooks",
        ],
        skuSamples: ["ACT-8811", "ACT-8871", "ACT-8821", "ACT-8833"],
      },
      {
        name: "Combo Pack",
        slug: "combo-pack",
        blurb:
          "A six-piece chrome set sold under one SKU: round towel ring, soap dish holder, glass bottle soap dispenser, paper holder with stainless steel lid, double robe hook and towel rail.",
        productTypes: ["Accessory combo packs"],
        skuSamples: ["ACN-6PCCOP1", "ACN-CHR-1121BN", "ACN-CHR-1153S"],
      },
      {
        name: "Washroom Accessories",
        slug: "washroom-accessories",
        blurb:
          "Commercial washroom hardware: touch-free infrared hand dryers led by the 1850 W Nuovo dualflow with DC brushless motor and double HEPA filter, with Flash and Bolt at 1150 W; push button and automatic 0.8 L soap dispensers including a 9V transformer variant; an AISI 304 stainless steel paper towel dispenser holding 400-600 C/Z fold towels; and 680 mm and vertical swing grab bars in white, black matt and satin.",
        productTypes: [
          "Hand dryers",
          "Soap dispensers",
          "Paper towel dispensers",
          "Grab bars",
        ],
        skuSamples: [
          "HDR-SLV-AK2030",
          "SDR-WHT-DJ0010FN",
          "PTD-SAP-DT0106CSN",
          "WAC-BLM-BG0800N",
        ],
      },
    ],
    finishes: [
      "Chrome",
      "Stainless steel",
      "Satin",
      "Black Matt",
      "White",
    ],
    claims: [
      {
        title: "Matched to the faucet families",
        body: "Continental, Continental Prime, Kubix Prime, Queen's and Rendezvous accessories echo the faucet collections of the same names - one design language from mixer to towel rail.",
      },
      {
        title: "Commercial grade where it counts",
        body: "AISI 304 stainless steel paper towel dispensers, HEPA-filtered hand dryers with DC brushless motors, and stainless grab bars in three lengths for accessible washrooms.",
      },
      {
        title: "One SKU fit-outs",
        body: "The six-piece Combo Pack outfits a complete bathroom under a single code - the volume answer for apartment and hotel programmes.",
      },
      {
        title: "Serviceable by design",
        body: "Glass bottles, spare paper holders and retractable liners are catalogued as parts - washrooms stay in service instead of waiting on replacements.",
      },
    ],
    specs: [
      ["Design families", "Continental - Continental Prime - Kubix Prime - Queen's - Rendezvous Crystal"],
      ["Hand dryers", "Nuovo dualflow 1850 W (double HEPA) - Flash / Bolt 1150 W"],
      ["Soap dispensers", "0.8 L - push button, automatic, 9V transformer variant"],
      ["Paper towel dispenser", "AISI 304 stainless - 400-600 C/Z fold towels"],
      ["Grab bars", "300 / 450 / 600 / 680 mm - white, black matt, satin"],
      ["Warranty", "10 yr metal parts - 2 yr dryers and dispensers"],
    ],
    faqs: [
      {
        q: "Can Jaquar accessories match my faucet collection?",
        a: "That is the design intent - Continental, Continental Prime, Kubix Prime, Queen's and Rendezvous accessory families carry the same lines as their faucet namesakes, so towel rails, paper holders and mirrors read as one specification.",
      },
      {
        q: "Does Jaquar make commercial washroom equipment?",
        a: "Yes - the washroom line covers touch-free hand dryers (the 1850 W Nuovo dualflow runs a DC brushless motor with double HEPA filter), sensor and push-button soap dispensers, AISI 304 paper towel dispensers and stainless grab bars, all supplied wholesale by Global Classic.",
      },
      {
        q: "What is in the Combo Pack?",
        a: "Six chrome pieces under one SKU: towel ring, soap dish holder, glass bottle dispenser, paper holder with stainless lid, double robe hook and towel rail - the one-line fit-out for volume residential projects.",
      },
    ],
  },
  {
    slug: "water-heaters",
    label: "Water Heaters",
    query: "jaquar water heater UAE",
    intro:
      "Jaquar water heaters ladder from 1-litre instant units to 500-litre floor-mounted Verna tanks - instant electric, Elena and Erica storage, Versa 30-100 litre verticals and horizontals, in gas, electric and instant families. Tank warranties run up to 7 years on storage models per the printed matrix. Global Classic supplies the ladder wholesale from Sharjah across the UAE.",
    collections: [
      {
        name: "Water Heaters",
        slug: "water-heaters",
        tagline: "Gas | Electric | Instant",
        blurb:
          "One capacity ladder from point of use to plant scale: instant electric heaters in 1/3 litres, Elena Prime manual storage in 6/10/15/25 litres with horizontal models in 15/25 litres, Erica vertical digital units, Versa manual vertical in 30/50/80/100 litres, and Verna floor mounting units in 200/300/400/500 litres.",
        productTypes: [
          "Instant electric water heaters",
          "Vertical storage water heaters",
          "Horizontal storage water heaters",
          "Digital storage water heaters",
          "Floor mounting water heaters",
        ],
        skuSamples: [
          "INS-WHT-3KW01",
          "ELM-WHT-H015",
          "VME-WHT-V100",
          "VRN-GRY-500",
        ],
      },
    ],
    finishes: ["White", "Grey (Verna floor mounting)"],
    claims: [
      {
        title: "A ladder, not a lineup",
        body: "1 and 3 litre instant units at the basin, 6-25 litre Elena and Erica storage in vertical and horizontal builds, 30-100 litre Versa, and 200-500 litre Verna floor tanks - one brand from point of use to plant room.",
      },
      {
        title: "Capacity selection, printed",
        body: "The catalogue carries its own capacity-selection guide (p345) - basin, shower, bathtub and multi-point loads mapped to litres, so the BOQ is sized before the site visit.",
      },
      {
        title: "Warranted in tiers",
        body: "Per the printed hot water matrix: instant tanks 5 years, storage up to 100 litres 7 years on tank and 4 on element, storage above 100 litres 3/3/3 - stated per line, never blended.",
      },
      {
        title: "Fits the riser and the plant room",
        body: "Horizontal Elena models slide above false ceilings; Verna floor tanks at 540-710 mm diameter serve central systems - dimensions are printed per model in the table below.",
      },
    ],
    specs: [
      ["Instant", "1 / 3 litres - 3 kW and 4.5 kW class"],
      ["Storage vertical", "6 / 10 / 15 / 25 L (Elena Prime, Erica) - 30-100 L (Versa)"],
      ["Storage horizontal", "15 / 25 L (Elena) - 30-100 L (Versa)"],
      ["Floor mounting", "200 / 300 / 400 / 500 L (Verna, grey)"],
      ["Tank warranty", "5 yr instant - 7 yr storage to 100 L - 3 yr above 100 L"],
    ],
    faqs: [
      {
        q: "What size Jaquar water heater does a UAE bathroom need?",
        a: "The catalogue's own p345 selection guide maps loads to capacity: instant 1-3 litre units for a basin, 10-25 litres for a shower, 25 litres and up where a bathtub or multiple points draw together, and Versa 30-100 litres for full apartments. Send the fixture count and the sizing comes back with the quotation.",
      },
      {
        q: "What warranty do Jaquar water heaters carry?",
        a: "Per the printed hot water matrix: instant models 5 years on the tank, storage up to 100 litres 7 years on tank and 4 on the heating element, storage above 100 litres 3 years across tank, element and spares.",
      },
      {
        q: "Are there horizontal models for false-ceiling installs?",
        a: "Yes - Elena horizontal in 15 and 25 litres (510 and 747 mm long) and Versa horizontal in 30 to 100 litres, the standard answer for UAE apartment shafts and ceiling voids.",
      },
    ],
  },
];

export const jaquarCategoryBySlug = new Map(
  jaquarCategories.map((c) => [c.slug, c]),
);

export function jaquarCollectionBySlug(category: string, collection: string) {
  return jaquarCategoryBySlug
    .get(category)
    ?.collections.find((c) => c.slug === collection);
}
