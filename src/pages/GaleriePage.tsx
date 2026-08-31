import { useState } from 'react';
import { X } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import content from '../content.json';

const c = content.galeriePage;

type GalleryItem = {
  id: string;
  label: string;
  sublabel: string;
  ratio: 'portrait' | 'landscape' | 'square' | 'wide' | 'tall';
  span?: boolean;
  category: string;
  image?: string;
  alt?: string;
};

const TOUTES = 'Toutes';
type Category = string;

// Les filtres suivent les photos réellement présentes : un filtre qui ne
// renvoie aucune photo ne s'affiche pas.
const categories: Category[] = [
  TOUTES,
  ...Array.from(new Set((c.items as { category: string }[]).map((i) => i.category))),
];

const items: GalleryItem[] = c.items as GalleryItem[];

export function GaleriePage() {
  const [active, setActive] = useState<Category>(TOUTES);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === TOUTES ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      {/* Filtres */}
      <div className="bg-blanc py-6 border-b border-beige-100 sticky top-16 z-30 glass">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.14em] rounded-full transition-all duration-300 ${
                  active === cat
                    ? 'bg-anthracite-500 text-blanc'
                    : 'bg-beige-100 text-anthracite-300 hover:bg-beige-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille */}
      <Section bg="white">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[240px] gap-4">
          {filtered.map((item, i) => (
            <Reveal
              key={item.id}
              delay={(i % 4) * 70}
              className={`${item.span ? 'col-span-2 row-span-2' : ''} ${item.ratio === 'wide' && !item.span ? 'col-span-2' : ''}`}
            >
              <button
                onClick={() => setLightbox(item)}
                className="group block w-full h-full relative overflow-hidden rounded-2xl"
                aria-label={`Agrandir : ${item.label}`}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.alt ?? item.label}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <PhotoPlaceholder
                    label={item.label}
                    sublabel={item.sublabel}
                    ratio="square"
                    rounded="rounded-2xl"
                    className="w-full h-full"
                  />
                )}
                {/* Le libellé n'apparaît qu'au survol : il ne doit pas masquer la photo. */}
                <span className="absolute inset-x-0 bottom-0 p-4 text-left text-blanc text-sm font-light bg-gradient-to-t from-anthracite-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl">
                  {item.label}
                </span>
                <div className="absolute inset-0 bg-anthracite-500/0 group-hover:bg-anthracite-500/10 transition-colors duration-500 rounded-2xl" />
              </button>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-anthracite-300 font-light py-12">
            {c.emptyMessage}
          </p>
        )}
      </Section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 bg-anthracite-500/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 flex items-center justify-center w-11 h-11 rounded-full glass text-anthracite-500 hover:bg-blanc transition-colors"
            aria-label="Fermer"
            onClick={() => setLightbox(null)}
          >
            <X size={22} strokeWidth={1.5} />
          </button>
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.image ? (
              <figure className="m-0">
                <img
                  src={lightbox.image}
                  alt={lightbox.alt ?? lightbox.label}
                  className="w-full max-h-[78vh] object-contain rounded-[2rem] shadow-2xl bg-blanc"
                />
                <figcaption className="mt-3 text-center text-blanc/90 text-sm font-light">
                  {lightbox.label} — {lightbox.sublabel}
                </figcaption>
              </figure>
            ) : (
              <PhotoPlaceholder
                label={lightbox.label}
                sublabel={lightbox.sublabel}
                ratio="landscape"
                rounded="rounded-[2rem]"
                className="shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
