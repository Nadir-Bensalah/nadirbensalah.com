# 🚀 Déploiement automatique vers Hostinger

Ce projet est configuré pour se déployer automatiquement sur Hostinger via GitHub Actions à chaque push sur la branche `main`.

## 📋 Configuration requise

### 1. Secrets GitHub à configurer

Allez sur votre repository GitHub : `https://github.com/Nadir-Bensalah/nadirbensalah.com/settings/secrets/actions`

Ajoutez les secrets suivants :

- **FTP_USERNAME** : `u497864541.nadirbensalah.com`
- **FTP_PASSWORD** : Votre mot de passe FTP Hostinger

### 2. Informations FTP Hostinger

- **Serveur** : `193.203.189.68`
- **Port** : `21`
- **Protocole** : `FTP`
- **Dossier distant** : `/public_html/`
- **Dossier local** : `./out/` (généré par Next.js export)

## 🔄 Workflow de déploiement

Le workflow GitHub Actions (`.github/workflows/deploy.yml`) effectue les étapes suivantes :

1. **Checkout** du code source
2. **Installation** de Node.js 20
3. **Installation** des dépendances (`npm ci`)
4. **Build** du site Next.js (`npm run build`)
5. **Export** statique du site (dossier `out/`)
6. **Déploiement FTP** vers Hostinger

## ✅ Comment tester

1. Configurez les secrets GitHub (voir ci-dessus)
2. Faites un commit et push sur la branche `main`
3. Allez dans l'onglet "Actions" de votre repository GitHub
4. Vérifiez que le workflow "Deploy to Hostinger" s'exécute correctement
5. Une fois terminé, votre site sera en ligne sur `nadirbensalah.com`

## ⚠️ Notes importantes

- Le déploiement utilise `dangerous-clean-slate: true` qui **efface complètement** le dossier `/public_html/` avant chaque déploiement
- Assurez-vous que votre site Next.js est compatible avec l'export statique (`output: 'export'`)
- Les images sont configurées en mode `unoptimized: true` pour l'export statique

## 🐛 Dépannage

Si le déploiement échoue :

1. Vérifiez que les secrets FTP sont correctement configurés
2. Vérifiez les logs dans l'onglet "Actions" de GitHub
3. Testez la connexion FTP manuellement avec FileZilla ou SmartFTP
4. Assurez-vous que le dossier `/public_html/` existe sur Hostinger

## 📞 Support

En cas de problème, consultez :
- [Documentation Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Documentation FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action)
