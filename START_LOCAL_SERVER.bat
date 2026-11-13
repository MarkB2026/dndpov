@echo off
title DNDPOV Local Multiplayer
cd /d "%~dp0"
echo DNDPOV Local Multiplayer - one Windows PC hosts the party
echo.
py -3 -c "import aiohttp" >nul 2>&1
if errorlevel 1 (
  echo Installing the required Python aiohttp package...
  py -3 -m pip install aiohttp
  if errorlevel 1 (
    echo Could not install aiohttp. Ensure Python 3.10+ is installed.
    pause
    exit /b 1
  )
)
echo.
echo The original DNDPOV homepage will open at http://localhost:8765
echo Keep this window open during the adventure.
echo.
set "DNDPOV_AUTO_OPEN=1"
py -3 local_server.py
pause
