import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '@/config/site';
import { navigate, useHashRoute } from '@/lib/router';
import { AppointmentButton } from './AppointmentButton';
import { LogoPlaceholder } from './PhotoPlaceholder';
import content from '../content.json';

const c = content.header;

export function Header() {
  const route = useHashRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [route.path]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (path: string) =>
    path === '/' ? route.path === '/' : route.path.startsWith(path);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b border-beige-300 bg-blanc/95 backdrop-blur-md transition-all duration-500 ${
          scrolled ? 'shadow-[0_1px_14px_rgba(22,20,18,.06)]' : ''
        }`}
      >
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? 'h-16' : 'h-20'
            }`}
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center transition-opacity hover:opacity-80"
              aria-label={c.ariaHome}
            >
              <LogoPlaceholder />
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-medium transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-anthracite-500'
                      : 'text-anthracite-300 hover:text-anthracite-500'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-4 right-4 bottom-1 h-px bg-anthracite-400 transition-all duration-300 ${
                      isActive(link.path) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  />
                </button>
              ))}
            </nav>

            <div className="hidden lg:block">
              <AppointmentButton size="sm" />
            </div>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-anthracite-500"
              aria-label={c.ariaOpenMenu}
              aria-expanded={open}
            >
              <Menu strokeWidth={1.5} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-anthracite-500/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-[88%] max-w-sm bg-blanc shadow-2xl flex flex-col transition-transform duration-500 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-beige-200">
            <LogoPlaceholder />
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-10 h-10 text-anthracite-500"
              aria-label={c.ariaCloseMenu}
            >
              <X strokeWidth={1.5} size={24} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-left py-3.5 font-serif text-2xl transition-colors duration-300 border-b border-beige-100 ${
                  isActive(link.path)
                    ? 'text-anthracite-500'
                    : 'text-anthracite-300 hover:text-anthracite-500'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="p-6 border-t border-beige-200 space-y-4">
            <AppointmentButton className="w-full" />
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm text-anthracite-300 hover:text-anthracite-500 transition-colors"
            >
              @{siteConfig.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
