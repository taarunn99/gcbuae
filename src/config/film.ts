/**
 * The ambient film: ONE continuous stitched loop (see
 * scripts/build-film-loop.sh), not four separate clips. Chapter windows must
 * match the crossfade offsets baked into that script — each boundary is the
 * midpoint of a 1s dissolve.
 *
 * Copy is final per the build spec — assured and spare; never "premium
 * quality", never "wide range". `align` alternates the overlay left/right on
 * desktop as the chapters turn.
 */
export const filmLoop = {
  mp4: "/film/film-loop.mp4",
  webm: "/film/film-loop.webm",
  poster: "/film/film-loop-poster.jpg",
  duration: 17.12,
} as const;

export type FilmChapter = {
  id: string;
  eyebrow: string;
  word: string;
  quote: string;
  align: "left" | "right";
  /** Chapter window in seconds of the stitched loop. */
  from: number;
  to: number;
};

export const filmChapters: FilmChapter[] = [
  {
    id: "quartz",
    eyebrow: "The Surface",
    word: "QUARTZ",
    quote: "“Where the day begins, and the light stays.”",
    align: "left",
    from: 0,
    to: 4.54,
  },
  {
    id: "marble",
    eyebrow: "The Interior",
    word: "MARBLE",
    quote: "“Some rooms are built. Others are composed.”",
    align: "right",
    from: 4.54,
    to: 8.58,
  },
  {
    id: "jaquar",
    eyebrow: "The Detail",
    word: "JAQUAR",
    quote: "“Luxury is the weight of a tap in your hand.”",
    align: "left",
    from: 8.58,
    to: 12.62,
  },
  {
    id: "terrazzo",
    eyebrow: "The Evening",
    word: "TERRAZZO",
    quote: "“Made of fragments. Finished as one.”",
    align: "right",
    from: 12.62,
    to: 17.12,
  },
];
