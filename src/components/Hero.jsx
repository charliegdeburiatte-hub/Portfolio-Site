import contentData from '../CONTENT_DATA.json';

function Hero() {
  const { name, tagline, status } = contentData.personal;
  const latestProject = contentData.projects[0];

  return (
    <section id="hero" className="min-h-screen flex items-center relative">
      <div className="section-container">
        <div className="max-w-3xl settle-in">
          <h1 className="font-display text-6xl md:text-7xl font-extrabold text-ink leading-[1.05] tracking-tight">
            {name}
          </h1>

          <div className="h-1 w-20 bg-pine rounded-full mt-6 mb-6 accent-sweep" style={{ animationDelay: '0.6s' }} />

          <p className="text-xl md:text-2xl text-ink-muted mb-10 max-w-2xl">
            {tagline}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <span className="badge">{status.current_focus}</span>
            <span className="badge">Learning: {status.learning}</span>
            <span className="badge">{status.experience_level}</span>
          </div>

          <div className="card p-6 inline-flex flex-col max-w-md">
            <p className="text-xs font-mono text-ink-faint mb-2 uppercase tracking-wide">Latest</p>
            <p className="text-lg font-semibold text-ink">
              {latestProject.title}{' '}
              <span className="text-plum font-mono text-sm">{latestProject.status_label}</span>
            </p>
            <p className="text-sm text-ink-muted mt-2">{latestProject.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
