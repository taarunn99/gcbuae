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
    image: "/products/quartz.jpg",
    alt: "Placeholder — final product photography pending",
    accent: "#c9a36a",
    href: "/products#quartz",
  },
  {
    id: "terrazzo",
    label: "Terrazzo",
    image: "/products/terrazzo.jpg",
    alt: "Placeholder — final product photography pending",
    accent: "#d08a4e",
    href: "/products#terrazzo",
  },
  {
    id: "sanitaryware",
    label: "Sanitary Ware",
    image: "/products/sanitaryware.jpg",
    alt: "Placeholder — final product photography pending",
    accent: "#e6dfd2",
    href: "/products#sanitaryware",
  },
  {
    id: "bathware",
    label: "Bathroom Ware",
    image: "/products/bathware.jpg",
    alt: "Placeholder — final product photography pending",
    accent: "#a8875a",
    href: "/products#taps",
  },
  {
    id: "showers",
    label: "Showers",
    image: "/products/showers.jpg",
    alt: "Placeholder — final product photography pending",
    accent: "#8fa6b0",
    href: "/products#showers",
  },
  {
    id: "sealers",
    label: "Sealers",
    image: "/products/sealers.jpg",
    alt: "Placeholder — final product photography pending",
    accent: "#4e7a63",
    href: "/products#sealers-cleaners",
  },
  {
    id: "cleaners",
    label: "Cleaners",
    image: "/products/cleaners.jpg",
    alt: "Placeholder — final product photography pending",
    accent: "#7fa284",
    href: "/products#sealers-cleaners",
  },
];
