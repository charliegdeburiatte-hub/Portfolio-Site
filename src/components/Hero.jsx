import { ArrowUpRight } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function Hero({ onOpenCV }) {
  const { name, headline, tagline, location } = contentData.personal;
  const flagship = contentData.projects[0];
  const certs = contentData.skills.certifications;
  const google = certs.find((c) => c.name.startsWith('Google'));
  const aPlus = certs.find((c) => c.name === 'CompTIA A+');

  const spec = [
    ['Availability', `Open to IT support roles and freelance work. Remote preferred, based in ${location}.`],
    ['Certificates', `${google.name} (${google.year}). ${aPlus.name} ${aPlus.status.toLowerCase()}.`],
    ['Experience', 'Tier 1-2 IT support at VantageUAV, plus a home lab since 2022.'],
  ];

  return (
    <section id="top" aria-labelledby="hero-name" className="wrap pt-[calc(var(--nav-h)+3rem)] pb-14 sm:pt-[calc(var(--nav-h)+3.25rem)] lg:pb-20">
      <div className="grid-12 gap-y-14">
        <div className="sm:col-span-8 lg:col-span-7">
          <h1 id="hero-name" className="display m-0 max-w-[12ch] text-[clamp(1.75rem,5.6vw,3.75rem)] text-text">
            {name}
          </h1>
          <p className="mt-6 mb-0 max-w-[28ch] text-[clamp(1.3125rem,2.3vw,1.75rem)] font-medium leading-[1.3] text-text">
            {headline}
          </p>
          <p className="mt-3 mb-0 max-w-[52ch] text-text-2">{tagline}</p>

          <dl className="spec mt-8 max-w-[40rem]">
            {spec.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            <button type="button" className="btn-secondary" onClick={onOpenCV}>View CV</button>
            <a className="inline-link" href="#contact">Get in touch</a>
          </div>
        </div>

        <aside aria-labelledby="flagship-title" className="relative sm:col-span-8 lg:col-span-5 lg:self-start lg:pt-6">
          {/* Outlined version numeral: something real for the glass to bend */}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 125 100"
            className="numeral pointer-events-none absolute top-0 right-0 h-[1em] w-auto select-none overflow-visible text-[clamp(8rem,17vw,14rem)]"
          >
            <defs>
              {/* Brushed silver, same ramp as --brushed: light at the top, darker below */}
              <linearGradient id="numeral-ramp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#CFCBC4" />
                <stop offset="0.55" stopColor="#8A8680" />
                <stop offset="1" stopColor="#6B6762" />
              </linearGradient>
              {/* The grain: a faint light line every few pixels across the stroke */}
              <linearGradient id="numeral-grain" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1.4" y2="0" spreadMethod="repeat">
                <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
                <stop offset="0.33" stopColor="#fff" stopOpacity="0.35" />
                <stop offset="0.33" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g fontSize="100" fontWeight="200" letterSpacing="-4" textAnchor="end" fill="none" strokeWidth="1.25">
              <text x="125" y="78" stroke="url(#numeral-ramp)" vectorEffect="non-scaling-stroke">3.0</text>
              <text x="125" y="78" stroke="url(#numeral-grain)" vectorEffect="non-scaling-stroke">3.0</text>
            </g>
          </svg>

          <article className="smoke chrome-rim aero-edge relative mt-[clamp(5.5rem,10vw,8.5rem)] rounded-[6px] p-6 sm:p-7">
            <p className="meta m-0">v{flagship.version} · Mar 2026</p>
            <h2 id="flagship-title" className="mt-3 mb-0 text-[1.375rem] font-semibold leading-tight text-text">
              {flagship.title}
            </h2>
            <p className="mt-2 mb-0 text-text">{flagship.tagline}.</p>
            <p className="mt-3 mb-0 text-[0.9375rem] text-text-2">
              Scoring runs in your browser. Only the cover letter step sends text to Anthropic, using your own API key.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1">
              <a className="btn-secondary" href={flagship.links.demo} target="_blank" rel="noopener noreferrer">
                Open app
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a className="inline-link" href={flagship.links.github} target="_blank" rel="noopener noreferrer">
                View code
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a className="inline-link" href="#job-application-analyser">How it was built</a>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
