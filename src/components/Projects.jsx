import { ExternalLink, Github } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';
import { AeroWindow, SectionHeading, StatusBadge, TagList } from './ui';
import { AnalyserIcon } from './AnalyserIcon';

// Shown on the page; the full stack stays in CONTENT_DATA.json
const FLAGSHIP_TAGS = ['React 19', 'TypeScript', 'Claude API (Anthropic)', 'PDF.js (PDF parsing)', 'Vercel (deployment)'];

const IT_PROJECTS = ['homelab-environment', 'intel-platform-diagnostics', 'custom-pc-build'];
const SOFTWARE_PROJECTS = ['freddo-index', 'interview-help', 'freelance-portfolio-client', 'hjelply'];

const byId = (id) => contentData.projects.find((p) => p.id === id);

function ProjectLinks({ links, size = 'sm' }) {
  if (!links || (!links.demo && !links.github)) return null;
  const sm = size === 'sm' ? ' btn-sm' : '';
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {links.demo && (
        <a className={`btn btn-gloss${sm}`} href={links.demo} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={16} aria-hidden="true" />
          {size === 'sm' ? 'Live site' : 'Open app'}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {links.github && (
        <a className={`btn btn-metal${sm}`} href={links.github} target="_blank" rel="noopener noreferrer">
          <Github size={16} aria-hidden="true" />
          View code
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function Flagship() {
  const p = byId('job-application-analyzer');
  return (
    <AeroWindow
      id="job-application-analyser"
      title={p.title}
      icon={<span className="relative"><AnalyserIcon className="size-7" /></span>}
      badge={<StatusBadge status="active" label={p.status_label} />}
      className="glow-amber"
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-8">
        <div>
          <p className="m-0 text-[1.1875rem] font-semibold leading-snug text-ink">{p.tagline}</p>
          <p className="mt-3 mb-0 max-w-[68ch] text-ink-soft">{p.description}</p>
          <ProjectLinks links={p.links} size="lg" />
        </div>
        <div className="border-t border-field/15 pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <h4 className="m-0 text-[0.9375rem] font-semibold text-ink">Why I built it</h4>
          <p className="mt-1 mb-0 text-[0.9375rem] text-ink-soft">{p.why_built}</p>
          <dl className="mt-4 mb-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.9375rem]">
            <dt className="text-ink-soft">Released</dt>
            <dd className="m-0 font-medium text-ink">Mar 2026</dd>
            <dt className="text-ink-soft">Built in</dt>
            <dd className="m-0 font-medium text-ink">{p.metrics.development_time}</dd>
          </dl>
          <TagList tags={FLAGSHIP_TAGS} />
        </div>
      </div>
    </AeroWindow>
  );
}

function ProjectWindow({ project }) {
  const { id, title, status, status_label, tagline, description, tech_stack, links } = project;
  return (
    <AeroWindow id={id} title={title} badge={<StatusBadge status={status} label={status_label} />}>
      <p className="m-0 font-semibold leading-snug text-ink">{tagline}</p>
      <p className="mt-2 mb-4 text-[0.9375rem] text-ink-soft">{description}</p>
      <TagList tags={tech_stack} />
      <ProjectLinks links={links} />
    </AeroWindow>
  );
}

function Group({ id, title, ids, cols }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h3 id={id} className="spine-node m-0 mb-4 text-[1.25rem] font-semibold text-on-field">{title}</h3>
      <div className={`grid gap-5 ${cols}`}>
        {ids.map((pid) => <ProjectWindow key={pid} project={byId(pid)} />)}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="page-section">
      <SectionHeading id="projects-title" title="Projects" intro="Building tools that solve real problems, learning AI as I go" />
      <Flagship />
      <Group id="projects-it" title="IT and infrastructure" ids={IT_PROJECTS} cols="md:grid-cols-2 lg:grid-cols-3" />
      <Group id="projects-software" title="Software" ids={SOFTWARE_PROJECTS} cols="md:grid-cols-2" />
    </section>
  );
}

export default Projects;
