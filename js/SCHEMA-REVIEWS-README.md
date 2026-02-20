# Données structurées Review & AggregateRating

## Utilisation

### Option 1 : Schéma inline (index.html)
Le schéma est intégré directement dans `index.html` avec les avis.

### Option 2 : Script injecté (autres pages)
Sur les pages sans schéma complet, ajoutez avant `</body>` :

```html
<script src="js/structured-data-reviews.js"></script>
```

## Configuration (structured-data-reviews.js)

| Variable | Défaut | Description |
|----------|--------|-------------|
| `ratingValue` | 4.9 | Note moyenne |
| `reviewCount` | 50 | Nombre d'avis |
| `address.streetAddress` | '' | **À compléter** pour validation optimale |
| `address.postalCode` | 75000 | Code postal |

## Informations manquantes pour validation 100% Google Rich Results

1. **streetAddress** : Adresse physique complète (ex. `12 rue de la Paix, 75002 Paris`) si vous avez un local / siège. Sinon, laisser vide.

2. **@id** : Identifiant canonique du LocalBusiness (ex. `https://www.moovecity.fr/#localbusiness`) pour éviter les doublons si plusieurs schémas.

3. **Avis réels** : Les avis simulés doivent être remplacés par de vrais avis clients pour respecter les [directives Google](https://support.google.com/webmasters/answer/2622992) (interdiction des faux avis).

4. **Dates** : Utiliser des dates au format ISO 8601 (YYYY-MM-DD) – déjà le cas.

5. **image** : Une photo du local peut renforcer la validité (déjà présente dans le schéma actuel).

## Validation

Tester sur : [Google Rich Results Test](https://search.google.com/test/rich-results)  
Alternative : [Schema.org Validator](https://validator.schema.org/)
