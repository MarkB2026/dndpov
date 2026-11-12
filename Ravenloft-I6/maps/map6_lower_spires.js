// Map 6 — Spires of Ravenloft (Lower). Architectural data only.
// Traced schematically from Map06_Spires_Level1.jpg; all descriptions come from MODULE_ROOM_DATA.
function makeLowerSpiresLevel(){
 grid.fill(1);rooms=[];entryDescriptions={};
 const room=(id,x1,y1,x2,y2)=>{
   const data=MODULE_ROOM_DATA[id]||{};
   const detail=data.readAloud?.join('\n\n')||'';
   rooms.push({id,name:data.name||id,box:[x1,y1,x2,y2],detail});
   entryDescriptions[id]=detail;
 };
 const carve=(x1,y1,x2,y2)=>rect(x1,y1,x2,y2,0);
 const hall=(x1,y1,x2,y2,w=2)=>{
   if(x1===x2)carve(x1-w,Math.min(y1,y2),x1+w,Math.max(y1,y2));
   else if(y1===y2)carve(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w);
   else {carve(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w);carve(x2-w,Math.min(y1,y2),x2+w,Math.max(y1,y2));}
 };
 // K53 roof terrace to the west; tower K20 above, as on the reference.
 carve(12,32,59,57);room('K53',15,34,55,55);
 circle(78,28,17,0);circle(78,28,9,1);circle(78,28,5,0);room('K20',74,24,82,32);
 // Lower south tower: K48 landing, K49, K47, K50, K51 and K21.
 circle(79,76,21,0);
 // Room subdivisions leave narrow connecting doors rather than a single open disk.
 carve(61,69,71,81);room('K49',61,69,71,81);
 carve(73,70,84,79);room('K21',74,71,82,78);
 carve(70,60,84,68);room('K48',71,60,82,67);
 carve(84,78,95,87);room('K47',84,78,94,86);
 carve(73,85,83,94);room('K50',73,85,83,93);
 carve(85,87,97,94);room('K51',85,87,96,94);
 // Stair tower K18 on the east of the lower tower.
 circle(109,77,12,0);circle(109,77,6,1);circle(109,77,3,0);room('K18',106,74,112,80);
 // Doorways, internal landings, and a short roof-to-tower connection.
 hall(69,66,74,66,2);hall(70,75,74,75,2);
 hall(82,75,85,75,2);hall(79,79,79,85,2);
 hall(82,89,85,89,2);hall(95,82,99,82,2);
 hall(99,77,103,77,2);
 // Roof is visually below the northern tower; its outline is not a second invented room.
 hall(59,44,62,44,2);
}
