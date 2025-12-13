# Script de verification SEO pour Moove City
# Verifie que tous les fichiers sont correctement configures

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verification SEO - Moove City" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()
$success = @()

# 1. Verifier sitemap.xml
Write-Host "[1] Verification du sitemap.xml..." -ForegroundColor Yellow
$sitemapPath = Join-Path $PSScriptRoot "sitemap.xml"
if (Test-Path $sitemapPath) {
    $sitemapContent = Get-Content $sitemapPath -Raw
    
    # Verifier que la page d'accueil est presente
    if ($sitemapContent -match '<loc>https://www\.moovecity\.fr/</loc>') {
        $success += "[OK] Page d'accueil presente dans le sitemap"
        Write-Host "  [OK] Page d'accueil trouvee" -ForegroundColor Green
    } else {
        $errors += "[ERREUR] Page d'accueil manquante dans le sitemap"
        Write-Host "  [ERREUR] Page d'accueil manquante" -ForegroundColor Red
    }
    
    # Verifier la date (ne doit pas etre dans le futur)
    $hasFutureDate = $false
    if ($sitemapContent -match '<lastmod>(\d{4}-\d{2}-\d{2})</lastmod>') {
        $dates = [regex]::Matches($sitemapContent, '<lastmod>(\d{4}-\d{2}-\d{2})</lastmod>')
        $currentYear = Get-Date -Format "yyyy"
        foreach ($match in $dates) {
            $date = $match.Groups[1].Value
            $year = $date.Substring(0, 4)
            if ([int]$year -gt [int]$currentYear) {
                $warnings += "[ATTENTION] Date future detectee dans sitemap: $date"
                Write-Host "  [ATTENTION] Date future: $date" -ForegroundColor Yellow
                $hasFutureDate = $true
            }
        }
        if (-not $hasFutureDate) {
            $success += "[OK] Dates du sitemap correctes"
            Write-Host "  [OK] Dates correctes" -ForegroundColor Green
        }
    }
} else {
    $errors += "[ERREUR] Fichier sitemap.xml introuvable"
    Write-Host "  [ERREUR] Fichier introuvable" -ForegroundColor Red
}

Write-Host ""

# 2. Verifier index.html
Write-Host "[2] Verification du index.html..." -ForegroundColor Yellow
$indexPath = Join-Path $PSScriptRoot "index.html"
if (Test-Path $indexPath) {
    $indexContent = Get-Content $indexPath -Raw
    
    # Verifier la balise canonical
    if ($indexContent -match 'rel=["'']canonical["'']') {
        $success += "[OK] Balise canonical presente"
        Write-Host "  [OK] Balise canonical trouvee" -ForegroundColor Green
        
        # Verifier la position (doit etre dans les 50 premieres lignes)
        $lines = Get-Content $indexPath
        $canonicalLine = 0
        $maxLines = [Math]::Min(50, $lines.Count)
        for ($i = 0; $i -lt $maxLines; $i++) {
            if ($lines[$i] -match 'canonical') {
                $canonicalLine = $i + 1
                break
            }
        }
        if ($canonicalLine -gt 0 -and $canonicalLine -lt 50) {
            $success += "[OK] Balise canonical bien positionnee (ligne $canonicalLine)"
            Write-Host "  [OK] Position correcte (ligne $canonicalLine)" -ForegroundColor Green
        } else {
            $warnings += "[ATTENTION] Balise canonical peut-etre trop basse dans le head"
            Write-Host "  [ATTENTION] Position a verifier" -ForegroundColor Yellow
        }
    } else {
        $errors += "[ERREUR] Balise canonical manquante ou incorrecte"
        Write-Host "  [ERREUR] Balise canonical manquante" -ForegroundColor Red
    }
    
    # Verifier robots meta
    if ($indexContent -match 'name=["'']robots["'']\s+content=["'']index,\s*follow["'']') {
        $success += "[OK] Meta robots: index, follow"
        Write-Host "  [OK] Meta robots correct" -ForegroundColor Green
    } elseif ($indexContent -match 'name=["'']robots["'']\s+content=["'']noindex') {
        $errors += "[ERREUR] Meta robots contient 'noindex' - BLOQUE L'INDEXATION!"
        Write-Host "  [ERREUR] NOINDEX detecte - PROBLEME CRITIQUE!" -ForegroundColor Red
    } else {
        $warnings += "[ATTENTION] Meta robots non trouve"
        Write-Host "  [ATTENTION] Meta robots non trouve" -ForegroundColor Yellow
    }
    
    # Verifier la description
    if ($indexContent -match 'name=["'']description["'']') {
        $success += "[OK] Meta description presente"
        Write-Host "  [OK] Meta description trouvee" -ForegroundColor Green
    } else {
        $warnings += "[ATTENTION] Meta description manquante"
        Write-Host "  [ATTENTION] Meta description manquante" -ForegroundColor Yellow
    }
} else {
    $errors += "[ERREUR] Fichier index.html introuvable"
    Write-Host "  [ERREUR] Fichier introuvable" -ForegroundColor Red
}

Write-Host ""

# 3. Verifier robots.txt
Write-Host "[3] Verification du robots.txt..." -ForegroundColor Yellow
$robotsPath = Join-Path $PSScriptRoot "robots.txt"
if (Test-Path $robotsPath) {
    $robotsContent = Get-Content $robotsPath -Raw
    
    # Verifier qu'il n'y a pas de Disallow: /
    if ($robotsContent -match 'Disallow:\s*/\s*$') {
        $errors += "[ERREUR] robots.txt bloque TOUT le site (Disallow: /)"
        Write-Host "  [ERREUR] Site bloque!" -ForegroundColor Red
    } else {
        $success += "[OK] robots.txt ne bloque pas le site"
        Write-Host "  [OK] Site autorise" -ForegroundColor Green
    }
    
    # Verifier la presence du sitemap
    if ($robotsContent -match 'Sitemap:\s*https://www\.moovecity\.fr/sitemap\.xml') {
        $success += "[OK] Sitemap declare dans robots.txt"
        Write-Host "  [OK] Sitemap declare" -ForegroundColor Green
    } else {
        $warnings += "[ATTENTION] Sitemap non declare dans robots.txt"
        Write-Host "  [ATTENTION] Sitemap non declare" -ForegroundColor Yellow
    }
} else {
    $warnings += "[ATTENTION] Fichier robots.txt introuvable"
    Write-Host "  [ATTENTION] Fichier introuvable" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RESUME" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($success.Count -gt 0) {
    Write-Host "[OK] SUCCES ($($success.Count)):" -ForegroundColor Green
    foreach ($item in $success) {
        Write-Host "  $item" -ForegroundColor Green
    }
    Write-Host ""
}

if ($warnings.Count -gt 0) {
    Write-Host "[ATTENTION] AVERTISSEMENTS ($($warnings.Count)):" -ForegroundColor Yellow
    foreach ($item in $warnings) {
        Write-Host "  $item" -ForegroundColor Yellow
    }
    Write-Host ""
}

if ($errors.Count -gt 0) {
    Write-Host "[ERREUR] ERREURS ($($errors.Count)):" -ForegroundColor Red
    foreach ($item in $errors) {
        Write-Host "  $item" -ForegroundColor Red
    }
    Write-Host ""
    exit 1
} else {
    Write-Host "[OK] Tous les fichiers sont correctement configures!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Prochaines etapes:" -ForegroundColor Cyan
    Write-Host "1. Televersez les fichiers modifies sur votre serveur" -ForegroundColor White
    Write-Host "2. Allez sur Google Search Console" -ForegroundColor White
    Write-Host "3. Soumettez le sitemap: https://www.moovecity.fr/sitemap.xml" -ForegroundColor White
    Write-Host "4. Demandez l'indexation de: https://www.moovecity.fr/" -ForegroundColor White
    exit 0
}
