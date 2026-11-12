// Map 12 — Dungeon and Catacombs. Schematic walkable trace of supplied overhead reference.
// Earlier floors, shared tools, room artwork, encounters and multiplayer are unchanged.
function makeCatacombsLevel(){
 grid.fill(1);rooms=[];entryDescriptions={};
 const room=(id,x1,y1,x2,y2,shape='rect')=>{
  if(shape==='rect')rect(x1,y1,x2,y2,0);
  const data=MODULE_ROOM_DATA[id]||{};
  const detail=data.readAloud?.join('\n\n')||'';
  rooms.push({id,name:data.name||id,box:[x1,y1,x2,y2],detail});entryDescriptions[id]=detail;
 };
 const passage=(x1,y1,x2,y2,w=2)=>{
  if(x1===x2)rect(x1-w,Math.min(y1,y2),x1+w,Math.max(y1,y2),0);
  else if(y1===y2)rect(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w,0);
  else {rect(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w,0);rect(x2-w,Math.min(y1,y2),x2+w,Math.max(y1,y2),0)}
 };
 // West wing: crypt approach, torture/dungeon rooms and descending stair.
 room('K79',9,16,23,22);room('K83',9,23,16,31);
 room('K80',16,27,25,35);room('K81',23,23,51,29);
 room('K82',27,30,38,39);room('K78',8,35,25,44);
 room('K77',8,45,25,54);room('K76',7,55,27,68);
 room('K74',27,40,40,55);room('K73',27,56,40,64);room('K75',27,65,40,79);
 // Central stair approach and huge crypt hall.
 circle(51,53,8,0);room('K18',45,47,56,59,'circle');
 circle(42,60,6,0);room('K21',38,55,46,65,'circle');
 // K84: outline of the sprawling catacombs, with offset side alcoves.
 poly([[59,20],[90,20],[90,24],[98,24],[98,34],[93,34],[93,39],[99,39],[99,47],[95,47],[95,59],[99,59],[99,68],[93,68],[93,77],[99,77],[99,83],[90,83],[90,88],[59,88],[59,83],[51,83],[51,77],[58,77],[58,68],[53,68],[53,59],[59,59],[59,46],[53,46],[53,39],[59,39]],0);
 room('K84',61,27,90,80,'open');
 // Northern/southern crypts accessed from the center of K84.
 room('K85',65,5,82,17);passage(73,17,73,20,2);
 room('K86',65,90,82,99);passage(73,88,73,90,2);
 // East landing, staircase and final overlook.
 room('K87',94,47,103,58);room('K88',104,43,119,62);
 passage(99,53,104,53,2);
 // West passages linking the dungeon to the catacombs.
 passage(23,26,53,26,2);passage(53,26,59,26,2);
 passage(15,22,15,23);passage(19,31,19,35);
 passage(19,35,19,45);passage(17,44,17,45);passage(17,54,17,55);
 passage(25,50,27,50);passage(33,39,33,40);
 passage(33,55,33,56);passage(33,64,33,65);
 passage(40,60,45,53,2);passage(51,53,59,53,2);
 passage(27,60,38,60,2);
 // Repeated crypts in K84 are represented by inset blocked stone sarcophagi,
 // keeping walkable aisles through the main chamber.
 for(const yy of [26,33,40,63,70,77]){
  for(const xx of [63,71,79,87]){
   if(yy===40 && xx===63)continue;
   rect(xx,yy,xx+2,yy+2,1);
  }
 }
 // Preserve a continuous central spine across the catacombs.
 rect(73,21,76,88,0);
 rect(59,50,99,55,0);
}
