export function layout_makeRoomsOfWeepingLevel(ctx){
 let {grid,rect,poly,circle,WW,HH,index,MODULE_ROOM_DATA,floorRoomRoster,rooms,entryDescriptions}=ctx;

 grid.fill(1);rooms=[];entryDescriptions={};
 const chamber=(id,x1,y1,x2,y2)=>{rect(x1,y1,x2,y2,0);const data=MODULE_ROOM_DATA[id]||{};const detail=data.readAloud?.join('\n\n')||'';rooms.push({id,name:data.name||id,box:[x1,y1,x2,y2],detail});entryDescriptions[id]=detail;};
 const hall=(x1,y1,x2,y2,w=2)=>{if(x1===x2)rect(x1-w,Math.min(y1,y2),x1+w,Math.max(y1,y2),0);else if(y1===y2)rect(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w,0);else {rect(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w,0);rect(x2-w,Math.min(y1,y2),x2+w,Math.max(y1,y2),0)}};
 const oct=(cx,cy,rx,ry)=>poly([[cx-rx*.55,cy-ry],[cx+rx*.55,cy-ry],[cx+rx,cy-ry*.55],[cx+rx,cy+ry*.55],[cx+rx*.55,cy+ry],[cx-rx*.55,cy+ry],[cx-rx,cy+ry*.55],[cx-rx,cy-ry*.55]],0);
 // Western tower and K45 hall of heroes; stairs K83.
 oct(14,18,8,8);hall(19,20,60,20,3);
 chamber('K45',22,24,57,39);circle(37,42,6,0);chamber('K83',34,39,40,45);
 // West rooms: K46 is the balcony, K42 bedroom, K43 bath and K44 closet.
 chamber('K46',12,45,20,65);chamber('K42',21,45,42,65);
 chamber('K43',21,66,42,80);chamber('K44',23,81,41,88);
 chamber('K37',43,45,62,64);chamber('K36',43,67,55,86);
 // North tower, east corridor and treasury wing.
 circle(77,33,17,0);circle(77,33,9,1);circle(77,33,5,0);chamber('K20',74,30,80,36);
 oct(100,42,9,9);chamber('K41',96,39,104,45);
 chamber('K38',63,47,73,60);chamber('K39',74,47,96,60);
 chamber('K40',97,47,119,61);
 // Southern stair cluster and guard chambers.
 chamber('K35',57,69,68,82);chamber('K31a',68,64,79,70);
 circle(74,79,7,0);chamber('K21',71,76,77,82);
 circle(93,77,13,0);circle(93,77,6,1);circle(93,77,3,0);chamber('K18',90,74,96,80);
 circle(63,89,5,0);chamber('K64',60,86,66,92);
 // Access openings, based on the relative positions in the reference map.
 hall(20,53,22,53);hall(42,54,43,54);hall(62,54,63,54);
 hall(73,54,74,54);hall(96,54,97,54);hall(104,45,104,47);
 hall(34,65,34,66);hall(34,80,34,81);hall(48,64,48,67);
 hall(55,75,57,75);hall(68,75,71,75);hall(79,67,86,67);
 hall(86,67,86,76);hall(79,54,79,64);hall(77,50,77,47);
 hall(62,60,62,69);hall(62,82,62,86);
 hall(37,39,37,40);hall(40,42,43,46);hall(57,33,60,33);
 hall(60,33,60,47);hall(77,50,77,47);
 hall(93,60,93,64);hall(93,64,93,67);

 return {rooms,entryDescriptions};
}
