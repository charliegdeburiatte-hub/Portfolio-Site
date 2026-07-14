import { Target, BookOpen, Award, Wrench } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function SkillItem({ skill, showContext = false }) {
  return (
    <div className="card p-4">
      <h4 className="font-semibold text-ink mb-1">{skill.name}</h4>
      {showContext && (
        <p className="text-sm text-ink-muted">{skill.context || skill.interest}</p>
      )}
      {skill.proficiency && (
        <span className="text-xs font-mono text-ink-faint">{skill.proficiency}</span>
      )}
      {skill.goal && (
        <p className="text-xs text-plum mt-2">&rarr; {skill.goal}</p>
      )}
    </div>
  );
}

function Skills() {
  const { skills } = contentData;

  return (
    <section id="skills" className="section-container">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-ink font-display">Skills &amp; expertise</h2>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-plum" size={22} />
          <h3 className="text-2xl font-semibold text-ink font-display">Technical skills</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.technical_expertise.map((category, index) => (
            <div key={index} className="card p-6">
              <h4 className="font-semibold text-ink mb-4">{category.category}</h4>
              <div className="space-y-2">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="text-sm text-ink-muted">{skill}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {skills.certifications && skills.certifications.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-plum" size={22} />
            <h3 className="text-2xl font-semibold text-ink font-display">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.certifications.map((cert, index) => (
              <div key={index} className="card p-4">
                <h4 className="font-semibold text-ink">{cert.name}</h4>
                <p className="text-sm text-ink-muted mt-1">{cert.status} &middot; {cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-plum" size={22} />
          <h3 className="text-2xl font-semibold text-ink font-display">Currently learning</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.actively_learning.map((skill) => (
            <SkillItem key={skill.name} skill={skill} showContext={true} />
          ))}
        </div>
      </div>

      {skills.soft_skills && skills.soft_skills.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="text-plum" size={22} />
            <h3 className="text-2xl font-semibold text-ink font-display">Soft skills</h3>
          </div>
          <div className="card p-6">
            <div className="flex flex-wrap gap-3">
              {skills.soft_skills.map((skill) => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="card p-6">
        <h3 className="text-xl font-semibold mb-4 text-ink font-display">Tools &amp; workflow</h3>
        <div className="flex flex-wrap gap-3">
          {skills.tools_and_workflow.map((tool) => (
            <span key={tool} className="tag">{tool}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
