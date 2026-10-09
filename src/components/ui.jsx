import { CircleCheck, Pause } from 'lucide-react';

export function SectionHeading({ id, title, intro }) {
  return (
    <header className="spine-node mb-8 sm:mb-10">
      <h2 id={id} className="m-0 text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-[-0.02em] text-on-field">
        {title}
      </h2>
      {intro && <p className="mt-2 mb-0 max-w-[60ch] text-on-field-soft">{intro}</p>}
    </header>
  );
}

// Status is carried by shape and label, never by colour alone
export function StatusBadge({ status, label }) {
  let mark;
  if (status === 'paused') mark = <Pause size={13} strokeWidth={3} aria-hidden="true" />;
  else if (status === 'completed') mark = <CircleCheck size={14} strokeWidth={2.5} aria-hidden="true" />;
  else mark = <span className="size-2.5 rounded-full bg-current ring-[3px] ring-current/25" aria-hidden="true" />;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/70 px-2.5 py-1 text-[0.8125rem] font-semibold leading-none text-ink">
      <span className="inline-grid size-3.5 place-items-center text-field">{mark}</span>
      {label}
    </span>
  );
}

// A window with Aero chrome. Only real controls go in the title bar.
export function AeroWindow({ id, title, icon, badge, children, className = '', titleAs = 'h3' }) {
  const Title = titleAs;
  return (
    <article id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`aero flex flex-col ${className}`}>
      <div className="aero-titlebar flex-wrap">
        {icon}
        <Title id={id ? `${id}-title` : undefined} className="aero-title m-0 mr-auto text-[1.0625rem] leading-snug">
          {title}
        </Title>
        {badge && <span className="relative">{badge}</span>}
      </div>
      <div className="aero-client flex-1 p-4 sm:p-5">{children}</div>
    </article>
  );
}

export function TagList({ tags }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Built with">
      {tags.map((tag) => (
        <li key={tag} className="rounded-md border border-field/20 bg-field/[0.07] px-2 py-0.5 text-[0.8125rem] font-medium text-ink-soft">
          {tag}
        </li>
      ))}
    </ul>
  );
}
