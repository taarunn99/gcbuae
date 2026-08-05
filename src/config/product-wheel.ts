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
    image:
      "/products/naturally-engineered-marble-flooring-living-room-dubai.webp",
    alt: "Polished naturally engineered marble flooring in a double-height Dubai living room, cream boucle furniture and walnut stair",
    accent: "#cdbba4",
    href: "/products#naturally-engineered-marble",
  },
  {
    id: "quartz",
    label: "Quartz",
    image: "/products/quartz-countertop-morning-espresso-kitchen-uae.webp",
    alt: "Veined engineered quartz kitchen countertop in morning sunlight with an espresso cup, fine crystalline veining detail",
    accent: "#c9a36a",
    href: "/products#quartz",
  },
  {
    id: "terrazzo",
    label: "Terrazzo",
    image:
      "/products/terrazzo-flooring-breakfast-nook-morning-light-dubai.webp",
    alt: "Cream terrazzo flooring with multicoloured marble chips beneath a linen-draped breakfast table in soft morning light",
    accent: "#d08a4e",
    href: "/products#terrazzo",
  },
  {
    id: "sanitaryware",
    label: "Sanitary Ware",
    image: "/products/luxury-sanitary-ware-twin-basins-spa-bathroom-uae.webp",
    alt: "Sculptural white ceramic twin basins on a travertine vanity in a steam-softened luxury spa bathroom",
    accent: "#e6dfd2",
    href: "/products#sanitaryware",
  },
  {
    id: "bathware",
    label: "Bathroom Ware",
    image: "/products/brass-bathroom-tap-marble-basin-golden-hour-dubai.webp",
    alt: "Brushed brass bathroom mixer tap over a veined marble basin catching golden-hour reflections",
    accent: "#a8875a",
    href: "/products#taps",
  },
  {
    id: "showers",
    label: "Showers",
    image: "/products/jaquar-rain-shower-glass-enclosure-dubai-skyline.webp",
    alt: "Jaquar rain shower running in a frameless glass enclosure against the Dubai skyline at dusk",
    accent: "#8fa6b0",
    href: "/products#showers",
  },
  {
    id: "sealers",
    label: "Sealers",
    image: "/products/marble-sealer-application-stone-care-craftsman-uae.webp",
    alt: "Craftsman's gloved hand applying penetrating stone sealer to a polished marble slab, half showing deepened gloss",
    accent: "#4e7a63",
    href: "/products#sealers-cleaners",
  },
  {
    id: "cleaners",
    label: "Cleaners",
    image: "/products/marble-cleaner-natural-stone-care-kitchen-uae.webp",
    alt: "Linen cloth polishing a veined marble countertop to a mirror shine beside a bottle of natural stone cleaner and fresh lemons",
    accent: "#7fa284",
    href: "/products#sealers-cleaners",
  },
];
