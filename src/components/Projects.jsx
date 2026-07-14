import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, FileText, Download } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function QuietCard({ project }) {
  const { title, version, status_label, tagline, tech_stack } = project;

  return (
    <div className="card p-6 transition-shadow duration-200 hover:shadow-quiet-md">
      <h3 className="text-xl font-bold text-ink mb-1 font-display">
        {title} {version && <span className="text-plum font-mono text-sm font-normal">{version}</span>}
      </h3>
      <span className="badge mb-4 inline-flex">{status_label}</span>
      <p className="text-ink-muted mb-4 leading-relaxed">{tagline}</p>
      <div className="flex flex-wrap gap-2">
        {tech_stack.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ project }) {
  const { title, version, status_label, description, tech_stack, metrics, links } = project;
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`p-8 md:p-10 ${revealed ? 'reveal-loud' : 'reveal-quiet'}`}>
      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <h3 className={`text-2xl md:text-3xl font-bold font-display ${revealed ? 'text-cream' : 'text-ink'}`}>
          {title} {version && <span className={`font-mono text-lg font-normal ${revealed ? 'text-cream/70' : 'text-plum'}`}>{version}</span>}
        </h3>
        <span className={revealed ? 'badge-live badge' : 'badge'}>{status_label}</span>
      </div>

      <p className={`mb-6 leading-relaxed text-lg ${revealed ? 'text-cream/85' : 'text-ink-muted'}`}>
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tech_stack.map((tech) => (
          <span key={tech} className={revealed ? 'tag-on-loud' : 'tag'}>{tech}</span>
        ))}
      </div>

      {metrics && (
        <div className={`flex flex-wrap gap-4 mb-6 text-sm font-mono ${revealed ? 'text-cream/70' : 'text-ink-faint'}`}>
          {metrics.releases && <span>{metrics.releases} releases</span>}
          {metrics.development_time && <span>{metrics.development_time}</span>}
          {metrics.platforms && <span>{metrics.platforms.length} platforms</span>}
        </div>
      )}

      {links && (
        <div className="flex flex-wrap gap-3">
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer"
              className={revealed ? 'btn-primary-on-loud' : 'btn-primary'}>
              <Github size={18} />
              <span>View Code</span>
            </a>
          )}
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer"
              className={revealed ? 'btn-primary-on-loud' : 'btn-primary'}>
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
          {links.docs && links.docs !== 'Coming soon' && (
            <a href={links.docs} target="_blank" rel="noopener noreferrer"
              className={revealed ? 'btn-secondary !text-cream !border-cream/40 hover:!bg-cream/10' : 'btn-secondary'}>
              <FileText size={18} />
              <span>Docs</span>
            </a>
          )}
          {links.download && links.download !== 'Coming soon' && (
            <a href={links.download} target="_blank" rel="noopener noreferrer"
              className={revealed ? 'btn-secondary !text-cream !border-cream/40 hover:!bg-cream/10' : 'btn-secondary'}>
              <Download size={18} />
              <span>Download</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function Projects() {
  const projects = contentData.projects;
  const featured = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <section id="projects" className="section-container">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink font-display">Projects</h2>
      <p className="text-xl text-ink-muted mb-12">
        Building tools that solve real problems, learning AI as I go
      </p>

      <div className="mb-8">
        <FeaturedCard project={featured} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {otherProjects.map((project) => (
          <QuietCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
