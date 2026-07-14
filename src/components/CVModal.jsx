import { useEffect } from 'react';

function CVModal({ onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(36, 33, 26, 0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] rounded-2xl flex flex-col overflow-hidden"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-loud)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div>
            <span className="text-ink font-semibold font-display">Charlie De Buriatte</span>
            <span className="ml-3 tag">CV.pdf</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/cv.pdf"
              download="Charlie_De_Buriatte_CV.pdf"
              className="btn-primary !px-4 !py-1.5 text-sm"
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
              className="flex items-center justify-center w-8 h-8 rounded-lg text-ink-muted transition-colors duration-150"
              style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              aria-label="Close CV"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <iframe
          src="/cv.pdf"
          className="flex-1 w-full"
          title="Charlie De Buriatte — CV"
          style={{ border: 'none', background: 'var(--color-card)' }}
        />
      </div>
    </div>
  );
}

export default CVModal;
