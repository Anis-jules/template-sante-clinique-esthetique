import { MessageCircle, CreditCard, Receipt } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navigate } from '@/lib/router';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { AppointmentButton } from '@/components/AppointmentButton';
import content from '../content.json';

const c = content.tarifsPage;

export function TarifsPage() {
  return (
    <div>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      {/* Bloc principal */}
      <Section bg="soft">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-6">
            <Reveal>
              <span className="inline-block text-xs uppercase tracking-[0.28em] text-beige-600 mb-4">
                {c.main.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-serif font-light text-anthracite-500 text-3xl sm:text-4xl text-balance">
                {c.main.title}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-lg text-anthracite-300 font-light leading-relaxed">
                {c.main.paragraph1}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-base text-anthracite-300/80 font-light leading-relaxed">
                {c.main.paragraph2}
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <AppointmentButton size="md" />
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-anthracite-400/30 text-anthracite-500 text-sm uppercase tracking-[0.16em] font-medium hover:bg-beige-100 transition-all duration-500"
                >
                  <MessageCircle size={16} strokeWidth={1.5} />
                  <span>{c.main.contactButton}</span>
                </button>
              </div>
            </Reveal>
          </div>

          {/* Carte modalités */}
          <Reveal delay={120}>
            <div className="rounded-[2rem] bg-blanc border border-beige-200 p-8 sm:p-10 shadow-sm">
              <h3 className="font-serif text-2xl text-anthracite-500 mb-6">{c.modalites.title}</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-beige-100 flex items-center justify-center shrink-0">
                    <Receipt size={20} strokeWidth={1.25} className="text-anthracite-400" />
                  </div>
                  <div>
                    <p className="font-medium text-anthracite-500 text-sm uppercase tracking-[0.12em] mb-1">
                      {c.modalites.items[0].title}
                    </p>
                    <p className="text-sm text-anthracite-300 font-light leading-relaxed">
                      {c.modalites.items[0].description}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-beige-100 flex items-center justify-center shrink-0">
                    <CreditCard size={20} strokeWidth={1.25} className="text-anthracite-400" />
                  </div>
                  <div>
                    <p className="font-medium text-anthracite-500 text-sm uppercase tracking-[0.12em] mb-1">
                      {c.modalites.items[1].title}
                    </p>
                    <p className="text-sm text-anthracite-300 font-light leading-relaxed">
                      {siteConfig.paymentMethods}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-beige-100 flex items-center justify-center shrink-0">
                    <MessageCircle size={20} strokeWidth={1.25} className="text-anthracite-400" />
                  </div>
                  <div>
                    <p className="font-medium text-anthracite-500 text-sm uppercase tracking-[0.12em] mb-1">
                      {c.modalites.items[2].title}
                    </p>
                    <p className="text-sm text-anthracite-300 font-light leading-relaxed">
                      {c.modalites.items[2].description}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Note déontologique */}
      <Section bg="white">
        <Reveal>
          <div className="mx-auto max-w-prose text-center">
            <p className="text-sm text-anthracite-300/70 font-light leading-relaxed italic">
              {c.note}
            </p>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
