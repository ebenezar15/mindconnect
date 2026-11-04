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

/* ---------- router ---------- */
let current="home";
function nav(){
  const rooms=window.ROOMS_META;let g="";
  $("#nav").innerHTML=rooms.map(r=>{let h="";if(r.grp!==g){g=r.grp;h=`<div class="grp">${g}</div>`}return h+`<a href="#${r.id}" data-id="${r.id}"><span class="n">${r.n}</span><span>${r.label}</span></a>`}).join("");
}
function render(){
  const id=(location.hash||"#home").slice(1);
  const R=window.ROOMS;current=R[id]?id:"home";
  $$("#nav a").forEach(a=>{if(a.dataset.id===current)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  const main=$("#main");
  main.innerHTML=`<div class="room" id="room-${current}">${R[current].html()}${pager()}</div>`;
  if(R[current].mount)R[current].mount(main);
  const a=$(`#nav a[data-id="${current}"]`);if(a&&a.scrollIntoView&&innerWidth<900)a.scrollIntoView({inline:"center",block:"nearest"});
  store.set("last",current);
}
function rerender(){render()}
function pager(){
  const m=window.ROOMS_META,i=m.findIndex(r=>r.id===current),p=m[i-1],n=m[i+1];
  return `<nav class="row" style="justify-content:space-between;border-top:1px solid var(--line);padding-top:22px" aria-label="Next room">
  ${p?`<a class="btn" href="#${p.id}">← ${p.label}</a>`:"<span></span>"}${n?`<a class="btn primary" href="#${n.id}">${n.label} →</a>`:""}</nav>`;
}
window.addEventListener("hashchange",()=>{render();window.scrollTo({top:0,behavior:reduce?"auto":"smooth"});$("#main").focus({preventScroll:true})});

window.MC={$,$$,esc,store,toast,openDrawer,closeDrawer,W,neuralCanvas,brainSVG,loopSVG,css,reduce,rerender};
window.addEventListener("DOMContentLoaded",()=>{});
window.MC_BOOT=()=>{nav();render()};
})();
