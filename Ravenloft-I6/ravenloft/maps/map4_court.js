function makeCourtModule({grid,roomsRef,entryDescriptionsRef,rect,poly,circle,WW,HH,index,MODULE_ROOM_DATA}) {
  grid.fill(1);
  const rooms=[],entryDescriptions={};
  const room=(id,x1,y1,x2,y2)=>{
    rect(x1,y1,x2,y2,0);
    const data=MODULE_ROOM_DATA[id]||{};
    const detail=data.readAloud?.join('\n\n')||'';
    rooms.push({id,name:data.name||id,box:[x1,y1,x2,y2],detail});
    if(!(id in entryDescriptions))entryDescriptions[id]=detail;
  };
  const hall=(x1,y1,x2,y2,w=2)=>{
    if(Math.abs(x1-x2)<.1)rect(x1-w,Math.min(y1,y2),x1+w,Math.max(y1,y2),0);
    else if(Math.abs(y1-y2)<.1)rect(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w,0);
    else {rect(Math.min(x1,x2),y1-w,Math.max(x1,x2),y1+w,0);rect(x2-w,Math.min(y1,y2),x2+w,Math.max(y1,y2),0)}
  };
  // Northwest tower, upper gallery and western chambers.
  circle(13,19,8);room('K12',9,15,17,23);
  room('K13',22,17,59,22);
  room('K22',19,27,28,36);
  room('K32',33,25,51,35);
  circle(41,43,7);room('K83',39,41,43,45);
  room('K26',30,49,51,56);
  room('K25',30,56,51,82);
  room('K22',19,71,29,79);
  circle(13,88,8);room('K12',9,85,17,91);
  room('K13',22,85,59,90);
  // Great central circular staircase and surrounding galleries.
  circle(78,32,17);circle(78,32,9,1);circle(78,32,5,0);room('K20',75,29,81,35);
  room('K27',57,49,97,57);
  room('K31',70,60,82,69);
  room('K31a',70,70,82,77);
  room('K30',54,71,68,83);
  circle(63,90,5);room('K64',61,88,65,92);
  circle(75,79,6);room('K21',72,77,78,81);
  circle(92,74,13);circle(92,74,7,1);circle(92,74,4,0);room('K18',89,71,95,77);
  // Northeast service chamber, east passage and eastern landing.
  room('K34',83,9,106,18);
  room('K29',96,35,104,45);
  room('K28',106,48,115,59);
  // Main corridors and deliberate connecting doorways.
  hall(13,24,22,29);hall(27,20,62,20);hall(41,22,41,25);
  hall(24,36,33,40);hall(33,40,34,49);hall(41,35,41,37);
  hall(41,49,41,56);hall(41,82,41,85);hall(22,87,30,87);
  hall(50,53,57,53);hall(51,70,57,70);hall(57,53,57,70);
  hall(57,53,64,53);hall(64,53,97,53,3);
  hall(78,48,78,49,3);hall(78,57,78,60);
  hall(82,65,86,65);hall(86,65,86,74);
  hall(68,77,70,77);hall(68,81,73,81);
  hall(63,83,63,85);hall(63,90,63,92);
  hall(96,53,106,53);hall(100,45,100,53);
  hall(100,35,100,32);hall(100,32,94,32);
  hall(92,18,92,20);hall(92,20,92,25);
  hall(92,25,91,29);hall(94,74,106,74);hall(106,74,110,59);
  // Small passage along eastern chapel-side wall, shown on reference.
  hall(105,39,110,39);hall(110,39,110,48);
  // Western tower-to-hall links and southern gallery.
  hall(17,19,22,19);hall(17,88,22,88);
  hall(51,88,61,88);hall(68,90,73,90);
  return {rooms,entryDescriptions};
}

export function layout_makeCourtOfCountLevel(ctx){
 let {grid,rect,poly,circle,WW,HH,index,MODULE_ROOM_DATA,floorRoomRoster,rooms,entryDescriptions}=ctx;

 const result=makeCourtModule({grid,roomsRef:rooms,entryDescriptionsRef:entryDescriptions,rect,poly,circle,WW,HH,index,MODULE_ROOM_DATA});
 rooms=result.rooms;entryDescriptions=result.entryDescriptions;

 return {rooms,entryDescriptions};
}
