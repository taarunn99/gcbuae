/**
 * The scroll-film sequence. Copy is final per the build spec — assured and
 * spare; never "premium quality", never "wide range".
 *
 * `align` alternates the overlay block left/right on desktop per shot.
 * Encoded files come from `npm run assets:film`.
 */
export type FilmShot = {
  id: string;
  eyebrow: string;
  word: string;
  quote: string;
  align: "left" | "right";
  mp4: string;
  webm: string;
  poster: string;
};

export const filmShots: FilmShot[] = [
  {
    id: "quartz",
    eyebrow: "The Surface",
    word: "QUARTZ",
    quote: "“Where the day begins, and the light stays.”",
    align: "left",
    mp4: "/film/shot-1-quartz-web.mp4",
    webm: "/film/shot-1-quartz-web.webm",
    poster: "/film/shot-1-quartz-poster.jpg",
  },
  {
    id: "marble",
    eyebrow: "The Interior",
    word: "MARBLE",
    quote: "“Some rooms are built. Others are composed.”",
    align: "right",
    mp4: "/film/shot-2-marble-web.mp4",
    webm: "/film/shot-2-marble-web.webm",
    poster: "/film/shot-2-marble-poster.jpg",
  },
  {
    id: "jaquar",
    eyebrow: "The Detail",
    word: "JAQUAR",
    quote: "“Luxury is the weight of a tap in your hand.”",
    align: "left",
    mp4: "/film/shot-3-hardware-web.mp4",
    webm: "/film/shot-3-hardware-web.webm",
    poster: "/film/shot-3-hardware-poster.jpg",
  },
  {
    id: "terrazzo",
    eyebrow: "The Evening",
    word: "TERRAZZO",
    quote: "“Made of fragments. Finished as one.”",
    align: "right",
    mp4: "/film/shot-4-terrazzo-web.mp4",
    webm: "/film/shot-4-terrazzo-web.webm",
    poster: "/film/shot-4-terrazzo-poster.jpg",
  },
];
