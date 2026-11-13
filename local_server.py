"""DNDPOV LAN multiplayer host, based on the working v0.9.86 aiohttp server.

Python 3.10+ / aiohttp. Serve the four adventure pages through this server,
never through file:// or dndpov.com when using local multiplayer.
"""

import asyncio
import json
import math
import random
import secrets
import socket
import string
from pathlib import Path

from aiohttp import WSMsgType, web

BASE = Path(__file__).resolve().parent
PORT = 8765
DM_REJOIN_GRACE_SECONDS = 180
POSITION_DIAGNOSTICS = True
sessions = {}
expiry_tasks = set()


def code():
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=6))


def safe(value, limit=48):
    return str(value or "").strip()[:limit]


def safe_floor(value):
    """Castle floors 0-10; outside zones 100=village, 101=Svalich, 102=Tser."""
    n = int(value)
    if 0 <= n <= 10 or n in (100, 101, 102):
        return n
    raise ValueError("Unknown multiplayer floor or zone")


def safe_coordinate(value):
    n = float(value)
    if not math.isfinite(n):
        raise ValueError("Non-finite coordinate")
    return max(-10000, min(10000, n))


def state(session):
    return {
        "type": "state",
        "members": [
            {key: value for key, value in player.items() if key != "ws"}
            for player in session["players"].values()
        ],
        "paused": session["paused"],
    }


async def publish(session, message, recipients=None):
    for player in list(session["players"].values()):
        if recipients is not None and player["id"] not in recipients:
            continue
        try:
            await player["ws"].send_json(message)
        except (ConnectionError, RuntimeError):
            pass


async def log(session, message):
    session["log"].append(message)
    session["log"] = session["log"][-100:]
    await publish(
        session,
        {"type": "log", "message": message},
        {p["id"] for p in session["players"].values() if p["role"] == "dm"},
    )


async def expire_unhosted_session(session):
    """A page transition closes the DM socket; do not eject players immediately."""
    try:
        await asyncio.sleep(DM_REJOIN_GRACE_SECONDS)
        if sessions.get(session["code"]) is not session:
            return
        if any(p["role"] == "dm" for p in session["players"].values()):
            return
        await publish(
            session,
            {
                "type": "error",
                "message": "DM did not reconnect; local session ended. Ask for a new code.",
            },
        )
        for player in list(session["players"].values()):
            await player["ws"].close(code=1001, message=b"DM session ended")
        sessions.pop(session["code"], None)
    except asyncio.CancelledError:
        pass


def schedule_expiry(session):
    old = session.get("expiry_task")
    if old and not old.done():
        old.cancel()
    task = asyncio.create_task(expire_unhosted_session(session))
    session["expiry_task"] = task
    expiry_tasks.add(task)
    task.add_done_callback(expiry_tasks.discard)


async def ws_handler(request):
    ws = web.WebSocketResponse(heartbeat=20, max_msg_size=16384)
    await ws.prepare(request)
    session = None
    player = None
    try:
        async for event in ws:
            if event.type != WSMsgType.TEXT:
                continue
            try:
                message = json.loads(event.data)
                if not isinstance(message, dict):
                    continue
            except (ValueError, TypeError):
                continue
            typ = message.get("type")

            if typ == "join" and player is None:
                role = message.get("role")
                room_code = safe(message.get("code"), 8).upper()
                if room_code and not (
                    room_code.isalnum() and 4 <= len(room_code) <= 8
                ):
                    await ws.send_json({"type": "error", "message": "Invalid session code."})
                    continue
                if role == "dm":
                    existing = sessions.get(room_code) if room_code else None
                    if existing:
                        # Only the original DM's saved secret can reclaim a session.
                        candidate = safe(message.get("secret"), 100)
                        if not candidate or not secrets.compare_digest(
                            candidate, existing["secret"]
                        ):
                            await ws.send_json(
                                {
                                    "type": "error",
                                    "message": "Session already hosted. Rejoin in the original DM tab.",
                                }
                            )
                            continue
                        session = existing
                        timer = session.get("expiry_task")
                        if timer and not timer.done():
                            timer.cancel()
                        # Handle an overlapping navigation/reconnect cleanly.
                        old_dms = [
                            p for p in session["players"].values() if p["role"] == "dm"
                        ]
                        for previous in old_dms:
                            session["players"].pop(previous["id"], None)
                            await previous["ws"].close(
                                code=1001, message=b"DM rejoined elsewhere"
                            )
                    else:
                        room_code = room_code or code()
                        while room_code in sessions:
                            room_code = code()
                        session = {
                            "code": room_code,
                            "secret": secrets.token_urlsafe(24),
                            "players": {},
                            "paused": False,
                            "log": [],
                            "expiry_task": None,
                        }
                        sessions[room_code] = session
                elif role == "player":
                    session = sessions.get(room_code)
                    if not session:
                        await ws.send_json(
                            {
                                "type": "error",
                                "message": "Session not found. Ask the DM for the code.",
                            }
                        )
                        continue
                else:
                    continue

                player_id = secrets.token_hex(6)
                player = {
                    "id": player_id,
                    "name": safe(message.get("name"), 24) or "Adventurer",
                    "color": safe(message.get("color"), 16),
                    "role": role,
                    "x": 44,
                    "y": 36,
                    "a": 0,
                    "floor": 0,
                    "room": None,
                    "online": True,
                    "ws": ws,
                }
                session["players"][player_id] = player
                await ws.send_json(
                    {
                        "type": "welcome",
                        "id": player_id,
                        "role": role,
                        "code": room_code,
                        "secret": session["secret"] if role == "dm" else None,
                    }
                )
                await publish(session, state(session))
                await log(session, player["name"] + " joined as " + role)
                continue

            if player is None or session is None:
                continue

            if typ == "position":
                if session["paused"] and player["role"] != "dm":
                    continue
                try:
                    player.update(
                        x=safe_coordinate(message["x"]),
                        y=safe_coordinate(message["y"]),
                        a=safe_coordinate(message.get("a", 0)),
                        floor=safe_floor(message["floor"]),
                        room=safe(message.get("room"), 64) or None,
                    )
                except (ValueError, TypeError, KeyError):
                    continue
                await publish(session, state(session))
                if POSITION_DIAGNOSTICS:
                    await ws.send_json(
                        {
                            "type": "position_ack",
                            "x": player["x"],
                            "y": player["y"],
                            "floor": player["floor"],
                        }
                    )
            elif typ == "room":
                try:
                    player["floor"] = safe_floor(message.get("floor", 0))
                except (ValueError, TypeError):
                    continue
                player["room"] = safe(message.get("room"), 64) or None
                await publish(session, state(session))
                await log(
                    session,
                    player["name"]
                    + " entered "
                    + (player["room"] or "Passage")
                    + " · floor "
                    + str(player["floor"]),
                )
            elif typ in ("encounter", "complete", "pause") and player["role"] == "dm":
                if typ == "pause":
                    session["paused"] = not session["paused"]
                    await publish(session, state(session))
                    await log(
                        session,
                        "DM " + ("paused" if session["paused"] else "resumed") + " movement",
                    )
                    continue
                target = message.get("targets", "room")
                floor = message.get("floor")
                room = message.get("room")
                recipients = {
                    p["id"]
                    for p in session["players"].values()
                    if p["role"] == "player"
                    and (
                        target == "all"
                        or (p["floor"] == floor and p["room"] == room)
                    )
                }
                if typ == "encounter":
                    monster = safe(message.get("id"), 64)
                    try:
                        count = max(1, min(99, int(message.get("count", 1))))
                    except (ValueError, TypeError):
                        count = 1
                    if not monster:
                        continue
                    await publish(
                        session,
                        {"type": "encounter", "id": monster, "count": count},
                        recipients,
                    )
                    await log(
                        session,
                        f"DM triggered {count} × {monster} for {len(recipients)} player(s)",
                    )
                else:
                    await publish(session, {"type": "complete"}, recipients)
                    await log(
                        session,
                        f"DM completed encounter for {len(recipients)} player(s)",
                    )
    except Exception as exc:
        print("Connection:", exc)
    finally:
        if player is not None and session is not None:
            # An overlapping DM reconnect may already have replaced this socket.
            if session["players"].get(player["id"]) is player:
                session["players"].pop(player["id"], None)
                await publish(session, state(session))
                if player["role"] == "dm":
                    await log(
                        session,
                        "DM temporarily disconnected; reconnect within three minutes.",
                    )
                    schedule_expiry(session)
                else:
                    await log(session, player["name"] + " disconnected")
    return ws


async def homepage(request):
    return web.FileResponse(BASE / "index.html")


async def old_castle_link(request):
    raise web.HTTPFound("/Ravenloft-I6/ravenloft.html")


async def health(request):
    return web.json_response(
        {"status": "ready", "sessions": len(sessions), "mode": "local-lan"}
    )


async def asset(request):
    path = request.match_info["path"]
    candidate = (BASE / path).resolve()
    if not candidate.is_relative_to(BASE) or not candidate.is_file():
        raise web.HTTPNotFound()
    return web.FileResponse(candidate)


async def clean_up(_app):
    for task in list(expiry_tasks):
        task.cancel()
    if expiry_tasks:
        await asyncio.gather(*expiry_tasks, return_exceptions=True)


app = web.Application()
app.router.add_get("/ws", ws_handler)
app.router.add_get("/health", health)
app.router.add_get("/", homepage)
app.router.add_get("/castle.html", old_castle_link)
app.router.add_get("/{path:.*}", asset)
app.on_cleanup.append(clean_up)


def local_ip():
    try:
        candidates = [
            item[4][0]
            for item in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET)
        ]
        return next(ip for ip in candidates if not ip.startswith("127."))
    except (OSError, StopIteration):
        return "YOUR-LAN-IP"


if __name__ == "__main__":
    print(
        "\nDNDPOV LOCAL MULTIPLAYER\n"
        f"DM:      http://localhost:{PORT}\n"
        f"Players: http://{local_ip()}:{PORT} (same Wi-Fi/LAN)\n"
        "Press Ctrl+C to stop.\n",
        flush=True,
    )
    web.run_app(app, host="0.0.0.0", port=PORT)
