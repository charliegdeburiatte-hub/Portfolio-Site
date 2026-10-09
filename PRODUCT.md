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

IT support first. Charlie is an IT Support Specialist (CompTIA A+, Google IT Support Professional Certificate, Tier 1-2 support at VantageUAV) who also builds and ships real AI-assisted tools. The projects prove Charlie goes further than the role asks; they do not reposition Charlie as a web developer.

Self-taught. Currently studying Network+, AWS and AI application development. Job hunting in IT support and web development, open to freelance projects.

## Operating Context

- Single-page site with these sections, which must stay: Projects, About, Skills, Contact, CV.
- Projects and CV must be reachable in one click from anywhere on the site, including on mobile.
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

- Tagline: "From IT fundamentals to applied AI, built through real projects".
- Title in data: "IT Support Specialist & Systems Enthusiast".
- Writing: British English throughout. No em dashes anywhere, in copy, code comments or commit messages. Plain and direct, first person where it suits. No filler, no inflated language, no "passionate about" or "leveraging" style wording.
- Voice reference: Charlie has no written sample and composes by speech-to-text, so the reference is how Charlie actually talks. Short, direct sentences, casual and honest, a bit of dry humour, no corporate polish. Real examples: "I guess I installed it locally to one project then." / "Go with lock screen. This is the neat part: I don't have a writing sample." Site copy should read like Charlie explaining something out loud to a hiring manager, tidied for spelling and grammar only. Existing copy in `CONTENT_DATA.json` stays the factual baseline.
- Visual direction is set by Charlie and binding: Apple Liquid Glass as the base, Windows 7 Aero and iPhone 4 era skeuomorphism as deliberate accents. Recreated in original CSS, SVG and own assets; no Apple or Microsoft logos, icons, wallpapers or screenshots. Details belong in DESIGN.md.

## Evidence on Hand

From `src/CONTENT_DATA.json`:

- **Flagship:** Job Application Analyser v3.0.0. A privacy-first web app that scores your CV and then writes your cover letter. GitHub and live demo links exist. The design must make this stand out.
- **Other projects:**
  - The Freddo Index (GitHub, demo)
  - Interview Help v1.0.0 (GitHub)
  - Client Portfolio Site (anonymised, no links)
  - Hjelply, Community Support Platform (paused, GitHub)
  - Custom PC Build & Optimization
  - Intel 13th Gen Platform Investigation
  - Professional Portfolio Website
  - Home Lab Infrastructure
- **Experience:**
  - IT Technician at VantageUAV, Sep 2021 to Mar 2022: Tier 1-2 support for 25+ remote staff, hardware diagnostics, Microsoft 365.
  - Telephone Interviewer at IFF Research, Sep 2019 to Oct 2020.
- **Certifications:** Google IT Support Professional Certificate and CompTIA A+, both 2023-2024.
- **Absent, never fabricate:**
  - testimonials
  - client names (the client project is anonymised on purpose)
  - metrics beyond those in the data
  - product screenshots (none in the repo yet)

Known copy issues to raise with Charlie, not fix silently:

- The Hjelply title contains an em dash.
- The footer shows internal status text ("Active - Content Integration Phase").
- Version labels disagree (v2.0 in the footer, v3.0 in the easter egg).

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
