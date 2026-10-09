import { useState } from 'react';
import contentData from '../CONTENT_DATA.json';

const readGlass = () => {
  try { return localStorage.getItem('glass') !== 'off'; } catch { return true; }
};

// A real switch: turns every translucent surface solid, for anyone who
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
      className="inline-flex min-h-11 items-center gap-3 font-medium text-on-field"
    >
      Glass effects
      <span className={`ios-switch ${on ? 'is-on' : ''}`} aria-hidden="true">
        <span className="ios-switch-knob" />
      </span>
    </button>
  );
}

function Footer() {
  const { personal } = contentData;

  return (
    <footer className="focus-light px-4 pb-10 pt-6 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 border-t border-white/15 pt-6 text-[0.9375rem] text-on-field-soft sm:flex-row sm:justify-between">
        <p className="m-0">© {new Date().getFullYear()} {personal.name} · {personal.location}</p>
        <GlassSwitch />
        <p className="m-0">Built with React + Tailwind CSS</p>
      </div>
    </footer>
  );
}

export default Footer;
