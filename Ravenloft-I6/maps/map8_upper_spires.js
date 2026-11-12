export function layout_makeUpperSpiresLevel(ctx){
 let {grid,rect,poly,circle,WW,HH,index,MODULE_ROOM_DATA,floorRoomRoster,rooms,entryDescriptions}=ctx;

 grid.fill(1);rooms=[];entryDescriptions={};
 const add=(id,x1,y1,x2,y2)=>{
  const data=MODULE_ROOM_DATA[id]||{};
  const detail=data.readAloud?.join('\n\n')||'';
  rooms.push({id,name:data.name||id,box:[x1,y1,x2,y2],detail});
  entryDescriptions[id]=detail;
 };
 const carve=(a,b,c,d)=>rect(a,b,c,d,0);
 // North K20 tower, aligned to the lower spires.
 circle(78,28,17,0);circle(78,28,9,1);circle(78,28,5,0);
 add('K20',74,24,82,32);
 // Southern K57 parapet, open circular rooftop with solid parapet edge.
 circle(79,76,21,0);
 circle(79,76,17,0);
 add('K57',65,79,91,93);
 // K48 is the small offstair at the northern rim of K57.
 carve(74,59,84,70);add('K48',74,62,84,70);
 // K58 bridge from southern parapet to northern tower.
 carve(76,45,81,62);add('K58',76,46,81,58);
 // Keep north tower's access into the bridge open.
 carve(76,42,81,48);
 // K18 high tower staircase, east of the southern parapet.
 circle(109,77,12,0);circle(109,77,6,1);circle(109,77,3,0);
 add('K18',106,74,112,80);
 // Passage to K18 through the eastern edge of the parapet.
 carve(96,75,104,79);

 return {rooms,entryDescriptions};
}
