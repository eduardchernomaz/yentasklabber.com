# Yentas Klabber GitHub Pages Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a mobile-friendly single-page GitHub Pages site for Yentas Klabber with logo hero, PDF-mirrored Contents (smooth-scroll + highlight), full history/rules, editable Markdown source, and PDF download.

**Architecture:** Static `index.html` + `styles.css` + `script.js` on GitHub Pages (no build). Content lives in HTML sections with matching anchors; `content/yentas-klabber.md` is the editable Markdown source converted from the PDF. A small Python verifier checks Contents hrefs ↔ section ids.

**Tech Stack:** HTML5, CSS3 (custom properties, responsive), vanilla JS, Google Fonts (Cormorant Garamond + Source Sans 3), existing GitHub Pages + `CNAME`.

## Global Constraints

- Brand: **Yentas Klabber**; palette navy/gold/cream/deep red from logo
- Hero: logo dominant; supporting line exactly: `Four-player partnership Brooklyn Klabber — the official house rules.`; CTA `Read the rules`; no cards/badges in first viewport
- Contents: after hero only (not sticky); entries match PDF index; click → smooth scroll + section highlight + hash update; honor `prefers-reduced-motion`
- Mobile-friendly; no horizontal scroll at ~375px
- Keep original PDF path `Yentas%20Clabber.pdf.pdf` for download; copy logo to `assets/logo.png`
- Preserve PDF humor/voice and rule accuracy (trump J→9, Bella, bates, shutout, ties, 501/1001)
- Branch: `cursor/yentas-klabber-site-320c`; commit frequently

## File Structure

| File | Responsibility |
|------|----------------|
| `content/yentas-klabber.md` | Editable full rules/history Markdown |
| `assets/logo.png` | Site logo (copy of existing PNG) |
| `index.html` | Page structure, Contents, all sections, footer |
| `styles.css` | Brand look, layout, motion, responsive |
| `script.js` | Smooth scroll, hash, highlight, reduced-motion |
| `scripts/verify-anchors.py` | Assert Contents hrefs match section ids |
| `Yentas%20Clabber.pdf.pdf` | Unchanged original PDF |
| `CNAME` | Unchanged |
| `README.md` | Short site description |

---

### Task 1: Markdown source from PDF

**Files:**
- Create: `content/yentas-klabber.md`
- Test: visual/file check via `test -f` and heading grep

**Interfaces:**
- Consumes: PDF text already extracted from `Yentas%20Clabber.pdf.pdf`
- Produces: Markdown headings that map 1:1 to site section titles (History, 1–10, Quick Reference, Brooklyn Klabber Board)

- [ ] **Step 1: Create content directory and Markdown file**

Create `content/yentas-klabber.md` with this exact content:

```markdown
# Yentas Klabber

## Four-Player Partnership Rules

### Contents

- [History & Origin of Yentas Klabber](#history--origin-of-yentas-klabber)
- [1. Objective and Setup](#1-objective-and-setup)
- [2. Card Ranking and Point Values](#2-card-ranking-and-point-values)
- [3. Dealing and Choosing Trump](#3-dealing-and-choosing-trump)
- [4. Playing a Trick (aka "vzyatka")](#4-playing-a-trick-aka-vzyatka)
- [5. Declarations — 20s and 50s ("Trick Cards")](#5-declarations--20s-and-50s-trick-cards)
- [6. Bella](#6-bella)
- [7. Winning a Hand and Bates](#7-winning-a-hand-and-bates)
- [8. Complete Shutout — Minus 100](#8-complete-shutout--minus-100)
- [9. Tie Hand](#9-tie-hand)
- [10. Winning the Game](#10-winning-the-game)
- [Quick Reference](#quick-reference)
- [Brooklyn Klabber Board](#brooklyn-klabber-board)

## History & Origin of Yentas Klabber

According to the accepted Yentas oral tradition — which is considerably more reliable than asking four Klabber players to agree on what happened five minutes ago — this particular variant took shape among Russian Jewish immigrants who settled in Brooklyn in the late 1980s and early 1990s.

The game traveled from kitchen tables and apartment living rooms into a distinctly Brooklyn ecosystem: neighborhood rivalries, family gatherings, local universities, late-night games, and the occasional table where somebody was absolutely certain that everyone else had been playing the rule wrong for twenty years.

As the years went on, Klabber remained less of a quiet card game and more of a highly structured method for four people to argue about mathematics. Disputes over Bella, trump, trick declarations, bates, ties, who was required to overtrump, and what somebody's uncle definitely said in 1994 became common. Friendships survived. Mostly.

After decades of games between players from different Brooklyn neighborhoods and local universities, it became clear that civilization required a single agreed-upon rule set. The unofficial but deeply authoritative Brooklyn Klabber Board was therefore called upon to settle the matter. After what historical records can only assume were calm, respectful, and completely uninterrupted deliberations, the official Brooklyn variant known as Yentas Klabber was established.

The rules were ultimately agreed upon under the guidance of the Board's principal representatives, the legendary Luna Park Lenny and Nice Guy Steven (aka Rudy), under the stewardship of Fun Eddie. Their mission was simple: preserve the game, standardize the arguments, and ensure that future generations would at least be fighting about strategy instead of fighting about the rules.

Today, Yentas Klabber represents the accumulated wisdom, grudges, compromises, disputed memories, and card-table diplomacy of several decades of Brooklyn play. The rules that follow should therefore be considered official — at least until somebody's father-in-law says, "That's not how we played it."

## 1. Objective and Setup

- The first dealer is determined by choosing the highest card from the deck.
- Four players form two fixed teams of two. Partners sit opposite each other.
- Use a 32-card deck: 7, 8, 9, 10, Jack, Queen, King, Ace in each suit.
- Each player ends with 8 cards.
- Dealer rotates clockwise after every hand.
- Play to either 501 points (short game) or 1001 points (long game), agreed before play begins.
- Good faith misdealing is not penalized. A redeal follows.

## 2. Card Ranking and Point Values

**Trump suit, highest to lowest:**

Jack (20) → 9 (14) → Ace (11) → 10 (10) → King (4) → Queen (3) → 8 (0) → 7 (0)

**Non-trump suits, highest to lowest:**

Ace (11) → 10 (10) → King (4) → Queen (3) → Jack (2) → 9 (0) → 8 (0) → 7 (0)

The final trick is worth an additional 10 points. There are 162 trick/card points available in a hand before Bella or other declarations are added.

## 3. Dealing and Choosing Trump

- Deal 6 cards to each player, three cards at a time, twice around until each player has six cards. When all cards are dealt and everyone has all their cards, turn one card face-up to propose a trump suit.
- First round: starting with the player to the dealer's left and moving clockwise, each player either accepts the face-up suit as trump or passes.
- If all four pass, begin a second round. Players may choose one of the other three suits as trump.
- On the second round, the dealer cannot pass if everyone before the dealer passes. The dealer must choose a trump suit.
- The team that chooses/accepts trump is the taking team for that hand.
- Finish the deal so every player has 8 cards.
- The dealer picks up the face-up card.
- A seven of trump suit cannot be exchanged for the original face-up trump suit in a four player game.

## 4. Playing a Trick (aka "vzyatka")

- Player left of the dealer always starts the first trick by throwing down the first card. It can be any card the player wants.
- You must follow the suit whenever you can.
- If you cannot follow suit and an opponent is currently winning the trick, you must play a trump if you have one.
- If an opponent has already trumped and you can play a higher trump, you must overtrump.
- If your partner is currently winning the trick, you do not have to overtrump or beat your partner's trump. If you cannot follow the led suit, you may save a higher trump instead of wasting it on your partner's winning trick.
- When trump is led, you must follow trump if you have one. If an opponent is winning with trump and you can beat that trump, you must do so. You do not have to beat your partner's winning trump.
- The winner of each trick leads the next trick.
- Any player can request to review the previous overturned trick, up until the current trick has been flipped over.

## 5. Declarations — 20s and 50s ("Trick Cards")

- A 3-card consecutive run in the same suit, referred to as a "tertz", is worth 20 points.
- A 4-card or longer consecutive run in the same suit, referred to as a "fifty", is worth 50 points.
- Sequence order is: Ace–King–Queen–Jack–10–9–8–7.
- Declarations must be called before the first trick is picked up/cleared from the table. If not called in time, they are void. It's up to the player's discretion when they show the declaration as long as it's done so before the first trick has been overturned.
- If only one team has declarations, that team scores its valid declarations.
- If both teams have declarations, compare the best declaration on each team. A 50 beats a 20. If both are the same size, the declaration with the higher top card wins.
- Only the team with the highest qualifying declaration scores its declarations.
- Exact-equal declaration house rule: identical declarations cancel each other. If there is a nomination for objection with a second, the rule will come under group vote.

## 6. Bella

- King + Queen of trump is Bella and is worth 20 points.
- Bella is separate from the 20/50 declaration comparison.
- In this version, simply holding both cards is not enough. For Bella to count, your team must win at least one trick containing either the trump King or the trump Queen. Your team must call Bella before the last Queen or King book is taken, even if you lose the book. You cannot call Bella at the end of the game or after the last time you put down your Queen or King.
- Calling Bella at least once before winning a trick with either a Queen or King, is enough to earn the points.
- If the opposing team captures both the trump King and trump Queen when they are played, Bella is void and scores 0.

## 7. Winning a Hand and Bates

- At the end of the hand, total the trick/card points, the 10-point last trick, and any valid Bella/declaration points.
- The team that chose trump must finish with more points than the defending team to make the contract.
- If the team that chose trump finishes with fewer points, that team receives 1 bate and the opposing team takes all of the points.
- Bates carry from hand to hand.
- When a team receives its 3rd bate, subtract 100 points from that team's game score, then reset that team's bate count to 0.
- When counting points, round down on a 5 and up on a 6. For example, if points counted is 94, round down to a 90. If points counted is 96, round up to 100.
- For simplicity sake, points can be rounded to the nearest ones or tens. For example, 94 points becomes 9, 126 points becomes 13.

**Example:** Team A has 420 points and 2 bates. Team A chooses trump and loses the hand. That is its 3rd bate, so Team A drops to 320 points and its bate counter resets to 0.

## 8. Complete Shutout — Minus 100

- If one team wins every trick and the other team does not pick up a single trick, the shut-out team loses 100 points from its game score.
- The winning team does NOT receive an extra 100-point bonus; it scores the hand normally.
- This is a separate -100 rule from the 3-bate penalty.

## 9. Tie Hand

A tie hand is not settled like a normal hand. The result remains tied and the next hand determines what happens to those points.

For the tie rule, use this sequence:

1. A hand ends both teams having the same number of points.
2. Treat the two shares as unresolved/held. Do not permanently assign the total points yet.
3. Dealer rotates normally to the next player.
4. Play the next hand normally. For purposes of resolving the prior tie, the team that finishes this new hand with more points is the winner of the resolving hand (i.e., if the team that played the trump in the prior hand wins, they get the points they won in both hands. If it loses, then it loses the points in the prior hand and is bated).

**Important:** the points in a tie should be considered pending until the following hand establishes which of the two scenarios applies.

## 10. Winning the Game

- The first team to reach the agreed target — 501 (51) or 1001 (101) — wins the game, after all scoring, bate penalties, shutout penalties, and any pending ties are resolved.

## Quick Reference

- Trump: J → 9 → A → 10 → K → Q → 8 → 7
- Non-trump: A → 10 → K → Q → J → 9 → 8 → 7
- Bella: K + Q of trump = 20, but your team must pick up at least one of those cards in a won trick.
- 3-card run = 20; 4+ card run = 50.
- Dealer is forced to choose trump on the second pass if no one else chooses.
- You must overtrump an opponent when required, but you do not have to overtrump your partner.
- Losing after choosing trump = 1 bate.
- 3 bates = -100 points.
- Complete shutout = -100 points to the shut-out team.
- Same number of points on both teams = pending tie; the next hand resolves who receives those total points.

## Brooklyn Klabber Board

- Alex M. aka Big Al
- Alex G. aka Siska
- Eddie aka Fun Eddie
- Gennady aka Tarakan
- Igor aka Iggy
- Lenny aka Luna Park Lenny
- Leon aka Big Red
- Mike aka Wolfie
```

- [ ] **Step 2: Verify Markdown exists and has required headings**

Run:

```bash
test -f content/yentas-klabber.md
rg -n "^## " content/yentas-klabber.md
```

Expected: file exists; headings include History, `## 1.` through `## 10.`, Quick Reference, Brooklyn Klabber Board.

- [ ] **Step 3: Commit**

```bash
git add content/yentas-klabber.md
git commit -m "Add Yentas Klabber rules Markdown source from PDF"
```

---

### Task 2: Logo asset + anchor verifier

**Files:**
- Create: `assets/logo.png`
- Create: `scripts/verify-anchors.py`
- Test: `scripts/verify-anchors.py` (will fail until `index.html` exists — create stub check mode)

**Interfaces:**
- Consumes: source logo `2523931A-EFED-4CA0-8862-D6562A3E20B7.png`
- Produces: `assets/logo.png`; verifier that parses `index.html` for `nav.contents a[href^="#"]` and matching `id=` attributes

- [ ] **Step 1: Copy logo into assets**

```bash
mkdir -p assets
cp "2523931A-EFED-4CA0-8862-D6562A3E20B7.png" assets/logo.png
file assets/logo.png
```

Expected: PNG image file.

- [ ] **Step 2: Write failing verifier (expects index.html)**

Create `scripts/verify-anchors.py`:

```python
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
```

- [ ] **Step 3: Run verifier — expect FAIL (no index.html yet)**

```bash
python3 scripts/verify-anchors.py
```

Expected: `FAIL: missing .../index.html` (exit code 1).

- [ ] **Step 4: Commit**

```bash
git add assets/logo.png scripts/verify-anchors.py
git commit -m "Add logo asset and Contents anchor verifier"
```

---

### Task 3: `index.html` structure and full content

**Files:**
- Create: `index.html`
- Test: `scripts/verify-anchors.py`

**Interfaces:**
- Consumes: copy from `content/yentas-klabber.md`; logo at `assets/logo.png`; PDF at `Yentas%20Clabber.pdf.pdf`
- Produces: section ids exactly as listed in `REQUIRED_IDS` in `scripts/verify-anchors.py`; `<nav class="contents">` with hrefs to those ids (except `#contents` self); CTA `href="#contents"`

- [ ] **Step 1: Create `index.html`**

Create `index.html` with this structure and content (keep semantic HTML; classes used by CSS/JS in later tasks):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Yentas Klabber — Official Brooklyn Rules</title>
  <meta name="description" content="Official four-player partnership rules for Yentas Klabber, the Brooklyn house variant.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip-link" href="#contents">Skip to contents</a>

  <header class="hero" id="top">
    <div class="hero__inner">
      <img class="hero__logo" src="assets/logo.png" alt="Yentas Klabber official seal" width="320" height="320">
      <h1 class="hero__title">Yentas Klabber</h1>
      <p class="hero__tagline">Four-player partnership Brooklyn Klabber — the official house rules.</p>
      <p class="hero__cta-wrap">
        <a class="btn" href="#contents">Read the rules</a>
      </p>
    </div>
  </header>

  <nav class="contents" id="contents" aria-label="Table of contents">
    <h2 class="contents__title">Contents</h2>
    <ol class="contents__list">
      <li><a href="#history">History &amp; Origin of Yentas Klabber</a></li>
      <li><a href="#objective-and-setup">1. Objective and Setup</a></li>
      <li><a href="#card-ranking">2. Card Ranking and Point Values</a></li>
      <li><a href="#dealing-and-trump">3. Dealing and Choosing Trump</a></li>
      <li><a href="#playing-a-trick">4. Playing a Trick (aka “vzyatka”)</a></li>
      <li><a href="#declarations">5. Declarations — 20s and 50s (“Trick Cards”)</a></li>
      <li><a href="#bella">6. Bella</a></li>
      <li><a href="#winning-a-hand">7. Winning a Hand and Bates</a></li>
      <li><a href="#complete-shutout">8. Complete Shutout — Minus 100</a></li>
      <li><a href="#tie-hand">9. Tie Hand</a></li>
      <li><a href="#winning-the-game">10. Winning the Game</a></li>
      <li><a href="#quick-reference">Quick Reference</a></li>
      <li><a href="#brooklyn-klabber-board">Brooklyn Klabber Board</a></li>
    </ol>
  </nav>

  <main>
    <section class="section" id="history" tabindex="-1">
      <h2>History &amp; Origin of Yentas Klabber</h2>
      <!-- Paste paragraphs from content/yentas-klabber.md History section as <p> elements -->
    </section>

    <section class="section" id="objective-and-setup" tabindex="-1">
      <h2>1. Objective and Setup</h2>
      <ul><!-- bullets from Markdown --></ul>
    </section>

    <section class="section" id="card-ranking" tabindex="-1">
      <h2>2. Card Ranking and Point Values</h2>
      <!-- ranking copy + final trick note -->
    </section>

    <section class="section" id="dealing-and-trump" tabindex="-1">
      <h2>3. Dealing and Choosing Trump</h2>
      <ul><!-- bullets --></ul>
    </section>

    <section class="section" id="playing-a-trick" tabindex="-1">
      <h2>4. Playing a Trick (aka “vzyatka”)</h2>
      <ul><!-- bullets --></ul>
    </section>

    <section class="section" id="declarations" tabindex="-1">
      <h2>5. Declarations — 20s and 50s (“Trick Cards”)</h2>
      <ul><!-- bullets --></ul>
    </section>

    <section class="section" id="bella" tabindex="-1">
      <h2>6. Bella</h2>
      <ul><!-- bullets --></ul>
    </section>

    <section class="section" id="winning-a-hand" tabindex="-1">
      <h2>7. Winning a Hand and Bates</h2>
      <ul><!-- bullets --></ul>
      <p><!-- Example paragraph --></p>
    </section>

    <section class="section" id="complete-shutout" tabindex="-1">
      <h2>8. Complete Shutout — Minus 100</h2>
      <ul><!-- bullets --></ul>
    </section>

    <section class="section" id="tie-hand" tabindex="-1">
      <h2>9. Tie Hand</h2>
      <!-- intro + numbered ol + Important note -->
    </section>

    <section class="section" id="winning-the-game" tabindex="-1">
      <h2>10. Winning the Game</h2>
      <ul><!-- bullets --></ul>
    </section>

    <section class="section" id="quick-reference" tabindex="-1">
      <h2>Quick Reference</h2>
      <ul><!-- bullets --></ul>
    </section>

    <section class="section" id="brooklyn-klabber-board" tabindex="-1">
      <h2>Brooklyn Klabber Board</h2>
      <ul><!-- board members --></ul>
    </section>
  </main>

  <footer class="footer">
    <p>Yentas Klabber — established under the Brooklyn Klabber Board.</p>
    <p><a href="Yentas%20Clabber.pdf.pdf" download>Download the PDF rules</a></p>
  </footer>

  <script src="script.js" defer></script>
</body>
</html>
```

**Implementer requirement:** Replace every HTML comment with the full corresponding text from `content/yentas-klabber.md` (no omitted rules). Do not leave placeholder comments in the committed file.

- [ ] **Step 2: Run verifier — expect PASS**

```bash
python3 scripts/verify-anchors.py
```

Expected: `OK: 13 TOC links; 14 required ids present` (exit 0).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add index.html with Contents anchors and full rules content"
```

---

### Task 4: Brand CSS + responsive layout

**Files:**
- Create: `styles.css`
- Test: serve locally and check layout (manual + basic grep for CSS variables)

**Interfaces:**
- Consumes: classes/ids from `index.html` (`.hero`, `.contents`, `.section`, `.btn`, `.footer`)
- Produces: CSS variables `--navy`, `--gold`, `--cream`, `--red`, `--ink`; section highlight class `.section--flash` used by JS; `@media (max-width: 720px)` mobile rules; `@media (prefers-reduced-motion: reduce)` disables smooth scroll / transforms

- [ ] **Step 1: Write `styles.css`**

Create `styles.css` implementing:

```css
:root {
  --navy: #0c1c33;
  --navy-2: #152a4a;
  --gold: #c9a227;
  --gold-soft: #e0c56a;
  --cream: #f3ead3;
  --red: #9e1b2e;
  --ink: #e8dfc8;
  --muted: #b7a988;
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "Source Sans 3", "Segoe UI", sans-serif;
  --max: 42rem;
}

*, *::before, *::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  background: var(--navy);
  color: var(--ink);
}

body {
  margin: 0;
  font-family: var(--font-body);
  line-height: 1.65;
  background:
    radial-gradient(ellipse 120% 80% at 50% -10%, #243f6b 0%, transparent 55%),
    radial-gradient(ellipse 80% 50% at 100% 20%, rgba(201, 162, 39, 0.08), transparent 45%),
    linear-gradient(180deg, var(--navy) 0%, var(--navy-2) 40%, var(--navy) 100%);
  min-height: 100vh;
}

.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
  background: var(--gold);
  color: var(--navy);
  padding: 0.5rem 1rem;
  z-index: 100;
}
.skip-link:focus { left: 0.5rem; top: 0.5rem; }

.hero {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 2rem 1.25rem 3rem;
  border-bottom: 1px solid rgba(201, 162, 39, 0.35);
}

.hero__inner { max-width: 36rem; }

.hero__logo {
  width: min(72vw, 320px);
  height: auto;
  display: block;
  margin: 0 auto 1.25rem;
  filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.45));
  animation: logo-in 1s ease-out both;
}

.hero__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.4rem, 8vw, 3.75rem);
  letter-spacing: 0.02em;
  color: var(--cream);
  margin: 0 0 0.75rem;
  animation: rise-in 0.9s ease-out 0.15s both;
}

.hero__tagline {
  font-size: clamp(1rem, 2.8vw, 1.2rem);
  color: var(--muted);
  margin: 0 0 1.75rem;
  animation: rise-in 0.9s ease-out 0.28s both;
}

.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 600;
  text-decoration: none;
  color: var(--navy);
  background: linear-gradient(180deg, var(--gold-soft), var(--gold));
  border: 1px solid #a8841a;
  padding: 0.85rem 1.5rem;
  border-radius: 2px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  animation: rise-in 0.9s ease-out 0.4s both;
}
.btn:hover, .btn:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  filter: brightness(1.05);
  outline: none;
}

.contents, .section, .footer {
  width: min(100% - 2.5rem, var(--max));
  margin-inline: auto;
}

.contents {
  padding: 3.5rem 0 2rem;
  scroll-margin-top: 1rem;
}
.contents__title, .section h2 {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--gold-soft);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  margin: 0 0 1rem;
  border-bottom: 1px solid rgba(201, 162, 39, 0.28);
  padding-bottom: 0.4rem;
}
.contents__list {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: none;
}
.contents__list li { margin: 0; border-bottom: 1px solid rgba(243, 234, 211, 0.08); }
.contents__list a {
  display: block;
  padding: 0.85rem 0.25rem;
  color: var(--cream);
  text-decoration: none;
  transition: color 0.2s ease, padding-left 0.2s ease;
}
.contents__list a:hover,
.contents__list a:focus-visible {
  color: var(--gold-soft);
  padding-left: 0.4rem;
  outline: none;
}

.section {
  padding: 2.5rem 0;
  scroll-margin-top: 1rem;
  border-radius: 2px;
  transition: background-color 0.6s ease, box-shadow 0.6s ease;
}
.section--flash {
  background-color: rgba(201, 162, 39, 0.12);
  box-shadow: inset 0 0 0 1px rgba(201, 162, 39, 0.35);
}
.section ul, .section ol { padding-left: 1.2rem; }
.section li { margin-bottom: 0.55rem; }
.section p { margin: 0 0 1rem; color: var(--ink); }

.footer {
  padding: 3rem 0 4rem;
  border-top: 1px solid rgba(201, 162, 39, 0.28);
  color: var(--muted);
  font-size: 0.95rem;
}
.footer a { color: var(--gold-soft); }

@keyframes logo-in {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes rise-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 720px) {
  .hero { padding-top: 1.5rem; }
  .contents, .section, .footer { width: min(100% - 1.5rem, var(--max)); }
  .contents__list a { padding: 1rem 0.15rem; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .hero__logo, .hero__title, .hero__tagline, .btn { animation: none; }
  .btn:hover, .btn:focus-visible { transform: none; }
  .contents__list a { transition: none; }
  .section { transition: none; }
}
```

- [ ] **Step 2: Smoke-check CSS tokens exist**

```bash
rg -n "--navy|--gold|section--flash|prefers-reduced-motion|100dvh" styles.css
```

Expected: matches for each token/feature.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "Add navy/gold brand styles and responsive layout"
```

---

### Task 5: Scroll, hash, and highlight JS

**Files:**
- Create: `script.js`
- Test: logical review + optional local serve click-through

**Interfaces:**
- Consumes: `.contents a[href^="#"]`, `.section`, `.section--flash` from CSS
- Produces:
  - `prefersReducedMotion(): boolean`
  - `flashSection(el: Element): void` — adds `.section--flash` for ~900ms
  - `scrollToId(id: string, updateHash: boolean): void`
  - Click handler on Contents links; `hashchange` + initial `location.hash` handling

- [ ] **Step 1: Write `script.js`**

```javascript
(() => {
  const FLASH_MS = 900;
  const contents = document.querySelector("nav.contents");
  if (!contents) return;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const flashSection = (el) => {
    if (!el) return;
    el.classList.remove("section--flash");
    // force reflow so re-adding restarts transition
    void el.offsetWidth;
    el.classList.add("section--flash");
    window.clearTimeout(el._flashTimer);
    el._flashTimer = window.setTimeout(() => {
      el.classList.remove("section--flash");
    }, FLASH_MS);
  };

  const scrollToId = (id, updateHash) => {
    const target = document.getElementById(id);
    if (!target) return;
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    target.scrollIntoView({ behavior, block: "start" });
    if (updateHash) {
      history.pushState(null, "", `#${id}`);
    }
    flashSection(target);
    if (typeof target.focus === "function") {
      target.focus({ preventScroll: true });
    }
  };

  contents.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !contents.contains(link)) return;
    const id = decodeURIComponent(link.getAttribute("href").slice(1));
    if (!id) return;
    event.preventDefault();
    scrollToId(id, true);
  });

  const heroCta = document.querySelector('.hero a.btn[href="#contents"]');
  if (heroCta) {
    heroCta.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToId("contents", true);
    });
  }

  const onHash = () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id) return;
    // defer so layout is ready
    requestAnimationFrame(() => scrollToId(id, false));
  };

  window.addEventListener("hashchange", onHash);
  if (location.hash) onHash();
})();
```

- [ ] **Step 2: Confirm script wires required behaviors**

```bash
rg -n "section--flash|prefers-reduced-motion|pushState|scrollIntoView" script.js
```

Expected: all four patterns present.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Add smooth-scroll Contents navigation with section highlight"
```

---

### Task 6: Local verify, README, ship check

**Files:**
- Modify: `README.md`
- Test: `scripts/verify-anchors.py`; local static server smoke check

**Interfaces:**
- Consumes: complete site files from Tasks 1–5
- Produces: updated README describing the site and how to edit Markdown

- [ ] **Step 1: Update README**

Replace `README.md` with:

```markdown
# Yentas Klabber

Official Brooklyn four-player partnership rules site for **Yentas Klabber**.

- Live site: [yentasklabber.com](https://yentasklabber.com)
- Editable rules source: [`content/yentas-klabber.md`](content/yentas-klabber.md)
- Original PDF: [`Yentas%20Clabber.pdf.pdf`](Yentas%20Clabber.pdf.pdf)

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`, then:

```bash
python3 scripts/verify-anchors.py
```
```

- [ ] **Step 2: Run verifier (must PASS)**

```bash
python3 scripts/verify-anchors.py
```

Expected: `OK: ...` exit 0.

- [ ] **Step 3: Serve and smoke-check**

```bash
python3 -m http.server 8080
```

In a browser (or computer-use):

1. Hero shows logo + title + tagline + CTA
2. Click Contents → Bella; page scrolls and section flashes
3. Narrow viewport ~375px: no horizontal scroll; Contents tappable
4. Footer PDF link resolves

- [ ] **Step 4: Final commit + push**

```bash
git add README.md
git commit -m "Document site preview and Markdown editing workflow"
git push -u origin cursor/yentas-klabber-site-320c
```

---

## Spec coverage checklist (self-review)

| Spec requirement | Task |
|------------------|------|
| Static single-page HTML/CSS/JS | 3–5 |
| Logo in hero | 2, 3, 4 |
| Hero copy + CTA | 3, 4 |
| Contents after hero (not sticky) | 3 |
| Smooth scroll + highlight + hash | 5 |
| `prefers-reduced-motion` | 4, 5 |
| Full history + rules 1–10 + QR + Board | 1, 3 |
| Mobile-friendly | 4, 6 |
| Markdown editable source | 1 |
| PDF download retained | 3 |
| CNAME unchanged | (no task; do not modify) |
| Anchor integrity | 2, 3, 6 |
