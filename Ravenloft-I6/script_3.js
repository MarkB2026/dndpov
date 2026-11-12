
/* Real audio file playback — external /sounds/ directory; no synthetic tones. */
(()=>{
'use strict';
const button=document.getElementById('ambientControl');
if(!button)return;
const LOOPS=["freesound_community-a_dungeon_ambience_loop-79423.mp3", "freesound_community-cave-background-sound-49440.mp3", "freesound_community-dungeon-air-6983.mp3", "freesound_community-echo-dungeon-70538.mp3"];
const CASTLE=["audiopapkin-old-creaking-wooden-door-003-raw-recording-508598.mp3", "audiopapkin-old-creaking-wooden-door-005-raw-recording-508601.mp3", "freesound_community-chain-drag-floor-56575.mp3", "freesound_community-five_bangs-107118.mp3", "freesound_community-walk-to-dungeon-69897.mp3", "soundsforyou-door-creaking-121673.mp3", "11325622-dungeon-sound-effect-240254.mp3"];
const TOWER=["audiopapkin-old-creaking-wooden-door-003-raw-recording-508598.mp3", "audiopapkin-old-creaking-wooden-door-005-raw-recording-508601.mp3", "freesound_community-five_bangs-107118.mp3", "freesound_community-walk-to-dungeon-69897.mp3", "soundsforyou-door-creaking-121673.mp3", "11325622-dungeon-sound-effect-240254.mp3"];
const DUNGEON=["alesiadavina-deep-monster-breathing-dark-dungeon-ambience-sfx-541146.mp3", "alesiadavina-deep-monster-breathing-demonic-dungeon-ambience-sfx-541140.mp3", "alesiadavina-demonic-breathing-horror-drone-ambience-sfx-543202.mp3", "freesound_community-cavegorillawav-14739.mp3", "freesound_community-chain-drag-floor-56575.mp3", "freesound_community-dungeon-fart-74529.mp3", "freesound_community-stepping-down-into-the-dungeon-32506.mp3", "freesound_community-water-drops_northern87-31333.mp3", "nastynewfie-dark-torture-machine-efx-622059.mp3", "11325622-dungeon-sound-effect-240254.mp3"];
const root='sounds/';
let enabled=true,unlocked=false,background=null,foreground=null,interval=null,loopTimer=null,lastName='',lastFloor=-1;
const pick=arr=>arr[Math.floor(Math.random()*arr.length)];
const floor=()=>typeof window.ravenFloor==='function'?window.ravenFloor():0;
const src=name=>root+encodeURIComponent(name);
const stop=(a)=>{if(a){a.pause();a.removeAttribute('src');a.load();}};
function setLabel(){button.textContent=enabled?'🔊 Dungeon sounds: ON':'🔇 Dungeon sounds: OFF';button.setAttribute('aria-pressed',String(enabled));}
function playEffect(){
 if(!enabled||!unlocked||document.hidden)return;
 const f=floor(),choices=f>=8?DUNGEON:f>=5?TOWER:CASTLE;
 let name=pick(choices);if(name===lastName&&choices.length>1)name=pick(choices.filter(v=>v!==lastName));lastName=name;
 stop(foreground);foreground=new Audio(src(name));foreground.preload='auto';foreground.volume=f>=8?.43:.35;
 foreground.play().catch(()=>{});
}
function playBackground(){
 if(!enabled||!unlocked||document.hidden)return;
 const f=floor();if(background&&f===lastFloor&&!background.paused)return;
 lastFloor=f;stop(background);
 const chosen=f>=8?LOOPS[1]:f>=5?LOOPS[2]:LOOPS[0];
 background=new Audio(src(chosen));background.loop=true;background.preload='auto';background.volume=.13;
 background.play().catch(()=>{});
}
function start(){
 if(!enabled||!unlocked)return;
 playBackground();
 if(!interval){interval=setInterval(()=>{if(enabled&&unlocked){playBackground();if(Math.random()<.08)playEffect();}},2500);}
}
function unlock(){if(unlocked)return;unlocked=true;start();}
button.addEventListener('click',()=>{
 if(!unlocked){unlocked=true;enabled=true;start();setLabel();return;}
 enabled=!enabled;setLabel();if(enabled)start();else{stop(background);stop(foreground);background=null;foreground=null;lastFloor=-1;}
});
document.addEventListener('pointerdown',unlock,{once:true});
document.addEventListener('keydown',unlock,{once:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){background?.pause();foreground?.pause();}else if(enabled&&unlocked){lastFloor=-1;start();}});
setLabel();
})();
