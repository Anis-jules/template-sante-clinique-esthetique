import { Calendar } from 'lucide-react';
import { siteConfig } from '@/config/site';
import content from '../content.json';

const c = content.appointmentButton;

type Props = {
  variant?: 'primary' | 'light' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withIcon?: boolean;
  label?: string;
};

const variants: Record<NonNullable<Props['variant']>, string> = {
  primary:
    'bg-beige-600 text-blanc hover:opacity-90 shadow-sm hover:shadow-md',
  light:
    'bg-blanc text-anthracite-500 hover:bg-beige-50 border border-beige-200 shadow-sm',
  ghost:
    'bg-transparent text-anthracite-500 hover:bg-beige-100 border border-anthracite-400/30',
};

const sizes: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-5 py-2.5 text-[10px]',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-sm',
};

export function AppointmentButton({
  variant = 'primary',
  size = 'md',
  className = '',
  withIcon = true,
  label = c.label,
}: Props) {
  return (
    <a
      href={siteConfig.doctolibUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full font-sans uppercase tracking-[0.16em] font-medium transition-all duration-500 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {withIcon && (
        <Calendar
          size={size === 'lg' ? 18 : 16}
          strokeWidth={1.5}
          className="transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </a>
  );
}
