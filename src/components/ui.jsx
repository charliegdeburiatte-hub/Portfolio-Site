// Every section starts on column 1, the same left edge as the hero.
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
