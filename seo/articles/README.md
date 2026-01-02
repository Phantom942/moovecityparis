# Guide de Création d'Articles SEO

Ce dossier contient les articles SEO du site Moove City. Ces articles sont optimisés pour le référencement naturel et visent à fournir du contenu utile aux visiteurs.

## Structure

- `index.html` : Page d'index listant tous les articles
- `choisir-vehicule-demenagement.html` : Exemple d'article complet
- Chaque nouvel article doit être créé dans ce dossier

## Comment Créer un Nouvel Article

### 1. Créer le fichier HTML

Créez un nouveau fichier HTML avec un nom de fichier descriptif et en minuscules avec des tirets :
- ✅ `conseils-demenagement-paris.html`
- ✅ `preparer-demenagement.html`
- ❌ `Article_1.html` (éviter)

### 2. Structure de Base

Copiez la structure de `choisir-vehicule-demenagement.html` et adaptez :

#### Métadonnées SEO (dans `<head>`)

```html
<title>[Titre de l'article] | Moove City</title>
<meta name="description" content="Description de 150-160 caractères avec mots-clés pertinents">
<meta name="keywords" content="mots-clés, séparés, par, des, virgules">
<link rel="canonical" href="https://www.moovecity.fr/seo/articles/[nom-fichier].html">
```

#### Schema.org (Article)

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "[Titre de l'article]",
    "description": "[Description]",
    "datePublished": "2025-01-27T00:00:00+01:00",
    "dateModified": "2025-01-27T00:00:00+01:00",
    ...
}
</script>
```

### 3. Contenu de l'Article

#### Structure Recommandée

1. **En-tête de l'article** (`article-header`)
   - Métadonnées (date, temps de lecture, catégorie)
   - Titre H1 principal
   - Extrait/description

2. **Corps de l'article** (`article-content`)
   - Introduction (paragraphe d'accroche)
   - Sections avec H2
   - Sous-sections avec H3 si nécessaire
   - Paragraphes bien structurés
   - Listes à puces ou numérotées
   - Tableaux si pertinent (classe `comparison-table`)
   - CTA (Call-to-Action) avec classe `cta-box`

3. **Liens internes**
   - Lien vers la page de réservation
   - Liens vers d'autres pages du site
   - Lien de retour vers l'index des articles

### 4. Bonnes Pratiques SEO

#### Titres
- Utilisez un seul H1 par page (le titre principal)
- Structurez avec H2, H3 de manière hiérarchique
- Incluez des mots-clés pertinents dans les titres

#### Contenu
- **Longueur recommandée** : 800-1500 mots minimum
- **Mots-clés** : Utilisez naturellement les mots-clés ciblés
- **Liens internes** : Ajoutez 3-5 liens vers d'autres pages du site
- **Images** : Ajoutez des images pertinentes avec attributs `alt` descriptifs

#### Lisibilité
- Paragraphes courts (3-4 phrases)
- Listes à puces pour les informations importantes
- Tableaux pour les comparaisons
- Espacement généreux entre les sections

### 5. Ajouter l'Article à l'Index

Modifiez `index.html` et ajoutez une nouvelle carte d'article dans la section `articles-grid` :

```html
<div class="article-card">
    <div class="article-card-image"></div>
    <div class="article-card-content">
        <div class="article-card-meta">Catégorie • X min de lecture</div>
        <h2 class="article-card-title">Titre de l'article</h2>
        <p class="article-card-excerpt">Description courte de l'article...</p>
        <a href="nom-fichier.html" class="article-card-link">Lire l'article →</a>
    </div>
</div>
```

### 6. Mettre à Jour le Sitemap

Ajoutez l'URL de votre nouvel article dans `sitemap.xml` :

```xml
<url>
    <loc>https://www.moovecity.fr/seo/articles/nom-fichier.html</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
</url>
```

## Idées d'Articles

- Guides pratiques (comment faire...)
- Conseils et astuces
- Comparatifs de services
- Informations sur les zones géographiques
- Réponses aux questions fréquentes
- Actualités et tendances du secteur

## Exemple de Checklist

- [ ] Fichier HTML créé avec nom descriptif
- [ ] Métadonnées SEO complètes (title, description, keywords)
- [ ] Schema.org Article configuré
- [ ] Open Graph et Twitter Card configurés
- [ ] Contenu de 800+ mots avec structure claire
- [ ] Liens internes vers autres pages du site
- [ ] CTA vers la page de réservation
- [ ] Article ajouté à l'index (`index.html`)
- [ ] URL ajoutée au sitemap (`sitemap.xml`)
- [ ] Vérification des liens et de la navigation

## Support

Pour toute question, contactez l'équipe Moove City.

