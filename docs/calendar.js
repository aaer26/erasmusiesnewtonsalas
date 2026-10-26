(()=>{
 const events=[
  ['2026-12-03',null,0,1,'Encuestas para detección de exclusión digital','Inicios de diciembre · orientativa'],
  ['2026-12-15',null,0,0,'Taller de prevención de estafas digitales','Orientativa'],
  ['2026-12-16',null,2,0,'Podcast · primera publicación','Orientativa'],
  ['2027-01-15',null,0,2,'Videotutoriales de gestiones','Orientativa'],
  ['2027-01-18',null,0,4,'Un asistente que ayuda en directo','Orientativa'],
  ['2027-01-29',null,1,0,'Crear recursos educativos y materiales','Fecha límite · última semana de enero · orientativa'],
  ['2027-02-01','2027-02-05',4,0,'Movilidad de grupo','Del 1 al 5 de febrero'],
  ['2027-02-15',null,0,3,'Recursos digitales en varios idiomas','Orientativa'],
  ['2027-02-16',null,1,2,'Curso online','Orientativa'],
  ['2027-02-17',null,3,0,'Compartir experiencia con la ESO (visualización mujer)','Tercera semana de febrero · orientativa'],
  ['2027-02-18',null,1,4,'Dar espacio al talento','Orientativa'],
  ['2027-02-26',null,1,3,'Digitalizar la enseñanza','Finales de febrero · orientativa'],
  ['2027-03-15',null,1,1,'Mostrar metodologías innovadoras (ATECA)','Orientativa'],
  ['2027-03-16',null,3,1,'Compartir experiencia de labor social con centros de intercambio','Provisional · cuando se realice el intercambio'],
  ['2027-03-17',null,3,2,'Acercar el proyecto a los colegios','Provisional · cuando se reciba la visita del colegio'],
  ['2027-03-18',null,3,4,'Un árbol por viaje','Orientativa'],
  ['2027-03-19',null,4,0,'Vivir y aprender en grupo','Orientativa · actividad de marzo vinculada a la movilidad'],
  ['2027-03-16',null,4,1,'Experiencias que inspiran','Orientativa'],
  ['2027-03-15',null,4,2,'Formarse en Europa · movilidad de curso','Orientativa'],
  ['2027-04-15',null,4,3,'Aprender observando','Orientativa']
 ].map(([start,end,project,activity,title,note])=>({start,end:end||start,project,activity,title,note}));
 const months=Array.from({length:10},(_,i)=>({year:i<4?2026:2027,month:(i+8)%12}));
 const el=id=>document.getElementById(id);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const iso=(year,month,day)=>`${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
 const label=d=>new Date(d+'T12:00:00').toLocaleDateString('es-ES',{day:'numeric',month:'long'});
 const href=e=>`#${window.PROJECTS[e.project].id}/actividad-${e.activity+1}`;
 const colors=['#56baa6','#a8ce83','#ffab6a','#a99bcf','#86bfd1'];
 function render({year,month},index){
  const prefix=iso(year,month,1).slice(0,7);
  const list=events.filter(e=>e.start.startsWith(prefix)).sort((a,b)=>a.start.localeCompare(b.start));
  if(!list.length)return '';
  const title=new Date(year,month,1).toLocaleDateString('es-ES',{month:'long',year:'numeric'});
  const rows=list.map(e=>{
   const day=Number(e.start.slice(-2)),endDay=Number(e.end.slice(-2));
   const dayLabel=e.end!==e.start?day+'–'+endDay:String(day);
   return `<li><a class="schedule-row" href="${href(e)}" style="--event-color:${colors[e.project]}"><time datetime="${e.start}" aria-label="${esc(label(e.start)+(e.end!==e.start?' al '+label(e.end):''))}"><span>DÍA${e.end!==e.start?'S':''}</span><strong>${dayLabel}</strong></time><div class="schedule-description"><h3>${esc(e.title)}</h3><span class="agenda-project">${esc(window.PROJECTS[e.project].title)}</span><p>${esc(e.note)}</p></div><span class="schedule-arrow" aria-hidden="true">↗</span></a></li>`;
  }).join('');
  return `<section class="schedule-month" aria-labelledby="schedule-month-${index}"><h2 id="schedule-month-${index}">${esc(title)}</h2><ul>${rows}</ul></section>`;
 }
 el('calendar-all-months').innerHTML=months.map(render).join('');
})();
