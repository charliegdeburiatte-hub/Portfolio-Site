import { useEffect, useRef } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';

// The CV opens as an Aero window. A native <dialog> gives focus trapping,
// Escape to close and an inert page behind it for free.
function CVModal({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="cv-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className="cv-dialog m-auto h-[min(92svh,60rem)] w-[min(100%-1.5rem,56rem)] max-w-none max-h-none overflow-visible border-0 bg-transparent p-0 backdrop:bg-[rgb(4_30_42/0.6)] backdrop:backdrop-blur-[6px]"
    >
      <div className="aero flex h-full flex-col">
        <div className="aero-titlebar">
          <h2 id="cv-title" className="aero-title m-0 mr-auto">Charlie De Buriatte: CV</h2>
          <button type="button" className="aero-close" onClick={onClose} aria-label="Close CV">
            <X size={18} strokeWidth={2.75} aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex flex-wrap items-center gap-2 pb-2">
          <a className="btn btn-gloss btn-sm" href="/cv.pdf" download="Charlie_De_Buriatte_CV.pdf">
            <Download size={16} aria-hidden="true" />
            Download PDF
          </a>
          <a className="btn btn-metal btn-sm" href="/Charlie_De_Buriatte_CV.docx" download>
            <Download size={16} aria-hidden="true" />
            Download Word
          </a>
          <a className="ml-auto inline-flex min-h-11 items-center gap-1.5 px-2 text-[0.9375rem] font-medium" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            Open in new tab
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="aero-client relative flex-1 overflow-hidden">
          {open && (
            <iframe src="/cv.pdf" title="Charlie De Buriatte CV (PDF)" className="absolute inset-0 size-full border-0" />
          )}
        </div>
      </div>
    </dialog>
  );
}

export default CVModal;
