/**
 * Content map for The Journal - one import per post, keyed by slug.
 * The registry (src/config/blog.ts) is the source of truth for which
 * slugs exist; a missing entry here fails the build via getBlogContent.
 */
import type { BlogContent } from "./types";

import { content as bathroom_fittings_guide_uae } from "./bathroom-fittings-guide-uae";
import { content as best_bathroom_brands_uae } from "./best-bathroom-brands-uae";
import { content as best_marble_flooring_villa_uae } from "./best-marble-flooring-villa-uae";
import { content as black_vs_brushed_metal_bathroom_finishes } from "./black-vs-brushed-metal-bathroom-finishes";
import { content as commercial_flooring_stone_guide } from "./commercial-flooring-stone-guide";
import { content as does_quartz_stain_or_scratch } from "./does-quartz-stain-or-scratch";
import { content as engineered_marble_complete_guide } from "./engineered-marble-complete-guide";
import { content as engineered_marble_vs_natural_marble } from "./engineered-marble-vs-natural-marble";
import { content as engineered_stone_vs_porcelain_slabs } from "./engineered-stone-vs-porcelain-slabs";
import { content as how_to_choose_bathroom_vanity_top } from "./how-to-choose-bathroom-vanity-top";
import { content as how_to_choose_shower_system } from "./how-to-choose-shower-system";
import { content as how_to_clean_marble_floors_uae } from "./how-to-clean-marble-floors-uae";
import { content as how_to_seal_marble } from "./how-to-seal-marble";
import { content as is_engineered_marble_good_for_kitchens } from "./is-engineered-marble-good-for-kitchens";
import { content as jacuzzi_maintenance_uae } from "./jacuzzi-maintenance-uae";
import { content as jacuzzi_spa_buyers_guide_uae } from "./jacuzzi-spa-buyers-guide-uae";
import { content as jacuzzi_vs_hot_tub_vs_spa } from "./jacuzzi-vs-hot-tub-vs-spa";
import { content as marble_bathroom_ideas } from "./marble-bathroom-ideas";
import { content as marble_care_maintenance_guide } from "./marble-care-maintenance-guide";
import { content as marble_etching_vs_staining } from "./marble-etching-vs-staining";
import { content as marble_look_without_natural_marble } from "./marble-look-without-natural-marble";
import { content as marble_price_dubai } from "./marble-price-dubai";
import { content as marble_slab_supplier_uae_how_to_choose } from "./marble-slab-supplier-uae-how-to-choose";
import { content as quartz_countertop_price_dubai } from "./quartz-countertop-price-dubai";
import { content as quartz_countertops_complete_guide } from "./quartz-countertops-complete-guide";
import { content as quartz_slab_sizes_thickness } from "./quartz-slab-sizes-thickness";
import { content as quartz_vs_granite_uae } from "./quartz-vs-granite-uae";
import { content as quartz_vs_marble } from "./quartz-vs-marble";
import { content as remove_stains_from_marble } from "./remove-stains-from-marble";
import { content as small_bathroom_design_uae } from "./small-bathroom-design-uae";
import { content as stone_cleaning_products_guide } from "./stone-cleaning-products-guide";
import { content as terrazzo_design_trends_2026 } from "./terrazzo-design-trends-2026";
import { content as terrazzo_flooring_complete_guide } from "./terrazzo-flooring-complete-guide";
import { content as terrazzo_kitchen_bathroom } from "./terrazzo-kitchen-bathroom";
import { content as terrazzo_pros_and_cons } from "./terrazzo-pros-and-cons";
import { content as terrazzo_tiles_vs_slabs } from "./terrazzo-tiles-vs-slabs";
import { content as wall_hung_vs_floor_mounted_toilet } from "./wall-hung-vs-floor-mounted-toilet";
import { content as whirlpool_bath_installation_guide } from "./whirlpool-bath-installation-guide";
import { content as white_quartz_countertops_styles } from "./white-quartz-countertops-styles";

const CONTENT: Record<string, BlogContent> = {
  "bathroom-fittings-guide-uae": bathroom_fittings_guide_uae,
  "best-bathroom-brands-uae": best_bathroom_brands_uae,
  "best-marble-flooring-villa-uae": best_marble_flooring_villa_uae,
  "black-vs-brushed-metal-bathroom-finishes": black_vs_brushed_metal_bathroom_finishes,
  "commercial-flooring-stone-guide": commercial_flooring_stone_guide,
  "does-quartz-stain-or-scratch": does_quartz_stain_or_scratch,
  "engineered-marble-complete-guide": engineered_marble_complete_guide,
  "engineered-marble-vs-natural-marble": engineered_marble_vs_natural_marble,
  "engineered-stone-vs-porcelain-slabs": engineered_stone_vs_porcelain_slabs,
  "how-to-choose-bathroom-vanity-top": how_to_choose_bathroom_vanity_top,
  "how-to-choose-shower-system": how_to_choose_shower_system,
  "how-to-clean-marble-floors-uae": how_to_clean_marble_floors_uae,
  "how-to-seal-marble": how_to_seal_marble,
  "is-engineered-marble-good-for-kitchens": is_engineered_marble_good_for_kitchens,
  "jacuzzi-maintenance-uae": jacuzzi_maintenance_uae,
  "jacuzzi-spa-buyers-guide-uae": jacuzzi_spa_buyers_guide_uae,
  "jacuzzi-vs-hot-tub-vs-spa": jacuzzi_vs_hot_tub_vs_spa,
  "marble-bathroom-ideas": marble_bathroom_ideas,
  "marble-care-maintenance-guide": marble_care_maintenance_guide,
  "marble-etching-vs-staining": marble_etching_vs_staining,
  "marble-look-without-natural-marble": marble_look_without_natural_marble,
  "marble-price-dubai": marble_price_dubai,
  "marble-slab-supplier-uae-how-to-choose": marble_slab_supplier_uae_how_to_choose,
  "quartz-countertop-price-dubai": quartz_countertop_price_dubai,
  "quartz-countertops-complete-guide": quartz_countertops_complete_guide,
  "quartz-slab-sizes-thickness": quartz_slab_sizes_thickness,
  "quartz-vs-granite-uae": quartz_vs_granite_uae,
  "quartz-vs-marble": quartz_vs_marble,
  "remove-stains-from-marble": remove_stains_from_marble,
  "small-bathroom-design-uae": small_bathroom_design_uae,
  "stone-cleaning-products-guide": stone_cleaning_products_guide,
  "terrazzo-design-trends-2026": terrazzo_design_trends_2026,
  "terrazzo-flooring-complete-guide": terrazzo_flooring_complete_guide,
  "terrazzo-kitchen-bathroom": terrazzo_kitchen_bathroom,
  "terrazzo-pros-and-cons": terrazzo_pros_and_cons,
  "terrazzo-tiles-vs-slabs": terrazzo_tiles_vs_slabs,
  "wall-hung-vs-floor-mounted-toilet": wall_hung_vs_floor_mounted_toilet,
  "whirlpool-bath-installation-guide": whirlpool_bath_installation_guide,
  "white-quartz-countertops-styles": white_quartz_countertops_styles,
};

export function getBlogContent(slug: string): BlogContent {
  const content = CONTENT[slug];
  if (!content) throw new Error(`blog content missing for ${slug}`);
  return content;
}
