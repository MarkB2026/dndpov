export function layout_makeHighTowerPeakLevel(ctx){
 let {grid,rect,poly,circle,WW,HH,index,MODULE_ROOM_DATA,floorRoomRoster,rooms,entryDescriptions}=ctx;

 grid.fill(1);rooms=[];entryDescriptions={};
 const add=(id,x1,y1,x2,y2)=>{
  const data=MODULE_ROOM_DATA[id]||{};
  const detail=data.readAloud?.join('\n\n')||'';
  rooms.push({id,name:data.name||id,box:[x1,y1,x2,y2],detail});
  entryDescriptions[id]=detail;
 };
 // Northern tower top K60a, centered over K20 on previous maps.
 circle(78,28,16,0);
 add('K60a',70,21,86,35);
 // High tower peak K59, centered above K18 on earlier maps.
 circle(109,77,12,0);
 // Stair entry on the south-eastern side, with a small inner landing.
 circle(109,77,5,0);
 add('K59',101,69,117,85);

 return {rooms,entryDescriptions};
}
