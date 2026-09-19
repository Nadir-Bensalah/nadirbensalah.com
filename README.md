# nadirbensalah.com

Le site personnel de Nadir Ben Salah, développeur mobile et full-stack.

Ce n'est pas un CV mis en ligne : c'est une machine d'acquisition. Un
recruteur, un CTO ou un dirigeant doit pouvoir vérifier en quelques minutes ce
que Nadir sait livrer, et le contacter sans friction.

---

## Démarrer

```bash
npm install
npm run dev        # http://localhost:4028
```

## Construire et vérifier

```bash
npm run build      # export statique dans out/ + sitemap.xml + robots.txt
npm run verifier   # contrôle l'export : échoue s'il est cassé
```

Puis, pour l'audit responsive, avec le site servi en local :

```bash
cd out && python3 -m http.server 8899 &
node scripts/audit-responsive.mjs
node scripts/captures.mjs ./captures     # captures d'écran à 4 largeurs
```

---

## Ce que les scripts vérifient réellement

Une vérification qui ne peut pas échouer ne prouve rien. Ces deux scripts
doivent pouvoir bloquer un déploiement.

`scripts/verifier.mjs` lit `out/` et échoue sur :

- un lien interne mort, une image ou une ressource absente ;
- une page sans `<title>`, sans meta description, sans `<h1>`, ou avec
  plusieurs `<h1>` ;
- un JSON-LD invalide, ou contenant `aggregateRating` / `review` (interdits,
  voir « Les règles de contenu » plus bas) ;
- un `href="#"`, un « lorem ipsum » ;
- **un tiret long** dans le texte visible ;
- une apostrophe droite, une séquence d'échappement non décodée, du mojibake ;
- un mot français écrit sans accent, un « nous » de société ;
- une URL du sitemap qui ne correspond à aucune page réelle ;
- l'absence du CV, du sitemap, du robots.txt ou du `.htaccess`.

`scripts/verifier-redirections.mjs` relit le `.htaccess` et vérifie que les
anciennes URL indexées trouvent toutes preneur, que leur cible existe dans
l'export, et que les trois règles sans lesquelles le site entier répond 404
sont bien présentes.

`scripts/audit-responsive.mjs` pilote Chrome et rend chaque page à huit
largeurs, de 320 px à 1920 px. Il échoue sur :

- un défilement horizontal involontaire ;
- un élément qui déborde de la fenêtre ;
- une cible tactile sous le minimum de 24 px du critère WCAG 2.2 ;
- un texte sous 11,5 px ;
- une image sans `width`/`height` (donc génératrice de CLS).

Soit 144 rendus contrôlés à chaque passage.

---

## Architecture

```
src/
  app/
    page.tsx                                 accueil
    realisations/                            index + [slug] : les 8 études de cas
    cdi/                                     pour un recruteur
    freelance/                               pour un client
    recruter-developpeur/                    pour qui s'apprête à publier une offre
    challenge/                               « donnez-moi un problème »
    expertise-react-native/                  pilier d'expertise
    audit-application-react-native/          prestation à périmètre fermé
    developpeur-application-mobile-amiens/   cluster local
    developpeur-freelance-amiens/            cluster local
    guides/                                  index + 3 articles
    hello/[slug]/                            prospection nominative (noindex)
    contact/  a-propos/  mentions-legales/  plan-du-site/
    ose-plus/  ose-plus-confidentialite/     support App Store d'Ose+

  content/
    apps.ts        les 8 applications : SOURCE DE VÉRITÉ
    profil.ts      parcours, compétences, disponibilité
    guides.ts      métadonnées des articles
    prospects.ts   pages /hello (vide par défaut)

  components/      Entete, Pied, CarteApp, GalerieCaptures, Formulaire…
  lib/analytics.ts couche de suivi, inerte sans traceur configuré
  styles/          les jetons de design
```

**Une information ne s'écrit qu'à un seul endroit.** Un prix, une date, un
numéro de version vivent dans `src/content/apps.ts` et nulle part ailleurs.

---

## Les règles de contenu

Elles ne sont pas négociables, et le script de vérification en applique une
partie automatiquement.

1. **Aucune note affichée.** Les huit applications totalisent six notes réelles
   sur l'App Store (1, 2 et 3 sur trois d'entre elles, zéro sur les cinq
   autres). Afficher « 5/5 » sur un tel effectif tromperait le lecteur. Les
   données structurées `aggregateRating` et `review` sont bloquées par
   `verifier.mjs`.

2. **Aucun chiffre inventé.** Pas de téléchargements, pas de revenus, pas de
   trafic, pas de « +300 % de conversion ». Si une donnée n'a pas de source
   vérifiable, elle n'apparaît pas.

3. **Aucun faux témoignage, aucun faux client, aucun logo « ils nous font
   confiance ».**

4. **Aucune page de ville dupliquée.** L'ancien site en comptait 48, au texte
   identique avec le nom de la commune substitué : ce sont des doorway pages,
   et Google les sanctionne. Seul Amiens a une page, parce que Nadir y vit et
   que l'application du réseau de bus amiénois en est la preuve.

5. **Aucun tiret long.** Deux-points, virgule, parenthèses ou point médian
   selon le sens. Vérifié à chaque build.

---

## Le design

L'identité reprend celle de [capmedia.app](https://capmedia.app), pour que les
deux sites appartiennent au même univers sans être des copies : gris chauds,
Inter comme unique famille, rayons courts (3 à 6 px, jamais de grosse bulle),
sections séparées par du vide et non par des fonds alternés, ombre réservée à
ce qui flotte réellement.

La discipline spatiale vient d'Apple : la respiration et la hiérarchie
typographique font le travail, pas la couleur. Un seul accent, le bleu
`#0075de`, utilisé avec parcimonie.

Sont proscrits : dégradés violets, glassmorphism, cartes partout, animations
gratuites, barres de compétences en pourcentage, faux terminal.

Les jetons vivent dans `src/styles/tailwind.css`. Aucune valeur de couleur, de
typographie, d'espace ou de rayon ne doit être écrite ailleurs.

---

## Deux règles ESLint désactivées

`@next/next/no-img-element` : le site est exporté en statique avec
`images.unoptimized`. `next/image` n'optimiserait rien et ajouterait du
JavaScript pour rien. Les images sont converties en WebP en amont,
dimensionnées à la main, avec `width`, `height`, `loading` et `decoding`
explicites.

`@next/next/no-page-custom-font` : règle conçue pour le routeur `pages/`. Ici
la police est déclarée dans le layout de l'App Router, donc chargée une seule
fois pour tout le site, avec `preconnect`.

Ces justifications vivent ici parce qu'ESLint refuse toute propriété de
premier niveau inconnue dans son fichier de configuration : y mettre un
commentaire JSON invalidait la configuration entière, et le lint était alors
silencieusement sauté à chaque build.

---

## Les données des applications

Toutes les données factuelles des huit applications (prix, dates, versions,
poids, iOS minimum, langues) proviennent de l'API iTunes Lookup, relevées le
19 septembre 2026. Les captures d'écran viennent des fiches App Store réelles,
converties en WebP.

Pour les rafraîchir :

```bash
curl -s "https://itunes.apple.com/lookup?id=6803202760&country=fr"
```

Attention au parsing : les descriptions contiennent des retours à la ligne
bruts qui cassent `json.loads` en mode strict. Utiliser `strict=False`.

---

## Déploiement

Automatique : un push sur `main` déclenche `.github/workflows/deploy.yml`, qui
construit le site et l'envoie en FTP dans `/public_html/` chez Hostinger.
Compter six à douze minutes.

Le workflow utilise `dangerous-clean-slate: true` : il **vide entièrement**
`/public_html/` avant chaque envoi. Rien ne doit donc exister sur le serveur
qui ne soit pas dans le dépôt.

### Le fichier `.htaccess`

`public/.htaccess` fait un travail critique et silencieux :

- `DirectorySlash Off` plus une règle de réécriture pour servir `page.html`
  quand on demande `/page`. Sans ça, **tout le site répond 404** : Next exporte
  des fichiers à plat, et Apache redirige sinon vers un dossier homonyme.
- La redirection de `www` vers le domaine nu. Sans elle, Google voit deux
  sites identiques.
- Les 301 de toutes les anciennes URL vers la page qui traite le même sujet.
- Les en-têtes de sécurité et la politique de cache.

Ne pas le modifier sans tester les réécritures : une erreur ici casse le site
entier, pas une page.

---

## Ce qui reste à faire

Voir [A-FAIRE.md](A-FAIRE.md) : ce qui demande une clé, un accès ou une
décision qui appartient à Nadir.
