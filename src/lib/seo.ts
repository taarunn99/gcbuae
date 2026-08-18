/**
 * SERP metadata helpers (owner rule, 2026-08-18): titles use as much of
 * the ~60-character SERP budget as their keywords honestly fill, and
 * descriptions land inside the 140-160 character window. Blog post
 * metas are exempt - locked verbatim in the content package.
 */

const TITLE_MAX = 60;
const DESC_MAX = 160;

/**
 * Greedy title builder. Starts from the primary-keyword base and
 * appends each extra (which must carry its own separator, e.g.
 * " - Price & SKUs", " | Global Classic") while the budget holds.
 */
export function seoTitle(base: string, ...extras: string[]): string {
  let title = base;
  for (const extra of extras) {
    if (extra && title.length + extra.length <= TITLE_MAX) title += extra;
  }
  return title;
}

/**
 * Greedy description builder. Appends tails (sentences with their own
 * punctuation) while the result stays within 160 characters, then
 * word-truncates cleanly if the core alone overruns.
 */
export function seoDescription(core: string, ...tails: string[]): string {
  let out = core.trim();
  for (const tail of tails) {
    const next = `${out} ${tail.trim()}`;
    if (next.length <= DESC_MAX) out = next;
  }
  if (out.length > DESC_MAX) {
    const cut = out.slice(0, DESC_MAX - 1);
    const stop = Math.max(cut.lastIndexOf(" "), 0);
    out = `${cut.slice(0, stop).replace(/[\s,;:.-]+$/, "")}.`;
  }
  return out;
}
