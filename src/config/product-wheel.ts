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
  accent: string;
  href: string;
};

export const wheelProducts: WheelProduct[] = [
  {
    id: "marble",
    label: "Marble",
    image: "/products/marble.jpg",
    accent: "#cdbba4",
    href: "/products#naturally-engineered-marble",
  },
  {
    id: "quartz",
    label: "Quartz",
    image: "/products/quartz.jpg",
    accent: "#c9a36a",
    href: "/products#quartz",
  },
  {
    id: "terrazzo",
    label: "Terrazzo",
    image: "/products/terrazzo.jpg",
    accent: "#d08a4e",
    href: "/products#terrazzo",
  },
  {
    id: "sanitaryware",
    label: "Sanitary Ware",
    image: "/products/sanitaryware.jpg",
    accent: "#e6dfd2",
    href: "/products#sanitaryware",
  },
  {
    id: "bathware",
    label: "Bathroom Ware",
    image: "/products/bathware.jpg",
    accent: "#a8875a",
    href: "/products#taps",
  },
  {
    id: "showers",
    label: "Showers",
    image: "/products/showers.jpg",
    accent: "#8fa6b0",
    href: "/products#showers",
  },
  {
    id: "sealers",
    label: "Sealers",
    image: "/products/sealers.jpg",
    accent: "#4e7a63",
    href: "/products#sealers-cleaners",
  },
  {
    id: "cleaners",
    label: "Cleaners",
    image: "/products/cleaners.jpg",
    accent: "#7fa284",
    href: "/products#sealers-cleaners",
  },
];
