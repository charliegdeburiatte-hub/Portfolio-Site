import { Github, ExternalLink, FileText, Download } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function StatusBadge({ status, label }) {
  const statusClasses = {
    active: 'status-active',
    experimental: 'status-experimental',
    exploring: 'status-exploring',
    paused: 'status-paused',
    completed: 'status-completed',
  };

  return (
    <span className={`status-badge ${statusClasses[status]}`}>
      <span className="w-2 h-2 rounded-full bg-current"></span>
      {label}
    </span>
  );
}

function ProjectCard({ project, featured = false }) {
  const { title, version, status, status_label, tagline, description, tech_stack, metrics, links } = project;

  return (
    <div className={`glass-card p-6 hover:shadow-aero-lg transition-all duration-300 ${featured ? 'md:col-span-2' : ''}`}>
      {/* Project header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-aero-dark mb-2">
            {title} {version && <span className="text-aero-blue font-mono text-lg">{version}</span>}
          </h3>
          <StatusBadge status={status} label={status_label} />
        </div>
      </div>

      {/* Description */}
      <p className="text-depth-300 mb-4 leading-relaxed">
        {featured ? description : tagline}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tech_stack.map((tech) => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>

      {/* Metrics (if available) */}
      {metrics && (
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-depth-200 font-mono">
          {metrics.releases && <span>• {metrics.releases} releases</span>}
          {metrics.development_time && <span>• {metrics.development_time}</span>}
          {metrics.platforms && <span>• {metrics.platforms.length} platforms</span>}
        </div>
      )}

      {/* Links */}
      {links && (
        <div className="flex flex-wrap gap-3 mt-6">
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow flex items-center gap-2"
            >
              <Github size={18} />
              <span>View Code</span>
            </a>
          )}
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow flex items-center gap-2"
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
          {links.docs && links.docs !== 'Coming soon' && (
            <a
              href={links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-aero-blue text-aero-blue rounded-lg hover:bg-aero-blue/10 transition-all duration-300 flex items-center gap-2"
            >
              <FileText size={18} />
              <span>Docs</span>
            </a>
          )}
          {links.download && links.download !== 'Coming soon' && (
            <a
              href={links.download}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-aero-blue text-aero-blue rounded-lg hover:bg-aero-blue/10 transition-all duration-300 flex items-center gap-2"
            >
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
  const featured = projects[0]; // Job Analyzer
  const otherProjects = projects.slice(1);

  return (
    <section id="projects" className="section-container">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-aero-dark">
          Projects
        </h2>
        <p className="text-xl text-depth-300 mb-12">
          Building tools that solve real problems, learning AI as I go
        </p>

        {/* Featured project */}
        <div className="mb-8">
          <ProjectCard project={featured} featured={true} />
        </div>

        {/* Other projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
