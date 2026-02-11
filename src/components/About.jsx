import { Cpu, HardDrive, Zap } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function About() {
  const { bio, personal } = contentData;
  const { setup } = personal;

  return (
    <section id="about" className="section-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-aero-dark">
          About
        </h2>

        {/* Bio */}
        <div className="glass-card p-8 mb-8">
          <p className="text-lg text-depth-300 leading-relaxed whitespace-pre-line">
            {bio.medium}
          </p>
        </div>

        {/* Hardware setup */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-aero-dark flex items-center gap-2">
            <Zap className="text-aero-blue" size={24} />
            Hardware Setup
          </h3>
          <p className="text-sm text-depth-200 mb-4">{setup.purpose}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Cpu className="text-aero-blue" size={20} />
              <div>
                <p className="text-xs text-depth-200 font-mono">Processor</p>
                <p className="text-sm font-semibold">{setup.processor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HardDrive className="text-aero-blue" size={20} />
              <div>
                <p className="text-xs text-depth-200 font-mono">Memory</p>
                <p className="text-sm font-semibold">{setup.ram}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="text-aero-blue" size={20} />
              <div>
                <p className="text-xs text-depth-200 font-mono">GPU</p>
                <p className="text-sm font-semibold">{setup.gpu}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-6 text-aero-dark">Journey</h3>
          <div className="space-y-6">
            {bio.journey_timeline.map((milestone, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-aero-blue glow-aero"></div>
                  {index < bio.journey_timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-depth-100 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <p className="text-xs font-mono text-depth-200 mb-1">{milestone.period}</p>
                  <p className="font-semibold text-aero-dark mb-1">{milestone.milestone}</p>
                  <p className="text-sm text-depth-300">{milestone.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
