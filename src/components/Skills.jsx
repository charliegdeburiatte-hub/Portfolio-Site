import { ChevronDown } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';
import { SectionHeading } from './ui';

// Settings-style grouped lists: a small label, then rows on one glass plate
function Group({ label, children, className = '' }) {
  return (
    <section className={`break-inside-avoid mb-6 ${className}`} aria-label={label}>
      <h3 className="m-0 mb-2 px-4 text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-on-field-soft">{label}</h3>
      <ul className="glass m-0 list-none overflow-hidden rounded-[22px] p-0">{children}</ul>
    </section>
  );
}

function Row({ title, detail, value }) {
  return (
    <li className="flex min-h-12 items-center gap-3 border-b border-field/10 px-4 py-2.5 last:border-b-0">
      <span className="min-w-0 flex-1">
        <span className="block leading-snug text-ink">{title}</span>
        {detail && <span className="block text-[0.875rem] leading-snug text-ink-soft">{detail}</span>}
      </span>
      {value && <span className="shrink-0 text-[0.875rem] text-ink-soft">{value}</span>}
    </li>
  );
}

function Skills() {
  const { skills } = contentData;

  return (
    <section id="skills" aria-labelledby="skills-title" className="page-section">
      <SectionHeading id="skills-title" title="Skills &amp; expertise" />

      <div className="gap-6 md:columns-2">
        <Group label="Certifications">
          {skills.certifications.map((c) => (
            <Row key={c.name} title={c.name} value={`${c.status} · ${c.year}`} />
          ))}
        </Group>

        {skills.technical_expertise.map((cat) => (
          <Group key={cat.category} label={cat.category}>
            {cat.skills.map((s) => <Row key={s} title={s} />)}
          </Group>
        ))}

        <Group label="Currently learning">
          {skills.actively_learning.map((s) => (
            <Row key={s.name} title={s.name} detail={s.context} />
          ))}
        </Group>

        <Group label="Tools & workflow">
          {skills.tools_and_workflow.map((t) => <Row key={t} title={t} />)}
        </Group>

        <Group label="Soft skills">
          <li>
            <details className="group">
              <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 px-4 py-2.5 text-ink [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{skills.soft_skills.length} soft skills</span>
                <ChevronDown size={18} className="text-ink-soft transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="m-0 border-t border-field/10 px-4 py-3 text-[0.9375rem] text-ink-soft">
                {skills.soft_skills.join(', ')}
              </p>
            </details>
          </li>
        </Group>
      </div>
    </section>
  );
}

export default Skills;
