import contentData from '../CONTENT_DATA.json';

function Footer() {
  const { meta, personal } = contentData;

  return (
    <footer className="bg-bg-card/50 backdrop-blur-sm border-t border-primary/30 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
          <div className="font-mono">
            <span className="text-accent">Portfolio v{meta.portfolio_version}</span>
            <span className="mx-2">•</span>
            <span className="text-text-secondary">Last updated {meta.last_updated}</span>
            <span className="mx-2">•</span>
            <span className="text-green-400">{meta.site_status}</span>
          </div>

          <div>
            <p className="text-text-secondary">{personal.location}</p>
          </div>

          <div className="font-mono text-xs text-text-muted">
            Built with React + Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
