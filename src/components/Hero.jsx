import contentData from '../CONTENT_DATA.json';
import placeholder from '../assets/analyser-placeholder.svg';

// The glass sits over a real screenshot of the Analyser at src/assets/analyser.png.
// Until that file exists, a clearly labelled placeholder stands in.
const shots = import.meta.glob('../assets/analyser.png', { eager: true, import: 'default' });
const screenshot = shots['../assets/analyser.png'];

function Hero({ onOpenCV }) {
  const { name, headline, location } = contentData.personal;
  const flagship = contentData.projects[0];

  return (
    <section id="top" aria-labelledby="hero-name" className="wrap pt-6 pb-16 lg:pt-10 lg:pb-12">
      <div className="grid-12 gap-y-8 lg:gap-y-0">
        {/* Nameplate: columns 1 to 8, steel with a chrome edge, flat lettering */}
        <div
          data-check="name-block"
          className="nameplate px-6 py-7 sm:col-span-8 lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:self-start lg:px-10 lg:pt-10 lg:pb-12"
        >
          <h1 id="hero-name" className="display m-0 max-w-[11ch] text-[clamp(1.75rem,4.4vw,4rem)] text-text">
            {name}
          </h1>
        </div>

        <div className="sm:col-span-8 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:pt-12">
          <p className="m-0 max-w-[30ch] text-[clamp(1.25rem,2vw,1.625rem)] font-medium leading-[1.3] text-text">
            {headline}
          </p>
          <p className="mt-5 mb-0 max-w-[52ch] text-text-2">
            I&apos;m after IT support roles or freelance work, remote by preference, from {location}.
            Since Tier 1-2 support at VantageUAV I&apos;ve run a home lab, started in 2022, and earned the
            Google IT Support certificate, with CompTIA A+ studied to exam ready.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            <button type="button" className="btn-secondary" onClick={onOpenCV}>View CV</button>
            <a className="inline-link" href="#contact">Get in touch</a>
          </div>
        </div>

        {/* The screenshot the glass bends */}
        <figure className="photo m-0 overflow-hidden sm:col-span-8 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:self-start">
          <img
            src={screenshot ?? placeholder}
            alt={screenshot
              ? 'The Job Application Analyser showing a CV scored against a job description'
              : 'Placeholder: the Analyser screenshot has not been added yet'}
            width="1200"
            height="900"
            className="block h-auto w-full"
          />
        </figure>

        {/* Analyser panel: glass, overlapping the nameplate's lower right edge and the screenshot */}
        <article
          id="analyser-panel"
          data-check="analyser-panel"
          aria-labelledby="flagship-title"
          className="glass relative z-10 -mt-20 rounded-[8px] p-6 sm:col-span-8 sm:p-7 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:-mt-16 lg:self-start"
        >
          <div className="flex items-start gap-6">
            <div className="min-w-0 flex-1">
              <p className="m-0 flex items-center gap-2 text-[0.875rem] text-text-2">
                <span className="status-dot" aria-hidden="true" />
                Live
              </p>
              <h2 id="flagship-title" className="mt-2 mb-0 text-[1.375rem] font-semibold leading-tight text-text">
                {flagship.title}
              </h2>
              <p className="mt-2 mb-0 max-w-[48ch] text-text">{flagship.tagline}.</p>
              <p className="mt-3 mb-0 max-w-[52ch] text-[0.9375rem] text-text-2">
                Scoring runs in your browser. Only the cover letter step sends text to Anthropic, using your own API key.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
                <a className="inline-link" href={flagship.links.github} target="_blank" rel="noopener noreferrer">
                  View code
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a className="inline-link" href="#job-application-analyser">How it was built</a>
              </div>
            </div>

            {/* The score dial: the one knurled control. It opens the Analyser to score a CV */}
            <a className="dial" href={flagship.links.demo} target="_blank" rel="noopener noreferrer">
              Score
              <br />
              a CV
              <span className="sr-only">(opens the Analyser in a new tab)</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Hero;
