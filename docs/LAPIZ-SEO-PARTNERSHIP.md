# Lapiz Blue × Global Classic - SEO partnership plan (2026-08-18)

lapizblue.com is NOT a competitor: it is the Lapiz Group's flagship
company (the group GCB belongs to) and ranks in the same product SERPs -
notably KalingaStone and FILA queries. The play is coordination: two
authoritative, entity-linked sites covering complementary queries beat
one site fighting itself. This file records the division of territory,
the linking rules, and what each side implements.

## 1. The principle Google actually rewards

Google rewards this arrangement when it looks like what it is: a real
corporate group whose sites reference each other editorially, with
consistent entity data. It punishes what it must never look like: a
link network (sitewide reciprocal footers across many group domains,
exact-match anchors, duplicated content). Every rule below follows from
that line.

## 2. Query territory - who owns what

One primary query, one page, ONE DOMAIN. The split by strength:

| Territory | Owner | Why |
|---|---|---|
| kalingastone brand-general ("kalingastone", "kalingastone uae") | lapizblue.com keeps what it already ranks; GCB's /kalingastone hub competes only where Lapiz does not hold the slot | never bid against your own group's ranking page |
| kalingastone commercial long-tail (price, vs caesarstone, per-shade, supplier-with-stock) | gcbuae.com | we hold the stock, the AED prices, the 128 shade pages - just shipped |
| fila brand + retail ("fila uae", "fila stone care uae") | lapizblue.com (official distributor) | distributor status wins these SERPs; QCON is the enemy here, not GCB |
| fila application/how-to + trade supply ("how to seal marble", "fila mp90 uae", care cluster) | gcbuae.com | our care cluster is live; Lapiz links down to it |
| jaquar, terrazzo, quartz, marble, bathrooms, wellness | gcbuae.com | not Lapiz territory |
| mapei / construction chemicals | lapizblue.com | not GCB territory |

Standing rule: before either site publishes a new SEO page, check the
other's coverage of that primary query. This file + the blog registry
are the check.

## 3. Implemented on gcbuae.com (this commit)

1. **Entity link in schema**: sitewide Organization JSON-LD now carries
   `parentOrganization: Lapiz Group of Companies (lapizblue.com)` -
   the knowledge-graph edge between the two entities.
2. **Editorial outbound links** (contextual, not sitewide-spam): FILA
   hub hero now links "Lapiz Blue" to lapizblue.com; the footer group
   row and the /about group deck already linked it. That is three
   genuine, relevant placements - enough; do not add more without
   editorial reason.
3. Audit report corrected: lapizblue.com classified as partner, not
   competitor, in docs/COMPETITOR-AUDIT-2026-08.md.

## 4. Asks for the Lapiz Blue site (hand this list to its maintainer)

1. **Link down the supply chain, descriptively.** From lapizblue.com's
   KalingaStone pages: "slab stock, AED pricing and delivery across the
   UAE" -> gcbuae.com/kalingastone (and the price guide
   /blog/kalingastone-price-uae). From its FILA pages: "trade and
   project quantities" -> gcbuae.com/fila. Contextual paragraphs, not
   footers; varied natural anchors, never repeated exact-match.
2. **Mirror the entity data**: Lapiz Blue's Organization schema should
   name the group the same way ("Lapiz Group of Companies") and list
   GCB as a subOrganization/member with url gcbuae.com. Its /about
   group section (the card deck) should link gcbuae.com - same move we
   made in reverse.
3. **Respect the territory table** above when planning its blog - in
   particular, do not publish KalingaStone pricing or FILA how-to
   content that would collide with GCB's pages; link to them instead.
4. **No content copying** between the domains, ever - not even product
   descriptions. Same facts, different words, cross-linked.
5. Where Lapiz Blue holds a Google Business Profile / directory
   listings, ensure GCB is listed separately with its own NAP (Al
   Sajaa address) - group companies with distinct NAP each earn their
   own local presence.

## 5. Cautions (what would get the group penalised)

- No sitewide reciprocal footer link exchanges across every group
  domain (five sites all footer-linking each other = link scheme
  pattern). Footer link to the PARENT only is fine; deep links stay
  editorial.
- No doorway pages: one emirate page per real capability, not a
  geo-page farm mirrored across both domains.
- No duplicated posts or swapped authorship.
- Disclose the relationship in copy where linked ("part of the Lapiz
  Group", "official distributor") - Google's systems and raters both
  reward the transparency the sites already practice.

## 6. Review rhythm

Revisit this split whenever either site plans new query targets, and at
the quarterly competitor re-crawl (next: Nov 2026). If Lapiz Blue's
KalingaStone rankings fade (Mina's collapse is reshaping that SERP),
ownership of brand-general terms migrates to GCB by agreement, not by
accident.
