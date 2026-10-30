import contentData from '../CONTENT_DATA.json';
import { SectionHeading } from './ui';

function About() {
  const { bio, work_experience } = contentData;
  const timeline = [...bio.journey_timeline].reverse();
  const vantage = work_experience.find((job) => job.company === 'VantageUAV');

  return (
    <section id="about" aria-labelledby="about-title" className="wrap pt-4 pb-24 lg:pb-32">
      <div className="grid-12 gap-y-10">
        <SectionHeading id="about-title" title="About" />

        <div className="flex max-w-[64ch] flex-col gap-5 text-[1.125rem] leading-[1.65] text-text sm:col-span-8 lg:col-span-6 lg:col-start-1">
          {bio.medium.split('\n\n').map((para) => (
            <p key={para.slice(0, 24)} className="m-0">{para}</p>
          ))}
        </div>

        <div className="sm:col-span-8 lg:col-span-4 lg:col-start-9">
          <h3 className="m-0 pb-2 text-[1rem] font-semibold text-text">Timeline</h3>
          <ol className="m-0 list-none p-0">
            {timeline.map((item) => {
              const isVantage = item.milestone.includes('VantageUAV');
              return (
                <li key={item.period} className="py-3">
                  <p className="m-0 text-[0.875rem] text-anodised">{item.period}</p>
                  <p className="mt-0.5 mb-0 font-semibold leading-snug text-text">{item.milestone}</p>
                  {isVantage && vantage ? (
                    <ul className="mt-1 mb-0 list-disc pl-4 text-[0.9375rem] text-text-2 marker:text-anodised" aria-label="What I did at VantageUAV">
                      {vantage.responsibilities.map((r) => <li key={r} className="mt-1">{r}</li>)}
                    </ul>
                  ) : (
                    <p className="mt-1 mb-0 text-[0.9375rem] text-text-2">{item.context}</p>
                  )}
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
