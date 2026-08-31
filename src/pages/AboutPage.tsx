import { GraduationCap, HeartHandshake, Sparkles, Stethoscope } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navigate } from '@/lib/router';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { AppointmentButton } from '@/components/AppointmentButton';
import type { LucideIcon } from 'lucide-react';
import content from '../content.json';

const c = content.aboutPage;

// Table typée en index : le nom d'icône vient du CONTENU, donc d'une chaîne
// libre. Sans repli, une icône inconnue rend `undefined` et la page devient
// BLANCHE (défaut vécu ailleurs dans le catalogue). Le repli est ici explicite.
const iconMap: Record<string, LucideIcon> = { HeartHandshake, GraduationCap, Sparkles, Stethoscope };

const pillars = c.pillars.items.map((p) => ({
  ...p,
  icon: iconMap[p.icon] ?? Stethoscope,
}));

export function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={<>{c.hero.titlePrefix}{siteConfig.city}</>}
        subtitle={c.hero.subtitle}
      />

      {/* Portrait + biographie */}
      <Section bg="soft">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Photo
                src={siteConfig.photos.portrait}
                alt={c.bio.portraitAlt}
                ratio="portrait"
                rounded="rounded-[2rem]"
                className="shadow-xl"
              />
            </div>
          </Reveal>
          <div className="space-y-6">
            <Reveal>
              <span className="inline-block text-xs uppercase tracking-[0.28em] text-beige-600 mb-4">
                {c.bio.label}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-serif font-light text-anthracite-500 text-3xl sm:text-4xl text-balance">
                {c.bio.title}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-lg text-anthracite-300 font-light leading-relaxed">
                {c.bio.paragraph1}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-base text-anthracite-300/80 font-light leading-relaxed">
                {c.bio.paragraph2}
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="text-base text-anthracite-300/80 font-light leading-relaxed">
                {c.bio.paragraph3}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Pilier */}
      <Section
        eyebrow={c.pillars.eyebrow}
        title={<>{c.pillars.title}</>}
        bg="white"
      >
        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="group h-full rounded-2xl bg-beige-50 border border-beige-200 p-8 hover:shadow-lg transition-all duration-500">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blanc flex items-center justify-center shrink-0 shadow-sm">
                    <p.icon size={22} strokeWidth={1.25} className="text-anthracite-400" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-anthracite-500 mb-2">{p.title}</h3>
                    <p className="text-sm text-anthracite-300 font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Formation sobre */}
      <Section bg="beige">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <span className="inline-block text-xs uppercase tracking-[0.28em] text-beige-600 mb-4">
                {c.formation.label}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-serif font-light text-anthracite-500 text-heading text-balance">
                {c.formation.title}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg text-anthracite-300 font-light leading-relaxed">
                {c.formation.paragraph1}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 text-base text-anthracite-300/80 font-light leading-relaxed">
                {c.formation.paragraph2}
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Photo
              src={siteConfig.photos.cabinet}
              alt={c.formation.cabinetAlt}
              ratio="landscape"
              rounded="rounded-[2rem]"
              className="shadow-xl"
            />
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-blanc py-20 sm:py-24">
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
                className="text-sm uppercase tracking-[0.16em] text-anthracite-400 hover:text-anthracite-500 transition-colors"
              >
                {c.cta.contactLabel}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
