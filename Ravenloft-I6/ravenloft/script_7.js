
(function(){
const dock=document.getElementById('dungeonToolDock'),toggle=document.getElementById('dungeonToolToggle'),tray=document.getElementById('dungeonToolTray');
const torch=document.getElementById('dungeonToolTorch'),oracle=document.getElementById('dungeonToolOracle'),encounters=document.getElementById('dungeonToolDM');
function sync(){const original=document.getElementById('lantern');const on=!original||original.textContent.includes('ON');torch.innerHTML='<span class="tool-icon">🔥</span> Torch '+(on?'ON':'OFF');torch.setAttribute('aria-pressed',String(on));const dm=document.body.classList.contains('dm-visible');oracle.disabled=!dm;encounters.disabled=!dm;}
function close(){dock.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{dock.classList.toggle('open');toggle.setAttribute('aria-expanded',String(dock.classList.contains('open')));sync();document.exitPointerLock?.();});
torch.addEventListener('click',()=>{document.getElementById('lantern')?.click();sync();});
oracle.addEventListener('click',()=>{if(!oracle.disabled){document.getElementById('oracleOrb')?.click();close();}});
encounters.addEventListener('click',()=>{if(encounters.disabled)return;const p=document.getElementById('dmEncounterPanel');if(p){p.style.display='block';if(typeof renderDmEncounters==='function')renderDmEncounters();document.exitPointerLock?.();close();}});
document.addEventListener('pointerdown',e=>{if(!dock.contains(e.target))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
// Keep all original event handlers intact: move the actual controls, not clones.
const settings=[
 ['mouseLook','◉','Mouse Look'],
 ['textToggle','▤','Room Notes'],
 ['roomImagesToggle','▧','Room Images'],
 ['ambientControl','♫','Dungeon Sounds'],
 ['mapBtn','⌖','Key Locations'],
 ['hardcoreBtn','▦','Navigation Map'],
 ['moduleContentsBtn','📖','Module Contents'],
 ['reset','↺','Restart Floor']
];
// DM controls are grouped together, ahead of exploration tools.
const dmMode=document.getElementById('dmBtn');
const dmHeading=document.createElement('div');dmHeading.className='tool-divider';dmHeading.textContent='DM TOOLS';
tray.insertBefore(dmHeading,oracle);
if(dmMode){dmMode.dataset.toolIcon='⚿';dmMode.dataset.toolLabel='DM Mode';tray.insertBefore(dmMode,oracle);}
const sep=document.createElement('div');sep.className='tool-divider';sep.textContent='EXPLORATION & SETTINGS';tray.insertBefore(sep,torch);
const moved=dmMode?[dmMode]:[];
for(const [id,icon,label] of settings){
 const b=document.getElementById(id);if(!b)continue;
 b.dataset.toolIcon=icon;b.dataset.toolLabel=label;
 tray.appendChild(b);moved.push(b);
 if(id==='reset')b.classList.add('tool-danger');
}
function active(b){
 const t=b.textContent.toUpperCase();const id=b.id;
 if(id==='mapBtn')return /HIDE KEY/.test(t);
 if(id==='hardcoreBtn')return /HIDE MAP/.test(t);
 if(id==='ambientControl')return /ON/.test(t)&&!/OFF/.test(t);
 if(['moduleContentsBtn','reset'].includes(id))return false;
 return /\bON\b/.test(t)&&!/\bOFF\b/.test(t);
}
function refreshAll(){
 sync();
 torch.classList.toggle('tool-active',torch.getAttribute('aria-pressed')==='true');
 oracle.classList.toggle('tool-active',document.getElementById('oraclePanel')?.style.display!=='none'&&!oracle.disabled);
 encounters.classList.toggle('tool-active',document.getElementById('dmEncounterPanel')?.style.display!=='none'&&!encounters.disabled);
 for(const b of moved){
  b.classList.toggle('tool-active',active(b));
  b.setAttribute('aria-pressed',String(active(b)));
  // Labels stay as maintained by the original game logic.
 }
}
for(const b of moved)b.addEventListener('click',()=>{setTimeout(refreshAll,0);});
for(const b of [torch,oracle,encounters,toggle])b.addEventListener('click',()=>{setTimeout(refreshAll,0);});
// Capture keyboard shortcuts as well as mouse interactions.
document.addEventListener('keyup',refreshAll);
// Refresh on opening the tray, so states remain accurate even after programmatic changes.
toggle.addEventListener('click',refreshAll);
refreshAll();
})();
