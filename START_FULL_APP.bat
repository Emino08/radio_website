@echo off
echo ========================================
echo Radio New Song 97.7 FM - Full Stack App
echo ========================================
echo.

REM Check if MySQL is running
echo Checking MySQL connection...
powershell -Command "$null = Test-NetConnection -ComputerName localhost -Port 4306 -WarningAction SilentlyContinue; if ($?) { Write-Host 'MySQL is running on port 4306' -ForegroundColor Green } else { Write-Host 'ERROR: MySQL is not running on port 4306!' -ForegroundColor Red; exit 1 }"
if errorlevel 1 (
    echo.
    echo Please start MySQL server on port 4306 before continuing.
    pause
    exit /b 1
)

echo.
echo Starting Backend Server...
echo Backend will run on http://localhost:8080
echo.

start "Radio Backend Server" cmd /k "cd /d "%~dp0backend" && echo Backend Server Starting... && php -S localhost:8080 -t public"

timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Development Server...
echo Frontend will run on http://localhost:5173 or http://localhost:5174
echo.

start "Radio Frontend Server" cmd /k "cd /d "%~dp0frontend" && echo Frontend Server Starting... && npm run dev"

timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo Both servers are starting...
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:5173 (or 5174)
echo Admin:    http://localhost:5173/admin
echo.
echo Wait a few seconds, then open your browser!
echo.
echo Press any key to open the browser...
pause >nul

start http://localhost:5173

echo.
echo ========================================
echo SERVERS ARE RUNNING
echo ========================================
echo.
echo To stop the servers, close both console windows.
echo.
