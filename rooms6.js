/* MindConnect — rooms part 6: The seed, The living web */
(function(){
const {$,$$,esc,store,toast,openDrawer,W,ext,reduce,css}=window.MC;
const R=window.ROOMS;

/* ======================= THE SEED ======================= */
const CARRY=[
 {k:"Sperm carries",c:"--living",l:["23 chromosomes (including X or Y, which decides the baby's sex)","DNA packed 6–10× tighter than normal, using proteins called protamines, to survive the journey","Epigenetic marks and small RNAs shaped by the father's recent life","A centriole that organises the embryo's first cell division","Its mitochondria are normally destroyed after fertilisation"]},
 {k:"Egg carries",c:"--glory",l:["23 chromosomes (always an X)","All the mitochondria: the baby's power plants come from the mother's line","Stored RNAs and proteins that run the first days of development","Epigenetic marks from the mother","Nutrients and machinery for the first cell divisions"]}
];
const FATHER=[
 {k:"Age",tag:"strong evidence",c:"g",d:"Sperm-making cells keep dividing for life, so copying errors accumulate. Each extra year of the father's age adds roughly two new mutations to a child's genome (Kong et al., Nature 2012). Mothers contribute about 14 regardless of age."},
 {k:"Stress",tag:"human, exploratory",c:"g",d:"In 193 men, higher perceived stress was linked to lower sperm concentration, motility and normal shape (Janevic et al., 2014). Stress hormones suppress the hormonal axis that drives sperm production."},
 {k:"Smoking, heat, alcohol",tag:"well established",c:"l",d:"These increase oxidative stress and DNA fragmentation in sperm, and lower count and motility."},
 {k:"Fear learned by a father mouse",tag:"animal, debated",c:"s",d:"Male mice taught to fear a cherry-blossom smell (acetophenone) had offspring who startled more at that smell without ever having met it (Dias & Ressler, 2014). How the signal reaches sperm is still unclear."},
 {k:"Stressed fathers' sperm RNA",tag:"animal",c:"s",d:"Stressed male mice had altered microRNAs in their sperm and offspring with changed stress-hormone regulation (Rodgers et al., 2013). Injecting sperm RNA from traumatised males into normal embryos reproduced some effects (Gapp et al., 2014)."},
 {k:"Grandfathers and harvests",tag:"human, contested",c:"s",d:"In historical records from Överkalix, Sweden, a paternal grandfather's food supply in childhood was linked to his grandsons' mortality (Pembrey et al., 2006). Intriguing, observational, and not always replicated."}
];
const SOILS=[
 {k:"The path",v:"Luke 8:5, 12",psych:"A hardened, distracted or defended mind. Truth bounces off: the brain's threat and bias filters reject it before it can be considered. Often formed by hurt.",fix:"Soften the soil: safety, honesty about hurt, and slowing down to actually listen."},
 {k:"Rocky ground",v:"Luke 8:6, 13",psych:"Emotional excitement without roots. A spike of dopamine and inspiration that fades when pressure comes, because no repeated practice wired it in.",fix:"Roots grow by repetition: daily meditation, practice and community over weeks and months."},
 {k:"Among thorns",v:"Luke 8:7, 14",psych:"A crowded, anxious mind. Worry, riches and pleasures compete for the same attention and reward circuits, so the truth is choked out.",fix:"Weed and simplify: limit inputs, cast cares (1 Pet 5:7), Sabbath."},
 {k:"Good soil",v:"Luke 8:8, 15",psych:"'An honest and good heart' that holds the word fast with patience. A regulated, open, attentive mind where new pathways can be laid down and strengthened.",fix:"Keep it watered: rest, attention, honesty and patience. Fruit 30, 60, 100-fold."}
];
const SEEDWORDS=[
 {h:"זֶרַע",t:"zeraʿ",g:"seed, offspring, descendants",d:"Used for plant seed (Gen 1:11), semen (Lev 15:16) and descendants (Gen 12:7). One word holds plant, body and family line together. Each kind reproduces 'after its kind': what is sown is what grows."},
 {h:"σπέρμα",t:"sperma",g:"seed, offspring",d:"'God's seed (sperma) abides in him' (1 John 3:9). God's own life is planted in the believer. Paul notes the promise was to Abraham's 'seed', singular, 'who is Christ' (Gal 3:16)."},
 {h:"σπορά",t:"spora",g:"sowing, seed",d:"'You have been born again, not of perishable seed but of imperishable (aphthartos), through the living and abiding word of God' (1 Pet 1:23). Our first birth came from perishable seed, our new birth from incorruptible seed."},
 {h:"σπόρος",t:"sporos",g:"seed sown",d:"'The seed is the word of God' (Luke 8:11). The mind and heart are the soil. What grows depends on the seed and on the soil."},
 {h:"κόκκος",t:"kokkos",g:"a grain, kernel",d:"'Unless a grain of wheat falls into the earth and dies, it remains alone; but if it dies, it bears much fruit' (John 12:24). Jesus is the Seed who died to become a harvest: a new humanity."}
];
R.seed={html:()=>`
${W.head("DNA & blood · The seed","Seed: where DNA, body, mind and blood meet the next generation","Sperm and egg are the bridge between one life and the next. They carry DNA, and also some of what life has written on the parents. Scripture uses the same word, seed, for offspring, for the Word of God, and for Christ himself.")}
<section class="split">
 <div class="panel" style="display:flex;flex-direction:column;gap:10px"><span class="mono muted">The sperm assembly line · about 64–74 days</span>
  <div class="diagram"><svg viewBox="0 0 520 220" role="img" aria-label="Sperm production line">
   <path id="sLine" d="M30 170 C 120 170, 120 60, 220 60 S 330 170, 420 120 L 500 70" fill="none" stroke="var(--line)" stroke-width="18" stroke-linecap="round"/>
   ${[["stem cell",40,170],["spermatocyte",150,95],["spermatid",290,125],["sperm",480,70]].map(([t,x,y])=>`<text x="${x}" y="${y+34}" text-anchor="middle" font-size="10.5" fill="var(--muted)">${t}</text>`).join("")}
   ${Array.from({length:7},(_,i)=>`<g><circle r="7" fill="var(--living)"><animateMotion dur="7s" begin="${-i}s" repeatCount="indefinite"><mpath href="#sLine"/></animateMotion><animate attributeName="r" values="9;7;5;4" dur="7s" begin="${-i}s" repeatCount="indefinite"/></circle></g>`).join("")}
   <text x="260" y="24" text-anchor="middle" font-size="11" fill="var(--fg)">over a thousand sperm made every second, each built over ~2½ months</text>
  </svg></div>
  <p class="muted" style="font-size:.88rem">So the sperm present at conception were shaped by roughly the last three months of a man's life: his sleep, stress, food, smoking and drinking.</p>
 </div>
 <div class="panel" style="display:flex;flex-direction:column;gap:10px"><span class="mono muted">Three generations nested · the egg</span>
  <div class="diagram"><svg viewBox="0 0 320 220" style="min-width:0" role="img" aria-label="Grandmother, mother, egg nested">
   <circle cx="160" cy="110" r="96" fill="var(--violet-soft)" stroke="var(--violet)"/><text x="160" y="30" text-anchor="middle" font-size="11" fill="var(--fg)">your grandmother, pregnant</text>
   <circle cx="160" cy="122" r="58" fill="var(--glory-soft)" stroke="var(--glory)"><animate attributeName="r" values="56;60;56" dur="4s" repeatCount="indefinite"/></circle><text x="160" y="84" text-anchor="middle" font-size="10.5" fill="var(--fg)">your mother, a fetus</text>
   <circle cx="160" cy="134" r="16" fill="var(--living)" opacity=".85"><animate attributeName="opacity" values=".5;1;.5" dur="2.4s" repeatCount="indefinite"/></circle><text x="160" y="170" text-anchor="middle" font-size="10" fill="var(--fg)">the egg that became you</text>
  </svg></div>
  <p class="muted" style="font-size:.88rem">A baby girl's ovaries form all her eggs before she is born. The egg you came from was formed inside your mother while she was still in your grandmother's womb. Scripture has a similar picture: Levi paid tithes 'while still in the loins of his ancestor' Abraham (Heb 7:9-10).</p>
 </div>
</section>
${W.sec("What each seed carries","Two halves, unequal in size, equal in genetic share.",`<div class="compare">${CARRY.map(c=>`<div class="${c.c==="--living"?"ok":"bad"}" style="${c.c==="--glory"?"background:var(--glory-soft)":""}"><b style="color:var(${c.c})">${c.k}</b>${W.list(c.l)}</div>`).join("")}</div>`)}
${W.sec("Mind → hormones → seed","The same brain that handles stress runs reproduction. Toggle to see how chronic stress reaches the seed.",`
<div class="panel split" style="box-shadow:none">
 <div class="diagram"><svg id="hpg" viewBox="0 0 460 300" role="img" aria-label="Hypothalamic pituitary gonadal axis">
  ${[["Mind & emotions",230,30,"--glory"],["Hypothalamus · GnRH",230,95,"--violet"],["Pituitary · LH & FSH",230,160,"--violet"],["Testes / ovaries",230,225,"--living"]].map(([t,x,y,c],i)=>`<rect x="${x-90}" y="${y-18}" width="180" height="36" rx="18" fill="var(--bg)" stroke="var(${c})" stroke-width="1.6"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg)">${t}</text>${i<3?`<path class="flow-dash hpgArrow" d="M${x} ${y+18} L${x} ${y+47}" stroke="var(--living)" stroke-width="3"/>`:""}`).join("")}
  <text x="230" y="285" text-anchor="middle" font-size="11" fill="var(--muted)" id="hpgOut">testosterone · sperm · ovulation</text>
  <g id="cortG"><rect x="360" y="110" width="88" height="34" rx="17" fill="var(--stress-soft)" stroke="var(--stress)"/><text x="404" y="131" text-anchor="middle" font-size="11" fill="var(--fg)">cortisol</text>
   <path d="M360 127 L322 105 M360 127 L322 160" stroke="var(--stress)" stroke-width="2.5" stroke-dasharray="4 4" class="flow-dash"/><text x="404" y="165" text-anchor="middle" font-size="10" fill="var(--stress)">suppresses</text></g>
 </svg></div>
 <div style="display:flex;flex-direction:column;gap:10px">
  <div class="seg" id="hpgSeg"><button type="button" data-v="calm" aria-pressed="true">Rested & secure</button><button type="button" data-v="stress" aria-pressed="false">Chronic stress</button></div>
  <div id="hpgTxt"></div>
 </div>
</div>`)}
${W.sec("What a father's life writes into the seed","Evidence strength varies a lot. Each card says how solid it is.",`<div class="grid">${FATHER.map(f=>`<div class="card"><span class="tag ${f.c}">${f.tag}</span><h4>${f.k}</h4><p>${f.d}</p></div>`).join("")}</div>
<div class="note">Keep it in proportion: most epigenetic marks are erased at conception, and the strongest 'inheritance' of patterns still comes through how children are raised. These findings are a call to steward your life for the next generation, not a reason for fear or blame. In Christ every child can start a new line (Ezek 18:20; Gal 3:13-14).</div>`)}
${W.sec("Seed in Scripture: word explorer","Tap a word.",`<div class="split"><div class="pills" id="swPills" style="align-content:flex-start">${SEEDWORDS.map((w,i)=>`<button type="button" class="pill" data-i="${i}" aria-pressed="${i===0}"><span style="font-size:1.15rem;font-family:serif">${w.h}</span> · ${w.t}</button>`).join("")}</div><div class="panel" id="swOut" style="display:flex;flex-direction:column;gap:10px"></div></div>`)}
${W.sec("The story of the Seed","From the first promise to the incorruptible seed planted in you.",`
<div class="panel"><div class="diagram"><svg viewBox="0 0 760 180" role="img" aria-label="Story of the seed">
 <line x1="30" y1="90" x2="730" y2="90" stroke="var(--line)" stroke-width="3"/>
 ${[["Gen 1:11","Seed after its kind","creation"],["Gen 3:15","Seed of the woman","the first promise"],["Gen 22:18","Abraham's seed","blessing for all nations"],["Gal 3:16","The Seed is Christ","singular"],["John 12:24","The grain dies","cross → harvest"],["1 Pet 1:23","Incorruptible seed","new birth"],["1 Cor 15:42","Raised imperishable","resurrection"]].map(([r,t,s],i)=>{const x=50+i*110;return`<circle cx="${x}" cy="90" r="11" fill="var(${i===3?"--glory":i>3?"--living":"--violet"})"><animate attributeName="r" values="9;13;9" dur="3s" begin="${i*.4}s" repeatCount="indefinite"/></circle><text x="${x}" y="${i%2?130:56}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--fg)">${t}</text><text x="${x}" y="${i%2?146:40}" text-anchor="middle" font-size="9.5" fill="var(--glory)">${r}</text><text x="${x}" y="${i%2?160:72}" text-anchor="middle" font-size="9" fill="var(--muted)">${s}</text>`}).join("")}
 <circle r="5" fill="var(--glory)"><animateMotion dur="8s" repeatCount="indefinite" path="M50 90 L710 90"/></circle>
</svg></div></div>
<div class="grid two">
 <div class="card"><span class="tag g">In the loins: how 'all' were included</span><p style="color:var(--fg)">Hebrews says Levi acted 'in Abraham' before he was born (Heb 7:9-10). In the same way Scripture sees all humanity 'in Adam'. The relational gospel adds: and all humanity was gathered into Christ, the last Adam and the true Seed (1 Cor 15:22, 45; 2 Cor 5:14). His death and resurrection included us before we knew it.</p></div>
 <div class="card"><span class="tag l">Incorruptible seed is not DNA</span><p style="color:var(--fg)">The seed of new birth is God's own life and word (1 Pet 1:23; 1 John 3:9), planted in the spirit. It doesn't edit your chromosomes. It grows outward through a renewed mind into how you live, and even into how your genes are read, until the resurrection completes it.</p></div>
</div>`)}
${W.sec("The mind is soil: the parable of the sower","'The seed is the word of God' (Luke 8:11). The same seed produces nothing or a hundredfold depending on the soil. Tap a soil.",`
<div class="split"><div class="panel"><div class="diagram"><svg id="soilSvg" viewBox="0 0 440 260" style="min-width:300px" role="img" aria-label="Four soils">
 ${SOILS.map((s,i)=>{const x=20+i*105;const col=["--muted","--violet","--stress","--living"][i];return`<g class="soil" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><rect x="${x}" y="150" width="95" height="70" rx="10" fill="var(${col})" fill-opacity=".18" stroke="var(${col})"/><text x="${x+47}" y="240" text-anchor="middle" font-size="11" font-weight="700" fill="var(--fg)">${s.k}</text>
  <circle cx="${x+47}" cy="40" r="4" fill="var(--glory)"><animate attributeName="cy" values="20;150;150" keyTimes="0;.4;1" dur="4s" begin="${i*.3}s" repeatCount="indefinite"/></circle>
  ${i===3?`<path d="M${x+47} 150 L${x+47} 80" stroke="var(--living)" stroke-width="3"><animate attributeName="d" values="M${x+47} 150 L${x+47} 150;M${x+47} 150 L${x+47} 150;M${x+47} 150 L${x+47} 80" keyTimes="0;.45;1" dur="4s" repeatCount="indefinite"/></path><circle cx="${x+47}" cy="78" r="9" fill="var(--glory)" opacity=".8"><animate attributeName="r" values="0;0;9" keyTimes="0;.7;1" dur="4s" repeatCount="indefinite"/></circle>`:i===1?`<path d="M${x+47} 150 L${x+47} 120" stroke="var(--violet)" stroke-width="3"><animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite"/></path>`:i===2?`<path d="M${x+20} 150 l10 -40 l10 30 l10 -36 l10 32 l10 -38" stroke="var(--stress)" stroke-width="2" fill="none"/>`:""}</g>`}).join("")}
</svg></div></div><div class="panel" id="soilOut" style="display:flex;flex-direction:column;gap:10px"></div></div>`)}
${W.sec("Practical: stewarding your seed and your soil",null,`<div class="panel">${W.steps([
 "<b>Three months before conceiving</b>, both partners: sleep, whole food, movement, no smoking, little or no alcohol, and stress care. Sperm and eggs mature over this window.",
 "<b>Heal before you hand on.</b> Work on your own wounds and lies now: what you don't heal, you tend to pass on through how you parent.",
 "<b>Bless your children's seed:</b> pray over your children and future grandchildren (Ps 103:17; Isa 59:21).",
 "<b>Honour sexuality as covenant:</b> 'Let marriage be held in honour… and the marriage bed undefiled' (Heb 13:4). Seed is sacred life-potential.",
 "<b>Tend the soil daily:</b> remove thorns (anxious inputs), break up hard ground (honest confession), deepen roots (repetition).",
 "<b>Speak the incorruptible seed:</b> read and say God's word aloud every day. It is the seed; your heart is the field (Mark 4:26-29)."])}</div>`)}
`,mount(){
  const H={calm:{t:"Signals flow freely. GnRH pulses steadily, the pituitary releases LH and FSH, and the testes and ovaries make healthy hormones, sperm and eggs.",o:"healthy testosterone · sperm · regular ovulation",cort:.15},
   stress:{t:"Chronic cortisol and stress signals suppress GnRH pulses. Testosterone and sperm quality can fall, and ovulation can be delayed or stop (stress-related missed periods). The body puts survival before reproduction.",o:"lower testosterone · poorer sperm · delayed ovulation",cort:1}};
  const hs=v=>{const h=H[v];$$("#hpgSeg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===v));$("#cortG").style.opacity=h.cort;$$("#hpg .hpgArrow").forEach(a=>{a.setAttribute("stroke",v==="calm"?"var(--living)":"var(--stress)");a.setAttribute("stroke-opacity",v==="calm"?1:.4)});
   $("#hpgOut").textContent=h.o;$("#hpgTxt").innerHTML=`<span class="tag ${v==="calm"?"l":"s"}">${v==="calm"?"Rested & secure":"Chronic stress"}</span><p style="margin-top:8px">${h.t}</p><p class="muted" style="font-size:.85rem;margin-top:8px">Hannah 'poured out her soul' and her face was no longer sad before she conceived (1 Sam 1:15-20). Peace isn't a fertility formula, but it is the body's preferred setting for new life.</p>`};
  $$("#hpgSeg button").forEach(b=>b.addEventListener("click",()=>hs(b.dataset.v)));hs("calm");
  const sw=i=>{const w=SEEDWORDS[i];$$("#swPills .pill").forEach(p=>p.setAttribute("aria-pressed",+p.dataset.i===i));$("#swOut").innerHTML=`<span style="font-size:2.3rem;font-family:serif;line-height:1.1">${w.h}</span><span class="mono" style="color:var(--glory)">${w.t} · ${w.g}</span><p>${w.d}</p>`};
  $$("#swPills .pill").forEach(p=>p.addEventListener("click",()=>sw(+p.dataset.i)));sw(0);
  const so=i=>{const s=SOILS[i];$$("#soilSvg .soil rect").forEach((r,j)=>r.setAttribute("stroke-width",j===i?3:1));$("#soilOut").innerHTML=`<span class="ref">${s.v}</span><h3>${s.k}</h3><p>${s.psych}</p><div class="card" style="background:var(--bg)"><span class="tag l">Tend it</span><p style="color:var(--fg)">${s.fix}</p></div>`};
  $$("#soilSvg .soil").forEach(g=>{g.addEventListener("click",()=>so(+g.dataset.i));g.addEventListener("keydown",e=>{if(e.key==="Enter")so(+g.dataset.i)})});so(3);
}};

/* ======================= THE LIVING WEB ======================= */
const NODES={mind:{x:300,y:60,c:"--glory",l:"Mind"},body:{x:520,y:190,c:"--living",l:"Body"},blood:{x:430,y:400,c:"--stress",l:"Blood"},seed:{x:170,y:400,c:"--violet",l:"Seed"},dna:{x:80,y:190,c:"--violet",l:"DNA"}};
const EDGES=[
 ["mind","body","Thoughts become hormones and nerve signals within seconds: heart rate, gut, muscles, immunity. The body sends signals back through the vagus nerve, so feelings feel physical.","Prov 14:30"],
 ["mind","blood","Fear releases adrenaline and cortisol into the blood; peace lowers blood pressure and calms clotting and inflammation. The blood carries the mind's chemistry everywhere.","Prov 17:22"],
 ["mind","dna","Stress hormones in the blood enter cells and switch genes on or off. Repeated states leave epigenetic marks; meditation, connection and care shift gene expression.","Rom 12:2"],
 ["mind","seed","The brain's hormonal axis (hypothalamus → pituitary → gonads) runs reproduction. Chronic stress suppresses it; peace supports it.","1 Sam 1:18"],
 ["body","blood","Bone marrow makes about 2–3 million red cells a second; blood feeds every tissue and carries repair cells to wounds.","Lev 17:11"],
 ["body","dna","Every cell holds the full DNA script; the body's activity (exercise, sleep, food) changes which genes are read. DNA repair runs every day.","Ps 139:14"],
 ["blood","dna","White blood cells carry DNA; fragments of DNA float freely in plasma (cell-free DNA), readable by doctors. Immune cells rewrite their own DNA to remember invaders.","Acts 17:26"],
 ["blood","seed","The blood–testis barrier guards developing sperm from the immune system. Blood brings the hormones and nutrients that build sperm and eggs. In pregnancy, baby's DNA appears in mother's blood.","Heb 2:14"],
 ["seed","dna","Seed is DNA's vehicle between generations: a new shuffle of genes, a largely reset epigenome, and a few marks and RNAs that may carry the parents' recent life.","Gen 1:11"],
 ["body","seed","Nutrition, age, heat, smoking and alcohol all affect sperm and egg quality. Seed is made by the body, so it reflects how the body is cared for.","1 Cor 6:19-20"]
];
const GENS=[
 {k:"Genes",d:"A new shuffle every generation. Not chosen, but not destiny.",c:"--violet",w:100},
 {k:"Epigenetic marks",d:"Mostly erased at conception; a few may pass on. Rewritable through life.",c:"--glory",w:25},
 {k:"Microbiome",d:"Babies receive their first gut bacteria from their mother at birth and in breastfeeding.",c:"--living",w:60},
 {k:"Habits & home",d:"Food, sleep, conflict styles, faith practices: learned by watching.",c:"--living",w:90},
 {k:"Beliefs & stories",d:"What children hear about God, themselves and the world becomes their inner voice.",c:"--glory",w:95},
 {k:"Blessing",d:"Words spoken over children shape identity (Gen 49; Num 6:24-26).",c:"--glory",w:85}
];
R.web={html:()=>`
${W.head("DNA & blood · The living web","Mind, body, seed, blood and DNA: one living web","None of these works alone. Every thread pulls on the others, and all of them sit within the spirit's union with God. Tap any connection line to see how two parts talk to each other.")}
<section class="split">
 <div class="panel"><div class="diagram"><svg id="webSvg" viewBox="0 0 600 470" style="min-width:320px" role="img" aria-label="Network of mind, body, blood, seed and DNA">
  <circle cx="300" cy="235" r="78" fill="var(--glory-soft)" stroke="var(--glory)" stroke-dasharray="4 6"><animate attributeName="r" values="74;82;74" dur="5s" repeatCount="indefinite"/></circle>
  <text x="300" y="230" text-anchor="middle" font-family="var(--f-display)" font-size="18" fill="var(--fg)">Spirit</text><text x="300" y="248" text-anchor="middle" font-size="10" fill="var(--muted)">union with God · Acts 17:28</text>
  ${EDGES.map(([a,b],i)=>{const A=NODES[a],B=NODES[b];return`<g class="edge" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="transparent" stroke-width="16"/><line class="eline flow-dash" x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="var(--muted)" stroke-opacity=".45" stroke-width="2"/><circle r="4" fill="var(${A.c})"><animateMotion dur="${3+i%4}s" repeatCount="indefinite" path="M${A.x} ${A.y} L${B.x} ${B.y}"/></circle></g>`}).join("")}
  ${Object.entries(NODES).map(([k,n])=>`<g><circle cx="${n.x}" cy="${n.y}" r="40" fill="var(--bg2)" stroke="var(${n.c})" stroke-width="2.5"/><text x="${n.x}" y="${n.y+5}" text-anchor="middle" font-family="var(--f-display)" font-size="17" fill="var(--fg)">${n.l}</text></g>`).join("")}
 </svg></div></div>
 <div class="panel" id="webOut" style="display:flex;flex-direction:column;gap:12px"></div>
</section>
${W.sec("Follow one thought through the whole web","A single belief, traced through every part. Press play.",`
<div class="panel"><div class="row" style="justify-content:space-between"><div class="seg" id="traceSeg"><button type="button" data-v="lie" aria-pressed="true">"I'm not safe"</button><button type="button" data-v="truth" aria-pressed="false">"I am held by the Father"</button></div><button class="btn primary" type="button" id="tracePlay">Play the trace</button></div>
<ol class="steps" id="traceList" style="margin-top:16px"></ol></div>`)}
${W.sec("What passes from you to your children","Bar length shows roughly how much each channel shapes the next generation (illustrative). Most of it is not in cells.",`
<div class="panel" style="display:flex;flex-direction:column;gap:10px" id="gensBars">${GENS.map(g=>`<div class="meter" style="grid-template-columns:150px 1fr"><span><b>${g.k}</b><br><span class="muted" style="font-size:.78rem">${g.d}</span></span><div class="bar" style="height:12px"><i data-w="${g.w}" style="background:var(${g.c})"></i></div></div>`).join("")}</div>`)}
${W.sec("Generational patterns: love outlasts iniquity","'Visiting the iniquity of the fathers on the children to the third and fourth generation of those who hate me, but showing steadfast love to thousands of those who love me' (Exod 20:5-6). Watch the scale.",`
<div class="panel"><div class="diagram"><svg viewBox="0 0 720 200" role="img" aria-label="Iniquity to four generations versus love to a thousand">
 <text x="10" y="40" font-size="11" fill="var(--stress)">patterns of harm</text>
 ${[0,1,2,3].map(i=>`<rect x="${130+i*14}" y="28" width="10" height="16" rx="3" fill="var(--stress)" opacity="${1-i*.2}"><animate attributeName="opacity" values="0;${1-i*.2}" dur=".4s" begin="${i*.2}s" fill="freeze"/></rect>`).join("")}
 <text x="200" y="40" font-size="10" fill="var(--muted)">3–4 generations</text>
 <text x="10" y="100" font-size="11" fill="var(--living)">steadfast love</text>
 <rect x="130" y="88" width="0" height="16" rx="3" fill="var(--living)"><animate attributeName="width" from="0" to="570" dur="4s" fill="freeze"/></rect>
 <text x="700" y="125" text-anchor="end" font-size="10" fill="var(--muted)">to a thousand generations (Deut 7:9)</text>
 <text x="360" y="170" text-anchor="middle" font-size="11.5" fill="var(--fg)">God's design tilts overwhelmingly toward blessing.</text>
 <text x="360" y="188" text-anchor="middle" font-size="10.5" fill="var(--muted)">And 'the son shall not suffer for the iniquity of the father' (Ezek 18:20): patterns can be broken.</text>
</svg></div></div>
<div class="grid two">
 <div class="card"><span class="tag s">The legal reading</span><p>God punishes children for their parents' sins; you're under a 'generational curse' until you find and break every one. This breeds fear and endless searching.</p></div>
 <div class="card"><span class="tag l">The relational reading</span><p style="color:var(--fg)">'Visiting' describes how broken patterns naturally ripple through families: through genes, stress, habits and beliefs, as science now confirms. But in Christ the curse is already broken (Gal 3:13-14), and you can consciously stop passing on what hurt you and start passing on blessing.</p></div>
</div>`)}
${W.sec("Steps: from inherited patterns to handed-on blessing",null,`<div class="panel">${W.steps([
 "<b>Map it:</b> draw three generations of your family. Mark patterns (anger, anxiety, addiction, illness, faith, generosity). No blame, just noticing.",
 "<b>Own your part:</b> 'I see this pattern in me.' Confession is agreeing with reality, not condemning yourself (1 John 1:9).",
 "<b>Receive the new headship:</b> 'I am no longer defined by this line. I am in Christ, the last Adam' (2 Cor 5:17).",
 "<b>Rewire it:</b> use the R.E.N.E.W. exchange on the belief behind the pattern, and practise the opposite behaviour daily.",
 "<b>Steward the body:</b> sleep, food, movement and stress care change the marks you carry and the seed you pass on.",
 "<b>Bless forward:</b> speak blessing over your children and grandchildren regularly (Num 6:24-26). Tell them the stories of God's faithfulness (Ps 78:4-7).",
 "<b>Get help</b> for deep patterns like addiction or abuse: counselling and community are God's provision."])}</div>
<div class="row"><a class="btn primary" href="#rewire">Open the Rewire studio →</a></div>`)}
`,mount(){
  const show=i=>{const [a,b,d,v]=EDGES[i];$$("#webSvg .eline").forEach((l,j)=>{l.setAttribute("stroke",j===i?"var(--glory)":"var(--muted)");l.setAttribute("stroke-width",j===i?4:2);l.setAttribute("stroke-opacity",j===i?1:.45)});
   $("#webOut").innerHTML=`<span class="tag g">Connection ${i+1} of ${EDGES.length}</span><h3>${NODES[a].l} ↔ ${NODES[b].l}</h3><p>${d}</p><span class="ref">${v}</span><div class="row"><button class="btn" type="button" id="wp">← Prev</button><button class="btn primary" type="button" id="wn">Next connection →</button></div>`;
   $("#wp").onclick=()=>show((i+EDGES.length-1)%EDGES.length);$("#wn").onclick=()=>show((i+1)%EDGES.length)};
  $$("#webSvg .edge").forEach(g=>{g.addEventListener("click",()=>show(+g.dataset.i));g.addEventListener("keydown",e=>{if(e.key==="Enter")show(+g.dataset.i)})});show(2);
  W.fillMeters($("#gensBars"));
  const TR={lie:["<b>Mind:</b> 'I'm not safe' is believed, often without words.","<b>Brain:</b> amygdala fires; hypothalamus orders the stress response.","<b>Blood:</b> cortisol and adrenaline flood the bloodstream; blood pressure and sugar rise.","<b>Body:</b> muscles tense, digestion slows, sleep suffers, inflammation rises over time.","<b>DNA:</b> stress hormones switch on defence and inflammation genes; repeated over years, marks set in and telomeres shorten.","<b>Seed:</b> stress suppresses reproductive hormones and may alter sperm quality and small RNAs.","<b>Next generation:</b> children absorb the anxiety through home life, and possibly a little through biology."],
   truth:["<b>Spirit & mind:</b> 'I am held by the Father' is received (Rom 8:15-16).","<b>Brain:</b> prefrontal cortex calms the amygdala; the vagus nerve takes charge.","<b>Blood:</b> stress hormones settle; oxytocin and calm signals circulate; blood pressure falls.","<b>Body:</b> digestion, sleep and repair run fully; inflammation stays low.","<b>DNA:</b> repair and immune-defence genes are favoured; healthier telomere biology.","<b>Seed:</b> reproductive hormones flow normally; seed is formed in a body at rest.","<b>Next generation:</b> children grow up with a calm, secure parent: the strongest inheritance of all."]};
  let mode="lie",timer=null;
  const list=(n)=>{$("#traceList").innerHTML=TR[mode].map((t,i)=>`<li style="opacity:${n==null||i<n?1:.25};transition:opacity .4s"><div>${t}</div></li>`).join("")};
  $$("#traceSeg button").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.v;$$("#traceSeg button").forEach(x=>x.setAttribute("aria-pressed",x===b));clearInterval(timer);list()}));
  $("#tracePlay").onclick=()=>{clearInterval(timer);let n=0;list(0);timer=setInterval(()=>{if(!$("#traceList")){clearInterval(timer);return}n++;list(n);if(n>=7)clearInterval(timer)},reduce?50:900)};
  list();
}};
})();
