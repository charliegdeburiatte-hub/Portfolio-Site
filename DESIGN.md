# Design

Status: DRAFT, written before the build to record the approved direction and tokens. Impeccable's documenter rewrites this file from the finished build; anything here that the build disproves gets corrected then, not defended.

## World

Liquid Glass lock screen. The site opens like a phone you have just picked up: the name sits where the clock would, widgets state the role and availability, and the top notification is the flagship project. Below the first viewport, projects open as windows.

Three eras, deliberately unequal:

| Era | Share | Where it appears |
|---|---|---|
| Apple Liquid Glass | Base, roughly 70% | Backdrop field, nav bar, widgets, notification stack, section surfaces, grouped skills lists, specular light |
| Windows 7 Aero | Accent | Window chrome on project windows and the CV viewer: glossy title bars, soft edge glow, glass reflection; focus glow |
| iPhone 4 skeuomorphism | Accent | Tactile controls only: glossy pill buttons, the Glass effects switch, inset form fields, linen on the hero dock, brushed metal rims |

Rule of thumb: Liquid Glass is the material, Aero frames things you open, iPhone 4 is anything you press.

## Deliberate choices (not accidents)

Gloss, gradients, translucency, inner highlights and textured surfaces are intentional and come from the brief. Impeccable's detector flags several of these patterns by default (glassmorphism, gradient fills, decorative glow). Each override is listed here with its justification, and any new one gets raised with Charlie rather than silently toned down.

- **Glass surfaces:** the core material of the pinned world. Text never sits directly on a translucent surface over busy content; body copy lives on near-solid frost (at least 88% opaque).
- **Gradient backdrop:** this is the field the glass refracts. It is one owned hue (lagoon), not a decorative rainbow.
- **Glossy buttons and title bars:** iPhone 4 and Aero signatures, limited to controls and window chrome.
- **Textures:** linen and brushed metal are generated in CSS/SVG at under 1 KB each. No raster textures.

No Apple or Microsoft logos, icons, wallpapers, font files or screenshots. Everything is original CSS, SVG and project assets.

## Colour

Strategy: Committed. One owned lagoon hue floods the backdrop; the glass and ink are tinted from it; amber is the single warm accent for the primary action and the flagship.

| Token | Value | Use |
|---|---|---|
| `--field-deep` | `#08485F` | Backdrop base, top of page behind the name |
| `--field` | `#0A5C78` | Backdrop body |
| `--field-lit` | `#39B6D8` | Light pool in the backdrop. Never behind text |
| `--field-glow` | `#A8E6F5` | Specular streak and highlights |
| `--frost` | `#F4F7FA` | Glass surface tint; solid fallback |
| `--frost-alpha` | `rgb(244 247 250 / 0.88)` | Text-bearing glass |
| `--frost-thin` | `rgb(244 247 250 / 0.55)` | Non-text glass (nav, dock, chrome) |
| `--ink` | `#0D1B26` | Body text (16.3:1 on frost) |
| `--ink-muted` | `#3D5566` | Secondary text (7.3:1 on frost) |
| `--link` | `#08607D` | Links on frost (6.6:1) |
| `--on-field` | `#FFFFFF` | Text on the field (7.5:1 on `--field`, 10:1 on `--field-deep`) |
| `--on-field-muted` | `#D8F1FA` | Secondary text on the field (6.4:1) |
| `--amber` | `#E8A33D` | Primary button and flagship accent, ink text on it (8.1:1) |
| `--amber-hi` | `#F2C46B` | Top of the amber gloss |

No dark theme: the field is already a deep colour and the scene (recruiters at a desk in daylight, or on a phone) is served by one theme.

## Type

System stack, no web font download:
`-apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", "Segoe UI", system-ui, Roboto, "Helvetica Neue", Arial, sans-serif`

This is the honest face of both eras: SF on Apple devices (Liquid Glass's own typeface), Segoe UI on Windows (Aero's own typeface). It also costs zero bytes. The name uses `ui-rounded` first where available, for the lock-screen clock feel.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Name (clock) | `clamp(3.25rem, 11vw, 8rem)` | 600 | Tight tracking `-0.03em`, line-height 0.95 |
| H2 section | `clamp(1.75rem, 4vw, 2.5rem)` | 650 | |
| H3 window title | 1.125rem | 600 | |
| Body | 1.0625rem (17px) | 400 | Line-height 1.55, max 68ch |
| Small / label | 0.8125rem (13px) | 500 | Only on solid frost, never on the field |

## Spacing, radius, depth

- **Spacing:** 4px base. Scale 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. More space above a heading than below it.
- **Radius (concentric: an inner radius equals the outer radius minus padding):**
  - Widgets 28px
  - Notification 24px
  - Section surfaces 32px
  - Aero windows 12px
  - Inputs 12px
  - Pill buttons 999px
- **Blur tiers:**
  - `--blur-chrome: 20px` with saturate 160% (nav, dock)
  - `--blur-panel: 28px` with saturate 140% (hero widgets, notification)
  - Lower content surfaces use near-solid frost with no `backdrop-filter`. The field behind them is a smooth gradient, so a blur would cost GPU and show nothing.
- **Budget:** no more than 4 `backdrop-filter` layers on screen at once. Each has a solid `--frost` fallback via `@supports not (backdrop-filter: blur(1px))`.
- **Shadows:**
  - Glass: `inset 0 1px 0 rgb(255 255 255 / 0.65), 0 2px 6px rgb(5 40 60 / 0.12), 0 12px 32px rgb(5 40 60 / 0.18)`
  - Skeuo button: top gloss half, `inset 0 1px 0` highlight, 1px darker bottom edge, short drop shadow
  - Aero title bar: vertical gloss from `rgb(255 255 255 / 0.7)` to `rgb(168 230 245 / 0.35)`, with a 1px inner white rim and a soft outer glow

## Motion

- **Signature:** specular light. One rAF-throttled pointer listener writes `--lx`/`--ly`; glass surfaces read them for a soft radial highlight, so light responds to movement. No gyroscope.
- **On load:** the flagship notification arrives from the top once, and the widgets settle.
- **Scroll:** a single light streak runs down the page as the reading spine.
- **`prefers-reduced-motion`:** no arrival, static highlight, static streak.

## Preferences and fallbacks

- `prefers-reduced-transparency`, or the on-page Glass effects switch set to off: every glass surface becomes solid `--frost` and blur is disabled.
- `prefers-contrast: more`: solid surfaces, 1px `--ink` borders, no gloss on controls, underlined links.
- Focus: a 2px solid `--ink` outline with a 2px offset, plus a soft Aero cyan glow. The glow never replaces the outline.
- Touch targets: at least 44px.
