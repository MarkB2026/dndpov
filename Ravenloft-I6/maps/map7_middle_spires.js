// Map 7 — Middle Spires. Geometry-only reconstruction from Map07_Spires_Level2.jpg.
// Shared engine, module descriptions, controls and encounter logic are unchanged.
function makeMiddleSpiresLevel(){
 grid.fill(1);rooms=[];entryDescriptions={};
 const add=(id,x1,y1,x2,y2)=>{
  const data=MODULE_ROOM_DATA[id]||{};
  const detail=data.readAloud?.join('\n\n')||'';
  rooms.push({id,name:data.name||id,box:[x1,y1,x2,y2],detail});
  entryDescriptions[id]=detail;
 };
 const carve=(a,b,c,d)=>rect(a,b,c,d,0);
 // Northern K20 circular stair: same axis as Map 6.
 circle(78,28,17,0);circle(78,28,9,1);circle(78,28,5,0);
 add('K20',74,24,82,32);
 // Southern round tower, at the same footprint as the lower spires.
 circle(79,76,21,0);
 // K48 is the upper landing of the southern tower.
 carve(74,59,84,69);add('K48',74,59,84,69);
 // Three discrete chambers: K54 west, K56 central, K55 south.
 carve(60,72,72,85);add('K54',60,72,72,85);
 carve(74,72,85,84);add('K56',74,72,85,84);
 carve(73,86,87,94);add('K55',73,86,87,94);
 // K18 tower immediately east, same vertical axis as Map 6.
 circle(109,77,12,0);circle(109,77,6,1);circle(109,77,3,0);
 add('K18',106,74,112,80);
 // Narrow openings only; do not invent a passage between separated towers.
 carve(70,75,75,78);carve(77,68,81,73);
 carve(78,83,82,88);carve(85,76,99,79);carve(99,75,104,79);
}

