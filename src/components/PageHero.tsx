import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
};

/**
 * En-tête de page.
 *
 * Composition centrée, titre en serif capitales largement espacées : c'est la
 * signature de ce moule. `align` est conservé pour ne casser aucune page qui
 * le passe déjà, mais le centre est la valeur par défaut ici — un titre aligné
 * à gauche casse le rythme des bandeaux pleine largeur qui suivent.
 */
export function PageHero({ eyebrow, title, subtitle, align = 'center' }: Props) {
  const centre = align === 'center';
  return (
    <section className="relative overflow-hidden bg-blanc pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <div className={centre ? 'mx-auto max-w-wide text-center' : 'max-w-2xl'}>
          {eyebrow && (
            <Reveal>
              <span className="mb-5 inline-block text-[10px] font-semibold uppercase tracking-[0.28em] text-beige-600">
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h1 className="text-balance font-serif text-heading font-normal uppercase leading-[1.1] tracking-[0.09em] text-anthracite-500">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={160}>
              <p
                className={`mt-6 text-balance text-base font-light leading-relaxed text-anthracite-200 sm:text-lg ${
                  centre ? 'mx-auto max-w-prose' : ''
                }`}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
