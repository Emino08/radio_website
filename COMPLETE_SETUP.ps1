# Radio New Song 97.7 FM - Complete Setup Script
# Run this in PowerShell as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Radio New Song 97.7 FM" -ForegroundColor Yellow
Write-Host "  Complete Setup & Start" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
$frontendPath = "C:/Users/SABITECK/OneDrive/Documenti/Projects/SABITECK/Radio website/frontend"
Set-Location $frontendPath

Write-Host "Step 1: Stopping any running Node processes..." -ForegroundColor Green
taskkill /F /IM node.exe 2>$null | Out-Null
Start-Sleep -Seconds 2

Write-Host "Step 2: Cleaning old installations..." -ForegroundColor Green
if (Test-Path "node_modules") {
    Write-Host "  Removing node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}
if (Test-Path "package-lock.json") {
    Write-Host "  Removing package-lock.json..." -ForegroundColor Yellow
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
}
if (Test-Path ".vite") {
    Write-Host "  Removing .vite cache..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue
}
if (Test-Path "dist") {
    Write-Host "  Removing dist..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "Step 3: Clearing npm cache..." -ForegroundColor Green
npm cache clean --force 2>&1 | Out-Null

Write-Host ""
Write-Host "Step 4: Installing all dependencies (this may take a minute)..." -ForegroundColor Green
npm install

Write-Host ""
Write-Host "Step 5: Verifying key packages..." -ForegroundColor Green
Write-Host ""
npm list tailwindcss @tailwindcss/vite @vitejs/plugin-react react vite

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete! Starting Dev Server..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your website will be available at:" -ForegroundColor Yellow
Write-Host "  http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Brand Colors:" -ForegroundColor Yellow
Write-Host "  Primary: #072043 (Dark Blue)" -ForegroundColor Blue
Write-Host "  Secondary: #bf993b (Gold)" -ForegroundColor DarkYellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start the dev server
npm run dev
