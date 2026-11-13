
// Exact paths bundled in the HTML to avoid JSON loading failures.
const ROOM_ASSET_BASE='https://dndpov.com/Ravenloft-I6/';
function roomAssetUrl(path){return new URL(path,ROOM_ASSET_BASE).href;}
const ROOM_SVG_FILENAMES='K01_Front_Courtyard.svg|K02_Center_Court_Gate.svg|K03_Servants_Court.svg|K04_Carriage_House.svg|K05_Chapel_Garden.svg|K06_Overlook.svg|K07_Entry.svg|K08_Great_Entry.svg|K09_Guests_Hall.svg|K10_Dining_Hall.svg|K11_South_Ground_Archers_Post.svg|K12_Turret_Post.svg|K13_Turret_Post_Access_Hall.svg|K14_Hall_of_Faith.svg|K15_Chapel_of_Ravenloft.svg|K16_North_Chapel_Alcoves.svg|K17_South_Chapel_Alcoves.svg|K18_High_Tower_Staircase.svg|K19_Grand_Landing.svg|K20_Tower_Hall_of_Honor.svg|K21_South_Tower_Stair.svg|K22_Archers_Post.svg|K23_Servants_Entrance.svg|K24_Servants_Quarters.svg|K25_Audience_Hall.svg|K26_Guard_s_Post.svg|K27_Hall_of_Grace.svg|K28_King_s_Worship_Place.svg|K29_Creaking_Landing.svg|K30_Office_of_the_King_s_Accountant.svg|K31_Trapworks.svg|K32_Maid_s_Hall.svg|K33_King_s_Apartment_Stair.svg|K34_Servants_Upper_Floor.svg|K35_Facing_Guardians.svg|K36_Dining_Hall_of_the_Count.svg|K37_Study.svg|K38_False_Treasury.svg|K39_Hall_of_Riches.svg|K40_Belfry.svg|K41_Treasury.svg|K42_Bedchamber.svg|K43_Bath_Chamber.svg|K44_Closet.svg|K45_Hall_of_Heroes.svg|K46_Courtyard_Overlook.svg|K47_The_Landing.svg|K48_Offstair.svg|K49_Lounge.svg|K50_Guestroom.svg|K51_Closet.svg|K52_Smokestack.svg|K53_Rooftop.svg|K54_Familiar_Room.svg|K55_Element_Room.svg|K56_Caldron.svg|K57_Parapet_Pentagram.svg|K58_Bridge.svg|K59_Hightower_Peak.svg|K60_Northtower_Peak.svg|K61_Hallway.svg|K62_Servants_Hall.svg|K63_Wine_Cellar.svg|K64_Guards_Stair.svg|K65_Kitchen.svg|K66_Butler_s_Quarters.svg|K67_Guards_Hall.svg|K68_Guards_Run.svg|K69_Guards_Quarters.svg|K70_Kingsman_Hall.svg|K71_Kingsmen_Quarters.svg|K72_Office_of_Vengeance.svg|K73_Dungeon_Hall.svg|K74_North_Dungeon.svg|K75_South_Dungeon.svg|K76_Torture_Room.svg|K77_Observation_Balcony.svg|K78_Brazier_Room.svg|K79_Western_Stair.svg|K80_Center_Stair.svg|K81_Tunnel.svg|K82_Marble_Slide.svg|K83_Western_Stair.svg|K84_The_Catacombs.svg|K85_Tomb_of_Sergei_Von_Zarovich.svg|K86_Tomb_of_Strahd_Von_Zarovich.svg|K87_Guardians.svg|K88_Tomb_of_Barov_and_Ravenovia.svg'.split("|");
const GROUND_ROOM_IMAGES=Object.fromEntries(ROOM_SVG_FILENAMES.map((name,i)=>["K"+(i+1),"images/"+name]));
// v0.9.36 behavior restored: JSON manifest is authoritative for BOTH room popups.
// The bundled SVG list is a fallback only, never an override of the manifest.
function normalizeRoomImagePath(value){
 if(typeof value!== 'string')return null;
 const path=value.trim().replace(/\\/g,'/');
 if(!path||/^(?:https?:|data:|javascript:|\/)/i.test(path)||path.includes('..'))return null;
 return path.startsWith('images/')?path:'images/'+path;
}
function applyRoomImageManifest(map){
 if(!map||typeof map!=='object'||Array.isArray(map))return;
 for(const [id,path] of Object.entries(map)){
  const normalized=normalizeRoomImagePath(path);
  if(normalized)GROUND_ROOM_IMAGES[id]=normalized;
 }
 if(latestRoomImageEntry?.id && roomImagesEnabled && !roomImagesSeen.has(latestRoomImageEntry.id))showRoomArtOnEntry(latestRoomImageEntry);
}
fetch(roomAssetUrl('room-image-map.json'),{cache:'no-store'})
 .then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()})
 .then(applyRoomImageManifest)
 .catch(err=>console.warn('Room-image manifest unavailable; using SVG filename fallback:',err));
let roomImagesEnabled=localStorage.getItem('dndpov_room_images_enabled')!=='false';
const roomImagesSeen=new Set();
const roomArtToggle=document.getElementById('roomImagesToggle');
roomArtToggle.textContent='Room Images: '+(roomImagesEnabled?'ON':'OFF');
roomArtToggle.onclick=()=>{roomImagesEnabled=!roomImagesEnabled;localStorage.setItem('dndpov_room_images_enabled',String(roomImagesEnabled));roomArtToggle.textContent='Room Images: '+(roomImagesEnabled?'ON':'OFF');if(!roomImagesEnabled)closeRoomArt();else if(latestRoomImageEntry?.id)showRoomArtOnEntry(latestRoomImageEntry,true);};
function closeRoomArt(){document.getElementById('roomArtOverlay').style.display='none';}
document.getElementById('roomArtClose').onclick=closeRoomArt;
document.getElementById('roomArtOverlay').onclick=e=>{if(e.target.id==='roomArtOverlay')closeRoomArt()};
let pendingRoomArtId=null;
let latestRoomImageEntry=null;
function showRoomArtOnEntry(info,force=false){
 if(!info||!roomImagesEnabled||!GROUND_ROOM_IMAGES[info.id]||(!force&&roomImagesSeen.has(info.id)))return;
 const id=info.id;
 if(!force&&pendingRoomArtId===id)return;
 pendingRoomArtId=id;
 const overlay=document.getElementById('roomArtOverlay');
 const img=document.getElementById('roomArtImg');
 const card=document.getElementById('roomArtCard');
 let err=document.getElementById('roomArtLoadError');
 if(!err){err=document.createElement('div');err.id='roomArtLoadError';err.style.cssText='display:none;color:#ffd0ab;padding:12px;font-size:14px';card.insertBefore(err,document.getElementById('roomArtClose'));}
 const path=GROUND_ROOM_IMAGES[id];
 document.getElementById('roomArtHeading').textContent=document.getElementById('noteTitle').textContent.trim() || (id+' · '+(info.name||'Room'));
 function reveal(){
  if(!roomImagesEnabled||pendingRoomArtId!==id)return;
  if(document.getElementById('start').style.display!=='none'){setTimeout(reveal,150);return;}
  if(document.getElementById('popup').style.display==='block'){setTimeout(reveal,400);return;}
  roomImagesSeen.add(id);
  overlay.style.display='flex';
  document.exitPointerLock?.();
 }
 img.onload=()=>{if(pendingRoomArtId!==id)return;err.style.display='none';img.style.display='block';};
 img.onerror=()=>{
  if(pendingRoomArtId!==id)return;
  img.style.display='none';err.style.display='block';
  err.textContent='Could not load the room image at '+path+'. Verify the image exists in Ravenloft-I6/images/ with the exact filename and capitalization.';
  console.warn('Room illustration failed:',path);
 };
 img.style.display='block';err.style.display='none';
 img.removeAttribute('src');img.src=roomAssetUrl(path);
 // The working legacy behavior: room entry opens the popup regardless of image load.
 setTimeout(reveal,100);
}
window.addEventListener('dndpov-room-entry',e=>{
 latestRoomImageEntry=e.detail;
 if(!e.detail.id){pendingRoomArtId=null;return;}
 showRoomArtOnEntry(e.detail);
});
const viewRoomArtButton=document.createElement('button');
viewRoomArtButton.textContent='View Room Image';
viewRoomArtButton.title='Reopen the current K# illustration';
viewRoomArtButton.onclick=()=>{
 const info=latestRoomImageEntry;
 if(info?.id)showRoomArtOnEntry(info,true);
};
document.getElementById('roomImagesToggle').insertAdjacentElement('afterend',viewRoomArtButton);
addEventListener('keydown',e=>{if((e.code==='Enter'||e.code==='Escape')&&document.getElementById('roomArtOverlay').style.display==='flex'){e.preventDefault();e.stopImmediatePropagation();closeRoomArt()}},true);
