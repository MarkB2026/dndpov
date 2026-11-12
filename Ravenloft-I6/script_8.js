
(()=>{
 const $mp=id=>document.getElementById(id), mp={connected:false,id:null,members:[],role:null,session:null,paused:false};window.DNDPOV_MP=mp;
 let ws=null,lastSent=0,sessionSecret=null,sent=0,received=0,acked=0;
 const say=t=>{$mp('mpStatus').textContent=t};
 function send(o){if(ws?.readyState===WebSocket.OPEN){ws.send(JSON.stringify(o));if(o.type==='position')sent++}}
 function redraw(){const el=$mp('mpMembers');el.replaceChildren();for(const m of mp.members){const p=document.createElement('div');p.className='member';p.textContent=(m.online?'● ':'○ ')+m.name+' · '+(floorNames[m.floor]||m.floor)+' · '+(m.room||'Passage')+(m.role==='dm'?' · DM':'')+' · X:'+Number(m.x).toFixed(1)+' Y:'+Number(m.y).toFixed(1);p.style.color=m.color;el.append(p)}
 $mp('mpButton').textContent=mp.connected?'♟ '+mp.session+' · '+mp.members.length+' connected':'♟ Multiplayer: OFF';
 }
 function connect(role){if(ws)ws.close();mp.connected=false;const proto=location.protocol==='https:'?'wss:':'ws:';ws=new WebSocket(proto+'//'+location.host+'/ws');
 ws.onopen=()=>send({type:'join',role,code:$mp('mpCode').value.trim().toUpperCase(),name:$mp('mpName').value.trim()||'Adventurer',color:$mp('mpColor').value,secret:role==='dm'?sessionSecret:null});
 ws.onclose=()=>{mp.connected=false;say('Disconnected. Rejoin when ready.');redraw()};ws.onerror=()=>say('Connection failed. Open Castle using the local server address, not file://.');
 ws.onmessage=e=>{let d;try{d=JSON.parse(e.data)}catch{return}
 if(d.type==='position_ack'){acked++;return}
 if(d.type==='error'){say(d.message);return}
 if(d.type==='welcome'){mp.connected=true;mp.id=d.id;mp.role=d.role;mp.session=d.code;sessionSecret=d.secret||sessionSecret;$mp('mpCode').value=d.code;$mp('mpDM').hidden=d.role!=='dm';say('Connected as '+d.role.toUpperCase()+' · session '+d.code);sendPosition(true);redraw();return}
 if(d.type==='state'){received++;mp.members=d.members||[];mp.paused=!!d.paused;redraw();window.DNDPOV_CASTLE_BRIDGE?.redrawMap?.();return}
 if(d.type==='log'&&mp.role==='dm'){const p=document.createElement('div');p.textContent=d.message;$mp('mpLog').prepend(p);return}
 if(d.type==='encounter'){if(!d.id)return;window.dispatchEvent(new CustomEvent('dndpov-monster-reveal',{detail:{id:d.id,count:d.count||1}}));
 const shock=$mp('encounterShock');$mp('shockHeading').textContent='ENCOUNTER · '+d.id.replaceAll('_',' ').toUpperCase();$mp('shockMessage').textContent=(d.count||1)+' × '+d.id.replaceAll('_',' ');shock.style.display='block';
 if(typeof oracleRecord==='function')oracleRecord('Multiplayer encounter','DM triggered '+d.id+' · '+d.count+' creatures','Encounter received');return}
 if(d.type==='complete'){$mp('encounterShock').style.display='none';if(typeof oracleRecord==='function')oracleRecord('Multiplayer battle complete','DM resolved encounter','Continue exploring');return}
 };
 }
 function sendPosition(force=false){if(!mp.connected)return;const now=Date.now();if(!force&&now-lastSent<170)return;lastSent=now;
 const pos=window.DNDPOV_CASTLE_BRIDGE?.getPosition?.();if(pos)send({type:'position',...pos});}
 setInterval(()=>sendPosition(),180);
 setInterval(()=>{
   const remote=mp.members.filter(m=>m.id!==mp.id);
   $mp('mpTransport').textContent='Network: '+(ws?.readyState===1?'connected':'disconnected')+' · sent '+sent+' · server ACK '+acked+' · states received '+received+' · remote '+remote.length;
 },1000);
 document.addEventListener('keydown',e=>{if(mp.connected&&mp.paused&&mp.role!=='dm'&&['ArrowUp','ArrowDown','KeyW','KeyS'].includes(e.code)){e.stopImmediatePropagation();e.preventDefault()}},true);
 window.addEventListener('dndpov-room-entry',e=>{if(mp.connected)send({type:'room',room:e.detail?.id||null,floor:activeFloor})});
 $mp('mpButton').onclick=()=>{$mp('mpPanel').style.display=$mp('mpPanel').style.display==='block'?'none':'block'};
 $mp('mpClose').onclick=()=>$mp('mpPanel').style.display='none';
 $mp('mpHost').onclick=()=>connect('dm');$mp('mpJoin').onclick=()=>connect('player');
 $mp('mpLeave').onclick=()=>{ws?.close();mp.connected=false;mp.members=[];redraw()};
 $mp('mpTrigger').onclick=()=>send({type:'encounter',id:$mp('mpMonster').value.trim().toLowerCase().replaceAll(' ','_'),count:Number($mp('mpCount').value)||1,targets:$mp('mpTargets').value,room:window.DNDPOV_CASTLE_BRIDGE?.getPosition?.()?.room||null,floor:window.DNDPOV_CASTLE_BRIDGE?.getPosition?.()?.floor??0});
 $mp('mpComplete').onclick=()=>send({type:'complete',targets:$mp('mpTargets').value,room:window.DNDPOV_CASTLE_BRIDGE?.getPosition?.()?.room||null,floor:window.DNDPOV_CASTLE_BRIDGE?.getPosition?.()?.floor??0});
 $mp('mpPause').onclick=()=>send({type:'pause'});
 // DM-only notes are not sent by the server. Hide local DM toggle for joined players.
 const observer=new MutationObserver(()=>{if(mp.connected&&mp.role==='player'&&window.DNDPOV_CASTLE_BRIDGE?.isDM?.()){window.DNDPOV_CASTLE_BRIDGE?.toggleDM?.()}});
 observer.observe($mp('dmBtn'),{attributes:true,childList:true,subtree:true});
})();
