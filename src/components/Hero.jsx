import { BadgeCheck, BriefcaseBusiness, ExternalLink, FileText, Github, Headset, Mail } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';
import { AnalyserIcon } from './AnalyserIcon';


function Widget({ icon, title, detail, delay }) {
  const Icon = icon;
  return (
    <li className="glass flex items-start gap-3 rounded-[28px] p-4 text-left settle" style={{ animationDelay: delay }}>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-field text-on-field shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold leading-snug text-ink">{title}</span>
        <span className="block text-[0.9375rem] leading-snug text-ink-soft">{detail}</span>
      </span>
    </li>
  );
}

function Hero({ onOpenCV }) {
  const { name, title, tagline, status } = contentData.personal;
  const flagship = contentData.projects[0];
  const certs = contentData.skills.certifications;
  const aPlus = certs.find((c) => c.name === 'CompTIA A+');
  const google = certs.find((c) => c.name.startsWith('Google'));

  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative flex min-h-[100svh] flex-col items-center px-4 pb-6 pt-[calc(var(--nav-h)+2.5rem)] text-center sm:px-6 sm:pt-[calc(var(--nav-h)+3.5rem)] [@media(max-height:760px)_and_(min-width:640px)]:pt-[calc(var(--nav-h)+1.75rem)]"
    >
      <div className="settle">
        <h1
          id="hero-name"
          className="m-0 font-[family-name:var(--font-clock)] text-[clamp(3.25rem,11vw,6rem)] [@media(max-height:760px)_and_(min-width:640px)]:text-[4.5rem] font-bold leading-[0.95] tracking-[-0.03em] text-on-field [text-shadow:0_2px_24px_rgb(0_30_45/0.35)]"
        >
          {name}
        </h1>
        <p className="mx-auto mt-4 mb-0 max-w-[44ch] text-[clamp(1.125rem,2.6vw,1.5rem)] font-semibold leading-snug text-on-field">
          {title}
        </p>
        <p className="mx-auto mt-2 mb-0 max-w-[60ch] text-on-field-soft [text-wrap:balance]">{tagline}</p>
      </div>

      <ul className="mx-auto mt-8 [@media(max-height:760px)]:mt-6 mb-0 grid w-full max-w-4xl list-none gap-3 p-0 sm:grid-cols-3" aria-label="At a glance">
        <Widget icon={BriefcaseBusiness} title="Open to IT support roles" detail="Remote preferred · Looe, Cornwall" delay="120ms" />
        <Widget icon={BadgeCheck} title={aPlus.name} detail={google.name} delay="180ms" />
        <Widget icon={Headset} title={status.experience_level} detail="Tier 1-2 support at VantageUAV" delay="240ms" />
      </ul>

      <article
        aria-labelledby="flagship-title"
        className="glass glass-blur notify-in mx-auto mt-4 w-full max-w-2xl rounded-[24px] p-4 text-left sm:p-5"
      >
        <div className="flex items-start gap-3">
          <AnalyserIcon />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <p className="m-0 font-semibold text-ink">{flagship.title}</p>
              <p className="m-0 shrink-0 text-[0.875rem] text-ink-soft">Mar 2026</p>
            </div>
            <h2 id="flagship-title" className="m-0 mt-0.5 text-[1.0625rem] font-semibold leading-snug text-ink">
              {flagship.status_label}
            </h2>
            <p className="m-0 mt-1 text-ink-soft">{flagship.tagline}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:pl-[3.25rem]">
          <a className="btn btn-gloss btn-sm" href={flagship.links.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} aria-hidden="true" />
            Open app
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a className="btn btn-metal btn-sm" href={flagship.links.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} aria-hidden="true" />
            View code
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a className="ml-auto inline-flex min-h-11 items-center px-2 font-medium" href="#job-application-analyser">
            Details
          </a>
        </div>
      </article>

      <div className="mt-auto pt-8 [@media(max-height:760px)]:pt-5">
        <div className="focus-light linen inline-flex gap-2 rounded-full p-2">
          <button type="button" className="btn btn-gloss" onClick={onOpenCV}>
            <FileText size={18} aria-hidden="true" />
            View CV
          </button>
          <a className="btn btn-metal" href="#contact">
            <Mail size={18} aria-hidden="true" />
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
