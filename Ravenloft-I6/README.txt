DNDPOV v0.10.17 — floor layout cleanup

Upload ravenloft.html AND the complete maps/ folder together into Ravenloft-I6/.
Map 2–12 layout code has been extracted from the latest v0.10.16 castle file into individual JS modules. Map 3 drawMainFloor and getMainFloorRooms are also external. Existing gameplay, DM, Oracle, multiplayer, audio, navigation, and arrival handling remain in ravenloft.html.

The HTML floor previews are NOT automatically imported: these JS modules are the geometry actually used by the Three.js engine. This package contains exact extracted geometry from the current working HTML, not older floor modules.

Test via GitHub Pages or HTTP server, not file://. Test direct Map 3 launch, carriage Map 2 K1 arrival, and floor ribbon Map 2–12. Keep v0.10.16 backup.
