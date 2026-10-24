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

        <div className="flex max-w-[64ch] flex-col gap-5 text-[1.125rem] leading-[1.65] text-text sm:col-span-8 lg:col-span-7">
          {bio.medium.split('\n\n').map((para) => (
            <p key={para.slice(0, 24)} className="m-0">{para}</p>
          ))}
        </div>

        <div className="sm:col-span-8 lg:col-span-4 lg:col-start-9">
          <h3 className="m-0 border-b border-hairline pb-3 text-[1rem] font-semibold text-text">Timeline</h3>
          <ol className="m-0 list-none p-0">
            {timeline.map((item) => {
              const isVantage = item.milestone.includes('VantageUAV');
              return (
                <li key={item.period} className="border-b border-hairline py-4">
                  <p className="meta m-0">{item.period}</p>
                  <p className="mt-1 mb-0 font-semibold leading-snug text-text">{item.milestone}</p>
                  {isVantage && vantage ? (
                    <ul className="steps mt-1 text-[0.9375rem] text-text-2" aria-label="What I did at VantageUAV">
                      {vantage.responsibilities.map((r) => <li key={r}>{r}</li>)}
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
