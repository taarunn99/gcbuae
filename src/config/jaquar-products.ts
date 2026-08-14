import catalogue from "./jaquar-products.json";

/**
 * Product-level catalogue data, generated from the Jaquar Global Bath
 * Catalogue 2025-2026 extraction by scripts/build-jaquar-products.mjs.
 * Names, SKUs and page numbers are verbatim from print - never edit the
 * JSON by hand; regenerate it. Used only in server components at build
 * time; pages import just their collection's slice.
 */

export type JaquarProduct = {
  name: string;
  sku: string;
  finish: string;
  /** Pack-relative image slug ("faucets/aria/ari-39001b") or "" if the
   *  catalogue printed no croppable photo for this row. */
  image: string;
  /** Page in the printed catalogue - cited in the product tables. */
  page: number;
};

type CatalogueData = Record<string, Record<string, JaquarProduct[]>>;

const data = catalogue as CatalogueData;

export function productsOf(
  category: string,
  collection: string,
): JaquarProduct[] {
  return data[category]?.[collection] ?? [];
}

export function productCount(category: string, collection?: string): number {
  const cat = data[category];
  if (!cat) return 0;
  if (collection) return (cat[collection] ?? []).length;
  return Object.values(cat).reduce((n, list) => n + list.length, 0);
}

/** Collections present in the catalogue data for a category. */
export function catalogueCollections(category: string): string[] {
  return Object.keys(data[category] ?? {});
}

export const catalogueTotal = Object.values(data).reduce(
  (n, cat) =>
    n + Object.values(cat).reduce((m, list) => m + list.length, 0),
  0,
);
