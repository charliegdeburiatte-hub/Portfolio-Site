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
    <section id="top" aria-labelledby="hero-name" className="wrap pt-6 pb-8 lg:pt-10 lg:pb-6">
      {/* Desktop: the plate sits in front of the screenshot's top left; the glass panel covers the
          screenshot's lower part across exactly the same columns, so there is always image behind
          the glass. From 1800px wide both start a column earlier, on column 6, so the gap to the hero text
          stays short. The panel overlaps the plate by 2.5rem, inside the plate's 3rem bottom padding, so it
          never reaches the letters. The screenshot takes its height from the grid, not the image.
          Phones: plate, headline, then the screenshot and panel sharing one cell, then the prose. */}
      <div className="grid-12 gap-y-4 lg:gap-y-0">
        {/* Nameplate: columns 1 to 8, steel with a chrome edge, flat lettering */}
        <div
          data-check="name-block"
          className="nameplate z-[2] row-start-1 px-6 py-5 sm:col-span-8 lg:col-span-8 lg:col-start-1 lg:self-start lg:px-10 lg:pt-9 lg:pb-12"
        >
          <h1 id="hero-name" className="display m-0 max-w-[11ch] text-[clamp(1.75rem,4.4vw,5.5rem)] text-text lg:max-w-none">
            {name}
          </h1>
          <p className="mt-3 mb-0 text-[clamp(1rem,1.4vw,1.25rem)] font-medium text-text-2">IT support, {location}</p>
        </div>

        {/* The first-screen silver hairline (S5), above the headline */}
        <div className="row-start-2 border-t border-silver-lo pt-4 sm:col-span-8 lg:col-span-5 lg:col-start-1 lg:mt-10 lg:pt-8">
          <p className="m-0 max-w-[30ch] text-[clamp(1.25rem,1.75vw,2.75rem)] font-medium leading-[1.3] text-text">
            {headline}
          </p>
        </div>

        {/* The screenshot the glass bends */}
        <figure className="photo relative z-[1] col-start-1 row-start-3 m-0 overflow-hidden sm:col-span-8 lg:col-span-6 lg:col-start-7 3xl:col-span-7 3xl:col-start-6 lg:row-span-3 lg:row-start-1">
          <img
            src={screenshot ?? placeholder}
            alt={screenshot
              ? 'The Job Application Analyser showing a CV scored against a job description'
              : 'Placeholder: the Analyser screenshot has not been added yet'}
            width="1200"
            height="900"
            className="absolute inset-0 block h-full w-full object-cover object-left-top"
          />
        </figure>

        {/* Analyser panel: glass over the screenshot, overlapping the nameplate's lower right edge */}
        <article
          id="analyser-panel"
          data-check="analyser-panel"
          aria-labelledby="flagship-title"
          className="glass glass-frame relative z-10 col-start-1 row-start-3 mt-12 rounded-[8px] p-5 sm:col-span-8 sm:p-7 lg:col-span-6 lg:col-start-7 3xl:col-span-7 3xl:col-start-6 lg:row-span-2 lg:row-start-2 lg:-mt-10"
        >
          <div className="flex flex-col items-start gap-5 sm:h-full sm:flex-row sm:gap-6">
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

            {/* The score dial: the one knurled control. It opens the Analyser */}
            <a className="dial sm:self-end" href={flagship.links.demo} target="_blank" rel="noopener noreferrer">
              Open
              <br />
              app
              <span className="sr-only">(opens the Analyser in a new tab)</span>
            </a>
          </div>
        </article>

        <div className="row-start-4 sm:col-span-8 lg:col-span-5 lg:col-start-1 lg:row-start-3 lg:pt-5">
          <p className="m-0 max-w-[60ch] text-[clamp(1.0625rem,0.86vw,1.375rem)] text-text-2">
            I&apos;m after IT support roles or freelance work, remote by preference, from {location}.
            Since Tier 1-2 support at VantageUAV I&apos;ve run a home lab, started in 2022, and earned the
            Google IT Support certificate, with CompTIA A+ studied to exam ready.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            <button type="button" className="btn-secondary" onClick={onOpenCV}>View CV</button>
            <a className="inline-link" href="#contact">Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
