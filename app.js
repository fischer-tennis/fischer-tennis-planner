function showPlayer(mode){
  const sections=document.querySelectorAll('[data-player]');
  sections.forEach(s=>{
    const p=s.getAttribute('data-player');
    s.classList.toggle('hidden', !(mode==='all'||p===mode));
  });
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  try{localStorage.setItem('ftp-player-filter',mode);}catch(e){}
}
function playerFromHash(){
  const h=(location.hash||'').toLowerCase();
  if(h==='#janik') return 'Janik';
  if(h==='#simonko') return 'Simonko';
  return null;
}
function markToday(){
  const d=new Date();
  const iso=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  document.querySelectorAll('[data-date]').forEach(x=>{
    if(x.dataset.date===iso){x.classList.add('today');const b=x.querySelector('.date-box');if(b&&!b.querySelector('.today-badge')){const e=document.createElement('span');e.className='today-badge';e.textContent='DNES';b.prepend(e);}}
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  if(document.querySelector('.player-tabs')){
    let mode=playerFromHash();
    if(!mode){try{mode=localStorage.getItem('ftp-player-filter')}catch(e){}}
    showPlayer(mode||'all');
    markToday();
  }
  if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});}
});
window.addEventListener('hashchange',()=>{const p=playerFromHash();if(p)showPlayer(p);});