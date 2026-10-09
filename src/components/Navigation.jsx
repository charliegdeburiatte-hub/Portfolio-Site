import { useEffect, useRef, useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';

const sections = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function Navigation({ onOpenCV }) {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Close the phone menu on Escape or a tap outside it
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onDown = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [menuOpen]);

  const linkClass = (id) =>
    `inline-flex items-center min-h-11 px-3 rounded-full text-[0.9375rem] font-medium no-underline transition-colors ${
      active === id ? 'bg-white/70 text-ink shadow-[inset_0_1px_0_white]' : 'text-ink hover:bg-white/45'
    }`;

  return (
    <header ref={menuRef} className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main"
        className="glass glass-chrome mx-auto flex max-w-5xl items-center gap-1 rounded-full py-1.5 pl-4 pr-1.5"
      >
        <a href="#top" className="mr-auto min-h-11 inline-flex items-center font-semibold text-ink no-underline tracking-tight">
          <span className="sm:hidden">Charlie</span>
          <span className="hidden sm:inline">Charlie De Buriatte</span>
        </a>

        <a href="#projects" className={`${linkClass('projects')} md:hidden`} aria-current={active === 'projects' ? 'true' : undefined}>
          Projects
        </a>

        <ul className="hidden md:flex items-center gap-0.5 m-0 p-0 list-none">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={linkClass(id)} aria-current={active === id ? 'true' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button type="button" onClick={onOpenCV} className="btn btn-gloss btn-sm ml-1">
          <FileText size={16} aria-hidden="true" />
          CV
        </button>

        <button
          type="button"
          className="md:hidden inline-grid place-items-center size-11 rounded-full text-ink hover:bg-white/45"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

      </nav>

      {menuOpen && (
        <ul
          id="nav-menu"
          className="glass glass-blur md:hidden absolute right-3 top-[calc(100%+0.25rem)] sm:right-5 m-0 w-56 list-none rounded-3xl p-2 settle"
        >
          {sections.slice(1).map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex min-h-11 items-center rounded-2xl px-4 font-medium text-ink no-underline hover:bg-white/60"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default Navigation;
