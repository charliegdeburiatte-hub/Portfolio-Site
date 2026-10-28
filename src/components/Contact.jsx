import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import contentData from '../CONTENT_DATA.json';
import { SectionHeading } from './ui';

const fieldClass = 'field mt-1.5 block w-full px-3.5 py-3';

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

  const links = [
    { label: 'Email', href: `mailto:${contact.email}`, text: contact.email },
    { label: 'GitHub', href: `https://github.com/${contact.github}`, text: `github.com/${contact.github}`, external: true },
    { label: 'LinkedIn', href: contact.linkedin, text: 'LinkedIn profile', external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap pt-4 pb-24 lg:pb-32">
      <div className="grid-12 gap-y-10">
        <SectionHeading
          id="contact-title"
          title="Get in touch"
          intro="Open to IT support roles and freelance work. Remote preferred."
        />

        <dl className="spec self-start sm:col-span-8 lg:col-span-5 lg:col-start-1">
          {links.map(({ label, href, text, external }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <a
                  href={href}
                  className="inline-link min-h-0 break-all"
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {text}
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </dd>
            </div>
          ))}
          <div>
            <dt>Based in</dt>
            <dd>{location}. Remote preferred.</dd>
          </div>
          <div>
            <dt>CV</dt>
            <dd className="flex flex-wrap gap-x-5">
              <button type="button" className="inline-link cursor-pointer border-0 bg-transparent p-0 font-[inherit]" onClick={onOpenCV}>View CV</button>
              <a className="inline-link" href="/cv.pdf" download="Charlie_De_Buriatte_CV.pdf">PDF</a>
              <a className="inline-link" href="/Charlie_De_Buriatte_CV.docx" download>Word</a>
            </dd>
          </div>
        </dl>

        <div className="rounded-[4px] border border-hairline bg-raised p-5 sm:col-span-8 sm:p-7 lg:col-span-6 lg:col-start-7">
          <h3 className="m-0 text-[1rem] font-semibold text-text">Send a message</h3>
          {status === 'success' ? (
            <div className="mt-4" role="status">
              <p className="m-0 flex items-center gap-2 font-semibold text-text">
                <CheckCircle size={18} className="text-chrome" aria-hidden="true" />
                Message sent
              </p>
              <p className="mt-1 mb-0 text-text-2">Thanks for getting in touch. I&apos;ll get back to you soon.</p>
              <button type="button" onClick={() => setStatus('idle')} className="inline-link mt-2 cursor-pointer border-0 bg-transparent p-0 font-[inherit]">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div>
                <label htmlFor="contact-name" className="text-[0.9375rem] font-medium text-text-2">Name</label>
                <input id="contact-name" type="text" name="name" autoComplete="name" value={formData.name}
                  onChange={handleChange} required className={fieldClass} />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-[0.9375rem] font-medium text-text-2">Email</label>
                <input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email}
                  onChange={handleChange} required className={fieldClass} />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-[0.9375rem] font-medium text-text-2">Message</label>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange}
                  required rows={5} className={`${fieldClass} resize-y`} />
              </div>

              {status === 'error' && (
                <p className="m-0 flex items-start gap-2 text-[0.9375rem] text-text" role="alert">
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
                  <span>
                    That didn&apos;t send. Please email me directly instead:{' '}
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </span>
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-secondary disabled:cursor-wait disabled:opacity-70">
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
