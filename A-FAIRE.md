# Ce qui revient à Nadir

Ce fichier liste ce que je ne peux pas faire à ta place, parce que ça demande
un accès, une clé, ou une décision qui t'appartient. Le reste est livré.

---

## 0. BLOQUANT : le déploiement ne part pas

**Le code est poussé sur `main`, mais le site en ligne n'a pas changé.**

GitHub Actions refuse de démarrer le job :

> The job was not started because recent account payments have failed or your
> spending limit needs to be increased. Please check the 'Billing & plans'
> section in your settings.

Ce n'est pas une erreur de build : le job n'a jamais commencé, il échoue en
quatre secondes. Deux tentatives, même résultat.

**Ce qu'il faut faire**, sur <https://github.com/settings/billing> :
soit régler le moyen de paiement en échec, soit relever la limite de dépense.
Puis relancer le déploiement :

```bash
cd ~/Downloads/00_WEBAPPS/Nadirbensalah.com
gh run rerun --failed          # ou : gh workflow run "Deploy to Hostinger"
gh run watch                   # suivre l'exécution
```

**En attendant, le site en ligne est intact** : il sert toujours l'ancienne
version, rien n'est cassé.

### Le repli, si tu veux publier aujourd'hui

L'export est déjà construit dans `out/` : 148 fichiers, 6,1 Mo, vérifié.
Il suffit de le téléverser par FTP dans `/public_html/`.

```bash
cd ~/Downloads/00_WEBAPPS/Nadirbensalah.com
npm run build && npm run verifier     # reconstruire, par sécurité
```

Puis, avec un client FTP (FileZilla, Cyberduck) ou `lftp` :

- serveur : `193.203.189.68`, port 21, FTP
- identifiants : ceux de hPanel, les mêmes que les secrets `FTP_USERNAME` et
  `FTP_PASSWORD` du dépôt
- **vider `/public_html/`** puis y déposer **le contenu de `out/`**, pas le
  dossier `out` lui-même

En une commande, si `lftp` est installé :

```bash
lftp -u "TON_USER,TON_MOT_DE_PASSE" 193.203.189.68 \
  -e "mirror -R --delete --verbose out/ /public_html/ ; quit"
```

**Attention au fichier `.htaccess`** : il commence par un point, et beaucoup
de clients FTP masquent les fichiers cachés par défaut. S'il n'arrive pas,
**tout le site répond 404**, parce que c'est lui qui sert les pages `.html` à
plat. À vérifier en premier après l'envoi.

Contrôle final :

```bash
for p in "" realisations cdi freelance contact sitemap.xml robots.txt; do
  echo -n "/$p : "
  curl -s -o /dev/null -w "%{http_code}\n" -L "https://nadirbensalah.com/$p"
done
```

Les sept doivent répondre `200`.

---

## 1. À faire tout de suite (gain certain, effort faible)

### Le 404 qui sort sur ton nom  ·  5 minutes dans hPanel

**Le diagnostic, vérifié le 19 septembre 2026.** Le `.fr` ne redirige que sa
page d'accueil. Tout le reste tombe en 404 :

| URL | Réponse |
|---|---|
| `nadirbensalah.fr` | 301 vers `nadirbensalah.com` ✓ |
| `nadirbensalah.fr/cv-numerique` | **404** |
| `nadirbensalah.fr/contact` | **404** |

Ce n'est donc pas un problème de `/cv-numerique` en particulier : **aucun
chemin du `.fr` ne fonctionne**, et `/cv-numerique` est simplement celui qui
reste indexé et qui ressort sur ton nom.

**Pourquoi je ne peux pas le corriger depuis le dépôt.** Les deux domaines
sont sur deux hébergements différents :

- `nadirbensalah.com` → `193.203.189.68`, c'est là que le dépôt déploie ;
- `nadirbensalah.fr` → `147.79.116.115`, une autre entrée Hostinger, qui sert
  une page de redirection automatique.

Le `.htaccess` du dépôt ne part que sur le `.com`. Il ne peut rien pour le
`.fr` tant que celui-ci est servi ailleurs.

**Ce qu'il faut faire, dans hPanel :**

1. Ouvrir hPanel → **Domaines** → `nadirbensalah.fr`.
2. Supprimer la redirection de domaine actuelle (celle qui ne renvoie que
   l'accueil). Elle est soit dans **Redirections**, soit le domaine est
   configuré en « Site web de redirection ».
3. Deux options, la première est la bonne :
   - **Recommandé** : rattacher `nadirbensalah.fr` comme **domaine
     supplémentaire (alias)** du même hébergement que le `.com`, c'est-à-dire
     pointant sur le même `/public_html/`. La règle qui fait le reste est
     déjà dans `public/.htaccess` du dépôt, en tête de fichier : elle
     redirige tout `nadirbensalah.fr/<chemin>` vers
     `nadirbensalah.com/<chemin>` en 301, en conservant le chemin.
   - À défaut : recréer une redirection de domaine en cochant l'option qui
     **conserve le chemin** (souvent libellée « wildcard » ou « inclure les
     sous-chemins »). Moins propre, mais ça règle le symptôme.
4. Vérifier ensuite, en ligne de commande :
   ```bash
   curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" -L \
     https://nadirbensalah.fr/cv-numerique
   ```
   Le résultat attendu est `200 https://nadirbensalah.com/`.

**Puis, dans la Search Console**, demander la suppression de l'URL
`nadirbensalah.fr/cv-numerique` (Indexation → Suppressions). La redirection
suffit à terme, mais la suppression accélère les choses sur la requête qui
compte le plus : ton nom.

### Le profil LinkedIn obsolète  ·  10 minutes sur linkedin.com

Sur une recherche de ton nom, le résultat LinkedIn affiche encore
« Assistant d'éducation, Rectorat d'Amiens ». C'est ce que voit un recruteur
**avant** d'arriver sur le site. Aucune ligne de code ne peut corriger ça :
c'est une donnée hébergée par LinkedIn, modifiable seulement depuis ton
compte.

C'est probablement le meilleur retour sur temps investi de toute cette liste,
parce que ça se joue sur la requête la plus qualifiée qui existe : ton nom.

Sur <https://www.linkedin.com/in/nadir-ben-salah/>, quatre champs à reprendre.

**1. Le titre** (le texte sous ton nom, celui qui apparaît dans les résultats
de recherche Google et dans chaque commentaire que tu postes). À remplacer par
quelque chose qui dit le métier et la preuve :

> Développeur mobile & full-stack · React Native, TypeScript · 8 applications
> publiées sur l'App Store

**2. Le poste actuel.** Ajouter l'expérience si elle n'y est pas :
Développeur full-stack & mobile, indépendant, Capmedia Digital, depuis juillet
2024, Amiens. Sans ça, LinkedIn continue d'afficher le dernier poste connu.

**3. L'infobulle « À propos ».** Les trois premières lignes sont les seules
visibles sans cliquer. Le premier paragraphe de `/a-propos` fait le travail :

> Je conçois et je développe des applications mobiles, de l'idée jusqu'à la
> mise en ligne. Huit applications sont aujourd'hui en ligne sur l'App Store,
> conçues, développées et publiées de bout en bout.

**4. Le lien vers le site.** Dans la section « Coordonnées », mettre
`nadirbensalah.com` en site web. C'est ce qui fait le pont entre le profil et
la preuve.

Pense aussi à la section **Sélection** (featured) : y épingler deux ou trois
applications de l'App Store donne une vignette visuelle en haut du profil.

Le site, lui, pointe déjà vers ce profil : en-tête, pied de page, page
contact, et dans les données structurées `sameAs` que Google utilise pour
relier les deux identités.

### Search Console et Bing

- Ajouter `nadirbensalah.com` à la Google Search Console, valider la propriété
  (le plus simple : enregistrement DNS chez ton registrar).
- Y soumettre `https://nadirbensalah.com/sitemap.xml`. Il existe maintenant
  vraiment : `robots.txt` en annonçait quatre depuis des mois, qui
  répondaient tous 404.
- Demander l'indexation des pages neuves : `/realisations`, `/cdi`,
  `/freelance`, `/developpeur-application-mobile-amiens`.
- Surveiller le rapport de couverture les deux premières semaines : les 48
  anciennes pages de ville vont sortir de l'index, c'est normal et voulu.
- Même chose sur Bing Webmaster Tools, qui accepte l'import depuis Search
  Console en deux clics.

---

## 2. Décisions qui t'appartiennent

### La mesure d'audience

Le site ne charge **aucun traceur** aujourd'hui, et ne dépose aucun cookie.
La couche est prête dans `src/lib/analytics.ts` : tous les événements sont
nommés, l'origine du visiteur (UTM, QR, référent) est mémorisée en session.

Il ne manque qu'un outil. Ma recommandation : **Plausible**, parce qu'il est
sans cookie, donc sans bandeau de consentement à afficher, et hébergé en
Europe. Environ 9 €/mois.

Pour l'activer, ajouter dans `src/app/layout.tsx`, dans le `<head>` :

```html
<script defer data-domain="nadirbensalah.com" src="https://plausible.io/js/script.js"></script>
```

Et mettre à jour la page `/mentions-legales`, qui annonce actuellement
qu'aucun traceur n'est chargé. Si tu préfères Google Analytics, il faudra en
plus un bandeau de consentement, ce que le site évite aujourd'hui.

### Les pages de prospection nominatives

Le gabarit `/hello/<entreprise>` fonctionne. Il est **volontairement vide** :
je n'ai créé aucune page au nom d'une entreprise réelle, parce que ça
fabriquerait une relation qui n'existe pas.

Pour en créer une, ajouter une entrée dans `src/content/prospects.ts` puis
relancer le build. Les pages sont en `noindex` et hors sitemap : elles sont
faites pour être envoyées, pas trouvées.

Un lien de campagne avec QR code fonctionne tel quel :
`nadirbensalah.com/hello/entreprise?utm_source=physical&utm_medium=qr`

### Le CV en PDF

Le fichier `public/assets/cv/cv-nadir-ben-salah.pdf` est celui d'avant la
refonte. Il fonctionne, mais **il dit « sept applications » là où le site dit
« huit »**. Les deux sont vrais (sept sous ton compte, une pour Perseus
Capital), mais un recruteur qui compare les deux documents voit une
contradiction, et c'est le genre de détail qui élimine au tri.

La page d'accueil le dit maintenant en toutes lettres (« sept sous mon nom,
une pour un client »), donc le plus urgent est réglé côté site. Reste à
reprendre le PDF quand tu auras un moment.

Deuxième point à vérifier sur le CV : les dates. Capmedia commence en
**juillet 2024** et Decayeux se termine en **octobre 2024**. Quatre mois se
recouvrent, sans explication. Ce n'est pas nécessairement faux, mais un
recruteur le repère en trois secondes et le note comme question d'entretien.
Si c'est une période de cumul, autant l'écrire.

---

## 3. Ce qui manque et qui rendrait le site nettement plus fort

### Une photo

Il n'y en a aucune sur le site, parce qu'il n'y en avait aucune d'exploitable
dans le dépôt. Un recruteur qui hésite entre deux profils retient celui dont
il a vu le visage. Un portrait sobre, cadré buste, fond neutre, suffirait :
à placer sur `/a-propos` et `/cdi`.

Format attendu : 800 × 800 px minimum, en `.webp`, dans
`public/assets/images/`.

### Une image de partage par page (facultatif)

C'est réglé pour l'essentiel : `public/assets/images/og.png` fait maintenant
1200 × 630 px, au bon format, avec ton nom, la phrase d'accroche et les huit
icônes. Elle est servie par toutes les pages. Avant, le code annonçait
1200 × 630 aux agrégateurs alors que le fichier faisait 478 × 578 : l'aperçu
sortait recadré de travers sur LinkedIn.

Ce qui resterait à faire, si tu veux aller plus loin : une image par étude de
cas, avec la capture de l'application concernée. Le gabarit est dans
`scripts/og.html`, il se régénère avec Chrome en mode headless. C'est du
confort, pas une urgence.

### Des témoignages

Le site n'en affiche aucun, parce qu'il n'en existait aucun de vérifiable.
C'est le manque le plus coûteux : une phrase d'un client réel vaut plus que
trois paragraphes écrits par moi.

Deux pistes concrètes :
- Perseus Capital, pour qui tu as livré ForgeMe. Deux phrases signées, avec
  le nom et la fonction de la personne, suffisent. C'est le seul projet client
  du site, et le panel de relecture a noté que « Pour un client », au
  singulier, souligne justement qu'il n'y en a qu'un. Un témoignage
  renverserait cette lecture.
- Decayeux, si un ancien responsable accepte. Ce serait doublement utile :
  c'est la seule preuve de travail en équipe dont dispose le site, et c'est
  l'objection numéro un pour un recrutement en CDI.

**Ne rien inventer.** Un faux témoignage se repère, et il détruit la
crédibilité de tout le reste de la page.

### Une vidéo de démonstration

Les captures d'écran de l'App Store sont bonnes, mais une vidéo de quinze
secondes montrant Ticket piloter la Dynamic Island vaudrait mieux que
n'importe quelle description. Un enregistrement d'écran depuis l'iPhone,
sans montage, ferait le travail.

---

## 4. Ce qu'il faut surveiller après la mise en ligne

Les deux premières semaines :

- **Les 301.** Tester à la main quelques anciennes URL : `/projets`,
  `/tarifs`, `/blog`, `/fr-fr/paris`, `/services/creation-application-mobile`.
  Elles doivent toutes renvoyer un 301 vers une page qui traite du même sujet,
  jamais un 404 et jamais l'accueil par défaut.
- **La couverture Search Console.** Une chute du nombre de pages indexées est
  attendue : 48 pages de ville disparaissent. Ce qui compte, c'est que les
  nouvelles pages entrent.
- **Le positionnement sur ton nom.** C'est la requête la plus qualifiée qui
  existe : tout prospect vérifie le nom. Elle doit être verrouillée.

---

## 5. Ce que je n'ai volontairement pas fait

- **Aucune note, aucune étoile, nulle part.** Les huit applications totalisent
  six notes réelles sur l'App Store. Afficher « 5/5 » sur un effectif pareil
  tromperait le lecteur, et les données structurées de type `aggregateRating`
  sont bloquées par le script de vérification.
- **Aucun chiffre de téléchargement, de revenu ou de trafic.** Aucune source
  vérifiable n'en donne. Si tu veux en publier, ils doivent sortir d'App Store
  Connect, et il faudra dire la période couverte.
- **Aucune page « développeur à Paris, Lyon, Marseille ».** Les 48 pages de
  ville de l'ancien site étaient des doorway pages : un texte unique avec le
  nom de la commune substitué. Google les sanctionne. Seul Amiens a une page,
  parce que tu y vis et que l'application du réseau de bus amiénois en est la
  preuve.
- **Aucune grille tarifaire.** L'ancienne page `/tarifs` annonçait des prix
  qui n'engageaient rien. Elle redirige vers `/freelance`. Si tu veux
  réafficher des tarifs, il faut qu'ils soient ceux que tu factures vraiment.
