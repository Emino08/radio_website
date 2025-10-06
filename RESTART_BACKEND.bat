@echo off
echo ================================================
echo Restarting Backend Server with Fixed Middleware
echo ================================================
echo.
echo The body parsing middleware has been added.
echo This fixes the login JSON parsing issue.
echo.
echo Starting backend on http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0backend"
php -S localhost:8080 -t public

pause
