import { Target, BookOpen, Award, Wrench } from 'lucide-react';
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
    <section id="skills" className="section-container">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-text-primary">
          Skills & Expertise
        </h2>

        {/* Technical Expertise */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-aero-blue" size={24} />
            <h3 className="text-2xl font-semibold text-aero-dark">Technical Skills</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.technical_expertise.map((category, index) => (
              <div key={index} className="glass-card p-6">
                <h4 className="font-semibold text-aero-dark mb-4">{category.category}</h4>
                <div className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="text-sm text-depth-300">• {skill}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {skills.certifications && skills.certifications.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-green-500" size={24} />
              <h3 className="text-2xl font-semibold text-aero-dark">Certifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.certifications.map((cert, index) => (
                <div key={index} className="glass-card p-4">
                  <h4 className="font-semibold text-aero-dark">{cert.name}</h4>
                  <p className="text-sm text-depth-300 mt-1">{cert.status} • {cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actively learning */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-amber-500" size={24} />
            <h3 className="text-2xl font-semibold text-aero-dark">Currently Learning</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.actively_learning.map((skill) => (
              <SkillItem key={skill.name} skill={skill} showContext={true} />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        {skills.soft_skills && skills.soft_skills.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="text-purple-500" size={24} />
              <h3 className="text-2xl font-semibold text-aero-dark">Soft Skills</h3>
            </div>
            <div className="glass-card p-6">
              <div className="flex flex-wrap gap-3">
                {skills.soft_skills.map((skill) => (
                  <span key={skill} className="tech-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

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
