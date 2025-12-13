# Guide Git - Préparation du commit SEO

## Fichiers modifiés à committer

### Fichiers principaux (modifiés)
```
sitemap.xml
index.html
.htaccess
```

### Fichiers de documentation (nouveaux)
```
CHANGELOG_SEO.md
COMMIT_MESSAGE.txt
CORRECTIONS_SEO.md
ACTIONS-RAPIDES.md
GIT_SETUP.md (ce fichier)
verification-seo.ps1
```

## Commandes Git à exécuter

### Si le dépôt Git n'existe pas encore :

```bash
# Initialiser le dépôt Git
git init

# Ajouter tous les fichiers
git add .

# Faire le commit initial
git commit -m "fix(seo): Correction indexation page d'accueil Google

Probleme:
- La page d'accueil n'apparaissait pas dans les resultats Google
- Les autres pages etaient bien indexees

Corrections apportees:
- sitemap.xml: Correction des dates (2026 -> 2025-01-27)
- index.html: Deplacement de la balise canonical en haut du <head>
- .htaccess: Ajout de commentaires explicatifs

Fichiers modifies:
- sitemap.xml
- index.html
- .htaccess

Actions requises apres deployement:
1. Soumettre le sitemap dans Google Search Console
2. Demander l'indexation manuelle de la page d'accueil"
```

### Si le dépôt Git existe déjà :

```bash
# Vérifier l'état
git status

# Ajouter uniquement les fichiers modifiés pour le SEO
git add sitemap.xml index.html .htaccess

# Ajouter les fichiers de documentation (optionnel)
git add CHANGELOG_SEO.md COMMIT_MESSAGE.txt CORRECTIONS_SEO.md ACTIONS-RAPIDES.md

# Faire le commit
git commit -F COMMIT_MESSAGE.txt

# Ou avec le message directement
git commit -m "fix(seo): Correction indexation page d'accueil Google

- sitemap.xml: Correction des dates (2026 -> 2025-01-27)
- index.html: Deplacement de la balise canonical en haut du <head>
- .htaccess: Ajout de commentaires explicatifs"
```

### Pour pousser sur GitHub :

```bash
# Ajouter le remote (si pas déjà fait)
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git

# Ou si vous utilisez SSH
git remote add origin git@github.com:VOTRE_USERNAME/VOTRE_REPO.git

# Pousser sur GitHub
git push -u origin main
# ou
git push -u origin master
```

## Résumé des changements

### sitemap.xml
- **Avant** : Dates à `2026-01-15` (futur)
- **Après** : Dates à `2025-01-27` (actuel)
- **Impact** : Évite la confusion des moteurs de recherche

### index.html
- **Avant** : Balise canonical ligne 425 (trop basse)
- **Après** : Balise canonical ligne 21 (après les meta tags)
- **Impact** : Meilleure reconnaissance par Google

### .htaccess
- **Avant** : Pas de commentaire sur ErrorDocument
- **Après** : Commentaire explicatif ajouté
- **Impact** : Documentation améliorée

## Fichiers à ne PAS committer (si dans .gitignore)

Les fichiers suivants ne doivent généralement PAS être commités :
- Fichiers de configuration locaux
- Fichiers temporaires
- Clés API / secrets

## Vérification avant commit

Vous pouvez utiliser le script de vérification :
```powershell
.\verification-seo.ps1
```

Cela vérifiera que tous les fichiers sont correctement configurés.

