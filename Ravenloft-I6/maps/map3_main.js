// Map 3 reconstruction v0.9.91 from supplied labeled top-down reference.
// Grid cells are interpretive and deliberately wide for first-person navigation.
// This file ONLY defines Map 3 geometry; the shared engine retains all gameplay.
export function drawMainFloor({rect,poly,circle,grid,WW,HH,index}) {
 // v0.9.96: architectural correction based on user-supplied Map03_Main_Floor.jpg.
 // The original map is the spatial authority. Geometry only: no gameplay code changes.
 grid.fill(1);
 const room=(a,b,c,d)=>rect(a,b,c,d,0);
 const corridor=(a,b,c,d)=>rect(a,b,c,d,0);
 const oct=(cx,cy,rx,ry)=>poly([[cx-rx*.55,cy-ry],[cx+rx*.55,cy-ry],[cx+rx,cy-ry*.52],[cx+rx,cy+ry*.52],[cx+rx*.55,cy+ry],[cx-rx*.55,cy+ry],[cx-rx,cy+ry*.52],[cx-rx,cy-ry*.52]],0);
 const ring=(cx,cy,outer,inner)=>{circle(cx,cy,outer,0);circle(cx,cy,inner,1)};
 const join=(x1,y1,x2,y2,w=3)=>{
  const r=Math.floor(w/2);
  let x=x1,y=y1;
  const carve=()=>rect(x-r,y-r,x+r,y+r,0);
  carve();while(x!==x2){x+=Math.sign(x2-x);carve()}
  while(y!==y2){y+=Math.sign(y2-y);carve()}
 };
 // Upper and lower K12 towers; K13 corridors connect to the main keep.
 oct(17,23,9,9);oct(17,85,9,9);
 corridor(24,21,70,26);corridor(24,86,67,91);
 // Upper left: K19 room, distinct K83 stair and landing.
 room(32,29,54,43);room(29,28,34,42);
 ring(41,45,6,2);
 room(30,42,39,48);
 // K7 entrance and K8 great entry; two separate rooms and doorways.
 room(37,49,48,59);oct(59,56,9,10);
 // K9 north-south guests hall, K10 dining hall and K11 adjacent post.
 room(54,64,64,81);
 room(29,65,51,83);room(20,65,29,82);
 // North K20 tower: annular staircase and interior stairwell.
 ring(78,35,15,5);
 // K24 north chamber, K23 eastern service passage, K29 landing.
 room(84,13,104,22);room(93,25,103,39);room(94,40,103,49);
 room(88,23,95,28);
 // K14 long east-west hall, K16 north entrance to the chapel.
 corridor(67,50,109,60);
 room(102,30,110,45);
 // Chapel K15, large irregular cruciform footprint with end altar.
 poly([[112,27],[117,22],[123,22],[129,28],[129,34],[135,38],
       [137,45],[137,71],[133,77],[129,77],[128,83],[122,88],
       [115,88],[110,82],[110,67],[108,60],[110,47],[110,35]],0);
 // K17 is the lower chapel wing, not a separate remote chamber.
 room(111,70,128,83);
 // Stair cluster below K14: K31a, K21, K18, K64.
 room(68,62,81,69);
 ring(76,75,6,2);
 ring(94,72,12,4);
 ring(65,87,5,2);
 // Narrow internal passages, preserving discrete rooms and walls.
 join(46,53,52,53); // K7 -> K8
 join(58,65,58,62); // K8 -> K9
 join(52,73,54,73); // K10 -> K9
 join(28,73,30,73); // K11 -> K10
 join(41,49,41,47); // K83 -> K7
 join(41,41,41,40); // K19 -> K83
 join(26,24,32,24); // upper K12 -> K13
 join(26,88,30,88); // lower K12 -> K13
 join(41,83,41,87); // K10 -> lower K13
 join(59,81,59,87); // K9 -> lower K13
 join(67,56,70,56); // K8 -> K14
 join(78,48,78,51); // K20 -> K14
 join(99,39,99,42); // K23 -> K29
 join(99,49,99,53); // K29 -> K14
 join(100,22,100,26); // K24 -> K23
 join(103,36,106,36); // K23 -> K16
 join(108,42,113,42); // K16 -> K15
 join(108,56,113,56); // K14 -> K15
 join(79,61,79,64); // K14 -> K31a
 join(76,69,76,70); // K31a -> K21
 join(83,66,86,66); // K31a -> K18
 join(103,73,112,73); // K18 -> K17
 join(65,82,65,84); // K9 -> K64
 join(63,76,70,76); // K9 -> K21
 // Main entrance approach: outside K7, through its western gate.
 join(33,54,38,54);
}

export function getMainFloorRooms(){
const rooms=[
{id:'K7',name:'Entry',box:[37,49,48,59],detail:'Heavy entrance doors, dim torches and four dragon figures overhead guard the passage inward.'},
{id:'K8',name:'Great Entry',box:[50,47,68,64],detail:'A vaulted entrance with dusty columns, torch sconces, gargoyles above and aged ceiling artwork.'},
{id:'K9',name:'Guests’ Hall',box:[54,64,64,81],detail:'A stone vaulted hall with torchlight, an armored display and a passage toward the stairs.'},
{id:'K10',name:'Dining Hall',box:[29,65,51,83],detail:'A grand banquet chamber with chandeliers, a long dining table, mirrors and an organ.'},
{id:'K14',name:'Hall of Faith',box:[68,50,108,60],detail:'A long dusty corridor with statues lining both sides.'},
{id:'K15',name:'Chapel of Ravenloft',box:[111,27,137,88],detail:'Ruined pews, damaged stained glass, and an altar illuminated by a concentrated shaft of light.'},
{id:'K11',name:'South Ground Archers Post',box:[20,65,29,82],detail:''},
{id:'K12',name:'Turret Post',box:[8,14,26,32],detail:''},
{id:'K13',name:'Turret Access Hall',box:[25,21,70,26],detail:''},
{id:'K22',name:'Archers Post',box:[16, 21, 29, 34],detail:''},
{id:'K83',name:'Spiral Stair',box:[35,39,47,51],detail:''},
{id:'K19',name:'Tower Landing',box:[32,29,54,43],detail:''},
{id:'K20',name:'Heart of Sorrow Tower',box:[64,20,92,49],detail:''},
{id:'K20a',name:'Tower Stair Landing',box:[86, 25, 94, 37],detail:''},
{id:'K29',name:'Tower Passage',box:[94,40,103,49],detail:''},
{id:'K23',name:'Servants Entrance',box:[93,25,103,39],detail:''},
{id:'K24',name:'Servants Quarters Stair',box:[84,13,104,22],detail:''},
{id:'K16',name:'Chapel Passage',box:[102,30,110,45],detail:''},
{id:'K17',name:'Court Passage',box:[111,70,128,83],detail:''},
{id:'K18',name:'High Tower Stair',box:[82,60,106,84],detail:''},
{id:'K18a',name:'Stair Landing',box:[82, 73, 95, 79],detail:''},
{id:'K21',name:'South Tower',box:[70,69,82,81],detail:''},
{id:'K31b',name:'Stair Landing',box:[68, 58, 82, 66],detail:''},
{id:'K64',name:'Stair Shaft',box:[60,82,70,92],detail:''}
,{id:'K31a',name:'Stair Landing',box:[68,62,81,69],detail:''}
];

return rooms;
}
