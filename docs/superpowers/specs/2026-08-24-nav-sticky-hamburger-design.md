# Nav UX: sticky titles + hamburger Contents — Design

**Date:** 2026-08-24  
**Status:** Approved

## Changes

1. Remove the in-flow Contents block after the hero.
2. Fixed hamburger control (top-right) opens a Contents drawer/panel; choosing an entry closes the panel and smooth-scrolls to that section.
3. Hero CTA “Read the rules” opens the same Contents panel.
4. Each section `h2` is `position: sticky; top: 0` so the current section title stays pinned while reading until the next section replaces it.
5. Remove section highlight/flash on navigation.

## Out of scope

- Sticky sidebar TOC
- Rebuild of rules content
