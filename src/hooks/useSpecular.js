import { useEffect } from 'react';

// Moves the highlight on every .glass surface towards the pointer, so the
// light responds to movement. Fine pointers only, and off for reduced motion.
export default function useSpecular() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      for (const el of document.querySelectorAll('.glass')) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        el.style.setProperty('--lx', `${((x - r.left) / r.width) * 100}%`);
        el.style.setProperty('--ly', `${((y - r.top) / r.height) * 100}%`);
      }
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
