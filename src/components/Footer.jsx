import { useState } from 'react';
import contentData from '../CONTENT_DATA.json';

const readGlass = () => {
  try { return localStorage.getItem('glass') !== 'off'; } catch { return true; }
};

// A real switch: turns the few glass surfaces solid, for anyone who
// finds the glass harder to read. The choice is remembered on this device.
function GlassSwitch() {
  const [on, setOn] = useState(readGlass);

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.dataset.glass = next ? 'on' : 'off';
    try { localStorage.setItem('glass', next ? 'on' : 'off'); } catch { /* storage blocked: still applies for this visit */ }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={toggle}
      className="inline-flex min-h-11 cursor-pointer items-center gap-3 border-0 bg-transparent p-0 font-[inherit] text-text-2 hover:text-text"
    >
      Glass effects
      <span className={`switch ${on ? 'is-on' : ''}`} aria-hidden="true">
        <span className="switch-knob" />
      </span>
    </button>
  );
}

function Footer() {
  const { personal } = contentData;

  return (
    <footer className="wrap pb-10">
      <div className="flex flex-col items-start gap-x-8 gap-y-2 border-t border-silver-lo pt-6 text-[0.875rem] text-text-2 sm:flex-row sm:items-center">
        <p className="m-0">© {new Date().getFullYear()} {personal.name}, {personal.location}</p>
        <p className="m-0">Built with React and Tailwind CSS</p>
        <span className="sm:ml-auto"><GlassSwitch /></span>
      </div>
    </footer>
  );
}

export default Footer;
