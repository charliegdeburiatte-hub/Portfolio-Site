import contentData from '../CONTENT_DATA.json';

function Footer() {
  const { meta, personal } = contentData;

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink-muted">
          <div className="font-mono">
            <span className="text-plum">Portfolio v{meta.portfolio_version}</span>
            <span className="mx-2 text-ink-faint">&middot;</span>
            <span>Last updated {meta.last_updated}</span>
            <span className="mx-2 text-ink-faint">&middot;</span>
            <span>{meta.site_status}</span>
          </div>

          <p>{personal.location}</p>

          <div className="font-mono text-xs text-ink-faint">
            Built with React + Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
