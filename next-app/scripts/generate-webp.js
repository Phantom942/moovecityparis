#!/usr/bin/env node
/**
 * Génère des WebP à partir des JPG de la galerie (public/images).
 * Usage : depuis next-app → npm run generate-webp
 */

const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "..", "public", "images");
const images = [
  "operation-chariot.jpg",
  "operation-chargement.jpg",
  "camion-interieur.jpg",
  "manutention-equipe.jpg",
];

async function generateWebP() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch (e) {
    console.error('❌ Le module "sharp" est requis. Exécutez: npm install');
    process.exit(1);
  }

  for (const img of images) {
    const inputPath = path.join(imagesDir, img);
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️  Fichier non trouvé: ${img}`);
      continue;
    }

    try {
      await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
      console.log(`✅ ${img} → ${path.basename(outputPath)}`);
    } catch (err) {
      console.error(`❌ Erreur pour ${img}:`, err.message);
    }
  }
}

generateWebP();
