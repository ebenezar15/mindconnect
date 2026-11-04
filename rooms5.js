/* MindConnect — rooms part 5: Self-healing group (heal, mindheal) */
(function(){
const {$,$$,esc,store,toast,openDrawer,W,ext,reduce,css}=window.MC;
const R=window.ROOMS;

/* ======================= THE SELF-HEALING BODY ======================= */
const PHASES=[
 {k:"Hemostasis",when:"seconds–hours",c:"--stress",d:"Blood vessels tighten, platelets rush in and stick together, and a fibrin mesh forms a clot. The bleeding stops within minutes. Nobody has to tell your body to do this.",
  svg:`<rect x="20" y="120" width="400" height="70" fill="var(--glory-soft)"/><path d="M200 120 L220 60 L240 120 Z" fill="var(--bg2)"/>
   ${Array.from({length:14},(_,i)=>`<circle r="5" fill="var(--stress)"><animateMotion dur="${2+i%4*.4}s" repeatCount="indefinite" path="M${40+i*25} 170 Q 220 150 ${210+i%5*5} ${110-i%4*8}"/></circle>`).join("")}
   <path d="M205 112 Q220 70 235 112" fill="none" stroke="var(--stress)" stroke-width="3" stroke-dasharray="4 3"><animate attributeName="stroke-opacity" values="0;1" dur="2s" fill="freeze"/></path>
   <text x="220" y="40" text-anchor="middle" font-size="11" fill="var(--muted)">platelets plug the gap · clot forms</text>`},
 {k:"Inflammation",when:"days 1–4",c:"--glory",d:"Redness, warmth and swelling are signs of healing, not failure. White blood cells (neutrophils, then macrophages) flood in to kill germs and clear debris. Then special molecules (resolvins) switch the inflammation off. Chronic stress disrupts that 'off switch'.",
  svg:`<rect x="20" y="120" width="400" height="70" fill="var(--glory-soft)"/><path d="M200 120 Q220 80 240 120 Z" fill="var(--stress)" fill-opacity=".35"/>
   ${Array.from({length:8},(_,i)=>`<circle r="9" fill="var(--fg)" fill-opacity=".55"><animateMotion dur="${3+i*.3}s" repeatCount="indefinite" path="M${30+i*50} 175 Q 220 160 220 112"/></circle>`).join("")}
   <circle cx="220" cy="100" r="40" fill="var(--glory)" opacity=".12"><animate attributeName="r" values="30;50;30" dur="2.4s" repeatCount="indefinite"/></circle>
   <text x="220" y="40" text-anchor="middle" font-size="11" fill="var(--muted)">white cells clean · warmth means work</text>`},
 {k:"Proliferation",when:"days 4–21",c:"--living",d:"Fibroblasts lay down new collagen, new blood vessels sprout (angiogenesis), and skin cells crawl across the wound from the edges to close it. The gap fills with fresh, pink granulation tissue.",
  svg:`<rect x="20" y="120" width="400" height="70" fill="var(--glory-soft)"/>
   <rect x="200" y="110" width="40" height="12" rx="4" fill="var(--living)"><animate attributeName="height" values="0;12" dur="3s" fill="freeze"/></rect>
   <path d="M150 112 L200 112" stroke="var(--living)" stroke-width="5"><animate attributeName="d" values="M150 112 L170 112;M150 112 L218 112" dur="3s" repeatCount="indefinite"/></path>
   <path d="M290 112 L240 112" stroke="var(--living)" stroke-width="5"><animate attributeName="d" values="M290 112 L270 112;M290 112 L222 112" dur="3s" repeatCount="indefinite"/></path>
   ${[0,1,2].map(i=>`<path d="M${200+i*14} 190 q -6 -20 6 -40 t 4 -30" fill="none" stroke="var(--stress)" stroke-width="2"><animate attributeName="stroke-dasharray" values="0 200;200 0" dur="${2.5+i*.4}s" repeatCount="indefinite"/></path>`).join("")}
   <text x="220" y="40" text-anchor="middle" font-size="11" fill="var(--muted)">edges crawl inward · new vessels sprout</text>`},
 {k:"Remodelling",when:"3 weeks–2 years",c:"--violet",d:"The body reorganises the new collagen, strengthening it along lines of stress. Scars fade and flatten over months. Healed tissue regains up to about 80% of its original strength.",
  svg:`<rect x="20" y="120" width="400" height="70" fill="var(--glory-soft)"/>
   ${Array.from({length:10},(_,i)=>`<line x1="${190+i*6}" y1="${125}" x2="${195+i*6}" y2="${185}" stroke="var(--violet)" stroke-width="2"><animate attributeName="x2" values="${230-i*4};${195+i*6}" dur="3s" repeatCount="indefinite"/></line>`).join("")}
   <path d="M200 120 L240 120" stroke="var(--violet)" stroke-width="2" opacity=".6"/>
   <text x="220" y="40" text-anchor="middle" font-size="11" fill="var(--muted)">fibres realign · scar strengthens and fades</text>`}
];
const SYSTEMS=[
 {k:"Skin",t:"~4 weeks",d:"The outer skin is completely replaced about every 2–4 weeks. Cuts close using the four-phase sequence above.",m:"Stress hormones slow skin-barrier repair; dental students' wounds healed 40% slower at exam time (Marucha, 1998)."},
 {k:"Gut lining",t:"3–5 days",d:"The fastest-renewing tissue in the body. Stem cells in the gut wall rebuild the lining every few days.",m:"The gut is wired to the brain through the vagus nerve. Anxiety disturbs gut motility and barrier function; calm restores them."},
 {k:"Blood",t:"~120 days",d:"Bone marrow makes about 2–3 million red cells every second; each lives about 4 months.",m:"Chronic stress shifts marrow toward producing more inflammatory white cells."},
 {k:"Bone",t:"~10 years",d:"Bone is living tissue, constantly remodelled. A fracture heals through a soft callus, then hard bone, then reshaping.",m:"Long-term high cortisol thins bone. Weight-bearing movement and sunlight (vitamin D) strengthen it."},
 {k:"Liver",t:"weeks",d:"The liver can regrow to near full size from as little as a quarter of its tissue: the body's most famous regenerator.",m:"Alcohol and chronic stress both strain it; rest and good food let it regenerate."},
 {k:"Immune system",t:"constant",d:"Patrols for invaders and abnormal cells, remembers past infections, and clears damaged cells.",m:"Loneliness and stress turn on inflammatory genes and turn down antiviral ones; connection reverses the pattern."},
 {k:"DNA repair",t:"every day",d:"Each cell repairs tens of thousands of DNA lesions daily using dedicated repair enzymes.",m:"Oxidative stress from chronic psychological stress increases DNA damage."},
 {k:"Brain cleaning",t:"nightly",d:"During sleep the brain's interstitial space expands about 60% and cerebrospinal fluid flushes out waste such as beta-amyloid (Xie et al., Science 2013, in mice).",m:"Worry that steals sleep steals the brain's cleaning cycle."},
 {k:"Nerves",t:"~1 mm/day",d:"Peripheral nerves can regrow about a millimetre a day after injury. The brain rewires around damage through plasticity.",m:"Learning, hope and practice drive rewiring after stroke or injury."},
 {k:"Heart muscle",t:"~1%/yr",d:"Heart cells renew slowly, about 1% a year in young adults and less with age (Bergmann et al., 2009). Blood vessels repair their lining continually.",m:"Hostility and chronic anger damage blood vessels; gratitude and calm protect them."}
];
const CLOCK=[["Gut lining",4,"--living"],["Skin",28,"--glory"],["Red blood cells",120,"--stress"],["Fat cells",3000,"--violet"],["Skeleton",3650,"--violet"]];
R.heal={html:()=>`
${W.head("Self-healing · The healing body","Your body was designed to heal itself","'I am the LORD, your healer' (Exod 15:26). God built healing into every tissue. Cut your finger and a thousand processes begin without your permission. Watch them, then see how much your mind affects how fast they work.")}
<section class="panel"><div class="row" style="justify-content:space-between"><span class="mono muted">A cut heals in four phases · motion graphic</span><button class="btn" type="button" id="phPlay">Auto-play</button></div>
 <div class="pills" id="phPills" style="margin-top:10px">${PHASES.map((p,i)=>`<button type="button" class="pill" data-i="${i}" aria-pressed="${i===0}"><span class="mono" style="opacity:.6">${i+1}</span> ${p.k}</button>`).join("")}</div>
 <div class="split" style="margin-top:14px"><div class="diagram"><svg id="phSvg" viewBox="0 0 440 210" role="img" aria-label="Wound healing phase"></svg></div><div id="phOut" style="display:flex;flex-direction:column;gap:10px"></div></div>
 <div class="diagram" style="margin-top:12px"><svg viewBox="0 0 700 40" role="img" aria-label="Healing timeline"><line x1="10" y1="20" x2="690" y2="20" stroke="var(--line)" stroke-width="3"/>${PHASES.map((p,i)=>`<rect x="${10+i*170}" y="12" width="${165}" height="16" rx="8" fill="var(${p.c})" fill-opacity=".3"/><text x="${92+i*170}" y="24" text-anchor="middle" font-size="10" fill="var(--fg)">${p.when}</text>`).join("")}<circle id="phMark" cx="92" cy="20" r="10" fill="none" stroke="var(--fg)" stroke-width="2"/></svg></div>
</section>
${W.sec("Ten self-healing systems","Tap any system to see how it renews and how the mind affects it.",`
<div class="split"><div class="panel"><div class="diagram"><svg id="sysMap" viewBox="0 0 440 440" style="min-width:300px" role="img" aria-label="Map of self-healing systems">
 <circle cx="220" cy="220" r="64" fill="var(--glory-soft)" stroke="var(--glory)"/><text x="220" y="214" text-anchor="middle" font-family="var(--f-display)" font-size="17" fill="var(--fg)">Healer</text><text x="220" y="232" text-anchor="middle" font-size="10" fill="var(--muted)">Exod 15:26 · Rapha</text>
 <circle cx="220" cy="220" r="160" fill="none" stroke="var(--line)" stroke-dasharray="3 6"><animateTransform attributeName="transform" type="rotate" from="0 220 220" to="360 220 220" dur="60s" repeatCount="indefinite"/></circle>
 ${SYSTEMS.map((s,i)=>{const a=-Math.PI/2+i*2*Math.PI/SYSTEMS.length,x=220+160*Math.cos(a),y=220+160*Math.sin(a);return`<g class="sysn" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><line x1="${220+66*Math.cos(a)}" y1="${220+66*Math.sin(a)}" x2="${x}" y2="${y}" stroke="var(--living)" stroke-opacity=".3" class="flow-dash"/><circle cx="${x}" cy="${y}" r="34" fill="var(--bg2)" stroke="var(--living)" stroke-width="2"/><text x="${x}" y="${y-1}" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg)">${s.k}</text><text x="${x}" y="${y+13}" text-anchor="middle" font-size="9" fill="var(--muted)">${s.t}</text></g>`}).join("")}
</svg></div></div><div class="panel" id="sysOut" style="display:flex;flex-direction:column;gap:12px"></div></div>`)}
${W.sec("The renewal clock","Each dot completes one lap per renewal cycle (speeds scaled for viewing). You are being rebuilt all the time.",`
<div class="panel split" style="box-shadow:none"><div class="diagram"><svg viewBox="0 0 300 300" style="min-width:0;max-width:340px;margin:auto" role="img" aria-label="Renewal clock">
 ${CLOCK.map(([k,d,c],i)=>{const r=40+i*24;const dur=Math.max(2,Math.log10(d)*7).toFixed(1);return`<circle cx="150" cy="150" r="${r}" fill="none" stroke="var(${c})" stroke-opacity=".25"/><circle r="6" fill="var(${c})"><animateMotion dur="${dur}s" repeatCount="indefinite" path="M150 ${150-r} A${r} ${r} 0 1 1 149.9 ${150-r}"/></circle>`}).join("")}
 <circle cx="150" cy="150" r="22" fill="var(--glory-soft)"/><text x="150" y="154" text-anchor="middle" font-size="10" fill="var(--fg)">you</text>
</svg></div><div style="display:flex;flex-direction:column;gap:8px">${CLOCK.map(([k,d,c])=>`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:6px"><span><b style="color:var(${c})">●</b> ${k}</span><span class="mono muted">${d<60?d+" days":d<400?Math.round(d/30)+" months":Math.round(d/365)+" years"}</span></div>`).join("")}
<p class="muted" style="font-size:.88rem">'Though our outer self is wasting away, our inner self is being renewed day by day' (2 Cor 4:16). Even the outer self is renewing far more than we realise.</p></div></div>`)}
${W.sec("The mind's hand on the healing dial","Move the sliders to see how a typical small wound's healing time changes. Based on the direction of real studies; numbers are illustrative.",`
<div class="split">
 <div class="panel" style="display:flex;flex-direction:column;gap:10px">
  ${[["sleep","Sleep quality",60],["stress","Chronic stress & worry",60],["bond","Warm relationships",50],["hope","Hope & positive expectation",50],["hostile","Conflict & hostility",30],["body","Nutrition & movement",55]].map(([k,t,v])=>`<label class="lbl" for="hd-${k}"><span>${t}</span><span class="mono" id="hv-${k}">${v}</span></label><input id="hd-${k}" type="range" min="0" max="100" value="${v}">`).join("")}
 </div>
 <div class="panel" style="display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center">
  <div class="diagram" style="max-width:300px"><svg viewBox="0 0 260 120" style="min-width:0" role="img" aria-label="Wound closing">
   <rect x="10" y="40" width="240" height="40" rx="8" fill="var(--glory-soft)"/>
   <path id="gapL" d="M10 40 L130 40 L130 80 L10 80 Z" fill="var(--living)" fill-opacity=".5"/><path id="gapR" d="M250 40 L130 40 L130 80 L250 80 Z" fill="var(--living)" fill-opacity=".5"/>
  </svg></div>
  <div style="font-family:var(--f-display);font-size:2.6rem;line-height:1" id="healDays">10</div><span class="mono muted">days to close (illustrative)</span>
  <p id="healTxt" class="muted" style="font-size:.92rem"></p>
 </div>
</div>
<div class="grid">
 ${[["40% slower","Small mouth wounds took 40% longer to heal during exam stress than in the summer holidays (Marucha et al., 1998).","--stress"],
   ["~9 days longer","Wounds took about 48.7 vs 39.3 days to heal in stressed caregivers compared with controls (Kiecolt-Glaser et al., Lancet 1995).","--stress"],
   ["Hostility slows it","Couples' wounds healed more slowly after hostile conflict than after supportive talks (Kiecolt-Glaser et al., 2005).","--stress"],
   ["A window on trees","Surgery patients with a view of trees went home sooner and needed fewer strong painkillers than those facing a brick wall (Ulrich, Science 1984).","--living"],
   ["Expectation heals","Placebo responses release real endorphins and dopamine, reduce pain and inflammation symptoms, and work best with warm, trusted care.","--living"],
   ["The inflammatory reflex","The vagus nerve can switch off excess inflammation. In a small trial, vagus stimulation reduced inflammatory cytokines in rheumatoid arthritis and about 30% reached remission at 42 days (Koopman et al., PNAS 2016).","--living"]
 ].map(([n,d,c])=>`<div class="card"><span style="font-family:var(--f-display);font-size:1.4rem;color:var(${c});line-height:1.1">${n}</span><p>${d}</p></div>`).join("")}
</div>`)}
${W.sec("The inflammatory reflex: a calm mind cools the body","The brain senses inflammation through the vagus nerve and can send a 'stand down' signal back. Calm, slow breathing and safety strengthen vagal tone.",`
<div class="panel"><div class="diagram"><svg viewBox="0 0 700 200" role="img" aria-label="Inflammatory reflex loop">
 ${[["Brain",90,"--violet","senses & decides"],["Vagus nerve",250,"--living","the messenger"],["Spleen",410,"--glory","relay station"],["Immune cells",570,"--stress","release less TNF"]].map(([t,x,c,s])=>`<circle cx="${x}" cy="90" r="42" fill="var(${c})" fill-opacity=".14" stroke="var(${c})" stroke-width="2"/><text x="${x}" y="88" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">${t}</text><text x="${x}" y="104" text-anchor="middle" font-size="9.5" fill="var(--muted)">${s}</text>`).join("")}
 <path d="M132 80 L208 80 M292 80 L368 80 M452 80 L528 80" stroke="var(--living)" stroke-width="2.5" class="flow-dash"/>
 <path d="M570 132 C 520 190, 140 190, 90 132" fill="none" stroke="var(--stress)" stroke-width="2" stroke-dasharray="5 6" class="flow-dash"/>
 <text x="330" y="188" text-anchor="middle" font-size="10.5" fill="var(--stress)">inflammation signals travel up the vagus to the brain</text>
 <text x="330" y="40" text-anchor="middle" font-size="10.5" fill="var(--living)">'stand down' signal travels back: the acetylcholine anti-inflammatory pathway</text>
 <circle r="6" fill="var(--living)"><animateMotion dur="3s" repeatCount="indefinite" path="M132 80 L528 80"/></circle>
</svg></div></div>`)}
${W.sec("God's design for healing: what Scripture shows",null,`
<div class="grid">
 ${[["The Healer's name","'I am the LORD, your healer (Yahweh Rapha)' (Exod 15:26). Healing is part of who God is, not an occasional exception.","Exod 15:26 · Ps 103:3"],
   ["Words that heal flesh","'Keep my words… they are life to those who find them, and healing (marpe) to all their flesh' (Prov 4:20-22). Also: 'It will be healing to your flesh and refreshment to your bones' (Prov 3:8).","Prov 4:20-22 · Prov 3:7-8"],
   ["Compassion speeds healing","'If you pour yourself out for the hungry… your healing shall spring up speedily' (Isa 58:8-10). Generosity and compassion are linked to lower inflammation today.","Isa 58:8"],
   ["Restoring the design","Jesus healed by restoring what was meant to be: sight, limbs, skin, minds. 'Stretch out your hand… and it was restored' (Mark 3:5).","Mark 3:5 · Matt 15:31"],
   ["Healing through connection","The woman who touched his garment was healed, and Jesus would not let her leave as a nameless case. He called her 'Daughter' (Mark 5:34). Healing is relational.","Mark 5:25-34"],
   ["Means are God's too","Isaiah prescribed a fig poultice (Isa 38:21); Paul recommended wine for Timothy's stomach (1 Tim 5:23); Luke was a physician. God heals through the body's systems and through medicine.","Isa 38:21 · Col 4:14"],
   ["Rest built in","Sabbath, sleep ('he gives to his beloved sleep', Ps 127:2) and Elijah's food and rest (1 Kgs 19) are healing rhythms written into creation.","Ps 127:2 · Mark 6:31"],
   ["Limits point forward","Some things the body can't regrow (a lost limb, an ageing brain). These limits point to the resurrection body that will be fully healed (Phil 3:21).","Rom 8:23 · Phil 3:21"]
 ].map(([t,d,v])=>`<div class="card"><h4>${t}</h4><p>${d}</p><span class="ref">${v}</span></div>`).join("")}
</div>`)}
${W.sec("A daily healing rhythm",null,`<div class="panel">${W.steps([
 "<b>Morning:</b> sunlight in your eyes for 10 minutes, a glass of water, and thanks: 'Bless the LORD, O my soul… who heals all your diseases' (Ps 103:1-3).",
 "<b>Through the day:</b> three 2-minute breath prayers (inhale 4, exhale 6) to keep the vagus nerve in charge.",
 "<b>Meals:</b> whole foods, colour and protein: the building blocks for repair. Eat in peace, not in a rush.",
 "<b>Movement:</b> 30 minutes of walking or play. It increases blood flow to healing tissue and clears stress hormones.",
 "<b>Connection:</b> one warm conversation, one act of kindness (Isa 58:8).",
 "<b>Evening:</b> release the day's grudges and worries to the Father (Eph 4:26; 1 Pet 5:7). Screens off an hour before bed.",
 "<b>Night:</b> 7–9 hours of sleep: the body's main repair shift. 'In peace I will both lie down and sleep' (Ps 4:8).",
 "<b>When sick or injured:</b> see your doctor, ask for prayer (Jas 5:14-16), speak healing promises, and give the body time to do what God designed."])}</div>`)}
`,mount(){
  let pi=0,auto=null;const show=i=>{pi=(i+PHASES.length)%PHASES.length;const p=PHASES[pi];$$("#phPills .pill").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===pi));
   $("#phSvg").innerHTML=p.svg;$("#phMark").setAttribute("cx",92+pi*170);$("#phOut").innerHTML=`<span class="tag" style="color:var(${p.c})">Phase ${pi+1} of 4 · ${p.when}</span><h3>${p.k}</h3><p>${p.d}</p>`};
  $$("#phPills .pill").forEach(b=>b.addEventListener("click",()=>{clearInterval(auto);auto=null;$("#phPlay").textContent="Auto-play";show(+b.dataset.i)}));show(0);
  $("#phPlay").onclick=()=>{if(auto){clearInterval(auto);auto=null;$("#phPlay").textContent="Auto-play";return}$("#phPlay").textContent="Pause";auto=setInterval(()=>{if(!$("#phSvg")){clearInterval(auto);return}show(pi+1)},4500)};
  const ss=i=>{const s=SYSTEMS[i];$$("#sysMap .sysn circle").forEach((c,j)=>c.setAttribute("stroke-width",j===i?4:2));$("#sysOut").innerHTML=`<span class="tag l">Renews: ${s.t}</span><h3>${s.k}</h3><p>${s.d}</p><div class="card" style="background:var(--bg)"><span class="tag g">Mind connection</span><p style="color:var(--fg)">${s.m}</p></div>`};
  $$("#sysMap .sysn").forEach(g=>{g.addEventListener("click",()=>ss(+g.dataset.i));g.addEventListener("keydown",e=>{if(e.key==="Enter")ss(+g.dataset.i)})});ss(7);
  const v=k=>+$("#hd-"+k).value;
  const upd=()=>{["sleep","stress","bond","hope","hostile","body"].forEach(k=>$("#hv-"+k).textContent=v(k));
   const f=1+(v("stress")-50)*.008+(v("hostile")-30)*.005-(v("sleep")-50)*.005-(v("bond")-50)*.004-(v("hope")-50)*.003-(v("body")-50)*.003;
   const d=Math.max(5,Math.round(10*f*10)/10);$("#healDays").textContent=d.toFixed(1);
   const prog=Math.max(0,Math.min(1,(16-d)/11));$("#gapL").setAttribute("d",`M10 40 L${70+prog*60} 40 L${70+prog*60} 80 L10 80 Z`);$("#gapR").setAttribute("d",`M250 40 L${190-prog*60} 40 L${190-prog*60} 80 L250 80 Z`);
   $("#healTxt").textContent=d<9?"Repair mode: sleep, calm and connection let the four phases run at full speed.":d<12?"Healing is happening, but stress hormones are slowing the inflammation and repair phases.":"Survival mode is starving repair. Cortisol suppresses the cells and signals that close wounds."};
  $$("[id^=hd-]").forEach(i=>i.addEventListener("input",upd));upd();
}};

/* ======================= DOES THE MIND HEAL ITSELF? ======================= */
const MPH=[
 {b:"Hemostasis",m:"Safety",c:"--stress",d:"First, stop the bleeding: get out of danger, find a safe person, steady the body. A mind still under threat cannot heal. 'He makes me lie down in green pastures' (Ps 23:2)."},
 {b:"Inflammation",m:"Feeling & lament",c:"--glory",d:"Emotions surface: tears, anger, grief. Like inflammation, this is the cleaning phase, not a malfunction. Emotional tears and naming feelings calm the stress system. 'Jesus wept' (John 11:35)."},
 {b:"Proliferation",m:"Truth & meaning",c:"--living",d:"New tissue: new understanding, new connections, a story that includes God's presence. Writing, talking and Scripture help the mind knit a new narrative. 'You meant evil… God meant it for good' (Gen 50:20)."},
 {b:"Remodelling",m:"Integration",c:"--violet",d:"The memory is still there, but it no longer controls you. The scar becomes a testimony. Jesus' risen body kept its scars, healed and glorious (John 20:27)."}
];
const TOOLS=[
 ["Sleep & dreaming","REM sleep replays emotional memories with stress chemistry (noradrenaline) turned down, softening their sting: 'overnight therapy' (Walker & van der Helm, 2009).","Ps 4:8"],
 ["Tears","Crying activates the calming parasympathetic system and draws comfort from others.","Ps 56:8"],
 ["Naming feelings","Putting feelings into words reduces amygdala activity (Lieberman et al., 2007).","Ps 62:8"],
 ["Writing","Expressive writing about painful experiences for 15–20 minutes over a few days improved health and mood in many studies (Pennebaker).","Hab 2:2"],
 ["Movement & nature","Exercise grows new brain connections; nature restores attention and lowers rumination.","Mark 6:31"],
 ["Play & laughter","Laughter lowers stress hormones and builds connection. 'A joyful heart is good medicine' (Prov 17:22).","Prov 17:22"],
 ["Memory reconsolidation","When a painful memory is recalled alongside a new, contradicting experience of safety or truth, the brain can update it (Nader, Ecker).","John 21:9-17"],
 ["Relationship","Safe, attuned relationships are the strongest healer of the mind: 'wounded in relationship, healed in relationship'. Even insecure attachment can become 'earned secure'.","Ps 68:6"]
];
const STUCK=[
 {k:"Trauma",d:"Overwhelming events can be stored as fragments with no time-stamp, so they replay as if happening now. The alarm system stays stuck on. This usually needs safe help (trauma-informed therapy such as EMDR, plus community and prayer)."},
 {k:"Shame",d:"Shame says 'hide', and hiding blocks the very connection that heals. It feeds itself. 'You can identify a lie privately. You cannot be accepted privately.'"},
 {k:"Lies about God",d:"The mind cannot generate a true picture of the Father by itself. That takes revelation: 'No one knows the Father except the Son and anyone to whom the Son chooses to reveal him' (Matt 11:27)."},
 {k:"Self-salvation strategies",d:"Performance, control and escape (fig leaves and hiding, Gen 3:7-8) feel like coping but keep the wound open."},
 {k:"Isolation",d:"Pain borne alone tends to fester. God's first 'not good' was aloneness (Gen 2:18)."},
 {k:"Chronic stress & no sleep",d:"Without sleep and rest, the mind's built-in processing can't run."}
];
const CHECK=[
 ["I can think about what happened without being flooded",1],["I'm sleeping reasonably well most nights",1],["I have at least one person I can be honest with",1],["I can feel sadness or anger and it passes",1],
 ["I avoid people, places or thoughts that remind me of it",0],["Images or memories intrude when I don't want them",0],["I'm using something (screens, food, substances, busyness) to numb it",0],["I feel it was my fault or that I'm damaged",0]
];
R.mindheal={html:()=>`
${W.head("Self-healing · The healing mind","Does the mind heal itself?","Partly, yes. God built remarkable self-repair into the mind: sleep, tears, grief, meaning-making, plasticity. But the mind was designed to heal in relationship, and some wounds get stuck without safety, truth and love. 'He restores my soul' (Ps 23:3).")}
${W.sec("Body and mind heal in the same four phases","Toggle between the body's wound and the mind's wound. The pattern is the same.",`
<div class="panel"><div class="seg" id="mphSeg"><button type="button" data-v="mind" aria-pressed="true">Mind</button><button type="button" data-v="body" aria-pressed="false">Body</button></div>
<div class="diagram" style="margin-top:14px"><svg id="mphSvg" viewBox="0 0 720 170" role="img" aria-label="Four phases of mind healing"></svg></div>
<div id="mphOut" class="card" style="background:var(--bg);margin-top:10px"></div></div>`)}
${W.sec("The mind's built-in healing tools","God designed these into your brain and body. Most are free.",`<div class="grid">${TOOLS.map(([t,d,v])=>`<div class="card"><h4>${t}</h4><p>${d}</p><span class="ref">${v}</span></div>`).join("")}</div>
<div class="grid two">
 <div class="card"><span class="tag l">Resilience is common</span><p style="color:var(--fg)">In a study of bereaved spouses, the most common pattern was resilience: people grieved but kept functioning, while chronic distress affected a minority, often estimated at 10–20% (Bonanno et al., 2002). Masten calls resilience 'ordinary magic'.</p></div>
 <div class="card"><span class="tag g">Growth after trauma</span><p style="color:var(--fg)">Many people report post-traumatic growth: deeper relationships, new priorities, spiritual depth and strength (Tedeschi & Calhoun). Joseph named his son Ephraim, 'God has made me fruitful in the land of my affliction' (Gen 41:52).</p></div>
</div>`)}
${W.sec("When the mind gets stuck","Six things that block the mind's self-healing. Tap one.",`
<div class="split"><div class="panel"><div class="diagram"><svg id="stuckSvg" viewBox="0 0 440 360" style="min-width:300px" role="img" aria-label="What blocks healing">
 <circle cx="220" cy="180" r="62" fill="var(--living-soft)" stroke="var(--living)"/><text x="220" y="176" text-anchor="middle" font-family="var(--f-display)" font-size="16" fill="var(--fg)">Natural</text><text x="220" y="194" text-anchor="middle" font-family="var(--f-display)" font-size="16" fill="var(--fg)">healing</text>
 ${STUCK.map((s,i)=>{const a=-Math.PI/2+i*2*Math.PI/STUCK.length,x=220+145*Math.cos(a),y=180+130*Math.sin(a);return`<g class="stk" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><line x1="${220+64*Math.cos(a)}" y1="${180+64*Math.sin(a)}" x2="${x}" y2="${y}" stroke="var(--stress)" stroke-width="2" stroke-dasharray="2 6"/><rect x="${x-64}" y="${y-17}" width="128" height="34" rx="17" fill="var(--bg2)" stroke="var(--stress)"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--fg)">${s.k}</text></g>`}).join("")}
</svg></div></div><div class="panel" id="stuckOut" style="display:flex;flex-direction:column;gap:12px"></div></div>`)}
${W.sec("Healing flow: natural path vs stuck loop",null,`
<div class="panel"><div class="diagram"><svg viewBox="0 0 740 250" role="img" aria-label="Healing flowchart">
 <rect x="10" y="100" width="100" height="44" rx="22" fill="var(--bg)" stroke="var(--glory)"/><text x="60" y="126" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">Wound</text>
 <polygon points="190,90 250,122 190,154 130,122" fill="var(--bg)" stroke="var(--violet)"/><text x="190" y="120" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg)">Safe &</text><text x="190" y="133" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg)">connected?</text>
 <path d="M110 122 L130 122" stroke="var(--muted)" stroke-width="2"/>
 <path d="M190 90 L190 50 L280 50" stroke="var(--living)" stroke-width="2" class="flow-dash" fill="none"/><text x="200" y="70" font-size="10" fill="var(--living)">yes</text>
 ${["Feel & share","Make meaning","Integrate"].map((t,i)=>`<rect x="${280+i*150}" y="30" width="124" height="40" rx="20" fill="var(--living-soft)" stroke="var(--living)"/><text x="${342+i*150}" y="54" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg)">${t}</text>${i<2?`<path d="M${404+i*150} 50 L${430+i*150} 50" stroke="var(--living)" stroke-width="2" class="flow-dash"/>`:""}`).join("")}
 <path d="M190 154 L190 200 L280 200" stroke="var(--stress)" stroke-width="2" class="flow-dash" fill="none"/><text x="200" y="180" font-size="10" fill="var(--stress)">no</text>
 ${["Avoid · numb","Ruminate","Symptoms"].map((t,i)=>`<rect x="${280+i*150}" y="180" width="124" height="40" rx="20" fill="var(--stress-soft)" stroke="var(--stress)"/><text x="${342+i*150}" y="204" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg)">${t}</text>${i<2?`<path d="M${404+i*150} 200 L${430+i*150} 200" stroke="var(--stress)" stroke-width="2" class="flow-dash"/>`:""}`).join("")}
 <path d="M640 180 C 640 140, 250 150, 230 140" fill="none" stroke="var(--glory)" stroke-width="2" stroke-dasharray="5 6" class="flow-dash"/>
 <text x="460" y="140" text-anchor="middle" font-size="10.5" fill="var(--glory)">add safety: God's presence, a safe person, help → back onto the healing path</text>
</svg></div></div>`)}
${W.sec("Gentle self-check","Not a diagnosis. Tick what's true for you about a painful experience right now.",`
<div class="split"><div class="panel" style="display:flex;flex-direction:column;gap:8px">${CHECK.map(([t,g],i)=>`<label class="row" style="justify-content:space-between;cursor:pointer;font-size:.93rem;gap:12px"><span style="flex:1"><b style="color:var(${g?"--living":"--stress"})">●</b> ${t}</span><input type="checkbox" id="ck-${i}" data-g="${g}"></label>`).join("")}</div>
<div class="panel" id="ckOut" style="display:flex;flex-direction:column;gap:10px"></div></div>`)}
${W.sec("Jesus heals a memory: Peter at the charcoal fire","A biblical picture of memory reconsolidation.",`
<div class="grid two">
 <div class="card"><span class="tag s">The wound · John 18:18, 25-27</span><p style="color:var(--fg)">Peter stood warming himself at a <b>charcoal fire</b> (anthrakia) and denied Jesus <b>three times</b>. The smell, the setting and the shame were seared into memory.</p></div>
 <div class="card"><span class="tag l">The healing · John 21:9-17</span><p style="color:var(--fg)">The risen Jesus made a <b>charcoal fire</b> (the only other use of anthrakia in the New Testament) and asked <b>three times</b>, 'Do you love me?' He recreated the scene of the wound and filled it with love and a new calling. The old memory was reopened and rewritten.</p></div>
</div>
<p class="muted">The same pattern helps us: recall the painful memory in God's presence, notice where Jesus is, and receive a new experience of safety and truth inside it. See the Immanuel-style practices in ${ext("atlas","identity","Atlas · Identity & heart healing")} and ${ext("rewiring","today","Rewiring")}.</p>`)}
${W.sec("Who heals the mind? Three partners",null,`
<div class="grid">
 <div class="card"><span class="tag g">God the Healer</span><p>'He heals the brokenhearted and binds up their wounds' (Ps 147:3). The Spirit is the Comforter (paraklētos, 'one called alongside', John 14:16). Restoring the soul is his work (Ps 23:3).</p></div>
 <div class="card"><span class="tag l">The design he built</span><p>Sleep, tears, plasticity, grief and meaning-making are his gifts already working in you, the way a cut closes by itself.</p></div>
 <div class="card"><span class="tag v">The people he sends</span><p>Friends, family, church, counsellors and doctors. 'Bear one another's burdens' (Gal 6:2). 'Confess… and pray for one another, that you may be healed' (Jas 5:16).</p></div>
</div>
${W.verse("The Spirit of the Lord God is upon me… he has sent me to bind up the brokenhearted, to proclaim liberty to the captives… to give them a beautiful headdress instead of ashes, the oil of gladness instead of mourning.","Isaiah 61:1-3 · Luke 4:18")}`)}
${W.sec("Steps: cooperating with the mind's healing",null,`<div class="panel">${W.steps([
 "<b>Get safe first.</b> Physically, relationally, and in your body: breath prayer, grounding (name 5 things you see), a safe person.",
 "<b>Let feelings move.</b> Cry, lament, name it. Use a lament psalm as a template (Ps 13, 42, 88).",
 "<b>Sleep and move.</b> Protect 7–9 hours of sleep and walk daily; they run the brain's own processing.",
 "<b>Write it.</b> 15 minutes, three days in a row: what happened, how it felt, what it meant, and where God was.",
 "<b>Exchange the lie.</b> Find the belief the wound left behind and bring it to the Father (Rewire studio).",
 "<b>Revisit with Jesus.</b> Gently recall the memory in his presence and ask what he wants you to know. Stop if you're flooded.",
 "<b>Tell it to someone safe.</b> Healing happens in being known.",
 "<b>Get help if stuck.</b> If symptoms last more than a month, or you feel unsafe, see a trauma-informed counsellor or doctor. That's part of God's provision."])}</div>
<div class="row"><a class="btn primary" href="#rewire">Go to the Rewire studio →</a></div>`)}
`,mount(){
  let mode="mind",sel=0;
  const draw=()=>{$$("#mphSeg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===mode));
   $("#mphSvg").innerHTML=MPH.map((p,i)=>{const x=20+i*175;return`<g class="mph" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><rect x="${x}" y="40" width="150" height="70" rx="16" fill="var(${p.c})" fill-opacity="${i===sel?.3:.12}" stroke="var(${p.c})" stroke-width="${i===sel?3:1.5}"/><text x="${x+75}" y="70" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)">${mode==="mind"?p.m:p.b}</text><text x="${x+75}" y="90" text-anchor="middle" font-size="10" fill="var(--muted)">${mode==="mind"?"body: "+p.b:"mind: "+p.m}</text>${i<3?`<path d="M${x+150} 75 L${x+175} 75" stroke="var(--muted)" stroke-width="2" class="flow-dash"/>`:""}</g>`}).join("")+`<circle r="7" fill="var(--glory)"><animateMotion dur="6s" repeatCount="indefinite" path="M95 130 L620 130"/></circle><line x1="95" y1="130" x2="620" y2="130" stroke="var(--line)" stroke-width="2"/><text x="360" y="160" text-anchor="middle" font-size="10.5" fill="var(--muted)">healing moves forward, but it can loop back; that's normal</text>`;
   $$("#mphSvg .mph").forEach(g=>{const f=()=>{sel=+g.dataset.i;draw()};g.addEventListener("click",f);g.addEventListener("keydown",e=>{if(e.key==="Enter")f()})});
   const p=MPH[sel];$("#mphOut").innerHTML=`<span class="tag" style="color:var(${p.c})">Phase ${sel+1}: ${p.b} → ${p.m}</span><p style="color:var(--fg)">${p.d}</p>`};
  $$("#mphSeg button").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.v;draw()}));draw();
  const sk=i=>{const s=STUCK[i];$$("#stuckSvg .stk rect").forEach((r,j)=>r.setAttribute("stroke-width",j===i?3:1));$("#stuckOut").innerHTML=`<span class="tag s">Blocker ${i+1} of ${STUCK.length}</span><h3>${s.k}</h3><p>${s.d}</p>`};
  $$("#stuckSvg .stk").forEach(g=>{g.addEventListener("click",()=>sk(+g.dataset.i));g.addEventListener("keydown",e=>{if(e.key==="Enter")sk(+g.dataset.i)})});sk(0);
  const ck=()=>{let good=0,bad=0;CHECK.forEach(([,g],i)=>{if($("#ck-"+i).checked)g?good++:bad++});
   const r=bad>=3?{t:"Signs the healing may be stuck",c:"s",d:"Several signs suggest the wound hasn't been able to finish healing on its own. That's not failure. It usually means more safety and support are needed: tell a trusted person, consider a trauma-informed counsellor, and use the steps below gently."}:
    good>=3&&bad<=1?{t:"Signs of natural healing",c:"l",d:"Your mind's healing systems seem to be working. Keep protecting sleep, honest connection and time with God. Expect waves; they get smaller."}:
    {t:"Healing in progress",c:"g",d:"A mixed picture is normal. Notice which blockers apply (above) and add one support this week: a conversation, a writing session, or a breath prayer practice."};
   $("#ckOut").innerHTML=`<span class="tag ${r.c}">${good} healing signs · ${bad} stuck signs</span><h3>${r.t}</h3><p>${r.d}</p><p class="muted" style="font-size:.82rem">Nothing here is saved or sent anywhere. If you feel unsafe or think about harming yourself, contact local emergency services or a crisis line now.</p>`};
  CHECK.forEach((_,i)=>$("#ck-"+i).addEventListener("change",ck));ck();
}};

window.MC_BOOT();
})();
