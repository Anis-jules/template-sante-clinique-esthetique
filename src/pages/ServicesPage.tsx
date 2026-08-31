import { ArrowRight, Droplet, Sparkles, Stethoscope, Smile, ShieldCheck, HeartPulse } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navigate } from '@/lib/router';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { AppointmentButton } from '@/components/AppointmentButton';
import content from '../content.json';

const c = content.servicesPage;

const servicesMeta = [
  { id: 'soins', icon: Stethoscope },
  { id: 'esthetique', icon: Sparkles },
  { id: 'eclaircissement', icon: Droplet },
  { id: 'implantologie', icon: ShieldCheck },
  { id: 'parodontologie', icon: HeartPulse },
];

const services = servicesMeta.map((m, i) => ({ ...m, ...c.services.items[i] }));

export function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      {/* Introduction */}
      <Section bg="soft">
        <Reveal>
          <p className="text-lg sm:text-xl text-anthracite-300 font-light leading-relaxed max-w-prose">
            {siteConfig.tagline} {siteConfig.philosophy}
          </p>
        </Reveal>
      </Section>

      {/* Services détaillés */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 sm:py-28 ${idx % 2 === 0 ? 'bg-blanc' : 'bg-beige-50'}`}
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Reveal>
                <PhotoPlaceholder
                  label={service.title}
                  sublabel="Emplacement photo"
                  ratio={idx % 2 === 0 ? 'landscape' : 'portrait'}
                  rounded="rounded-[2rem]"
                  className="shadow-xl"
                />
              </Reveal>
              <div>
                <Reveal>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-beige-100 flex items-center justify-center">
                      <service.icon size={22} strokeWidth={1.25} className="text-anthracite-400" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.28em] text-beige-600">
                      {c.prestationLabel} {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="font-serif font-light text-anthracite-500 text-heading text-balance">
                    {service.title}
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-5 text-lg text-anthracite-300 font-light leading-relaxed">
                    {service.desc}
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <ul className="mt-8 space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-beige-500 shrink-0" />
                        <span className="text-base text-anthracite-300 font-light">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Aperçu grille */}
      <Section
        eyebrow={c.overview.eyebrow}
        title={c.overview.title}
        bg="anthracite"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <button
                onClick={() => {
                  navigate('/services');
                  setTimeout(() => {
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }}
                className="group block w-full text-left rounded-2xl glass-dark p-6 border border-beige-400/15 hover:border-beige-400/40 transition-all duration-500"
              >
                <s.icon size={26} strokeWidth={1.25} className="text-beige-300 mb-4" />
                <h3 className="font-serif text-xl text-blanc mb-2">{s.title}</h3>
                <p className="text-xs text-beige-200/70 font-light leading-relaxed">{s.short}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-beige-50 py-20 sm:py-24">
        <div className="mx-auto max-w-content px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="font-serif font-light text-anthracite-500 text-3xl sm:text-4xl text-balance max-w-2xl mx-auto">
              {c.cta.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AppointmentButton size="lg" />
              <button
                onClick={() => navigate('/contact')}
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-anthracite-400 hover:text-anthracite-500 transition-colors"
              >
                {c.cta.questionLabel}
                <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
