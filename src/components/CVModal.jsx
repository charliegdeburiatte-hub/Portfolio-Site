import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

// The CV opens on smoked glass, one of the three glass surfaces. A native <dialog> gives focus trapping,
// Escape to close and an inert page behind it for free.
// Android Chrome has no inline PDF viewer and leaves the iframe blank,
// so browsers that report none get an open-in-new-tab panel instead.
const canShowPdf = typeof navigator === 'undefined' || navigator.pdfViewerEnabled !== false;

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
      className="cv-dialog m-auto h-[min(92svh,60rem)] w-[min(100%-1.5rem,56rem)] max-w-none max-h-none overflow-visible border-0 bg-transparent p-0 text-text backdrop:bg-[rgb(10_9_8/0.72)]"
    >
      <div className="smoke chrome-rim flex h-full flex-col rounded-[6px]">
        <div className="window-bar bg-transparent">
          <h2 id="cv-title" className="m-0 mr-auto text-[1rem] font-semibold text-text">Charlie De Buriatte: CV</h2>
          <button type="button" className="btn-secondary w-11 px-0" onClick={onClose} aria-label="Close CV">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 px-5 py-1">
          <a className="inline-link" href="/cv.pdf" download="Charlie_De_Buriatte_CV.pdf">Download PDF</a>
          <a className="inline-link" href="/Charlie_De_Buriatte_CV.docx" download>Download Word</a>
          <a className="inline-link sm:ml-auto" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            Open in new tab
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="relative m-2 mt-1 flex-1 overflow-hidden rounded-[3px] border border-hairline bg-raised">
          {open && canShowPdf && (
            <iframe src="/cv.pdf" title="Charlie De Buriatte CV (PDF)" className="absolute inset-0 size-full border-0 bg-white" />
          )}
          {open && !canShowPdf && (
            <div className="flex h-full flex-col items-start justify-center gap-4 p-6">
              <p className="m-0 max-w-[36ch] text-text-2">This browser can't show PDFs inside the page. Open the CV in a new tab, or use the download links above.</p>
              <a className="btn-secondary" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                Open CV
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

export default CVModal;
