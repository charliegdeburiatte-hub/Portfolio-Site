import { Zap } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function About() {
  const { bio } = contentData;

  return (
    <section id="about" className="section-container">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-ink font-display">About</h2>

      <div className="card p-8 mb-6">
        <p className="text-lg text-ink-muted leading-relaxed whitespace-pre-line">
          {bio.medium}
        </p>
      </div>

      {bio.what_drives_me && (
        <div className="card p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 text-ink flex items-center gap-2 font-display">
            <Zap className="text-plum" size={20} />
            What drives me
          </h3>
          <p className="text-ink-muted leading-relaxed">{bio.what_drives_me}</p>
        </div>
      )}

      <div className="card p-6">
        <h3 className="text-xl font-semibold mb-6 text-ink font-display">Journey</h3>
        <div className="space-y-6">
          {bio.journey_timeline.map((milestone, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-plum" />
                {index < bio.journey_timeline.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <p className="text-xs font-mono text-ink-faint mb-1">{milestone.period}</p>
                <p className="font-semibold text-ink mb-1">{milestone.milestone}</p>
                <p className="text-sm text-ink-muted">{milestone.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
