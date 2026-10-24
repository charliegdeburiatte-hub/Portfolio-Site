import contentData from '../CONTENT_DATA.json';
import { SectionHeading } from './ui';

// One spec row per group: label in three columns, values in the other nine
function Group({ label, children }) {
  return (
    <section aria-label={label} className="col-span-full grid grid-cols-subgrid gap-y-2 border-t border-hairline py-5">
      <h3 className="m-0 text-[0.9375rem] font-semibold text-text-2 sm:col-span-8 lg:col-span-3">{label}</h3>
      <ul className="m-0 list-none p-0 sm:col-span-8 md:columns-2 md:gap-x-6 lg:col-span-9">{children}</ul>
    </section>
  );
}

function Row({ title, value }) {
  return (
    <li className="flex break-inside-avoid items-baseline justify-between gap-4 border-b border-hairline py-2.5 last:border-b-0">
      <span className="text-text">{title}</span>
      {value && <span className="max-w-[55%] text-right text-[0.875rem] text-text-2">{value}</span>}
    </li>
  );
}

function Skills() {
  const { skills } = contentData;

  return (
    <section id="skills" aria-labelledby="skills-title" className="wrap pt-4 pb-16 lg:pb-20">
      <div className="grid-12 gap-y-0">
        <SectionHeading id="skills-title" title="Skills" className="mb-10" />

        <Group label="Certifications">
          {skills.certifications.map((c) => (
            <Row key={c.name} title={c.name} value={c.year ? `${c.status}, ${c.year}` : c.status} />
          ))}
        </Group>

        {skills.technical_expertise.map((cat) => (
          <Group key={cat.category} label={cat.category}>
            {cat.skills.map((s) => <Row key={s} title={s} />)}
          </Group>
        ))}

        <Group label="Currently learning">
          {skills.actively_learning.map((s) => (
            <Row key={s.name} title={s.name} value={s.context} />
          ))}
        </Group>

        <section aria-label="Soft skills" className="col-span-full grid grid-cols-subgrid gap-y-2 border-y border-hairline py-5">
          <h3 className="m-0 text-[0.9375rem] font-semibold text-text-2 sm:col-span-8 lg:col-span-3">Soft skills</h3>
          <p className="m-0 max-w-[70ch] text-text sm:col-span-8 lg:col-span-9">{skills.soft_skills.join(', ')}</p>
        </section>
      </div>
    </section>
  );
}

export default Skills;
