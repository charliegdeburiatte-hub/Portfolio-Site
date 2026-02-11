import { Target, BookOpen, Compass } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function SkillItem({ skill, showContext = false }) {
  return (
    <div className="glass-card p-4 hover:shadow-aero transition-all duration-300">
      <h4 className="font-semibold text-aero-dark mb-1">{skill.name}</h4>
      {showContext && (
        <p className="text-sm text-depth-300">{skill.context || skill.interest}</p>
      )}
      {skill.proficiency && (
        <span className="text-xs font-mono text-depth-200">{skill.proficiency}</span>
      )}
      {skill.goal && (
        <p className="text-xs text-aero-blue mt-2">→ {skill.goal}</p>
      )}
    </div>
  );
}

function Skills() {
  const { skills } = contentData;

  return (
    <section id="skills" className="section-container bg-white/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-aero-dark">
          Skills & Tech
        </h2>

        {/* Currently using */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-aero-blue" size={24} />
            <h3 className="text-2xl font-semibold text-aero-dark">Currently using</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.currently_using.map((skill) => (
              <SkillItem key={skill.name} skill={skill} showContext={true} />
            ))}
          </div>
        </div>

        {/* Actively learning */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-amber-500" size={24} />
            <h3 className="text-2xl font-semibold text-aero-dark">Actively learning</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.actively_learning.map((skill) => (
              <SkillItem key={skill.name} skill={skill} showContext={true} />
            ))}
          </div>
        </div>

        {/* Exploring */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Compass className="text-blue-500" size={24} />
            <h3 className="text-2xl font-semibold text-aero-dark">Exploring</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skills.exploring.map((skill) => (
              <SkillItem key={skill.name} skill={skill} showContext={true} />
            ))}
          </div>
        </div>

        {/* Tools and workflow */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-aero-dark">Tools & Workflow</h3>
          <div className="flex flex-wrap gap-3">
            {skills.tools_and_workflow.map((tool) => (
              <span key={tool} className="tech-badge">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
