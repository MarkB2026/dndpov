@echo off
setlocal
cd /d "%~dp0"
title DNDPOV Local Multiplayer

echo DNDPOV Local Multiplayer - one Windows PC hosts the party
echo.
if not exist "local_server.py" (
    echo ERROR: local_server.py is not in this folder.
    echo Place this BAT beside local_server.py and try again.
    pause
    exit /b 1
)

py -3 -c "import aiohttp" >nul 2>&1
if errorlevel 1 (
    echo Installing required Python package aiohttp...
    py -3 -m pip install aiohttp
    if errorlevel 1 (
        echo ERROR: Python 3 and aiohttp are required.
        pause
        exit /b 1
    )
)

echo Starting multiplayer server at http://localhost:8765
echo The Adventure Hub will open when index.html responds.
echo Keep this window open while playing. Press Ctrl+C to stop.
echo.
py -3 -c "import base64;exec(base64.b64decode('aW1wb3J0IG9zLCBydW5weSwgdGhyZWFkaW5nLCB0aW1lLCB1cmxsaWIucmVxdWVzdCwgd2ViYnJvd3Nlcgp1cmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4NzY1L2luZGV4Lmh0bWwnCmRlZiBvcGVuX2h1YigpOgogICAgZm9yIGF0dGVtcHQgaW4gcmFuZ2UoNjApOgogICAgICAgIHRyeToKICAgICAgICAgICAgd2l0aCB1cmxsaWIucmVxdWVzdC51cmxvcGVuKHVybCwgdGltZW91dD0xKSBhcyByZXNwb25zZToKICAgICAgICAgICAgICAgIGlmIHJlc3BvbnNlLnN0YXR1cyA+PSA0MDA6CiAgICAgICAgICAgICAgICAgICAgcmFpc2UgUnVudGltZUVycm9yKCdIVFRQIGVycm9yJykKICAgICAgICAgICAgcHJpbnQoJ09wZW5pbmcgRE5EUE9WIEFkdmVudHVyZSBIdWIgaW4geW91ciBicm93c2VyLi4uJywgZmx1c2g9VHJ1ZSkKICAgICAgICAgICAgdHJ5OgogICAgICAgICAgICAgICAgb3Muc3RhcnRmaWxlKHVybCkKICAgICAgICAgICAgZXhjZXB0IChBdHRyaWJ1dGVFcnJvciwgT1NFcnJvcik6CiAgICAgICAgICAgICAgICB3ZWJicm93c2VyLm9wZW4odXJsKQogICAgICAgICAgICByZXR1cm4KICAgICAgICBleGNlcHQgRXhjZXB0aW9uOgogICAgICAgICAgICB0aW1lLnNsZWVwKDEpCiAgICBwcmludCgnQnJvd3NlciBsYXVuY2ggdGltZWQgb3V0LiBPcGVuICcgKyB1cmwgKyAnIG1hbnVhbGx5LicsIGZsdXNoPVRydWUpCnRocmVhZGluZy5UaHJlYWQodGFyZ2V0PW9wZW5faHViLCBkYWVtb249VHJ1ZSkuc3RhcnQoKQpydW5weS5ydW5fcGF0aCgnbG9jYWxfc2VydmVyLnB5JywgcnVuX25hbWU9J19fbWFpbl9fJykK'))"

if errorlevel 1 echo Server stopped or exited with an error.
pause
