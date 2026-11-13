DNDPOV LOCAL MULTIPLAYER — LAN HOST KIT v1.1
Based on the WORKING DNDPOV Local Multiplayer v0.9.86 sync-fix package.

This kit uses one computer as the host. There is NO online matchmaking,
external WebSocket service or multiplayer cloud dependency.

CONTENTS
  START_LOCAL_SERVER.bat      Windows launcher
  local_server.py             Original aiohttp server, extended for all phases
  index.html                  Original full DNDPOV homepage restored
  Ravenloft-I6/
    old_svalich_road.html
    village_of_barovia.html            v5.52
    road_to_tser_pool_and_castle.html  v3.26
    ravenloft.html                     Castle

START THE HOST (Windows)
  1. Extract the whole ZIP into one folder.
  2. Install Python 3.10+ on the host computer, if needed.
     During installation, select "Add Python to PATH."
  3. Double-click START_LOCAL_SERVER.bat. Keep its window open.
     Your regular DNDPOV index.html homepage will open automatically at
     http://localhost:8765 on the SAME computer.
  4. If the browser does not open, type http://localhost:8765 manually.
  5. Choose an adventure phase. Click the Multiplayer button, enter your
     character name, and click Host as DM.
  6. Copy the room's six-character session code for your players.

JOIN FROM OTHER COMPUTERS
  1. Players must be on the same Wi-Fi / LAN as the host.
  2. Open the HOST computer's address, e.g. http://192.168.1.42:8765
     (use the LAN address printed by the server; if it's wrong, find it
      using "ipconfig" on the host).
  3. Choose an adventure phase; click Multiplayer, enter the host's code
     plus your name, and click Join as Player.

DO NOT OPEN FILES DIRECTLY OR USE THE PUBLIC SITE FOR LAN PLAY.
  WRONG: file:///C:/.../ravenloft.html
  WRONG: https://dndpov.com/Ravenloft-I6/ravenloft.html
  RIGHT: http://localhost:8765/Ravenloft-I6/ravenloft.html
  RIGHT: http://HOST-LAN-IP:8765/Ravenloft-I6/ravenloft.html

WHAT HAS BEEN FIXED
  * Original working /ws protocol and aiohttp host have been preserved.
  * Movement coordinates can be negative or beyond the former 0-500 bounds.
  * Floor/zone IDs include the Village (100), Old Svalich Road (101),
    Road to Tser Pool (102), plus all Castle floors (0-10).
  * Changing pages briefly disconnects a DM, but the room now survives
    for three minutes and the original DM can reclaim it with the saved
    session secret. Other players stay connected in the meantime.
  * The village-to-Tser road link stays on the LAN host instead of
    jumping to dndpov.com and disconnecting.
  * The original DNDPOV index.html homepage is back, with adventure links
    that lead to the pages hosted on your LAN computer.
  * The Windows launcher automatically opens the original homepage at
    http://localhost:8765 instead of showing a separate connection hub.
  * Images, videos, and audio not included in the ZIP can load from the
    public dndpov.com site while all multiplayer connections stay local.

CHECKING MULTIPLAYER
  * Keep the server running and open two separate tabs at localhost:8765.
  * Host in one tab. Join as Player with the code in the second tab.
  * Walk around: both players should appear on the same map if in the same
    zone/floor. The DM panel shows players in other zones and Castle floors.
  * In the DM tab, travel to a different adventure page. The DM should
    automatically rejoin the same session; the player should stay connected.
  * The Multiplayer panel has network sent/ACK/updates diagnostics.

NOTES
  * This is for a trusted local party. Do not port-forward it onto the
    public Internet. Windows Firewall may ask permission for Python to
    accept private-network connections; allow it on Private networks only.
  * Existing external Three.js and/or media assets may still require
    internet access, including the original homepage logo, screenshots,
    and videos. Missing media is redirected to dndpov.com automatically.
    To play offline, copy your existing local media/monsters/sounds
    asset folders into their usual locations beside these HTML files.
  * The original game HTML embeds DM/module information. It is not a
    cryptographically player-restricted build; technically skilled players
    can inspect source. Reserve secrets for a separate restricted build.
  * Movement/encounters are an alpha multiplayer layer. The DM manually
    sends encounters from the multiplayer panel.
  * If the DM completely closes the tab, the room survives for three
    minutes for a reconnect, then ends.
