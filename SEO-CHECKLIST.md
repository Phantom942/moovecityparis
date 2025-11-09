# SEO & Suivi – Moove City Paris

Ce guide récapitule ce qui a déjà été mis en place côté code et ce qu’il reste à effectuer manuellement côté outils Google / marketing.

---

## ✅ Fait dans le code

- Balises `title`, `description`, `keywords` et Open Graph à jour sur `index.html` et `booking.html`.
- Données structurées `LocalBusiness` + `FAQPage`.
- Section FAQ visible avec maillage interne (`#faq`).
- `robots.txt` nettoyé et sitemap mis à jour (`https://www.moovecity.fr/sitemap.xml`).
- Page `mentions-legales.html` disponible et référencée.
- Google Maps Places réactivé (autocomplete départ / arrivée).
- Pages de service dédiées créées : `demenagement-paris.html`, `livraison-express.html`, `transport-entreprises.html`.
  Elles reprennent GA4, meta tags et CTA vers le formulaire principal.

---

## 🚀 À faire côté outils Google

### 1. Google Search Console
1. Aller sur <https://search.google.com/search-console>.  
2. Créer une **propriété Domaine** `moovecity.fr` (recommandé) ou **URL prefix** `https://www.moovecity.fr/`.  
3. Vérifier la propriété (enregistrements DNS ou fichier HTML).  
4. Dans « Sitemaps », soumettre `https://www.moovecity.fr/sitemap.xml`.  
5. Surveiller les rapports « Couverture » et « Performances » après indexation.

### 2. Google Analytics / Tag Manager
1. Créer un flux GA4 (ou Matomo si auto-hébergé).  
2. Récupérer l’ID de mesure (ex : `G-XXXXXXXX`).  
3. Dans `index.html`, remplacer `GA_MEASUREMENT_ID` par cet ID.  
4. Tester la collecte via le débogueur GA ou un « Tag Assistant ».

### 3. Clé Google Maps
1. Console Cloud → API & Services → Identifiants → sélectionner la clé.  
2. **Restrictions d’application** : choisir « Web sites » et ajouter :
   - `https://www.moovecity.fr/*`
   - `http://localhost/*` (pour tests locaux, optionnel)  
3. **Restrictions d’API** : cocher au minimum *Places API* (et *Maps JavaScript API* si besoin).  
4. Sauvegarder, attendre la propagation (~5 min) et retester l’autocomplete.

---

## 🌟 Visibilité locale

- Créer/mettre à jour la fiche **Google Business Profile** : <https://www.google.com/business/>  
- Ajouter photos récentes, heures de disponibilité, zone de service.  
- Encourager les avis clients (réponses rapides).  
- Publier des offres/actualités ponctuelles pour rester actif.

---

## 🔗 Backlinks & citations

1. Inscrire Moove City sur des annuaires pertinents (PagesJaunes, 118000, Yelp, etc.).  
2. Mettre le même NAP (Nom, Adresse, Téléphone) que sur le site.
3. Rechercher des partenariats B2B (sociétés de location, coworking, conciergeries).  
4. Si possible, rédiger 1-2 articles invités ou communiqués dans la presse locale.

---

## 📊 Suivi continu

- **Lighthouse / PageSpeed** : lancer ponctuellement le test, corriger les points (taille des images, cache).  
- **Logs Search Console** : surveiller les erreurs d’exploration, les requêtes qui génèrent du trafic.  
- **Mots-clés** : prévoir un contenu blog (guides déménagement, checklists) pour viser la longue traine.  
- **Réseaux sociaux** : partager les témoignages ou services (Facebook, LinkedIn, Instagram).

---

En cas de nouvelle fonctionnalité (blog, calculateur de volume, etc.), penser à :
- Ajouter la page au sitemap.
- Mettre à jour le maillage interne.
- Ajouter, si nécessaire, de nouvelles données structurées (Article, HowTo, etc.).

