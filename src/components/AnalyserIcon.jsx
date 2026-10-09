import { useId } from 'react';

// Original app glyph for the flagship: a CV page with a score tick, in amber gloss
export function AnalyserIcon({ className = 'size-10' }) {
  const gid = `ai-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg viewBox="0 0 40 40" className={`${className} shrink-0`} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9DE9E" />
          <stop offset="0.5" stopColor="#F2C46B" />
          <stop offset="0.5" stopColor="#E8A33D" />
          <stop offset="1" stopColor="#D88A22" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" fill={`url(#${gid})`} stroke="#A8691A" />
      <rect x="11" y="8" width="18" height="24" rx="2.5" fill="#FFFDF7" />
      <path d="M14.5 13h11M14.5 17h11M14.5 21h6" stroke="#C9A36A" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="26" cy="27" r="6" fill="#0A5C78" stroke="#FFFDF7" strokeWidth="1.5" />
      <path d="m23.4 27 1.8 1.8 3.4-3.6" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 20C2 9 9 2 20 2s18 7 18 18" fill="#fff" opacity="0.18" />
    </svg>
  );
}
