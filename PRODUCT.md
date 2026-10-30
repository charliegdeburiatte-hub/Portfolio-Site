# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers filling IT support roles. They skim fast, often on a phone, and decide within about 30 seconds whether to open the CV. They need the role, the experience, the location, the CV and one piece of proof.

Secondary: potential freelance clients looking for a small website or tool. They want to see finished, working things they can click.

## Product Purpose

The personal portfolio of Charlie De Buriatte, live at charliedeburiatte.com. It exists to get Charlie hired into an IT support role, with web development work as supporting evidence. Success means a recruiter can name the role Charlie wants and open the CV within one click from anywhere on the site.

## Positioning

IT support first. Charlie is an IT Support Specialist (Google IT Support Professional Certificate, CompTIA A+ exam ready but not yet taken, Tier 1-2 support at VantageUAV) who also builds and ships real AI-assisted tools. The projects prove Charlie goes further than the role asks; they do not reposition Charlie as a web developer.

Self-taught. Currently studying Network+ and AWS, the two the Skills section lists. (The data's status line also names AI application development, which the site does not show.) Job hunting in IT support and web development, open to freelance projects.

## Operating Context

- Single-page site with these sections, which must stay: Projects, About, Skills, Contact, CV.
- Projects and CV must be reachable in one click from anywhere on the site, including on mobile. Known gap: on phones Projects sits inside the menu, so it takes two taps. View CV is one tap at every width.
- CV: view the PDF (`public/cv.pdf`) in a modal; offer both PDF and Word (`public/Charlie_De_Buriatte_CV.docx`) downloads.
- Contact form plus email, GitHub and LinkedIn. The phone number is in the data but is deliberately not shown.
- Location: Looe, Cornwall. Remote preferred.

## Capabilities and Constraints

- Stack stays as is: Vite, React 19, Tailwind CSS 4, lucide-react. Deployed to Vercel by pushing to `main` on GitHub (`charliegdeburiatte-hub/Portfolio-Site`); never deploy with the Vercel CLI.
- All content lives in `src/CONTENT_DATA.json`. Keep every existing claim and piece of copy unless Charlie approves a change.
- Do not invent projects, qualifications, numbers, testimonials or clients.
- Performance budget: fast load, no large image or font payloads, no layout shift.
- The Konami-code BIOS easter egg (`src/components/EasterEggs.jsx`) is existing personality; keep unless Charlie says otherwise.

## Brand Commitments

- Tagline: rewritten on 28 Oct 2026 to "Most of what I know came from fixing real faults, at work and in my home lab.", which meets the writing rules below. The `instrument` hero does not show it: the headline is followed by two sentences of prose drafted for v2, still waiting for Charlie's approval in the copy pass.
- Role title in data: "IT Support Specialist". The hero line under the name is Charlie's chosen sentence: "I start with the simple checks and keep going until the fault makes sense."
- Writing: British English throughout. No em dashes anywhere, in copy, code comments or commit messages. Plain and direct, first person where it suits. No filler, no inflated language. Avoid "X & Y" title pairs, "From X to Y" structures, three-item lists of phrases, "not just X but Y", summing-up closing lines, and the words enthusiast, passionate, journey, leverage, seamless and cutting-edge. Mix sentence lengths. No emojis.
- Voice reference: the main written sample is Charlie's own three About answers (why IT support, the VantageUAV Outlook fix, the portfolio), in `bio.medium`. Beyond that, the reference is how Charlie actually talks. Short, direct sentences, casual and honest, a bit of dry humour, no corporate polish. Real examples: "I guess I installed it locally to one project then." / "Go with lock screen. This is the neat part: I don't have a writing sample." Site copy should read like Charlie explaining something out loud to a hiring manager, tidied for spelling and grammar only. Existing copy in `CONTENT_DATA.json` stays the factual baseline.
- Visual direction is set by Charlie and binding: Instrument, Leica black and silver chrome, never black and gold. Cool black glass, polished silver chrome on the controls and frames, glass on three surfaces only, and a few Leica details that each do a job. No brass on controls. Original CSS and SVG only; no Leica, Apple or Microsoft logos, icons, names or typefaces. Details and the checkable silver requirements belong in DESIGN.md. Earlier builds are kept on branches: the Aero lock screen on `aero-version`, the warm smoked glass on `smoked-glass`.

## Evidence on Hand

From `src/CONTENT_DATA.json`:

- **Flagship:** Job Application Analyser v3.0.0. A privacy-first web app that scores your CV and then writes your cover letter. GitHub and live demo links exist. The design must make this stand out.
- **Other projects shown on the site**, in page order:
  - IT and infrastructure: Home Lab Infrastructure, Intel 13th Gen Platform Investigation, Outlook Not Sending or Receiving (the VantageUAV fix), Custom PC Build. None has a link.
  - Other software: The Freddo Index (GitHub), Interview Help v1.0.0 (GitHub), Client Portfolio Site (anonymised, no links), Hjelply: Community Support Platform (paused, GitHub).
- **In the data but not shown:** Professional Portfolio Website, removed from the page by Charlie's decision of 9 Oct 2026.
- **Experience:**
  - IT Technician at VantageUAV, Sep 2021 to Mar 2022: Tier 1-2 support for 25+ remote staff, hardware diagnostics, Microsoft 365.
  - Telephone Interviewer at IFF Research, Sep 2019 to Oct 2020.
- **Certifications:** Google IT Support Professional Certificate (2025). CompTIA A+ is exam ready, not yet taken; never present it as passed.
- **Absent, never fabricate:**
  - testimonials
  - client names (the client project is anonymised on purpose)
  - metrics beyond those in the data
  - product screenshots (none in the repo yet; the hero shows a labelled placeholder until `src/assets/analyser.png` is supplied)

Known copy issues to raise with Charlie, not fix silently:

- The About text says "I've replaced the filler with my own words and photos", but the site has no photos.
- The last About paragraph ends on a summing-up line ("It taught me that the skill is knowing what good looks like..."), which the writing rules ban. It is Charlie's own sentence.
- Copy drafted for v2 and not yet approved: the two hero sentences, the Projects intro and the dial label "Score a CV".
- The placeholder caption "Analyser screenshot goes here: src/assets/analyser.png" is visible on the live page until the real screenshot is added.
- Seven projects show no year, because the data gives none. Only the Analyser, the home lab and the Outlook fix have one.

Resolved since the last version of this list: the Hjelply title no longer has an em dash, and the footer no longer shows status text or a version. The BIOS easter egg still says v3.0, kept under Charlie's easter egg ruling.

## Product Principles

1. A recruiter skimming for 30 seconds leaves knowing the role and holding the CV.
2. IT support evidence comes before development evidence; projects show range, not a career change.
3. Proof over claims: every project that has a link shows it.
4. Nothing on the page is invented; every fact traces to the content data or Charlie.
5. Legibility and speed are never traded away for effect.

## Accessibility & Inclusion

- WCAG 2.2 AA contrast for all text. Body text sits on solid or heavily blurred surfaces, never directly on busy translucent backgrounds.
- Respect `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast`.
- Mobile first, fully responsive, semantic HTML with landmarks, visible keyboard focus, touch targets at least 44px.
