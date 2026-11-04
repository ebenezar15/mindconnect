/* MindConnect — rooms part 4: DNA & blood group (dna, inchrist, blood) */
(function(){
const {$,$$,esc,store,toast,openDrawer,W,ext,reduce,css}=window.MC;
const R=window.ROOMS;

/* ---------- rotating helix canvas ---------- */
let helixRAF=null;
function helixCanvas(cv,opts={}){
  cancelAnimationFrame(helixRAF);
  const ctx=cv.getContext("2d"),dpr=Math.min(2,devicePixelRatio||1);let w,h;
  const size=()=>{const r=cv.getBoundingClientRect();w=r.width;h=r.height;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};size();
  const C={A:css("--glory"),T:css("--living"),G:css("--violet"),C:css("--stress"),line:css("--muted")};
  const seq="ATGCGTACCTGAGGATCCATGCAATTGCGCTAGGCTA";
  const t0=performance.now();
  const frame=now=>{if(!document.body.contains(cv))return;const t=(now-t0)/1000;ctx.clearRect(0,0,w,h);
    const n=Math.floor(w/16),amp=h*.32,cy=h/2;const marks=opts.marks?opts.marks():0;
    for(let i=0;i<n;i++){const x=10+i*(w-20)/(n-1),ph=i*.42+t*1.2,s=Math.sin(ph),c=Math.cos(ph);
      const y1=cy+amp*s,y2=cy-amp*s,b=seq[i%seq.length],pair={A:"T",T:"A",G:"C",C:"G"}[b];
      ctx.globalAlpha=.35+.65*(c>0?1:.4);ctx.lineWidth=3;
      ctx.strokeStyle=C[b];ctx.beginPath();ctx.moveTo(x,y1);ctx.lineTo(x,cy);ctx.stroke();
      ctx.strokeStyle=C[pair];ctx.beginPath();ctx.moveTo(x,cy);ctx.lineTo(x,y2);ctx.stroke();
      ctx.globalAlpha=1;ctx.fillStyle=C.line;ctx.beginPath();ctx.arc(x,y1,c>0?3.4:2.2,0,7);ctx.fill();ctx.beginPath();ctx.arc(x,y2,c<0?3.4:2.2,0,7);ctx.fill();
      if(marks&&(i*13%29)/29<marks){ctx.fillStyle=css("--glory");ctx.globalAlpha=.9;ctx.beginPath();ctx.arc(x,y1-9,3.2,0,7);ctx.fill();ctx.globalAlpha=1}}
    if(!reduce)helixRAF=requestAnimationFrame(frame)};
  helixRAF=requestAnimationFrame(frame);
}

/* ======================= DNA ======================= */
const STAGES=[
 {k:"Meiosis",t:"Shuffling the deck",d:"Before a child is conceived, each parent's egg or sperm is made through meiosis. Matching chromosomes from your grandparents swap segments ('crossing over'), so every egg and sperm carries a brand-new combination. That's why no two siblings (except identical twins) are the same.",
  svg:`<g><rect x="60" y="40" width="22" height="140" rx="11" fill="var(--stress)" opacity=".7"/><rect x="110" y="40" width="22" height="140" rx="11" fill="var(--living)" opacity=".7"/>
   <rect x="60" y="80" width="22" height="40" rx="6" fill="var(--living)"><animate attributeName="x" values="60;60;110;110;60" keyTimes="0;.3;.5;.8;1" dur="5s" repeatCount="indefinite"/></rect>
   <rect x="110" y="80" width="22" height="40" rx="6" fill="var(--stress)"><animate attributeName="x" values="110;110;60;60;110" keyTimes="0;.3;.5;.8;1" dur="5s" repeatCount="indefinite"/></rect>
   <text x="96" y="205" text-anchor="middle" font-size="11" fill="var(--muted)">grandma's + grandpa's</text>
   <path d="M170 110 L230 110" stroke="var(--muted)" stroke-width="2" class="flow-dash"/>
   <rect x="250" y="40" width="22" height="140" rx="11" fill="var(--stress)" opacity=".7"/><rect x="250" y="80" width="22" height="40" rx="6" fill="var(--living)"/>
   <text x="261" y="205" text-anchor="middle" font-size="11" fill="var(--muted)">a unique new mix</text></g>`},
 {k:"Fertilisation",t:"Two become one",d:"23 chromosomes from the mother's egg and 23 from the father's sperm unite into one cell, the zygote, with 46. Mitochondrial DNA (the cell's power plants) comes almost entirely from the mother. In that moment a new, never-repeated genome exists.",
  svg:`<g><circle cx="230" cy="110" r="60" fill="var(--glory-soft)" stroke="var(--glory)" stroke-width="2"/><text x="230" y="114" text-anchor="middle" font-size="11" fill="var(--fg)">egg · 23</text>
   <g><animateTransform attributeName="transform" type="translate" values="-150 0;-40 0;-40 0" keyTimes="0;.6;1" dur="4s" repeatCount="indefinite"/><circle cx="210" cy="110" r="9" fill="var(--living)"/><path d="M201 110 q-14 -8 -28 0 t-28 0" fill="none" stroke="var(--living)" stroke-width="2"/></g>
   <text x="230" y="200" text-anchor="middle" font-size="11" fill="var(--muted)">23 + 23 = 46 chromosomes</text></g>`},
 {k:"Reprogramming",t:"Wiping the slate (mostly)",d:"In the early embryo most epigenetic marks from the parents are erased in a great 'reset' wave, then new marks are written. A few marks (imprinted genes, and possibly some others) escape erasure. This is God's built-in mercy: each generation gets a largely fresh start, though not a perfectly blank one.",
  svg:`<g><rect x="40" y="95" width="360" height="30" rx="15" fill="var(--violet-soft)" stroke="var(--violet)"/>
   ${Array.from({length:16},(_,i)=>`<circle cx="${60+i*22}" cy="85" r="5" fill="var(--glory)"><animate attributeName="opacity" values="1;1;0;0;${i%5===0?1:0}" keyTimes="0;.3;.5;.8;1" dur="5s" repeatCount="indefinite"/></circle>`).join("")}
   <rect x="40" y="70" width="30" height="70" fill="var(--living)" opacity=".18"><animate attributeName="x" values="40;380;380" keyTimes="0;.5;1" dur="5s" repeatCount="indefinite"/></rect>
   <text x="220" y="175" text-anchor="middle" font-size="11" fill="var(--muted)">gold dots = epigenetic marks · teal = reset wave · a few escape</text></g>`},
 {k:"Cell division",t:"One cell, then trillions",d:"The zygote copies its entire 3.2-billion-letter genome before every division: 1 → 2 → 4 → 8 → … about 37 trillion cells in an adult. Proofreading enzymes keep copying errors to roughly one in a billion letters.",
  svg:`<g>${[[1,220,110,40],[2,0,0,0]].length?"":""}
   <circle cx="220" cy="110" r="44" fill="var(--living-soft)" stroke="var(--living)"><animate attributeName="r" values="44;30;30" keyTimes="0;.3;1" dur="4s" repeatCount="indefinite"/><animate attributeName="cx" values="220;180;180" keyTimes="0;.3;1" dur="4s" repeatCount="indefinite"/></circle>
   <circle cx="220" cy="110" r="44" fill="var(--living-soft)" stroke="var(--living)"><animate attributeName="r" values="44;30;30" keyTimes="0;.3;1" dur="4s" repeatCount="indefinite"/><animate attributeName="cx" values="220;260;260" keyTimes="0;.3;1" dur="4s" repeatCount="indefinite"/></circle>
   ${[[150,70],[210,70],[150,150],[210,150],[230,70],[290,70],[230,150],[290,150]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="20" fill="var(--living-soft)" stroke="var(--living)" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.55;.7;1" dur="4s" repeatCount="indefinite"/></circle>`).join("")}
   <text x="220" y="205" text-anchor="middle" font-size="11" fill="var(--muted)">same complete script copied into every cell</text></g>`},
 {k:"Differentiation",t:"Same script, different readings",d:"Every cell carries the same DNA, yet a neuron, a heart cell and a blood cell are completely different. The difference is which genes are switched on or off. Like the body of Christ: one Spirit, many members (1 Cor 12:12).",
  svg:`<g><rect x="190" y="20" width="60" height="40" rx="10" fill="var(--violet-soft)" stroke="var(--violet)"/><text x="220" y="45" text-anchor="middle" font-size="11" fill="var(--fg)">one DNA</text>
   ${[["neuron",80,"--violet"],["heart cell",220,"--stress"],["blood cell",360,"--living"]].map(([t,x,c])=>`<path d="M220 60 L${x} 130" stroke="var(${c})" stroke-width="2" class="flow-dash"/><circle cx="${x}" cy="150" r="24" fill="var(${c})" fill-opacity=".18" stroke="var(${c})"><animate attributeName="r" values="18;26;18" dur="3s" repeatCount="indefinite"/></circle><text x="${x}" y="196" text-anchor="middle" font-size="11" fill="var(--fg)">${t}</text>`).join("")}</g>`},
 {k:"A lifetime",t:"Life writes in the margins",d:"Your DNA sequence stays almost the same for life, but experiences keep adding notes to it: epigenetic marks from food, sleep, stress, trauma, exercise, love and prayer. Small copying errors accumulate in some cells, and telomeres shorten. The text is fixed; the highlighting keeps changing.",
  svg:`<g><rect x="40" y="95" width="360" height="30" rx="15" fill="var(--violet-soft)" stroke="var(--violet)"/>
   ${Array.from({length:14},(_,i)=>`<circle cx="${55+i*25}" cy="${i%2?140:80}" r="5" fill="var(${i%3?"--glory":"--stress"})" opacity="0"><animate attributeName="opacity" values="0;1" begin="${i*.3}s" dur=".4s" fill="freeze"/></circle>`).join("")}
   <text x="220" y="185" text-anchor="middle" font-size="11" fill="var(--muted)">marks written by experience across a lifetime</text></g>`},
 {k:"Passing on",t:"What the next generation receives",d:"Children receive a new shuffle of the sequence, a largely reset epigenome, and also the environment and relationships parents create, which then write new marks. Most 'inheritance' of patterns happens through how we live with our children, not only through cells.",
  svg:`<g><circle cx="110" cy="100" r="34" fill="var(--glory-soft)" stroke="var(--glory)"/><text x="110" y="104" text-anchor="middle" font-size="11" fill="var(--fg)">parent</text>
   <circle cx="330" cy="100" r="28" fill="var(--living-soft)" stroke="var(--living)"/><text x="330" y="104" text-anchor="middle" font-size="11" fill="var(--fg)">child</text>
   <path d="M146 90 C 200 50, 250 50, 300 90" stroke="var(--violet)" stroke-width="2" fill="none" class="flow-dash"/><text x="222" y="52" text-anchor="middle" font-size="10" fill="var(--violet)">genes (new shuffle)</text>
   <path d="M146 112 C 200 160, 250 160, 300 112" stroke="var(--living)" stroke-width="2" fill="none" class="flow-dash"/><text x="222" y="170" text-anchor="middle" font-size="10" fill="var(--living)">love, words, habits, environment</text></g>`}
];
const LAYERS_DNA=[
 {k:"The sequence",tag:"fixed at conception",c:"--violet",d:"About 3.2 billion letters (A, T, G, C) in each set, around 20,000 protein-coding genes, about 2 metres of DNA folded into every cell nucleus. Humans share about 99.9% of their sequence with each other (Acts 17:26)."},
 {k:"New variants",tag:"yours alone",c:"--violet",d:"Each person is born with roughly 50–100 brand-new spelling changes their parents didn't have, plus the unique shuffle from meiosis."},
 {k:"Epigenetic marks",tag:"written by life",c:"--glory",d:"Chemical tags (DNA methylation, histone changes) and small RNAs that switch genes on and off. Diet, sleep, stress, trauma, exercise, relationships and contemplative practice all change them. Many are reversible."},
 {k:"Telomere length",tag:"wear & tear",c:"--stress",d:"Protective caps on chromosome ends that shorten with age and faster with chronic stress; an enzyme (telomerase) can rebuild them."},
 {k:"Immune memory",tag:"DNA rewritten on purpose",c:"--living",d:"Your B and T immune cells literally cut and rejoin their own DNA (V(D)J recombination) to create receptors for invaders. The memory of every infection you've beaten is written into those cells' DNA."},
 {k:"Acquired mutations",tag:"in some cells",c:"--stress",d:"Sun, smoke, toxins and copying errors cause changes in individual cells. Repair systems fix most; some contribute to ageing and cancer."},
 {k:"Other people's DNA",tag:"microchimerism",c:"--living",d:"Mothers carry cells and DNA from their babies, sometimes for decades after pregnancy, and children carry some of their mother's cells. Love literally leaves part of one person in another."},
 {k:"Not registered",tag:"important",c:"--muted",d:"Your DNA does not store your memories, beliefs, sins or choices as content. Memories live in synaptic networks in the brain. Experience changes how genes are read, not what they say."}
];
const GENES_MIND=[
 {k:"Maternal care rewrites stress genes",d:"Rat pups licked and groomed by attentive mothers had about 90% less methylation on a stress-receptor gene in the hippocampus, and grew into calmer adults. Remarkably, the marks could be reversed in adulthood with drugs or diet (Weaver et al., Nature Neuroscience, 2004).",tag:"strong animal evidence",c:"l"},
 {k:"Loneliness switches on inflammation",d:"Chronically lonely people show more activity in inflammatory genes and less in antiviral genes (Steve Cole's social genomics, the 'CTRA' pattern).",tag:"replicated in humans",c:"l"},
 {k:"One day of contemplation changes gene expression",d:"After 8 hours of mindfulness practice, experienced meditators showed lower activity in inflammation-related genes (RIPK2, COX2) and certain HDAC enzymes, linked to faster cortisol recovery (Kaliman et al., 2014).",tag:"small study",c:"g"},
 {k:"Stress shortens telomeres",d:"Mothers with the highest perceived stress had telomeres shorter by the equivalent of about a decade of ageing (Epel et al., PNAS, 2004).",tag:"small, cross-sectional",c:"g"},
 {k:"Trauma across generations?",d:"Holocaust survivors and their adult children showed altered methylation at a stress gene (FKBP5), in opposite directions (Yehuda et al., 2016). Fascinating, but the sample was small and it's unclear whether effects came through cells or through upbringing.",tag:"debated",c:"s"}
];
R.dna={html:()=>`
${W.head("DNA & blood · The living script","How DNA is formed, what's written in it, and how your mind talks to it","'Your eyes saw my unformed substance; in your book were written, every one of them, the days that were formed for me' (Ps 139:16). DNA is not a cage of fate. It is a living script, designed to listen.")}
<section class="hero"><canvas id="helixCv" style="height:220px;position:relative" aria-hidden="true"></canvas>
 <div class="row" style="position:relative;justify-content:space-between;padding:0 20px 18px;gap:14px">
  <div class="row" style="gap:14px;font-size:.82rem;color:var(--muted)"><span><b style="color:var(--glory)">■</b> A</span><span><b style="color:var(--living)">■</b> T</span><span><b style="color:var(--violet)">■</b> G</span><span><b style="color:var(--stress)">■</b> C</span><span><b style="color:var(--glory)">●</b> epigenetic marks</span></div>
  <div style="min-width:220px;flex:1;max-width:360px"><label class="lbl" for="markSl"><span>Life experiences written on the helix</span><span id="markV" class="mono">20%</span></label><input id="markSl" type="range" min="0" max="100" value="20"></div>
 </div>
</section>
${W.sec("How DNA is formed: seven stages","From grandparents' chromosomes to the next generation. Tap a stage; each one animates.",`
<div class="panel"><div class="pills" id="stagePills">${STAGES.map((s,i)=>`<button type="button" class="pill" data-i="${i}" aria-pressed="${i===0}"><span class="mono" style="opacity:.6">${i+1}</span> ${s.k}</button>`).join("")}</div>
<div class="split" style="margin-top:16px"><div class="diagram"><svg id="stageSvg" viewBox="0 0 440 220" role="img" aria-label="Stage animation"></svg></div><div id="stageOut" style="display:flex;flex-direction:column;gap:10px"></div></div>
<div class="row" style="margin-top:10px"><button class="btn" type="button" id="stPrev">← Previous</button><button class="btn primary" type="button" id="stNext">Next stage →</button></div></div>`)}
${W.sec("What's written into your DNA, and what isn't","Think of a book: the text, the new spellings, the highlighting, the worn edges, the margin notes. Tap a layer.",`
<div class="split"><div class="panel"><div class="diagram"><svg id="bookSvg" viewBox="0 0 420 380" style="min-width:280px" role="img" aria-label="Layers registered in DNA">
 ${LAYERS_DNA.map((l,i)=>`<g class="dl" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><rect x="${20+i*6}" y="${20+i*44}" width="${380-i*12}" height="36" rx="10" fill="var(${l.c})" fill-opacity="${l.c==="--muted"?.08:.16}" stroke="var(${l.c})" ${l.c==="--muted"?'stroke-dasharray="5 5"':""}/><text x="${36+i*6}" y="${43+i*44}" font-size="12.5" font-weight="700" fill="var(--fg)">${l.k}</text><text x="${388-i*6}" y="${43+i*44}" text-anchor="end" font-size="10.5" fill="var(--muted)">${l.tag}</text></g>`).join("")}
</svg></div></div><div class="panel" id="dlOut" style="display:flex;flex-direction:column;gap:12px"></div></div>`)}
${W.sec("How DNA's message is transported","DNA itself stays home in the nucleus. It sends copies out. Watch the message move.",`
<div class="panel"><div class="diagram"><svg viewBox="0 0 720 220" role="img" aria-label="DNA to RNA to protein">
 <ellipse cx="150" cy="110" rx="130" ry="88" fill="var(--violet-soft)" stroke="var(--violet)" stroke-dasharray="6 6"/><text x="150" y="38" text-anchor="middle" font-size="11" fill="var(--violet)">nucleus</text>
 <path d="M60 100 q15 -16 30 0 t30 0 t30 0 t30 0 t30 0" fill="none" stroke="var(--violet)" stroke-width="3"/><path d="M60 120 q15 16 30 0 t30 0 t30 0 t30 0 t30 0" fill="none" stroke="var(--violet)" stroke-width="3"/>
 <text x="150" y="160" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg)">1 · DNA gene is read</text>
 <g><animateTransform attributeName="transform" type="translate" values="0 0;300 0;300 0" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/><path d="M110 70 q10 -8 20 0 t20 0 t20 0" fill="none" stroke="var(--glory)" stroke-width="3"/><text x="140" y="58" text-anchor="middle" font-size="10" fill="var(--glory)">mRNA copy</text></g>
 <text x="360" y="160" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg)">2 · messenger leaves</text>
 <ellipse cx="500" cy="80" rx="30" ry="22" fill="var(--living-soft)" stroke="var(--living)"/><text x="500" y="84" text-anchor="middle" font-size="10" fill="var(--fg)">ribosome</text>
 <text x="500" y="160" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg)">3 · protein is built</text>
 ${Array.from({length:6},(_,i)=>`<circle cx="${535+i*16}" cy="${100+Math.sin(i)*10}" r="6" fill="var(--living)" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(.55+i*.06).toFixed(2)};${(.6+i*.06).toFixed(2)};1" dur="5s" repeatCount="indefinite"/></circle>`).join("")}
 <text x="640" y="160" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg)">4 · body is built & run</text>
 <text x="360" y="192" text-anchor="middle" font-size="11" fill="var(--muted)">Across generations DNA travels in egg and sperm. Across the body, fragments travel in the blood (cell-free DNA).</text>
 <text x="360" y="210" text-anchor="middle" font-size="11" fill="var(--muted)">Between mother and baby, cells cross the placenta both ways.</text>
</svg></div></div>`)}
${W.sec("The mind–DNA connection","A thought cannot rewrite your genetic letters, but it can change which genes are read. Here's the pathway, then the evidence.",`
<div class="panel split" style="box-shadow:none">
 <div class="diagram"><svg id="keySvg" viewBox="0 0 460 230" role="img" aria-label="Cortisol key switching genes">
  <rect x="10" y="30" width="130" height="38" rx="19" fill="var(--bg)" stroke="var(--glory)"/><text x="75" y="53" text-anchor="middle" font-size="11.5" fill="var(--fg)">belief / thought</text>
  <path d="M75 68 L75 110" stroke="var(--muted)" stroke-width="2" class="flow-dash"/>
  <rect x="10" y="110" width="130" height="38" rx="19" fill="var(--bg)" stroke="var(--stress)"/><text x="75" y="133" text-anchor="middle" font-size="11" fill="var(--fg)">hypothalamus → adrenals</text>
  <text x="75" y="175" text-anchor="middle" font-size="10" fill="var(--muted)">cortisol enters the blood</text>
  <circle cx="345" cy="115" r="105" fill="var(--violet-soft)" stroke="var(--violet)"/><text x="345" y="26" text-anchor="middle" font-size="10" fill="var(--violet)">a cell</text>
  <circle cx="355" cy="122" r="72" fill="var(--bg2)" stroke="var(--violet)" stroke-dasharray="4 4"/><text x="355" y="210" text-anchor="middle" font-size="10" fill="var(--muted)">nucleus (DNA)</text>
  <g id="keyMol"><circle r="8" fill="var(--stress)"><animateMotion dur="4s" repeatCount="indefinite" path="M140 129 C 200 129, 240 110, 290 96 L 300 92"/></circle></g>
  ${["stress genes","inflammation","growth & repair","immune defence"].map((t,i)=>`<g class="gsw" data-i="${i}"><rect x="358" y="${92+i*18}" width="50" height="12" rx="6" fill="var(--bg3)"/><text x="352" y="${102+i*18}" text-anchor="end" font-size="10" fill="var(--fg)">${t}</text></g>`).join("")}
 </svg></div>
 <div style="display:flex;flex-direction:column;gap:10px">
  <div class="seg" id="keySeg"><button type="button" data-v="stress" aria-pressed="true">Chronic fear & stress</button><button type="button" data-v="peace" aria-pressed="false">Peace & connection</button></div>
  <p id="keyTxt"></p>
  <p class="muted" style="font-size:.85rem">Stress hormones like cortisol travel in the blood, enter cells and bind receptors that act directly on DNA switches. Over time, repeated patterns leave epigenetic marks that make the change more lasting.</p>
 </div>
</div>
<div class="grid" style="margin-top:6px">${GENES_MIND.map(g=>`<div class="card"><span class="tag ${g.c}">${g.tag}</span><h4>${g.k}</h4><p>${g.d}</p></div>`).join("")}</div>`)}
${W.sec("God's design in DNA",null,`
<div class="grid">
 ${[["Written in a book","'In your book were written… the days formed for me' (Ps 139:16). DNA is the densest information store known: researchers have encoded data at about 215 petabytes per gram of DNA (Erlich & Zielinski, 2017).","Ps 139:13-16"],
   ["Built to self-repair","Dozens of repair pathways proofread and fix damage constantly. A body designed for life, not decay (see 'Designed for life').","Ps 103:5"],
   ["Built to listen","Genes respond to environment, relationship and inner state. A genome that listens is a genome designed for relationship.","Prov 4:20-22"],
   ["Unity and diversity","99.9% shared, 0.1% uniquely you. 'He made from one blood every nation' (Acts 17:26) and 'knit me together' (Ps 139:13).","Acts 17:26"],
   ["A fresh start each generation","Epigenetic reprogramming in the embryo wipes most parental marks. 'The son shall not bear the iniquity of the father' (Ezek 18:20) has a biological echo.","Ezek 18:20"],
   ["Not destiny","Genes load possibilities; lifestyle, love and choices shape which ones are expressed. 'I have set before you life and death… choose life' (Deut 30:19).","Deut 30:19"]
 ].map(([t,d,v])=>`<div class="card"><h4>${t}</h4><p>${d}</p><span class="ref">${v}</span></div>`).join("")}
</div>
<div class="row"><a class="btn primary" href="#inchrist">Next: if Adam's 'DNA' is inherited, why not Christ's? →</a></div>`)}
`,mount(){
  let marks=.2;helixCanvas($("#helixCv"),{marks:()=>marks});
  $("#markSl").addEventListener("input",e=>{marks=+e.target.value/100;$("#markV").textContent=e.target.value+"%"});
  let si=0;const show=i=>{si=(i+STAGES.length)%STAGES.length;const s=STAGES[si];$$("#stagePills .pill").forEach(p=>p.setAttribute("aria-pressed",+p.dataset.i===si));
   $("#stageSvg").innerHTML=s.svg;$("#stageOut").innerHTML=`<span class="tag v">Stage ${si+1} of ${STAGES.length}</span><h3>${s.t}</h3><p>${s.d}</p>`};
  $$("#stagePills .pill").forEach(p=>p.addEventListener("click",()=>show(+p.dataset.i)));$("#stPrev").onclick=()=>show(si-1);$("#stNext").onclick=()=>show(si+1);show(0);
  const dl=i=>{const l=LAYERS_DNA[i];$$("#bookSvg .dl rect").forEach((r,j)=>r.setAttribute("stroke-width",j===i?3:1));$("#dlOut").innerHTML=`<span class="tag" style="color:var(${l.c})">${l.tag}</span><h3>${l.k}</h3><p>${l.d}</p>`};
  $$("#bookSvg .dl").forEach(g=>{g.addEventListener("click",()=>dl(+g.dataset.i));g.addEventListener("keydown",e=>{if(e.key==="Enter")dl(+g.dataset.i)})});dl(2);
  const K={stress:{on:[1,1,0,0],mol:"--stress",t:"Cortisol floods in day after day. Stress and inflammation genes switch on; growth, repair and antiviral genes are turned down. Short-term this protects you; long-term it wears you out."},
   peace:{on:[0,0,1,1],mol:"--living",t:"With felt safety, cortisol pulses normally and calms quickly. Repair and immune-defence genes are favoured and inflammation stays quiet. 'A tranquil heart gives life to the flesh' (Prov 14:30)."}};
  const ks=v=>{const k=K[v];$$("#keySeg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===v));$("#keyMol circle").setAttribute("fill",`var(${k.mol})`);
   $$("#keySvg .gsw rect").forEach((r,i)=>r.setAttribute("fill",k.on[i]?(i<2?"var(--stress)":"var(--living)"):"var(--bg3)"));$("#keyTxt").textContent=k.t};
  $$("#keySeg button").forEach(b=>b.addEventListener("click",()=>ks(b.dataset.v)));ks("stress");
}};

/* ======================= IN ADAM, IN CHRIST ======================= */
const WHY=[
 {q:"Did we inherit Adam's sin through DNA?",a:"Scripture never says sin is genetic. Paul says death spread to all 'because all sinned' (Rom 5:12) and that we were 'in Adam' (1 Cor 15:22): a matter of headship and belonging, not chromosomes. What we inherited is a world of death and an alienated way of seeing God (Col 1:21), passed on through bodies, families, cultures and lies believed. The Eastern church has long said we inherit mortality and corruption, not Adam's guilt."},
 {q:"If Adam's inheritance came automatically, why not Christ's?",a:"In one sense it did. The relational gospel says the 'all' condemned in Adam are the same 'all' made alive in Christ (Rom 5:18; 1 Cor 15:22; 2 Cor 5:14). Christ re-headed humanity. What isn't automatic is waking up to it and living from it. Adam's death reached us through the body first and the mind second. Christ's life reaches us through the spirit first, then the mind, then the brain and habits, and the body fully at the resurrection."},
 {q:"Why does the old seem stronger?",a:"Because it had a head start. Your neural pathways, epigenetic marks and family patterns were all formed in the old story, before you knew who you are in Christ. 'Experience catches up to identity.' The new is real and incorruptible (1 Pet 1:23); the old is familiar."},
 {q:"Does my DNA change when I'm born again?",a:"Your genetic letters don't change at conversion, and nobody should claim they do. What changes is your spirit: you are joined to the Lord (1 Cor 6:17), a new creation (2 Cor 5:17), with God's 'seed' (sperma) abiding in you (1 John 3:9). Over time, renewed beliefs and a calmer nervous system really do change gene expression. That is the new creation unfolding into biology."},
 {q:"So what's my part?",a:"Not to make it true, but to agree with it. Faith is waking up to what is true (Rom 6:11, 'reckon' or count yourself dead to sin and alive to God). Then comes renewing the mind (Rom 12:2), walking by the Spirit (Gal 5:16), community, and patience with the process."}
];
const MANIFEST=[
 {k:"Spirit",p:100,c:"--glory",d:"Complete now. 'He who is joined to the Lord becomes one spirit with him' (1 Cor 6:17). Born of incorruptible seed (1 Pet 1:23). Finished."},
 {k:"Heart & identity",p:70,c:"--glory",d:"Being revealed. The Spirit testifies with our spirit that we are children of God (Rom 8:16). The heart learns to believe what the spirit already is."},
 {k:"Mind & beliefs",p:50,c:"--violet",d:"Being renewed. 'Be transformed by the renewing of your mind' (Rom 12:2). Lies replaced with truth, day by day."},
 {k:"Brain & habits",p:35,c:"--violet",d:"Being rewired. Neural pathways and epigenetic marks formed in the old story are slowly reshaped by new patterns and safe relationships."},
 {k:"Body",p:15,c:"--living",d:"Foretastes now, fullness later. Healing and renewed vitality now (Rom 8:11); the 'redemption of our bodies' at the resurrection (Rom 8:23; 1 Cor 15:49 'we shall bear the image of the man of heaven')."}
];
R.inchrist={html:()=>`
${W.head("DNA & blood · In Adam, in Christ","We are not of Adam now but of Jesus. So why doesn't it show automatically?","Two heads of humanity, two inheritances, two ways they reach us. Watch the family tree, then see why the new creation unfolds from the inside out.")}
<section class="split">
 <div class="panel"><span class="mono muted">Two heads of humanity · motion map</span>
  <div class="diagram"><svg id="heads" viewBox="0 0 460 320" style="min-width:300px" role="img" aria-label="Adam and Christ as two heads">
   <circle cx="115" cy="55" r="36" fill="var(--stress-soft)" stroke="var(--stress)" stroke-width="2"/><text x="115" y="52" text-anchor="middle" font-family="var(--f-display)" font-size="17" fill="var(--fg)">Adam</text><text x="115" y="68" text-anchor="middle" font-size="9.5" fill="var(--muted)">man of dust</text>
   <circle cx="345" cy="55" r="36" fill="var(--glory-soft)" stroke="var(--glory)" stroke-width="2"/><text x="345" y="52" text-anchor="middle" font-family="var(--f-display)" font-size="17" fill="var(--fg)">Christ</text><text x="345" y="68" text-anchor="middle" font-size="9.5" fill="var(--muted)">last Adam</text>
   ${Array.from({length:9},(_,i)=>{const x=40+i*47,y=250;return`<line x1="115" y1="91" x2="${x}" y2="${y-14}" stroke="var(--stress)" stroke-opacity=".35" class="adamLine"/><line x1="345" y1="91" x2="${x}" y2="${y-14}" stroke="var(--glory)" stroke-width="2" class="christLine" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><circle cx="${x}" cy="${y}" r="13" class="person" fill="var(--stress-soft)" stroke="var(--stress)"/>`}).join("")}
   <text x="230" y="292" text-anchor="middle" font-size="11" fill="var(--muted)" id="headsCap">'In Adam all die' (1 Cor 15:22)</text>
  </svg></div>
  <div class="row"><button class="btn primary" type="button" id="reHead">Play: Christ re-heads humanity</button><button class="btn" type="button" id="reReset">Reset</button></div>
 </div>
 <div class="panel" style="display:flex;flex-direction:column;gap:12px"><span class="mono muted">Two inheritances</span>
  ${W.compare("In Christ (1 Cor 15:45-49)",["Life-giving Spirit","Incorruptible seed (1 Pet 1:23)","Righteousness as gift (Rom 5:17)","Sons and daughters (Gal 4:6-7)","Image of the man of heaven"],"In Adam",["A living soul, then death","Perishable seed","Alienation in the mind (Col 1:21)","Orphan, fear, hiding (Gen 3:10)","Image of the man of dust"])}
  <p class="muted" style="font-size:.88rem">"Born, not of blood nor of the will of the flesh nor of the will of man, but of God" (John 1:13). Our new birth is a different kind of birth from our first one.</p>
 </div>
</section>
${W.sec("Why it doesn't manifest automatically","Inheritance arrives in layers. Tap each layer. The bars show how far the new creation has typically unfolded (illustrative).",`
<div class="split"><div class="panel" id="manBars" style="display:flex;flex-direction:column;gap:12px"></div><div class="panel" id="manOut" style="display:flex;flex-direction:column;gap:10px"></div></div>
<div class="grid">
 ${[["Seed, not instant tree","God's seed abides in you (1 John 3:9). A seed contains the whole oak, but it grows.","Mark 4:26-29"],
   ["Free in a day, renewed over years","Israel left Egypt in one night; Egypt left Israel over forty years.","Exod 12 · Deut 8:2"],
   ["An estate to explore","An heir owns the whole estate from the day the will takes effect, but walks into each room over time.","Gal 4:1-7"],
   ["Inside out, not outside in","Adam's death came body-first; Christ's life comes spirit-first, then works outward.","2 Cor 4:16"]
 ].map(([t,d,v])=>`<div class="card"><h4>${t}</h4><p>${d}</p><span class="ref">${v}</span></div>`).join("")}
</div>`)}
${W.sec("Questions people ask","Tap a question.",`<div class="grid two" style="align-items:start">${WHY.map((w,i)=>`<details class="card" ${i===1?"open":""}><summary style="cursor:pointer;font-weight:600;font-size:1.03rem">${w.q}</summary><p style="margin-top:10px;color:var(--fg)">${w.a}</p></details>`).join("")}</div>`)}
${W.sec("Where the legal gospel breaks down","It can explain a changed verdict, but not a changed person.",`
<div class="panel"><div class="seg" id="gosSeg"><button type="button" data-v="legal" aria-pressed="false">Legal gospel</button><button type="button" data-v="rel" aria-pressed="true">Relational gospel</button></div><div id="gosOut" style="margin-top:16px"></div></div>`)}
${W.sec("Practical steps: living from your new inheritance",null,`<div class="panel">${W.steps([
 "<b>Reckon daily</b> (Rom 6:11): 'I count myself dead to the old and alive to God in Christ.' Say it aloud each morning.",
 "<b>Trace old patterns to the old story.</b> When a family pattern shows up, say: 'That came from Adam's line and my history. It is not my identity.'",
 "<b>Behold Christ</b> (2 Cor 3:18): 10 minutes a day reading the Gospels and asking, 'What does this show me about the Father, and about me?'",
 "<b>Retrain the body:</b> breath prayer, sleep, movement. Calm biology lets new beliefs take root.",
 "<b>Practise the new nature in small acts:</b> generosity, honesty, forgiveness. Behaviour helps rewire the brain.",
 "<b>Stay in community:</b> new family patterns are learned in a new family (Ps 68:6).",
 "<b>Expect a process, and celebrate progress.</b> 'He who began a good work in you will bring it to completion' (Phil 1:6)."])}</div>
<p class="muted">Related: ${ext("atlas","unfold","Atlas · Finished, born, unfolding")} · ${ext("rewiring","study-newcreation","Rewiring · New creation & spirit man")} · ${ext("rewiring","study-union","Rewiring · The gospel of union")}</p>`)}
`,mount(){
  const run=()=>{$$("#heads .christLine").forEach((l,i)=>{l.style.transition=reduce?"none":`stroke-dashoffset 1.2s ease ${i*.15}s`;l.style.strokeDashoffset="0"});
   $$("#heads .person").forEach((c,i)=>setTimeout(()=>{c.setAttribute("fill","var(--glory-soft)");c.setAttribute("stroke","var(--glory)")},reduce?0:900+i*150));
   $$("#heads .adamLine").forEach(l=>l.setAttribute("stroke-opacity",".1"));$("#headsCap").textContent="'So also in Christ shall all be made alive' (1 Cor 15:22)"};
  const reset=()=>{$$("#heads .christLine").forEach(l=>{l.style.transition="none";l.style.strokeDashoffset="1"});$$("#heads .person").forEach(c=>{c.setAttribute("fill","var(--stress-soft)");c.setAttribute("stroke","var(--stress)")});$$("#heads .adamLine").forEach(l=>l.setAttribute("stroke-opacity",".35"));$("#headsCap").textContent="'In Adam all die' (1 Cor 15:22)"};
  $("#reHead").onclick=run;$("#reReset").onclick=reset;
  const out=i=>{const m=MANIFEST[i];$$("#manBars .mrow").forEach((r,j)=>r.style.borderColor=j===i?"var(--glory)":"var(--line)");$("#manOut").innerHTML=`<span class="tag" style="color:var(${m.c})">Layer ${i+1} of 5</span><h3>${m.k}</h3><p>${m.d}</p>`};
  $("#manBars").innerHTML=`<span class="mono muted">From spirit outward</span>`+MANIFEST.map((m,i)=>`<button type="button" class="mrow card" data-i="${i}" style="text-align:left;padding:12px;cursor:pointer;background:var(--bg)"><div class="row" style="justify-content:space-between"><b>${m.k}</b><span class="mono muted">${m.p===100?"complete":m.p<20?"foretaste":"unfolding"}</span></div><div class="meter" style="grid-template-columns:1fr"><div class="bar"><i data-w="${m.p}" style="background:var(${m.c})"></i></div></div></button>`).join("");
  W.fillMeters($("#manBars"));$$("#manBars .mrow").forEach(b=>b.addEventListener("click",()=>out(+b.dataset.i)));out(0);
  const G={legal:{h:"A verdict in a courtroom",l:["Salvation = a change of legal status; you remain 'just a sinner saved by grace'","The cross mainly satisfies God's anger, so it says little about a new nature","Adam's guilt is imputed; Christ's righteousness is imputed. Both stay on paper","Transformation depends on trying harder, so it produces performance and shame","Healing and wholeness are postponed to heaven"],r:"It can't explain why we'd change, or why a pardoned prisoner still lives like a prisoner."},
   rel:{h:"A new humanity in union",l:["Salvation = union with Christ: 'Christ in you, the hope of glory' (Col 1:27)","The cross reveals and heals; it changes our mind about the Father, not his about us","Christ re-headed humanity; we share his actual life, not just his record (2 Pet 1:4)","Transformation is the new nature unfolding as the mind wakes up","Healing and renewal begin now as foretastes of the resurrection"],r:"It explains both the reality (new creation now) and the process (renewal unfolding)."}};
  const gs=v=>{$$("#gosSeg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===v));const g=G[v];$("#gosOut").innerHTML=`<h3>${g.h}</h3><div style="margin-top:10px">${W.list(g.l)}</div><p class="tag ${v==="legal"?"s":"l"}" style="margin-top:12px">${g.r}</p>`};
  $$("#gosSeg button").forEach(b=>b.addEventListener("click",()=>gs(b.dataset.v)));gs("rel");
}};

/* ======================= BLOOD ======================= */
let bloodRAF=null;
function bloodCanvas(cv,getMode){
  cancelAnimationFrame(bloodRAF);const ctx=cv.getContext("2d"),dpr=Math.min(2,devicePixelRatio||1);let w,h;
  const size=()=>{const r=cv.getBoundingClientRect();w=r.width;h=r.height;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};size();
  const P=Array.from({length:90},(_,i)=>({x:Math.random(),y:Math.random(),k:i<60?"rbc":i<70?"wbc":i<82?"hormone":"dna",s:.5+Math.random()}));
  const col={rbc:css("--stress"),wbc:css("--fg"),dna:css("--violet")};
  const frame=()=>{if(!document.body.contains(cv))return;const m=getMode();ctx.clearRect(0,0,w,h);
   ctx.fillStyle=css("--stress-soft");ctx.beginPath();ctx.roundRect?ctx.roundRect(4,h*.15,w-8,h*.7,h*.35):ctx.rect(4,h*.15,w-8,h*.7);ctx.fill();
   const speed=m==="stress"?2.2:1.1;
   for(const p of P){p.x+=.0016*speed*p.s;if(p.x>1.02)p.x=-.02;const y=h*.2+p.y*h*.6+Math.sin(p.x*12+p.s)*4,x=p.x*w;
    if(p.k==="rbc"){ctx.fillStyle=col.rbc;ctx.globalAlpha=.85;ctx.beginPath();ctx.ellipse(x,y,6,4,p.x*6,0,7);ctx.fill()}
    else if(p.k==="wbc"){ctx.fillStyle=col.wbc;ctx.globalAlpha=.55;ctx.beginPath();ctx.arc(x,y,6.5,0,7);ctx.fill()}
    else if(p.k==="hormone"){ctx.fillStyle=m==="stress"?css("--glory"):css("--living");ctx.globalAlpha=.95;ctx.beginPath();ctx.moveTo(x,y-4);ctx.lineTo(x+4,y+3);ctx.lineTo(x-4,y+3);ctx.closePath();ctx.fill()}
    else{ctx.strokeStyle=col.dna;ctx.globalAlpha=.9;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-5,y);ctx.quadraticCurveTo(x,y-5,x+5,y);ctx.stroke()}}
   ctx.globalAlpha=1;if(!reduce)bloodRAF=requestAnimationFrame(frame)};
  bloodRAF=requestAnimationFrame(frame);
}
const BLOOD_V=[
 {k:"Life is in the blood",r:"Lev 17:11",d:"'The life (nephesh) of the flesh is in the blood.' Blood carries oxygen, nutrients, hormones, immune cells and heat to every cell. Stop the flow and life stops."},
 {k:"Blood that cries out",r:"Gen 4:10 · Heb 12:24",d:"Abel's blood cried for justice. Jesus' blood 'speaks a better word than the blood of Abel': forgiveness instead of vengeance."},
 {k:"One blood",r:"Acts 17:26",d:"'He made from one blood every nation of men' (KJV). Genetics agrees: all humans share about 99.9% of their DNA. Racism has no biological foundation."},
 {k:"He shared our flesh and blood",r:"Heb 2:14",d:"'Since the children share in flesh and blood, he himself likewise partook of the same things.' Jesus took real human blood from Mary to heal humanity from within."},
 {k:"Drink my blood",r:"John 6:53-56",d:"'Whoever eats my flesh and drinks my blood abides in me, and I in him.' Union language: his life flowing in us, as blood flows through a body."},
 {k:"Cleansing, not appeasing",r:"1 John 1:7 · Heb 9:14",d:"His blood 'cleanses us' and 'purifies our conscience'. In the relational lens the blood is God's life given to heal us, not a payment to calm an angry God."},
 {k:"Overcoming",r:"Rev 12:11",d:"'They conquered him by the blood of the Lamb and by the word of their testimony': the accuser silenced by love poured out."}
];
R.blood={html:()=>`
${W.head("DNA & blood · The blood","Blood, DNA and the mind: one living river","'The life of the flesh is in the blood' (Lev 17:11). Blood carries your DNA's instructions, your mind's hormones, and in Scripture, the life of God given for the world. Watch the river change with your inner state.")}
<section class="split">
 <div class="panel" style="display:flex;flex-direction:column;gap:12px"><span class="mono muted">Inside a blood vessel · live</span>
  <canvas id="bloodCv" style="width:100%;height:200px;display:block" aria-label="Animated blood vessel"></canvas>
  <div class="row" style="gap:12px;font-size:.8rem;color:var(--muted)"><span><b style="color:var(--stress)">●</b> red cells (no DNA)</span><span><b style="color:var(--fg)">●</b> white cells (carry DNA)</span><span><b style="color:var(--glory)">▲</b> stress hormones</span><span><b style="color:var(--living)">▲</b> calm hormones</span><span><b style="color:var(--violet)">~</b> cell-free DNA</span></div>
  <div class="seg" id="bloodSeg"><button type="button" data-v="stress" aria-pressed="false">Fear & stress</button><button type="button" data-v="peace" aria-pressed="true">Peace & trust</button></div>
 </div>
 <div class="panel" id="bloodOut" style="display:flex;flex-direction:column;gap:10px"></div>
</section>
${W.sec("Blood facts that preach",null,`
<div class="grid">
 ${[["~5 litres","An adult carries about 5 litres of blood, pumped around the body roughly once a minute."],
   ["~25 trillion","Red blood cells, made in the bone marrow at about 2–3 million per second, each living about 120 days. Your blood is constantly renewed."],
   ["No DNA in red cells","Mature red blood cells eject their nucleus to make room for oxygen. The DNA in blood comes from white cells and from free-floating fragments."],
   ["Cell-free DNA","Fragments of DNA from cells all over the body float in the plasma. Doctors read them to detect cancer and, in pregnancy, the baby's DNA in the mother's blood."],
   ["Mother & child","The placenta keeps mother's and baby's blood circulations separate, yet cells and DNA cross both ways and can remain in the mother for decades (fetal microchimerism)."],
   ["Blood–brain barrier","A protective wall of tightly sealed cells guards the brain. Chronic stress and inflammation can make it leakier."]
 ].map(([n,d])=>`<div class="card"><span style="font-family:var(--f-display);font-size:1.6rem;color:var(--stress);line-height:1.1">${n}</span><p>${d}</p></div>`).join("")}
</div>`)}
${W.sec("Blood, DNA and mind: the connection map",null,`
<div class="panel"><div class="diagram"><svg viewBox="0 0 720 300" role="img" aria-label="Blood DNA mind map">
 ${[["Mind",120,70,"--glory","beliefs · emotions"],["Brain & glands",360,40,"--violet","hypothalamus · adrenals"],["Blood",600,70,"--stress","the river"],["Cells & DNA",600,230,"--violet","genes switched"],["Body & health",360,260,"--living","heart · immunity · repair"],["Spirit",120,230,"--glory","union with Christ"]].map(([t,x,y,c,s])=>`<g><circle cx="${x}" cy="${y}" r="38" fill="var(${c})" fill-opacity=".14" stroke="var(${c})" stroke-width="2"/><text x="${x}" y="${y-2}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">${t}</text><text x="${x}" y="${y+14}" text-anchor="middle" font-size="9" fill="var(--muted)">${s}</text></g>`).join("")}
 ${[[158,62,322,46,"thoughts trigger signals"],[398,46,562,62,"hormones enter blood"],[600,108,600,192,"hormones reach DNA"],[562,238,398,256,"gene expression shapes body"],[322,262,158,238,"body sensations feed back"],[120,192,120,108,"truth renews the mind"]].map(([a,b,c,d,t])=>`<path d="M${a} ${b} L${c} ${d}" stroke="var(--muted)" stroke-width="2" class="flow-dash"/><text x="${(a+c)/2}" y="${(b+d)/2-6}" text-anchor="middle" font-size="10" fill="var(--muted)">${t}</text>`).join("")}
 <text x="360" y="155" text-anchor="middle" font-family="var(--f-display)" font-size="17" fill="var(--fg)">one person, one living loop</text>
</svg></div></div>`)}
${W.sec("Blood in Scripture","Seven threads. Tap any card.",`<div class="grid" id="bvGrid">${BLOOD_V.map((b,i)=>`<button type="button" class="card click" data-i="${i}" style="text-align:left"><span class="ref">${b.r}</span><h4>${b.k}</h4></button>`).join("")}</div>`)}
${W.sec("Myth check: 'Jesus' blood came only from his Father'","A popular sermon illustration claims a baby's blood comes only from the father, so Jesus' blood was divine, not Adamic. Both halves are wrong, and the theology matters.",`
<div class="grid two">
 <div class="card"><span class="tag s">The biology</span><p style="color:var(--fg)">Blood type is inherited from both parents (an A mother and B father can have an AB child). Mother and baby have separate circulations, but the baby's blood is built from instructions in both parents' DNA, and cells cross the placenta both ways.</p></div>
 <div class="card"><span class="tag g">The theology</span><p style="color:var(--fg)">Jesus was 'born of a woman' (Gal 4:4) and 'partook of the same' flesh and blood as us (Heb 2:14). The early church insisted: 'What is not assumed is not healed' (Gregory of Nazianzus). He took our real humanity, from Mary, to heal it from the inside. His holiness came from his union with the Father and the Spirit, not from a special blood supply.</p></div>
</div>`)}
${W.sec("Practical: let peace flow in your bloodstream",null,`<div class="panel">${W.steps([
 "<b>Communion with intention:</b> as you take the cup, say 'Your life in me, your peace in my blood, your healing in my body' (John 6:56; 1 Cor 11:25).",
 "<b>Breathe slowly</b> (inhale 4, exhale 6) for 5 minutes, twice a day. Blood pressure and stress hormones fall within minutes.",
 "<b>Forgive quickly.</b> Rehearsing grudges raises blood pressure; releasing them lowers it (Witvliet, 2001).",
 "<b>Move daily:</b> exercise improves blood flow, renews blood vessels and clears stress hormones.",
 "<b>Laugh and sing:</b> 'A joyful heart is good medicine' (Prov 17:22). Laughter improves blood-vessel function.",
 "<b>Speak over your body</b> with believable, Scripture-rooted words: 'The Spirit who raised Jesus gives life to my mortal body' (Rom 8:11)."])}</div>`)}
`,mount(){
  let mode="peace";bloodCanvas($("#bloodCv"),()=>mode);
  const T={stress:{h:"Fear changes the river",l:["Adrenaline and cortisol surge; heart rate and blood pressure rise","Blood sugar rises for quick energy; clotting factors increase","Inflammatory signals (cytokines) rise over time","Blood is diverted from gut and skin to muscles","Stress hormones reach every cell's DNA and switch genes toward defence"]},
   peace:{h:"Peace changes the river",l:["Heart rate slows and becomes more variable (healthy HRV)","Blood pressure falls; vessels relax","Oxytocin and calming signals circulate","Digestion and repair get full blood supply","Genes for repair and immune defence are favoured"]}};
  const set=v=>{mode=v;$$("#bloodSeg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===v));const t=T[v];$("#bloodOut").innerHTML=`<span class="tag ${v==="stress"?"s":"l"}">${v==="stress"?"Fear & stress":"Peace & trust"}</span><h3>${t.h}</h3>${W.list(t.l)}<p class="muted" style="font-size:.88rem">"A tranquil heart gives life to the flesh, but envy makes the bones rot" (Prov 14:30).</p>`};
  $$("#bloodSeg button").forEach(b=>b.addEventListener("click",()=>set(b.dataset.v)));set("peace");
  $$("#bvGrid .card").forEach(c=>c.addEventListener("click",()=>{const b=BLOOD_V[+c.dataset.i];openDrawer(`<span class="ref">${b.r}</span><h2>${b.k}</h2><p style="color:var(--fg)">${b.d}</p>`)}));
}};

})();
