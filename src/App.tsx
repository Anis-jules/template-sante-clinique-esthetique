import { useHashRoute } from '@/lib/router';
import content from './content.json';

// Couleurs éditables par le client (section "theme" du content.json) — canaux R G B
if (typeof document !== 'undefined' && (content as any).theme) {
  const _hx = (h: string) => { let x = h.replace('#',''); if (x.length === 3) x = x.split('').map((c: string) => c + c).join(''); return [0,2,4].map((i: number) => parseInt(x.slice(i, i + 2), 16)).join(' '); };
  const _t = (content as any).theme;
  const _r = document.documentElement.style;
  if (_t.couleur_bouton) _r.setProperty('--hx-beige-600', _hx(_t.couleur_bouton));
  if (_t.couleur_titre) _r.setProperty('--hx-anthracite-500', _hx(_t.couleur_titre));
}
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { TarifsPage } from '@/pages/TarifsPage';
import { GaleriePage } from '@/pages/GaleriePage';
import { BlogPage } from '@/pages/BlogPage';
import { ContactPage } from '@/pages/ContactPage';
import { FaqPage } from '@/pages/FaqPage';
import { MentionsLegalesPage } from '@/pages/MentionsLegalesPage';
import { ConfidentialitePage } from '@/pages/ConfidentialitePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const routes: Record<string, () => JSX.Element> = {
  '/': HomePage,
  '/a-propos': AboutPage,
  '/services': ServicesPage,
  '/tarifs': TarifsPage,
  '/galerie': GaleriePage,
  '/blog': BlogPage,
  '/contact': ContactPage,
  '/faq': FaqPage,
  '/mentions-legales': MentionsLegalesPage,
  '/confidentialite': ConfidentialitePage,
};

function App() {
  const route = useHashRoute();
  const PageComponent = routes[route.path] ?? NotFoundPage;

  const isNotFound = !routes[route.path];

  return (
    <div className="min-h-screen flex flex-col bg-blanc">
      <Header />
      <main className="flex-1">
        <PageComponent />
      </main>
      {!isNotFound && <Footer />}
      <CookieBanner />
    </div>
  );
}

export default App;
