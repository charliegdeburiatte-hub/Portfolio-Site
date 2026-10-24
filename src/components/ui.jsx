import { CircleCheck, Pause } from 'lucide-react';

export function SectionHeading({ id, title, intro, className = '' }) {
  return (
    <header className={`col-span-full lg:col-span-7 ${className}`}>
      <h2 id={id} className="display m-0 text-[clamp(1.5rem,3.4vw,2.25rem)] text-text">
        {title}
      </h2>
      {intro && <p className="mt-3 mb-0 max-w-[56ch] text-text-2">{intro}</p>}
    </header>
  );
}

// Status is carried by shape and label, never by colour alone
export function StatusBadge({ status, label }) {
  let mark;
  if (status === 'paused') mark = <Pause size={12} strokeWidth={3} aria-hidden="true" />;
  else if (status === 'completed') mark = <CircleCheck size={13} strokeWidth={2.5} aria-hidden="true" />;
  else mark = <span className="size-2 rounded-full bg-current" aria-hidden="true" />;

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.8125rem] font-medium text-text-2">
      <span className="inline-grid size-3.5 place-items-center text-chrome">{mark}</span>
      {label}
    </span>
  );
}

// A project window: a title strip with a hairline under it, solid body.
// The only Aero left is the thin highlight along the top edge.
export function Window({ id, title, badge, children, className = '', titleAs = 'h3' }) {
  const Title = titleAs;
  return (
    <article id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`window flex flex-col ${className}`}>
      <div className="window-bar">
        <Title id={id ? `${id}-title` : undefined} className="m-0 mr-auto text-[1rem] font-semibold leading-snug text-text">
          {title}
        </Title>
        {badge}
      </div>
      <div className="flex-1 p-5 sm:p-6">{children}</div>
    </article>
  );
}

export function TagList({ tags, label = 'Built with' }) {
  return (
    <div className="overflow-hidden">
      <ul className="tag-list flex list-none flex-wrap p-0 text-[0.875rem] text-text-2" aria-label={label}>
        {tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
    </div>
  );
}

// Temporary: Contact still uses the old name until it is rebuilt
export const AeroWindow = Window;
