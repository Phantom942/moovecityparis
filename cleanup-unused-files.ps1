# Script de nettoyage des fichiers inutiles - Moove City
# Ce script supprime les fichiers qui ne sont pas necessaires pour le site en production

Write-Host "Nettoyage des fichiers inutiles..." -ForegroundColor Cyan
Write-Host ""

$projectPath = $PSScriptRoot
$filesToDelete = @(
    "MOOVE CITY (1).zip",
    "MOOVE CITY.zip",
    "MooveCity-GitHub.zip",
    "TEST-SITE.html",
    "DEPLOYMENT.html",
    "MODEL SPVN.html",
    "1.png",
    "1.svg",
    "2.png",
    "2.svg"
)

$deletedCount = 0
$notFoundCount = 0

foreach ($file in $filesToDelete) {
    $filePath = Join-Path $projectPath $file
    
    if (Test-Path $filePath) {
        try {
            Remove-Item $filePath -Force
            Write-Host "[OK] Supprime: $file" -ForegroundColor Green
            $deletedCount++
        }
        catch {
            Write-Host "[ERREUR] Impossible de supprimer $file : $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "[INFO] Non trouve: $file" -ForegroundColor Yellow
        $notFoundCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Resume:" -ForegroundColor Cyan
Write-Host "   Fichiers supprimes: $deletedCount" -ForegroundColor Green
Write-Host "   Fichiers non trouves: $notFoundCount" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($deletedCount -gt 0) {
    Write-Host "Prochaines etapes:" -ForegroundColor Cyan
    Write-Host "   1. Verifiez les fichiers supprimes ci-dessus"
    Write-Host "   2. Commitez les changements: git add -A"
    Write-Host "   3. Creez un commit: git commit -m `"Cleanup: Suppression des fichiers inutiles`""
    Write-Host "   4. Poussez sur GitHub: git push"
    Write-Host ""
}

Write-Host "Nettoyage termine !" -ForegroundColor Green
