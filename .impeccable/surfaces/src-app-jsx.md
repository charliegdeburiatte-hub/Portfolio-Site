---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

# Surface brief: home (single page)

Mode: Persuade. Audience: recruiters and hiring managers for IT support roles, skimming in about 30 seconds, often on a phone; freelance clients second. Action: open the CV. Proof: Job Application Analyser v3.0.0 (live app and code), A+ exam ready, Google IT Support, Tier 1-2 at VantageUAV.

Approved content decisions: 2026-10-09: remove "Professional Portfolio Website" from the page; remove footer status text and version label; CV is a PDF view with PDF and Word downloads. 2026-10-29 (BRIEF CHANGES v2): projects are plain rows (name, one line, year, links); the hero spec table becomes two sentences of prose; no version meta strings, uppercase labels or link arrows. 2026-10-30: silver chrome as hard requirements S1 to S6 in DESIGN.md; mid silver for dividers on panels and glass.

Build path: code-led (no image generation available). The Analyser screenshot (`src/assets/analyser.png`) is owner-supplied; a labelled placeholder stands in until then.

Unresolved: copy drafted for v2 awaits approval; the screenshot is missing; the scale numerals go in the arrange step.

## Direction contract

THESIS: A precision instrument, not a dark portfolio template. Leica black paint and silver chrome on black iPhone glass. It refuses the split hero over a card grid, black-and-gold, and anything centred.

OWN-WORLD: Cool black ground #0E0E0F with a faint vulcanite grain; glass on three surfaces only (nav, Analyser panel, CV viewer) with a fading chamfer and darker bevel edge; polished silver chrome (#F2F4F6 to #9DA2A8 to #5C6065) as the nav band, View CV bezel, panel frames and nameplate edge; an engraved scale on the grid; one knurled dial; one red dot.

STORY: The visitor reads the name on its plate, the one sentence about how Charlie works and the availability, sees the Analyser under glass and can open it from the dial, then taps View CV. Below, projects are plain rows, IT work first.

FIRST VIEWPORT: Glass nav with a silver band; chrome View CV top right. Engraved scale across the grid. Nameplate in columns 1 to 8 at full display scale; the Analyser screenshot in 9 to 12, running down behind the glass Analyser panel (6 to 12), which overlaps the plate's lower right edge. Headline, prose and secondary View CV in 1 to 5.

FORM: Instrument panel: full-width asymmetric 12-column grid where each section starts on its own column (1, 4, 2, 1, 4). Set by the owner's brief, not drawn from the form list, so there is no seed key.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
