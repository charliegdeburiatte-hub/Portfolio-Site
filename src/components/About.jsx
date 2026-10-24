import { BookOpen, Briefcase, Gamepad2, GraduationCap, Headset, Phone, Server } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';
import { SectionHeading } from './ui';

// Journey as a notification history, newest first
const ICONS = [BookOpen, GraduationCap, Server, Headset, Phone, Gamepad2];

function About() {
  const { bio, work_experience } = contentData;
  const journey = [...bio.journey_timeline].reverse();
  const vantage = work_experience.find((job) => job.company === 'VantageUAV');

  return (
    <section id="about" aria-labelledby="about-title" className="page-section">
      <SectionHeading id="about-title" title="About" />

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="glass rounded-[32px] p-6 sm:p-8">
          <div className="flex flex-col gap-4 text-[1.1875rem] leading-relaxed text-ink">
            {bio.medium.split('\n\n').map((para) => (
              <p key={para.slice(0, 24)} className="m-0">{para}</p>
            ))}
          </div>
        </div>

        <div className="glass rounded-[32px] p-3 sm:p-4">
          <h3 className="m-0 px-3 pt-2 pb-3 text-[1.0625rem] font-semibold text-ink">Journey</h3>
          <ol className="m-0 flex list-none flex-col gap-2 p-0">
            {journey.map((item, i) => {
              const Icon = ICONS[i] ?? Briefcase;
              const isVantage = item.milestone.includes('VantageUAV');
              return (
                <li key={item.period} className="border-b border-hairline p-3.5 last:border-b-0">
                  <div className="flex gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-[3px] border border-hairline text-text-2">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <p className="m-0 font-semibold leading-snug text-ink">{item.milestone}</p>
                        <p className="m-0 text-[0.875rem] text-ink-soft">{item.period}</p>
                      </div>
                      {isVantage && vantage ? (
                        <ul className="mt-1.5 mb-0 list-disc pl-5 text-[0.9375rem] text-ink-soft marker:text-field" aria-label="What I did at VantageUAV">
                          {vantage.responsibilities.map((r) => <li key={r} className="mb-1.5">{r}</li>)}
                        </ul>
                      ) : (
                        <p className="m-0 mt-0.5 text-[0.9375rem] text-ink-soft">{item.context}</p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default About;
