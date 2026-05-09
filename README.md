# Moove City

Transport avec chauffeur en Île-de-France (6 à 20 m³).

- **Contact** : +33 7 51 21 32 55 | contact@moovecity.fr
- **Site** : moovecity.fr
- **Hébergement** : GitHub Pages (artefact = `next-app/out`)

## Code source

Tout le site statique et les assets sont dans **`next-app/`** (`app/`, `public/`).  
Build : `cd next-app && npm install && npm run build` → sortie dans `next-app/out/`.

Scripts optionnels (toujours depuis `next-app/`) : `npm run generate-webp`, `npm run compress-images` (dépendance `sharp` en dev).
