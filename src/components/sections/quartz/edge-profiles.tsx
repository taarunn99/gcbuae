/**
 * The 21 edge profiles as drawn cross-sections - the slab seen end-on,
 * profiled edge on the right - replacing the old comma-separated text
 * list. Server component, pure SVG line-work in Pine Teal.
 */

type Profile = { name: string; d: string };

// viewBox 0 0 64 40 - slab body from x=4, top y=12, bottom y=28,
// profiled edge finishing near x=56.
const PROFILES: Profile[] = [
  { name: "Straight eased", d: "M4 12h49l3 3v10l-3 3H4" },
  { name: "Chamfer eased", d: "M4 12h44l8 6v7l-3 3H4" },
  { name: "Pencil round", d: "M4 12h48q4 0 4 4v12H4" },
  { name: "Double pencil round", d: "M4 12h48q4 0 4 4v8q0 4-4 4H4" },
  { name: "Radius", d: "M4 12h44q8 0 8 8v8H4" },
  { name: "Double radius", d: "M4 12h44q8 0 8 8t-8 8H4" },
  { name: "Chamfer", d: "M4 12h44l8 8v8H4" },
  { name: "Double chamfer", d: "M4 12h44l8 6v4l-8 6H4" },
  { name: "Stair tread", d: "M4 12h44q8 0 8 8v3h-8v5H4" },
  { name: "Waterfall", d: "M4 12h40q12 0 12 8v8H4" },
  { name: "Platner", d: "M4 12h46v4h6v8l-4 4H4" },
  { name: "Laminated", d: "M4 8h48q4 0 4 4v16q0 4-4 4H4M4 20h52" },
  { name: "Full bullnose", d: "M4 12h44a8 8 0 0 1 0 16H4" },
  { name: "Half bullnose", d: "M4 12h44q8 0 8 8v8H4" },
  { name: "Demi bullnose", d: "M4 12h40q12 0 12 10v6H4" },
  { name: "Ogee", d: "M4 12h40q8 0 6 6t6 6v4H4" },
  { name: "Ogee roundover", d: "M4 12h38q8 0 6 5t8 7q0 4-4 4H4" },
  { name: "Dupont", d: "M4 12h46v6q6 0 6 6v4H4" },
  { name: "Cove", d: "M4 12h52q-8 2-8 8v8H4" },
  { name: "Cove ogee", d: "M4 12h52q-8 2-6 8t-6 8H4" },
  { name: "Cove dupont", d: "M4 12h52q-6 2-6 6h6v10H4" },
];

export function EdgeProfiles() {
  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
      {PROFILES.map((p) => (
        <li key={p.name} className="group">
          <span className="border-ink/10 group-hover:border-bronze/60 block rounded-lg border p-2 transition-colors">
            <svg
              viewBox="0 0 64 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ink/80 group-hover:text-bronze h-auto w-full transition-colors"
              aria-hidden
            >
              <path d={p.d} />
            </svg>
          </span>
          <span className="text-ink/60 group-hover:text-ink mt-2 block text-center text-[0.65rem] leading-tight tracking-wide transition-colors">
            {p.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
