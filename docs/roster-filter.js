(()=>{
 const root=document.getElementById('assignment-roster');
 if(!root)return;
 const select=document.getElementById('teacher-filter');
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
 const teachers=['Alejandro','Álvaro','Cristina R','Cristina W','Elena Prieto','Elisa','Fátima','Laura','Manuel','Montse','Pilar','Yony'];
 const groups=[
  ['Departamento de Informática','todos dpt informatica'],
  ['Profesores de la movilidad','profesores de la movilidad'],
  ['Profesores de labor social','profesores labor social'],
  ['Organizadores de movilidad','organizadores movilidad'],
  ['Profesores que van a curso','profesores van a curso'],
  ['Profesores que van a job shadowing','profesores van jobshadowing'],
  ['Gestión del talento','gestion talento'],
  ['ATECA y APE','ateca y ape']
 ];
 const containsName=(text,name)=>new RegExp('(^|[^a-z])'+normalize(name)+'(?=$|[^a-z])').test(text);
 const rows=[...root.querySelectorAll('tbody tr')].map(row=>{
  const cells=row.querySelectorAll('th,td');
  const text=normalize(cells[1].textContent+' '+cells[3].textContent);
  const everyone=normalize(cells[3].textContent)==='todos';
  return {row,text,everyone};
 });
 function options(label,items){const group=document.createElement('optgroup');group.label=label;items.forEach(([text,value])=>{const option=document.createElement('option');option.value=value;option.textContent=text;group.append(option);});select.append(group);}
 options('Profesorado',teachers.map(name=>[name,'teacher:'+name]));
 options('Equipos y asignaciones colectivas',groups.map(([label,key])=>[label,'group:'+key]));
 function filter(){
  const value=select.value,isTeacher=value.startsWith('teacher:');
  const key=value.slice(value.indexOf(':')+1);let count=0;
  rows.forEach(({row,text,everyone})=>{const visible=!value||(isTeacher?(containsName(text,key)||everyone):text.includes(key));row.hidden=!visible;if(visible)count++;});
  root.querySelectorAll('.assignment-block').forEach(block=>{block.hidden=![...block.querySelectorAll('tbody tr')].some(row=>!row.hidden);});
  const council=root.querySelector('.assignment-council');
  council.hidden=!!value&&(!isTeacher||!containsName(normalize(council.querySelector('p').textContent),key));
  document.getElementById('teacher-filter-count').textContent=value?`${count} de ${rows.length} actividades`:`${rows.length} actividades`;
  document.getElementById('teacher-filter-empty').hidden=count>0;
  try{if(value)localStorage.setItem('erasmus-teacher-filter',value);else localStorage.removeItem('erasmus-teacher-filter');}catch{}
 }
 try{const saved=localStorage.getItem('erasmus-teacher-filter');if(saved&&[...select.options].some(option=>option.value===saved))select.value=saved;}catch{}
 select.addEventListener('change',filter);
 document.getElementById('teacher-filter-reset').addEventListener('click',()=>{select.value='';filter();});
 filter();
})();
