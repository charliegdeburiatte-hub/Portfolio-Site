import contentData from '../CONTENT_DATA.json';
import { SectionHeading } from './ui';

const IT_PROJECTS = ['homelab-environment', 'intel-platform-diagnostics', 'outlook-sync-repair', 'custom-pc-build'];
const SOFTWARE_PROJECTS = ['freddo-index', 'interview-help', 'freelance-portfolio-client', 'hjelply'];

// Only years the content already states. The rest stay blank rather than guessed:
// the Analyser shipped in Mar 2026, the home lab runs from 2022, and the Outlook
// fix was at VantageUAV (Sep 2021 to Mar 2022).
const YEARS = {
  'job-application-analyzer': '2026',
  'homelab-environment': 'Since 2022',
  'outlook-sync-repair': '2021 to 2022',
};

const byId = (id) => contentData.projects.find((p) => p.id === id);

function Links({ links }) {
  if (!links || (!links.demo && !links.github)) return null;
  return (
    <span className="flex flex-wrap gap-x-4">
      {links.demo && (
        <a className="inline-link" href={links.demo} target="_blank" rel="noopener noreferrer">
          Open app
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {links.github && (
        <a className="inline-link" href={links.github} target="_blank" rel="noopener noreferrer">
          Code
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </span>
  );
}

// A plain row: name, one line, year, links. No box, no title bar, no status dot
function Row({ project, children, line, titleAs = 'h4' }) {
  const Title = titleAs;
  const { id, title, tagline, links } = project;
  return (
    <li id={id === 'job-application-analyzer' ? 'job-application-analyser' : id} className="py-4 lg:col-span-12 lg:grid lg:grid-cols-subgrid lg:items-baseline">
      <div className="lg:col-span-8">
        <Title className="m-0 text-[1.0625rem] font-semibold leading-snug text-text">{title}</Title>
        <p className="mt-1 mb-0 max-w-[60ch] text-text-2">{line ?? tagline}</p>
        {children}
      </div>
      <p className="mt-1 mb-0 text-[0.9375rem] text-text-2 lg:col-span-2 lg:mt-0">{YEARS[project.id] ?? ''}</p>
      <div className="lg:col-span-2"><Links links={links} /></div>
    </li>
  );
}

function Group({ id, title, ids, first }) {
  return (
    <section aria-labelledby={id} className={`col-span-full grid-cols-subgrid lg:col-span-12 lg:grid ${first ? '' : 'mt-10'}`}>
      <h3 id={id} className="m-0 text-[0.9375rem] font-semibold text-text-2 lg:col-span-12">{title}</h3>
      <ul className="m-0 list-none p-0 lg:col-span-12 lg:grid lg:grid-cols-subgrid">
        {ids.map((pid) => <Row key={pid} project={byId(pid)} />)}
      </ul>
    </section>
  );
}

function Projects() {
  const flagship = byId('job-application-analyzer');
  return (
    <section id="projects" aria-labelledby="projects-title" className="wrap pt-6 pb-28 lg:pb-36">
      <div className="grid-12 gap-y-8">
        <SectionHeading
          id="projects-title"
          title="Projects"
          intro="The Analyser comes first. IT work and the other software I've built follow it."
        />

        <ul className="m-0 col-span-full list-none p-0 lg:grid lg:grid-cols-subgrid">
          {/* The hero panel already carries the Analyser's tagline, so this row uses the first
              sentence of Charlie's own "why I built it" from the data instead */}
          <Row project={flagship} titleAs="h3" line={`${flagship.why_built.split('. ')[0]}.`}>
            {flagship.how_built && (
              <div className="mt-4">
                <h4 className="m-0 text-[0.9375rem] font-semibold text-text">How it was built</h4>
                {flagship.how_built.split('\n\n').map((para) => (
                  <p key={para.slice(0, 24)} className="mt-1 mb-0 max-w-[60ch] text-[0.9375rem] text-text-2">{para}</p>
                ))}
              </div>
            )}
          </Row>
        </ul>

        <Group id="projects-it" title="IT and infrastructure" ids={IT_PROJECTS} first />
        <Group id="projects-software" title="Other software" ids={SOFTWARE_PROJECTS} />
      </div>
    </section>
  );
}

export default Projects;
