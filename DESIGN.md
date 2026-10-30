# Design

Status: DRAFT. Direction from BRIEF CHANGES v2 (29 Oct 2026), with the silver chrome tightened into the checkable requirements below (30 Oct 2026). Stages 1 and 2 (30 Oct 2026, commits 23f730e and b6e4ffb) meet S1 to S6 at 390, 1440, 1920 and 2560px: the whole Analyser panel and its frame are in the first screen at every width, and a 1px `--silver-lo` rule sits above the headline. Charlie approved the layout stage and the plate's role line on 30 Oct 2026. This stays a draft until the copy and content stage (Stage 3) is approved, since it changes what the hero shows. Replaces the warm smoked glass and brass direction on `smoked-glass`, which replaced the Aero lock screen on `aero-version`. Anything the build disproves gets corrected here, not defended.

## World: Instrument

Leica black and silver chrome, never black and gold. Black iPhone 4 and 5 hardware leads: glossy black glass, a polished steel bevel with a thin bright chamfer line. Crisp, neutral and cool. The silver has to read at a glance on the first screen, not as a faint line you have to look for. Leica rangefinder details are the accent, each one doing a job: an engraved scale, one knurled dial, a red dot, a vulcanite grain. Never warm, never brass, never brown. The page spans the full 12-column grid and nothing is centred.

| Element | Role | Where it appears |
|---|---|---|
| Black ground | Base | Page ground, with the grain on it. Everything not listed as glass is solid |
| Glass | Three surfaces only | The nav, the hero Analyser panel, the CV viewer |
| Silver chrome | Finish | The nav finish, the View CV bezel, the frames on the Analyser panel and CV viewer, the nameplate edge and the dividers. Hard requirements S1 to S6 below |
| Engraved scale | Accent 1 | Along the top edge of the grid: a major tick on every column, minor ticks between. No numbers |
| Knurl | Accent 2 | The rim of the score dial on the Analyser panel. One control only |
| Red dot | Accent 3 | The Analyser's status dot and the focus ring. Under 1% of any screen |
| Grain | Accent 4 | A pebble texture on the ground at 3.5% opacity, in neutral grey |

No Leica name or logo, no script lettering, no brown leather colour, no viewfinder frames, no shutter sounds.

## Silver chrome: hard requirements

Each requirement passes or fails on what renders, checked at 390, 1440, 1920 and 2560px wide. S1 to S4 and S6 must be visible in the first screen, before any scrolling. The silver tokens are `--silver-hi` `#F2F4F6`, `--silver` `#9DA2A8` and `--silver-lo` `#5C6065`. A "silver gradient" runs from `--silver-hi` through `--silver` to `--silver-lo`, light at the top or top left, dark at the bottom or bottom right.

| ID | Requirement | Pass when |
|---|---|---|
| S1 | Silver nav finish | The nav carries a silver band at least 3px thick along its bottom edge, drawn with the silver gradient. A flat grey line or a 1px rule fails |
| S2 | Chrome bezel on View CV | The primary View CV button has a bezel at least 1px wide in the silver gradient around its whole edge, separate from its fill, light on the top edge and dark on the bottom. Its fill is silver, never brass or gold |
| S3 | Silver frame on the Analyser panel | A 2px frame in the silver gradient, light at the top left to dark at the bottom right, on all four edges of the panel |
| S4 | Silver frame on the CV viewer | The same 2px light-to-dark silver frame on all four edges, when the viewer is open |
| S5 | Silver hairline dividers | Rules that divide content (section dividers, the footer rule, form field borders) are 1px silver with at least 3:1 against whatever they sit on: `--silver-lo` on the ground (3.05:1), `--silver` on the panel and glass (`--silver-lo` is only 2.72:1 there, so it fails). At least one silver divider is visible in the first screen. `--rules` `#2E3033` is for decorative lines only and is not a divider |
| S6 | Silver in at least four components | At least four separate components on the first screen use a silver token: the nav (S1), View CV (S2), the Analyser panel (S3) and the nameplate edge |

No brass, gold or warm metal on any control. The engraved scale, the knurl and the anodised icons stay in `--anodised`; they are not the silver finish and do not count towards S6.

## Hard rules

- Exact colour tokens only (below). Brass `#C4A06A` and every warm hue are banned, including the BIOS easter egg. No brass, gold or warm metal on any control.
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

Every section starts on column 1, the hero's left edge, so the page reads down one line (Charlie's ruling of 30 Oct 2026, replacing v2's staggered start columns). The right-hand spans vary by section.

| Section | Start | Composition |
|---|---|---|
| Nav (glass) | 1 | Name as text left; Projects, About, Skills, Contact; View CV (primary). Phone: name, View CV, menu |
| Scale | 1-12 | Engraved ticks under the nav, no numbers. Desktop only |
| Hero | 1 | Nameplate in columns 1-8, the name on one line from 1024px. The screenshot fills columns 7-12 behind the plate's right end, taking its height from the grid. The glass Analyser panel covers the screenshot across the same columns 7-12 (6-12 from 1800px, so the gap to the hero text stays short), so it is always over image, and overlaps the plate by 2.5rem inside the plate's 3rem bottom padding. A 1px `--silver-lo` rule, then the headline, prose, View CV (secondary) and Get in touch in 1-5. Phones: plate, rule and headline, then the screenshot and panel sharing one cell, then the prose |
| Projects | 1 | Plain rows: name and one line in 1-8, year in 9-10, links in 11-12. The Analyser row carries the How it was built note. No boxes, no status dots |
| About | 1 | Three paragraphs in 1-6, the timeline in 9-12 |
| Skills | 1 | Group name in 1-3, items running on as wrapped text across 4-12 |
| Contact | 1 | Contact lines in 1-5, a solid form panel in 7-12 |
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
| `--silver-hi` | `#F2F4F6` | Light end of the silver gradient, top highlights | 17.5:1 |
| `--silver` | `#9DA2A8` | Mid silver, View CV fill | 7.5:1; ground lettering on it 7.5:1 |
| `--silver-lo` | `#5C6065` | Dark end of the gradient, silver dividers on the ground (S5) | 3.05:1 (2.72:1 on panel, so not for dividers there) |

`prefers-contrast: more` raises the guides, turns glass solid with an anodised border, and lifts borders and the scale to the text colours.

## Type

| Role | Face | Rules |
|---|---|---|
| Display | Michroma (one weight) | Charlie's name and section headings only. Kept short. Fits the full name at 360px wide |
| Everything else | Hanken Grotesk (variable) | Body, headline, buttons, labels, forms, scale numerals |

Both are SIL Open Font Licence faces, self-hosted from the project (no Google Fonts stylesheet), Latin subset, `font-display: swap`. Tailwind's default `--font-sans` is replaced, so no system font stack reaches any element.

## Materials

- **Glass:** `backdrop-filter: blur(16px) saturate(115%)` over `--panel` at 52%. A 1px chamfer along the top edge fading from `rgba(255,255,255,0.28)` to transparent, a faint diagonal specular, and a darker bottom edge for the bevel. The Analyser panel and CV viewer also carry the 2px silver frame (S3, S4); the nav carries the 3px silver band (S1). Solid `--raised` fallback under `prefers-reduced-transparency`, the footer's Glass effects switch, and when `backdrop-filter` is unsupported.
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
