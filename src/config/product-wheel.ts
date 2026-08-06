/**
 * The product wheel on the home page. Images are placeholders (stills pulled
 * from the film and hero) until final photography arrives — swap the files in
 * /public/products and keep the names.
 *
 * `accent` retints the whole section and the CTA's specular line when that
 * product is active, so each line owns a colour.
 */
export type WheelProduct = {
  id: string;
  label: string;
  image: string;
  /** Descriptive alt for image SEO — describe the stone/product, not "image of room". */
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
    href: "/products#naturally-engineered-marble",
  },
  {
    id: "quartz",
    label: "Quartz",
    image: "/products/white-quartz-island-morning-espresso-uae.webp",
    alt: "White engineered quartz island with fine grey veining, morning espresso and a green glass carafe in a minimal kitchen",
    accent: "#f7f8f5",
    href: "/products#quartz",
  },
  {
    id: "terrazzo",
    label: "Terrazzo",
    image: "/products/white-terrazzo-flooring-green-chips-daybed-dubai.webp",
    alt: "White-base terrazzo flooring with grey and green marble chips beside a linen daybed in bright daylight",
    accent: "#6f8f78",
    href: "/products#terrazzo",
  },
  {
    id: "sanitaryware",
    label: "Sanitary Ware",
    image: "/products/white-twin-basins-limestone-vanity-spa-uae.webp",
    alt: "Sculptural white ceramic twin basins on a pale limestone vanity with a eucalyptus sprig in a pine-green bud vase",
    accent: "#d2d4c8",
    href: "/products#sanitaryware",
  },
  {
    id: "bathware",
    label: "Bathroom Ware",
    image: "/products/brushed-steel-tap-white-marble-basin-uae.webp",
    alt: "Brushed steel bathroom mixer tap over a white marble basin with a folded sage linen towel",
    accent: "#6f8f78",
    href: "/products#taps",
  },
  {
    id: "showers",
    label: "Showers",
    image: "/products/jaquar-rain-shower-white-stone-wet-room-uae.webp",
    alt: "Jaquar rain shower running in a bright white stone wet room with frameless glass and a fern on the ledge",
    accent: "#f7f8f5",
    href: "/products#showers",
  },
  {
    id: "sealers",
    label: "Sealers",
    image: "/products/fila-mp90-sealer-white-marble-workshop-uae.webp",
    alt: "FILA MP90 Eco Xtreme penetrating sealer beside a gloved hand sealing a white marble slab in a bright workshop",
    accent: "#355e4d",
    href: "/products#sealers-cleaners",
  },
  {
    id: "cleaners",
    label: "Cleaners",
    image: "/products/fila-cleaner-pro-white-marble-counter-uae.webp",
    alt: "FILA Cleaner Pro on a white marble countertop being polished with a linen cloth in bright morning light",
    accent: "#6f8f78",
    href: "/products#sealers-cleaners",
  },
];
