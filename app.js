/* MindConnect — engine: router, drawer, shared widgets, animations. Room renderers live in rooms.js. */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const store={
  get(k,d){try{const v=localStorage.getItem("mc:"+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem("mc:"+k,JSON.stringify(v))}catch(e){}}
};
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ---------- toast & drawer ---------- */
let toastT;
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("show"),2200)}
function openDrawer(html,after){$("#drawerBody").innerHTML=html;$("#drawer").classList.add("open");$("#scrim").classList.add("open");$("#drawer").scrollTop=0;if(after)after($("#drawerBody"));setTimeout(()=>$("#drawerX").focus(),50)}
function closeDrawer(){$("#drawer").classList.remove("open");$("#scrim").classList.remove("open")}
$("#drawerX").addEventListener("click",closeDrawer);$("#scrim").addEventListener("click",closeDrawer);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawer()});

/* ---------- theme ---------- */
const root=document.documentElement;
const savedTheme=store.get("theme",null);if(savedTheme)root.setAttribute("data-theme",savedTheme);
$("#themeBtn").addEventListener("click",()=>{
  const cur=root.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
  const nx=cur==="dark"?"light":"dark";root.setAttribute("data-theme",nx);store.set("theme",nx);toast(nx==="dark"?"Dark theme":"Light theme");rerender();
});

/* ---------- shared widget builders ---------- */
const W={};
W.verse=(t,r)=>`<blockquote class="verse">${t}<cite>${r}</cite></blockquote>`;
W.tag=(t,k="")=>`<span class="tag ${k}">${t}</span>`;
W.list=a=>`<ul class="clean">${a.map(x=>`<li>${x}</li>`).join("")}</ul>`;
W.steps=a=>`<ol class="steps">${a.map(x=>`<li><div>${x}</div></li>`).join("")}</ol>`;
W.compare=(okT,ok,badT,bad)=>`<div class="compare"><div class="ok"><b>${okT}</b>${W.list(ok)}</div><div class="bad"><b>${badT}</b>${W.list(bad)}</div></div>`;
W.head=(eyebrow,title,lede)=>`<header class="room-head"><span class="mono eyebrow">${eyebrow}</span><h1>${title}</h1>${lede?`<p class="lede">${lede}</p>`:""}</header>`;
W.sec=(title,sub,body)=>`<section class="sec"><div class="sec-h"><h2>${title}</h2>${sub?`<p>${sub}</p>`:""}</div>${body}</section>`;
const CHEM=[["dopamine","Dopamine","--glory","wanting · drive · reward"],["oxytocin","Oxytocin","--living","bonding · trust · safety"],["serotonin","Serotonin","--violet","contentment · mood stability"],["endorphins","Endorphins","--glory","pleasure · pain relief"],["cortisol","Cortisol","--stress","stress · threat"],["adrenaline","Adrenaline","--stress","alarm · fight or flight"]];
W.meters=(vals,id)=>`<div class="meters" id="${id}">${CHEM.map(([k,n,c,h])=>`<div class="meter" title="${h}"><span>${n}</span><div class="bar"><i data-w="${vals[k]||0}" style="background:var(${c})"></i></div><span class="v">${vals[k]||0}</span></div>`).join("")}</div>`;
W.fillMeters=el=>{if(!el)return;requestAnimationFrame(()=>$$(".bar i",el).forEach(i=>i.style.width=i.dataset.w+"%"))};
W.scripts=a=>a&&a.length?`<div class="row">${a.map(r=>`<span class="ref">${r}</span>`).join('<span class="muted">·</span>')}</div>`:"";

/* ---------- hero neural canvas ---------- */
let heroRAF=null;
function neuralCanvas(cv){
  if(heroRAF)cancelAnimationFrame(heroRAF);
  const ctx=cv.getContext("2d");let w,h,dpr=Math.min(2,devicePixelRatio||1),nodes=[],pulses=[];
  function size(){const r=cv.getBoundingClientRect();w=r.width;h=r.height;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=Math.round(Math.min(70,w*h/9000));nodes=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))}
  size();
  const gold=css("--glory"),teal=css("--living"),line=css("--line");
  function frame(){
    ctx.clearRect(0,0,w,h);
    for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>w)n.vx*=-1;if(n.y<0||n.y>h)n.vy*=-1}
    ctx.lineWidth=1;
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<110){ctx.globalAlpha=(1-d/110)*.55;ctx.strokeStyle=line;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      if(Math.random()<.0009&&pulses.length<26)pulses.push({a,b,t:0,c:Math.random()<.5?gold:teal})}}
    ctx.globalAlpha=1;
    for(const n of nodes){ctx.fillStyle=line;ctx.beginPath();ctx.arc(n.x,n.y,1.6,0,7);ctx.fill()}
    pulses=pulses.filter(p=>p.t<=1);
    for(const p of pulses){p.t+=.018;const x=p.a.x+(p.b.x-p.a.x)*p.t,y=p.a.y+(p.b.y-p.a.y)*p.t;ctx.fillStyle=p.c;ctx.shadowColor=p.c;ctx.shadowBlur=10;ctx.beginPath();ctx.arc(x,y,2.4,0,7);ctx.fill();ctx.shadowBlur=0}
    if(!reduce&&document.body.contains(cv))heroRAF=requestAnimationFrame(frame);
  }
  frame();
  window.addEventListener("resize",()=>{if(document.body.contains(cv))size()},{passive:true});
}

/* ---------- brain map (lateral view, stylised) ---------- */
function brainSVG(regions){
  const R=regions.map(r=>`<g class="region" data-id="${r.id}" tabindex="0" role="button" aria-label="${esc(r.name)}">
    <circle class="halo" cx="${r.x}" cy="${r.y}" r="13" fill="var(${r.color})"/>
    <circle class="core" cx="${r.x}" cy="${r.y}" r="8" fill="var(${r.color})" stroke="var(--bg)" stroke-width="2"/>
    <text x="${r.x+(r.lx||14)}" y="${r.y+(r.ly||4)}" ${r.anchor?`text-anchor="${r.anchor}"`:""}>${r.short}</text></g>`).join("");
  return `<svg viewBox="0 0 560 420" role="img" aria-label="Interactive brain map">
  <defs><radialGradient id="bg1" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="var(--violet)" stop-opacity=".22"/><stop offset="1" stop-color="var(--violet)" stop-opacity=".04"/></radialGradient></defs>
  <path d="M120 230 C 92 170 120 92 200 70 C 250 40 330 40 380 66 C 448 92 492 150 478 216 C 470 252 446 268 418 276 C 404 300 372 312 340 304 L 300 298 C 280 318 248 322 226 306 C 186 312 150 290 132 262 C 124 252 121 242 120 230 Z" fill="url(#bg1)" stroke="var(--violet)" stroke-opacity=".55" stroke-width="2"/>
  <path d="M200 92 C 230 120 214 150 246 168 M300 58 C 290 96 318 118 300 150 C 290 172 312 190 302 214 M380 78 C 360 110 392 140 372 176 M150 160 C 186 168 200 196 236 200 M430 140 C 404 160 420 196 392 214 M252 236 C 290 228 330 246 372 236" fill="none" stroke="var(--violet)" stroke-opacity=".28" stroke-width="2" stroke-linecap="round"/>
  <path d="M352 300 C 380 296 420 290 432 312 C 444 336 414 352 384 350 C 356 348 340 330 352 300 Z" fill="var(--violet)" fill-opacity=".10" stroke="var(--violet)" stroke-opacity=".45" stroke-width="1.6"/>
  <path d="M300 298 C 304 330 300 360 296 404 L 322 404 C 324 364 330 330 340 304" fill="var(--living)" fill-opacity=".10" stroke="var(--living)" stroke-opacity=".5" stroke-width="1.6"/>
  <path d="M308 404 C 310 412 316 416 322 418" fill="none" stroke="var(--living)" stroke-opacity=".5"/>
  <text x="20" y="404" fill="var(--muted)" font-size="11" font-family="var(--f-mono)">← FRONT (forehead)</text>
  <text x="540" y="404" text-anchor="end" fill="var(--muted)" font-size="11" font-family="var(--f-mono)">BACK →</text>
  ${R}
  </svg>`;
}

/* ---------- mind loop (animated circular flowchart) ---------- */
function loopSVG(nodes,mode){
  const cx=280,cy=210,rad=150,n=nodes.length;
  const pos=nodes.map((_,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return[cx+rad*Math.cos(a)*1.25,cy+rad*Math.sin(a)]});
  const col=mode==="truth"?"--living":"--stress";
  const arcs=pos.map((p,i)=>{const q=pos[(i+1)%n];const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;const dx=mx-cx,dy=my-cy;const k=1.13;return`<path class="flow-dash" d="M${p[0]} ${p[1]} Q ${cx+dx*k*1.15} ${cy+dy*k*1.15} ${q[0]} ${q[1]}" fill="none" stroke="var(${col})" stroke-opacity=".7" stroke-width="2"/>`}).join("");
  const nd=nodes.map((nn,i)=>{const[x,y]=pos[i];return`<g class="loop-node" data-i="${i}" tabindex="0" role="button" aria-label="${esc(nn.k)}"><rect x="${x-62}" y="${y-22}" width="124" height="44" rx="22" fill="var(--bg2)" stroke="var(${i===0?"--glory":col})" stroke-width="1.6"/><text x="${x}" y="${y-2}" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--fg)">${nn.k}</text><text x="${x}" y="${y+13}" text-anchor="middle" font-size="10" fill="var(--muted)">${esc(nn[mode].s)}</text></g>`}).join("");
  return `<svg viewBox="0 0 560 420" role="img" aria-label="The mind loop">${arcs}
  <circle cx="${cx}" cy="${cy}" r="64" fill="var(${mode==="truth"?"--living-soft":"--stress-soft"})"/>
  <text x="${cx}" y="${cy-8}" text-anchor="middle" font-family="var(--f-display)" font-size="20" fill="var(--fg)">${mode==="truth"?"Truth loop":"Lie loop"}</text>
  <text x="${cx}" y="${cy+14}" text-anchor="middle" font-size="11" fill="var(--muted)">${mode==="truth"?"renewal · Rom 12:2":"stronghold · 2 Cor 10:4-5"}</text>
  <circle r="6" fill="var(--glory)"><animateMotion dur="9s" repeatCount="indefinite" path="M${pos.map(p=>p.join(" ")).join(" L ")} Z"/></circle>
  ${nd}</svg>`;
}

/* ---------- router + learning engine ---------- */
let current="home";
const GROUP_C={"Begin":"--glory","The mind":"--violet","Mind & body":"--living","Fruit & roots":"--stress","Faith":"--glory","Pain & suffering":"--stress","Genetics":"--living","The blood of Christ":"--stress","DNA & blood":"--violet","Self-healing":"--living","Practice":"--glory"};
const meta=()=>window.ROOMS_META;
const num=id=>String(meta().findIndex(r=>r.id===id)).padStart(2,"0");
const done=()=>store.get("done",[]);
function setDone(id,v){let d=done().filter(x=>x!==id);if(v)d.push(id);store.set("done",d);nav();updProgress()}
function updProgress(){const total=meta().length-1,n=done().filter(id=>id!=="home").length;const el=$("#railProg");if(el)el.innerHTML=`<div class="row" style="justify-content:space-between;font-size:.78rem;color:var(--muted)"><span>Your progress</span><span class="mono">${n}/${total}</span></div><div class="bar"><i style="width:${n/total*100}%"></i></div>`}
function navHTML(){let g="";const d=done();
  return meta().map(r=>{let h="";if(r.grp!==g){g=r.grp;h=`<div class="grp"><i style="background:var(${GROUP_C[g]||"--glory"})"></i>${g}</div>`}
   return h+`<a href="#${r.id}" data-id="${r.id}" ${r.id===current?'aria-current="page"':""}><span class="n">${d.includes(r.id)?'<svg width="14" height="14" viewBox="0 0 14 14" aria-label="completed"><circle cx="7" cy="7" r="7" fill="var(--living)"/><path d="M4 7.2l2 2 4-4.4" stroke="var(--bg)" stroke-width="1.8" fill="none"/></svg>':num(r.id)}</span><span>${r.label}</span></a>`}).join("")}
function nav(){$("#nav").innerHTML=navHTML();const m=meta().find(r=>r.id===current);const t=$("#mTitle");if(t&&m)t.textContent=m.label}
/* search index */
let INDEX=null;
function buildIndex(){if(INDEX)return INDEX;INDEX=[];const tmp=document.createElement("div");
  for(const m of meta()){try{tmp.innerHTML=window.ROOMS[m.id].html();}catch(e){continue}
   const L=(window.DATA.learn||{})[m.id]||{};
   INDEX.push({id:m.id,label:m.label,grp:m.grp,sec:-1,h:m.label,text:((tmp.querySelector("h1")||{}).textContent||"")+" "+(L.t||[]).join(" ")});
   $$(".sec",tmp).forEach((s,i)=>{const h=s.querySelector("h2");INDEX.push({id:m.id,label:m.label,grp:m.grp,sec:i,h:h?h.textContent:"",text:s.textContent.replace(/\s+/g," ")})})}
  tmp.innerHTML="";return INDEX}
function openSearch(){$("#palette").hidden=false;const inp=$("#palQ");inp.value="";palResults("");setTimeout(()=>inp.focus(),30)}
function closeSearch(){$("#palette").hidden=true}
function palResults(q){const box=$("#palRes");q=q.trim().toLowerCase();
  if(!q){box.innerHTML=`<p class="muted" style="padding:10px 4px;font-size:.9rem">Try: <i>amygdala</i>, <i>sarx</i>, <i>panic</i>, <i>forgiveness</i>, <i>childbirth</i>, <i>telomere</i>, <i>soul</i>…</p>`+meta().slice(1).map(m=>`<button type="button" class="palItem" data-id="${m.id}" data-sec="-1"><b>${m.label}</b><span>${m.grp}</span></button>`).join("");bindPal();return}
  const terms=q.split(/\s+/);const res=buildIndex().map(e=>{const hay=(e.h+" "+e.label+" "+e.text).toLowerCase();let sc=0;for(const t of terms){if(!hay.includes(t))return null;if(e.h.toLowerCase().includes(t))sc+=5;if(e.label.toLowerCase().includes(t))sc+=3;sc+=1}return{e,sc}}).filter(Boolean).sort((a,b)=>b.sc-a.sc).slice(0,14);
  box.innerHTML=res.length?res.map(({e})=>{const k=e.text.toLowerCase().indexOf(terms[0]);const snip=k<0?"":e.text.slice(Math.max(0,k-50),k+90).trim();return`<button type="button" class="palItem" data-id="${e.id}" data-sec="${e.sec}"><b>${esc(e.sec<0?e.label:e.h)}</b><span>${esc(e.sec<0?e.grp:e.label)}${snip?" · …"+esc(snip)+"…":""}</span></button>`}).join(""):`<p class="muted" style="padding:10px 4px">No matches for “${esc(q)}”. Try a simpler word.</p>`;bindPal()}
function bindPal(){$$("#palRes .palItem").forEach(b=>b.onclick=()=>{closeSearch();closeDrawer();const id=b.dataset.id,sec=+b.dataset.sec;if(id!==current)location.hash=id;else render();if(sec>=0)setTimeout(()=>{const el=$("#sec-"+sec);if(el)el.scrollIntoView({behavior:reduce?"auto":"smooth"})},150)})}
document.addEventListener("keydown",e=>{if((e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName))||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k")){e.preventDefault();openSearch()}if(e.key==="Escape")closeSearch()});
/* reading progress */
window.addEventListener("scroll",()=>{const h=document.documentElement;const p=h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight);const b=$("#readBar");if(b)b.style.transform=`scaleX(${p})`},{passive:true});
function learnBar(){const L=(window.DATA.learn||{})[current];const m=meta().find(r=>r.id===current);const secs=$$("#main .sec");
  secs.forEach((s,i)=>s.id="sec-"+i);
  const words=(($("#main .room")||{}).textContent||"").split(/\s+/).length;const mins=Math.max(2,Math.round(words/200));
  const head=$("#main .room-head");if(!head)return;
  const eb=$(".eyebrow",head);if(eb)eb.textContent=`Room ${num(current)} · ${m.grp}`;
  const isDone=done().includes(current);
  const box=document.createElement("div");box.className="learn";
  box.innerHTML=`${L&&L.t?`<div class="learn-take"><span class="mono" style="color:var(--glory)">Key takeaways</span><ol>${L.t.map(t=>`<li>${t}</li>`).join("")}</ol></div>`:""}
   <div class="learn-meta"><span class="chip">${mins} min read</span>${secs.length?`<span class="chip">${secs.length} sections</span>`:""}${L&&L.v?`<span class="chip"><span class="ref">${L.v}</span></span>`:""}
   <button type="button" class="btn ${isDone?"teal":""}" id="doneBtn">${isDone?"Completed ✓":"Mark as complete"}</button></div>
   ${secs.length>1?`<nav class="toc" aria-label="Sections in this room"><span class="mono muted">Jump to</span>${secs.map((s,i)=>`<a href="#${current}" data-sec="${i}">${esc((s.querySelector("h2")||{}).textContent||"Section "+(i+1))}</a>`).join("")}</nav>`:""}`;
  head.after(box);
  $("#doneBtn").onclick=()=>{const v=!done().includes(current);setDone(current,v);toast(v?"Marked complete":"Marked not complete");const b=$("#doneBtn");b.textContent=v?"Completed ✓":"Mark as complete";b.classList.toggle("teal",v)};
  $$(".toc a",box).forEach(a=>a.onclick=e=>{e.preventDefault();$("#sec-"+a.dataset.sec).scrollIntoView({behavior:reduce?"auto":"smooth"})});
}
function render(){
  const id=(location.hash||"#home").slice(1);
  const R=window.ROOMS;current=R[id]?id:"home";
  nav();
  const main=$("#main");
  main.innerHTML=`<div class="room" id="room-${current}">${R[current].html()}${pager()}</div>`;
  if(current!=="home")learnBar();
  if(window.MC_QUIZ&&current!=="home")window.MC_QUIZ(current);
  if(R[current].mount)R[current].mount(main);
  const a=$(`#nav a[data-id="${current}"]`);if(a&&a.scrollIntoView&&innerWidth>=900)a.scrollIntoView({block:"nearest"});
  if(current!=="home")store.set("last",current);
  updProgress();
}
function rerender(){render()}
function pager(){
  const m=meta(),i=m.findIndex(r=>r.id===current),p=m[i-1],n=m[i+1];
  return `<nav class="pager" aria-label="Next room">
  ${p?`<a class="pg" href="#${p.id}"><span class="mono muted">← Previous · ${num(p.id)}</span><b>${p.label}</b></a>`:"<span></span>"}${n?`<a class="pg next" href="#${n.id}"><span class="mono">Next · ${num(n.id)} →</span><b>${n.label}</b></a>`:""}</nav>`;
}
window.addEventListener("hashchange",()=>{render();window.scrollTo({top:0,behavior:"auto"});$("#main").focus({preventScroll:true})});
$("#searchBtn").addEventListener("click",openSearch);
$("#menuBtn").addEventListener("click",()=>openDrawer(`<h3>All rooms</h3><div class="row"><button type="button" class="btn" id="mSearch">Search everything</button><button type="button" class="btn" id="mTheme">Switch theme</button></div><nav class="nav mnav">${navHTML()}</nav>`,b=>{$$("a",b).forEach(a=>a.addEventListener("click",closeDrawer));$("#mSearch").onclick=()=>{closeDrawer();openSearch()};$("#mTheme").onclick=()=>{closeDrawer();$("#themeBtn").click()}}));
$("#palette").addEventListener("click",e=>{if(e.target.id==="palette")closeSearch()});
$("#palQ").addEventListener("input",e=>palResults(e.target.value));
$("#palQ").addEventListener("keydown",e=>{if(e.key==="Enter"){const f=$("#palRes .palItem");if(f)f.click()}});

window.MC={$,$$,esc,store,toast,openDrawer,closeDrawer,W,neuralCanvas,brainSVG,loopSVG,css,reduce,rerender,done,setDone,num,GROUP_C,openSearch};
window.MC_BOOT=()=>{nav();render()};
})();
