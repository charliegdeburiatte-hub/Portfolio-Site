import contentData from '../CONTENT_DATA.json';

function Footer() {
  const { meta, personal } = contentData;

  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-depth-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-depth-300">
          <div className="font-mono">
            <span className="text-aero-blue">Portfolio v{meta.portfolio_version}</span>
            <span className="mx-2">•</span>
            <span>Last updated {meta.last_updated}</span>
            <span className="mx-2">•</span>
            <span className="text-green-600">{meta.site_status}</span>
          </div>

          <div>
            <p>{personal.location}</p>
          </div>

          <div className="font-mono text-xs text-depth-200">
            Built with React + Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
