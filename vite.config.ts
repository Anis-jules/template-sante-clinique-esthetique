import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import content from './src/content.json';

// ─── Hostivo — SEO & branding depuis content.json, injectés au build ───
// index.html reste une coquille statique : ce plugin fait de content.json la
// SEULE source de vérité pour le <head>. Sans lui, chaque site né de ce moule
// hériterait du titre et de la description du cabinet d'origine — le défaut
// qui a mis « Bene Coach NutriSport » en ligne le 25/08/2026.
//
// Adaptation à CE moule : l'identité vit dans la section `cabinet` (name,
// phone, emailInternal, adresse en champs séparés), le SEO dans `seo`.
type Dict = Record<string, unknown>;
const asDict = (v: unknown): Dict => (v && typeof v === 'object' ? (v as Dict) : {});
const asText = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

function seoFromContentJson(): Plugin {
  const c = content as unknown as Dict;
  const seo = asDict(c.seo) as Record<string, string>;
  const theme = asDict(c.theme) as Record<string, string>;
  const cab = asDict(c.cabinet);

  const siteUrl = (process.env.URL ?? '').replace(/\/$/, '');
  const absolu = (u: string) =>
    /^https?:\/\//.test(u) ? u : siteUrl ? siteUrl + (u.startsWith('/') ? u : `/${u}`) : '';

  const nom = asText(cab.name) || asText(seo.titre_page) || 'Hostivo';
  const couleur = asText(theme.couleur_bouton) || asText(theme.couleur_titre) || '#3B30E5';
  /*
   * L'ICÔNE DE L'ONGLET.
   *
   * ⚠⚠ Ce plugin efface TOUTE déclaration d'icône de index.html : ce qui est
   * décidé ici est ce que la cliente verra, rien d'autre ne survit au build.
   *
   * Deux défauts corrigés le 10/09/2026, après mesure des 76 sites du parc :
   *  - la lettre était écrite en BLANC quoi qu'il arrive. Une marque à couleur
   *    claire donnait donc une lettre invisible. Le contraste est mesuré.
   *  - une SEULE initiale, prise sur le premier mot. « Miss Bindou » donnait
   *    « M ». Deux initiales distinguent bien mieux deux onglets côte à côte.
   */
  const petits = new Set(['de','du','des','la','le','les','a','à','au','aux','et','en','by','the','of','chez','&','l']);
  const mots = String(nom).split(/[—|–]/)[0].split(/[\s'’.]+/)
    .map((m) => m.replace(/[^\p{L}\p{N}]/gu, '')).filter((m) => m && !petits.has(m.toLowerCase()));
  const initiale = (mots.length === 0 ? 'H'
    : mots.length === 1 ? (mots[0].length <= 3 ? mots[0] : mots[0].slice(0, 2))
    : mots[0][0] + mots[1][0]).toUpperCase();
  const couleurFavicon = theme.couleur_bouton ?? theme.couleur_titre ?? '#3B30E5';
  const clarte = (hex) => { const n = String(hex).replace('#',''); if (n.length < 6) return 0;
    const v = [0,2,4].map((i) => { const c = parseInt(n.slice(i,i+2),16)/255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); });
    return 0.2126*v[0] + 0.7152*v[1] + 0.0722*v[2]; };
  const ecart = (a, b) => { const x = clarte(a), y = clarte(b); const [h, l] = x > y ? [x, y] : [y, x]; return (h+0.05)/(l+0.05); };
  const encreFavicon = ecart(couleurFavicon, '#FFFFFF') >= ecart(couleurFavicon, '#14120F') ? '#FFFFFF' : '#14120F';
  const tailleFavicon = initiale.length >= 3 ? 26 : initiale.length === 2 ? 32 : 38;
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${couleurFavicon}"/><text x="32" y="32" font-family="Helvetica Neue,Helvetica,Arial,sans-serif" font-size="${tailleFavicon}" font-weight="600" text-anchor="middle" dominant-baseline="central" fill="${encreFavicon}">${initiale}</text></svg>`;
  const faviconTag = `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(faviconSvg)}" />`;

  // Règle Hostivo : sans visuel fourni par le client, aucune balise d'image.
  const imageBrute = asText(seo.og_image) || asText(asDict(cab.photos).hero);
  const ogImage = imageBrute ? absolu(imageBrute) : '';

  const jsonLd: Record<string, unknown> = { '@context': 'https://schema.org', '@type': 'Dentist', name: nom };
  if (seo.meta_description) jsonLd.description = seo.meta_description;
  if (asText(cab.phone)) jsonLd.telephone = asText(cab.phone);
  if (asText(cab.emailInternal)) jsonLd.email = asText(cab.emailInternal);
  if (siteUrl) jsonLd.url = siteUrl;
  if (ogImage) jsonLd.image = ogImage;
  const rue = asText(cab.addressStreet);
  const cp = asText(cab.addressPostalCode);
  const ville = asText(cab.addressLocality);
  if (rue || cp || ville) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      ...(rue ? { streetAddress: rue } : {}),
      ...(cp ? { postalCode: cp } : {}),
      ...(ville ? { addressLocality: ville } : {}),
      addressCountry: 'FR',
    };
  }

  return {
    name: 'seo-from-content-json',
    transformIndexHtml(html) {
      html = html
        .replace(/[ \t]*<link[^>]*rel="[^"]*icon[^"]*"[^>]*>\s*\n?/gi, '')
        .replace(/[ \t]*<meta property="og:image"[^>]*>\s*\n?/gi, '')
        .replace(/[ \t]*<meta property="og:url"[^>]*>\s*\n?/gi, '')
        .replace(/[ \t]*<link rel="canonical"[^>]*>\s*\n?/gi, '')
        .replace(/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*\n?/gi, '');
      html = html
        .replace(/<title>.*?<\/title>/, `<title>${seo.titre_page ?? nom}</title>`)
        .replace(/(<meta name="description" content=")[^"]*(")/, `$1${seo.meta_description ?? ''}$2`)
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${seo.og_titre ?? seo.titre_page ?? nom}$2`)
        .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${seo.og_description ?? seo.meta_description ?? ''}$2`);
      const tags = [
        faviconTag,
        siteUrl ? `<link rel="canonical" href="${siteUrl}/" />` : '',
        siteUrl ? `<meta property="og:url" content="${siteUrl}/" />` : '',
        ogImage ? `<meta property="og:image" content="${ogImage}" />` : '',
        `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
      ].filter(Boolean).map((t) => `    ${t}`).join('\n');
      return html.replace(/\s*<\/head>/, `\n${tags}\n  </head>`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoFromContentJson()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
