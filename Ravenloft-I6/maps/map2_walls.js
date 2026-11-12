// Map 2 — Walls of Ravenloft v0.10.09: exterior courtyard plan.
// Only Map 2 collision geometry is changed; central keep is solid.
export function drawWallsOfRavenloft({grid,rect,poly,circle,WW,HH,MODULE_ROOM_DATA}) {
 grid.fill(1);
 const rooms=[],entryDescriptions={};
 const carve=(a,b,c,d)=>rect(a,b,c,d,0);
 const zone=(id,a,b,c,d)=>{const data=MODULE_ROOM_DATA[id]||{};
  const detail=data.readAloud?.join('\n\n')||'';
  rooms.push({id,name:data.name||id,box:[a,b,c,d],detail});entryDescriptions[id]=detail;};
 // West approach, drawbridge, and K1: a single broad outdoor forecourt.
 carve(3,46,24,58);carve(24,39,38,65);
 circle(34,40,5,0);circle(34,64,5,0);
 carve(37,30,59,74);carve(38,25,55,80);
 zone('K1',34,40,56,64);
 // North and south outer wall walks: continuous around the inaccessible keep.
 carve(37,19,132,31);carve(37,73,132,85);
 carve(38,30,60,42);carve(38,63,60,75);
 zone('K2',72,19,90,29);
 // Castle mass is x~60..110, y~32..72: NEVER carve the center.
 // The western doorway is an approach, not a tunnel through the castle.
 carve(55,48,59,56);zone('K7',54,48,60,56);
 // North-east and south-east yards. Each links to the respective wall walk.
 carve(110,29,134,48);carve(110,29,120,37);
 zone('K3',115,32,132,45);
 carve(123,16,140,30);carve(127,28,135,35);
 zone('K4',125,17,139,28);
 carve(110,57,135,84);carve(110,68,120,78);
 zone('K5',115,63,132,82);
 // Eastern projecting overlook, with a clear north/south connecting route.
 carve(129,44,143,65);carve(136,47,145,60);
 carve(131,39,136,71);
 zone('K6',135,47,145,62);
 // Connect outer courts around the east side of the keep, without crossing it.
 carve(116,38,122,67);
 // Explicit western arrival spawn, clear of the outer wall.
 return {rooms,entryDescriptions,spawn:{x:31,y:52,a:0,pitch:0}};
}
