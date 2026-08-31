# Moule Hostivo — Cabinet dentaire

Cabinet de santé : soins, esthétique du sourire, implantologie, parodontologie.
Huit pages — accueil, à propos, services, tarifs, galerie, blog, contact, FAQ —
plus mentions légales et confidentialité.

Tiré d'un site client, dont l'identité a été entièrement retirée : aucun visuel
n'est livré, coordonnées, horaires et SIRET sont vides, et les emplacements se
remplissent à la création depuis le formulaire du client.

- Contenu éditable : `src/content.json` — **y compris l'identité du cabinet**
  (section `cabinet`), qui vivait auparavant en dur dans `src/config/site.ts`
  et n'était donc éditable par personne.
- SEO du `<head>` : produit au build par `seoFromContentJson` (vite.config.ts)
- Formulaire : branché sur `/api/contact`
- Mesure de fréquentation : marqueur `HOSTIVO_SITE_ID` dans `index.html`
