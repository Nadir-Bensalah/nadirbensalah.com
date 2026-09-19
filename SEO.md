# La stratégie SEO, et pourquoi elle est celle-là

Ce document existe pour qu'on ne refasse pas, dans six mois, ce qui a déjà été
écarté après vérification.

**Méthode.** Les SERP ont été relevées en septembre 2026 sur des moteurs
francophones. Aucun volume de recherche n'est avancé : je n'avais pas accès à
une source de volumes fiable, et inventer des chiffres aurait été pire que de
s'en passer. Le raisonnement porte donc sur ce qui est observable : qui occupe
la page de résultats, et si un site personnel y a sa place.

Une réserve à garder en tête : l'ordre exact des résultats varie d'un moteur à
l'autre. Ce qui est solide, c'est le **type d'acteurs** qui occupe chaque
requête. C'est sur ça que reposent les décisions ci-dessous, pas sur des
positions précises.

---

## Le principe directeur

**L'intention prime sur le volume.** Cent visiteurs qui cherchent réellement
un développeur valent plus que cinquante mille curieux. Et une requête peut
être à la fois imprenable et indésirable : c'est le cas de toute la famille
« recruter un développeur ».

---

## Ce qu'on ne vise pas, et pourquoi

### « recruter un développeur » et ses variantes

C'était l'ambition de départ. Elle est abandonnée, pour deux raisons dont la
seconde est la plus importante.

**La page de résultats est un espace de conseil RH.** Elle est occupée par des
cabinets de recrutement et des plateformes dont c'est le métier et le budget :
Indeed, Welcome to the Jungle, Codeur, LiveMentor, des blogs de cabinets. Pas
un seul profil individuel.

**Et surtout, le lecteur est le mauvais.** Quelqu'un qui tape « comment
recruter un développeur » cherche une méthode pour embaucher en interne. Il ne
cherche pas un prestataire. Même en s'y positionnant, on attirerait des
responsables RH en train de rédiger une fiche de poste, pas des gens prêts à
travailler avec Nadir.

La page `/recruter-developpeur` existe quand même, mais **ce n'est pas un pari
SEO** : c'est une page de conversion pour le trafic direct, celui d'un lien
envoyé par message, d'un QR code ou d'un profil LinkedIn.

### « développeur full stack freelance »

La page de résultats la plus verrouillée mesurée : Malt, Freelance.com,
Free-Work, LesBonsFreelances, Codeur, LeHibou, Kicklox. Aucun site personnel
dans les quinze premiers résultats.

La raison est structurelle, pas budgétaire : ces pages agrègent des milliers
de profils. Sur une requête de **sélection**, un moteur préfère un inventaire
à un individu. Une page qui présente une seule personne ne peut pas mieux
répondre.

### « TJM développeur React Native »

Double impasse. Malt publie un baromètre que tout le monde cite, et on ne bat
pas une donnée propriétaire avec une opinion. Surtout, le lectorat est composé
de **freelances concurrents** qui comparent leurs tarifs. Aucune valeur
commerciale.

### « combien coûte une application mobile »

Douze agences avec des équipes contenu et des simulateurs de prix. L'hypothèse
que la variante « combien coûte une application React Native » serait moins
travaillée a été **vérifiée, et elle est fausse** : même densité.

Le sujet reste utile comme contenu de conversion, pour quelqu'un déjà sur le
site. Pas comme canal d'acquisition.

### Les pages de ville

L'ancien site en comptait 48 : dix villes françaises et quatorze tunisiennes,
en français et en anglais, avec un texte rigoureusement identique où seul le
nom de la commune changeait. Ce sont des *doorway pages*, Google les sanctionne
explicitement, et elles ne parlaient à personne.

Toutes supprimées, toutes redirigées en 301.

---

## Ce qu'on vise

Par ordre de faisabilité multipliée par valeur.

### 1. Le cluster local d'Amiens

C'est la meilleure opportunité, et de loin. Des développeurs indépendants
apparaissent déjà en page une sur « développeur freelance Amiens », l'un d'eux
avec exactement la structure de page qu'on reproduit ici. La concurrence
locale est faible, l'intention d'achat est nette.

Et il y a un avantage que personne ne peut copier : **une des huit
applications porte sur le réseau de bus amiénois**. Ce n'est pas un argument
rhétorique, c'est une application publiée que n'importe qui peut installer.

Pages : `/developpeur-application-mobile-amiens` et
`/developpeur-freelance-amiens`.

Sur « développeur React Native Amiens », la vérification a montré que la page
de résultats ne renvoie que des plateformes nationales, aucun acteur local et
aucune page ciblant la formule exacte. La place n'est pas vide, elle est mal
occupée.

### 2. Le contenu de décision technique

« React Native ou natif » est la page de résultats informationnelle la plus
ouverte mesurée : un blog individuel y figure en page une, à côté des agences.
Le lecteur est un CTO ou un fondateur en train de choisir une technologie,
donc exactement avant de choisir un prestataire.

Page : `/guides/react-native-ou-natif`.

Nuance vérifiée : « React Native ou Flutter » est **plus dur**, le paysage y
est plus dense en agences. À traiter comme un article secondaire, pas comme
une cible.

### 3. Les refus App Store

Des blogs personnels dominent cette famille, parce que le contenu vécu y est
structurellement avantagé : on ne peut pas inventer un motif de refus qu'on
n'a pas reçu. Huit applications publiées, ce sont aussi des allers-retours
avec la revue Apple.

Pages : `/guides/refus-app-store` et `/guides/checklist-avant-soumission`.

### 4. L'expertise et l'audit

« Expert React Native » et « consultant React Native » laissent passer des
indépendants. C'est le lecteur qui vaut le plus cher : un CTO avec un projet
qui dérape.

Pages : `/expertise-react-native` et `/audit-application-react-native`.

### 5. La marque

« Nadir Ben Salah » est la requête la plus qualifiée qui existe, parce que
tout prospect vérifie le nom avant de répondre. Elle doit être verrouillée.

Deux problèmes identifiés, tous deux hors du dépôt et listés dans
[A-FAIRE.md](A-FAIRE.md) : une URL en 404 toujours indexée sur le `.fr`, et un
profil LinkedIn obsolète qui sort avant le site.

---

## Le maillage

```
/guides/<article>          le contenu de décision
        ↓
/expertise-react-native    ou   /developpeur-application-mobile-amiens
        ↓                              ↓
/audit-application-react-native   /developpeur-freelance-amiens
        ↓                              ↓
        └──────→  /realisations  ←──────┘
                        ↓
                    /contact
```

Règle : chaque article pointe vers une page commerciale avec une ancre
descriptive. Les pages commerciales pointent vers deux ou trois articles au
maximum, jamais vers tout le blog.

`/realisations` est liée depuis toutes les pages commerciales : c'est l'actif
différenciant, celui que ni une plateforme ni une agence ne peut reproduire.

---

## Ce qui est en place techniquement

- **sitemap.xml** généré à partir des fichiers réellement exportés, donc
  incapable d'annoncer une page qui n'existe pas. Il répondait 404 depuis des
  mois alors que `robots.txt` en annonçait quatre.
- **robots.txt** avec une seule déclaration de sitemap, au lieu de quatre dont
  trois fictives.
- **Canoniques** sur toutes les pages indexables, absentes des pages en
  `noindex` pour ne pas envoyer deux signaux contradictoires.
- **301** de toutes les anciennes URL vers la page qui traite le même sujet,
  jamais vers l'accueil par défaut, qui serait traité comme un soft 404.
- **www** redirigé vers le domaine nu. Il servait le site sans rediriger, ce
  qui donnait deux sites identiques.
- **Données structurées** : `ProfilePage`, `Person`, `WebSite`,
  `SoftwareApplication` par application, `BreadcrumbList`, `FAQPage`,
  `Service`, `ProfessionalService` sur les pages locales. Aucun
  `aggregateRating`, aucun `review` : le script de vérification les refuse.
- **Open Graph** complet, avec une image 1200 × 630 réelle.

---

## Ce qu'il ne faut pas faire

- Recréer des pages de ville. La tentation reviendra, la réponse est non.
- Publier des articles pour publier. Trois guides utiles valent mieux que
  trente génériques, et le site n'a pas d'équipe contenu.
- Afficher une note, une étoile, un nombre de téléchargements ou un
  pourcentage d'amélioration sans source vérifiable.
- Viser un volume plutôt qu'une intention.

---

## Pour mesurer

Ce document a été écrit sans données de volume. Si un jour tu veux un suivi de
positions réel, il faut une API de SERP en locale française (Serper,
DataForSEO ou l'API Brave Search). Cela permettrait aussi de relancer cet
audit périodiquement pour voir ce qui bouge.

Sans ça, la Search Console donne déjà l'essentiel : les requêtes réelles qui
amènent du monde, et les pages qui les reçoivent.
