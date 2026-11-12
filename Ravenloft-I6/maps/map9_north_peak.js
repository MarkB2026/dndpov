export function layout_makeNorthTowerPeakLevel(ctx){
 let {grid,rect,poly,circle,WW,HH,index,MODULE_ROOM_DATA,floorRoomRoster,rooms,entryDescriptions}=ctx;

 grid.fill(1);rooms=[];entryDescriptions={};
 const add=(id,x1,y1,x2,y2)=>{
  const data=MODULE_ROOM_DATA[id]||{};
  const detail=data.readAloud?.join('\n\n')||'';
  rooms.push({id,name:data.name||id,box:[x1,y1,x2,y2],detail});
  entryDescriptions[id]=detail;
 };
 // Keep the north tower's axis exactly aligned with Maps 6–8.
 circle(78,28,17,0);
 // The upper chamber K60, separated from the spiral stair by a curved partition.
 circle(78,26,10,0);
 // Spiral stair landing on the south-western side of the tower.
 circle(78,28,6,1);
 rect(70,28,86,37,0);
 // K60 chamber is north of the K20 stair.
 add('K60',73,17,83,26);
 add('K20',73,30,83,37);

 return {rooms,entryDescriptions};
}
