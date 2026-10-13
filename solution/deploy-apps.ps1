#!/usr/bin/env pwsh
# Despliegue del backend y frontend corregidos (retos E1-E6) del equipo 13.
# Requiere una sesion de Azure CLI con permisos Contributor sobre rg-team-{id}.
#
# Uso:
#   az login
#   ./deploy-apps.ps1 -TeamId 13

[CmdletBinding()]
param(
    [int]$TeamId = 13,
    [string]$BackendZip,
    [string]$FrontendZip
)

$ErrorActionPreference = "Stop"

$resourceGroup = "rg-team-$TeamId"
$backendApp    = "hackathon-copa-2026-team-$TeamId-api"
$frontendApp   = "hackathon-copa-2026-team-$TeamId-frontend"

if (-not $BackendZip)  { $BackendZip  = Join-Path $PSScriptRoot "backend-source.zip" }
if (-not $FrontendZip) { $FrontendZip = Join-Path $PSScriptRoot "frontend-source.zip" }

function Invoke-Az {
    param([Parameter(Mandatory = $true)][string[]]$Arguments)
    & az @Arguments
    if ($LASTEXITCODE -ne 0) { throw "az $($Arguments -join ' ') fallo." }
}

Write-Host "Validando sesion de Azure..."
Invoke-Az @("account", "show", "--output", "none", "--only-show-errors")

foreach ($zip in @($BackendZip, $FrontendZip)) {
    if (-not (Test-Path -LiteralPath $zip)) { throw "No se encontro el paquete: $zip" }
}

Write-Host "Desplegando backend ($backendApp)..."
Invoke-Az @(
    "webapp", "deploy",
    "--resource-group", $resourceGroup,
    "--name", $backendApp,
    "--src-path", $BackendZip,
    "--type", "zip"
)

Write-Host "Desplegando frontend ($frontendApp)..."
Invoke-Az @(
    "webapp", "deploy",
    "--resource-group", $resourceGroup,
    "--name", $frontendApp,
    "--src-path", $FrontendZip,
    "--type", "zip"
)

Write-Host "Reiniciando aplicaciones..."
Invoke-Az @("webapp", "restart", "--resource-group", $resourceGroup, "--name", $backendApp)
Invoke-Az @("webapp", "restart", "--resource-group", $resourceGroup, "--name", $frontendApp)

$backendUrl  = "https://$backendApp.azurewebsites.net"
$frontendUrl = "https://$frontendApp.azurewebsites.net"

Write-Host "Esperando a que el backend responda..."
$healthy = $false
for ($i = 1; $i -le 30; $i++) {
    try {
        $r = Invoke-WebRequest -Uri "$backendUrl/health" -UseBasicParsing -TimeoutSec 10
        if ($r.StatusCode -eq 200) { $healthy = $true; break }
    }
    catch { Start-Sleep -Seconds 10 }
}
if (-not $healthy) { Write-Warning "El backend aun no responde en /health; revisa los logs de despliegue." }

Write-Host "`n=== Verificacion ==="
Write-Host "Backend  : $backendUrl"
Write-Host "Frontend : $frontendUrl"
Write-Host "Swagger  : $backendUrl/swagger"
Write-Host "Pruebas  :"
Write-Host "  GET  $backendUrl/health"
Write-Host "  GET  $backendUrl/health/deep"
Write-Host "  GET  $backendUrl/api/status"
Write-Host "  GET  $backendUrl/api/flights/list"
Write-Host "  POST $backendUrl/api/flights/create"
