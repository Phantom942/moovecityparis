# Identité visuelle – Moove City Paris

Une mini-charte graphique prête à l’emploi pour tes supports (site, réseaux sociaux, documents commerciaux).

---

## 1. Palette de couleurs

| Nom | Code hex | Usage conseillé |
| --- | --- | --- |
| **Midnight Slate** | `#1F2937` | Fond principal, textes forts |
| **Graphite Mist** | `#4B5563` | Fond secondaire, bordures |
| **Emerald Flow** | `#10B981` | CTA, éléments positifs |
| **Lime Pulse** | `#34D399` | Hover, badges, pictos |
| **Sunrise Amber** | `#F59E0B` | Accents, alertes |
| **Mist White** | `#F9FAFB` | Arrière-plan neutre |

```css
:root {
  --mc-midnight: #1F2937;
  --mc-graphite: #4B5563;
  --mc-emerald: #10B981;
  --mc-lime: #34D399;
  --mc-amber: #F59E0B;
  --mc-mist: #F9FAFB;
  --mc-gradient: linear-gradient(135deg, #1F2937 0%, #10B981 100%);
}
```

---

## 2. Typographies recommandées

- **Titres** : `Inter SemiBold` (déjà utilisé sur le site)
- **Sous-titres / accent** : `Inter Medium`
- **Texte courant** : `Inter Regular`

Fallback : `system-ui, -apple-system, "Segoe UI", sans-serif`.

---

## 3. Logos & assets

- `moove-city-logo.svg` : icône compacte (idéal favicon, réseaux, stickers).
- `moove-city-wordmark.svg` : logo avec typographie (header, devis, documents).
- `social-banner.svg` : bannière 1200×630 optimisée pour réseaux / partage.

Tu peux les ouvrir dans n’importe quel éditeur vectoriel (Illustrator, Figma) et exporter en PNG si besoin.

---

## 4. Usage des logos

- Garder au moins 16 px de marge autour de l’icône.
- Utiliser la version positive (fond clair) ou inversée (fond sombre).
- Ne pas déformer le véhicule ni modifier le tracé.
- Sur fond photo, ajouter un fond circulaire Mist White à 80 % d’opacité.

---

## 5. Iconographie & visuels

- Privilégier des photos réelles de camions, conducteurs en action, vues de Paris.
- Pour les pictogrammes, utiliser un style linéaire simple avec la couleur `--mc-emerald`.
- Besoin d’inspiration ? Unsplash / Pexels (mots clés : “moving truck”, “delivery driver”, “Paris logistics”).

---

## 6. Modèle de bouton / CTA

```css
.mc-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  font-weight: 600;
  background: var(--mc-gradient);
  color: white;
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.35);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.mc-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 35px rgba(16, 185, 129, 0.4);
}
```

---

## 7. Check-list branding rapide

- [ ] Mettre à jour la photo de profil Google Business avec `moove-city-logo.svg`.
- [ ] Utiliser `social-banner.svg` pour la bannière Google Business / Facebook.
- [ ] Ajouter la palette dans Canva / Figma pour harmoniser les supports.
- [ ] Préparer une fiche devis / facture avec `moove-city-wordmark.svg`.

Besoin d’un format spécifique (PNG haute définition, fond transparent, etc.) ? Dis-le et je te le génère. 

