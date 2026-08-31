import { siteConfig } from '@/config/site';
import { navigate } from '@/lib/router';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import content from '../content.json';

const c = content.confidentialitePage;

function PrivacyBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="mb-10 last:mb-0">
        <h2 className="font-serif text-2xl text-anthracite-500 mb-4">{title}</h2>
        <div className="text-sm sm:text-base text-anthracite-300 font-light leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

export function ConfidentialitePage() {
  return (
    <div>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      <Section bg="soft">
        <div className="max-w-prose mx-auto">
          <PrivacyBlock title={c.responsable.title}>
            <p>
              {c.responsable.p1_start}
              <strong>{siteConfig.legalName}</strong>{c.responsable.p1_mid}
              {siteConfig.practitioner}{c.responsable.p1_mid2}
              {siteConfig.profession.toLowerCase()}{c.responsable.p1_end}
            </p>
            <p>
              {c.responsable.p2_start}{siteConfig.addressLine}{c.responsable.p2_mid}
              <a
                href={`mailto:${siteConfig.emailInternal}`}
                className="underline hover:text-anthracite-500 break-all"
              >
                {siteConfig.emailDisplay}
              </a>
              {c.responsable.p2_mid2}{siteConfig.phone}{c.responsable.p2_end}
            </p>
          </PrivacyBlock>

          <PrivacyBlock title={c.donnees.title}>
            <p>{c.donnees.intro}</p>
            <ul className="list-disc pl-5 space-y-1.5">
              {c.donnees.items.map((item, index) => (
                <li key={index}>
                  <span className="text-anthracite-400">{item.label}</span>
                  {item.text}
                </li>
              ))}
            </ul>
            <p>{c.donnees.outro}</p>
          </PrivacyBlock>

          <PrivacyBlock title={c.finalites.title}>
            <p>{c.finalites.intro}</p>
            <ul className="list-disc pl-5 space-y-1.5">
              {c.finalites.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </PrivacyBlock>

          <PrivacyBlock title={c.baseLegale.title}>
            <p>{c.baseLegale.text}</p>
          </PrivacyBlock>

          <PrivacyBlock title={c.duree.title}>
            <p>{c.duree.p1}</p>
            <p>{c.duree.p2}</p>
          </PrivacyBlock>

          <PrivacyBlock title={c.destinataires.title}>
            <p>
              {c.destinataires.p1_start}{siteConfig.legalName}{c.destinataires.p1_end}
            </p>
            <p>{c.destinataires.p2}</p>
          </PrivacyBlock>

          <PrivacyBlock title={c.droits.title}>
            <p>{c.droits.intro}</p>
            <ul className="list-disc pl-5 space-y-1.5">
              {c.droits.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>
              {c.droits.p1_start}
              <a
                href={`mailto:${siteConfig.emailInternal}`}
                className="underline hover:text-anthracite-500 break-all"
              >
                {siteConfig.emailDisplay}
              </a>
              {c.droits.p1_mid}{siteConfig.phone}{c.droits.p1_end}
            </p>
            <p>{c.droits.p2}</p>
          </PrivacyBlock>

          <PrivacyBlock title={c.cookies.title}>
            <p>{c.cookies.text}</p>
          </PrivacyBlock>

          <PrivacyBlock title={c.securite.title}>
            <p>{c.securite.text}</p>
          </PrivacyBlock>

          <Reveal>
            <div className="mt-12 pt-8 border-t border-beige-200 flex flex-wrap gap-6">
              <button
                onClick={() => navigate('/mentions-legales')}
                className="text-sm uppercase tracking-[0.14em] text-anthracite-400 hover:text-anthracite-500 transition-colors"
              >
                {c.footerLinks.mentions}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-sm uppercase tracking-[0.14em] text-anthracite-400 hover:text-anthracite-500 transition-colors"
              >
                {c.footerLinks.contact}
              </button>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
