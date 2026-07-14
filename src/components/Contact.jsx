import { useState } from 'react';
import { Mail, Github, Linkedin, Send, Download, CheckCircle, AlertCircle } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';

function Contact() {
  const { contact, location } = contentData.personal;
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
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink font-display">Get in touch</h2>
      <p className="text-xl text-ink-muted mb-12">
        Open to IT support roles and freelance opportunities — remote preferred.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-8">
          <h3 className="text-xl font-semibold text-ink mb-6 font-display">Send a message</h3>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
              <CheckCircle size={44} className="text-pine" />
              <p className="text-ink font-semibold text-lg">Message sent</p>
              <p className="text-ink-muted text-sm">Thanks for reaching out — I'll get back to you soon.</p>
              <button onClick={() => setStatus('idle')} className="link-quiet underline text-sm mt-2">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-ink-muted mb-1">Name</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  required placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-ink placeholder-ink-faint focus:outline-none focus:border-plum transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-ink-muted mb-1">Email</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  required placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-ink placeholder-ink-faint focus:outline-none focus:border-plum transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-ink-muted mb-1">Message</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange}
                  required rows={5} placeholder="What would you like to discuss?"
                  className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-ink placeholder-ink-faint focus:outline-none focus:border-plum transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-rust text-sm">
                  <AlertCircle size={16} />
                  <span>Something went wrong — please try emailing directly.</span>
                </div>
              )}

              <button
                type="submit" disabled={status === 'sending'}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                <span>{status === 'sending' ? 'Sending...' : 'Send message'}</span>
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-ink mb-2 font-display">CV / Résumé</h3>
            <p className="text-sm text-ink-muted mb-4">Download my full CV for roles in IT support and systems administration.</p>
            <a href="/Charlie_De_Buriatte_CV.docx" download className="btn-primary w-full">
              <Download size={18} />
              <span>Download CV</span>
            </a>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-ink mb-4 font-display">Find me online</h3>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-ink-muted hover:text-plum transition-colors">
                <Mail size={18} className="text-plum" />
                <span>{contact.email}</span>
              </a>
              <a href={`https://github.com/${contact.github}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink-muted hover:text-plum transition-colors">
                <Github size={18} className="text-plum" />
                <span>github.com/{contact.github}</span>
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink-muted hover:text-plum transition-colors">
                <Linkedin size={18} className="text-plum" />
                <span>LinkedIn profile</span>
              </a>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-ink mb-2 font-display">Availability</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-plum inline-block" />
                <span className="text-ink-muted">Open to IT support roles</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-plum inline-block" />
                <span className="text-ink-muted">Open to freelance projects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-plum inline-block" />
                <span className="text-ink-muted">Remote preferred / {location.split('/').pop().trim()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
