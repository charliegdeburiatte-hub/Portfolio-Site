import { Mail, Github, Linkedin } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function Contact() {
  const { contact } = contentData.personal;

  return (
    <section id="contact" className="section-container">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-aero-dark">
          Get in Touch
        </h2>
        <p className="text-xl text-depth-300 mb-12">
          Open to opportunities and collaboration
        </p>

        <div className="glass-card p-8 inline-block">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={`mailto:${contact.email}`}
              className="btn-glow flex items-center gap-2 justify-center"
            >
              <Mail size={20} />
              <span>Email</span>
            </a>

            <a
              href={`https://github.com/${contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-aero-blue text-aero-blue rounded-lg hover:bg-aero-blue/10 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-aero-blue text-aero-blue rounded-lg hover:bg-aero-blue/10 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
