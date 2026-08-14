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
      "Jaquar faucets are the core of the brand that produces 125,000 taps a day - single lever basin mixers, quarter turn taps, thermostatic and sensor fittings across thirty-plus ranges from Aria to Florentine, in ten finishes from Chrome to Gold Bright PVD, with the design-matched chrome accessory sets alongside. Global Classic supplies taps, mixers and bathroom fittings wholesale from Sharjah - bulk and project quantities only, priced against the BOQ.",
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
      {
        name: "Taps - Quarter Turn & Classic",
        slug: "taps",
        blurb:
          "The taps, gathered: quarter turn pillar taps, basin taps, bib taps and angle valves from the Continental, Queen's, Astra and Rendezvous ranges, the Pressmatic self-closing line and spout operated taps - the classic non-mixer fittings a UAE project BOQ still calls taps. Every tap on this page carries its printed SKU and flow rate for direct quoting.",
        productTypes: [
          "Quarter turn pillar taps",
          "Basin taps and bib taps",
          "Angle valves and stop valves",
          "Self-closing Pressmatic taps",
          "Spout operated taps",
        ],
        skuSamples: ["CON-011KN", "QQT-7167B", "AQT-3011", "PRS-031"],
      },
      /* ---- Design-matched chrome accessory families ---- */
      {
        name: "Continental Accessories",
        slug: "continental-accessories",
        blurb:
          "The broadest accessory family at 30 pieces: towel rails, rings and shelves with stainless steel options, soap dispensers in glass or metallic bottle, paper holders including a shelf variant, shower baskets, and swivel, oval and 3X magnifying pivotal mirrors - matched to the Continental faucet language.",
        productTypes: [
          "Towel rails and rings",
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
        name: "Continental Prime Accessories",
        slug: "continental-prime-accessories",
        blurb:
          "Twenty pieces, all in chrome: a 300 mm grab bar, towel rails at 450 and 600 mm, square and round towel rings, soap dish and glass bottle dispenser, tumbler and toilet brush holders, paper holders with lid and spare, 600 mm glass and towel shelves, and robe hooks.",
        productTypes: [
          "Grab bars",
          "Towel rails and rings",
          "Soap dispensers",
          "Tumbler holders",
          "Paper holders",
          "Shelves",
          "Robe hooks",
        ],
        skuSamples: ["CPA-CHR-1101", "CPA-CHR-1111L450", "CPA-CHR-1171"],
      },
      {
        name: "Kubix Prime Accessories",
        slug: "kubix-prime-accessories",
        blurb:
          "Twenty squared-profile pieces matched to the cubist faucet flagship: toilet roll holders with shelf or stainless steel flap, towel ring, soap dispenser with glass bottle, tumbler and WC brush holders, double coat hook, 600 mm shelves with stainless steel hangers, and a 630 x 445 mm rectangular swivel mirror.",
        productTypes: [
          "Paper holders",
          "Towel rings",
          "Soap dispensers",
          "Tumbler and brush holders",
          "Coat hooks",
          "Shelves",
          "Mirrors",
        ],
        skuSamples: ["AKP-35757P", "AKP-35753PS", "AKP-35795"],
      },
      {
        name: "Queen's Accessories",
        slug: "queens-accessories",
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
        skuSamples: ["AQN-7755", "AHS-1501", "AHS-1565"],
      },
      {
        name: "Rendezvous Crystal Collection",
        slug: "rendezvous-crystal",
        blurb:
          "Nine crystal-detailed pieces matching the Rendezvous tap range: a 600 mm towel rail and 450 mm towel shelf, a 550 mm glass shelf, towel ring, tumbler holder, soap dish, toilet paper holder, and double coat and robe hooks.",
        productTypes: [
          "Towel rails and shelves",
          "Glass shelves",
          "Towel rings",
          "Tumbler holders",
          "Soap dishes",
          "Paper holders",
          "Hooks",
        ],
        skuSamples: ["ACT-8811", "ACT-8871", "ACT-8821"],
      },
      {
        name: "Combo Pack",
        slug: "combo-pack",
        blurb:
          "A six-piece chrome set sold under one SKU: round towel ring, soap dish holder, glass bottle soap dispenser, paper holder with stainless steel lid, double robe hook and towel rail - the one-line fit-out for volume residential projects.",
        productTypes: ["Accessory combo packs"],
        skuSamples: ["ACN-6PCCOP1", "ACN-CHR-1121BN", "ACN-CHR-1153S"],
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
      {
        q: "Do you sell single taps or replacement parts to homeowners?",
        a: "No - we supply bulk and project quantities only, to contractors, developers, fit-out companies and trade buyers. We do not serve retail walk-ins, single-tap orders, or repair and installation calls.",
      },
    ],
  },
  {
    slug: "wash-basins",
    label: "Wash Basins",
    query: "jaquar wash basin UAE",
    intro:
      "Jaquar wash basins run every installation type a washroom drawing can call for - table top sinks and thin-rim vessels, counter top and under counter bowls, wall hung basins with pedestals, semi recessed and corner formats - drawn from ranges like Aria, Fonte, Solo and the JDR designer line, in White, White Matt and Black Matt ceramic. Global Classic supplies wash basins and washroom equipment wholesale from Sharjah - project and bulk quantities only, never single pieces.",
    collections: [
      {
        name: "Table Top Basins",
        slug: "table-top",
        blurb:
          "The largest basin family in the catalogue - 52 table top and thin rim sinks that sit ON the counter, from 380 x 380 mm squares to 800 x 500 mm slabs, in square, rectangular, oval, round and triangular shapes. Ranges: Laguna, Aria, Fonte, Solo, Florentine, Continental, Lyric, Queen's Prime, Ornamix Prime, D'Arc and the thin-rim JDR designer line, with White Matt and Black Matt options.",
        productTypes: [
          "Table top basins, square and rectangular",
          "Table top basins, round and oval",
          "Thin rim designer basins (JDR)",
          "Table top basins with three tap hole",
          "Counter top vessel basins",
        ],
        skuSamples: ["LAS-WHT-91901", "JDS-BLM-25907N", "ARS-WHT-39901", "FNS-WHT-40931"],
      },
      {
        name: "Counter Top Basins",
        slug: "counter-top",
        blurb:
          "Counter top bowls that read as sculpture on the vanity - including the D'Arc 615 x 415 mm counter top basin and the bold cylindrical Fusion at 545 x 545 x 180 mm. The format for reception washrooms where the sink is on show.",
        productTypes: ["Counter top basins", "Cylindrical vessel basins"],
        skuSamples: ["DRS-WHT-37601", "FSS-WHT-29601", "SLS-WHT-6601"],
      },
      {
        name: "Under Counter Basins",
        slug: "under-counter",
        blurb:
          "Under counter sinks cemented beneath the stone - the clean-deck detail hotel vanities specify so the counter wipes straight into the bowl. Drawn from Fonte, Florentine, Continental, Solo and Queen's Prime.",
        productTypes: ["Under counter basins, oval", "Under counter basins, rectangular"],
        skuSamples: ["FNS-WHT-40801", "FLS-WHT-5701", "CNS-WHT-801"],
      },
      {
        name: "Wall Hung Basins",
        slug: "wall-hung-basins",
        blurb:
          "Basins that mount to the wall and free the floor - 21 formats from compact cloakroom sinks to the 650 x 565 mm accessible basin, several with integrated or matching semi pedestals. The specification for washrooms cleaned by machine.",
        productTypes: [
          "Wall hung basins",
          "Wall hung basins with integrated shelf",
          "Accessible wall hung basins",
        ],
        skuSamples: ["ARS-WHT-39803", "SLS-WHT-6801", "DIS-WHT-93801"],
      },
      {
        name: "Pedestals",
        slug: "pedestals",
        blurb:
          "Full and half pedestals matched to the wall hung basin families - the classic full-height column or the half pedestal that skirts the trap. 19 pieces across Aria, Fonte, Solo, Florentine, Continental, Lyric and Queen's Prime.",
        productTypes: ["Full pedestals", "Half pedestals"],
        skuSamples: ["ARS-WHT-39155", "FNS-WHT-40153", "CNS-WHT-153"],
      },
      {
        name: "Semi Recessed & Corner Basins",
        slug: "semi-recessed-corner",
        blurb:
          "The space-savers: semi recessed sinks that sink halfway into a slim counter, and wall hung corner basins for the tightest cloakrooms - from the JDR designer range.",
        productTypes: ["Semi recessed basins", "Wall hung corner basins"],
        skuSamples: ["JDS-WHT-25503", "JDS-WHT-25505"],
      },
      {
        name: "Washroom Equipment",
        slug: "washroom-equipment",
        blurb:
          "The commercial basin-area line: touch-free infrared hand dryers led by the 1850 W Nuovo dualflow with DC brushless motor and double HEPA filter (Flash and Bolt at 1150 W), push button and automatic 0.8 L soap dispensers including a 9V transformer variant, an AISI 304 stainless steel paper towel dispenser holding 400-600 C/Z fold towels, and grab bars in white, black matt and satin.",
        productTypes: [
          "Hand dryers",
          "Soap dispensers",
          "Paper towel dispensers",
          "Grab bars",
        ],
        skuSamples: ["HDR-SLV-AK2030", "SDR-WHT-DJ0010FN", "PTD-SAP-DT0106CSN", "WAC-BLM-BG0800N"],
      },
    ],
    finishes: CERAMIC_FINISHES,
    claims: [
      {
        title: "Anti-Germ glazing on every bowl",
        body: "Fluoro-polymer in the glaze forms a hydrophobic shield against bacteria build-up - the hygiene spec hotels and clinics write into the BOQ, on every basin type.",
      },
      {
        title: "Every installation type, one brand",
        body: "Table top, counter top, under counter, wall hung, pedestal, semi recessed and corner - the whole washroom drawing sources from one catalogue, in matching design families.",
      },
      {
        title: "Load tested to 100 kg",
        body: "Jaquar basins are load tested to 100 kg - specified with confidence in public and commercial washrooms, with two-person handling recommended at install.",
      },
      {
        title: "Beyond the ceramic",
        body: "The basin area finishes with commercial equipment - HEPA-filtered hand dryers, sensor soap dispensers and AISI 304 towel dispensers - supplied on the same wholesale BOQ.",
      },
    ],
    specs: [
      ["Installation types", "Table top - counter top - under counter - wall hung - pedestal - semi recessed - corner"],
      ["Sizes", "380 x 380 mm cloakroom sinks to 800 x 500 mm slabs"],
      ["Ceramic finishes", "White, White Matt, Black Matt (range-dependent)"],
      ["Load test", "100 kg per basin"],
      ["Warranty", "10 yr ceramic body per the printed matrix"],
      ["Equipment", "Hand dryers 1150-1850 W - dispensers 0.8 L - AISI 304 steel"],
    ],
    faqs: [
      {
        q: "What is the difference between table top, counter top and under counter wash basins?",
        a: "Table top and counter top sinks sit on or over the vanity surface as visible bowls; under counter basins are cemented beneath the stone so the counter edge wipes straight into the bowl. Wall hung basins skip the counter entirely and mount to the wall, with or without a pedestal skirting the trap.",
      },
      {
        q: "Do you sell single wash basins to homeowners?",
        a: "No - Global Classic supplies wholesale and project quantities only: contractors, developers, fit-out companies and trading buyers. We do not serve retail walk-ins, single-piece orders or installation and repair work. Send a BOQ for AED trade pricing.",
      },
      {
        q: "Which Jaquar basin ranges are available in the UAE?",
        a: "The 2025-2026 catalogue ranges we supply include Laguna, Aria, Fonte, Solo, Florentine, Continental, Lyric, Queen's Prime, Ornamix Prime, D'Arc, Fusion and the JDR designer line - every basin on this page carries its catalogue SKU for direct BOQ quoting.",
      },
      {
        q: "Are matching taps and accessories available for these sinks?",
        a: "Yes - the same design families run across the faucet ranges and chrome accessory sets, so a washroom specifies basin, mixer and hardware as one language. See the Faucets category for the matching ranges.",
      },
    ],
  },
  {
    slug: "water-closets",
    label: "Water Closets",
    query: "jaquar water closet UAE",
    intro:
      "Jaquar water closets cover the full toilet specification: rimless wall hung WCs on 400 kg frames, floor mounted single piece and coupled commodes, the Bidspa electronic range and tankless sensor WCs, bidets, urinals and accessible formats - plus the complete flushing programme from i-Flush in-pipeline mechanisms to designer flush plates. Global Classic supplies WCs, toilets and flushing systems wholesale from Sharjah - bulk and project quantities only.",
    collections: [
      {
        name: "Wall Hung WCs",
        slug: "wall-hung-wcs",
        blurb:
          "Rimless wall hung toilets in blind installation and standard formats - 26 pieces across Kubix Prime, Laguna, Aria, Solo, Florentine, Continental, Lyric, Queen's Prime, D'Arc and Fusion, several in White Matt and Black Matt. Paired with in-wall cistern frames rated to 400 kg, they clear the floor for machine cleaning - the hotel and office standard.",
        productTypes: [
          "Rimless blind installation wall hung WCs",
          "Wall hung WCs with UF soft close slim seats",
          "Wall hung WCs with in-built jet",
        ],
        skuSamples: ["KUS-WHT-35953BIUFSMPM", "DRS-WHT-37953BIUFSM", "SLS-BLM-6953BIUFSM"],
      },
      {
        name: "Floor Mounted WCs",
        slug: "floor-mounted-wcs",
        blurb:
          "The 50-piece floor standing family: rimless single piece WCs, coupled bowls with dual flush cistern fittings, back to wall formats and bowls with cisterns - across S110 to S300 and P180 trap distances, with UF or PP soft close seats. Single side flush and sensor-and-manual variants included.",
        productTypes: [
          "Single piece WCs",
          "Coupled WC bowls with cistern fittings",
          "Back to wall WCs",
          "Bowls with cistern",
        ],
        skuSamples: ["SLS-WHT-6851S220PP", "CNS-WHT-853S300SPPSM", "LYS-WHT-38851S300UFSMN"],
      },
      {
        name: "Smart & Sensor WCs",
        slug: "smart-wcs",
        blurb:
          "The electronic tier: Bidspa automatic rimless WCs in floor mounted, back to wall, single piece and wall hung formats, plus Aria and Ornamix Prime tankless WCs with sensor operated flushing in battery and electric versions - 16 pieces of the specification that separates a five-star washroom drawing.",
        productTypes: [
          "Bidspa automatic rimless WCs",
          "Tankless wall hung WCs with sensor flush",
          "Tankless single piece WCs, sensor and manual",
        ],
        skuSamples: ["ITS-WHT-89853S300PPPM", "ARS-WHT-39961NBIUFSMTL", "ONS-WHT-10851S300UFSMTL"],
      },
      {
        name: "Bidets",
        slug: "bidets",
        blurb:
          "Floor mounted, wall hung and blind installation bidets matched to the WC families - 14 pieces across Laguna, Aria, Solo, Continental, Lyric, Queen's Prime and Ornamix Prime.",
        productTypes: ["Floor mounted bidets", "Wall hung bidets", "Blind installation bidets"],
        skuSamples: ["LAS-WHT-91153", "ARS-WHT-39153", "QPS-WHT-7151PM"],
      },
      {
        name: "Urinals",
        slug: "urinals",
        blurb:
          "Commercial urinals from 355 x 340 x 535 mm to 480 x 300 x 740 mm - back inlet models, a spreader hole variant and a without-sensor unit, supplied with fixing accessories. Pairs with Pressmatic metered urinal valves at 2.0 and 3.85 litres per flush from the faucet line.",
        productTypes: ["Back inlet urinals", "Spreader hole urinals", "Urinal partitions"],
        skuSamples: ["URS-WHT-13253N", "URS-WHT-13255", "URS-WHT-13261H"],
      },
      {
        name: "Accessible WCs & Basins",
        slug: "accessible",
        blurb:
          "The disabled-friendly set for accessible washrooms: a 350 x 750 x 340 mm wall hung WC, rimless back to wall and coupled formats in P180 trap, and the matching 650 x 565 mm wall hung basin - specified with grab bars from the washroom equipment line.",
        productTypes: [
          "Accessible wall hung WCs",
          "Accessible back to wall WCs",
          "Accessible coupled WCs",
          "Accessible wall hung basins",
        ],
        skuSamples: ["DIS-WHT-93951UF", "DIS-WHT-93955P180UF", "DIS-WHT-93801"],
      },
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
    finishes: CERAMIC_FINISHES,
    claims: [
      {
        title: "Rimless + Anti-Germ, as standard",
        body: "Rimless bowls with no side windows and fluoro-polymer Anti-Germ glazing with glazed traps - cleaner lines, cleaner maintenance, proven by 100-ball and ink tests, silent flushing.",
      },
      {
        title: "Frames engineered for wall hung WCs",
        body: "Floor standing frames rated up to 400 kg, legs adjustable 0-200 mm, inlet and outlet fixed at 135 mm centres - and no chiselling of the wall required.",
      },
      {
        title: "Water discipline built in",
        body: "Dual flush at 3/6 litres, adjustable to 2/4 litres on site; i-Flush works from 0.8 bar with no refill wait - the specification UAE green-building briefs ask for, in print.",
      },
      {
        title: "Warranted in tiers, honestly",
        body: "Ceramic bodies carry 10 years, flush valves 10, concealed cistern bodies and mechanisms 7, sensor systems 5, UF seats 5 - per Jaquar's printed warranty table, never a blanket claim.",
      },
    ],
    specs: [
      ["WC formats", "Wall hung - single piece - coupled - back to wall - smart/sensor"],
      ["Traps", "P180 - S110 / S220 / S250 / S300"],
      ["Seats", "UF soft close slim (5 yr) - PP soft close (2 yr)"],
      ["Dual flush", "3/6 L adjustable to 2/4 L"],
      ["i-Flush", "Works from 0.8 bar - 20 / 32 mm bodies - 1.2 l/sec"],
      ["Frame", "400 kg rated - 0-200 mm legs - 135 mm centres"],
      ["Warranty", "10 yr ceramic and flush valve - 7 yr concealed cistern - 5 yr sensor"],
    ],
    faqs: [
      {
        q: "Wall hung or floor mounted WC - what should a project specify?",
        a: "Wall hung WCs on in-wall frames (rated 400 kg) clear the floor for machine cleaning and read premium - the hotel standard. Floor mounted single piece and coupled WCs install without in-wall work and suit refurbishments and volume housing. Both come rimless with Anti-Germ glazing across the ranges we stock.",
      },
      {
        q: "What is the difference between i-Flush, a flush valve and a concealed cistern?",
        a: "A concealed cistern stores water in-wall and needs refill time; a flush valve draws from the supply line at full bore; i-Flush installs directly in the pipeline with dual flush actuation, works from 0.8 bar, and flushes repeatedly with no refill wait - the compact answer where wall depth or refill time is the constraint.",
      },
      {
        q: "Do you supply single toilets or do repairs?",
        a: "No - Global Classic is a wholesale trading company. We supply bulk and project quantities to contractors, developers and fit-out companies; we do not serve retail buyers, single-piece orders, or installation and repair calls. Send the BOQ for AED trade pricing.",
      },
      {
        q: "What trap distance do Jaquar WCs use?",
        a: "The catalogue prints P180 (P-trap, 180 mm from floor) and S-traps at 110, 220, 250 and 300 mm from the wall, per model - the trap code sits inside every SKU on this page, so the BOQ can be matched to the drainage drawing before ordering.",
      },
    ],
  },
  {
    slug: "showers",
    label: "Showers & Enclosures",
    query: "jaquar showers UAE",
    intro:
      "Everything in showers, one category: overhead rain showers with registered designs, hand and body showers, exposed and concealed shower systems, full-height panels - and the glass that contains them, from the Ritz Collection to frameless walk-ins in 6, 8 and 10 mm tempered glass, with matching shower trays. Rubit anti-limescale nozzles, Booster technology for low-pressure risers, hinges tested to half a million cycles. Global Classic supplies the lot wholesale from Sharjah - project and bulk quantities only.",
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
      /* ---- The glass: enclosures and trays (uae.jaquar.com source) ---- */
      {
        name: "Ritz Collection",
        slug: "ritz-collection",
        blurb:
          "The signature enclosure series, built left- and right-handed in sizes from 1201 to 2800 mm.",
        productTypes: ["Ritz R830G Left Version", "Ritz R830G Right Version"],
        skuSamples: ["JSE-CHR-R830G1216L", "JSE-CHR-R830G1216R"],
      },
      {
        name: "Frameless Enclosures",
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
        name: "Framed Enclosures",
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
        name: "Shower Trays",
        slug: "shower-tray",
        blurb:
          "The matching low-profile trays that finish the enclosure install.",
        productTypes: ["Shower Tray"],
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
      {
        title: "Glass tempered in-house",
        body: "Enclosure glass in 6, 8 and 10 mm, tempered on Jaquar's own fully automatic unit - 4 to 5 times stronger than float glass, proven by fragmentation, zebra, ball-drop and free-fall tests, with anti-limescale Easy Clean treatment.",
      },
      {
        title: "Hardware that holds",
        body: "Brass hinges tested for 500,000 cycles and rated to 25 kg per hinge, SS 304 stabilisers, rise-and-fall doors that lift 6-8 mm while opening and settle back to seal - with a 5-year hardware warranty.",
      },
    ],
    specs: [
      ["Shower warranty", "Up to 10 years - enclosure hardware 5 years"],
      ["Flow patterns", "Up to 5 - Normal, Massage, Mist, Cascade, Soft"],
      ["Nozzles", "Rubit elastic silicon, anti-limescale"],
      ["Pressure", "Booster technology for low-pressure lines"],
      ["Enclosure glass", "Tempered 6 / 8 / 10 mm - 4-5x float strength"],
      ["Enclosure sizes", "600 mm up to 4200 mm bands - Ritz 1201-2800 mm L/R"],
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
      {
        q: "What glass thickness should a UAE villa enclosure use?",
        a: "Jaquar tempers 6, 8 and 10 mm; frameless walk-ins typically specify 8 or 10 mm for stiffness. All glass is 4-5 times stronger than float and tested to EN 14450, with sizes from 600 mm bands up to 4200 mm.",
      },
      {
        q: "Do you supply single showers or do repair work?",
        a: "No - Global Classic supplies wholesale and project quantities only, to contractors, developers and fit-out companies. We do not serve retail buyers, single-piece orders, or shower fixing and hose-replacement calls. Send the BOQ for AED trade pricing.",
      },
    ],
  },
  {
    slug: "wellness",
    label: "Wellness",
    query: "jaquar whirlpool UAE",
    intro:
      "Jaquar wellness is the bathing programme in full: freestanding and built-in bathtubs on 12 mm three-layer acrylic, thirteen whirlpool models with per-model pump ratings from 1.0 to 1.4 HP, fourteen spas from two-seaters to the 5.9-metre Hydrozone swim spa, Hemlock wood saunas and steam generators laddering 4 to 24 kW. Global Classic supplies and coordinates the range wholesale from Sharjah for hotels, villas, developers and fitness projects - project quantities only.",
    collections: [
      {
        name: "Freestanding Bathtubs",
        slug: "freestanding-bathtubs",
        blurb:
          "Eight sculptural tubs from 1600 x 750 mm to 1800 x 800 mm, with built-in overflows and pop-up wastes; the Queens tub is offered with chrome or gold overflow, waste and legs. Bodies carry the printed 12 mm three-layer acrylic build: special transparent acrylic top layer, special polymer layer and polyurethane layer.",
        productTypes: ["Freestanding bathtubs"],
        skuSamples: ["JBT-WHT-FSBTLG6001", "JBT-WHT-FSBTMAD1778", "JBT-WHT-FSBTPB278X"],
      },
      {
        name: "Built-In Bathtubs",
        slug: "built-in-bathtubs",
        blurb:
          "Thirty drop-in configurations across the Arc, Kubix, Kubix Prime, Opal Prime, D'Arc, Fonte, Fonte R, Alive, Vignette Prime, Fusion and Laguna families, in sizes up to 1900 x 900 x 470 mm. Framed versions carry powder coated MS frames with matched front and side panels, drain pipes and Base Europa installation kits.",
        productTypes: [
          "Built-in bathtubs",
          "Framed bathtubs",
          "Front panels",
          "Side panels",
        ],
        skuSamples: ["JBT-WHT-KUBIXP180FX", "JBT-WHT-DARC180FX", "JBT-WHT-LAGUNA180FX"],
      },
      {
        name: "Bathtub Accessories",
        slug: "bathtub-accessories",
        blurb:
          "Completion hardware for the bathtub programme: drain pipes with overflow in 80 cm and 100 cm lengths plus a 70-80 mm overflow system, with-filler variants, the Base Europa installation kit, and Comfort and Sophi headrests in black.",
        productTypes: ["Drain pipes", "Installation kits", "Headrests"],
        skuSamples: ["JWA-CHR-132201", "JWA-CHR-DRNPIPE100", "JWA-BLK-HRCP750GAC06"],
      },
      {
        name: "Arc",
        slug: "arc",
        blurb:
          "The 1900 x 900 mm whirlpool flagship - 8 slim water jets, 4 back jets, 12 air jets, chromotherapy, on a 1.4 HP pump.",
        productTypes: ["Arc (Combi System)", "Arc (Water System)"],
        skuSamples: ["JWP-WHT-ARC190CX", "JWP-WHT-ARC190WX"],
      },
      {
        name: "Kubix Prime",
        slug: "kubix-prime",
        blurb: "The cubist whirlpool at 1800 x 1100 mm, 16 air jets, in combi and water systems.",
        productTypes: ["Kubix Prime (Combi System)", "Kubix Prime (Water System)"],
        skuSamples: ["JWP-WHT-KUBIXPM180CX", "JWP-WHT-KUBIXPM180WX"],
      },
      {
        name: "Opal Prime",
        slug: "opal-prime",
        blurb: "Soft-radius 1800 x 800 mm whirlpools in the prime specification.",
        productTypes: ["Opal Prime (Combi System)", "Opal Prime (Water System)"],
        skuSamples: ["JWP-WHT-OPALPM180CX"],
      },
      {
        name: "Vignette Prime",
        slug: "vignette-prime",
        blurb: "The sculpted 1900 x 900 mm whirlpool matching Vignette Prime ceramics and faucets.",
        productTypes: ["Vignette Prime (Combi System)", "Vignette Prime (Water System)"],
        skuSamples: ["JWP-WHT-VGNT190CX"],
      },
      {
        name: "D'arc",
        slug: "darc",
        blurb: "The asymmetric-curve whirlpool of the family, at 1800 x 1100 mm.",
        productTypes: ["D'arc (Combi System)", "D'arc (Water System)"],
        skuSamples: ["JWP-WHT-DARC180CX"],
      },
      {
        name: "Kubix",
        slug: "kubix",
        blurb: "The original cubist whirlpool at 1800 x 800 mm, combi and water systems.",
        productTypes: ["Kubix (Combi System)", "Kubix (Water System)"],
      },
      {
        name: "Alive",
        slug: "alive",
        blurb:
          "A single-size whirlpool at 1800 x 800 x 470 mm in combi or water builds, with matching front and side panels - 8 water jets, 12 air jets and 4 back jets on a 1.4 HP pump with 0.90 HP blower, chromotherapy and SS202 frame.",
        productTypes: ["Combi systems", "Water systems", "Panels"],
        skuSamples: ["JWP-WHT-ALIVE180CX", "JWP-WHT-ALIVE180WX"],
      },
      {
        name: "Fonte",
        slug: "fonte",
        blurb:
          "The widest whirlpool run: 1500, 1600 and 1700 x 750 x 420 mm plus 1800 x 800 x 450 mm, in water or combi builds with project variants. Pumps are printed per size: 1.0 HP on the 1800 x 800 and 1 HP on the 1500 x 750 and 1700 x 750, with a 0.90 HP air blower throughout.",
        productTypes: ["Combi systems", "Water systems", "Project systems", "Panels"],
        skuSamples: ["JWP-WHT-FONTE180CX", "JWP-WHT-FONTE150CX"],
      },
      {
        name: "Fonte-R",
        slug: "fonte-r",
        blurb:
          "A square-format 1500 x 1500 x 470 mm whirlpool in combi and water builds - 8 water jets and 16 air jets on a 1.4 HP pump with chromotherapy and digital control.",
        productTypes: ["Combi systems", "Water systems"],
        skuSamples: ["JWP-WHT-POINT150CX", "JWP-WHT-POINT150WX"],
      },
      {
        name: "Fusion",
        slug: "fusion",
        blurb:
          "A corner-plan 1400 x 1400 x 450 mm whirlpool in water or combi builds with a matching angular panel - 6 water jets, 12 air jets and 4 back jets on a 1.0 HP pump.",
        productTypes: ["Combi systems", "Water systems", "Angular panels"],
        skuSamples: ["JWP-WHT-GMI140CX", "JWP-WHT-GMI140WX"],
      },
      {
        name: "Laguna",
        slug: "laguna",
        blurb:
          "A slim 1800 x 700 x 450 mm whirlpool in combi or water builds, with front and side panels - 6 water jets, 12 air jets and 4 back jets on a 1.4 HP pump, chromotherapy and digital control.",
        productTypes: ["Combi systems", "Water systems", "Panels"],
        skuSamples: ["JWP-WHT-LAGUNA170CX", "JWP-WHT-LAGUNA170WX"],
      },
      {
        name: "Spas",
        slug: "spas",
        blurb:
          "Fourteen spas from two-seat units at 1650 x 1650 x 740 mm to the five-seat Hydrozone swim spa at 5900 x 2300 x 1300 mm, with jet counts running to 93 on the nine-seat Palladium. Controllers span SV2, SV3, SV4, Gecko and Balboa; variable output heaters run from 1.3 kW to 6 kW, with electrical requirements from 13 amp up to a maximum 60 amps.",
        productTypes: ["Swim spas", "Seated spas", "Spa hard covers"],
        skuSamples: ["WSP-WHT-SPA5S590VX", "WSP-SLV-SPA8S3520VX", "JSP-WHT-SPABREVA5S"],
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
        skuSamples: ["JSG-WHT-NMID40", "JSG-WHT-NMID240", "JSG-BLK-CPROUND"],
      },
    ],
    finishes: ["White PMMA acrylic", "Silver shells", "Hemlock wood"],
    claims: [
      {
        title: "Pumps rated per model",
        body: "The Arc combi runs a 1.4 HP water pump through 8 slim jets and 4 back jets with a 0.90 HP blower; the compact Fonte and Fusion formats run 1.0 HP pumps - every rating is per-model on the printed 13-model specification sheet below, never a blanket figure.",
      },
      {
        title: "Three layers, 12 mm",
        body: "Bathtub and whirlpool shells carry the printed build: a special transparent acrylic top layer over a special polymer layer over polyurethane, on PU Green reinforcement and SS202 steel frames.",
      },
      {
        title: "Hygiene and safety engineered in",
        body: "Antibac surfaces, bow-shape no-bacteria pipes in food-grade PVC, self drainage, level sensors, a safety vacuum breaker that cuts the motor on suction blockage, and the European 3-tier electrical test on every tub.",
      },
      {
        title: "From a tub to a swim lane",
        body: "One catalogue runs from a 1400 mm corner whirlpool to the 5.9-metre Hydrozone swim spa, Hemlock saunas and 24 kW steam rooms - with Balboa, Gecko and SV controllers per model and the full p334 spa sheet published here.",
      },
    ],
    specs: [
      ["Bathtubs", "Freestanding 1600-1800 mm - built-in to 1900 x 900 mm - 12 mm 3-layer acrylic"],
      ["Whirlpools", "13 models, 1400 x 1400 to 1900 x 900 mm - pumps 1.0-1.4 HP per model"],
      ["Spas", "14 models - 1650 mm two-seaters to 5900 mm swim spa - 13-60 amps"],
      ["Saunas", "Hemlock wood - stove and infrared (1750 / 2490 W carbon)"],
      ["Steam", "4 / 6 / 9 / 12 / 15 / 18 / 22.5 / 24 kW generators"],
      ["Warranty", "5 yr body & jets - 2 yr electrical and spa shell (printed matrix)"],
    ],
    faqs: [
      {
        q: "What is the difference between a bathtub, a whirlpool and a spa?",
        a: "A bathtub is the still-water shell - freestanding or built-in. A whirlpool adds pumped water and air jets to a one-or-two person tub (Jaquar's run 1400-1900 mm with 1.0-1.4 HP pumps per model). A spa is the larger multi-seat format - 2 to 9 seats with Balboa/Gecko controllers - up to the swim spa with a current to swim against.",
      },
      {
        q: "What is the difference between a combi and water system whirlpool?",
        a: "Water systems run hydro-massage jets only; combi systems add an air blower - the Arc combi pairs a 1.4 HP water pump with a 0.90 HP air blower. Both come in the same tub designs.",
      },
      {
        q: "What electrical supply does a Jaquar spa need?",
        a: "It is printed per model: from 13 amps on the two-seat Nuovo up to a maximum 60 amps on the Hydrozone swim spa, with variable output heaters from 1.3 kW to 6 kW. The full p334 features sheet travels with our quotations.",
      },
      {
        q: "Do you supply wellness products to homeowners?",
        a: "No - wholesale and project supply only: hotels, developers, contractors and fit-out companies, coordinated to site from Sharjah. We do not serve retail buyers or installation and service calls. Send the project BOQ for AED pricing.",
      },
    ],
  },
  {
    slug: "water-heaters",
    label: "Water Heaters",
    query: "jaquar water heater UAE",
    intro:
      "Jaquar water heaters ladder from 1-litre instant units to 500-litre floor-mounted Verna tanks - instant electric, Elena and Erica storage, Versa 30-100 litre verticals and horizontals, in gas, electric and instant families. Tank warranties run up to 7 years on storage models per the printed matrix. Global Classic supplies the ladder wholesale from Sharjah across the UAE - bulk and project quantities only.",
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
        skuSamples: ["INS-WHT-3KW01", "ELM-WHT-H015", "VME-WHT-V100", "VRN-GRY-500"],
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
        q: "Do you sell single water heaters or do installations?",
        a: "No - wholesale and project quantities only, supplied to contractors, developers and trading buyers from Sharjah stock. We do not serve retail buyers or installation calls. Send the BOQ with fixture counts for AED pricing.",
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
