# Design

Status: DRAFT. Written from Charlie's approved brief (24 Oct 2026) before the build. Replaces the Liquid Glass lock screen direction, which is preserved on the `aero-version` branch. Anything the build disproves gets corrected here, not defended.

## World: Smoked Glass and Chrome

A warm near-black body with brushed silver details, like a black-paint rangefinder camera: tight proportions, hairline rules, a precise grid. Clear glass appears on a few key surfaces only. Aero survives as small accents. The page is left-anchored and asymmetric, never centred on one axis.

| Element | Role | Where it appears |
|---|---|---|
| Near-black body | Base | Page ground and solid panels. Everything that is not listed as glass is solid |
| Liquid Glass | Key surfaces only | The nav, the hero Analyser panel, the CV viewer. Nothing else |
| Brushed chrome | Detail | 1px silver borders on glass panels and the primary button, version chip, hairline rules, input borders, focus ring |
| Aero | Accent | A thin highlight on the top edge of the nav, the Analyser panel, View CV and project windows. Window-style title strips on project cards |

Rangefinder influence means proportions and finish only. No fake leather, no viewfinder frames, no shutter sounds, no camera iconography.

## Hard rules

- No logos, names, icons or typefaces from Leica, Apple or Microsoft. Original CSS and SVG only.
- No cyan, no purple or blue gradients, no red, no gradient text.
- No glow, no coloured shadows, no side-stripe accent borders, no bounce or elastic easing.
- No glass on ordinary cards. No card inside a card. No row of three equal icon cards.
- One primary button on screen at a time (View CV). Everything else is a secondary button or a text link.
- Left-align headings, body, labels and metadata. Centre nothing without Charlie's approval.
- Small uppercase labels only for real metadata (versions, dates). Not above every heading.

## Grid

- Desktop: 12 columns, 1280px max content width, 24px gutters, 32px outer margins.
- The grid is visible: faint silver hairlines on the column edges in the page background (about 6% opacity). Content snaps to them.
- Tablet: 8 columns. Mobile: one left-aligned column, 16px margins, no guides.
- Section spacing varies on purpose. The hero runs tight into Projects, About gets a longer pause, Skills and Contact sit closer together.

## Layout

| Section | Columns | Composition |
|---|---|---|
| Nav (glass) | 1-12 | Name as text left. Projects, About, Skills, Contact as links, then View CV (primary). Mobile: name, View CV, menu. No floating bottom bar |
| Hero | 1-7 | Name, title sentence, short line, spec sheet (Availability, Certificates, Experience: label left, value right, hairlines between), View CV and a "Get in touch" text link |
| Hero | 8-12 | Analyser panel (glass) over a large outlined "3.0" in brushed chrome, so the glass has something to refract |
| Projects | 1-12 | Analyser at full width, solid, window framed, with a factual "How it was built" note |
| Projects | 1-8 + 9-12 | IT projects: write-up in 8 columns, spec column on the right |
| Projects | 6 + 6 | Software projects, window framed |
| About | 1-7 / 9-12 | Three paragraphs at reading width; Timeline as a hairline list |
| Skills | 1-3 / 4-12 | Group label left, hairline rows right. No chips, no icon tiles |
| Contact | 1-5 / 7-12 | Spec rows left, solid form panel right |
| Footer | 1-12 | Hairline rule above, small left-aligned text |

The hero is only as tall as its content; there is no empty gap below the first fold.

## Colour

Strategy: Restrained. Near-black and silvers, one muted warm accent (brass) used sparingly.

| Token | Value | Use | Contrast on ground |
|---|---|---|---|
| `--ground` | `#131211` | Page background | |
| `--raised` | `#1B1A18` | Solid panels | |
| `--panel` | `#24221F` | Window title strips, form panel | |
| `--text` | `#EDEBE6` | Body and headings | 15.7:1 |
| `--text-2` | `#B9B5AD` | Secondary text | 9.2:1 |
| `--meta` | `#8E8A83` | Dates and versions only | 5.4:1 (4.6:1 on panel) |
| `--chrome` | `#9C9891` | Silver details, focus ring, input borders | 6.5:1 |
| `--hairline` | `#3A3733` | Rules and grid lines (decorative) | |
| `--brass` | `#C4A06A` | View CV fill, active nav marker, rare markers | 7.6:1; ground text on brass 7.6:1 |

`prefers-contrast: more` raises hairlines to `--chrome` and `--meta` to `--text-2`.

## Type

| Role | Face | Rules |
|---|---|---|
| Display | Michroma (one weight) | Charlie's name and section headings only. Kept short. Must fit the full name at 360px wide |
| Everything else | Hanken Grotesk (variable) | Body, title sentence, spec sheets, buttons, labels, forms |

Both are SIL Open Font Licence faces, self-hosted from the project (no Google Fonts stylesheet), Latin subset, `font-display: swap`.

## Materials

- **Glass:** clear and refractive, `backdrop-filter` blur with a light saturation lift, a 1px chrome border and the Aero top-edge highlight. At most three glass layers on screen. Solid `--raised` fallback under `prefers-reduced-transparency` and when `backdrop-filter` is unsupported.
- **Brushed chrome:** a 1px repeating linear gradient in silvers on borders and small details. Flagged here as deliberate, because the detector may read it as a decorative gradient.
- **Aero top edge:** `inset 0 1px 0` white at low opacity. No gloss fills.
- **Project windows:** a title strip in `--panel` with the title and status, a hairline beneath, solid body. No window control buttons.

## Motion

Short and damped, like a focus ring turning. 140 to 220ms, `cubic-bezier(0.2, 0, 0, 1)`. No bounce, no elastic, no scroll-jacking. The signature is the focus ring: a 2px chrome ring that settles in on keyboard focus. Under `prefers-reduced-motion` all transitions are instant.

## Accessibility

WCAG 2.2 AA contrast (grey on black is checked token by token above), few `backdrop-filter` layers with solid fallbacks, `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast` support, semantic landmarks, visible keyboard focus, touch targets at least 44px.

## Copy

- Use specifics already on the site: VantageUAV, home lab since 2022, Google IT Support certificate, A+ exam ready. Do not invent facts, dates or numbers.
- No "X & Y" pairs and no "From X to Y" structures.
- Banned words: enthusiast, passionate, journey, leverage, seamless, cutting-edge.
- No three-item lists of phrases, no "not just X but Y", no closing lines that sum things up. Mix sentence lengths.
- British English. No em dashes. No emojis.
- The Analyser's "How it was built" note states the stack, what Charlie decided and what AI was used for, from Charlie's own account only.
