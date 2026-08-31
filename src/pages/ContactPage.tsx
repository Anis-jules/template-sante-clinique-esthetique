import { useState, type FormEvent } from 'react';
import { CheckCircle2, CreditCard, Instagram, Loader2, Mail, MapPin, Phone, Send, Clock, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { AppointmentButton } from '@/components/AppointmentButton';
import content from '../content.json';

const c = content.contactPage;

const subjects = c.subjects.items;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const SITE_ID = (window as unknown as { HOSTIVO_SITE_ID?: string }).HOSTIVO_SITE_ID;
    const idValide = !!SITE_ID && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(SITE_ID);

    const messageComplet = [
      form.message,
      form.subject ? `Motif : ${form.subject}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    if (idValide) {
      try {
        const reponse = await fetch('https://app.hostivo.fr/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            site: SITE_ID,
            nom: form.name,
            email: form.email,
            telephone: form.phone,
            message: messageComplet,
          }),
        });

        if (!reponse.ok) {
          throw new Error('Réponse serveur invalide');
        }

        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } catch {
        setStatus('error');
        setErrorMessage(c.errorMessage);
      }
    } else {
      const mailtoBody = encodeURIComponent(
        `Nom : ${form.name}\nEmail : ${form.email}\nTéléphone : ${form.phone}\n\n${messageComplet}`
      );
      window.location.href = `mailto:${siteConfig.emailInternal}?subject=${encodeURIComponent(
        form.subject || 'Contact depuis le site'
      )}&body=${mailtoBody}`;
      setStatus('idle');
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl bg-blanc border border-beige-200 text-anthracite-500 placeholder:text-beige-400 focus:border-anthracite-400 focus:ring-1 focus:ring-anthracite-400/20 outline-none transition-all duration-300 text-sm';
  const labelClass =
    'block text-xs uppercase tracking-[0.16em] text-anthracite-400 mb-2 font-medium';

  return (
    <div>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      <Section bg="soft">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Formulaire */}
          <Reveal>
            <div className="rounded-[2rem] bg-blanc border border-beige-200 p-8 sm:p-10 shadow-sm">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-beige-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} strokeWidth={1.25} className="text-success" />
                  </div>
                  <h2 className="font-serif text-3xl text-anthracite-500 mb-3">
                    {c.success.title}
                  </h2>
                  <p className="text-anthracite-300 font-light max-w-md mx-auto leading-relaxed">
                    {c.success.message}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm uppercase tracking-[0.16em] text-anthracite-500 hover:text-anthracite-400 transition-colors"
                  >
                    {c.success.button}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        {c.form.nameLabel}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={c.form.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        {c.form.phoneLabel}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={c.form.phonePlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      {c.form.emailLabel}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder={c.form.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      {c.form.subjectLabel}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">{c.form.subjectDefaultOption}</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      {c.form.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      placeholder={c.form.messagePlaceholder}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 rounded-xl bg-error/10 px-4 py-3.5 text-sm text-error">
                      <AlertCircle size={18} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-anthracite-500 text-blanc text-sm uppercase tracking-[0.16em] font-medium hover:bg-anthracite-400 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
                        <span>{c.form.submitting}</span>
                      </>
                    ) : (
                      <>
                        <Send
                          size={16}
                          strokeWidth={1.5}
                          className="transition-transform duration-500 group-hover:translate-x-0.5"
                        />
                        <span>{c.form.submitDefault}</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-beige-600 text-center pt-2">
                    {c.form.privacyText}{' '}
                    <a href="#/confidentialite" className="underline hover:text-anthracite-400">
                      {c.form.privacyLinkText}
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Coordonnées */}
          <div className="space-y-6">
            <Reveal delay={80}>
              <div className="rounded-[2rem] bg-blanc border border-beige-200 p-8 shadow-sm">
                <h3 className="font-serif text-2xl text-anthracite-500 mb-6">{c.coordonnees.title}</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <MapPin size={18} strokeWidth={1.5} className="mt-0.5 text-beige-500 shrink-0" />
                    <span className="text-sm text-anthracite-300 font-light leading-relaxed">
                      {siteConfig.addressLine}
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone size={18} strokeWidth={1.5} className="mt-0.5 text-beige-500 shrink-0" />
                    <a
                      href={siteConfig.phoneHref}
                      className="text-sm text-anthracite-300 font-light hover:text-anthracite-500 transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail size={18} strokeWidth={1.5} className="mt-0.5 text-beige-500 shrink-0" />
                    <a
                      href={`mailto:${siteConfig.emailInternal}`}
                      className="text-sm text-anthracite-300 font-light hover:text-anthracite-500 transition-colors break-all"
                    >
                      {siteConfig.emailDisplay}
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <Instagram
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 text-beige-500 shrink-0"
                    />
                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-anthracite-300 font-light hover:text-anthracite-500 transition-colors"
                    >
                      @{siteConfig.instagramHandle}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-[2rem] bg-blanc border border-beige-200 p-8 shadow-sm">
                <h3 className="flex items-center gap-2 font-serif text-2xl text-anthracite-500 mb-5">
                  <Clock size={20} strokeWidth={1.5} className="text-beige-500" />
                  {c.hours.title}
                </h3>
                <ul className="space-y-2.5">
                  {siteConfig.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-center justify-between text-sm border-b border-beige-100 pb-2.5 last:border-0"
                    >
                      <span className="text-anthracite-400 font-medium">{h.day}</span>
                      <span className="text-anthracite-300 font-light text-right">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="rounded-[2rem] bg-blanc border border-beige-200 p-8 shadow-sm">
                <h3 className="flex items-center gap-2 font-serif text-2xl text-anthracite-500 mb-5">
                  <CreditCard size={20} strokeWidth={1.5} className="text-beige-500" />
                  {c.payment.title}
                </h3>
                <p className="text-sm text-anthracite-300 font-light leading-relaxed">
                  {siteConfig.paymentMethods}
                </p>
                <div className="mt-6">
                  <AppointmentButton size="sm" className="w-full" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Carte */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-[2rem] overflow-hidden border border-beige-200 shadow-sm">
            <iframe
              title={c.map.title}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=4.78%2C46.08%2C4.82%2C46.10&layer=mapnik&marker=46.0907%2C4.7990`}
              className="w-full h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
