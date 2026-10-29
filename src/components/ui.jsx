// Each section starts on its own column so the grid shows by what hangs off it:
// Hero 1, Projects 4, About 2, Skills 1, Contact 4. Full class names, so Tailwind keeps them.
const START = {
  1: 'lg:col-start-1',
  2: 'lg:col-start-2',
  4: 'lg:col-start-4',
};

export function SectionHeading({ id, title, intro, start = 1, className = '' }) {
  return (
    <header className={`col-span-full lg:col-span-7 ${START[start]} ${className}`}>
      <h2 id={id} className="display m-0 text-[clamp(1.5rem,3.4vw,2.25rem)] text-text">
        {title}
      </h2>
      {intro && <p className="mt-3 mb-0 max-w-[56ch] text-text-2">{intro}</p>}
    </header>
  );
}
