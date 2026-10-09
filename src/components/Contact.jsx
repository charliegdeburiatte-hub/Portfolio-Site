import { useState } from 'react';
import { AlertCircle, CheckCircle, Download, FileText, Github, Linkedin, Mail, Send } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';
import { AeroWindow, SectionHeading } from './ui';

const fieldClass =
  'field-inset mt-1.5 block w-full rounded-[12px] px-3.5 py-3 text-ink placeholder:text-ink-soft/80';

function Contact({ onOpenCV }) {
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
    <section id="contact" aria-labelledby="contact-title" className="page-section">
      <SectionHeading
        id="contact-title"
        title="Get in touch"
        intro="Open to IT support roles and freelance work. Remote preferred."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <AeroWindow title="Send a message" icon={<Mail size={18} className="relative text-ink" aria-hidden="true" />}>
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center" role="status">
              <CheckCircle size={44} className="text-field" aria-hidden="true" />
              <p className="m-0 text-lg font-semibold text-ink">Message sent</p>
              <p className="m-0 text-ink-soft">Thanks for getting in touch. I&apos;ll get back to you soon.</p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-2 min-h-11 font-medium text-link underline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="font-medium text-ink">Name</label>
                <input id="contact-name" type="text" name="name" autoComplete="name" value={formData.name}
                  onChange={handleChange} required placeholder="Your name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="contact-email" className="font-medium text-ink">Email</label>
                <input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email}
                  onChange={handleChange} required placeholder="your@email.com" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="contact-message" className="font-medium text-ink">Message</label>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange}
                  required rows={5} placeholder="What would you like to discuss?" className={`${fieldClass} resize-y`} />
              </div>

              {status === 'error' && (
                <p className="m-0 flex items-start gap-2 text-[0.9375rem] font-medium text-[#A33A22]" role="alert">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    That didn&apos;t send. Please email me directly instead:{' '}
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </span>
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn btn-gloss w-full disabled:cursor-wait disabled:opacity-70">
                <Send size={18} aria-hidden="true" />
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </AeroWindow>

        <div className="flex flex-col gap-5">
          <div className="glass rounded-[28px] p-5 sm:p-6">
            <h3 className="m-0 text-[1.0625rem] font-semibold text-ink">CV / Résumé</h3>
            <p className="mt-1 mb-4 text-[0.9375rem] text-ink-soft">
              Download my full CV for roles in IT support and systems administration.
            </p>
            <div className="flex flex-wrap gap-2">
              <a className="btn btn-gloss btn-sm" href="/cv.pdf" download="Charlie_De_Buriatte_CV.pdf">
                <Download size={16} aria-hidden="true" />
                PDF
              </a>
              <a className="btn btn-metal btn-sm" href="/Charlie_De_Buriatte_CV.docx" download>
                <Download size={16} aria-hidden="true" />
                Word
              </a>
              <button type="button" className="btn btn-metal btn-sm" onClick={onOpenCV}>
                <FileText size={16} aria-hidden="true" />
                View CV
              </button>
            </div>
          </div>

          <div className="glass overflow-hidden rounded-[28px]">
            <h3 className="m-0 px-5 pt-5 pb-2 text-[1.0625rem] font-semibold text-ink sm:px-6">Find me online</h3>
            <ul className="m-0 list-none p-0 pb-2">
              {[
                { href: `mailto:${contact.email}`, icon: Mail, label: contact.email },
                { href: `https://github.com/${contact.github}`, icon: Github, label: `github.com/${contact.github}`, external: true },
                { href: contact.linkedin, icon: Linkedin, label: 'LinkedIn profile', external: true },
              ].map(({ href, icon, label, external }) => {
                const Icon = icon;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex min-h-12 items-center gap-3 px-5 py-2 font-medium break-all hover:bg-white/60 sm:px-6"
                    >
                      <Icon size={18} className="shrink-0" aria-hidden="true" />
                      {label}
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="glass rounded-[28px] p-5 sm:p-6">
            <h3 className="m-0 mb-2 text-[1.0625rem] font-semibold text-ink">Availability</h3>
            <ul className="m-0 list-none space-y-1.5 p-0 text-ink-soft">
              {['Open to IT support roles', 'Open to freelance projects', `Remote preferred / ${location.split('/').pop().trim()}`].map((line) => (
                <li key={line} className="flex items-center gap-2.5">
                  <CheckCircle size={16} className="shrink-0 text-field" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
