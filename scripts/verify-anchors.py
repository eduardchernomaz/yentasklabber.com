#!/usr/bin/env python3
"""Verify Contents hrefs in index.html match section ids."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"

REQUIRED_IDS = [
    "contents",
    "history",
    "objective-and-setup",
    "card-ranking",
    "dealing-and-trump",
    "playing-a-trick",
    "declarations",
    "bella",
    "winning-a-hand",
    "complete-shutout",
    "tie-hand",
    "winning-the-game",
    "quick-reference",
    "brooklyn-klabber-board",
]


def main() -> int:
    if not HTML.exists():
        print(f"FAIL: missing {HTML}")
        return 1
    text = HTML.read_text(encoding="utf-8")
    ids = set(re.findall(r'\bid="([^"]+)"', text))
    hrefs = re.findall(
        r'<nav[^>]*class="[^"]*\bcontents\b[^"]*"[^>]*>[\s\S]*?</nav>',
        text,
        flags=re.I,
    )
    if not hrefs:
        print("FAIL: no <nav class=\"contents\"> found")
        return 1
    toc_hrefs = re.findall(r'href="#([^"]+)"', hrefs[0])
    missing_ids = [i for i in REQUIRED_IDS if i not in ids]
    dangling = [h for h in toc_hrefs if h not in ids]
    errors = []
    if missing_ids:
        errors.append(f"missing section ids: {missing_ids}")
    if dangling:
        errors.append(f"TOC hrefs without targets: {dangling}")
    if "assets/logo.png" not in text:
        errors.append("index.html does not reference assets/logo.png")
    if errors:
        print("FAIL:")
        for e in errors:
            print(f"  - {e}")
        return 1
    print(f"OK: {len(toc_hrefs)} TOC links; {len(REQUIRED_IDS)} required ids present")
    return 0


if __name__ == "__main__":
    sys.exit(main())
