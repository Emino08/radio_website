@echo off
echo ========================================
echo   Radio New Song 97.7 FM
echo   Tailwind CSS v4 Setup Script
echo ========================================
echo.

cd /d "%~dp0frontend"

echo Step 1: Cleaning old installations...
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules 2>nul
)
if exist package-lock.json (
    echo Removing package-lock.json...
    del /f /q package-lock.json 2>nul
)
if exist .vite (
    echo Removing .vite cache...
    rmdir /s /q .vite 2>nul
)

echo.
echo Step 2: Installing all dependencies...
call npm install

echo.
echo Step 3: Verifying key packages...
call npm list tailwindcss @tailwindcss/vite @vitejs/plugin-react react vite

echo.
echo Step 4: Starting development server...
echo.
echo ========================================
echo Your Radio New Song website will open at:
echo http://localhost:5173
echo.
echo Colors: #072043 (Dark Blue) and #bf993b (Gold)
echo ========================================
echo.

call npm run dev

pause
