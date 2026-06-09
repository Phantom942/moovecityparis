#!/usr/bin/env node
/**
 * Unifie header, footer, widgets mobile et liens sur toutes les pages HTML statiques.
 * Usage: node scripts/sync-site-layout.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SITE_HEADER,
  SITE_FOOTER,
  MOBILE_WIDGETS,
  SITE_STYLES,
  SITE_SCRIPTS,
  SITE_PROMO_BANNER_COMPACT,
} from './site-chrome.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public');

const SKIP_FILES = new Set(['google513b44e9f973aad0.html']);
const SKIP_DIRS = new Set(['seo']); // doublons — redirects vercel.json

function walkHtml(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walkHtml(full, list);
    } else if (entry.name.endsWith('.html') && !SKIP_FILES.has(entry.name)) {
      list.push(full);
    }
  }
  return list;
}

function normalizeLinks(html) {
  return html
    .replace(/href="index\.html/g, 'href="/')
    .replace(/href='index\.html/g, "href='/")
    .replace(/href="\.\.\/index\.html/g, 'href="/')
    .replace(/href="\.\.\/\.\.\/index\.html/g, 'href="/')
    .replace(/href="\.\.\/\.\.\/\.\.\/index\.html/g, 'href="/')
    .replace(/href="booking\.html/g, 'href="/booking')
    .replace(/href="\.\.\/booking\.html/g, 'href="/booking')
    .replace(/href="\.\.\/\.\.\/booking\.html/g, 'href="/booking')
    .replace(/href="seo\/articles\/?"/g, 'href="/zones-intervention/articles/"')
    .replace(/href="\.\.\/seo\/articles\/?"/g, 'href="/zones-intervention/articles/"')
    .replace(/href="\.\.\/\.\.\/seo\/articles\/?"/g, 'href="/zones-intervention/articles/"')
    .replace(/href="seo\/villes-idf\.html"/g, 'href="/zones-intervention/villes-idf.html"')
    .replace(/href="\.\.\/seo\/villes-idf\.html"/g, 'href="/zones-intervention/villes-idf.html"')
    .replace(/href="\.\.\/\.\.\/seo\/villes-idf\.html"/g, 'href="/zones-intervention/villes-idf.html"')
    .replace(/href="index\.html#/g, 'href="/#')
    .replace(/href="\.\.\/index\.html#/g, 'href="/#')
    .replace(/href="\.\.\/\.\.\/index\.html#/g, 'href="/#')
    .replace(/href="(urban|express|premium|titan|demenagement-paris|livraison-express|transport-entreprises|services|transport-paris|transport-ivry-sur-seine|merci)\.html"/g, 'href="/$1.html"')
    .replace(/href="\.\.\/(urban|express|premium|titan|demenagement-paris|livraison-express|transport-entreprises|services|transport-paris|transport-ivry-sur-seine|merci)\.html"/g, 'href="/$1.html"')
    .replace(/href="\.\.\/\.\.\/(urban|express|premium|titan|demenagement-paris|livraison-express|transport-entreprises|services|transport-paris|transport-ivry-sur-seine|merci)\.html"/g, 'href="/$1.html"')
    .replace(/src="brand\//g, 'src="/brand/')
    .replace(/src="css\//g, 'src="/css/')
    .replace(/href="css\//g, 'href="/css/')
    .replace(/src="js\//g, 'src="/js/')
    .replace(/RÉSERVER - DEVIS GRATUIT !/g, 'RÉSERVER MAINTENANT')
    .replace(/Ouvrir un compte Pro/g, 'Demander un devis entreprise');
}

function normalizeContactInfo(html) {
  return html
    .replace(/href="tel:\+33751213255"/g, 'href="tel:+33648745668"')
    .replace(/(<a href="tel:\+33648745668"[^>]*>)\+33 7 51 21 32 55(<\/a>)/g, '$106 48 74 56 68$2')
    .replace(/(<a href="tel:\+33648745668"[^>]*>)07 51 21 32 55(<\/a>)/g, '$106 48 74 56 68$2')
    .replace(/"telephone":\s*"\+33751213255"/g, '"telephone": "+33648745668"')
    .replace(/\s*<a href="https:\/\/www\.linkedin\.com\/company\/moovecity"[\s\S]*?<\/a>\s*/gi, '')
    .replace(/,\s*"https:\/\/www\.linkedin\.com\/company\/moovecity"/g, '')
    .replace(/,\s*<strong>cryptomonnaie<\/strong>/gi, '')
    .replace(/ et <strong>cryptomonnaie<\/strong>/gi, '')
    .replace(/,\s*cryptomonnaie/gi, '')
    .replace(/ et cryptomonnaie/gi, '')
    .replace(/,\s*crypto/gi, '')
    .replace(/ et crypto/gi, '')
    .replace(/espèces, carte bancaire et cryptomonnaie/gi, 'espèces, carte bancaire')
    .replace(/espèces, carte bancaire, cryptomonnaie/gi, 'espèces, carte bancaire')
    .replace(/espèces, CB, crypto/gi, 'espèces, CB')
    .replace(/espèces, CB ou crypto/gi, 'espèces, CB')
    .replace(/Paiement espèces, CB ou crypto/gi, 'Paiement espèces, CB')
    .replace(/carte bancaire et cryptomonnaie/gi, 'carte bancaire')
    .replace(/Paiement espèces, CB, crypto/gi, 'Paiement espèces, CB')
    .replace(/<li><strong>Cryptomonnaie<\/strong>[\s\S]*?<\/li>\s*/gi, '');
}

function ensureStyles(html) {
  if (html.includes('/css/global.css') && html.includes('/css/style.css') && html.includes('/css/pages.css')) {
    return html;
  }
  html = html.replace(/<link rel="stylesheet" href="[^"]*global\.css"[^>]*>\s*/gi, '');
  html = html.replace(/<link rel="stylesheet" href="[^"]*style\.css"[^>]*>\s*/gi, '');
  const inject = SITE_STYLES + '\n    ';
  if (html.includes('</head>')) {
    return html.replace('</head>', inject + '</head>');
  }
  return html;
}

function removeOldWidgets(html) {
  html = html.replace(/<nav class="sticky-mobile-footer"[\s\S]*?<\/nav>\s*/gi, '');
  html = html.replace(/<a[^>]*class="whatsapp-float"[\s\S]*?<\/a>\s*/gi, '');
  html = html.replace(/<button class="scroll-to-top"[\s\S]*?<\/button>\s*/gi, '');
  return html;
}

function ensureWidgets(html) {
  html = removeOldWidgets(html);
  if (html.includes('id="stickyMobileFooter"')) return html;
  return html.replace('</body>', MOBILE_WIDGETS + '\n    ' + SITE_SCRIPTS + '\n</body>');
}

function replaceSiteHeader(html) {
  if (/<header>\s*<nav class="container">/i.test(html)) {
    return html.replace(/<header>\s*<nav class="container">[\s\S]*?<\/header>/i, SITE_HEADER);
  }
  if (/<header class="topbar">/i.test(html)) {
    return html.replace(/<header class="topbar">[\s\S]*?<\/header>/i, SITE_HEADER);
  }
  return html.replace(/<body([^>]*)>/i, (m, attrs) => {
    const cls = attrs.includes('class=') ? attrs : attrs + ' class="site-page"';
    if (!cls.includes('site-page')) {
      return `<body${cls.replace(/class="([^"]*)"/, 'class="$1 site-page"')}>\n    ${SITE_HEADER}\n    `;
    }
    return `<body${attrs}>\n    ${SITE_HEADER}\n    `;
  });
}

function replaceFooter(html) {
  html = html.replace(/<footer[\s\S]*?<\/footer>/i, SITE_FOOTER);
  return html;
}

function ensurePromoBanner(html) {
  html = html.replace(/<aside class="promo-ad promo-ad--compact"[\s\S]*?<\/aside>\s*/gi, '');
  return html.replace(/<\/header>/i, `</header>\n    ${SITE_PROMO_BANNER_COMPACT}\n    `);
}

function processFile(filePath) {
  const basename = path.basename(filePath);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  html = normalizeLinks(html);
  html = normalizeContactInfo(html);

  if (basename === 'booking.html') {
    // legacy booking — minimal sync, page Next.js est la référence
    html = ensureStyles(html);
    html = replaceSiteHeader(html);
    html = ensurePromoBanner(html);
    html = replaceFooter(html);
    html = ensureWidgets(html);
  } else {
    html = ensureStyles(html);
    html = replaceSiteHeader(html);
    html = ensurePromoBanner(html);
    html = replaceFooter(html);
    html = ensureWidgets(html);
  }

  if (!html.includes('class="site-page"') && !html.includes('<section class="hero"')) {
    html = html.replace('<body>', '<body class="site-page">');
    html = html.replace(/<body([^>]*?)>/i, (m, a) => {
      if (a.includes('site-page')) return m;
      if (a.includes('class=')) return m.replace(/class="/, 'class="site-page ');
      return `<body class="site-page"${a}>`;
    });
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }
  return false;
}

const files = walkHtml(PUBLIC);
let updated = 0;
for (const f of files) {
  if (processFile(f)) {
    updated++;
    console.log('✓', path.relative(PUBLIC, f));
  }
}
console.log(`\n${updated}/${files.length} fichiers mis à jour.`);
