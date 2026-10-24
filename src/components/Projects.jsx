import { ArrowUpRight } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';
import { SectionHeading, StatusBadge, TagList, Window } from './ui';

// Shown on the page; the full stack stays in CONTENT_DATA.json
const FLAGSHIP_TAGS = ['React 19', 'TypeScript', 'Claude API (Anthropic)', 'PDF.js (PDF parsing)', 'Vercel (deployment)'];
const SHOWN_TAGS = {
  'homelab-environment': ['Windows Server 2025', 'Active Directory', 'Group Policy', 'Freshdesk', 'PowerShell'],
  'intel-platform-diagnostics': ['DDU', 'Hardware swap testing', 'Voltage monitoring', 'BSOD diagnosis', 'BIOS & microcode update'],
  'freddo-index': ['React', 'Vite', 'Recharts', 'Supabase'],
  'interview-help': ['Electron', 'React', 'Ollama (local LLM)', 'Whisper (local)', 'SQLite'],
  'freelance-portfolio-client': ['Next.js 16', 'TypeScript', 'Sanity CMS', 'Playwright (E2E tests)'],
  hjelply: ['React & TypeScript', 'Node.js & Express', 'PostgreSQL', 'Docker'],
};
const tagsFor = (p) => SHOWN_TAGS[p.id] ?? p.tech_stack;

const IT_PROJECTS = ['homelab-environment', 'intel-platform-diagnostics', 'outlook-sync-repair', 'custom-pc-build'];
const SOFTWARE_PROJECTS = ['freddo-index', 'interview-help', 'freelance-portfolio-client', 'hjelply'];

const byId = (id) => contentData.projects.find((p) => p.id === id);

function ProjectLinks({ links, primary }) {
  if (!links || (!links.demo && !links.github)) return null;
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
      {links.demo && (
        <a className={primary ? 'btn-secondary' : 'inline-link'} href={links.demo} target="_blank" rel="noopener noreferrer">
          {primary ? 'Open app' : 'Live site'}
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {links.github && (
        <a className="inline-link" href={links.github} target="_blank" rel="noopener noreferrer">
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
    <Window id="job-application-analyser" title={p.title} badge={<StatusBadge status="active" label={p.status_label} />}>
      <div className="grid gap-8 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-8">
          <p className="m-0 max-w-[40ch] text-[clamp(1.25rem,2vw,1.5rem)] font-medium leading-snug text-text">{p.tagline}.</p>
          <p className="mt-4 mb-0 max-w-[66ch] text-text-2">{p.description}</p>
          {p.how_built && (
            <>
              <h4 className="mt-7 mb-0 text-[0.9375rem] font-semibold text-text">How it was built</h4>
              {p.how_built.split('\n\n').map((para) => (
                <p key={para.slice(0, 24)} className="mt-2 mb-0 max-w-[66ch] text-text-2">{para}</p>
              ))}
            </>
          )}
          <ProjectLinks links={p.links} primary />
        </div>
        <div className="md:col-span-4">
          <h4 className="m-0 text-[0.9375rem] font-semibold text-text">Why I built it</h4>
          <p className="mt-1 mb-5 text-[0.9375rem] text-text-2">{p.why_built}</p>
          <dl className="spec spec-tight">
            <div><dt>Released</dt><dd><span className="meta text-text-2">Mar 2026</span></dd></div>
            <div><dt>Built in</dt><dd>{p.metrics.development_time}</dd></div>
            <div><dt>Stack</dt><dd><TagList tags={FLAGSHIP_TAGS} /></dd></div>
          </dl>
        </div>
      </div>
    </Window>
  );
}

function ProjectWindow({ project }) {
  const { id, title, status, status_label, tagline, description, links } = project;
  return (
    <Window id={id} title={title} badge={<StatusBadge status={status} label={status_label} />}>
      <p className="m-0 font-medium leading-snug text-text">{tagline}</p>
      <p className="mt-2 mb-4 text-[0.9375rem] text-text-2">{description}</p>
      <TagList tags={tagsFor(project)} />
      <ProjectLinks links={links} />
    </Window>
  );
}

// IT write-ups: the steps in eight columns, a spec column on the right
function WideProjectWindow({ project }) {
  const { id, title, status, status_label, tagline, description, highlights } = project;
  const List = project.highlights_ordered ? 'ol' : 'ul';
  return (
    <Window id={id} title={title} badge={<StatusBadge status={status} label={status_label} />}>
      <div className="grid gap-8 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-8">
          <p className="m-0 max-w-[48ch] text-[1.1875rem] font-medium leading-snug text-text">{tagline}</p>
          <p className="mt-3 mb-0 max-w-[66ch] text-text-2">{description}</p>
          <h4 className="mt-6 mb-0 text-[0.9375rem] font-semibold text-text">{project.highlights_title}</h4>
          <List className={`steps mt-2 mb-0 max-w-[66ch] text-text-2 ${List === 'ol' ? 'steps-numbered' : ''}`}>
            {highlights.map((h) => <li key={h}>{h}</li>)}
          </List>
        </div>
        <dl className="spec spec-tight self-start md:col-span-4">
          <div><dt>{project.side_title ?? 'Why'}</dt><dd>{project.side_text ?? project.why_built}</dd></div>
          <div><dt>Tools</dt><dd><TagList tags={tagsFor(project)} label="Tools" /></dd></div>
        </dl>
      </div>
    </Window>
  );
}

function Group({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="col-span-full mt-16 first:mt-0">
      <h3 id={id} className="m-0 mb-5 border-b border-hairline pb-3 text-[1.125rem] font-semibold text-text">{title}</h3>
      {children}
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="wrap pt-6 pb-28 lg:pb-40">
      <div className="grid-12 gap-y-10">
        <SectionHeading id="projects-title" title="Projects" intro="Lab work, real faults fixed, and the tools I've built along the way" />
        <div className="col-span-full">
          <Flagship />
        </div>
        <Group id="projects-it" title="IT and infrastructure">
          <div className="flex flex-col gap-6">
            {IT_PROJECTS.map((pid) => <WideProjectWindow key={pid} project={byId(pid)} />)}
          </div>
        </Group>
        <Group id="projects-software" title="Other software">
          <div className="grid gap-6 md:grid-cols-2">
            {SOFTWARE_PROJECTS.map((pid) => <ProjectWindow key={pid} project={byId(pid)} />)}
          </div>
        </Group>
      </div>
    </section>
  );
}

export default Projects;
