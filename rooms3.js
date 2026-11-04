/* MindConnect — rooms part 3: Pain & suffering group (designed for life, how pain works, message of pain, childbirth) */
(function(){
const {$,$$,esc,store,toast,openDrawer,W,ext,reduce}=window.MC;
const R=window.ROOMS;

/* ======================= DESIGNED FOR LIFE ======================= */
const BODY_ERAS=[
 {k:"Eden",c:"--living",t:"Life flowing from Life",d:"The body was made from dust and filled with God's own breath (Gen 2:7). The tree of life stood in the middle of the garden (Gen 2:9), a sign that human life was meant to be sustained continually by communion with God. The body was not built with death as its goal.",v:"Gen 2:7-9 · Gen 1:31"},
 {k:"The fall",c:"--stress",t:"Unplugged from the Source",d:"'In the day you eat of it, dying you shall die' (Gen 2:17, literal Hebrew). Death is pictured less as a sentence God carries out and more as what happens when life is cut off from its Source, like a lamp unplugged that slowly dims. Fear, shame and toil entered the body's story (Gen 3:7-19).",v:"Gen 2:17 · Rom 5:12 · Rom 6:23"},
 {k:"Mercy at the gate",c:"--glory",t:"Not trapped forever",d:"God guarded the tree of life 'lest he… live forever' (Gen 3:22-24). In the relational reading this is mercy: God would not let humanity be locked forever into a broken, alienated state. He had a better plan than an endless fallen life.",v:"Gen 3:21-24"},
 {k:"Jesus",c:"--glory",t:"Life confronts death",d:"Jesus healed every sickness brought to him and raised the dead. At Lazarus's tomb he wept and was 'deeply moved' (embrimaomai, a word used of snorting with indignation, John 11:33). He was not at peace with death; he was against it.",v:"Acts 10:38 · John 11:33-44 · John 10:10"},
 {k:"Cross & resurrection",c:"--living",t:"Death undone from within",d:"'Through death he destroyed the one who has the power of death… and delivered all those who through fear of death were subject to lifelong slavery' (Heb 2:14-15). His risen body is the prototype of ours.",v:"Heb 2:14-15 · 1 Cor 15:20-22 · 2 Tim 1:10"},
 {k:"Now",c:"--glory",t:"Foretastes in a mortal body",d:"'The Spirit who raised Jesus from the dead… will also give life to your mortal bodies' (Rom 8:11). Healing, vitality and long life are real foretastes, while the body still groans and waits (Rom 8:23).",v:"Rom 8:11 · Rom 8:23 · 2 Cor 4:16"},
 {k:"Resurrection",c:"--living",t:"The last enemy destroyed",d:"'The last enemy to be destroyed is death' (1 Cor 15:26). 'He will wipe away every tear… death shall be no more, neither shall there be mourning, nor crying, nor pain' (Rev 21:4).",v:"1 Cor 15:26, 53-55 · Rev 21:4"}
];
const REPAIR=[
 ["DNA repair","Your cells fix tens of thousands of DNA lesions per cell every day with dedicated repair enzymes."],
 ["Stem cells","Reserves of master cells rebuild blood, skin, gut lining and muscle throughout life."],
 ["Telomerase","An enzyme that can rebuild the protective caps (telomeres) on your chromosomes."],
 ["Autophagy","Cells recycle their own worn-out parts, especially during fasting and sleep."],
 ["Immune surveillance","Patrolling cells destroy infected and cancerous cells before they spread."],
 ["Regeneration","The liver regrows, bone remodels, and the gut lining renews every few days."]
];
R.design={html:()=>`
${W.head("Pain & suffering · Designed for life","Your body was not designed for sickness or death","Scripture calls death an enemy, not a friend. Biology finds a body packed with repair systems. Follow the story from Eden to resurrection, and see how the mind speeds up or slows down the body's wearing out.")}
<section class="split">
 <div class="panel" style="display:flex;flex-direction:column;gap:12px">
  <span class="mono muted">Motion picture · death as disconnection</span>
  <div class="diagram"><svg id="lamp" viewBox="0 0 520 260" role="img" aria-label="A lamp connected to and disconnected from its source">
   <defs><radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="var(--glory)" stop-opacity=".9"/><stop offset="1" stop-color="var(--glory)" stop-opacity="0"/></radialGradient></defs>
   <rect x="20" y="96" width="96" height="70" rx="14" fill="var(--glory-soft)" stroke="var(--glory)"/><text x="68" y="128" text-anchor="middle" font-size="13" font-weight="700" fill="var(--fg)">Source</text><text x="68" y="146" text-anchor="middle" font-size="10" fill="var(--muted)">God · tree of life</text>
   <path id="cord" d="M116 131 C 190 131, 220 190, 300 170" fill="none" stroke="var(--glory)" stroke-width="4" class="flow-dash"/>
   <circle id="lampGlow" cx="380" cy="120" r="90" fill="url(#glow)"/>
   <circle id="lampBulb" cx="380" cy="120" r="34" fill="var(--glory)"/>
   <rect x="362" y="152" width="36" height="22" rx="4" fill="var(--muted)"/>
   <text x="380" y="215" text-anchor="middle" font-size="12" fill="var(--fg)" id="lampTxt">Human life: connected</text>
   <text x="380" y="234" text-anchor="middle" font-size="10.5" fill="var(--muted)" id="lampSub">life, repair and renewal flow continuously</text>
  </svg></div>
  <div class="row"><button class="btn" type="button" id="unplug">Show the fall (unplug)</button><button class="btn primary" type="button" id="replug">Show resurrection life (reconnect)</button></div>
 </div>
 <div class="panel" style="display:flex;flex-direction:column;gap:12px">
  <span class="mono muted">The body's story · tap a stage</span>
  <div class="pills" id="bodyEra">${BODY_ERAS.map((e,i)=>`<button type="button" class="pill" data-i="${i}" aria-pressed="${i===0}">${e.k}</button>`).join("")}</div>
  <div id="bodyEraOut" style="display:flex;flex-direction:column;gap:10px"></div>
 </div>
</section>
${W.sec("A body built to repair, not to die","Biologists have found no single 'death program' that all life must follow. Some organisms (hydra, certain jellyfish) barely age at all. Your own body carries extraordinary maintenance systems.",`
<div class="grid">${REPAIR.map(([t,d])=>`<div class="card"><span class="tag l">Repair system</span><h4>${t}</h4><p>${d}</p></div>`).join("")}</div>
<p class="muted">Ageing happens as these systems fall behind: telomeres shorten, damage accumulates, inflammation rises ('inflammaging'). Much of that falling behind is accelerated by stress, and slowed by rest, connection and peace.</p>`)}
${W.sec("How the mind speeds up or slows down wearing out","Telomeres are protective caps on your chromosomes, like the plastic tips on shoelaces. Drag the slider to see an illustrative picture based on Epel et al. (PNAS, 2004).",`
<div class="panel split" style="box-shadow:none">
 <div class="diagram"><svg id="telo" viewBox="0 0 520 170" role="img" aria-label="Chromosome with telomere caps"></svg></div>
 <div style="display:flex;flex-direction:column;gap:10px">
  <label class="lbl" for="teloSl"><span>Years of high perceived stress</span><span id="teloV" class="mono"></span></label>
  <input id="teloSl" type="range" min="0" max="12" value="2">
  <p id="teloTxt" style="font-size:.93rem"></p>
  <p class="muted" style="font-size:.82rem">In Epel's study, mothers with the highest perceived stress had telomeres shorter by the equivalent of about a decade of extra ageing. It was a small, cross-sectional study, so treat it as a strong pointer, not a final word. Meditation, exercise and supportive relationships have been linked to healthier telomere biology.</p>
 </div>
</div>`)}
${W.sec("Where the mind plays its part",null,`
<div class="grid">
 <div class="card"><span class="tag s">Fear of death</span><h4>The hidden slavery</h4><p>"Through fear of death they were subject to lifelong slavery" (Heb 2:15). Fear of death drives much anxiety, control, greed and self-protection, and fear itself keeps the body in survival mode.</p></div>
 <div class="card"><span class="tag v">Beliefs about ageing</span><h4>Expecting decline</h4><p>People with positive beliefs about ageing lived about 7.5 years longer (Levy, 2002) and recovered better from disability. Caleb at 85 expected strength (Josh 14:11).</p></div>
 <div class="card"><span class="tag l">Peace & connection</span><h4>The repair state</h4><p>The body repairs best in the parasympathetic 'rest' state. A mind at rest in the Father's love lets the body do what it was designed to do.</p></div>
 <div class="card"><span class="tag g">Hope of resurrection</span><h4>Death's sting removed</h4><p>"O death, where is your sting?" (1 Cor 15:55). Knowing the end of the story frees you to live without the fear that wears the body down.</p></div>
</div>
<p class="note">Honest balance: a renewed mind slows the body's wearing out and opens us to healing, but it does not make us immortal now. Bodily immortality comes through resurrection (1 Cor 15:53). Elderly saints who die in peace have not failed in faith; they are "gathered to their people" and wait for the new creation.</p>`)}
`,mount(){
  const show=i=>{const e=BODY_ERAS[i];$$("#bodyEra .pill").forEach(p=>p.setAttribute("aria-pressed",+p.dataset.i===i));$("#bodyEraOut").innerHTML=`<span class="tag" style="color:var(${e.c})">Stage ${i+1} of ${BODY_ERAS.length}</span><h3>${e.t}</h3><p>${e.d}</p><span class="ref">${e.v}</span>`};
  $$("#bodyEra .pill").forEach(p=>p.addEventListener("click",()=>show(+p.dataset.i)));show(0);
  // lamp animation
  let lvl=1,target=1,raf=null;
  const paint=()=>{$("#lampBulb").setAttribute("fill-opacity",.15+lvl*.85);$("#lampGlow").setAttribute("opacity",lvl);$("#cord").setAttribute("stroke-opacity",target>0?1:.15);
   $("#cord").setAttribute("d",target>0?"M116 131 C 190 131, 220 190, 300 170":"M116 131 C 170 131, 170 200, 210 220");};
  const step=()=>{lvl+=(target-lvl)*(target>lvl?.06:.012);paint();if(Math.abs(target-lvl)>.01&&!reduce)raf=requestAnimationFrame(step);else{lvl=target;paint()}};
  $("#unplug").onclick=()=>{target=0;cancelAnimationFrame(raf);$("#lampTxt").textContent="Cut off from the Source";$("#lampSub").textContent="the light doesn't vanish at once; it slowly dims (Gen 5: 930 years)";step()};
  $("#replug").onclick=()=>{target=1;cancelAnimationFrame(raf);$("#lampTxt").textContent="Reconnected in Christ";$("#lampSub").textContent="'In him was life, and the life was the light of men' (John 1:4)";step()};
  paint();
  // telomeres
  const tUpd=()=>{const y=+$("#teloSl").value;const cap=Math.max(8,70-y*4.6);$("#teloV").textContent=y+" yrs";
   $("#telo").innerHTML=`<rect x="${110-cap}" y="60" width="${cap}" height="50" rx="20" fill="var(--living)" opacity=".85"/><rect x="${410}" y="60" width="${cap}" height="50" rx="20" fill="var(--living)" opacity=".85"/>
    <rect x="110" y="55" width="300" height="60" rx="26" fill="var(--violet-soft)" stroke="var(--violet)"/>
    ${Array.from({length:12},(_,i)=>`<line x1="${130+i*24}" y1="62" x2="${130+i*24}" y2="108" stroke="var(--violet)" stroke-opacity=".35" stroke-width="5"/>`).join("")}
    <text x="260" y="140" text-anchor="middle" font-size="11.5" fill="var(--muted)">chromosome</text><text x="${110-cap/2}" y="40" text-anchor="middle" font-size="11" fill="var(--living)">telomere</text><text x="${410+cap/2}" y="40" text-anchor="middle" font-size="11" fill="var(--living)">telomere</text>`;
   $("#teloTxt").innerHTML=y<3?`<b style="color:var(--living)">Long, protective caps.</b> Cells can keep dividing and repairing.`:y<8?`<b style="color:var(--glory)">Caps wearing down faster than age alone explains.</b> Chronic stress hormones and oxidative stress are taking their toll.`:`<b style="color:var(--stress)">Short caps.</b> Cells age early; linked with higher risk of heart disease, diabetes and some cancers.`};
  $("#teloSl").addEventListener("input",tUpd);tUpd();
}};

/* ======================= HOW PAIN WORKS ======================= */
const PATH=[
 {k:"Tissue",s:"nociceptors fire",d:"Special nerve endings (nociceptors) detect heat, pressure, chemicals or damage. They send danger signals, not pain. Pain hasn't happened yet.",x:40},
 {k:"Spinal gate",s:"turn up / turn down",d:"In the spinal cord the signal can be amplified or dampened. Rubbing a bumped elbow helps because touch signals compete at this 'gate' (Melzack & Wall's gate control theory, 1965).",x:160},
 {k:"Thalamus",s:"relay",d:"The signal is relayed upward and also copied to the emotional brain.",x:280},
 {k:"Brain's verdict",s:"how dangerous is this?",d:"Many areas weigh the evidence together: somatosensory cortex (where, how intense), insula and anterior cingulate (how bad it feels), amygdala (threat), prefrontal cortex (meaning, memory, expectation). The brain asks, 'How much danger am I in?'",x:400},
 {k:"Pain",s:"the protective output",d:"If the brain concludes 'danger', you feel pain. Pain is an output of the brain designed to protect you, every time (Lorimer Moseley). It is completely real, wherever it's felt.",x:520},
 {k:"Descending control",s:"endorphins · PAG",d:"The brain sends signals back down (via the periaqueductal grey) that release natural opioids and dampen the signal. Safety, love, focus and hope switch this on. This is why soldiers and athletes sometimes don't feel injuries until later.",x:640}
];
R.pain={html:()=>`
${W.head("Pain & suffering · How pain works","Pain is a protector, and it's built in the brain","The International Association for the Study of Pain defines pain as 'an unpleasant sensory and emotional experience associated with, or resembling that associated with, actual or potential tissue damage.' Watch a danger signal travel, then play with what turns pain up and down.")}
<section class="panel"><span class="mono muted">Animated pathway · tap any stage</span>
 <div class="diagram"><svg id="painPath" viewBox="0 0 700 170" role="img" aria-label="Pain pathway">
  <path id="ascend" d="M40 95 L640 95" stroke="var(--stress)" stroke-width="3" fill="none" class="flow-dash"/>
  <path d="M640 120 C 520 160, 280 160, 160 122" stroke="var(--living)" stroke-width="2.5" fill="none" class="flow-dash"/>
  <text x="400" y="162" text-anchor="middle" font-size="10.5" fill="var(--living)">descending control: the brain can turn the volume down</text>
  ${PATH.map((p,i)=>`<g class="pstage" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><circle cx="${p.x}" cy="95" r="20" fill="var(--bg2)" stroke="var(${i===4?"--stress":i===5?"--living":"--violet"})" stroke-width="2"/><text x="${p.x}" y="99" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">${i+1}</text><text x="${p.x}" y="56" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg)">${p.k}</text><text x="${p.x}" y="70" text-anchor="middle" font-size="9.5" fill="var(--muted)">${p.s}</text></g>`).join("")}
  <circle r="6" fill="var(--stress)"><animateMotion dur="3s" repeatCount="indefinite" path="M40 95 L520 95"/></circle>
 </svg></div>
 <div id="pathOut" class="card" style="background:var(--bg);margin-top:8px"></div>
</section>
${W.sec("The danger meter","Pain rises when the brain counts more danger than safety. Based on the 'danger in me / safety in me' idea from Moseley and Butler's <i>Explain Pain</i>. Values are illustrative.",`
<div class="split">
 <div class="panel" style="display:flex;flex-direction:column;gap:10px">
  ${[["dmg","Actual tissue damage",40,"--stress"],["fear","Fear, catastrophising ('this is serious')",60,"--stress"],["stress","Stress, poor sleep, isolation",50,"--stress"],["safe","Feeling safe, understood and loved",30,"--living"],["mean","Hope and meaning ('this will pass, it has purpose')",20,"--living"],["touch","Calm touch, movement, warmth, focus",20,"--living"]].map(([k,t,v,c])=>`<label class="lbl" for="pm-${k}"><span style="color:var(${c})">●</span><span style="flex:1">${t}</span><span class="mono" id="pv-${k}">${v}</span></label><input id="pm-${k}" data-k="${k}" type="range" min="0" max="100" value="${v}">`).join("")}
 </div>
 <div class="panel" style="display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center">
  <div class="diagram" style="max-width:280px"><svg viewBox="0 0 240 150" style="min-width:0" role="img" aria-label="Pain gauge">
   <path d="M20 130 A100 100 0 0 1 220 130" fill="none" stroke="var(--bg3)" stroke-width="18" stroke-linecap="round"/>
   <path id="gaugeArc" d="M20 130 A100 100 0 0 1 220 130" fill="none" stroke="var(--stress)" stroke-width="18" stroke-linecap="round" pathLength="100" stroke-dasharray="0 100"/>
   <line id="needle" x1="120" y1="130" x2="120" y2="44" stroke="var(--fg)" stroke-width="3" stroke-linecap="round" style="transform-origin:120px 130px;transition:transform .5s"/>
   <circle cx="120" cy="130" r="7" fill="var(--fg)"/>
  </svg></div>
  <div style="font-family:var(--f-display);font-size:2.4rem;line-height:1" id="painNum">5</div><span class="mono muted">felt pain (0–10)</span>
  <p id="painTxt" class="muted" style="font-size:.92rem"></p>
 </div>
</div>`)}
${W.sec("Pain is not the same as suffering","Suffering is pain plus everything the mind adds to it. Tap each layer.",`
<div class="split"><div class="panel"><div class="diagram"><svg id="sufStack" viewBox="0 0 420 320" style="min-width:280px" role="img" aria-label="Layers of suffering">
 ${[["Raw sensation","--violet","The signal itself: aching, burning, stabbing."],["Fear of what it means","--stress","'Is it cancer? Will it never stop?' Fear amplifies the brain's danger estimate."],["The story I tell","--stress","'God is punishing me.' 'I deserve this.' 'Nobody cares.' Lies about God and self turn pain into torment."],["Isolation","--stress","Pain borne alone hurts more. Brain scans show that holding a loved one's hand calms threat responses (Coan et al., 2006)."],["Resistance & rumination","--stress","Fighting, replaying and bracing tighten muscles and keep the alarm system on."],["Loss of purpose","--violet","When pain blocks what gives life meaning, suffering deepens into despair."]].map(([t,c,d],i)=>`<g class="suf" data-d="${esc(d)}" data-t="${t}" tabindex="0" role="button" style="cursor:pointer"><rect x="${30+i*12}" y="${270-i*46}" width="${360-i*24}" height="38" rx="10" fill="var(${c})" fill-opacity="${.12+i*.03}" stroke="var(${c})"/><text x="210" y="${294-i*46}" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--fg)">${t}</text></g>`).join("")}
 <text x="210" y="20" text-anchor="middle" font-size="11" fill="var(--muted)">suffering = pain + the layers the mind adds</text>
</svg></div></div>
<div class="panel" id="sufOut" style="display:flex;flex-direction:column;gap:12px"><h3>Tap a layer</h3><p>The bottom layer is the body's signal. Every layer above it is shaped by beliefs, relationships and attention, and every one of them can be healed. This is where the renewed mind makes the biggest difference.</p></div></div>`)}
${W.sec("When the alarm gets stuck: chronic pain",null,`
<div class="grid">
 <div class="card"><span class="tag v">Central sensitisation</span><p>After months of pain the nervous system becomes over-protective. The alarm goes off with less and less danger, and pain can continue long after tissues have healed.</p></div>
 <div class="card"><span class="tag v">Phantom limb</span><p>People can feel vivid pain in a limb that has been amputated. This proves pain is built in the brain, and also that it's completely real.</p></div>
 <div class="card"><span class="tag l">Retraining is possible</span><p>Pain neuroscience education, graded movement, sleep, stress reduction and safe relationships can turn the volume back down. The same plasticity that learned pain can unlearn it.</p></div>
 <div class="card"><span class="tag g">Three kinds of pain</span><p><b>Nociceptive</b> (tissue damage), <b>neuropathic</b> (nerve damage), <b>nociplastic</b> (an over-sensitive system with no clear damage). All are real; each needs different care.</p></div>
</div>`)}
`,mount(){
  const show=i=>{const p=PATH[i];$$("#painPath .pstage circle").forEach((c,j)=>c.setAttribute("stroke-width",j===i?4:2));$("#pathOut").innerHTML=`<span class="tag v">Stage ${i+1}: ${p.k}</span><p style="color:var(--fg)">${p.d}</p>`};
  $$("#painPath .pstage").forEach(g=>{g.addEventListener("click",()=>show(+g.dataset.i));g.addEventListener("keydown",e=>{if(e.key==="Enter")show(+g.dataset.i)})});show(3);
  const v=k=>+$("#pm-"+k).value;
  const upd=()=>{["dmg","fear","stress","safe","mean","touch"].forEach(k=>$("#pv-"+k).textContent=v(k));
   const danger=v("dmg")*.45+v("fear")*.35+v("stress")*.2,safety=v("safe")*.4+v("mean")*.3+v("touch")*.3;
   let p=Math.max(0,Math.min(10,(danger-safety*.75)/7+2.2));p=Math.round(p*10)/10;
   $("#painNum").textContent=p.toFixed(1);$("#gaugeArc").setAttribute("stroke-dasharray",`${p*10} 100`);$("#gaugeArc").setAttribute("stroke",p>6?"var(--stress)":p>3?"var(--glory)":"var(--living)");
   $("#needle").style.transform=`rotate(${-90+p*18}deg)`;
   $("#painTxt").textContent=p>6?"The brain counts far more danger than safety. Pain is turned up to protect you. Notice how much of the danger comes from fear and stress, not damage.":p>3?"A mixed picture. Adding safety (understanding, love, calm touch, hope) can lower pain even when the tissue hasn't changed yet.":"Plenty of safety evidence. The protector relaxes; descending control releases natural pain relief."};
  $$("[id^=pm-]").forEach(i=>i.addEventListener("input",upd));upd();
  $$("#sufStack .suf").forEach(g=>{const f=()=>{$$("#sufStack .suf rect").forEach(r=>r.setAttribute("stroke-width",1));$("rect",g).setAttribute("stroke-width",3);$("#sufOut").innerHTML=`<span class="tag s">Layer of suffering</span><h3>${g.dataset.t}</h3><p>${g.dataset.d}</p>`};g.addEventListener("click",f);g.addEventListener("keydown",e=>{if(e.key==="Enter")f()})});
}};

/* ======================= THE MESSAGE OF PAIN ======================= */
const MSG=[
 {k:"Stop. Protect this.",t:"body",d:"The hand pulls back from the flame before you think. Pain guards tissue from further damage.",v:"Prov 22:3"},
 {k:"Rest and let it heal.",t:"body",d:"Soreness after injury says 'give me time'. Rest is cooperation with repair.",v:"Mark 6:31"},
 {k:"Something needs attention.",t:"body",d:"Chest pain, a new lump, persistent headaches. Pain sends you to seek help and care, including doctors.",v:"Luke 5:31"},
 {k:"You have pushed past your limits.",t:"body",d:"Tension headaches, back pain, burnout: the body's protest against living as if you were limitless.",v:"Ps 127:2"},
 {k:"Something precious was lost.",t:"heart",d:"Grief is the pain of love. It says the relationship mattered. 'Blessed are those who mourn, for they shall be comforted.'",v:"Matt 5:4 · John 11:35"},
 {k:"A boundary was crossed.",t:"heart",d:"The pain of being wronged signals injustice and calls for truth, protection and, in time, forgiveness.",v:"Ps 55:12-14"},
 {k:"A need is going unmet.",t:"heart",d:"Loneliness is to connection what hunger is to food. Social pain shares brain circuits with physical pain for a reason: it drives us back to each other.",v:"Gen 2:18"},
 {k:"A lie is hurting you.",t:"heart",d:"Some emotional pain comes from a false belief about God or self. The pain points to the place truth needs to reach.",v:"John 8:32"},
 {k:"Creation is groaning for redemption.",t:"world",d:"All pain together is a cry that the world is not as it should be, and a longing for the new creation.",v:"Rom 8:22-23"}
];
R.message={html:()=>`
${W.head("Pain & suffering · The message of pain","God is not the author of pain, but pain carries a message","Look at Jesus, the exact image of the Father (Heb 1:3). He never inflicted sickness or pain on anyone to teach them a lesson. He healed it, wept over it, carried it, and promised its end. In a broken world, pain is a messenger worth listening to.")}
${W.sec("What Jesus did with pain","The perfect theology test: if a picture of God doesn't look like Jesus, it isn't the true picture.",`
<div class="grid">
 ${[["He healed it","'He went about doing good and healing all who were oppressed by the devil' (Acts 10:38). The oppressor and the healer are not the same person.","Acts 10:38"],
   ["He felt it","Jesus was 'a man of sorrows, acquainted with grief' (Isa 53:3). He wept, sweated blood in Gethsemane, and cried out on the cross.","Isa 53:3 · Heb 4:15"],
   ["He carried it","'Surely he has borne our griefs (choli, sicknesses) and carried our sorrows (makob, pains)' (Isa 53:4). Matthew applies this to his healings (Matt 8:17).","Isa 53:4 · Matt 8:16-17"],
   ["He refused to blame","'Neither this man nor his parents sinned' (John 9:3). Those killed when the tower fell were not worse sinners (Luke 13:4).","John 9:3 · Luke 13:1-5"],
   ["He shares it","God himself is pained by our pain. 'In all their affliction he was afflicted' (Isa 63:9). In Gen 6:6, God is 'grieved' with the same Hebrew root (ʿāṣab) used for human pain and toil in Gen 3:16-17.","Isa 63:9 · Gen 6:6"],
   ["He will end it","'Neither shall there be mourning, nor crying, nor pain any more' (Rev 21:4).","Rev 21:4"]
 ].map(([t,d,v])=>`<div class="card"><h4>${t}</h4><p>${d}</p><span class="ref">${v}</span></div>`).join("")}
</div>`)}
${W.sec("Then where does pain come from?","Three sources, often tangled together.",`
<div class="panel"><div class="diagram"><svg viewBox="0 0 700 220" role="img" aria-label="Sources of pain">
 ${[["God's good design",110,"--living","the capacity to sense danger: a gift in a world with fire and thorns"],["A broken world",350,"--stress","injury, disease, decay, death: the fall's ripple through creation (Rom 8:20-22)"],["Human & spiritual evil",590,"--stress","violence, abuse, lies, the accuser who 'comes to steal, kill and destroy' (John 10:10)"]].map(([t,x,c,s])=>`<g><circle cx="${x}" cy="70" r="46" fill="var(${c})" fill-opacity=".14" stroke="var(${c})" stroke-width="2"/><text x="${x}" y="74" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--fg)">${t.split(" ").slice(0,2).join(" ")}</text><text x="${x}" y="90" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--fg)">${t.split(" ").slice(2).join(" ")}</text><foreignObject x="${x-110}" y="125" width="220" height="60"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;line-height:1.3;color:var(--muted);text-align:center">${s}</div></foreignObject></g>`).join("")}
 <path d="M160 70 L300 70 M400 70 L540 70" stroke="var(--line)" stroke-width="2" stroke-dasharray="4 6"/>
 <text x="350" y="208" text-anchor="middle" font-size="11" fill="var(--glory)">God is present in all three, working for good (Rom 8:28), without being the author of the evil</text>
</svg></div></div>`)}
${W.sec("The gift nobody wants","Dr Paul Brand, a Christian surgeon who worked with leprosy patients in India, discovered that leprosy's terrible damage came mostly from the loss of pain, not from the bacteria. Without pain, patients injured themselves without noticing.",`
<div class="grid two">
 <div class="card"><span class="tag g">Brand's insight</span><p style="color:var(--fg)">Pain is one of the body's most faithful servants. People born unable to feel pain (congenital insensitivity to pain) often suffer severe injuries and shortened lives. In a world with danger, the ability to feel pain is a mercy.</p><p>See his books with Philip Yancey: <i>Fearfully and Wonderfully Made</i> and <i>The Gift of Pain</i>.</p></div>
 <div class="card"><span class="tag l">Why no pain in the new creation?</span><p style="color:var(--fg)">Rev 21:4 promises no more pain because there will be no more danger, death or decay to warn us about. The messenger retires when its message is no longer needed.</p></div>
</div>`)}
${W.sec("Decode the message","What might your pain be saying? Filter by kind.",`
<div class="seg" id="msgSeg"><button type="button" data-v="all" aria-pressed="true">All</button><button type="button" data-v="body" aria-pressed="false">Body pain</button><button type="button" data-v="heart" aria-pressed="false">Heart pain</button><button type="button" data-v="world" aria-pressed="false">The world's pain</button></div>
<div class="grid" id="msgGrid"></div>`)}
${W.sec("Responding to pain: listen, bring, receive, act",null,`<div class="panel">${W.steps([
 "<b>Listen</b> without panic. Ask: 'What are you protecting me from? What do you need?' Pain is information, not a verdict on your worth.",
 "<b>Bring it to the Father</b> honestly, like the lament psalms. 'Cast all your anxieties on him, because he cares for you' (1 Pet 5:7).",
 "<b>Refuse the lies</b> that turn pain into suffering: 'God did this to me', 'I deserve this', 'I'm alone'.",
 "<b>Receive care</b>: medical help, rest, touch, community and prayer (Jas 5:14-16). All of these are God's provision.",
 "<b>Act</b> on what pain revealed: change the habit, set the boundary, grieve the loss, forgive the wound.",
 "<b>Hope</b>: pain is temporary in God's story (2 Cor 4:17-18). Ask for healing boldly and keep loving while you wait."])}</div>`)}
`,mount(){let f="all";const draw=()=>{$$("#msgSeg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===f));
  $("#msgGrid").innerHTML=MSG.filter(m=>f==="all"||m.t===f).map(m=>`<div class="card"><span class="tag ${m.t==="body"?"l":m.t==="heart"?"v":"s"}">${m.t==="body"?"Body":m.t==="heart"?"Heart":"World"}</span><h4>"${m.k}"</h4><p>${m.d}</p><span class="ref">${m.v}</span></div>`).join("")};
  $$("#msgSeg button").forEach(b=>b.addEventListener("click",()=>{f=b.dataset.v;draw()}));draw()}};

/* ======================= CHILDBIRTH ======================= */
const WORDS=[
 {h:"עִצָּבוֹן",t:"ʿiṣṣābôn",g:"toil, painful labour, sorrow",d:"Used only three times in the Bible: to the woman (Gen 3:16), to the man for his toil on the ground (Gen 3:17), and when Lamech hopes for relief 'from the painful toil of our hands' (Gen 5:29). The same word for both! It describes the hard labour of life in a broken world, not a special punishment on women's bodies."},
 {h:"עֶצֶב",t:"ʿeṣeb",g:"pain, hurt, sorrow, hard work",d:"The second word in Gen 3:16 ('in ʿeṣeb you shall bring forth children'). It can mean physical or emotional pain, and also hard work (Prov 14:23 uses it for 'toil'). Some scholars note it leans toward mental anguish more than physical pain."},
 {h:"עָצַב",t:"ʿāṣab",g:"to be grieved, pained",d:"The verb from the same root. In Gen 6:6 God himself 'was grieved to his heart'. The God who described the woman's sorrow shares the very same sorrow."},
 {h:"אָרַר",t:"ʾārar",g:"to curse",d:"The actual curse word in Gen 3. God curses the serpent (3:14) and the ground (3:17). He never says 'cursed are you' to the woman or the man. What they receive are descriptions of life outside the garden."},
 {h:"הַרְבָּה אַרְבֶּה",t:"harbâ ʾarbeh",g:"I will greatly multiply",d:"Many relational readers see this as God foretelling what a disconnected world will be like (a description), not God wanting to increase women's pain (a prescription). Like a parent saying, 'If you leave home this way, life will get very hard.'"}
];
const CURSE=[["Serpent","Cursed (ʾārar)",true],["Ground","Cursed (ʾārar)",true],["Woman","Not cursed: consequences described",false],["Man","Not cursed: consequences described",false]];
const HIST=[
 {y:"c. 1000 BC",t:"Hebrew midwives",d:"'The Hebrew women are not like the Egyptian women, for they are vigorous (chayot, lively) and give birth before the midwife comes to them' (Exod 1:19)."},
 {y:"1591",t:"Euphame MacCalzean",d:"Executed in Edinburgh during the North Berwick witch trials. One charge was using charms to relieve the 'God-ordained' pain of childbirth. Popular retellings say she died only for seeking pain relief; she faced other charges too, but the charge itself shows how Gen 3:16 was being used."},
 {y:"1847",t:"Simpson & chloroform",d:"Dr James Young Simpson pioneered chloroform in childbirth. Facing religious objections, he wrote an answer arguing that the Hebrew word means 'labour' or toil, and that God himself put Adam into a 'deep sleep' before surgery (Gen 2:21). Historians note the opposition was later exaggerated, but it was real."},
 {y:"1849",t:"Rabbi De Sola",d:"Canada's first rabbi wrote a three-part study of Gen 3:16 for a medical journal, defending pain relief from the Hebrew text."},
 {y:"1853",t:"Queen Victoria",d:"Accepted chloroform for the birth of Prince Leopold, helping end public resistance in Britain."},
 {y:"1933–42",t:"Childbirth without fear",d:"Dr Grantly Dick-Read described the fear–tension–pain cycle: fear tightens muscles, tension increases pain, pain increases fear. Some of his claims were overstated, but the core idea shaped modern birth education."},
 {y:"Today",t:"Evidence-based support",d:"Continuous labour support, water immersion, mobility, hypnosis-based techniques and medical analgesia are all used. Faith and medicine are partners, not rivals."}
];
R.birth={html:()=>`
${W.head("Pain & suffering · Childbirth without the curse","Why pain in childbirth is not God's curse","For centuries religion used Genesis 3:16 to say women must suffer in labour because God decreed it. Read the Hebrew, look at Jesus, and see the physiology God designed for birth.")}
${W.sec("Who was actually cursed in Genesis 3?","Only two things receive the curse word. Watch the scale.",`
<div class="panel"><div class="diagram"><svg viewBox="0 0 700 170" role="img" aria-label="Curses in Genesis 3">
 ${CURSE.map(([k,s,c],i)=>{const x=90+i*175;return`<g><circle cx="${x}" cy="70" r="44" fill="var(${c?"--stress":"--living"})" fill-opacity=".15" stroke="var(${c?"--stress":"--living"})" stroke-width="2"><animate attributeName="r" values="40;46;40" dur="${3+i*.4}s" repeatCount="indefinite"/></circle><text x="${x}" y="68" text-anchor="middle" font-family="var(--f-display)" font-size="18" fill="var(--fg)">${k}</text><text x="${x}" y="86" text-anchor="middle" font-size="10" fill="var(--muted)">${c?"Gen 3:"+(i?17:14):"Gen 3:"+(i===2?16:"17-19")}</text><foreignObject x="${x-80}" y="122" width="160" height="40"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11.5px;line-height:1.25;text-align:center;font-weight:700;color:var(${c?"--stress":"--living"})">${s}</div></foreignObject></g>`}).join("")}
</svg></div>
<p class="muted" style="margin-top:6px">God's first acts toward the man and woman after the fall were questions, a promise of rescue through the woman's offspring (Gen 3:15), and clothing made by his own hands (Gen 3:21).</p></div>`)}
${W.sec("Hebrew word explorer","Tap a word to see what it really means.",`
<div class="split"><div class="pills" id="wordPills" style="align-content:flex-start">${WORDS.map((w,i)=>`<button type="button" class="pill" data-i="${i}" aria-pressed="${i===0}"><span style="font-size:1.2rem;font-family:serif" lang="he" dir="rtl">${w.h}</span> · ${w.t}</button>`).join("")}</div>
<div class="panel" id="wordOut" style="display:flex;flex-direction:column;gap:10px"></div></div>`)}
${W.sec("Description, not decree","The relational, perfect-theology reading of Gen 3:16.",`
<div class="grid">
 <div class="card"><span class="tag g">Look at Jesus</span><p>Jesus used labour as a picture of sorrow turning to joy: 'When a woman is giving birth, she has sorrow… but when she has delivered the baby, she no longer remembers the anguish, for joy' (John 16:21). No curse in his mouth, only promised joy.</p></div>
 <div class="card"><span class="tag l">Christ became the curse</span><p>'Christ redeemed us from the curse of the law by becoming a curse for us' (Gal 3:13). Whatever brokenness entered with the fall, the cross is God's answer to it, not his endorsement of it.</p></div>
 <div class="card"><span class="tag v">Creation in labour</span><p>Paul says 'the whole creation has been groaning together in the pains of childbirth' (Rom 8:22), waiting for redemption. Labour pain becomes a sign of hope: new life is coming.</p></div>
 <div class="card"><span class="tag g">Kept safe in childbirth</span><p>'She will be saved (sōzō) through childbearing' (1 Tim 2:15) is read by many as 'kept safe' or 'brought through'. Exod 23:26 and Ps 113:9 show God's heart for safe, fruitful birth.</p></div>
</div>`)}
${W.sec("The hormone choreography of birth","God designed labour with its own pain relief. Fear changes the music. Toggle to see the difference (illustrative).",`
<div class="panel split" style="box-shadow:none">
 <div style="display:flex;flex-direction:column;gap:12px">
  <div class="seg" id="birthSeg"><button type="button" data-v="safe" aria-pressed="true">Safe, supported, unhurried</button><button type="button" data-v="fear" aria-pressed="false">Fearful, tense, alone</button></div>
  <div class="diagram"><svg id="waves" viewBox="0 0 520 200" role="img" aria-label="Hormone waves during labour"></svg></div>
  <div class="row" style="gap:14px;font-size:.8rem;color:var(--muted)"><span><b style="color:var(--living)">━</b> oxytocin (contractions, bonding)</span><span><b style="color:var(--glory)">━</b> endorphins (natural pain relief)</span><span><b style="color:var(--stress)">━</b> adrenaline (fear)</span></div>
 </div>
 <div id="birthOut" style="display:flex;flex-direction:column;gap:10px"></div>
</div>`)}
${W.sec("Two cycles",null,`
<div class="grid two">
 <div class="panel" style="box-shadow:none"><span class="tag s">Fear–tension–pain cycle</span><div class="diagram" style="margin-top:8px"><svg viewBox="0 0 300 220" style="min-width:0" role="img" aria-label="Fear tension pain cycle">${["Fear","Tension","More pain"].map((t,i)=>{const a=-Math.PI/2+i*2*Math.PI/3,x=150+75*Math.cos(a),y=115+75*Math.sin(a);return`<circle cx="${x}" cy="${y}" r="34" fill="var(--stress-soft)" stroke="var(--stress)"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">${t}</text>`}).join("")}<circle cx="150" cy="115" r="75" fill="none" stroke="var(--stress)" stroke-dasharray="5 7" class="flow-dash"/></svg></div><p class="muted" style="font-size:.9rem">Adrenaline can slow early labour and tighten muscles; the brain reads more danger and turns pain up (see the danger meter in 'How pain works').</p></div>
 <div class="panel" style="box-shadow:none"><span class="tag l">Trust–release–relief cycle</span><div class="diagram" style="margin-top:8px"><svg viewBox="0 0 300 220" style="min-width:0" role="img" aria-label="Trust release relief cycle">${["Trust","Release","Relief"].map((t,i)=>{const a=-Math.PI/2+i*2*Math.PI/3,x=150+75*Math.cos(a),y=115+75*Math.sin(a);return`<circle cx="${x}" cy="${y}" r="34" fill="var(--living-soft)" stroke="var(--living)"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">${t}</text>`}).join("")}<circle cx="150" cy="115" r="75" fill="none" stroke="var(--living)" stroke-dasharray="5 7" class="flow-dash"/></svg></div><p class="muted" style="font-size:.9rem">Safety and love release oxytocin and endorphins; muscles soften, contractions work efficiently, and the brain counts more safety than danger.</p></div>
</div>`)}
${W.sec("Is a painless or gentler birth possible?","Honest answer: for some women, birth is reported as nearly painless or even pleasurable. For many, it can be far gentler than they feared. No method guarantees it, and pain is never a sign of weak faith.",`
<div class="grid">
 ${[["Continuous support","A doula, midwife or loving companion present throughout. Cochrane reviews link continuous support with more spontaneous births, shorter labours, less use of pain medication and more positive experiences."],
   ["Heal fear before birth","Talk through fears and past trauma; replace frightening birth stories with true ones. Fear is the biggest amplifier of pain."],
   ["Education","Understanding what contractions do turns 'danger' into 'progress' in the brain's verdict (the Dick-Read principle)."],
   ["Water & warmth","Immersion in warm water in labour is linked to less epidural use (Cochrane)."],
   ["Move & breathe","Upright positions, swaying, slow exhale-heavy breathing and vocal toning help the body open and tone the vagus nerve."],
   ["Dim, private, unhurried","Oxytocin flows best when a woman feels safe and unobserved, like any intimate moment."],
   ["Hypnosis-based methods","Hypnobirthing-style training was linked to less use of pain medication in a 2016 Cochrane review (low-quality evidence; more research needed)."],
   ["Worship & Scripture","Meditating on God's presence and promises (Isa 66:7-9; Isa 41:10; Ps 22:9-10) calms fear. Songs and breath prayers can carry you between contractions."],
   ["Medical pain relief is not unspiritual","Epidurals, gas and air, and other relief are common grace. God put Adam to sleep before the first 'surgery' (Gen 2:21)."]
 ].map(([t,d])=>`<div class="card"><h4>${t}</h4><p>${d}</p></div>`).join("")}
</div>
<p class="note">A midwife survey in France (Postel, 2013) recorded reports of pleasurable or orgasmic sensations in a small fraction of births (around 0.3% by one count). Rare, but real enough to show that birth pain is not a fixed decree. Complications, caesareans and painful births are not failures. Every safe birth is a gift.</p>`)}
${W.sec("A 9-month renewal plan for birth","Scripture-backed steps to prepare mind and body.",`<div class="panel">${W.steps([
 "<b>Months 1–3:</b> Renounce the lie 'God wants me to suffer in birth.' Meditate on John 16:21, Gal 3:13, Isa 66:7-9. Write a truth card in the Rewire studio.",
 "<b>Months 1–9:</b> Daily breath prayer (inhale 4, exhale 6) and gentle movement. Train the exhale you'll use in labour.",
 "<b>Month 4:</b> List every fear about birth. Bring each to the Father; talk through trauma with a counsellor if needed.",
 "<b>Month 5:</b> Take a good birth education course. Replace horror stories with positive birth stories.",
 "<b>Month 6:</b> Choose your support people and care provider. Ask for continuous support.",
 "<b>Month 7:</b> Build a birth playlist of worship and calming music; practise positions, water, massage with your partner.",
 "<b>Month 8:</b> Make a flexible birth plan, including medical pain relief options without guilt.",
 "<b>Month 9:</b> Rest, pray with your community (Jas 5:16), and keep saying: 'The Lord is my strength; I will not fear' (Ps 118:6, 14)."])}</div>`)}
${W.sec("From Scripture to today: how birth pain was viewed",null,`
<div class="tl">
 ${HIST.map(h=>`<div class="t"><h4>${h.y} · ${h.t}</h4><p>${h.d}</p></div>`).join("")}
</div>`)}
<div class="card" style="max-width:none"><span class="tag g">Promises to pray</span>${W.list(["'Before she was in labour she gave birth; before her pain came upon her she delivered a son' (Isa 66:7).","'None shall miscarry or be barren in your land; I will fulfil the number of your days' (Exod 23:26).","'Yet you are he who took me from the womb; you made me trust you at my mother's breasts' (Ps 22:9).","'Fear not, for I am with you' (Isa 41:10)."])}</div>
`,mount(){
  const wshow=i=>{const w=WORDS[i];$$("#wordPills .pill").forEach(p=>p.setAttribute("aria-pressed",+p.dataset.i===i));$("#wordOut").innerHTML=`<span style="font-size:2.4rem;font-family:serif;line-height:1.1" lang="he" dir="rtl">${w.h}</span><span class="mono" style="color:var(--glory)">${w.t} · ${w.g}</span><p>${w.d}</p>`};
  $$("#wordPills .pill").forEach(p=>p.addEventListener("click",()=>wshow(+p.dataset.i)));wshow(0);
  let mode="safe",t0=performance.now(),raf;
  const B={safe:{title:"Hormones in harmony",txt:["Oxytocin rises in strong, rhythmic waves, driving efficient contractions.","Endorphins climb with labour's intensity: the body's own opioids, giving relief and an altered, dreamy state.","Adrenaline stays low until a brief surge right before birth that gives energy to push and alertness to meet the baby.","Result: often shorter labour, less perceived pain, bonding and breastfeeding helped by the oxytocin rush."]},
   fear:{title:"Fear interrupts the music",txt:["Early adrenaline (a catecholamine) can slow or stall contractions; mammals in danger pause labour to find safety.","Muscles tense, blood is diverted from the uterus, and the brain counts more danger, turning pain up.","Endorphin support can lag behind the intensity.","Result: longer, harder labour is more likely, and more medical intervention may be needed. The answer is safety, not shame."]}};
  const draw=now=>{if(!$("#waves"))return;const t=(now-t0)/1000;const f=mode==="fear";let o="",e="",a="";
   for(let x=0;x<=520;x+=4){const ph=x/40+t*1.4;const prog=x/520;
    const oy=f?150-Math.max(0,Math.sin(ph))*(18+prog*22):150-Math.max(0,Math.sin(ph))*(30+prog*80);
    const ey=f?170-prog*45:170-prog*120;
    const ay=f?100-Math.sin(x/90+t)*10-(prog<.7?20:0):(prog>.9?180-(prog-.9)*900:178);
    o+=(x?"L":"M")+x+" "+oy.toFixed(1)+" ";e+=(x?"L":"M")+x+" "+ey.toFixed(1)+" ";a+=(x?"L":"M")+x+" "+Math.max(10,ay).toFixed(1)+" "}
   $("#waves").innerHTML=`<line x1="0" y1="190" x2="520" y2="190" stroke="var(--line)"/><text x="4" y="14" font-size="10" fill="var(--muted)">level</text><text x="516" y="186" text-anchor="end" font-size="10" fill="var(--muted)">labour → birth</text><path d="${o}" fill="none" stroke="var(--living)" stroke-width="2.5"/><path d="${e}" fill="none" stroke="var(--glory)" stroke-width="2.5"/><path d="${a}" fill="none" stroke="var(--stress)" stroke-width="2.5"/>`;
   if(!reduce&&document.body.contains($("#waves")))raf=requestAnimationFrame(draw)};
  const out=()=>{const b=B[mode];$("#birthOut").innerHTML=`<span class="tag ${mode==="safe"?"l":"s"}">${mode==="safe"?"Safe & supported":"Fearful & alone"}</span><h3>${b.title}</h3>${W.list(b.txt)}`};
  $$("#birthSeg button").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.v;$$("#birthSeg button").forEach(x=>x.setAttribute("aria-pressed",x===b));out()}));
  out();cancelAnimationFrame(raf);raf=requestAnimationFrame(draw);
}};

window.MC_BOOT();
})();
