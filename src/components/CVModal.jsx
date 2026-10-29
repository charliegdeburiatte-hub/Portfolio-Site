import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// The CV opens on glass, one of the three glass surfaces. It fills the page inside the margins, nothing centred. A native <dialog> gives focus trapping,
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
      className="cv-dialog fixed inset-0 m-[var(--margin)] h-[calc(100svh-2*var(--margin))] w-[calc(100%-2*var(--margin))] max-w-none max-h-none overflow-visible border-0 bg-transparent p-0 text-text backdrop:bg-[rgb(8_8_9/0.72)]"
    >
      <div className="glass flex h-full flex-col rounded-[8px]">
        <div className="flex min-h-[2.875rem] items-center gap-3 border-b border-rules px-5 py-2">
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
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="relative m-2 mt-1 flex-1 overflow-hidden rounded-[4px] border border-rules bg-raised">
          {open && canShowPdf && (
            <iframe src="/cv.pdf" title="Charlie De Buriatte CV (PDF)" className="absolute inset-0 size-full border-0 bg-white" />
          )}
          {open && !canShowPdf && (
            <div className="flex h-full flex-col items-start gap-4 p-6 pt-12">
              <p className="m-0 max-w-[36ch] text-text-2">This browser can't show PDFs inside the page. Open the CV in a new tab, or use the download links above.</p>
              <a className="btn-secondary" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                Open CV
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
