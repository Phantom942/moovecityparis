# Guide Google Search Console – Moove City

Ce guide vous permet de configurer Google Search Console pour le site **moovecity.fr** et de suivre le référencement.

---

## 1. Accéder à Search Console

1. Allez sur **[search.google.com/search-console](https://search.google.com/search-console)**.
2. Connectez-vous avec le compte Google de Moove City (ou celui qui gère le site).

---

## 2. Ajouter la propriété (le site)

- **Option recommandée – Préfixe d’URL :**
  1. Cliquez sur **« Ajouter une propriété »**.
  2. Choisissez **« Préfixe d’URL »**.
  3. Saisissez : `https://www.moovecity.fr`
  4. Cliquez sur **« Continuer »**.

- **Option domaine (si vous gérez le DNS) :**
  1. Choisissez **« Domaine »**.
  2. Saisissez : `moovecity.fr`
  3. Suivez les instructions de vérification (enregistrement DNS TXT chez votre hébergeur de domaine).

---

## 3. Vérifier la propriété

### Méthode 1 : Fichier HTML (simple si vous avez accès au site)

1. Search Console vous propose de télécharger un fichier (ex. `google123abc.html`).
2. Déposez ce fichier à la **racine** du site (même niveau que `index.html`).
3. L’URL doit être accessible : `https://www.moovecity.fr/google123abc.html`
4. Cliquez sur **« Vérifier »** dans Search Console.

### Méthode 2 : Balise HTML (déjà possible sur le site)

1. Search Console vous donne une balise meta du type :
   ```html
   <meta name="google-site-verification" content="CODE_ICI" />
   ```
2. Ajoutez-la dans le `<head>` de `index.html` (une balise peut déjà exister dans `google-site-verification.html`).
3. Cliquez sur **« Vérifier »**.

### Méthode 3 : Google Analytics

- Si Google Analytics 4 est déjà installé sur le site avec le bon compte, vous pouvez parfois vérifier la propriété via ce compte.

---

## 4. Soumettre le sitemap

1. Dans le menu de gauche, allez dans **« Sitemaps »**.
2. Dans **« Ajouter un sitemap »**, saisissez :  
   `sitemap.xml`  
   (ou l’URL complète : `https://www.moovecity.fr/sitemap.xml`)
3. Cliquez sur **« Envoyer »**.
4. Après quelques heures ou jours, l’état passera à « Réussi » (ou des erreurs seront indiquées).

---

## 5. Vérifications utiles après la soumission

| Où aller | À quoi ça sert |
|--------|-----------------|
| **Couverture** (ou « Pages ») | Voir les pages indexées, les erreurs, les pages exclues. |
| **Améliorations** | Voir les problèmes sur les mobiles, les données structurées, etc. |
| **Liens** | Voir les backlinks (sites qui pointent vers moovecity.fr). |
| **Paramètres d’exploration** | Voir la fréquence de passage du robot Google. |

---

## 6. À faire régulièrement

- Consulter **Couverture** pour corriger les erreurs d’indexation.
- Vérifier **Améliorations** (données structurées, FAQ, etc.).
- Après chaque grosse mise à jour du site, laisser Google réexplorer (ou utiliser **« Inspecter l’URL »** sur les nouvelles pages importantes).

---

## 7. En cas de problème

- **Sitemap « Impossible de récupérer »** : vérifiez que `https://www.moovecity.fr/sitemap.xml` s’ouvre bien dans le navigateur.
- **Pages non indexées** : vérifiez que `robots.txt` n’interdit pas ces URLs et que les pages sont bien accessibles (pas de blocage par mot de passe).
- **Erreurs de données structurées** : utilisez l’outil [Test des résultats enrichis](https://search.google.com/test/rich-results) avec l’URL de la page concernée.

---

Une fois la propriété vérifiée et le sitemap soumis, Search Console est configuré. Consultez ce guide dès que vous voulez vérifier ou améliorer l’indexation du site.
