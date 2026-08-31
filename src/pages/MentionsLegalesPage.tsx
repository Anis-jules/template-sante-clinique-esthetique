import { siteConfig } from '@/config/site';
import { navigate } from '@/lib/router';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import content from '../content.json';

const c = content.mentionsLegalesPage;

function LegalBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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

export function MentionsLegalesPage() {
  return (
    <div>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      <Section bg="soft">
        <div className="max-w-prose mx-auto">
          <LegalBlock title={c.editeur.title}>
            <p>
              {c.editeur.introPart1}<strong>{siteConfig.legalName}</strong>{c.editeur.introPart2}
              {siteConfig.practitioner}{c.editeur.introPart3}
              {siteConfig.profession.toLowerCase()}{c.editeur.introPart4}
            </p>
            <ul className="list-none space-y-1.5">
              <li>
                <span className="text-anthracite-400">{c.editeur.labelDenomination}</span> {siteConfig.legalName}
              </li>
              <li>
                <span className="text-anthracite-400">{c.editeur.labelFormeJuridique}</span> {c.editeur.valeurFormeJuridique}
              </li>
              <li>
                <span className="text-anthracite-400">{c.editeur.labelSiret}</span> {siteConfig.siret}
              </li>
              <li>
                <span className="text-anthracite-400">{c.editeur.labelSiren}</span> {siteConfig.siren}
              </li>
              <li>
                <span className="text-anthracite-400">{c.editeur.labelSiege}</span> {siteConfig.siegesocial}
              </li>
              <li>
                <span className="text-anthracite-400">{c.editeur.labelTelephone}</span>{' '}
                <a href={siteConfig.phoneHref} className="underline hover:text-anthracite-500">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <span className="text-anthracite-400">{c.editeur.labelEmail}</span>{' '}
                <a
                  href={`mailto:${siteConfig.emailInternal}`}
                  className="underline hover:text-anthracite-500 break-all"
                >
                  {siteConfig.emailDisplay}
                </a>
              </li>
            </ul>
          </LegalBlock>

          <LegalBlock title={c.directeur.title}>
            <p>
              {c.directeur.part1}{siteConfig.practitioner}{c.directeur.part2}
              {siteConfig.profession.toLowerCase()}{c.directeur.part3}
            </p>
          </LegalBlock>

          <LegalBlock title={c.hebergement.title}>
            <p>
              {c.hebergement.text}
            </p>
          </LegalBlock>

          <LegalBlock title={c.profession.title}>
            <p>
              {c.profession.paragraph1}
            </p>
            <p>
              {c.profession.paragraph2}
            </p>
          </LegalBlock>

          <LegalBlock title={c.propriete.title}>
            <p>
              {c.propriete.part1}{siteConfig.legalName}{c.propriete.part2}
            </p>
          </LegalBlock>

          <LegalBlock title={c.responsabilite.title}>
            <p>
              {c.responsabilite.paragraph1}
            </p>
            <p>
              {siteConfig.legalName}{c.responsabilite.part2}
            </p>
          </LegalBlock>

          <LegalBlock title={c.liens.title}>
            <p>
              {c.liens.part1}
              {siteConfig.legalName}{c.liens.part2}
            </p>
          </LegalBlock>

          <LegalBlock title={c.mediation.title}>
            <p>
              {c.mediation.text}
            </p>
          </LegalBlock>

          <Reveal>
            <div className="mt-12 pt-8 border-t border-beige-200 flex flex-wrap gap-6">
              <button
                onClick={() => navigate('/confidentialite')}
                className="text-sm uppercase tracking-[0.14em] text-anthracite-400 hover:text-anthracite-500 transition-colors"
              >
                {c.footer.confidentialite}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-sm uppercase tracking-[0.14em] text-anthracite-400 hover:text-anthracite-500 transition-colors"
              >
                {c.footer.contact}
              </button>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
