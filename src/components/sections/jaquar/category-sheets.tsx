import { SpecTable } from "@/components/sections/jaquar/spec-table";
import {
  PICTURES_DISCLAIMER,
  WHIRLPOOL_SHEET_NOTE,
  flushingFacts,
  showerSizes,
  showerTechnologies,
  spaModels,
  spaSheetHighlights,
  waterHeaterRanges,
  whirlpoolModels,
  whirlpoolSheet,
} from "@/config/jaquar-catalogue";

/**
 * Per-category catalogue sheets - the printed tables (pp244-351) rendered
 * as real HTML on the category's dark tech band. Returns null for
 * categories whose catalogue carries no sheet (their claims/specs bands
 * already cover it). Server component.
 */
export function CategorySheets({ category }: { category: string }) {
  switch (category) {
    case "whirlpools":
      return (
        <div className="mt-16">
          <h3 className="label-gcb text-bronze">
            The 13-model specification sheet, as printed
          </h3>
          <div className="mt-6">
            <SpecTable
              caption="Jaquar whirlpool specification sheet"
              head={["Spec", ...whirlpoolModels]}
              rows={whirlpoolSheet.map((row) => [row.label, ...row.values])}
              footnote={WHIRLPOOL_SHEET_NOTE}
              minWidth={1500}
            />
          </div>
        </div>
      );
    case "showers":
      return (
        <div className="mt-16">
          <h3 className="label-gcb text-bronze">
            Shapes, sizes and registered designs
          </h3>
          <div className="mt-6">
            <SpecTable
              caption="Jaquar shower shapes and sizes"
              head={["Shape", "Printed sizes", "Registered design no."]}
              rows={showerSizes.map((r) => [r.shape, r.sizes, r.regDesign])}
              footnote="As printed on catalogue p246. Duoflo heads run AISI 304 stainless bodies with patented inverted riveting; Hydrolite generates its LED light from water power alone - no battery, no mains."
              minWidth={560}
            />
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {showerTechnologies.map((tech) => (
              <div key={tech.title} className="border-ink/15 border-t pt-4">
                <h4 className="font-display text-lg">{tech.title}</h4>
                <p className="text-ink/70 mt-2 text-sm leading-relaxed">
                  {tech.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    case "flushing-systems":
      return (
        <div className="mt-16 max-w-2xl">
          <h3 className="label-gcb text-bronze">The installation numbers</h3>
          <div className="mt-6">
            <SpecTable
              caption="Jaquar flushing system facts"
              head={["Fact", "As printed"]}
              rows={flushingFacts.map((r) => [r[0], r[1]])}
              minWidth={480}
            />
          </div>
        </div>
      );
    case "wellness":
      return (
        <div className="mt-16">
          <h3 className="label-gcb text-bronze">
            Fourteen spas, sized and seated
          </h3>
          <div className="mt-6">
            <SpecTable
              caption="Jaquar spa models"
              head={["Model", "Printed size", "Seats"]}
              rows={spaModels.map((m) => [m.name, m.size, m.seats])}
              footnote={PICTURES_DISCLAIMER}
              minWidth={560}
            />
          </div>
          <div className="mt-12 max-w-2xl">
            <h3 className="label-gcb text-bronze">
              From the p334 features sheet
            </h3>
            <dl className="divide-ink/10 border-ink/15 mt-5 divide-y border-y">
              {spaSheetHighlights.map(([term, value]) => (
                <div
                  key={term}
                  className="grid grid-cols-[1fr_1.618fr] gap-4 py-3"
                >
                  <dt className="text-ink/60 text-sm">{term}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      );
    case "water-heaters":
      return (
        <div className="mt-16 max-w-2xl">
          <h3 className="label-gcb text-bronze">The capacity ladder</h3>
          <div className="mt-6">
            <SpecTable
              caption="Jaquar water heater ranges"
              head={["Range", "Printed capacities"]}
              rows={waterHeaterRanges.map((r) => [r.range, r.capacities])}
              footnote="Catalogue pp343-351, including the p345 capacity-selection guide - send fixture counts for sizing with the quotation."
              minWidth={480}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}
