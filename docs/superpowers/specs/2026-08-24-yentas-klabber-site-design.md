# Yentas Klabber GitHub Pages Site — Design Spec

**Date:** 2026-08-24  
**Repo:** `eduardchernomaz/yentasklabber.com`  
**Domain:** `yentasklabber.com` (existing `CNAME`)  
**Status:** Approved in brainstorming; awaiting user review of this written spec

## Goal

Ship a modern, mobile-friendly single-page GitHub Pages website for **Yentas Klabber** (Brooklyn four-player partnership Clabber/Klabber variant). The site presents the logo, history, and full how-to-play rules. A Contents index mirrors the PDF; clicking an entry smooth-scrolls to that section with a short highlight animation.

## Sources of truth (already in repo)

- Logo: `2523931A-EFED-4CA0-8862-D6562A3E20B7.png` (circular navy/gold NYC emblem; will be copied to `assets/logo.png`)
- Rules PDF: `Yentas%20Clabber.pdf.pdf` (6 pages: history, rules 1–10, quick reference, Brooklyn Klabber Board)
- Brand name: **Yentas Klabber** (README / oral tradition spelling; PDF filename uses “Clabber”)

## Approach

**Static single page (HTML/CSS/JS)** — no build step, ideal for GitHub Pages.

Rejected alternatives:

- Multi-page site (breaks continuous index → section scroll)
- React/Vite SPA (unnecessary tooling for content site)

## Visual direction

Lean into the logo (option A):

- **Palette:** deep navy, antique gold, cream, deep red accents
- **Typography:** expressive serif for brand and headings; clean readable sans for body copy
- **Hero:** full-bleed atmospheric navy/gold plane; logo as dominant brand mark; brand name hero-level; one short supporting line; one CTA (“Read the rules”). No cards, badges, or secondary content in the first viewport
- **Atmosphere:** textured/gradient navy background — not flat white
- **Motion (minimum 2–3 intentional):**
  1. Smooth scroll from Contents click to target section
  2. Soft fade/slide-in or brief highlight when the target section arrives (and/or on enter-view)
  3. Light hover/focus feedback on Contents links and CTA
- Respect `prefers-reduced-motion`: disable smooth scroll and decorative motion; use instant jump

Avoid generic AI-default looks (purple gradients, cream+terracotta newspaper layouts, glow stacks, pill clusters).

## Page structure

Single `index.html` scroll flow:

1. **Hero** — logo, **Yentas Klabber**, one line, CTA to Contents/rules
2. **Contents** — PDF-style index (once, after hero; not sticky):
   - History & Origin of Yentas Klabber
   - 1. Objective and Setup
   - 2. Card Ranking and Point Values
   - 3. Dealing and Choosing Trump
   - 4. Playing a Trick (aka “vzyatka”)
   - 5. Declarations — 20s and 50s (“Trick Cards”)
   - 6. Bella
   - 7. Winning a Hand and Bates
   - 8. Complete Shutout — Minus 100
   - 9. Tie Hand
   - 10. Winning the Game
   - Quick Reference
   - Brooklyn Klabber Board
3. **History & Origin** — full narrative from the PDF
4. **Rules sections 1–10** — one section per PDF heading; preserve meaning and house-rule nuance
5. **Quick Reference** — compact bullet summary
6. **Brooklyn Klabber Board** — member list with aliases
7. **Footer** — light credit; link to download the original PDF

## Contents interaction

- Clicking a Contents item smooth-scrolls to the matching section
- On arrival, the section briefly highlights / fades so landing is obvious
- URL hash updates (e.g. `#bella`, `#objective-and-setup`) for shareable deep links
- Opening a hash URL on load scrolls (and highlights) that section
- Same behavior on mobile: Contents is a vertical list after the hero; tap → scroll + highlight
- No sticky sidebar TOC (explicitly rejected in favor of top-of-page index)

## Mobile

- Responsive stacked layout; readable body size; comfortable tap targets
- Hero logo and type scale down without clipping or overflow
- Contents remains a simple vertical list
- No horizontal scroll; test at common phone widths (~375px)

## Files & editing workflow

| Path | Role |
|------|------|
| `index.html` | Site markup and section structure |
| `styles.css` | Brand styling, layout, motion, responsive rules |
| `script.js` | Smooth scroll, hash updates, section highlight, reduced-motion handling |
| `assets/logo.png` | Clean logo asset used by the site |
| `content/yentas-klabber.md` | Full PDF content converted to Markdown — **editable source** for the user |
| `Yentas%20Clabber.pdf.pdf` | Original PDF retained; linked from footer |
| `CNAME` | Unchanged (`yentasklabber.com`) |
| `README.md` | Brief project description (may update lightly) |

**Editing flow:** User edits `content/yentas-klabber.md` when rules change. First ship keeps Markdown and HTML content in sync. Later syncs can be manual or a small conversion pass if needed.

## Content requirements

- Convert the entire PDF into well-structured Markdown (headings, lists, emphasis)
- Web copy matches the Markdown/PDF substance (humor and Brooklyn voice preserved)
- Section `id`s align with Contents anchors
- Card rankings and scoring rules remain accurate (trump J/9 hierarchy, Bella rules, bates, shutout, ties, 501/1001)

## Out of scope (first ship)

- Live scorekeeper / game simulator
- Multi-language
- CMS or automated MD→HTML pipeline
- Sticky/floating TOC variants
- Redesigning the logo artwork

## Success criteria

- Site loads on GitHub Pages at the custom domain
- Logo is prominent in the hero
- History and full rules are readable on desktop and mobile
- Contents entries match the PDF index and animate-scroll to the correct sections
- `content/yentas-klabber.md` exists and is editable
- Original PDF remains downloadable from the site
- Reduced-motion users get non-animated navigation

## Implementation note

After this spec is approved, create an implementation plan via the writing-plans skill, then build on branch `cursor/yentas-klabber-site-320c`.
