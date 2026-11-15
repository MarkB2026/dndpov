@echo off
setlocal
cd /d "%~dp0"
if not exist "ravenloft.html" (
 echo ERROR: Put this BAT file in the Ravenloft-I6 folder beside ravenloft.html.
 pause
 exit /b 1
)
if not exist "AIDM\ai_dm_server.py" (
 echo ERROR: Missing AIDM\ai_dm_server.py
 pause
 exit /b 1
)
where py >nul 2>&1
if errorlevel 1 (
 echo ERROR: Python launcher 'py' not found.
 pause
 exit /b 1
)
echo Starting Castle web server on 8765...
start "RPGPOV Castle - keep open" /D "%~dp0" cmd /k "py -3 -m http.server 8765"
echo Starting AI DM on 8766...
start "RPGPOV AI DM - keep open" /D "%~dp0AIDM" cmd /k "py -3 -u ai_dm_server.py"
echo Waiting briefly before opening Castle...
timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:8765/ravenloft.html"
echo.
echo Keep both server windows open while playing.
echo If a server says 'address already in use', close the extra window; an existing server may already be running.
endlocal
