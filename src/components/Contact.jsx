import { useState } from 'react';
import { Mail, Github, Linkedin, Send, Download, CheckCircle, AlertCircle } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function Contact() {
  const { contact } = contentData.personal;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xvzbrnne', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-aero-dark">
          Get in Touch
        </h2>
        <p className="text-xl text-depth-300 mb-12">
          Open to IT support roles and freelance opportunities — remote preferred.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold text-aero-dark mb-6">Send a Message</h3>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
                <CheckCircle size={48} className="text-green-400" />
                <p className="text-aero-dark font-semibold text-lg">Message sent!</p>
                <p className="text-depth-300 text-sm">Thanks for reaching out — I'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-accent underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-depth-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-bg-base/50 border border-primary/30 text-aero-dark placeholder-depth-200 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-depth-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-bg-base/50 border border-primary/30 text-aero-dark placeholder-depth-200 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-depth-300 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 rounded-lg bg-bg-base/50 border border-primary/30 text-aero-dark placeholder-depth-200 focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>Something went wrong — please try emailing directly.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-glow w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Links & CV */}
          <div className="flex flex-col gap-4">

            {/* CV Download */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-aero-dark mb-2">CV / Résumé</h3>
              <p className="text-sm text-depth-300 mb-4">Download my full CV for roles in IT support and systems administration.</p>
              <a
                href="/Charlie_De_Buriatte_CV.docx"
                download
                className="btn-glow flex items-center gap-2 justify-center w-full"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-aero-dark mb-4">Find Me Online</h3>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-depth-300 hover:text-accent transition-colors"
                >
                  <Mail size={18} className="text-accent" />
                  <span>{contact.email}</span>
                </a>
                <a
                  href={`https://github.com/${contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-depth-300 hover:text-accent transition-colors"
                >
                  <Github size={18} className="text-accent" />
                  <span>github.com/{contact.github}</span>
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-depth-300 hover:text-accent transition-colors"
                >
                  <Linkedin size={18} className="text-accent" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-aero-dark mb-2">Availability</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                  <span className="text-depth-300">Open to IT support roles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                  <span className="text-depth-300">Open to freelance projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
                  <span className="text-depth-300">Remote preferred / Looe, Cornwall</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
