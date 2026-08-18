/**
 * Post content shape for The Journal. `answer` is the package's
 * verbatim direct-answer paragraph (never edited). Section bodies are
 * plain prose; paragraphs split on blank lines and inline links use
 * [anchor text](/path), rendered server-side into real anchors so the
 * view-source test always passes.
 */
export type BlogSection = {
  h2: string;
  body: string;
};

export type BlogFaqItem = {
  q: string;
  a: string;
};

export type BlogContent = {
  answer: string;
  sections: BlogSection[];
  faq: BlogFaqItem[];
};
