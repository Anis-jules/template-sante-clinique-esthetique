import content from '../content.json';

// ─── Identité du cabinet — lue depuis le CONTENU, jamais écrite ici ───
// Ces valeurs vivaient auparavant en dur dans ce fichier : le client ne
// pouvait donc rien y changer depuis son éditeur, et l'usine ne les
// remplissait jamais — elle n'écrit que dans content.json. Douze fichiers
// lisent `siteConfig` : en le faisant pointer sur le contenu, aucun d'eux
// n'a eu à changer.
export const siteConfig = content.cabinet;

export const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'À propos', path: '/a-propos' },
  { label: 'Services', path: '/services' },
  { label: 'Tarifs', path: '/tarifs' },
  { label: 'Galerie', path: '/galerie' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
] as const;

export type NavLink = (typeof navLinks)[number];

export const footerLinks = {
  primary: [
    { label: 'Accueil', path: '/' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Services', path: '/services' },
    { label: 'Tarifs', path: '/tarifs' },
    { label: 'Galerie', path: '/galerie' },
  ],
  secondary: [
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ],
  legal: [
    { label: 'Mentions légales', path: '/mentions-legales' },
    { label: 'Politique de confidentialité', path: '/confidentialite' },
  ],
} as const;
