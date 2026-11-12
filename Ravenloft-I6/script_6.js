
(()=>{
 const btn=document.getElementById('moduleContentsBtn');
 const overlay=document.getElementById('moduleContentsOverlay');
 const frame=document.getElementById('moduleContentsFrame');
 const close=document.getElementById('moduleContentsClose');
 const source='ADV_DnD_I6_FULL_rooms.html';
 function hide(){overlay.style.display='none';frame.src='about:blank';}
 btn.addEventListener('click',()=>{
   if(!document.body.classList.contains('dm-visible'))return;
   document.exitPointerLock?.();
   frame.src=source;
   overlay.style.display='flex';
 });
 close.addEventListener('click',hide);
 overlay.addEventListener('click',e=>{if(e.target===overlay)hide()});
 document.addEventListener('keydown',e=>{
   if(overlay.style.display==='flex'){
     if(e.key==='Escape'){hide();e.preventDefault();}
     e.stopImmediatePropagation();
   }
 },true);
 const dmButton=document.getElementById('dmBtn');
 dmButton.addEventListener('click',()=>{if(!document.body.classList.contains('dm-visible'))hide()});
})();
