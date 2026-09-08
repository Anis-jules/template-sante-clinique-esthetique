// Réécrit dans le HTML livré ce que le visiteur voit, pour que Google le lise
// sans exécuter le JavaScript.
//
// POURQUOI — ces sites sont des applications JavaScript : le fichier HTML
// servi ne contient qu'un conteneur vide, rempli ensuite par le navigateur.
// Un pré-rendu avait donc été injecté dans `index.html`… une seule fois, à la
// création. Il restait figé ensuite : chaque modification faite par le client
// était invisible pour les moteurs de recherche, qui continuaient d'annoncer
// l'ancien contenu. Mesuré le 21/08/2026 sur le parc : 47 sites dans ce cas,
// 12 autres sans aucun pré-rendu (page vide pour Google).
//
// Ce script tourne APRÈS `vite build`, sur `dist` : il reprend le HTML
// construit (donc avec les bons noms de fichiers), en VIDE le conteneur, et y
// écrit le rendu du site tel qu'il est aujourd'hui.
//
// ⚠ Il ne doit JAMAIS faire échouer la mise en ligne : au moindre problème il
// prévient et sort en succès, le site part comme avant.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const OUVERTURE = '<div id="root">'
const MARQUE_DEBUT = '<!--prerender-->'
const MARQUE_FIN = '<!--/prerender-->'

try {
  const cible = join(DIST, 'index.html')
  if (!existsSync(cible)) { console.warn('pré-rendu : dist/index.html absent'); process.exit(0) }

  // Un décor minimal avant de charger le site : `BrowserRouter` de
  // react-router lit `document` et `window` dès sa construction, et ces
  // objets n'existent pas hors du navigateur. On lui donne juste de quoi
  // tenir debout le temps du rendu — pas un navigateur, un trompe-l'œil.
  const adresse = new URL('http://localhost/')
  const rien = () => {}
  const faussetteStyle = { setProperty: rien, removeProperty: rien, getPropertyValue: () => '' }
  globalThis.window = globalThis.window ?? {
    location: adresse,
    history: { state: null, scrollRestoration: 'auto', pushState: rien, replaceState: rien, go: rien },
    addEventListener: rien, removeEventListener: rien, scrollTo: rien,
    matchMedia: () => ({ matches: false, addEventListener: rien, removeEventListener: rien, addListener: rien, removeListener: rien }),
    getComputedStyle: () => faussetteStyle,
    navigator: { userAgent: 'prerender', language: 'fr-FR', languages: ['fr-FR'] },
    // Des sites interrogent l'écran (densité, taille) au premier rendu.
    screen: { width: 1280, height: 800, availWidth: 1280, availHeight: 800, colorDepth: 24, deviceXDPI: 96, logicalXDPI: 96 },
    innerWidth: 1280, innerHeight: 800, devicePixelRatio: 1,
    requestAnimationFrame: (f) => setTimeout(f, 0), cancelAnimationFrame: rien,
  }
  globalThis.document = globalThis.document ?? {
    location: adresse, defaultView: globalThis.window, readyState: 'complete',
    documentElement: { style: faussetteStyle, classList: { add: rien, remove: rien, contains: () => false } },
    body: { style: {}, classList: { add: rien, remove: rien, contains: () => false }, appendChild: rien },
    head: { appendChild: rien, querySelector: () => null, querySelectorAll: () => [], insertBefore: rien },
    querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
    createElement: () => ({ style: {}, setAttribute: rien, appendChild: rien, classList: { add: rien } }),
    addEventListener: rien, removeEventListener: rien,
  }
  // Certains sites lisent le stockage local dès le premier rendu (bandeau
  // cookies, langue choisie) : sans lui, tout s'arrête là.
  const coffre = { getItem: () => null, setItem: rien, removeItem: rien, clear: rien, key: () => null, length: 0 }
  globalThis.localStorage = globalThis.localStorage ?? coffre
  globalThis.sessionStorage = globalThis.sessionStorage ?? coffre
  globalThis.screen = globalThis.screen ?? globalThis.window.screen
  // Drapeau lu par les composants qui rendent un « portail » (visionneuse,
  // menu plein écran). React refuse de rendre un portail hors du navigateur,
  // et de toute façon ces éléments n'ont rien à faire dans le HTML initial :
  // ils ne s'ouvrent que sur un clic. Ils se retirent donc pendant le
  // pré-rendu, et reviennent intacts dès que la page vit.
  globalThis.__PRERENDU__ = true
  globalThis.window.localStorage = globalThis.localStorage
  globalThis.window.sessionStorage = globalThis.sessionStorage

  const React = (await import('react')).default
  const { renderToStaticMarkup } = await import('react-dom/server')
  globalThis.React = React

  // On passe par esbuild plutôt que d'importer App.tsx directement : lui seul
  // sait résoudre les alias du projet (`@/composants`) et sait quoi faire des
  // images importées depuis le code, que Node refuse de charger. Le résultat
  // est un fichier unique que Node peut exécuter.
  const esbuild = await import('esbuild')
  const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
  const bundle = join(racine, 'node_modules', '.cache-prerendu.mjs')
  const tsconfig = ['tsconfig.app.json', 'tsconfig.json']
    .map((f) => join(racine, f)).find((f) => existsSync(f))

  // Un point transparent à la place des images importées : le pré-rendu sert
  // à donner le TEXTE aux moteurs de recherche, et une adresse d'image
  // inventée vaudrait moins que rien (elle serait explorée puis introuvable).
  const POINT = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  await esbuild.build({
    // Le point d'entrée s'écrit .tsx ou .jsx selon les moules.
    entryPoints: [['App.tsx', 'App.jsx'].map((f) => join(racine, 'src', f)).find((f) => existsSync(f))],
    outfile: bundle, bundle: true, format: 'esm', platform: 'node',
    logLevel: 'silent', jsx: 'automatic', ...(tsconfig ? { tsconfig } : {}),
    // Des dépendances appellent `require` au chargement, or il n'existe pas
    // dans un module ESM : on le leur fabrique.
    banner: { js: "import{createRequire as ___cr}from'node:module';const require=___cr(import.meta.url);" },
    // `import.meta.env` n'existe que sous Vite : sans ces valeurs, tout code
    // qui lit import.meta.env.DEV s'arrête sur « undefined ».
    // `import.meta.env` est une invention de Vite : hors de Vite il n'existe
    // pas, et tout code qui lit `import.meta.env.DEV` ou une variable VITE_…
    // s'arrête sur « undefined ». On remplace l'objet ENTIER — définir en
    // plus les clés une à une ferait échouer esbuild, les deux règles se
    // recouvrant.
    define: {
      'import.meta.env': '{"DEV":false,"PROD":true,"SSR":true,"MODE":"production","BASE_URL":"/"}',
    },
    external: ['react', 'react-dom', 'react-dom/*', 'react/*',
               'react-router', 'react-router/*', 'react-router-dom', 'react-router-dom/*', 'lucide-react'],
    plugins: [{
      name: 'images-en-point',
      setup(b) {
        b.onResolve({ filter: /\.(png|jpe?g|gif|webp|avif|svg|ico|mp4|webm|woff2?)$/i }, (a) => ({ path: a.path, namespace: 'point' }))
        b.onLoad({ filter: /.*/, namespace: 'point' }, () => ({ contents: `export default ${JSON.stringify(POINT)}`, loader: 'js' }))
        // Les feuilles de style importées depuis le code (`import 'leaflet.css'`)
        // n'ont rien à voir avec le rendu du texte, et elles entraînent
        // derrière elles leurs propres images. Vite s'en occupe de son côté.
        b.onResolve({ filter: /\.(css|scss|sass|less)$/i }, (a) => ({ path: a.path, namespace: 'sansstyle' }))
        b.onLoad({ filter: /.*/, namespace: 'sansstyle' }, () => ({ contents: '', loader: 'js' }))
      },
    }],
  })
  const App = (await import(bundle + '?v=' + Math.random())).default

  const html = readFileSync(cible, 'utf8')
  const i = html.indexOf(OUVERTURE)
  if (i === -1) { console.warn('pré-rendu : conteneur introuvable'); process.exit(0) }

  // Retirer l'ancien pré-rendu AVANT d'écrire le nouveau : sans cela les deux
  // se suivent dans le fichier et la page contient deux fois le site.
  const apresOuverture = i + OUVERTURE.length
  const avant = html.slice(0, apresOuverture)

  /**
   * Où se referme le conteneur ?
   *
   * Le plus souvent l'ancien pré-rendu est encadré par deux marques et il
   * suffit de sauter à la seconde. Mais certains sites portent un pré-rendu
   * posé par un outil plus ancien, qui ouvrait la marque sans jamais la
   * fermer : on gardait alors tout l'ancien contenu et on ajoutait le
   * nouveau par-dessus — deux fois le site dans la même page (constaté sur
   * studio-ocnaiils et zazief le 21/08/2026).
   *
   * On compte donc les balises div jusqu'à retrouver celle qui referme le
   * conteneur. Le rendu de React est toujours bien équilibré, le compte est
   * donc sûr.
   */
  const finMarquee = html.indexOf(MARQUE_FIN, apresOuverture)
  let apres
  if (html.startsWith(MARQUE_DEBUT, apresOuverture) && finMarquee !== -1) {
    apres = html.slice(finMarquee + MARQUE_FIN.length)
  } else {
    let profondeur = 1
    const balises = /<div\b[^>]*>|<\/div>/gi
    balises.lastIndex = apresOuverture
    let m, fermeture = -1
    while ((m = balises.exec(html))) {
      profondeur += m[0][1] === '/' ? -1 : 1
      if (profondeur === 0) { fermeture = m.index; break }
    }
    // Conteneur déjà vide, ou HTML qu'on ne sait pas lire : on n'écrase rien
    // d'incertain, on repart de l'ouverture.
    apres = fermeture === -1 ? html.slice(apresOuverture) : html.slice(fermeture)
  }

  let rendu
  try {
    rendu = renderToStaticMarkup(React.createElement(App))
  } catch (premiereErreur) {
    // Beaucoup de sites gardent leur routeur dans main.tsx : App utilise
    // alors <Link> ou <Routes> sans contexte au-dessus de lui. Le message
    // varie d'une version de react-router à l'autre (« context of a Router »,
    // « Cannot destructure property 'basename' »…), on ne s'y fie donc pas :
    // on réessaie enveloppé, et on ne renonce qu'après.
    try {
      const { MemoryRouter } = await import('react-router-dom')
      rendu = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(App)))
    } catch {
      throw premiereErreur
    }
  }
  if (!rendu || rendu.length < 1000) {
    console.warn(`pré-rendu : rendu de ${rendu?.length ?? 0} caractères — ignoré, l'ancien est conservé`)
    process.exit(0)
  }

  writeFileSync(cible, avant + MARQUE_DEBUT + rendu + MARQUE_FIN + apres)
  console.log(`pré-rendu : ${Math.round(rendu.length / 1024)} ko réécrits`)
  // ⚠ Sortir explicitement, comme le font les quatre chemins d'échec.
  //
  // Charger le site fabrique un `MessagePort` (mesuré : aucune poignée avant
  // `import(bundle)`, une après). Node ne s'arrête pas tant qu'une poignée
  // vit : sans cette ligne le script rendait la main à personne et `npm run
  // build` pendait pour toujours — mais SEULEMENT quand le pré-rendu avait
  // réussi, puisque tous les autres chemins sortaient déjà. Un défaut à
  // l'envers, donc invisible : on ne remarque pas ce qui ne casse que quand
  // tout va bien.
  //
  // Sans conséquence sur l'image de build de Cloudflare (nodejs@22.16.0, où
  // le processus s'arrête tout de même) ; en local sous Node 24 le build
  // pendait à l'infini. Trouvé le 08/09/2026 sur anaisrg_coach.
  process.exit(0)
} catch (e) {
  console.warn('pré-rendu ignoré :', String(e.message).slice(0, 140))
  process.exit(0)
}
