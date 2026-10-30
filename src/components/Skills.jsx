import contentData from '../CONTENT_DATA.json';
import { SectionHeading } from './ui';

// Lower-case only the first letter, so names inside a note keep their capitals
const lowerFirst = (s) => (s ? s[0].toLowerCase() + s.slice(1) : s);

// One group per row: its name in columns 1 to 3, then its items run on as wrapped text
// across 4 to 12, so rows take their own length. No rules, no chips, no table
function Group({ label, children }) {
  return (
    <section aria-label={label} className="col-span-full grid grid-cols-subgrid gap-y-2 py-4">
      <h3 className="m-0 text-[0.9375rem] font-semibold text-text-2 sm:col-span-8 lg:col-span-3">{label}</h3>
      <ul className="m-0 flex max-w-[78ch] list-none flex-wrap gap-x-7 gap-y-1 p-0 sm:col-span-8 lg:col-span-9">{children}</ul>
    </section>
  );
}

function Item({ title, note }) {
  return (
    <li className="text-text">
      {title}
      {note && <span className="text-text-2">, {note}</span>}
    </li>
  );
}

function Skills() {
  const { skills } = contentData;

  return (
    <section id="skills" aria-labelledby="skills-title" className="wrap pt-4 pb-14 lg:pb-16">
      <div className="grid-12 gap-y-0">
        <SectionHeading id="skills-title" title="Skills" className="mb-6" />

        <Group label="Certifications">
          {skills.certifications.map((c) => (
            <Item key={c.name} title={c.name} note={lowerFirst(c.year ? `${c.status} ${c.year}` : c.status)} />
          ))}
        </Group>

        {skills.technical_expertise.map((cat) => (
          <Group key={cat.category} label={cat.category}>
            {cat.skills.map((s) => <Item key={s} title={s} />)}
          </Group>
        ))}

        <Group label="Currently learning">
          {skills.actively_learning.map((s) => (
            <Item key={s.name} title={s.name} note={lowerFirst(s.context)} />
          ))}
        </Group>

        <section aria-label="Soft skills" className="col-span-full grid grid-cols-subgrid gap-y-2 py-4">
          <h3 className="m-0 text-[0.9375rem] font-semibold text-text-2 sm:col-span-8 lg:col-span-3">Soft skills</h3>
          <p className="m-0 max-w-[70ch] text-text sm:col-span-8 lg:col-span-9">{skills.soft_skills.join(', ')}</p>
        </section>
      </div>
    </section>
  );
}

export default Skills;
