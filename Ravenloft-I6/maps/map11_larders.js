export function layout_makeLardersLevel(ctx){
 let {grid,rect,poly,circle,WW,HH,index,MODULE_ROOM_DATA,floorRoomRoster,rooms,entryDescriptions}=ctx;

 grid.fill(1);rooms=[];entryDescriptions={};
 const room=(id,x1,y1,x2,y2,shape='rect')=>{
  if(shape==='rect')rect(x1,y1,x2,y2,0);
  const data=MODULE_ROOM_DATA[id]||{};
  const detail=data.readAloud?.join('\\n\\n')||'';
  rooms.push({id,name:data.name||id,box:[x1,y1,x2,y2],detail});
  entryDescriptions[id]=detail;
 };
 const passage=(x1,y1,x2,y2,w=2)=>{
  if(x1===x2)rect(x1-w,Math.min(y1,y2),x1+w,Math.max(y1,y2),0);
  else if(y1===y2)rect(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w,0);
  else {rect(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w,0);rect(x2-w,Math.min(y1,y2),x2+w,Math.max(y1,y2),0)}
 };
 // Map axes: western dining/larders, eastern high tower stair.
 room('K72',47,13,62,22);
 room('K70',46,24,62,38);
 room('K71',64,24,73,38);
 room('K66',64,39,73,48);
 room('K65',74,39,94,48);
 room('K62',46,39,62,69);
 room('K61',64,49,99,59);
 room('K63',101,39,111,70);
 room('K67',65,60,77,69);
 // Western K69 cell block and southern K68/K64 stair approach.
 room('K69',24,70,57,85);
 room('K68',51,86,64,91);
 circle(65,86,6,0);room('K64',61,82,69,91,'circle');
 circle(74,72,7,0);room('K21',69,67,79,78,'circle');
 circle(91,70,12,0);circle(91,70,5,1);circle(91,70,3,0);
 room('K18',86,64,97,77,'circle');
 // Original reference's north-west spiral beside K70/K62.
 rect(35,28,45,47,0);
 // Eastern stair landing and north passage, joining the eastern K63 corridor.
 rect(94,30,100,54,0);
 rect(73,25,89,32,0);
 // Doors/passages only between adjacent chambers shown in reference.
 passage(54,22,54,24);
 passage(62,30,64,30);
 passage(62,44,64,44);
 passage(73,44,74,44);
 passage(54,38,54,39);
 passage(62,54,64,54);
 passage(73,53,74,53);
 passage(94,53,101,53);
 passage(69,59,69,60);
 passage(77,65,83,65);
 passage(77,70,81,70);
 passage(57,77,65,77);
 passage(57,83,57,86);
 passage(64,88,65,88);
 passage(65,69,69,69);
 passage(62,72,69,72);
 passage(40,43,46,43);
 passage(87,30,97,30);
 passage(97,30,97,39);

 return {rooms,entryDescriptions};
}
