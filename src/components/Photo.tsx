type Props = {
  src: string;
  alt: string;
  ratio?: 'portrait' | 'landscape' | 'square' | 'wide' | 'tall';
  className?: string;
  rounded?: string;
  /** Remplit son parent au lieu d'imposer un rapport de forme (bannières). */
  fill?: boolean;
};

const ratioClasses: Record<NonNullable<Props['ratio']>, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
  tall: 'aspect-[2/3]',
};

export function Photo({ src, alt, ratio = 'landscape', className = '', rounded = 'rounded-[2rem]', fill = false }: Props) {
  // Les moules livrent des champs image VIDES : tant que le client n'a pas
  // posé sa photo, un <img src=""> afficherait une icône d'image cassée.
  // On rend alors un fond de la palette, sur lequel le texte reste lisible.
  if (!src) {
    return (
      <div
        aria-label={alt}
        role="img"
        className={
          fill
            ? `absolute inset-0 h-full w-full bg-anthracite-400 ${className}`
            : `relative w-full ${ratioClasses[ratio]} ${rounded} bg-beige-200 ${className}`
        }
      />
    );
  }

  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`relative w-full ${ratioClasses[ratio]} ${rounded} overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
