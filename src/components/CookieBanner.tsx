import { useEffect, useState } from 'react';
import { CookieIcon, X } from 'lucide-react';
import content from '../content.json';

const STORAGE_KEY = 'cdl-cookie-consent';

export function CookieBanner() {
  const c = content.cookieBanner;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false, date: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 sm:p-6 animate-fade-up">
      <div className="mx-auto max-w-content glass rounded-2xl shadow-2xl border border-beige-200 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="flex items-start gap-4 flex-1">
            <CookieIcon className="text-anthracite-400 mt-0.5 shrink-0" size={26} strokeWidth={1.5} />
            <div>
              <p className="text-sm text-anthracite-400 leading-relaxed">
                {c.text}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={decline}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-anthracite-300 hover:text-anthracite-500 transition-colors"
            >
              {c.decline}
            </button>
            <button
              onClick={accept}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs uppercase tracking-[0.14em] rounded-full bg-anthracite-500 text-blanc hover:bg-anthracite-400 transition-colors"
            >
              {c.accept}
            </button>
            <button
              onClick={decline}
              className="hidden sm:flex items-center justify-center w-9 h-9 text-anthracite-300 hover:text-anthracite-500 transition-colors"
              aria-label={c.close}
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
