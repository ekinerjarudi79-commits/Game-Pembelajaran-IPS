@echo off
title IPS ADVENTURE - Server Launcher
cd /d "%~dp0"
echo ========================================================
echo   MENJALANKAN IPS ADVENTURE - PETUALANGAN KELAS 7
echo ========================================================
echo Membuka browser di http://localhost:8088 ...
start "" "http://localhost:8088"
node server.js
pause
