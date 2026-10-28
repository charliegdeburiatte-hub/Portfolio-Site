import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

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
    `relative inline-flex items-center min-h-11 px-3 text-[0.9375rem] font-medium no-underline transition-colors duration-150 ${
      active === id
        ? 'text-text after:absolute after:inset-x-3 after:bottom-2 after:h-px after:bg-brass'
        : 'text-text-2 hover:text-text'
    }`;

  return (
    <header ref={menuRef} className="smoke chrome-rim rim-bottom aero-edge fixed inset-x-0 top-0 z-40">
      <nav aria-label="Main" className="wrap flex h-[var(--nav-h)] items-center gap-2">
        <a href="#top" className="display mr-auto inline-flex min-h-11 items-center text-[0.8125rem] text-text no-underline sm:text-[0.875rem]">
          Charlie De Buriatte
        </a>

        <ul className="m-0 hidden list-none items-center p-0 md:flex">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={linkClass(id)} aria-current={active === id ? 'true' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button type="button" onClick={onOpenCV} className="btn-primary md:ml-3">
          View CV
        </button>

        <button
          type="button"
          className="inline-grid size-11 place-items-center rounded-[3px] text-text-2 hover:text-text md:hidden"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <ul id="nav-menu" className="m-0 list-none border-t border-hairline bg-raised p-0 md:hidden">
          {sections.map(({ id, label }) => (
            <li key={id} className="border-b border-hairline last:border-b-0">
              <a
                href={`#${id}`}
                className="wrap flex min-h-12 items-center font-medium text-text no-underline hover:bg-panel"
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
