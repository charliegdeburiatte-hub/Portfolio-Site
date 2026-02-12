import { Terminal, Sparkles, Code } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function Hero() {
  const { name, tagline, status } = contentData.personal;
  const latestProject = contentData.projects[0]; // Job Analyzer

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aero-blue/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          {/* Name and tagline */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient">
            {name}
          </h1>

          <p className="text-2xl md:text-3xl text-depth-300 mb-12">
            {tagline}
          </p>

          {/* Status indicators */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="status-badge status-active">
              <Terminal size={16} />
              <span>{status.current_focus}</span>
            </div>

            <div className="status-badge status-exploring">
              <Sparkles size={16} />
              <span>Learning: {status.learning}</span>
            </div>

            <div className="status-badge status-active">
              <Code size={16} />
              <span>{status.experience_level}</span>
            </div>
          </div>

          {/* Latest project highlight */}
          <div className="glass-card p-6 inline-block">
            <p className="text-sm text-depth-300 mb-2 font-mono">Latest</p>
            <p className="text-lg font-semibold text-aero-dark">
              {latestProject.title} <span className="text-aero-blue font-mono text-base">{latestProject.status_label}</span>
            </p>
            <p className="text-sm text-depth-200 mt-2">{latestProject.tagline}</p>
          </div>

          {/* Subtle scroll indicator */}
          <div className="mt-16">
            <div className="inline-block animate-bounce">
              <svg
                className="w-6 h-6 text-depth-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
