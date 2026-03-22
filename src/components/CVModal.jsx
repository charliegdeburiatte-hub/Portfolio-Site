import { useEffect } from 'react';

function CVModal({ onClose }) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 20, 30, 0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] rounded-2xl flex flex-col overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div>
            <span className="text-text-primary font-semibold">Charlie De Buriatte</span>
            <span className="ml-3 text-xs font-mono text-text-muted bg-white/5 border border-white/10 rounded px-2 py-0.5">
              CV.pdf
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/cv.pdf"
              download="Charlie_De_Buriatte_CV.pdf"
              className="flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: 'rgba(96, 165, 250, 0.15)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                color: '#93c5fd',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(96, 165, 250, 0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(96, 165, 250, 0.15)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </a>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              aria-label="Close CV"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Embed */}
        <iframe
          src="/cv.pdf"
          className="flex-1 w-full"
          title="Charlie De Buriatte — CV"
          style={{ border: 'none', background: '#1a1a2e' }}
        />
      </div>
    </div>
  );
}

export default CVModal;
