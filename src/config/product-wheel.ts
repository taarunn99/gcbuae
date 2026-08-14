/**
 * The product wheel on the home page. Images are placeholders (stills pulled
 * from the film and hero) until final photography arrives - swap the files in
 * /public/products and keep the names.
 *
 * `accent` retints the whole section and the CTA's specular line when that
 * product is active, so each line owns a colour.
 */
export type WheelProduct = {
  id: string;
  label: string;
  image: string;
  /** Descriptive alt for image SEO - describe the stone/product, not "image of room". */
  alt: string;
  accent: string;
  href: string;
};

export const wheelProducts: WheelProduct[] = [
  {
    id: "marble",
    label: "Marble",
    image: "/products/white-engineered-marble-floor-gallery-hall-uae.webp",
    alt: "Polished white engineered marble floor in a bright gallery hall with sheer curtains and a pine-green vase with olive branches",
    accent: "#d2d4c8",
    href: "/kalingastone/marble",
  },
  {
    id: "quartz",
    label: "Quartz",
    image: "/products/white-quartz-island-morning-espresso-uae.webp",
    alt: "White engineered quartz island with fine grey veining, morning espresso and a green glass carafe in a minimal kitchen",
    accent: "#f7f8f5",
    href: "/kalingastone/quartz",
  },
  {
    id: "terrazzo",
    label: "Terrazzo",
    image: "/products/white-terrazzo-flooring-green-chips-daybed-dubai.webp",
    alt: "White-base terrazzo flooring with grey and green marble chips beside a linen daybed in bright daylight",
    accent: "#6f8f78",
    href: "/kalingastone/terrazzo",
  },
  {
    id: "faucets",
    label: "Faucets & Taps",
    image: "/products/brushed-steel-tap-white-marble-basin-uae.webp",
    alt: "Brushed steel bathroom mixer tap over a white marble basin with a folded sage linen towel",
    accent: "#6f8f78",
    href: "/jaquar/faucets",
  },
  {
    id: "wash-basins",
    label: "Wash Basins",
    image: "/products/white-twin-basins-limestone-vanity-spa-uae.webp",
    alt: "Sculptural white ceramic twin basins on a pale limestone vanity with a eucalyptus sprig in a pine-green bud vase",
    accent: "#d2d4c8",
    href: "/jaquar/wash-basins",
  },
  {
    id: "water-closets",
    label: "Water Closets",
    image: "/jaquar/categories/water-closets.webp",
    alt: "Rimless white ceramic wall hung WC beside a slim chrome flush plate set into honed white marble",
    accent: "#355e4d",
    href: "/jaquar/water-closets",
  },
  {
    id: "showers",
    label: "Showers & Enclosures",
    image: "/products/jaquar-rain-shower-white-stone-wet-room-uae.webp",
    alt: "Jaquar rain shower running in a bright white stone wet room with frameless glass and a fern on the ledge",
    accent: "#f7f8f5",
    href: "/jaquar/showers",
  },
  {
    id: "wellness",
    label: "Wellness",
    image: "/jaquar/heroes/wellness/freestanding-bathtubs.webp",
    alt: "White freestanding oval bathtub in a serene marble room at dusk with a deep pine green wall and dusty olive linen",
    accent: "#d2d4c8",
    href: "/jaquar/wellness",
  },
  {
    id: "water-heaters",
    label: "Water Heaters",
    image: "/jaquar/scenes/water-heaters.webp",
    alt: "White cylindrical storage water heater floating against a flat pastel sage green studio field with a soft shadow",
    accent: "#f7f8f5",
    href: "/jaquar/water-heaters",
  },
  {
    id: "sealers-cleaners",
    label: "Sealers & Cleaners",
    image: "/products/fila-mp90-sealer-white-marble-workshop-uae.webp",
    alt: "FILA MP90 Eco Xtreme penetrating sealer beside a gloved hand sealing a white marble slab in a bright workshop",
    accent: "#355e4d",
    href: "/products#sealers-cleaners",
  },
];
