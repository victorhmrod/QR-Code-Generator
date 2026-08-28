<#
.SYNOPSIS
    Builds QR Code Generator and packages it into a Windows installer
    (dist-installer\QRCodeGenerator-Setup-<version>.exe) with Inno Setup.

.DESCRIPTION
    Requires: Node.js, and Inno Setup 6 (ISCC.exe) — install it with:
      winget install --id JRSoftware.InnoSetup -e
#>
param(
    [string]$InnoSetupCompiler = "$env:LOCALAPPDATA\Programs\Inno Setup 6\ISCC.exe"
)

$ErrorActionPreference = "Stop"
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$installerScript = "$repoRoot\installer\QRCodeGenerator.iss"

Write-Host "== Building the app (renderer + Electron main/preload + unpacked dir) ==" -ForegroundColor Cyan
Push-Location $repoRoot
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
} finally {
    Pop-Location
}

if (-not (Test-Path $InnoSetupCompiler)) {
    throw "Inno Setup compiler not found at '$InnoSetupCompiler'. Install it with: winget install --id JRSoftware.InnoSetup -e"
}

Write-Host "== Compiling installer ==" -ForegroundColor Cyan
& $InnoSetupCompiler $installerScript
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Done. Installer is in $repoRoot\dist-installer\" -ForegroundColor Green
