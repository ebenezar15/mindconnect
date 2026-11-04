/* MindConnect — rooms part 1: start, mind, brain, loop, body, lab, likes */
(function(){
const {$,$$,esc,store,toast,openDrawer,W,neuralCanvas,brainSVG,loopSVG,reduce}=window.MC;
const D=window.DATA;
const LINKS={
  atlas:"https://claude.ai/artifact/VvAV843erjk4ofTEgpQTur",
  rewiring:"https://claude.ai/artifact/SwXxVptjyakDBJ7RxNbX12",
  hubs:"https://claude.ai/artifact/QxUv58GxpmdLyom2fzHhgp"
};
const ext=(app,hash,label)=>`<a href="${LINKS[app]}${hash?"#"+hash:""}" target="_blank" rel="noopener">${label} ↗</a>`;
window.MC.LINKS=LINKS;window.MC.ext=ext;

window.ROOMS_META=[
 {id:"home",n:"00",grp:"Begin",label:"Start here"},
 {id:"mind",n:"01",grp:"The mind",label:"What is the mind?"},
 {id:"brain",n:"02",grp:"The mind",label:"Brain map"},
 {id:"loop",n:"03",grp:"The mind",label:"How the mind works"},
 {id:"body",n:"04",grp:"Mind & body",label:"Mind–body connection"},
 {id:"lab",n:"05",grp:"Mind & body",label:"Activity lab"},
 {id:"likes",n:"06",grp:"Mind & body",label:"Likes & lies that feel true"},
 {id:"toxic",n:"07",grp:"Fruit & roots",label:"Toxic vs life-giving"},
 {id:"sickness",n:"08",grp:"Fruit & roots",label:"Sickness, genes & healing"},
 {id:"life",n:"09",grp:"Fruit & roots",label:"Beliefs & long life"},
 {id:"faith",n:"10",grp:"Faith",label:"Faith that moves mountains"},
 {id:"adam",n:"11",grp:"Faith",label:"Why renew after Jesus?"},
 {id:"ot",n:"12",grp:"Faith",label:"OT pioneers"},
 {id:"design",n:"13",grp:"Pain & suffering",label:"Designed for life"},
 {id:"pain",n:"14",grp:"Pain & suffering",label:"How pain works"},
 {id:"message",n:"15",grp:"Pain & suffering",label:"The message of pain"},
 {id:"birth",n:"16",grp:"Pain & suffering",label:"Childbirth without the curse"},
 {id:"dna",n:"17",grp:"DNA & blood",label:"DNA: the living script"},
 {id:"inchrist",n:"18",grp:"DNA & blood",label:"In Adam, in Christ"},
 {id:"blood",n:"19",grp:"DNA & blood",label:"The blood"},
 {id:"seed",n:"20",grp:"DNA & blood",label:"The seed"},
 {id:"web",n:"21",grp:"DNA & blood",label:"The living web"},
 {id:"heal",n:"22",grp:"Self-healing",label:"The healing body"},
 {id:"mindheal",n:"23",grp:"Self-healing",label:"The healing mind"},
 {id:"rewire",n:"24",grp:"Practice",label:"Rewire studio"},
 {id:"refs",n:"25",grp:"Practice",label:"Sources & sister apps"}
];
const R=window.ROOMS={};

/* ======================= 00 HOME ======================= */
R.home={html:()=>`
<section class="hero"><canvas id="heroCv" aria-hidden="true"></canvas>
 <div class="hero-in">
  <div class="copy">
   <span class="mono" style="color:var(--glory)">MindConnect · a relational gospel field guide</span>
   <h1>Your mind is where heaven meets your body.</h1>
   <p>Explore what the mind is, where it lives in the brain, how it shapes your body and your life, and how the Father renews it through Jesus. Scripture, psychology and physiology, side by side.</p>
   <div class="row"><a class="btn primary" href="#mind">Begin the journey</a><a class="btn" href="#rewire">Go to the Rewire studio</a></div>
  </div>
  <div class="panel" style="background:var(--bg);display:flex;flex-direction:column;gap:12px">
   <span class="mono muted">The thesis in one loop</span>
   <div class="diagram"><svg viewBox="-22 0 464 250" style="min-width:0" role="img" aria-label="Belief to body to life cycle">
    ${[["Who God is",70,50,"--glory"],["Who I am",210,30,"--glory"],["What I believe",350,50,"--violet"],["What I feel",370,160,"--violet"],["What my body does",250,220,"--stress"],["How I live",110,220,"--living"],["What I reap",40,150,"--living"]].map(([t,x,y,c],i,a)=>{const n=a[(i+1)%a.length];return`<line x1="${x}" y1="${y}" x2="${n[1]}" y2="${n[2]}" stroke="var(${c})" stroke-opacity=".5" stroke-width="2" class="flow-dash"/>`}).join("")}
    ${[["Who God is",70,50,"--glory"],["Who I am",210,30,"--glory"],["What I believe",350,50,"--violet"],["What I feel",370,160,"--violet"],["What my body does",250,220,"--stress"],["How I live",110,220,"--living"],["What I reap",40,150,"--living"]].map(([t,x,y,c])=>`<g><circle cx="${x}" cy="${y}" r="6" fill="var(${c})"/><rect x="${x-58}" y="${y+9}" width="116" height="20" rx="10" fill="var(--bg2)"/><text x="${x}" y="${y+23}" text-anchor="middle" font-size="11.5" fill="var(--fg)">${t}</text></g>`).join("")}
    <text x="210" y="128" text-anchor="middle" font-family="var(--f-display)" font-size="17" fill="var(--fg)">Renew here →</text>
    <text x="210" y="146" text-anchor="middle" font-size="10.5" fill="var(--muted)">change the image of God, and everything downstream follows</text>
   </svg></div>
  </div>
 </div>
</section>
${W.sec("The questions this app answers","Pick any door. Each room has a living diagram, the science, the Scripture, and a practice.",`
<div class="big-q">
 ${[["mind","What is the mind, and where is it?","Mind vs brain, heart (lev) and spirit, and how God designed it."],
   ["brain","Which brain regions are involved?","Tap 12 regions and watch stress 'flip the lid'."],
   ["loop","How does the mind process life?","Event → belief → thought → feeling → body → action → outcome."],
   ["body","How does the mind heal or harm the body?","Stress axis vs rest-and-repair, placebo, healing and restoration."],
   ["lab","What happens in my brain when I…","Sex, porn, conversation, worry, music, sport, nature, reading, work."],
   ["likes","Why do I like what I like? Why do lies feel true?","Design, genes, reward learning, wounds, and the repetition trap."],
   ["toxic","What is toxic in my mind?","12 patterns: the lie, the body cost, the life cost, the antidote."],
   ["sickness","How are sicknesses formed?","Genes, epigenetics, stress, ACEs, and both healing pathways."],
   ["life","Does what I believe shape my life and lifespan?","Expectation, long life, immortality, and a renewed mind."],
   ["faith","Is Mark 11:23-24 true? Why do some oppose it?","The faith of God, doubt as a divided heart, and the opposition map."],
   ["adam","Why renew the mind after Jesus, and not with Adam?","From Eden to Pentecost: why renewal needed a new heart first."],
   ["ot","Who walked in this before Christ?","Abraham, Joseph, Caleb, Hannah, David, Elijah, Daniel and more."],
   ["design","Was my body designed for sickness and death?","Eden to resurrection, repair systems, and how stress wears down telomeres."],
   ["pain","How is pain made? How does suffering form?","Animated pain pathway, a danger meter, and the layers of suffering."],
   ["message","If God isn't the author of pain, what is it saying?","What Jesus did with pain, Paul Brand's 'gift of pain', and decoding its message."],
   ["birth","Is childbirth pain God's curse?","The Hebrew of Gen 3:16, the hormones of birth, and gentler delivery."],
   ["dna","How is DNA formed, and what gets written into it?","Seven animated stages, epigenetic marks, and how the mind switches genes."],
   ["inchrist","If Adam's inheritance is automatic, why not Christ's?","Two heads of humanity, the inside-out unfolding, and where the legal gospel fails."],
   ["blood","How are blood, DNA and the mind connected?","A live blood vessel, the connection map, Scripture's blood threads and a myth check."],
   ["seed","What does the seed (sperm and egg) carry?","The sperm assembly line, three nested generations, mind → hormones → seed, and the biblical Seed."],
   ["web","How do mind, body, seed, blood and DNA connect?","A tappable web of ten connections, one thought traced through all of them, and generational blessing."],
   ["heal","How did God design the body to heal itself?","Four animated healing phases, ten repair systems, and the mind's hand on the healing dial."],
   ["mindheal","Does the mind heal itself?","The mind's built-in healing tools, what gets it stuck, and Jesus healing Peter's memory."]
 ].map(([h,b,s])=>`<a href="#${h}"><b>${b}</b><span>${s}</span></a>`).join("")}
</div>`)}
<section class="grid two">
 <div class="card"><span class="tag g">The relational gospel lens</span>
  <p style="color:var(--fg)">"Jesus did not come to change the Father's mind about us but to change our mind about the Father."</p>
  <p>Sin is first a sickness of perception: we were "alienated… in your mind" (Col 1:21). Salvation is union restored. Renewal is the mind waking up to what is already true in Christ. Repentance (<i>metanoia</i>) is literally a change of mind.</p></div>
 <div class="card"><span class="tag l">How to use MindConnect</span>
  ${W.list(["Read a room in order or jump by question.","Tap anything that glows: regions, nodes, cards and pills open detail.","Every room ends with practical, Scripture-backed steps.","The Rewire studio saves your truth cards and 40-day tracker in this browser only.","This is a teaching tool, not medical advice. Keep seeing your doctor and counsellor."])}</div>
</section>
${W.verse("Do not be conformed to this world, but be transformed by the renewing of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.","Romans 12:2")}
`,mount(){const cv=$("#heroCv");if(cv)neuralCanvas(cv)}};

/* ======================= 01 MIND ======================= */
const LAYERS=[
 {k:"Spirit",r:190,c:"--glory",greek:"pneuma · ruach",d:"The deepest you: the place of union with God. 'He who is joined to the Lord becomes one spirit with him' (1 Cor 6:17). In the relational gospel this union is the starting point, not the reward.",v:["1 Cor 6:17","Rom 8:16","Prov 20:27"]},
 {k:"Heart",r:155,c:"--glory",greek:"lev (Heb) · kardia",d:"In Hebrew thought the heart is the whole inner person: thought, will, memory and emotion. 'The heart thinks.' It holds your core beliefs and images, the ones you live from rather than the ones you recite.",v:["Prov 4:23","Prov 23:7","Ezek 36:26","Matt 12:34"]},
 {k:"Mind",r:122,c:"--violet",greek:"nous · dianoia · phronēma",d:"Nous is the faculty of perceiving and understanding; dianoia is the thinking-through; phronēma is the mindset or 'set' of the mind. Alienation from God lives here (Col 1:21) and renewal happens here (Rom 12:2).",v:["Rom 12:2","Col 1:21","Rom 8:6","1 Cor 2:16"]},
 {k:"Soul",r:90,c:"--violet",greek:"nephesh · psychē",d:"Nephesh means 'living being' or the whole breathing self (Gen 2:7). The soul includes emotions, desires and will. It can be downcast and it can be restored (Ps 23:3, Ps 42:5).",v:["Gen 2:7","Ps 23:3","Ps 42:5","3 John 2"]},
 {k:"Brain & nerves",r:60,c:"--living",greek:"the instrument",d:"About 86 billion neurons and trillions of connections. The brain is not the mind, but the mind runs through it, and every thought physically reshapes it. Includes the heart's and gut's own nerve networks.",v:["Ps 139:14"]},
 {k:"Body",r:30,c:"--living",greek:"sōma · basar",d:"Not a souvenir of Adam but a sanctuary for Christ (1 Cor 6:19). The body carries the mind's story in posture, hormones, immunity and gene expression, and it can be healed.",v:["1 Cor 6:19-20","Rom 8:11","1 Thess 5:23"]}
];
R.mind={html:()=>`
${W.head("Room 01 · The mind","What is the mind, and where is it?","Scientists still debate what the mind is. Scripture gives a richer picture than 'the brain at work', and the best current science points in a surprisingly relational direction.")}
<section class="split">
 <div class="panel"><div class="row" style="justify-content:space-between"><span class="mono muted">Layers of a person · tap a ring</span><span class="tag v">1 Thess 5:23</span></div>
  <div class="diagram"><svg id="layers" viewBox="0 0 420 420" style="min-width:280px" role="img" aria-label="Layers of a person">
  ${LAYERS.map((l,i)=>`<g class="layer" data-i="${i}" tabindex="0" role="button" aria-label="${l.k}" style="cursor:pointer"><circle cx="210" cy="210" r="${l.r}" fill="var(${l.c})" fill-opacity="${.05+i*.035}" stroke="var(${l.c})" stroke-opacity=".6" stroke-width="1.5"/></g>`).join("")}
  ${LAYERS.map((l,i)=>`<text x="210" y="${i===5?214:210-l.r+20}" text-anchor="middle" font-size="${i<2?14:12.5}" font-weight="700" fill="var(--fg)" pointer-events="none">${l.k}</text>`).join("")}
  <circle r="4" fill="var(--glory)"><animateMotion dur="7s" repeatCount="indefinite" path="M210 20 A190 190 0 1 1 209.9 20"/></circle>
  </svg></div></div>
 <div class="panel" id="layerOut" style="display:flex;flex-direction:column;gap:12px"></div>
</section>
${W.sec("Mind and brain are not the same thing","The brain is the instrument; the mind is the music being played, and the musician learns by playing.",`
<div class="grid">
 <div class="card"><span class="tag v">Science says</span><h4>An embodied, relational process</h4><p>Psychiatrist Daniel Siegel defines the mind as "an embodied and relational process that regulates the flow of energy and information." It runs through your brain, your whole body (heart, gut, nervous system) and your relationships.</p></div>
 <div class="card"><span class="tag g">Scripture says</span><h4>The heart thinks</h4><p>The Bible rarely separates thinking from feeling. "As he thinks in his heart" (Prov 23:7). The <i>lev</i> is the control centre, and the <i>nous</i> is how it perceives. Both can be darkened or renewed.</p></div>
 <div class="card"><span class="tag l">Two-way street</span><h4>Mind changes brain, brain changes mind</h4><p>Neuroplasticity: repeated thoughts physically rewire neurons ("neurons that fire together wire together"). And brain states (sleep loss, hormones, injury) colour the mind. Grace for the body, responsibility for the thought.</p></div>
 <div class="card"><span class="tag s">So where is it?</span><h4>Everywhere you are connected</h4><p>There is no single 'mind spot'. The prefrontal cortex is its executive seat, the limbic system its emotional engine, the body its sounding board, and relationships its shaping environment.</p></div>
</div>`)}
${W.sec("How God designed the mind","Seven design features you can see in both Scripture and physiology.",`
<div class="grid">
 ${[["Designed for union","Made to live from God, not apart from him. 'In him we live and move and have our being' (Acts 17:28). Alienation 'in the mind' (Col 1:21) is the core injury.","--glory"],
   ["Designed for connection","'It is not good for the man to be alone' (Gen 2:18) was the first 'not good'. Brains are wired in relationship: babies borrow their parents' calm before they have their own.","--living"],
   ["Designed to behold and become","'Beholding… we are being transformed into the same image' (2 Cor 3:18). Mirror neurons and imitation make us like what we look at.","--glory"],
   ["Designed to change","Plasticity at every age is grace built into biology. No pattern is permanent.","--living"],
   ["Designed with an alarm","Fear is a gift for real danger. The fall turned it toward God ('I was afraid… I hid', Gen 3:10).","--stress"],
   ["Designed to rest","Sleep consolidates memory and clears toxins from the brain (the glymphatic system). Sabbath is built into the body too.","--violet"],
   ["Designed to be renewed by the Spirit","'You have the mind of Christ' (1 Cor 2:16). The Spirit shares Jesus' own way of seeing with us.","--glory"]
 ].map(([t,d,c])=>`<div class="card"><span class="tag" style="color:var(${c})">●</span><h4>${t}</h4><p>${d}</p></div>`).join("")}
</div>`)}
${W.sec("Two ways to read the mind","Toggle between the legal (separation) lens and the relational (union) lens.",`
<div class="panel"><div class="seg" id="lensSeg"><button type="button" data-v="legal" aria-pressed="false">Legal lens</button><button type="button" data-v="union" aria-pressed="true">Relational lens</button></div><div id="lensOut" style="margin-top:16px"></div></div>`)}
`,mount(){
  const out=$("#layerOut");
  const show=i=>{const l=LAYERS[i];$$("#layers .layer circle").forEach((c,j)=>c.setAttribute("stroke-width",j===i?4:1.5));
   out.innerHTML=`<span class="tag" style="color:var(${l.c})">${l.greek}</span><h3>${l.k}</h3><p>${l.d}</p>${W.scripts(l.v)}<p class="muted" style="font-size:.88rem">Renewal flows from the centre outward: union in the spirit becomes truth in the heart, a renewed mind, a restored soul, a rewired brain and a healthier body.</p>`};
  $$("#layers .layer").forEach(g=>{g.addEventListener("click",e=>{e.stopPropagation();show(+g.dataset.i)});g.addEventListener("keydown",e=>{if(e.key==="Enter")show(+g.dataset.i)})});
  // smallest ring under pointer wins because it's drawn last
  show(2);
  const L={legal:{t:"The mind as a courtroom",l:["God is a judge watching thoughts for violations","Bad thoughts mean guilt; fix them by trying harder","Renewal = behaviour management and sin control","Sickness or struggle may be punishment","Faith = believing the right doctrines to be acquitted"],r:"Fruit: anxiety, hiding, performance, a God to be managed."},
   union:{t:"The mind as a relationship being healed",l:["God is the Father Jesus revealed: love all the way through (Heb 1:3)","Wrong thinking is alienation in the mind (Col 1:21), a sickness to heal","Renewal = waking up to who God is and who you are in Christ","Satan is the accuser, not God (Rev 12:10)","Faith = trust in a known Father's heart; you were in Christ before you knew it"],r:"Fruit: security, honesty, rest, love that overflows."}};
  const lo=$("#lensOut");const set=v=>{$$("#lensSeg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===v));const x=L[v];lo.innerHTML=`<h3>${x.t}</h3><div style="margin-top:10px">${W.list(x.l)}</div><p class="${v==="legal"?"tag s":"tag l"}" style="margin-top:12px">${x.r}</p>`};
  $$("#lensSeg button").forEach(b=>b.addEventListener("click",()=>set(b.dataset.v)));set("union");
}};

/* ======================= 02 BRAIN ======================= */
R.brain={html:()=>`
${W.head("Room 02 · Brain map","Where the mind works in the brain","Tap any glowing region. Then drag the stress slider and watch what happens when the 'lid flips': the thinking brain dims and the alarm takes over.")}
<section class="split">
 <div class="panel brain-wrap"><div class="brain" id="brain">${brainSVG(D.regions)}</div>
  <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
   <label class="lbl" for="stressSl"><span>Stress level</span><span id="stressV">Calm</span></label>
   <input id="stressSl" type="range" min="0" max="100" value="10">
   <p class="muted" style="font-size:.85rem" id="stressNote"></p>
  </div></div>
 <div class="panel" id="regionOut" style="display:flex;flex-direction:column;gap:12px"></div>
</section>
${W.sec("The hand model of the brain","Daniel Siegel's simple picture. Make a fist with your thumb tucked inside.",`
<div class="grid">
 <div class="card"><span class="tag l">Wrist & palm</span><h4>Brainstem: survival</h4><p>Breathing, heart rate, fight-flight-freeze. Fast and automatic.</p></div>
 <div class="card"><span class="tag s">Thumb</span><h4>Limbic system: emotion & memory</h4><p>Amygdala and hippocampus. Tags experience as safe or dangerous.</p></div>
 <div class="card"><span class="tag g">Fingers</span><h4>Cortex: thinking & choosing</h4><p>Fingernails are the prefrontal cortex, wrapping over the emotional brain to calm it.</p></div>
 <div class="card"><span class="tag v">Lift your fingers</span><h4>'Flipping your lid'</h4><p>Under high stress the PFC goes offline. You literally cannot think clearly. First calm the body, then reason. That's why Elijah was fed before he was taught.</p></div>
</div>`)}
${W.sec("Neuroplasticity: how a lie becomes a highway","Every repetition thickens a path; every unused path gets pruned. Press the buttons to see it.",`
<div class="panel"><div class="diagram"><svg id="paths" viewBox="0 0 600 220" role="img" aria-label="Two neural paths">
 <circle cx="40" cy="110" r="22" fill="var(--violet-soft)" stroke="var(--violet)"/><text x="40" y="114" text-anchor="middle" font-size="11" fill="var(--fg)">Trigger</text>
 <path id="pLie" d="M62 105 C 180 20, 380 20, 540 70" fill="none" stroke="var(--stress)" stroke-linecap="round"/>
 <path id="pTruth" d="M62 115 C 180 200, 380 200, 540 150" fill="none" stroke="var(--living)" stroke-linecap="round"/>
 <rect x="470" y="40" width="120" height="30" rx="15" fill="var(--bg2)" stroke="var(--stress)"/><text x="530" y="60" text-anchor="middle" font-size="11.5" fill="var(--fg)">"I'm not enough"</text>
 <rect x="470" y="150" width="120" height="30" rx="15" fill="var(--bg2)" stroke="var(--living)"/><text x="530" y="170" text-anchor="middle" font-size="11.5" fill="var(--fg)">"I am loved"</text>
 <circle r="5" fill="var(--glory)" id="spark"><animateMotion id="sparkAnim" dur="2.2s" repeatCount="indefinite"><mpath href="#pLie"/></animateMotion></circle>
</svg></div>
<div class="row" style="justify-content:space-between;margin-top:10px"><div class="row"><button class="btn teal" id="repTruth" type="button">Rehearse the truth</button><button class="btn" id="repLie" type="button">Rehearse the old thought</button><button class="btn" id="repReset" type="button">Reset</button></div><span class="mono muted" id="repInfo"></span></div>
<p class="muted" style="margin-top:10px;font-size:.92rem">Habits take a median of about 66 days to become automatic (Lally et al., 2009), and deep beliefs often take longer, sometimes 1–3 years. Slips don't erase progress. This is why Scripture talks about meditating "day and night" (Josh 1:8).</p></div>`)}
`,mount(){
  const out=$("#regionOut");
  const show=id=>{const r=D.regions.find(x=>x.id===id);$$(".region").forEach(g=>g.classList.toggle("on",g.dataset.id===id));
   out.innerHTML=`<span class="tag" style="color:var(${r.color})">Brain region</span><h3>${r.name}</h3><p>${r.role}</p><div class="card" style="background:var(--bg)"><span class="tag v">In the mind</span><p style="color:var(--fg)">${r.mind}</p></div><div class="card" style="background:var(--bg)"><span class="tag g">Renewal</span><p style="color:var(--fg)">${r.renew}</p>${W.scripts(r.verses)}</div>`};
  $$(".region").forEach(g=>{g.addEventListener("click",()=>show(g.dataset.id));g.addEventListener("keydown",e=>{if(e.key==="Enter")show(g.dataset.id)})});
  show("pfc");
  const sl=$("#stressSl"),upd=()=>{const s=+sl.value/100;
   const pfc=$('.region[data-id="pfc"]'),amy=$('.region[data-id="amy"]'),hyp=$('.region[data-id="hyp"]'),hip=$('.region[data-id="hip"]');
   pfc.style.opacity=1-s*.8;hip.style.opacity=1-s*.5;
   $("circle.core",amy).setAttribute("r",8+s*10);$("circle.core",hyp).setAttribute("r",8+s*6);
   $("#stressV").textContent=s<.3?"Calm":s<.6?"Alert":s<.85?"Stressed":"Flooded";
   $("#stressNote").textContent=s<.3?"PFC online: you can reflect, choose and connect. The vagus nerve keeps the body in repair mode.":s<.6?"Amygdala warming up. Focus narrows. A good time to breathe slowly and name what you feel.":s<.85?"PFC dimming, amygdala and hypothalamus driving. Cortisol rising, memory (hippocampus) less reliable.":"Lid flipped. Fight, flight, freeze or fawn. Don't argue with yourself now: regulate the body first (breath, movement, safe presence)."};
  sl.addEventListener("input",upd);upd();
  let t=store.get("pathT",1),l=store.get("pathL",8);
  const draw=()=>{$("#pTruth").setAttribute("stroke-width",Math.max(1,t));$("#pLie").setAttribute("stroke-width",Math.max(1,l));
   $("#pLie").setAttribute("stroke-opacity",.35+Math.min(1,l/14)*.65);$("#pTruth").setAttribute("stroke-opacity",.35+Math.min(1,t/14)*.65);
   $("mpath",$("#sparkAnim")).setAttribute("href",t>l?"#pTruth":"#pLie");
   $("#repInfo").textContent=t>l?"The truth is now the default path":"The old path is still the default";store.set("pathT",t);store.set("pathL",l)};
  $("#repTruth").onclick=()=>{t=Math.min(18,t+1.2);l=Math.max(1,l-.5);draw()};
  $("#repLie").onclick=()=>{l=Math.min(18,l+1.2);t=Math.max(1,t-.5);draw()};
  $("#repReset").onclick=()=>{t=1;l=8;draw()};draw();
}};

/* ======================= 03 LOOP ======================= */
const PIPE=[["Experiences","what happened to you, especially early"],["Beliefs","what you concluded about God, self, others"],["Self-concept","'I am…' statements"],["Thoughts","automatic self-talk"],["Behaviours","what you do"],["Character","who you become"],["Life trajectory","where your life goes"]];
R.loop={html:()=>`
${W.head("Room 03 · How the mind works","The mind loop: how a moment becomes a life","The same event can lead to two completely different lives depending on the belief that interprets it. Toggle the loop and tap each step.")}
<section class="split">
 <div class="panel"><div class="row" style="justify-content:space-between"><div class="seg" id="loopSeg"><button type="button" data-v="lie" aria-pressed="true">Lie loop</button><button type="button" data-v="truth" aria-pressed="false">Truth loop</button></div><span class="mono muted">tap a step</span></div>
 <div class="diagram" id="loopSvg" style="margin-top:8px"></div></div>
 <div class="panel" id="loopOut" style="display:flex;flex-direction:column;gap:12px"></div>
</section>
${W.sec("Where to break the loop","You can intervene at every step, but the deepest change happens at the belief filter.",`
<div class="grid">
 ${[["At the event","Change circumstances where wise: boundaries, environment, friends.","Prov 22:3"],
   ["At the belief","Ask God, 'Who told you that?' (Gen 3:11). Trace where the belief came from and exchange it for truth.","John 8:32"],
   ["At the thought","Take it captive: notice, name, question, replace (2 Cor 10:5). Use the Phil 4:8 filter.","Phil 4:8"],
   ["At the feeling","Name it to tame it. Lament honestly. Feelings are messengers, not masters.","Ps 62:8"],
   ["At the body","Breathe, move, sleep, eat, be held. Regulate first, reason second.","1 Kings 19:5-8"],
   ["At the action","Do the opposite action in small steps. Behaviour can lead feelings.","Jas 1:22"]
 ].map(([t,d,v])=>`<div class="card"><h4>${t}</h4><p>${d}</p><span class="ref">${v}</span></div>`).join("")}
</div>`)}
${W.sec("The long version: belief to life trajectory","From the Rewiring study on belief formation. Beliefs produce behaviour that produces evidence for the belief.",`
<div class="panel"><div class="diagram"><svg viewBox="0 0 760 170" role="img" aria-label="Belief pipeline">
 ${PIPE.map(([k,s],i)=>{const x=20+i*105;return`<g><rect x="${x}" y="40" width="96" height="62" rx="12" fill="var(--bg)" stroke="var(${i<2?"--glory":i<4?"--violet":"--living"})"/><text x="${x+48}" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">${k}</text><foreignObject x="${x+4}" y="72" width="88" height="30"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:9.5px;line-height:1.2;color:var(--muted);text-align:center">${s}</div></foreignObject>${i<6?`<path d="M${x+96} 71 L${x+105} 71" stroke="var(--muted)" stroke-width="2"/>`:""}</g>`}).join("")}
 <path class="flow-dash" d="M700 104 C 700 160, 120 160, 120 104" fill="none" stroke="var(--stress)" stroke-width="2"/>
 <text x="410" y="160" text-anchor="middle" font-size="11" fill="var(--stress)">feedback: outcomes become 'evidence' for the original belief</text>
</svg></div>
<p class="muted" style="margin-top:8px">"Jesus is the first person who knows you fully and doesn't leave. This rewires your nervous system." See the full study in ${ext("rewiring","study-belief","Rewiring")}.</p></div>`)}
`,mount(){
  let mode="lie",sel=1;
  const draw=()=>{$("#loopSvg").innerHTML=loopSVG(D.loop,mode);$$("#loopSeg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===mode));
   $$("#loopSvg .loop-node").forEach(g=>{g.addEventListener("click",()=>{sel=+g.dataset.i;out()});g.addEventListener("keydown",e=>{if(e.key==="Enter"){sel=+g.dataset.i;out()}})});out()};
  const out=()=>{const n=D.loop[sel];$$("#loopSvg .loop-node rect").forEach((r,i)=>r.setAttribute("stroke-width",i===sel?3.5:1.6));
   $("#loopOut").innerHTML=`<span class="tag ${mode==="lie"?"s":"l"}">${mode==="lie"?"Lie loop":"Truth loop"} · step ${sel+1} of 7</span><h3>${n.k}: ${esc(n[mode].s)}</h3><p>${n[mode].d}</p>
   <div class="compare"><div class="bad"><b>Lie</b><p>${esc(n.lie.s)}</p></div><div class="ok"><b>Truth</b><p>${esc(n.truth.s)}</p></div></div>
   <div class="row"><button class="btn" type="button" id="lp">← Prev</button><button class="btn primary" type="button" id="ln">Next step →</button></div>`;
   $("#lp").onclick=()=>{sel=(sel+6)%7;out()};$("#ln").onclick=()=>{sel=(sel+1)%7;out()}};
  $$("#loopSeg button").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.v;draw()}));draw();
}};

/* ======================= 04 BODY ======================= */
const SYS=[["Heart & blood pressure","heart"],["Immune balance","imm"],["Inflammation (lower is better)","inf"],["Gut & digestion","gut"],["Sleep quality","sleep"],["Memory (hippocampus)","mem"],["Healing & repair speed","heal"],["Hormone balance","horm"]];
R.body={html:()=>`
${W.head("Room 04 · Mind–body connection","One person, not two parts","God made you a nephesh, a living being of dust and breath (Gen 2:7). The mind talks to the body through nerves, hormones and the immune system every second. Move the sliders to see two lifestyles of the mind.")}
<section class="split">
 <div class="panel" style="display:flex;flex-direction:column;gap:14px">
  <span class="mono muted">Two pathways from a thought to your cells</span>
  <div class="diagram"><svg id="axes" viewBox="0 0 520 300" role="img" aria-label="HPA stress axis and vagal calm pathway">
   <rect x="200" y="10" width="120" height="36" rx="18" fill="var(--bg)" stroke="var(--glory)"/><text x="260" y="33" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--fg)">A belief / thought</text>
   <g id="hpa">
    ${[["Hypothalamus",120,80],["Pituitary",90,135],["Adrenals",70,190],["Cortisol + adrenaline",80,250]].map(([t,x,y],i,a)=>`<rect x="${x-62}" y="${y-15}" width="124" height="30" rx="15" fill="var(--bg)" stroke="var(--stress)"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" fill="var(--fg)">${t}</text>${i<3?`<path class="flow-dash" d="M${x} ${y+15} L ${a[i+1][1]} ${a[i+1][2]-15}" stroke="var(--stress)" stroke-width="2"/>`:""}`).join("")}
    <path class="flow-dash" d="M230 46 L 140 65" stroke="var(--stress)" stroke-width="2"/>
   </g>
   <g id="vag">
    ${[["Prefrontal calm",400,80],["Vagus nerve",430,135],["Heart · lungs · gut",450,190],["Rest, digest, repair",440,250]].map(([t,x,y],i,a)=>`<rect x="${x-66}" y="${y-15}" width="132" height="30" rx="15" fill="var(--bg)" stroke="var(--living)"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" fill="var(--fg)">${t}</text>${i<3?`<path class="flow-dash" d="M${x} ${y+15} L ${a[i+1][1]} ${a[i+1][2]-15}" stroke="var(--living)" stroke-width="2"/>`:""}`).join("")}
    <path class="flow-dash" d="M290 46 L 380 65" stroke="var(--living)" stroke-width="2"/>
   </g>
   <text x="80" y="290" text-anchor="middle" font-size="10.5" fill="var(--stress)">HPA axis · survival mode</text>
   <text x="440" y="290" text-anchor="middle" font-size="10.5" fill="var(--living)">Parasympathetic · repair mode</text>
  </svg></div>
  <label class="lbl" for="slStress"><span>Chronic stress, fear, bitterness</span><span id="vS"></span></label><input id="slStress" type="range" min="0" max="100" value="70">
  <label class="lbl" for="slPeace"><span>Peace, trust, connection, gratitude</span><span id="vP"></span></label><input id="slPeace" type="range" min="0" max="100" value="25">
 </div>
 <div class="panel" style="display:flex;flex-direction:column;gap:12px"><span class="mono muted">Your body systems (illustrative)</span><h3 id="bodyMode">Survival mode</h3><div class="meters" id="sysMeters"></div><p class="muted" id="bodyTxt" style="font-size:.92rem"></p></div>
</section>
${W.sec("Purpose: why God connected mind and body","Integration is a design feature, not a flaw.",`
<div class="grid">
 <div class="card"><h4>To protect you</h4><p>A threat seen by the mind instantly prepares the body to act. Fear saved lives long before anyone could reason about danger.</p></div>
 <div class="card"><h4>To make truth tangible</h4><p>Peace isn't only an idea: it slows your heart and heals your gut. "A tranquil heart gives life to the flesh" (Prov 14:30).</p></div>
 <div class="card"><h4>To signal the heart</h4><p>Body symptoms often reveal what the mind hasn't admitted: a tight chest, a knotted stomach. "When I kept silent, my bones wasted away" (Ps 32:3).</p></div>
 <div class="card"><h4>To heal as a whole person</h4><p>Jesus healed bodies, forgave sins, restored outcasts to community, and said "your faith has made you whole" (<i>sōzō</i>: save, heal, make whole).</p></div>
</div>`)}
${W.sec("How the mind affects the body",null,W.compare("Positive effects",[
 "<b>Placebo effect:</b> expectation alone releases real endorphins and dopamine; it relieves pain, Parkinson's symptoms and IBS in trials, even when people know it's a placebo",
 "<b>Optimism:</b> linked to 11–15% longer lifespan (Lee et al., PNAS 2019) and lower heart disease",
 "<b>Supportive relationships:</b> wounds heal faster; immune response to vaccines is stronger",
 "<b>Gratitude & worship:</b> better sleep, lower blood pressure, higher heart-rate variability",
 "<b>Forgiveness:</b> lower blood pressure and stress hormones",
 "<b>Purpose:</b> lower risk of dementia, stroke and early death"],
"Negative effects",[
 "<b>Nocebo effect:</b> expecting harm produces real symptoms; people warned about side effects report more of them",
 "<b>Chronic stress:</b> wounds healed about 40% slower in stressed caregivers (Kiecolt-Glaser, 1995)",
 "<b>Hostility:</b> marital conflict slowed wound healing and raised inflammation",
 "<b>Loneliness:</b> switches on inflammatory genes and switches off antiviral genes (Cole, social genomics)",
 "<b>Grief & shock:</b> 'broken heart syndrome' (takotsubo) is a real, stress-induced heart failure",
 "<b>Chronic anxiety:</b> IBS, tension pain, insomnia, hypertension, suppressed immunity"]))}
${W.sec("Healing, reversal and restoration","Your body is already built to heal. The mind largely decides whether it is allowed to.",`
<div class="grid two">
 <div class="panel" style="display:flex;flex-direction:column;gap:12px"><h3>Designed to renew</h3>${W.list([
  "Gut lining renews every 3–5 days; skin every 2–4 weeks",
  "The liver can regrow from as little as 25% of its tissue",
  "Bone is completely remodelled about every 10 years",
  "New neurons form in the adult hippocampus; synapses rewire daily",
  "Repair mostly happens in the parasympathetic 'rest and digest' state, especially in deep sleep"])}
  ${W.verse("My son, be attentive to my words… for they are life to those who find them, and healing (marpe) to all their flesh.","Proverbs 4:20-22")}</div>
 <div class="panel" style="display:flex;flex-direction:column;gap:12px"><h3>How the mind joins in</h3>${W.steps([
  "<b>Feel safe in the Father's love.</b> Safety switches the body from survival to repair.",
  "<b>Release toxic loads:</b> forgive, confess, lament. Shame and bitterness keep the alarm on.",
  "<b>Speak and meditate on life-giving words</b> that build hope and expectation (Prov 18:21).",
  "<b>Steward the body:</b> sleep, food, movement, sunlight, medicine. Common grace is God's grace too.",
  "<b>Pray with others and receive prayer</b> (Jas 5:14-16): healing in community.",
  "<b>Give it time.</b> Many healings in Scripture are instant; many in life are processes ('they will recover', Mark 16:18)."])}</div>
</div>
<p class="note">Honest balance: the mind is powerful but it is not everything. Paul left Trophimus sick (2 Tim 4:20), told Timothy to take wine for his stomach (1 Tim 5:23), and had his own 'thorn' (2 Cor 12:7). Never tell a sick person their illness proves weak faith. Jesus never did.</p>`)}
`,mount(){
  const m=$("#sysMeters");
  const upd=()=>{const s=+$("#slStress").value,p=+$("#slPeace").value;$("#vS").textContent=s;$("#vP").textContent=p;
   const base=v=>Math.max(4,Math.min(98,Math.round(v)));
   const vals={heart:base(70-s*.45+p*.3),imm:base(65-s*.5+p*.35),inf:base(20+s*.65-p*.35),gut:base(68-s*.5+p*.3),sleep:base(70-s*.55+p*.3),mem:base(72-s*.4+p*.25),heal:base(62-s*.5+p*.4),horm:base(66-s*.45+p*.3)};
   m.innerHTML=SYS.map(([n,k])=>{const v=vals[k];const bad=k==="inf"?v>50:v<45;return`<div class="meter"><span style="font-size:.8rem">${n}</span><div class="bar"><i style="width:${v}%;background:var(${bad?"--stress":"--living"})"></i></div><span class="v">${v}</span></div>`}).join("");
   const net=p-s;$("#bodyMode").textContent=net>25?"Repair mode":net>-15?"Mixed signals":"Survival mode";
   $("#bodyTxt").textContent=net>25?"The vagus nerve is in charge. Digestion, immunity and tissue repair get priority. This is the state in which the body heals best.":net>-15?"The body swings between alarm and rest. Short stress is healthy; the key is how quickly you return to peace.":"Cortisol stays high. Over months the immune system stops responding to it, inflammation rises, sleep and memory suffer, and healing slows.";
   $("#hpa").style.opacity=.25+s/100*.75;$("#vag").style.opacity=.25+p/100*.75};
  $("#slStress").addEventListener("input",upd);$("#slPeace").addEventListener("input",upd);upd();
}};

/* ======================= 05 LAB ======================= */
R.lab={html:()=>`
${W.head("Room 05 · Activity lab","What happens in your brain when you…","Choose an activity, then switch between the right way and the wrong way. The bars show illustrative relative levels of six brain chemicals; the text explains the science and the Scripture.")}
<div class="pills" id="actPills">${D.activities.map((a,i)=>`<button class="pill" type="button" data-i="${i}" aria-pressed="${i===0}">${a.name}</button>`).join("")}</div>
<section class="split">
 <div class="panel" style="display:flex;flex-direction:column;gap:14px">
  <div class="row" style="justify-content:space-between"><h3 id="actName"></h3><div class="seg" id="waySeg"><button type="button" data-v="right" aria-pressed="true">Right way</button><button type="button" data-v="wrong" aria-pressed="false">Wrong way</button></div></div>
  <div id="actMeters"></div>
  <div class="row" style="gap:14px;font-size:.78rem;color:var(--muted)"><span><b style="color:var(--glory)">■</b> reward & pleasure</span><span><b style="color:var(--living)">■</b> bonding</span><span><b style="color:var(--violet)">■</b> contentment</span><span><b style="color:var(--stress)">■</b> stress</span></div>
  <p id="actBrain"></p>
 </div>
 <div class="panel" style="display:flex;flex-direction:column;gap:12px" id="actRight"></div>
</section>
${W.sec("How the reward system learns","The same circuitry that makes you love your spouse, music or prayer can be hijacked. That's why the right way matters.",`
<div class="panel"><div class="diagram"><svg viewBox="0 0 700 150" role="img" aria-label="Habit loop">
 ${["Root need","Cue","Craving (dopamine)","Routine","Reward","Aftermath"].map((t,i)=>{const x=20+i*115;const c=i===0?"--glory":i===5?"--stress":"--violet";return`<rect x="${x}" y="45" width="100" height="44" rx="22" fill="var(--bg)" stroke="var(${c})"/><text x="${x+50}" y="71" text-anchor="middle" font-size="11.5" fill="var(--fg)">${t}</text>${i<5?`<path d="M${x+100} 67 L${x+115} 67" stroke="var(--muted)" stroke-width="2"/>`:""}`}).join("")}
 <path class="flow-dash" d="M645 92 C 645 140, 70 140, 70 92" fill="none" stroke="var(--stress)" stroke-width="2"/>
 <text x="350" y="20" text-anchor="middle" font-size="12" fill="var(--muted)">Meet the root need in love and the loop loses its power (Atlas · Habits, healing & help)</text>
</svg></div></div>`)}
`,mount(){
  let i=0,way="right";
  const draw=()=>{const a=D.activities[i];
   if(!a.right&&way==="right")way="wrong";
   $$("#actPills .pill").forEach(p=>p.setAttribute("aria-pressed",+p.dataset.i===i));
   $$("#waySeg button").forEach(b=>{b.setAttribute("aria-pressed",b.dataset.v===way);b.disabled=b.dataset.v==="right"&&!a.right;b.title=b.disabled?"No healthy version of this activity; see 'the way out'":""});
   $("#actName").textContent=a.name;
   $("#actMeters").innerHTML=W.meters(a[way]||a.wrong,"am");W.fillMeters($("#am"));
   $("#actBrain").innerHTML=a.brain;
   $("#actRight").innerHTML=`<span class="tag ${way==="right"?"l":"s"}">${a.grp}</span>
    <div><b style="color:var(--living)">${a.right?"The right way":"The way out"}</b>${W.list(a.rightWay)}</div>
    <div><b style="color:var(--stress)">The wrong way</b>${W.list(a.wrongWay)}</div>
    <div class="card" style="background:var(--bg)"><span class="tag g">Result</span><p style="color:var(--fg)">${a.result}</p>${W.scripts(a.verses)}</div>`};
  $$("#actPills .pill").forEach(p=>p.addEventListener("click",()=>{i=+p.dataset.i;way=D.activities[i].right?"right":"wrong";draw()}));
  $$("#waySeg button").forEach(b=>b.addEventListener("click",()=>{if(b.disabled)return;way=b.dataset.v;draw()}));draw();
}};

/* ======================= 06 LIKES ======================= */
const FEEL=[
 ["Repetition (illusory truth effect)","Statements heard repeatedly are rated as more true, even when people know they're false. Familiar = fluent = 'feels true'."],
 ["Emotional reasoning","'I feel it, so it must be true.' The insula hands the mind a body state, and the mind writes a story to explain it."],
 ["Implicit memory","Beliefs formed before age 3 are stored without words or a time-stamp. They don't feel like memories; they feel like reality."],
 ["Confirmation bias","The brain notices evidence that fits what it already believes and filters out the rest."],
 ["The predictive brain","The brain predicts the world from past experience and perceives its prediction. A wounded expectation sees rejection everywhere."],
 ["Trusted voices","A lie spoken by a parent, pastor or culture borrows their authority."],
 ["Identity protection","Changing a belief can feel like losing yourself, so the mind defends it."],
 ["Desire","The first lie worked through desire: the fruit was 'good for food… a delight to the eyes' (Gen 3:6). We believe what we want to be true."]
];
R.likes={html:()=>`
${W.head("Room 06 · Likes, preferences and lies","Why you like what you like, and why lies feel true","Some preferences are God's fingerprint on you. Some are learned. Some are wounds dressed up as preferences. Tap each force in the orbit.")}
<section class="split">
 <div class="panel"><div class="diagram"><svg id="orbit" viewBox="0 0 440 400" style="min-width:300px" role="img" aria-label="Forces that shape your likes">
  <circle cx="220" cy="200" r="140" fill="none" stroke="var(--line)" stroke-dasharray="4 6"/>
  <circle cx="220" cy="200" r="50" fill="var(--glory-soft)" stroke="var(--glory)"/><text x="220" y="196" text-anchor="middle" font-family="var(--f-display)" font-size="20" fill="var(--fg)">You</text><text x="220" y="214" text-anchor="middle" font-size="10" fill="var(--muted)">your likes</text>
  <g id="orbitG">${D.likes.map((l,i)=>{const a=-Math.PI/2+i*2*Math.PI/D.likes.length,x=220+140*Math.cos(a),y=200+140*Math.sin(a);return`<g class="orb" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><line x1="220" y1="200" x2="${x}" y2="${y}" stroke="var(${l.c})" stroke-opacity=".35"/><circle cx="${x}" cy="${y}" r="30" fill="var(--bg2)" stroke="var(${l.c})" stroke-width="2"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--fg)">${l.k}</text></g>`}).join("")}</g>
 </svg></div></div>
 <div class="panel" id="likeOut" style="display:flex;flex-direction:column;gap:12px"></div>
</section>
<section class="grid two">
 <div class="card"><span class="tag g">Is it God's design that we differ?</span><p style="color:var(--fg)">Yes. Diversity of gifts, temperament and delight is intentional (Rom 12:4-8; 1 Cor 12:14-20). The Trinity itself is unity without sameness.</p><p>But not every preference is design. Genes, culture, reward learning, wounds and repeated choices all shape what you like. The test is fruit: does this like draw me toward love of God, people and life, or away into isolation and compulsion?</p></div>
 <div class="card"><span class="tag l">Can likes change?</span><p style="color:var(--fg)">Yes. Taste buds adapt to less sugar in a few weeks. Dopamine pathways recalibrate in about 90 days. And "delight yourself in the Lord" (Ps 37:4) works both ways: delight shapes desire.</p><p>Practice: list your top five pleasures. For each one, ask, 'Design, learned, or wound?'</p></div>
</section>
${W.sec("Why a lie can look like the truth","Eight mechanisms that make false beliefs feel real. Then try the repetition engine below.",`
<div class="grid">${FEEL.map(([t,d])=>`<div class="card"><h4>${t}</h4><p>${d}</p></div>`).join("")}</div>`)}
${W.sec("The repetition engine","Hear a lie enough times and it feels true. The same mechanism works for truth.",`
<div class="panel grid two" style="box-shadow:none">
 <div style="display:flex;flex-direction:column;gap:10px"><span class="tag s">The lie</span><h3>"God is holding out on you."</h3><p class="muted" style="font-size:.9rem">The serpent's first lie (Gen 3:1-5) was about God's character, not about fruit.</p><div class="meter" style="grid-template-columns:90px 1fr 40px"><span>Feels true</span><div class="bar"><i id="lieBar" style="background:var(--stress);width:10%"></i></div><span class="v" id="lieV">10%</span></div><button class="btn" id="hearLie" type="button">Hear it again</button></div>
 <div style="display:flex;flex-direction:column;gap:10px"><span class="tag l">The truth</span><h3>"He who did not spare his own Son… will he not graciously give us all things?"</h3><p class="muted" style="font-size:.9rem">Romans 8:32. Meditate, speak it aloud, picture it.</p><div class="meter" style="grid-template-columns:90px 1fr 40px"><span>Feels true</span><div class="bar"><i id="truthBar" style="background:var(--living);width:10%"></i></div><span class="v" id="truthV">10%</span></div><button class="btn teal" id="speakTruth" type="button">Speak the truth aloud</button></div>
</div>
<p class="note">Feelings are messengers, not masters. They tell you what you believe; they don't tell you what is true. "You will know the truth, and the truth will set you free" (John 8:32): the Greek <i>ginōskō</i> means knowing by experience, not just information.</p>`)}
`,mount(){
  const out=$("#likeOut");const show=i=>{const l=D.likes[i];$$("#orbitG .orb circle").forEach((c,j)=>c.setAttribute("stroke-width",j===i?4:2));out.innerHTML=`<span class="tag" style="color:var(${l.c})">Force ${i+1} of ${D.likes.length}</span><h3>${l.t}</h3><p>${l.d}</p><div class="card" style="background:var(--bg)"><span class="tag">Example</span><p style="color:var(--fg)">${l.ex}</p></div>`};
  $$("#orbitG .orb").forEach(g=>{g.addEventListener("click",()=>show(+g.dataset.i));g.addEventListener("keydown",e=>{if(e.key==="Enter")show(+g.dataset.i)})});show(0);
  let a=0,b=0;const f=n=>Math.round(10+85*(1-Math.exp(-n/5)));
  $("#hearLie").onclick=()=>{a++;$("#lieBar").style.width=f(a)+"%";$("#lieV").textContent=f(a)+"%";if(a===6)toast("Six repetitions in, and it already feels familiar")};
  $("#speakTruth").onclick=()=>{b++;$("#truthBar").style.width=f(b)+"%";$("#truthV").textContent=f(b)+"%";if(b===6)toast("The same mechanism now works for you")};
}};
})();
