@echo off
echo Fixing Radio New Song Frontend...
echo.
echo Step 1: Cleaning old files...
cd /d "%~dp0"
if exist node_modules rmdir /s /q node_modules 2>nul
if exist package-lock.json del /f /q package-lock.json 2>nul
if exist .vite rmdir /s /q .vite 2>nul
if exist dist rmdir /s /q dist 2>nul

echo.
echo Step 2: Installing dependencies...
call npm install

echo.
echo Step 3: Testing dev server...
echo Starting in 3 seconds... Close any text editors or VS Code!
timeout /t 3 /nobreak

call npm run dev

pause
