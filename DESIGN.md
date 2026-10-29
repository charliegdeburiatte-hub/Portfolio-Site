# Design

Status: built from BRIEF CHANGES v2 (29 Oct 2026) on the `instrument` branch. Replaces the warm smoked glass and brass direction on `smoked-glass`, which replaced the Aero lock screen on `aero-version`. Anything the build disproves gets corrected here, not defended.

## World: Instrument

Black iPhone 4 and 5 hardware leads: glossy black glass, a polished steel bevel with a thin bright chamfer line. Crisp, neutral and cool. Leica rangefinder details are the accent, each one doing a job: an engraved scale, one knurled dial, a red dot, a vulcanite grain. Never warm, never brass, never brown. The page spans the full 12-column grid and nothing is centred.

| Element | Role | Where it appears |
|---|---|---|
| Black ground | Base | Page ground, with the grain on it. Everything not listed as glass is solid |
| Glass | Three surfaces only | The nav, the hero Analyser panel, the CV viewer |
| Chrome gradient | Polish | The primary button (View CV) and the nameplate edge. Nowhere else |
| Engraved scale | Accent 1 | Along the top edge of the grid: a numbered major tick on every column, minor ticks between |
| Knurl | Accent 2 | The rim of the score dial on the Analyser panel. One control only |
| Red dot | Accent 3 | The Analyser's status dot and the focus ring. Under 1% of any screen |
| Grain | Accent 4 | A pebble texture on the ground at 3.5% opacity, in neutral grey |

No Leica name or logo, no script lettering, no brown leather colour, no viewfinder frames, no shutter sounds.

## Hard rules

- Exact colour tokens only (below). Brass `#C4A06A` and every warm hue are banned, including the BIOS easter egg.
- Red only for the status dot and the focus ring. Never on buttons or headings.
- Nothing centred: no `text-align: center`, no centred headings or blocks, no centred column. Browsers centre button labels by default, so `button` is reset to `text-align: start`.
- No tracked uppercase labels, no meta strings such as "V3.0.0 · MAR 2026", no arrows on links, no ghost or outline numerals.
- No hairline spec tables. No bordered project cards or title bars.
- One primary button on screen at a time (View CV in the nav). Everything else is a secondary button or a text link.
- No glow, no coloured shadows, no side-stripe borders, no bounce or elastic easing, no gradient-filled text.

## Grid

- 12 columns at 1024px and up, 8 from 640px, one left-aligned column on phones.
- Full width: no maximum content width. Outer margins 32px desktop, 24px tablet, 16px phone; gutters 24px, 20px, 16px. At 1440px content spans 95% of the viewport.
- The responsive margin and gutter overrides sit outside `@layer base`. Inside it they lost to the unlayered `:root` defaults and never applied.
- Faint column guides (7% anodised) sit behind everything on tablet and desktop. The engraved scale marks the same columns along the top.

## Layout

Each section starts on a different column, so the grid shows by what hangs off it.

| Section | Start | Composition |
|---|---|---|
| Nav (glass) | 1 | Name as text left; Projects, About, Skills, Contact; View CV (primary). Phone: name, View CV, menu |
| Scale | 1-12 | Engraved ticks and column numerals under the nav. Desktop only |
| Hero | 1 | Nameplate in columns 1-8. Screenshot in 9-12, running down behind the Analyser panel (glass, 6-12), which overlaps the nameplate's lower right edge. Headline, two sentences of prose, View CV (secondary) and Get in touch in 1-5 |
| Projects | 4 | Plain rows: name and one line, year, links. The Analyser row carries the How it was built note. No boxes, no status dots |
| About | 2 | Three paragraphs in 2-7, the timeline in 9-12 |
| Skills | 1 | Group name in 1-3, items running on as wrapped text across 4-12 |
| Contact | 4 | Contact lines in 4-7, a solid form panel in 8-12 |
| Footer | 1-12 | A rule above, small left-aligned text |

The hero runs tight into Projects; About gets a longer pause; Skills and Contact sit closer together.

## Colour

| Token | Value | Use | Contrast on ground |
|---|---|---|---|
| `--ground` | `#0E0E0F` | Page background | |
| `--panel` | `#1A1B1D` | Nameplate, form panel, glass tint | |
| `--raised` | `#232427` | Solid fallback for glass, dial face rim | |
| `--rules` | `#2E3033` | Rules and borders (decorative) | 1.5:1 |
| `--text` | `#E6E8EA` | Body and headings | 15.7:1 (14.0:1 on panel) |
| `--text-2` | `#A3A7AC` | Secondary text | 8.0:1 (7.1:1 on panel) |
| `--anodised` | `#8A8D91` | Scale ticks, icons, field and secondary button borders, timeline dates | 5.8:1 (5.2:1 on panel) |
| `--red` | `#D6232A` | Status dot and focus ring only | 3.8:1, above the 3:1 needed for non-text |
| Chrome | `#F2F4F6` to `#9DA2A8` to `#5C6065` | Primary button, nameplate edge | Ground lettering on the mid tone 7.5:1 |

`prefers-contrast: more` raises the guides, turns glass solid with an anodised border, and lifts borders and the scale to the text colours.

## Type

| Role | Face | Rules |
|---|---|---|
| Display | Michroma (one weight) | Charlie's name and section headings only. Kept short. Fits the full name at 360px wide |
| Everything else | Hanken Grotesk (variable) | Body, headline, buttons, labels, forms, scale numerals |

Both are SIL Open Font Licence faces, self-hosted from the project (no Google Fonts stylesheet), Latin subset, `font-display: swap`. Tailwind's default `--font-sans` is replaced, so no system font stack reaches any element.

## Materials

- **Glass:** `backdrop-filter: blur(16px) saturate(115%)` over `--panel` at 52%. A 1px chamfer along the top edge fading from `rgba(255,255,255,0.28)` to transparent, a faint diagonal specular, and a darker bottom edge for the bevel. Solid `--raised` fallback under `prefers-reduced-transparency`, the footer's Glass effects switch, and when `backdrop-filter` is unsupported.
- **Nameplate:** a steel plate in `--raised` to `--panel` with a 2px polished chrome edge (the chrome gradient through a mask). The lettering is flat `--text`, never gradient-filled.
- **Knurl:** two crossed repeating gradients at 45 and -45 degrees, masked to the dial's rim. Used once.
- **Scale:** 1px anodised ticks with a faint light edge below, as if cut into metal. Minor ticks repeat every quarter column step so they meet the majors exactly.
- **Grain:** an SVG fractal-noise tile in grey on a fixed layer at 3.5% opacity.
- **Screenshot:** the glass sits over `src/assets/analyser.png`. Until that exists, a labelled placeholder (`analyser-placeholder.svg`) stands in, with no invented score.

## Motion

Short and damped, like a focus ring turning. 140 to 220ms, `cubic-bezier(0.2, 0, 0, 1)`. No bounce, no elastic, no scroll-jacking. The focus ring is 2px red and settles in on keyboard focus. Under `prefers-reduced-motion` all transitions are instant.

## Accessibility

WCAG 2.2 AA contrast (checked token by token above), three `backdrop-filter` surfaces with solid fallbacks, `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast` support, semantic landmarks, visible keyboard focus, touch targets at least 44px.

## Acceptance checks

`npm run build && node scripts/check-v2.mjs` loads the built site at 1440px and 390px and prints PASS or FAIL for the measurable v2 tests: no `text-align: center`, no brass in the CSS, Analyser blur of 12px or more, content span of 85% or more, the name block on column 1, red under 1% of pixels, scale ticks on the columns, one knurl, grain at 4% or less, no warm pixels outside photographs, and only the two typefaces rendering text. It also checks there is no horizontal scroll.

## Copy

- Use specifics already on the site: VantageUAV, home lab since 2022, Google IT Support certificate, A+ exam ready. Do not invent facts, dates or numbers. Project years appear only where the content states them.
- No "X & Y" pairs and no "From X to Y" structures.
- Banned words: enthusiast, passionate, journey, leverage, seamless, cutting-edge.
- No three-item lists of phrases, no "not just X but Y", no closing lines that sum things up. Mix sentence lengths.
- British English. No em dashes. No emojis.
- The Analyser's "How it was built" note states the stack, what Charlie decided and what AI was used for, from Charlie's own account only.
