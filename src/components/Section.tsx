import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  id?: string;
  bg?: 'soft' | 'white' | 'beige' | 'anthracite';
  align?: 'left' | 'center';
};

const fonds = {
  soft: 'bg-gradient-soft',
  white: 'bg-blanc',
  beige: 'bg-beige-100',
  anthracite: 'bg-anthracite-500',
};

/**
 * Section de contenu.
 *
 * L'en-tête est centré et le titre en capitales espacées, comme les en-têtes
 * de page : c'est ce qui donne au moule son allure de maison plutôt que de
 * cabinet. `intro` a été ajouté parce que ce dessin veut une phrase sous le
 * titre — sans elle, le titre flotte seul au-dessus d'une grille.
 */
export function Section({ eyebrow, title, intro, children, id, bg = 'white', align = 'center' }: Props) {
  const sombre = bg === 'anthracite';
  const centre = align === 'center';
  return (
    <section id={id} className={`py-20 sm:py-28 ${fonds[bg]}`}>
      <div className="mx-auto max-w-content px-5 sm:px-8">
        {(eyebrow || title) && (
          <div className={`mb-12 sm:mb-16 ${centre ? 'mx-auto max-w-wide text-center' : 'max-w-2xl'}`}>
            {eyebrow && (
              <Reveal>
                <span
                  className={`mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.28em] ${
                    sombre ? 'text-beige-400' : 'text-beige-600'
                  }`}
                >
                  {eyebrow}
                </span>
              </Reveal>
            )}
            {title && (
              <Reveal delay={80}>
                <h2
                  className={`text-balance font-serif text-heading font-normal uppercase leading-[1.15] tracking-[0.09em] ${
                    sombre ? 'text-blanc' : 'text-anthracite-500'
                  }`}
                >
                  {title}
                </h2>
              </Reveal>
            )}
            {intro && (
              <Reveal delay={140}>
                <p
                  className={`mt-5 text-balance font-light leading-relaxed ${
                    centre ? 'mx-auto max-w-prose' : ''
                  } ${sombre ? 'text-beige-200' : 'text-anthracite-200'}`}
                >
                  {intro}
                </p>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
