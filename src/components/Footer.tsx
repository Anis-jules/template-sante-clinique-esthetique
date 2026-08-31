import { Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { footerLinks, siteConfig } from '@/config/site';
import { navigate } from '@/lib/router';
import { LogoPlaceholder } from './PhotoPlaceholder';
import { AppointmentButton } from './AppointmentButton';
import content from '../content.json';

const c = content.footer;

export function Footer() {
  return (
    <footer className="relative bg-anthracite-500 text-beige-200 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(227,214,192,0.4), transparent 40%), radial-gradient(circle at 85% 80%, rgba(227,214,192,0.3), transparent 45%)',
        }}
      />
      <div className="relative mx-auto max-w-content px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <LogoPlaceholder className="mb-6 [&_*]:text-beige-200 [&_.text-anthracite-500]:text-blanc [&_.text-beige-600]:text-beige-400" />
            <p className="font-serif text-xl text-beige-100 leading-snug mb-2">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-beige-300/80 leading-relaxed max-w-xs">
              {siteConfig.philosophy}
            </p>
            <div className="mt-6">
              <AppointmentButton variant="light" size="sm" />
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-beige-400 mb-5">{c.navTitle}</h3>
            <ul className="space-y-3">
              {footerLinks.primary.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-beige-200/80 hover:text-blanc transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-beige-400 mb-5">{c.cabinetTitle}</h3>
            <ul className="space-y-3">
              {footerLinks.secondary.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-beige-200/80 hover:text-blanc transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-beige-200/80 hover:text-blanc transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-beige-400 mb-5">{c.contactTitle}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 text-beige-400 shrink-0" />
                <span className="text-beige-200/80 leading-relaxed">{siteConfig.addressLine}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} strokeWidth={1.5} className="mt-0.5 text-beige-400 shrink-0" />
                <a
                  href={siteConfig.phoneHref}
                  className="text-beige-200/80 hover:text-blanc transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} strokeWidth={1.5} className="mt-0.5 text-beige-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.emailInternal}`}
                  className="text-beige-200/80 hover:text-blanc transition-colors break-all"
                >
                  {siteConfig.emailDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} strokeWidth={1.5} className="mt-0.5 text-beige-400 shrink-0" />
                <span className="text-beige-200/80 leading-relaxed">
                  {c.consultationHours}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Instagram size={16} strokeWidth={1.5} className="mt-0.5 text-beige-400 shrink-0" />
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-beige-200/80 hover:text-blanc transition-colors"
                >
                  @{siteConfig.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-beige-400/15 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-xs text-beige-300/70 text-center sm:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. {c.rightsReserved}. {c.siretLabel} {siteConfig.siret}.
          </p>
          <div className="flex items-center gap-5">
            {footerLinks.legal.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-xs text-beige-300/70 hover:text-blanc transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem', paddingBottom: '0.5rem' }}>
        <a
          href="https://hostivo.fr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Site hébergé par Hostivo"
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px',
            opacity: 0.55, transition: 'opacity 0.25s', textDecoration: 'none',
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.opacity = '0.9'; }}
          onMouseLeave={(e) => { (e.currentTarget).style.opacity = '0.55'; }}
        >
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.72)', fontWeight: 400 }}>
            Hébergé par
          </span>
          <img
            src="/hostivo-clair.png"
            alt="Hostivo"
            loading="lazy"
            style={{ height: '20px', width: 'auto', display: 'block' }}
          />
        </a>
      </div>
    </footer>
  );
}
