import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { AppointmentButton } from '@/components/AppointmentButton';
import content from '../content.json';

const c = content.faqPage;
const faqs = c.items;

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 50}>
      <div className="border-b border-beige-200">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-6 py-6 text-left group"
          aria-expanded={open}
        >
          <span className="font-serif text-xl sm:text-2xl text-anthracite-500 group-hover:text-anthracite-400 transition-colors">
            {q}
          </span>
          <ChevronDown
            size={22}
            strokeWidth={1.5}
            className={`text-beige-500 shrink-0 transition-transform duration-500 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-500 ${
            open ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-base text-anthracite-300 font-light leading-relaxed max-w-prose">
              {a}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function FaqPage() {
  return (
    <div>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      <Section bg="white">
        <div className="max-w-prose mx-auto">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} index={i} />
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-16 text-center">
            <p className="font-serif text-2xl text-anthracite-500 mb-5">
              {c.ctaTitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AppointmentButton size="md" />
              <a
                href="#/contact"
                className="text-sm uppercase tracking-[0.16em] text-anthracite-400 hover:text-anthracite-500 transition-colors"
              >
                {c.ctaLink}
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
