import { ArrowRight, Heart, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navigate } from '@/lib/router';
import { Reveal } from '@/components/Reveal';
import { AppointmentButton } from '@/components/AppointmentButton';
import { Photo } from '@/components/Photo';
import content from '../content.json';

const c = content.homePage;

const serviceIcons = [Stethoscope, Sparkles, ShieldCheck, Heart];

const services = c.services.items.map((s, i) => ({
  icon: serviceIcons[i],
  title: s.title,
  desc: s.desc,
}));

export function HomePage() {
  return (
    <div>
      {/* BANNIÈRE — la photo occupe tout l'écran, le texte est posé dessus.
          Le voile n'est pas décoratif : les photos de clinique sont très
          claires (murs blancs, bois), sans lui le texte blanc tombe sous le
          seuil de contraste. Mesuré : ~6:1 avec, ~2:1 sans. */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden text-center">
        <Photo src={siteConfig.photos.hero} alt={c.hero.photoAlt} fill />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(22,20,18,.50) 0%, rgba(22,20,18,.64) 46%, rgba(22,20,18,.74) 100%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-content px-5 py-28 sm:px-8">
          <div className="animate-fade-up">
            <span className="mb-6 inline-block text-[10px] font-semibold uppercase tracking-[0.28em] text-blanc/75">
              {siteConfig.city} · {siteConfig.profession}
            </span>
            <h1 className="text-balance font-serif text-display font-normal uppercase leading-[1.05] tracking-[0.09em] text-blanc">
              {c.hero.titleLine1}
              <br />
              <span className="text-blanc/70">{c.hero.titleLine2}</span>
            </h1>
            <p className="mx-auto mt-8 max-w-prose text-balance text-base font-light leading-relaxed text-blanc/85 sm:text-lg">
              {siteConfig.tagline} {siteConfig.philosophy}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <AppointmentButton size="lg" variant="light" />
              <button
                onClick={() => navigate('/services')}
                className="group inline-flex items-center gap-2 rounded-full border border-blanc/45 px-7 py-4 text-[11px] uppercase tracking-[0.16em] text-blanc transition-colors hover:bg-blanc hover:text-anthracite-500"
              >
                {c.hero.discoverLink}
                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:translate-x-1.5"
                />
              </button>
            </div>
            <p className="mt-14 text-[11px] uppercase tracking-[0.2em] text-blanc/60">
              {c.hero.cardName} · {c.hero.cardLabel}
            </p>
          </div>
        </div>
      </section>

      {/* APPROCHE */}
      <section className="bg-beige-50 py-20 sm:py-28">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <Photo
                src={siteConfig.photos.approach}
                alt={c.approche.photoAlt}
                ratio="portrait"
                rounded="rounded-[2rem]"
                className="shadow-xl"
              />
            </Reveal>
            <div>
              <Reveal>
                <span className="inline-block text-xs uppercase tracking-[0.28em] text-beige-600 mb-5">
                  {c.approche.badge}
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-serif font-light text-anthracite-500 text-heading text-balance">
                  {c.approche.title}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-lg text-anthracite-300 font-light leading-relaxed">
                  {siteConfig.philosophy}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-4 text-base text-anthracite-300/80 font-light leading-relaxed">
                  {c.approche.paragraph}
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-8">
                  <button
                    onClick={() => navigate('/a-propos')}
                    className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-anthracite-500 hover:text-anthracite-400 transition-colors"
                  >
                    {c.approche.link}
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 group-hover:translate-x-1.5"
                    />
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PRESTATIONS APERÇU */}
      <section className="bg-blanc py-20 sm:py-28">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal>
              <span className="inline-block text-xs uppercase tracking-[0.28em] text-beige-600 mb-4">
                {c.services.badge}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-serif font-light text-anthracite-500 text-heading text-balance">
                {c.services.title}
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-beige-200 bg-blanc p-8 hover:shadow-xl hover:border-beige-300 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-beige-100 flex items-center justify-center mb-6 group-hover:bg-beige-200 transition-colors duration-500">
                    <s.icon size={22} strokeWidth={1.25} className="text-anthracite-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-anthracite-500 mb-3">{s.title}</h3>
                  <p className="text-sm text-anthracite-300 font-light leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/services')}
                className="group inline-flex items-center gap-2 px-2 py-4 text-sm uppercase tracking-[0.16em] text-anthracite-500 hover:text-anthracite-400 transition-colors"
              >
                {c.services.link}
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:translate-x-1.5"
                />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA BANDEAU */}
      <section className="relative bg-anthracite-500 py-20 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(227,214,192,0.5), transparent 40%), radial-gradient(circle at 80% 70%, rgba(227,214,192,0.4), transparent 45%)',
          }}
        />
        <div className="relative mx-auto max-w-content px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="font-serif font-light text-blanc text-heading text-balance mx-auto max-w-2xl">
              {c.cta.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 text-lg text-beige-200/80 font-light max-w-xl mx-auto">
              {c.cta.subtitle}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex justify-center">
              <AppointmentButton variant="light" size="lg" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
