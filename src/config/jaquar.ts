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
  /** Factual positioning drawn from the scrape. */
  blurb: string;
  /** Product types as printed on the range pages. */
  productTypes: string[];
  /** Sample SKUs, only where actually scraped. */
  skuSamples?: string[];
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
      },
      {
        name: "Laguna",
        slug: "laguna",
        blurb:
          "A rounded, water-smoothed profile shared across Jaquar's faucet, sanitaryware and whirlpool lines.",
        productTypes: [
          "Single Lever Basin Mixer",
          "Single Lever Bath & Shower Mixer",
          "Single Lever Bidet Mixer with Popup Waste",
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
          "Touch-free operation that saves up to 59% of water - Jaquar's own figure - for washrooms that meet green-building briefs.",
        productTypes: [
          "Sensor Basin Faucet",
          "Deck Mounted Sensor Faucet",
          "Wall Mounted Sensor Faucet",
        ],
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
      ["Warranty", "10 years"],
      ["Cartridge life", "500,000 cycles tested - up to 20 years"],
      ["Plating", "0.3µ chrome + 10µ nickel, 450+ hr salt spray"],
      ["Finishes", "10 - Chrome to Gold Bright PVD and Stainless Steel"],
      ["Water saving", "Flow regulator up to 80% - sensor taps up to 59%"],
      ["Certifications", "WRAS - KIWA - ISO - CE - SASO and more"],
    ],
    faqs: [
      {
        q: "What warranty do Jaquar faucets carry in the UAE?",
        a: "10 years, honoured in the UAE through Jaquar's service network - toll-free 800-527827 - with Global Classic supporting supply and replacement paperwork from Sharjah.",
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
      ["Warranty", "10 years"],
      ["Flush", "Dual 3L / 6L - silent flushing"],
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
      "Jaquar whirlpools are 180-190 cm hydro-massage and air-massage tubs in the Arc, Kubix Prime, Opal Prime, Vignette Prime and D'arc ranges - 1.4 HP water pumps, 0.9 HP air blowers, chromotherapy and Antibac surfaces, designed by European specialists. Supplied across the UAE by Global Classic from Sharjah.",
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
    ],
    finishes: ["White PMMA acrylic"],
    claims: [
      {
        title: "European-designed systems",
        body: "Created by specialist designers from Europe: hydro-massage water jets, air massage and chromotherapy in green, yellow, blue and red moods.",
      },
      {
        title: "1.4 HP water - 0.9 HP air",
        body: "The Arc combi runs a 1.4 HP water pump through 8 slim jets and 4 back jets, and a 0.9 HP blower through 16 air jets, with keypad control and air regulator.",
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
      ["Sizes", "180 / 190 cm ranges"],
      ["Water system", "1.4 HP pump - 8 slim jets + 4 back jets (Arc)"],
      ["Air system", "0.9 HP blower - 16 air jets (Arc)"],
      ["Shell", "Highest-grade PMMA acrylic, PU reinforced, SS frame"],
      ["Extras", "Chromotherapy - keypad control - headrests - disinfection"],
      ["Safety", "Vacuum breaker - 3-tier electrical test"],
    ],
    faqs: [
      {
        q: "What is the difference between a combi and water system whirlpool?",
        a: "Water systems run hydro-massage jets only; combi systems add an air blower - the Arc combi pairs a 1.4 HP water pump with a 0.9 HP air blower through 16 air jets. Both come in the same tub designs.",
      },
      {
        q: "Do Jaquar whirlpools fit standard UAE bathrooms?",
        a: "The ranges run 180 and 190 cm in length (the Arc at 1900 x 900 x 470 mm) - standard alcove and freestanding bathroom dimensions. CAD files and data sheets are available per model for design coordination.",
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
