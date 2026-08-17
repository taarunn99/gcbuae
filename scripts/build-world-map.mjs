/**
 * Builds the "Global presence" world map assets.
 *
 *   node scripts/build-world-map.mjs      (or: npm run assets:world-map)
 *
 * dotted-map is a dev-only dependency: it runs HERE, never in the client
 * bundle. The raw dotted SVG is ~590KB, so it is rasterised once to a
 * static WebP (Porcelain ground, Pine dots) and the marker positions are
 * projected through dotted-map's own addPin() - grid-snapped, so every
 * marker sits exactly on a landmass dot - and written to
 * src/config/global-presence-points.json for the overlay component.
 *
 * The location list is the owner's KalingaStone global-presence list
 * (2026-08-17); cities were given where the source names them, otherwise
 * the commercial capital stands for the country.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import DottedMap from "dotted-map";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_IMAGE = join(ROOT, "public", "home", "world-map.webp");
const OUT_POINTS = join(ROOT, "src", "config", "global-presence-points.json");

/** role: "hub" = Al Sajaa/Dubai stock point, "plant" = Silvassa factory. */
const LOCATIONS = [
  // Middle East
  { label: "Dubai, UAE", lat: 25.2, lng: 55.27, role: "hub" },
  { label: "Manama, Bahrain", lat: 26.23, lng: 50.59 },
  { label: "Tel Aviv, Israel", lat: 32.09, lng: 34.78 },
  { label: "Amman, Jordan", lat: 31.95, lng: 35.93 },
  { label: "Kuwait City, Kuwait", lat: 29.38, lng: 47.99 },
  { label: "Beirut, Lebanon", lat: 33.89, lng: 35.5 },
  { label: "Muscat, Oman", lat: 23.59, lng: 58.41 },
  { label: "Ramallah, Palestine", lat: 31.9, lng: 35.2 },
  { label: "Doha, Qatar", lat: 25.29, lng: 51.53 },
  { label: "Riyadh, Saudi Arabia", lat: 24.71, lng: 46.68 },
  { label: "Istanbul, Turkey", lat: 41.01, lng: 28.98 },
  // Asia
  { label: "Silvassa, India", lat: 20.27, lng: 73.02, role: "plant" },
  { label: "Beijing, China", lat: 39.9, lng: 116.41 },
  { label: "Hong Kong", lat: 22.32, lng: 114.17 },
  { label: "Almaty, Kazakhstan", lat: 43.24, lng: 76.89 },
  { label: "Kuala Lumpur, Malaysia", lat: 3.14, lng: 101.69 },
  { label: "Male, Maldives", lat: 4.18, lng: 73.51 },
  { label: "Kathmandu, Nepal", lat: 27.72, lng: 85.32 },
  { label: "Karachi, Pakistan", lat: 24.86, lng: 67.01 },
  { label: "Singapore", lat: 1.35, lng: 103.82 },
  { label: "Colombo, Sri Lanka", lat: 6.93, lng: 79.85 },
  { label: "Negombo, Sri Lanka", lat: 7.21, lng: 79.84 },
  { label: "Weerawila, Sri Lanka", lat: 6.26, lng: 81.23 },
  { label: "Taipei, Taiwan", lat: 25.03, lng: 121.57 },
  { label: "Bangkok, Thailand", lat: 13.76, lng: 100.5 },
  // Europe
  { label: "Frankfurt, Germany", lat: 50.11, lng: 8.68 },
  { label: "Athens, Greece", lat: 37.98, lng: 23.73 },
  { label: "Dublin, Ireland", lat: 53.35, lng: -6.26 },
  { label: "Amsterdam, Netherlands", lat: 52.37, lng: 4.9 },
  { label: "Lisbon, Portugal", lat: 38.72, lng: -9.14 },
  { label: "Moscow, Russia", lat: 55.76, lng: 37.62 },
  { label: "Zurich, Switzerland", lat: 47.38, lng: 8.54 },
  { label: "London, United Kingdom", lat: 51.51, lng: -0.13 },
  // Africa
  { label: "Libreville, Gabon", lat: 0.42, lng: 9.47 },
  { label: "Accra, Ghana", lat: 5.6, lng: -0.19 },
  { label: "Mombasa, Kenya", lat: -4.04, lng: 39.66 },
  { label: "Kisumu, Kenya", lat: -0.09, lng: 34.77 },
  { label: "Port Louis, Mauritius", lat: -20.16, lng: 57.5 },
  { label: "Casablanca, Morocco", lat: 33.57, lng: -7.59 },
  { label: "Lagos, Nigeria", lat: 6.52, lng: 3.38 },
  { label: "Victoria, Seychelles", lat: -4.62, lng: 55.45 },
  { label: "Johannesburg, South Africa", lat: -26.2, lng: 28.05 },
  { label: "Dar es Salaam, Tanzania", lat: -6.79, lng: 39.21 },
  { label: "Kampala, Uganda", lat: 0.35, lng: 32.58 },
  // North & Central America
  { label: "Toronto, Canada", lat: 43.65, lng: -79.38 },
  { label: "Santo Domingo, Dominican Republic", lat: 18.48, lng: -69.93 },
  { label: "Tegucigalpa, Honduras", lat: 14.07, lng: -87.19 },
  { label: "Panama City, Panama", lat: 8.98, lng: -79.52 },
  { label: "San Juan, Puerto Rico", lat: 18.46, lng: -66.1 },
  { label: "New York, USA", lat: 40.71, lng: -74.0 },
  // South America
  { label: "Sao Paulo, Brazil", lat: -23.55, lng: -46.63 },
  { label: "Bogota, Colombia", lat: 4.71, lng: -74.07 },
  { label: "Cartagena, Colombia", lat: 10.39, lng: -75.51 },
  { label: "Quito, Ecuador", lat: -0.18, lng: -78.47 },
  { label: "Montevideo, Uruguay", lat: -34.9, lng: -56.16 },
  { label: "Caracas, Venezuela", lat: 10.48, lng: -66.9 },
  // Oceania
  { label: "Sydney, Australia", lat: -33.87, lng: 151.21 },
  { label: "Auckland, New Zealand", lat: -36.85, lng: 174.76 },
  { label: "Port Moresby, Papua New Guinea", lat: -9.44, lng: 147.18 },
];

const map = new DottedMap({ height: 100, grid: "diagonal" });

const markers = LOCATIONS.map(({ label, lat, lng, role }) => {
  const pin = map.addPin({ lat, lng });
  return {
    label,
    x: Math.round(pin.x * 100) / 100,
    y: Math.round(pin.y * 100) / 100,
    ...(role ? { role } : {}),
  };
});

/* Pins were added only to project coordinates - render the base WITHOUT
 * them by regenerating a clean map for the SVG. */
const base = new DottedMap({ height: 100, grid: "diagonal" });
const svg = base.getSVG({
  radius: 0.22,
  color: "#355E4D3D",
  shape: "circle",
  backgroundColor: "#F7F8F5",
});

await mkdir(dirname(OUT_IMAGE), { recursive: true });
/* sharp's SVG rasteriser ignores the style background-color on the root
 * element - flatten onto Porcelain explicitly. */
await sharp(Buffer.from(svg), { density: 300 })
  .resize(2112, null, { fit: "inside" })
  .flatten({ background: "#F7F8F5" })
  .webp({ quality: 88, effort: 6 })
  .toFile(OUT_IMAGE);

await writeFile(
  OUT_POINTS,
  JSON.stringify({ viewBox: { width: 198, height: 100 }, markers }, null, 2),
);

const { size } = await import("node:fs").then((fs) =>
  fs.promises.stat(OUT_IMAGE),
);
console.log(`world-map.webp  ${Math.round(size / 1024)}KB`);
console.log(`markers  ${markers.length}`);
