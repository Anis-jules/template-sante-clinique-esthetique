import { ImageIcon } from 'lucide-react';
import content from '../content.json';

const c = content.photoPlaceholder;

type Props = {
  label: string;
  sublabel?: string;
  ratio?: 'portrait' | 'landscape' | 'square' | 'wide' | 'tall';
  className?: string;
  rounded?: string;
};

const ratioClasses: Record<NonNullable<Props['ratio']>, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
  tall: 'aspect-[2/3]',
};

export function PhotoPlaceholder({
  label,
  sublabel,
  ratio = 'landscape',
  className = '',
  rounded = 'rounded-2xl',
}: Props) {
  return (
    <div
      className={`relative w-full ${ratioClasses[ratio]} ${rounded} overflow-hidden bg-gradient-to-br from-beige-100 via-beige-200 to-beige-300 flex items-center justify-center group ${className}`}
      role="img"
      aria-label={`${label}${sublabel ? ` — ${sublabel}` : ''} (emplacement photo à pourvoir)`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6), transparent 55%), radial-gradient(circle at 70% 80%, rgba(191,168,130,0.3), transparent 50%)',
        }}
      />
      <div className="relative flex flex-col items-center justify-center text-center px-6 transition-transform duration-700 group-hover:scale-105">
        <ImageIcon
          className="text-beige-500/70 mb-3"
          strokeWidth={1}
          size={32}
          aria-hidden="true"
        />
        <span className="font-serif text-anthracite-400 text-lg leading-tight">{label}</span>
        {sublabel && (
          <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-beige-600">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

type LogoPlaceholderProps = {
  className?: string;
  size?: number;
  showText?: boolean;
};

export function LogoPlaceholder({ className = '', size = 44, showText = true }: LogoPlaceholderProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="flex items-center justify-center rounded-xl bg-anthracite-500 text-beige-200 font-serif"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
        aria-hidden="true"
      >
        {(c.logoName || '?').trim().charAt(0).toUpperCase()}
      </div>
      {showText && (
        <div className="leading-tight">
          <div className="font-serif text-anthracite-500 text-lg">{c.logoName}</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-beige-600">
            {c.logoSubtitle}
          </div>
        </div>
      )}
    </div>
  );
}
