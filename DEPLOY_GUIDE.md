# 🚀 Guide de Déploiement Automatique - Hostinger

## ✅ Configuration Terminée

Votre site est maintenant configuré pour un déploiement automatique vers Hostinger via GitHub Actions.

### 📦 Ce qui a été configuré :

1. **Workflow GitHub Actions** (`.github/workflows/deploy.yml`)
2. **Configuration Next.js** pour export statique (`next.config.mjs`)
3. **Fichiers statiques** (`public/robots.txt`)
4. **135 pages** générées en statique

---

## 🔐 ÉTAPE 1 : Configurer les Secrets GitHub

### Allez sur votre repository GitHub :
```
https://github.com/Nadir-Bensalah/nadirbensalah.com/settings/secrets/actions
```

### Cliquez sur "New repository secret" et ajoutez :

#### Secret 1 : FTP_USERNAME
- **Name** : `FTP_USERNAME`
- **Value** : `u497864541.nadirbensalah.com`

#### Secret 2 : FTP_PASSWORD
- **Name** : `FTP_PASSWORD`
- **Value** : Votre mot de passe FTP Hostinger (celui que vous utilisez pour vous connecter)

---

## 🚀 ÉTAPE 2 : Déployer

### Option A : Push vers GitHub (Automatique)

```bash
# 1. Ajoutez tous les fichiers
git add .

# 2. Créez un commit
git commit -m "🚀 Configuration déploiement automatique Hostinger"

# 3. Poussez vers GitHub
git push origin main
```

**Le déploiement se lancera automatiquement !**

### Option B : Déploiement manuel via GitHub Actions

1. Allez sur : `https://github.com/Nadir-Bensalah/nadirbensalah.com/actions`
2. Cliquez sur "Deploy to Hostinger" dans la liste des workflows
3. Cliquez sur "Run workflow" → "Run workflow"

---

## 📊 ÉTAPE 3 : Vérifier le Déploiement

### 1. Suivre le déploiement en temps réel :
```
https://github.com/Nadir-Bensalah/nadirbensalah.com/actions
```

### 2. Le workflow effectue :
- ✅ Installation de Node.js 20
- ✅ Installation des dépendances
- ✅ Build Next.js (135 pages statiques)
- ✅ Export vers le dossier `out/`
- ✅ Upload FTP vers Hostinger (`/public_html/`)

### 3. Durée estimée :
- **~3-5 minutes** pour un déploiement complet

### 4. Une fois terminé :
- Votre site sera en ligne sur **https://nadirbensalah.com**
- Testez toutes les pages pour vérifier

---

## 🔧 Informations Techniques

### Serveur FTP Hostinger :
- **IP** : `193.203.189.68`
- **Port** : `21`
- **Protocole** : FTP
- **Username** : `u497864541.nadirbensalah.com`
- **Dossier distant** : `/public_html/`

### Configuration Next.js :
- **Output** : `export` (génération statique)
- **Images** : `unoptimized: true` (compatible export)
- **Dossier de sortie** : `out/`

### Pages générées :
- **Total** : 135 pages statiques
- **Homepage** : CV interactif multilingue (FR/EN/AR)
- **Blog** : 30 articles
- **Services** : 15 pages FR + 15 pages EN
- **Prix** : 5 pages FR + 5 pages EN
- **Zones France** : 10 villes
- **Zones Tunisie** : 14 villes + page principale

---

## ⚠️ Important

### Nettoyage automatique :
Le workflow utilise `dangerous-clean-slate: true` qui **efface complètement** le contenu de `/public_html/` avant chaque déploiement.

**Ne stockez AUCUN fichier important** dans `/public_html/` qui ne soit pas dans votre repository GitHub !

---

## 🐛 Dépannage

### Le déploiement échoue ?

#### 1. Vérifiez les secrets GitHub :
- Les secrets sont-ils bien nommés `FTP_USERNAME` et `FTP_PASSWORD` ?
- Le mot de passe FTP est-il correct ?

#### 2. Vérifiez les logs GitHub Actions :
```
https://github.com/Nadir-Bensalah/nadirbensalah.com/actions
```
Cliquez sur le workflow qui a échoué pour voir les détails

#### 3. Testez la connexion FTP manuellement :
- Utilisez FileZilla ou SmartFTP
- Serveur : `ftp://193.203.189.68`
- Username : `u497864541.nadirbensalah.com`
- Port : 21

#### 4. Vérifiez que le dossier `/public_html/` existe sur Hostinger

---

## 🎯 Prochaines Étapes

### Après le premier déploiement réussi :

1. **Testez votre site** : https://nadirbensalah.com
2. **Vérifiez toutes les pages** (blog, services, prix, etc.)
3. **Testez le changement de langue** (FR/EN/AR)
4. **Testez le mode sombre/clair**
5. **Vérifiez les toasts** de notification

### Pour les prochains déploiements :

Chaque fois que vous faites un `git push origin main`, le site sera automatiquement redéployé ! 🎉

---

## 📞 Support

### Ressources utiles :
- [Documentation Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Documentation FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action)
- [Support Hostinger](https://www.hostinger.fr/support)

### En cas de problème :
1. Consultez les logs GitHub Actions
2. Vérifiez les secrets GitHub
3. Testez la connexion FTP manuellement
4. Vérifiez que le build local fonctionne : `npm run build`

---

## ✨ Félicitations !

Votre site est maintenant configuré pour un déploiement automatique professionnel ! 🚀

Chaque modification que vous poussez sur GitHub sera automatiquement déployée sur votre site en production.
