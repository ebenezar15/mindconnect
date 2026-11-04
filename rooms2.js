/* MindConnect — rooms part 2: toxic, sickness, life, faith, adam, ot, rewire, refs */
(function(){
const {$,$$,esc,store,toast,openDrawer,W,ext}=window.MC;
const D=window.DATA,R=window.ROOMS;

/* ======================= 07 TOXIC ======================= */
const FLESH=[["Sexual immorality, impurity","Dopamine compulsion, shame stress"],["Idolatry, sorcery","Control and fear-driven living"],["Hostility, strife","Hostility is a heart-disease risk"],["Jealousy, envy","'Rots the bones' (Prov 14:30)"],["Fits of anger","Adrenaline spikes, raised BP"],["Rivalries, divisions","Chronic social threat"],["Drunkenness, orgies","Numbing that damages liver and brain"]];
const FRUIT=[["Love","Oxytocin, bonding, lower inflammation"],["Joy","Dopamine & endorphins, vagal tone"],["Peace","Parasympathetic repair mode"],["Patience","PFC online, amygdala regulated"],["Kindness, goodness","'Helper's high', longer life"],["Faithfulness","Secure attachment, trust"],["Gentleness, self-control","Executive control, stable habits"]];
const TIME=[
 {t:"1 day",bad:"A spike of cortisol and adrenaline. A tense evening, poor sleep. Easily recovered.",good:"A calm evening, connection, deep sleep. The body repairs overnight."},
 {t:"1 month",bad:"Worry loops are becoming automatic. Irritability, gut upset, frequent colds.",good:"New thought paths forming. More patience. Others notice you're lighter."},
 {t:"1 year",bad:"Raised blood pressure, weight gain, insomnia, strained relationships, a hardened belief: 'this is just who I am'.",good:"New default responses. Better sleep, steadier mood, deeper friendships, measurable drop in stress markers."},
 {t:"10 years",bad:"Higher risk of heart disease, diabetes, depression, autoimmune flares and broken relationships. Children learn the same patterns.",good:"A character marked by the fruit of the Spirit. Better health in later life, a legacy of secure attachment for the next generation."}
];
R.toxic={html:()=>`
${W.head("Room 07 · Toxic vs life-giving","What poisons the mind, and what heals it","'Whatever one sows, that will he also reap' (Gal 6:7-8). Toxic patterns are rarely just 'bad habits'; each one is a lie protecting a wound. Tap any card to see the lie, the body cost, the life cost and the antidote.")}
<div class="grid" id="toxGrid">${D.toxins.map((t,i)=>`<button type="button" class="card click" data-i="${i}" style="text-align:left"><span class="tag s">Toxic pattern</span><h4>${t.name}</h4><p>${esc(t.lie)}</p></button>`).join("")}</div>
${W.sec("Works of the flesh vs fruit of the Spirit","Galatians 5:19-23 read alongside physiology.",`
<div class="compare"><div class="bad"><b>Works of the flesh · Gal 5:19-21</b>${W.list(FLESH.map(([a,b])=>`<span style="color:var(--fg)">${a}</span> <span class="muted">· ${b}</span>`))}</div>
<div class="ok"><b>Fruit of the Spirit · Gal 5:22-23</b>${W.list(FRUIT.map(([a,b])=>`<span style="color:var(--fg)">${a}</span> <span class="muted">· ${b}</span>`))}</div></div>
<p class="muted">Notice it's "works" (effort) versus "fruit" (growth from union). Fruit isn't manufactured; it grows from staying connected to the Vine (John 15:5).</p>`)}
${W.sec("The consequence timeline","Drag through time to see where each path leads.",`
<div class="panel" style="display:flex;flex-direction:column;gap:14px">
 <label class="lbl" for="timeSl"><span>Time</span><span id="timeV" class="mono"></span></label><input id="timeSl" type="range" min="0" max="3" step="1" value="0">
 <div class="compare"><div class="bad"><b>Living from toxic patterns</b><p id="tBad"></p></div><div class="ok"><b>Living from renewed truth</b><p id="tGood"></p></div></div>
</div>`)}
`,mount(){
  $$("#toxGrid .card").forEach(c=>c.addEventListener("click",()=>{const t=D.toxins[+c.dataset.i];
   openDrawer(`<span class="tag s">Toxic pattern</span><h2>${t.name}</h2>
   <div class="card"><span class="tag v">The lie underneath</span><p style="color:var(--fg);font-size:1.05rem">${esc(t.lie)}</p></div>
   <div class="card"><span class="tag s">What it does to the body</span><p style="color:var(--fg)">${t.body}</p></div>
   <div class="card"><span class="tag s">What it does to your life</span><p style="color:var(--fg)">${t.life}</p></div>
   <div class="card"><span class="tag l">The antidote</span><p style="color:var(--fg)">${t.antidote}</p><span class="ref">${t.verse}</span></div>
   <a class="btn primary" href="#rewire">Exchange this lie in the Rewire studio →</a>`,b=>{$("a",b).addEventListener("click",()=>window.MC.closeDrawer())})}));
  const upd=()=>{const x=TIME[+$("#timeSl").value];$("#timeV").textContent=x.t;$("#tBad").textContent=x.bad;$("#tGood").textContent=x.good};
  $("#timeSl").addEventListener("input",upd);upd();
}};

/* ======================= 08 SICKNESS ======================= */
const GENE_INPUTS=[["sleep","7–9 hours of sleep"],["move","Regular movement"],["food","Whole-food diet"],["forgive","Forgiveness, no grudges"],["connect","Close relationships"],["peace","Low chronic stress / prayer"]];
R.sickness={html:()=>`
${W.head("Room 08 · Sickness, genes and healing","How sickness forms, and how healing comes","Most sickness is woven from several threads at once. 'Genes load the gun; environment pulls the trigger.' The mind is one thread, a powerful one, but never the only one.")}
<section class="split">
 <div class="panel"><span class="mono muted">Seven threads that weave sickness or health · tap one</span>
  <div class="diagram"><svg id="wheel" viewBox="0 0 420 420" style="min-width:280px" role="img" aria-label="Factors in sickness">
  ${D.sickness.map((s,i)=>{const n=D.sickness.length,a0=i*2*Math.PI/n-Math.PI/2,a1=(i+1)*2*Math.PI/n-Math.PI/2,r=180,ri=70,cx=210,cy=210;
   const p=(a,rr)=>[cx+rr*Math.cos(a),cy+rr*Math.sin(a)];const[a,b,c,d]=[p(a0,r),p(a1,r),p(a1,ri),p(a0,ri)];const m=p((a0+a1)/2,128);
   return`<g class="slice" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><path d="M${a} A${r} ${r} 0 0 1 ${b} L${c} A${ri} ${ri} 0 0 0 ${d} Z" fill="var(${s.c})" fill-opacity=".16" stroke="var(--bg2)" stroke-width="3"/><foreignObject x="${m[0]-48}" y="${m[1]-18}" width="96" height="36"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;line-height:1.15;font-weight:700;text-align:center;color:var(--fg)">${s.k}</div></foreignObject></g>`}).join("")}
  <circle cx="210" cy="210" r="62" fill="var(--bg2)"/><text x="210" y="206" text-anchor="middle" font-family="var(--f-display)" font-size="18" fill="var(--fg)">You</text><text x="210" y="224" text-anchor="middle" font-size="10" fill="var(--muted)">whole person</text>
  </svg></div></div>
 <div class="panel" id="sickOut" style="display:flex;flex-direction:column;gap:12px"></div>
</section>
${W.sec("Your genes are listening","Epigenetics: choices and heart states switch genes on and off. Flip the switches to see an illustrative picture based on Steve Cole's social genomics research.",`
<div class="split panel" style="box-shadow:none">
 <div class="diagram"><svg id="helix" viewBox="0 0 520 200" role="img" aria-label="DNA helix with gene switches"></svg></div>
 <div style="display:flex;flex-direction:column;gap:8px">${GENE_INPUTS.map(([k,t])=>`<label class="row" style="justify-content:space-between;font-size:.92rem;cursor:pointer"><span>${t}</span><input type="checkbox" data-k="${k}" id="g-${k}"></label>`).join("")}
 <p id="geneTxt" class="muted" style="font-size:.9rem"></p></div>
</div>`)}
${W.sec("Is my sickness caused by sin, a curse or lack of faith?","The relational gospel answer starts with Jesus, the exact picture of the Father.",`
<div class="grid">
 <div class="card"><span class="tag g">Jesus never blamed the sick</span><p>"Neither this man nor his parents sinned" (John 9:3). He healed "all who were oppressed by the devil" (Acts 10:38), not 'all whom God was punishing'.</p></div>
 <div class="card"><span class="tag v">Sometimes there is a link</span><p>Jesus told one man "Sin no more, that nothing worse happens" (John 5:14). James links confession and healing (Jas 5:16). Heart issues can feed sickness, but this is for discernment, not accusation.</p></div>
 <div class="card"><span class="tag l">Generational patterns</span><p>Families pass on genes, habits, trauma and beliefs. But "the son shall not suffer for the iniquity of the father" (Ezek 18:20), and Christ "redeemed us from the curse" (Gal 3:13). You can start a new line.</p></div>
 <div class="card"><span class="tag s">Job's friends were wrong</span><p>They insisted suffering proved sin. God rebuked them (Job 42:7). Religious blame adds shame, and shame is itself a sickness-maker.</p></div>
</div>`)}
${W.sec("Two levels of healing","From the Atlas study 'Habits, healing & help'. God heals on both levels and they are not rivals.",W.compare("Creation level (common grace)",[
 "Doctors, medicine, surgery: Luke was 'the beloved physician'","Isaiah's fig poultice for Hezekiah (Isa 38:21)","Sleep, nutrition, exercise, sunlight","Therapy, counselling, community support","The body's built-in repair systems"],
"New-creation level (the Spirit)",[
 "Prayer and anointing in faith (Jas 5:14-15)","Forgiveness, heart healing, identity restored","Gifts of healing and miracles (1 Cor 12:9)","Peace that guards heart and mind (Phil 4:7)","Resurrection: the final, full healing (Rom 8:11)"]).replace('class="bad"','class="ok" style="background:var(--violet-soft)"'))}
<p class="muted">Go deeper: ${ext("atlas","recover","Atlas · Habits, healing & help")} · ${ext("hubs","hub-body","Rewiring Hubs · Body, gut & health")}</p>
`,mount(){
  const out=$("#sickOut");const show=i=>{const s=D.sickness[i];$$("#wheel .slice path").forEach((p,j)=>p.setAttribute("fill-opacity",j===i?.45:.16));out.innerHTML=`<span class="tag" style="color:var(${s.c})">Thread ${i+1} of ${D.sickness.length}</span><h3>${s.k}</h3><p>${s.d}</p>`};
  $$("#wheel .slice").forEach(g=>{g.addEventListener("click",()=>show(+g.dataset.i));g.addEventListener("keydown",e=>{if(e.key==="Enter")show(+g.dataset.i)})});show(2);
  const saved=store.get("genes",{sleep:true,connect:true});
  GENE_INPUTS.forEach(([k])=>{const c=$("#g-"+k);c.checked=!!saved[k];c.addEventListener("change",()=>{saved[k]=c.checked;store.set("genes",saved);helix()})});
  function helix(){const on=GENE_INPUTS.filter(([k])=>saved[k]).length/GENE_INPUTS.length;let s="";const N=18;
   for(let i=0;i<N;i++){const x=20+i*(480/(N-1)),ph=i*.65,y1=100+60*Math.sin(ph),y2=100-60*Math.sin(ph);const good=(i*7%N)/N<on;
    s+=`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="var(${good?"--living":"--stress"})" stroke-width="5" stroke-linecap="round" opacity=".85"/>`}
   let p1="",p2="";for(let i=0;i<=120;i++){const x=20+i*4,ph=i*.65*(17/120)*1.0;p1+=(i?"L":"M")+x+" "+(100+60*Math.sin(ph))+" ";p2+=(i?"L":"M")+x+" "+(100-60*Math.sin(ph))+" "}
   s=`<path d="${p1}" fill="none" stroke="var(--violet)" stroke-width="3"/><path d="${p2}" fill="none" stroke="var(--violet)" stroke-width="3"/>`+s;
   $("#helix").innerHTML=s;
   $("#geneTxt").innerHTML=on>.66?`<b style="color:var(--living)">Repair genes favoured.</b> Lower inflammatory gene expression, stronger antiviral response, healthier stress-response genes and more BDNF.`:on>.33?`<b style="color:var(--glory)">Mixed expression.</b> Each switch you flip shifts the balance. Teal rungs = repair/antiviral; coral = inflammatory.`:`<b style="color:var(--stress)">Inflammation genes favoured.</b> Loneliness and chronic threat up-regulate inflammatory genes and down-regulate antiviral ones (the 'CTRA' pattern).`}
  helix();
}};

/* ======================= 09 LIFE ======================= */
R.life={html:()=>`
${W.head("Room 09 · Beliefs, life and lifespan","Does what you believe manifest in your life?","Yes, but not by magic. Beliefs steer attention, choices, relationships and physiology, and faith connects you to a Person whose will is good. Here is how it works, and where 'manifesting' goes wrong.")}
${W.sec("Five ways beliefs become your life",null,`
<div class="grid">
 ${[["Attention","The brain's filters notice what you expect. Believe you're unwanted and you will spot every slight.","Matt 6:22-23"],
   ["Choices","You only attempt what you believe is possible. Ten spies said 'we can't'; Caleb said 'we can' (Num 13:30-31).","Num 13:30"],
   ["Relationships","People respond to how you treat them. The 'Pygmalion effect': students expected to bloom actually did.","Prov 11:25"],
   ["Body","Beliefs set stress chemistry and gene expression (rooms 04 and 08).","Prov 14:30"],
   ["Faith","Beyond psychology: trust in God's promises opens you to his action. 'According to your faith be it done to you' (Matt 9:29).","Heb 11:6"]
 ].map(([t,d,v])=>`<div class="card"><h4>${t}</h4><p>${d}</p><span class="ref">${v}</span></div>`).join("")}
</div>`)}
${W.sec("Relational faith vs 'manifesting'","Atlas study on belief: God's will is the source; faith is the access.",W.compare("Relational faith",["Source: a loving Father's will, revealed in Jesus","Faith is trust in a Person","Prayer is relationship, including 'not my will'","Includes lament, mystery and the 'not yet'","Fruit: love for others, not only gain for self"],"New Thought / law of attraction",["Source: your mind as a force","Faith is technique: visualise, declare, attract","Prayer becomes control over outcomes","Struggle and sickness are blamed on 'negative thinking'","Fruit: anxiety about every thought, self-focus"]))}
<div class="note">Prov 23:7, "As he thinks in his heart, so is he", is about a stingy host whose words say 'eat' while his heart doesn't mean it. Its point is that the inner reality, not the outward words, reveals the true person. That's still a mind–life principle, but not a formula for getting things.</div>
${W.sec("Long life: what the research shows",null,`
<div class="grid">
 ${[["+7.5 years","People with positive views of ageing lived about 7.5 years longer (Levy et al., 2002, Ohio longitudinal study)."],
   ["11–15%","Longer lifespan in the most optimistic people, and greater odds of reaching 85 (Lee et al., PNAS 2019)."],
   ["#1 factor","Warm relationships were the strongest predictor of health and happiness at 80 (Harvard Study of Adult Development, 85+ years)."],
   ["~50%","Lower mortality risk with strong social ties (Holt-Lunstad meta-analysis of 148 studies)."],
   ["Purpose","A strong sense of purpose is linked to lower mortality and dementia risk (Rush Memory and Aging Project)."],
   ["Faith","Weekly religious service attendance was linked to about 33% lower mortality in the Nurses' Health Study (VanderWeele, 2016)."]
 ].map(([n,d])=>`<div class="card"><span style="font-family:var(--f-display);font-size:2rem;color:var(--glory);line-height:1">${n}</span><p>${d}</p></div>`).join("")}
</div>
${W.verse("With long life I will satisfy him and show him my salvation.","Psalm 91:16 · see also Prov 3:1-2; Eph 6:2-3; Ps 92:14; Ps 103:5")}`)}
${W.sec("Immortality and a sickness-free life",null,`
<div class="grid two">
 <div class="card"><span class="tag g">Eternal life starts now</span><p style="color:var(--fg)">"This is eternal life, that they know you, the only true God, and Jesus Christ" (John 17:3). Eternal life is first a quality of relationship, union with the Father, and it begins the moment you wake up to it.</p><p>Bodily immortality comes through resurrection, not mind power: "this mortal must put on immortality" (1 Cor 15:53). Enoch and Elijah are signs of what God intends, not techniques to copy.</p></div>
 <div class="card"><span class="tag l">Health as direction</span><p style="color:var(--fg)">"I pray that you may prosper and be in health, as your soul prospers" (3 John 2). Health is God's desire, and a prospering soul tends toward a prospering body.</p><p>We live between the 'now' and the 'not yet': healings and long life are real foretastes of the kingdom; full freedom from sickness and death arrives at the resurrection (Rom 8:23). A renewed mind cooperates with this healing; it doesn't replace God or medicine.</p></div>
</div>`)}
${W.sec("How to rewire: the 8-step belief change process","From the Rewiring study on belief formation and character.",`
<div class="panel">${W.steps([
 "<b>Awareness:</b> notice the recurring feeling or reaction. 'What am I believing right now?'",
 "<b>Trace the source:</b> ask the Spirit, 'Who told you that?' (Gen 3:11). When did you first feel this?",
 "<b>Grieve:</b> feel the loss honestly. Lament is part of healing, not a lack of faith.",
 "<b>Challenge:</b> Is it true? What does Jesus' life say about God and about me?",
 "<b>Introduce gospel truth:</b> receive it relationally. Use believable statements ('I am learning that I am loved').",
 "<b>New behaviour:</b> act from the truth in a small, concrete way.",
 "<b>Community:</b> 'You can identify a lie privately. You cannot be accepted privately.'",
 "<b>Repetition:</b> days, months, sometimes 1–3 years. Experience catches up with identity."])}
 <div class="row" style="margin-top:14px"><a class="btn primary" href="#rewire">Practise it in the Rewire studio →</a>${ext("rewiring","study-belief","Full study in Rewiring")}</div></div>`)}
`};

/* ======================= 10 FAITH ======================= */
const OPP=[
 {k:"Legal theology",d:"If God is mainly a judge, then suffering may be his sentence, and asking for healing feels presumptuous. Jesus revealed a Father who heals (Heb 1:3; Acts 10:38).",c:"--stress"},
 {k:"Fear of disappointment",d:"Unanswered prayer hurts. To protect our hearts (and God's reputation), we lower expectations and call it humility.",c:"--violet"},
 {k:"Control & religious power",d:"The Pharisees opposed healings on the Sabbath because they threatened their system (Mark 3:1-6; John 9). Direct access to God bypasses gatekeepers.",c:"--stress"},
 {k:"Cessationism",d:"The belief that miracles ended with the apostles, which makes faith-filled prayer unnecessary.",c:"--violet"},
 {k:"Real abuses",d:"Prosperity preachers who sell 'faith' for money and blame the sick for weak faith have caused real harm. The critics have a point.",c:"--glory"},
 {k:"Materialism",d:"The legal and scientific culture of 'only what can be measured is real' treats faith as delusion or, at best, placebo.",c:"--violet"},
 {k:"Shame",d:"'Who am I to ask?' Orphan thinking can't imagine a Father who says 'Ask… knock… how much more will your Father give' (Matt 7:7-11).",c:"--stress"}
];
R.faith={html:()=>`
${W.head("Room 10 · Faith that moves mountains","Is it true that you receive what you ask without doubting?","Jesus meant it. But he meant it inside a relationship, not as a vending machine. Look at the words, the psychology, the opposition, and the honest tensions.")}
${W.verse("Have faith in God. Truly, I say to you, whoever says to this mountain, 'Be taken up and thrown into the sea,' and does not doubt in his heart, but believes that what he says will come to pass, it will be done for him. Therefore I tell you, whatever you ask in prayer, believe that you have received it, and it will be yours. And whenever you stand praying, forgive…","Mark 11:22-25")}
${W.sec("What the words mean",null,`
<div class="grid">
 <div class="card"><span class="tag g">echete pistin theou</span><h4>"Have the faith of God"</h4><p>Literally "have God's faith". It is a sharing in God's own confidence, not human willpower. The Atlas calls this moving from "faith toward God" to "the faith of God".</p></div>
 <div class="card"><span class="tag v">diakrinō</span><h4>"Does not doubt"</h4><p>The word means to be divided, to judge between two. Doubt is a heart split between two pictures of God. James calls it being "double-minded" (Jas 1:6-8).</p></div>
 <div class="card"><span class="tag l">elabete</span><h4>"Believe that you have received"</h4><p>A past tense. Faith rests in what God has already given in Christ (2 Pet 1:3; Eph 1:3) and lets the visible catch up.</p></div>
 <div class="card"><span class="tag s">aphiete</span><h4>"Whenever you stand praying, forgive"</h4><p>Jesus attaches forgiveness to mountain-moving faith. A heart holding bitterness is divided by definition.</p></div>
</div>`)}
${W.sec("Why it works: the connections","Tap through the chain from relationship to answer.",`
<div class="panel"><div class="diagram"><svg viewBox="0 0 760 180" role="img" aria-label="Faith connections">
 ${[["Knowing the Father","seeing Jesus","--glory"],["Trust","undivided heart","--glory"],["Alignment","asking from his will","--violet"],["Inner coherence","peace, less stress","--living"],["Action","obedience, persistence","--living"],["Answer","God acts","--glory"]].map(([t,s,c],i)=>{const x=15+i*125;return`<g><rect x="${x}" y="50" width="112" height="64" rx="14" fill="var(--bg)" stroke="var(${c})" stroke-width="1.6"/><text x="${x+56}" y="78" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">${t}</text><text x="${x+56}" y="96" text-anchor="middle" font-size="10" fill="var(--muted)">${s}</text>${i<5?`<path class="flow-dash" d="M${x+112} 82 L${x+125} 82" stroke="var(--glory)" stroke-width="2"/>`:""}</g>`}).join("")}
 <text x="380" y="30" text-anchor="middle" font-size="11.5" fill="var(--muted)">1 John 5:14-15 · "if we ask anything according to his will he hears us… we know that we have the requests"</text>
 <text x="380" y="150" text-anchor="middle" font-size="11" fill="var(--muted)">Psychology sees the middle (expectancy, coherence, reduced inner conflict). Faith includes it, and goes beyond it to God himself.</text>
</svg></div></div>`)}
${W.sec("Why religious and legal-minded people push back","Tap any node on the opposition map.",`
<div class="split"><div class="panel"><div class="diagram"><svg id="opp" viewBox="0 0 440 400" style="min-width:300px" role="img" aria-label="Opposition map">
 <circle cx="220" cy="200" r="58" fill="var(--glory-soft)" stroke="var(--glory)"/><text x="220" y="196" text-anchor="middle" font-family="var(--f-display)" font-size="16" fill="var(--fg)">Bold faith</text><text x="220" y="214" text-anchor="middle" font-size="10" fill="var(--muted)">Mark 11:22-24</text>
 ${OPP.map((o,i)=>{const a=-Math.PI/2+i*2*Math.PI/OPP.length,x=220+150*Math.cos(a),y=200+150*Math.sin(a);return`<g class="opn" data-i="${i}" tabindex="0" role="button" style="cursor:pointer"><line x1="${220+60*Math.cos(a)}" y1="${200+60*Math.sin(a)}" x2="${x}" y2="${y}" stroke="var(${o.c})" stroke-dasharray="3 5"/><rect x="${x-58}" y="${y-17}" width="116" height="34" rx="17" fill="var(--bg2)" stroke="var(${o.c})"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg)">${o.k}</text></g>`}).join("")}
</svg></div></div><div class="panel" id="oppOut" style="display:flex;flex-direction:column;gap:12px"></div></div>`)}
${W.sec("Two ditches and a road",null,`
<div class="grid">
 <div class="card"><span class="tag s">Ditch 1 · Faith as a lever</span><p>'Name it and claim it.' God becomes a force to control; when healing doesn't come, the sick person is blamed. Faith turns into another performance.</p></div>
 <div class="card"><span class="tag g">The road · Relational faith</span><p style="color:var(--fg)">Bold asking from a secure child who knows the Father's heart, holds on with persistence (Luke 18:1-8), forgives freely, and trusts him with timing and mystery ("yet not my will", Mark 14:36).</p></div>
 <div class="card"><span class="tag s">Ditch 2 · Unbelief dressed as humility</span><p>'If it be your will' as a way of never really expecting anything. Jesus never asked a leper whether healing was God's will; he said "I am willing" (Mark 1:41).</p></div>
</div>
<p class="note">Honest tensions: Hebrews 11 lists people who "through faith… received back their dead" and others, also commended for faith, who were "tortured… not receiving what was promised" (Heb 11:35-39). Faith is not measured by results. Keep asking boldly, and keep loving when the answer is delayed.</p>`)}
${W.sec("How to pray in faith: practical steps",null,`<div class="panel">${W.steps([
 "<b>Look at Jesus first.</b> Read a healing or provision story until you are sure of the Father's heart (John 14:9).",
 "<b>Find the promise.</b> Ask from God's revealed will, not just your wish (1 John 5:14).",
 "<b>Forgive everyone.</b> Clear the divided heart (Mark 11:25).",
 "<b>Ask simply and specifically.</b> Then thank him as though it's given (Phil 4:6; Mark 11:24).",
 "<b>Starve doubt, feed faith.</b> Faith comes by hearing (Rom 10:17). Limit voices of fear; rehearse testimonies.",
 "<b>Act on it.</b> Take the step that trust makes possible (Jas 2:17).",
 "<b>Persist without anxiety.</b> Keep knocking (Luke 11:9). Rest in love whatever the timing."])}</div>`)}
`,mount(){const out=$("#oppOut");const show=i=>{const o=OPP[i];$$("#opp .opn rect").forEach((r,j)=>r.setAttribute("stroke-width",j===i?3:1));out.innerHTML=`<span class="tag" style="color:var(${o.c})">Opposition ${i+1} of ${OPP.length}</span><h3>${o.k}</h3><p>${o.d}</p>`};
  $$("#opp .opn").forEach(g=>{g.addEventListener("click",()=>show(+g.dataset.i));g.addEventListener("keydown",e=>{if(e.key==="Enter")show(+g.dataset.i)})});show(0)}};

/* ======================= 11 ADAM ======================= */
const ERAS=[
 {k:"Eden",c:"--living",t:"A mind in union",d:"Adam and Eve were 'naked and not ashamed' (Gen 2:25). Their minds were not divided: God walked with them, and they had nothing to renew. Their mind was whole because it lived from relationship.",v:"Gen 2:25 · Gen 3:8"},
 {k:"The fall",c:"--stress",t:"The first lie",d:"The serpent attacked God's character: 'God knows… your eyes will be opened' (Gen 3:5). The first symptoms were mental: shame, fear, hiding, blame. 'I was afraid… and I hid' (Gen 3:10). Alienation began 'in the mind' (Col 1:21).",v:"Gen 3:1-13 · Col 1:21"},
 {k:"God's first questions",c:"--glory",t:"Rewiring questions",d:"God didn't come shouting; he came asking. 'Where are you?' 'Who told you that you were naked?' (Gen 3:9-11). These are the original rewiring questions: locating yourself, and tracing the source of a belief.",v:"Gen 3:9-11"},
 {k:"Law",c:"--violet",t:"Rules on stone",d:"The law showed the problem but could not heal it: 'what the law could not do, weakened by the flesh, God did' (Rom 8:3). Even when Moses was read, 'a veil lies over their hearts' (2 Cor 3:15).",v:"Rom 8:3 · 2 Cor 3:14-15"},
 {k:"Prophets",c:"--glory",t:"A promise of new hearts",d:"'I will put my law within them and write it on their hearts' (Jer 31:33). 'I will give you a new heart… and put my Spirit within you' (Ezek 36:26-27).",v:"Jer 31:33 · Ezek 36:26-27"},
 {k:"Jesus",c:"--glory",t:"The true image of God",d:"Jesus showed what God is really like (John 1:18; Heb 1:3) and what a human mind fully in union looks like. He healed the lie at its root by revealing the Father.",v:"John 14:9 · Heb 1:3"},
 {k:"Cross & resurrection",c:"--living",t:"The old humanity undone",d:"'Our old self was crucified with him' (Rom 6:6). The 'all' condemned in Adam are the 'all' made alive in Christ (Rom 5:18; 1 Cor 15:22). Humanity was re-headed in the last Adam.",v:"Rom 5:18 · 2 Cor 5:17"},
 {k:"Pentecost",c:"--living",t:"The Spirit within",d:"Now the Spirit lives in us and shares the mind of Christ (1 Cor 2:16). Renewal has an inside source for the first time.",v:"Acts 2 · 1 Cor 2:12-16"},
 {k:"Now",c:"--glory",t:"Renew the mind",d:"'Be transformed by the renewing (anakainōsis) of your mind' (Rom 12:2). 'Be renewed in the spirit of your minds' (Eph 4:23). The mind catches up with what is already true: experience catches up to identity.",v:"Rom 12:2 · Eph 4:22-24"},
 {k:"Glory",c:"--glory",t:"Face to face",d:"'We all, with unveiled face, beholding the glory of the Lord, are being transformed into the same image from one degree of glory to another' (2 Cor 3:18).",v:"2 Cor 3:18 · 1 John 3:2"}
];
R.adam={html:()=>`
${W.head("Room 11 · Why renew after Jesus?","Why didn't God just tell Adam to renew his mind?","Because before the fall Adam didn't need it, and after the fall a command to renew without a new heart and the Spirit would have been one more law. Walk the timeline.")}
<section class="panel"><div class="pills" id="eraPills">${ERAS.map((e,i)=>`<button type="button" class="pill" data-i="${i}" aria-pressed="${i===0}">${e.k}</button>`).join("")}</div>
 <div class="diagram" style="margin-top:14px"><svg viewBox="0 0 760 60" role="img" aria-label="Timeline"><line x1="20" y1="30" x2="740" y2="30" stroke="var(--line)" stroke-width="3"/>${ERAS.map((e,i)=>`<circle class="era-dot" data-i="${i}" cx="${20+i*80}" cy="30" r="9" fill="var(${e.c})" style="cursor:pointer"/>`).join("")}<circle id="eraMark" cx="20" cy="30" r="16" fill="none" stroke="var(--fg)" stroke-width="2"/></svg></div>
 <div id="eraOut" style="display:flex;flex-direction:column;gap:10px;margin-top:10px;max-width:70ch"></div>
</section>
${W.sec("So, would renewal have helped Adam?",null,`
<div class="grid two">
 <div class="card"><span class="tag l">Before the fall: no need</span><p>Adam's mind lived from face-to-face communion. There was no false image of God to replace. Renewal is a healing word, and he wasn't yet sick.</p></div>
 <div class="card"><span class="tag s">After the fall: not enough on its own</span><p>The problem wasn't missing information; it was a distorted image of God and a heart that hid. Techniques laid on top of an alienated heart become law: more trying, more shame. God's first move was relational: he sought them, questioned gently, and clothed them (Gen 3:21).</p></div>
 <div class="card"><span class="tag g">After Jesus: the order is reversed</span><p>Now identity comes first ("you are a new creation"), then renewal ("be transformed"). Indicative before imperative. We renew because we have been made new, not in order to be.</p></div>
 <div class="card"><span class="tag v">Why it's still needed</span><p>Like Israel leaving Egypt: freedom was real in a day; renewal took a journey. Our spirit is joined to the Lord, but our neural habits, memories and beliefs were formed in the old story. They need to catch up.</p></div>
</div>
<p class="muted">Related: ${ext("atlas","unfold","Atlas · Finished, born, unfolding")} · ${ext("rewiring","study-newcreation","Rewiring · New creation & spirit man")}</p>`)}
`,mount(){const show=i=>{const e=ERAS[i];$$("#eraPills .pill").forEach(p=>p.setAttribute("aria-pressed",+p.dataset.i===i));$("#eraMark").setAttribute("cx",20+i*80);
  $("#eraOut").innerHTML=`<span class="tag" style="color:var(${e.c})">${i+1} / ${ERAS.length} · ${e.k}</span><h3>${e.t}</h3><p>${e.d}</p><span class="ref">${e.v}</span>`};
  $$("#eraPills .pill").forEach(p=>p.addEventListener("click",()=>show(+p.dataset.i)));$$(".era-dot").forEach(c=>c.addEventListener("click",()=>show(+c.dataset.i)));show(0)}};

/* ======================= 12 OT ======================= */
R.ot={html:()=>`
${W.head("Room 12 · OT pioneers","They walked in renewed-mind principles before the cross","Hebrews 11 says they lived by faith, 'having seen and greeted [the promises] from afar'. Tap a person for their story, the principle and the lesson.")}
<div class="tl" id="otTl">${D.ot.map((p,i)=>`<div class="t"><button type="button" class="card click" data-i="${i}" style="text-align:left;width:100%"><div class="row" style="justify-content:space-between"><h4>${p.name}</h4><span class="mono muted">${p.when}</span></div><p style="color:var(--fg)">${p.principle}</p>${W.scripts(p.verses.slice(0,2))}</button></div>`).join("")}</div>
${W.verse("These all died in faith, not having received the things promised, but having seen them and greeted them from afar.","Hebrews 11:13")}
`,mount(){$$("#otTl .card").forEach(c=>c.addEventListener("click",()=>{const p=D.ot[+c.dataset.i];
 openDrawer(`<span class="tag g">${p.when}</span><h2>${p.name}</h2><h3 style="font-size:1.2rem;color:var(--glory)">${p.principle}</h3><p>${p.story}</p><div class="card"><span class="tag l">Renewed-mind lesson</span><p style="color:var(--fg)">${p.lesson}</p></div>${W.scripts(p.verses)}`)}))}};

/* ======================= 13 REWIRE ======================= */
const WINDOW=[
 {k:"Flooded",c:"--stress",d:"Panic, rage, racing thoughts.",p:"Physiological sigh ×3, cold water on your face, press your feet into the floor. Don't make decisions yet."},
 {k:"Edgy",c:"--glory",d:"Tense, irritable, on guard.",p:"Breath prayer below (4 in, 6 out) for 2 minutes. Name the feeling out loud."},
 {k:"In the window",c:"--living",d:"Present, able to think and feel.",p:"Great time for the lie-to-truth exchange and Scripture meditation."},
 {k:"Low and flat",c:"--violet",d:"Tired, numb, unmotivated.",p:"Move: a 10-minute walk outside, music, a call with a friend. Elijah's pattern: food, rest, presence."},
 {k:"Shut down",c:"--violet",d:"Disconnected, frozen, hopeless.",p:"Gentle orientation: name 5 things you see, wrap in a blanket, hum. Reach out to a safe person. If you feel unsafe, contact local emergency help now."}
];
const RENEW=[["R","Recognise","Notice the feeling, body signal or reaction. 'Something's stirred.'"],["E","Expose","Ask: What am I believing? 'Who told you that?' (Gen 3:11)"],["N","Name the need","Behind the lie is a real need: safety, worth, love, rest."],["E","Exchange","Receive the Father's truth for the lie, with Scripture."],["W","Walk it out","One small action today that agrees with the truth."]];
R.rewire={html:()=>`
${W.head("Room 20 · Rewire studio","Your daily renewal toolkit","Check in, exchange lies for truth, breathe with Scripture, and track 40 days. Everything you save stays in this browser.")}
<section class="grid two">
 <div class="panel" style="display:flex;flex-direction:column;gap:12px"><span class="mono muted">Step 1 · Window of tolerance check-in</span><h3>How are you right now?</h3>
  <div class="pills" id="winPills">${WINDOW.map((w,i)=>`<button type="button" class="pill" data-i="${i}" aria-pressed="false">${w.k}</button>`).join("")}</div>
  <div id="winOut" class="card" style="background:var(--bg)"><p>Choose the state closest to how you feel. You'll get the right next practice for your nervous system.</p></div></div>
 <div class="panel" style="display:flex;flex-direction:column;gap:12px"><span class="mono muted">Step 2 · Breath prayer</span><h3>Abba, Father · I belong to you</h3>
  <div class="breath"><div class="orb" id="orb">Ready</div></div>
  <div class="row" style="justify-content:center"><button class="btn teal" type="button" id="breathBtn">Start 2-minute breath prayer</button></div>
  <p class="muted" style="font-size:.85rem;text-align:center">Inhale 4 seconds, exhale 6. Long exhales stimulate the vagus nerve. (Rom 8:15)</p></div>
</section>
${W.sec("Step 3 · The R.E.N.E.W. exchange","Pick a lie from the library or write your own. Build a truth card you can come back to.",`
<div class="split">
 <div class="panel" style="display:flex;flex-direction:column;gap:12px">
  <div class="row" style="gap:6px">${RENEW.map(([l,t])=>`<span class="tag g" title="${t}">${l} · ${t}</span>`).join("")}</div>
  <label for="lieSel" class="lbl"><span>Choose a common lie</span></label>
  <select id="lieSel"><option value="">Write my own…</option>${["About God","About me","About life","About body","About others"].map(c=>`<optgroup label="${c}">${D.lies.map((l,i)=>l.cat===c?`<option value="${i}">${esc(l.lie)}</option>`:"").join("")}</optgroup>`).join("")}</select>
  <label for="lieTxt" class="lbl"><span>R · E: The lie I notice (and where it came from)</span></label><textarea id="lieTxt" placeholder="e.g. I'm only acceptable if I get everything right. First felt it when…"></textarea>
  <label for="needTxt" class="lbl"><span>N: The need underneath</span></label><input id="needTxt" type="text" placeholder="e.g. to be accepted and safe">
  <label for="truthTxt" class="lbl"><span>E: The Father's truth</span></label><textarea id="truthTxt" placeholder="e.g. I am accepted in the Beloved (Eph 1:6)."></textarea>
  <label for="walkTxt" class="lbl"><span>W: One step today</span></label><input id="walkTxt" type="text" placeholder="e.g. Submit the report as it is and rest">
  <div class="row"><button class="btn primary" id="saveCard" type="button">Save truth card</button><button class="btn" id="clearCard" type="button">Clear</button></div>
 </div>
 <div class="panel" style="display:flex;flex-direction:column;gap:12px"><span class="mono muted">Your truth cards</span><div id="cards" style="display:flex;flex-direction:column;gap:10px"></div></div>
</div>`)}
${W.sec("Step 4 · 40-day renewal tracker","Tap each day you practised. Slips don't reset grace; just tap the next day.",`
<div class="panel" style="display:flex;flex-direction:column;gap:12px"><div class="row" style="justify-content:space-between"><span id="dayCount" class="mono"></span><button class="btn" type="button" id="resetDays">Reset tracker</button></div><div class="days" id="days"></div>
<p class="muted" style="font-size:.9rem">Daily rhythm (10–20 minutes): check in → breath prayer → one R.E.N.E.W. exchange → read your truth cards aloud → three gratitudes → one act of love.</p></div>`)}
${W.sec("Use cases: step-by-step plans","Practical, Scripture-backed plans for common struggles.",`
<div class="grid two">${D.cases.map(c=>`<details class="card"><summary style="cursor:pointer;font-weight:600;font-size:1.05rem">${c.k}</summary><div style="margin-top:10px">${W.steps(c.steps)}</div>${W.scripts(c.verses)}</details>`).join("")}</div>
<p class="note">If you are in crisis or thinking about harming yourself, please contact local emergency services or a crisis line now, and tell someone you trust. Prayer and professional help work together.</p>`)}
<p class="muted">More practices: ${ext("rewiring","today","Rewiring · Today")} · ${ext("rewiring","plan","90-day Regulated Mind plan")} · ${ext("atlas","identity","Atlas · Identity & heart healing")}</p>
`,mount(){
  $$("#winPills .pill").forEach(p=>p.addEventListener("click",()=>{const w=WINDOW[+p.dataset.i];$$("#winPills .pill").forEach(x=>x.setAttribute("aria-pressed",x===p));
   $("#winOut").innerHTML=`<span class="tag" style="color:var(${w.c})">${w.k}</span><p style="color:var(--fg)">${w.d}</p><p><b>Next practice:</b> ${w.p}</p>`}));
  // breathing
  let bT=null;const orb=$("#orb");
  $("#breathBtn").onclick=()=>{if(bT){clearTimeout(bT);bT=null;orb.style.transform="scale(.6)";orb.textContent="Ready";$("#breathBtn").textContent="Start 2-minute breath prayer";return}
   const end=Date.now()+120000;$("#breathBtn").textContent="Stop";
   const cycle=inhale=>{if(Date.now()>end){bT=null;orb.textContent="Amen";orb.style.transform="scale(.6)";$("#breathBtn").textContent="Start 2-minute breath prayer";toast("Breath prayer complete");return}
    orb.style.transitionDuration=(inhale?4:6)+"s";orb.style.transform=inhale?"scale(1)":"scale(.6)";orb.textContent=inhale?"Abba, Father":"I belong to you";bT=setTimeout(()=>cycle(!inhale),(inhale?4:6)*1000)};cycle(true)};
  // exchange
  const sel=$("#lieSel");sel.addEventListener("change",()=>{const l=D.lies[+sel.value];if(sel.value==="")return;
   $("#lieTxt").value=l.lie;$("#truthTxt").value=l.truth+" ("+l.verses.join("; ")+")";$("#walkTxt").value=l.act});
  const cards=store.get("cards",null)||[{lie:"My worth depends on my performance.",need:"to be accepted",truth:"I am accepted in the Beloved. My worth was settled at the cross. (Eph 1:6; Rom 5:8)",walk:"Rest one hour with no productivity goal",d:"Example",ex:true}];
  const drawCards=()=>{$("#cards").innerHTML=cards.length?cards.map((c,i)=>`<div class="card" style="background:var(--bg)"><div class="row" style="justify-content:space-between"><span class="tag ${c.ex?"":"g"}">${c.ex?"Example card":esc(c.d)}</span><button class="chipbtn" type="button" data-del="${i}">Remove</button></div><p style="text-decoration:line-through;color:var(--stress)">${esc(c.lie)}</p>${c.need?`<p class="muted" style="font-size:.85rem">Need: ${esc(c.need)}</p>`:""}<p style="color:var(--fg);font-family:var(--f-display);font-size:1.1rem">${esc(c.truth)}</p>${c.walk?`<p class="muted" style="font-size:.85rem">Today: ${esc(c.walk)}</p>`:""}</div>`).join(""):`<p class="muted">No cards yet. Write your first exchange on the left.</p>`;
   $$("[data-del]").forEach(b=>b.onclick=()=>{cards.splice(+b.dataset.del,1);store.set("cards",cards);drawCards()})};drawCards();
  $("#saveCard").onclick=()=>{const lie=$("#lieTxt").value.trim(),truth=$("#truthTxt").value.trim();if(!lie||!truth){toast("Add both the lie and the truth to save a card");return}
   const ex=cards.findIndex(c=>c.ex);if(ex>-1)cards.splice(ex,1);
   cards.unshift({lie,truth,need:$("#needTxt").value.trim(),walk:$("#walkTxt").value.trim(),d:new Date().toLocaleDateString()});store.set("cards",cards);drawCards();toast("Truth card saved");};
  $("#clearCard").onclick=()=>{["#lieTxt","#truthTxt","#needTxt","#walkTxt"].forEach(s=>$(s).value="");sel.value=""};
  // tracker
  let days=store.get("days",[]);const dd=()=>{$("#days").innerHTML=Array.from({length:40},(_,i)=>`<button type="button" class="${days.includes(i)?"done":""}" data-d="${i}" aria-pressed="${days.includes(i)}" aria-label="Day ${i+1}">${i+1}</button>`).join("");
   $("#dayCount").textContent=`${days.length} of 40 days practised`;
   $$("#days button").forEach(b=>b.onclick=()=>{const d=+b.dataset.d;days=days.includes(d)?days.filter(x=>x!==d):[...days,d];store.set("days",days);dd();if(days.length===40)toast("40 days. Well done!")})};dd();
  let resetArm=false;$("#resetDays").onclick=e=>{if(!resetArm){resetArm=true;e.target.textContent="Tap again to confirm";setTimeout(()=>{resetArm=false;e.target.textContent="Reset tracker"},3000);return}days=[];store.set("days",days);dd();e.target.textContent="Reset tracker";resetArm=false;toast("Tracker reset")};
}};

/* ======================= 14 REFS ======================= */
R.refs={html:()=>`
${W.head("Room 21 · Sources & sister apps","Where this comes from","MindConnect sits alongside your Relational Gospel Atlas and Rewiring apps. Science claims are summarised from published research; where evidence is debated, the room says so.")}
<section class="grid">
 <a class="card click" href="${window.MC.LINKS.atlas}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><span class="tag g">Sister app</span><h4>Relational Gospel Atlas ↗</h4><p>Legal vs union lens across every major theme: Jesus as perfect theology, Adam undone, identity and heart healing, habits and help.</p></a>
 <a class="card click" href="${window.MC.LINKS.rewiring}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><span class="tag l">Sister app</span><h4>Rewiring ↗</h4><p>Daily check-in, 90-day Regulated Mind plan, studies on belief formation, shame, new creation and union.</p></a>
 <a class="card click" href="${window.MC.LINKS.hubs}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><span class="tag v">Sister app</span><h4>Rewiring Hubs ↗</h4><p>14 topic hubs, from brain and nervous system to body, gut and health and faith practices.</p></a>
</section>
${W.sec("Research referenced",null,`<div class="panel">${W.list([
 "Siegel, D. <i>Mind: A Journey to the Heart of Being Human</i> (2016); hand model of the brain",
 "Hebb, D. (1949) on synaptic learning; Lally et al. (2009), <i>European Journal of Social Psychology</i>, habit formation (~66 days median)",
 "Kiecolt-Glaser et al. (1995, 2005): stress, marital hostility and wound healing",
 "Cole, S. et al.: social genomics and the conserved transcriptional response to adversity (CTRA)",
 "Felitti, Anda et al. (1998): Adverse Childhood Experiences study",
 "Lee, L.O. et al. (2019), <i>PNAS</i>: optimism and exceptional longevity",
 "Levy, B. et al. (2002): self-perceptions of ageing and longevity",
 "Holt-Lunstad, J. et al. (2010): social relationships and mortality risk",
 "Waldinger & Schulz: <i>The Good Life</i> (Harvard Study of Adult Development)",
 "VanderWeele, T. et al. (2016), <i>JAMA Internal Medicine</i>: religious service attendance and mortality",
 "Witvliet, C. et al. (2001): forgiveness, grudges and physiology",
 "Newberg, A.: <i>How God Changes Your Brain</i> (2009)",
 "Kaptchuk, T. et al. (2010): open-label placebo in IBS",
 "Hasher et al. (1977) and later work: the illusory truth effect",
 "Lieberman et al. (2007): affect labelling reduces amygdala response",
 "Kühn & Gallinat (2014) and Love et al. (2015): pornography, reward circuitry, and the ongoing debate",
 "Wood, Perunovic & Lee (2009): why some positive self-statements backfire, so use believable statements",
 "Epel, E. et al. (2004), <i>PNAS</i> 101(49): accelerated telomere shortening in response to life stress",
 "Raja, S. et al. (2020): the revised IASP definition of pain",
 "Melzack, R. & Wall, P. (1965), <i>Science</i>: gate control theory of pain",
 "Moseley, G.L. & Butler, D. <i>Explain Pain</i>; Moseley, TEDxAdelaide 'Why things hurt'",
 "Coan, J. et al. (2006): hand-holding and the neural response to threat",
 "Brand, P. & Yancey, P. <i>The Gift of Pain</i> (Pain: The Gift Nobody Wants), and <i>Fearfully and Wonderfully Made</i>",
 "Madden, K. et al. (2016), Cochrane CD009356: hypnosis for pain management during labour",
 "Bohren, M. et al. (2017), Cochrane: continuous support for women during childbirth; Cluett et al. (2018), Cochrane: immersion in water in labour",
 "Dick-Read, G. <i>Childbirth Without Fear</i> (1942), with later critiques",
 "Postel, T. (2013), <i>Sexologies</i>: midwife survey on pleasurable birth experiences",
 "Buckley, S. (2015) <i>Hormonal Physiology of Childbearing</i> (Childbirth Connection)",
 "Weaver, I. et al. (2004), <i>Nature Neuroscience</i> 7: epigenetic programming by maternal behaviour",
 "Kaliman, P. et al. (2014), <i>Psychoneuroendocrinology</i> 40: rapid changes in HDACs and inflammatory gene expression in expert meditators",
 "Yehuda, R. et al. (2016), <i>Biological Psychiatry</i>: Holocaust exposure and FKBP5 methylation in offspring (small sample; debated)",
 "Lo, Y.M.D. et al. (1997) on cell-free fetal DNA in maternal plasma; Bianchi, D. et al. (1996) and later work on fetal microchimerism persisting for decades",
 "Erlich, Y. & Zielinski, D. (2017), <i>Science</i>: DNA Fountain, about 215 petabytes per gram",
 "Gregory of Nazianzus, Epistle 101: 'what is not assumed is not healed'; Irenaeus on recapitulation",
 "Simpson, J.Y. (1847) <i>Answer to the Religious Objections…</i>; Anaesthesia (2016) on later embellishment of that history; Mowczko, M. on ʿiṣṣābôn in Gen 3:16"])}</div>`)}
${W.sec("Theological voices behind the relational lens",null,`<p class="muted" style="max-width:70ch">Baxter Kruger, T.F. Torrance, Irenaeus (recapitulation), Brad Jersak, Greg Boyd, Brian Zahnd, Michael Ramsey ("God is Christlike and in him is no un-Christlikeness at all"), Francois du Toit, Curt Thompson (<i>Anatomy of the Soul</i>), and Bill Johnson on healing. Diverse voices; not all agree with each other on every point.</p>`)}
<p class="note">MindConnect is an educational and devotional tool. It does not diagnose or treat any condition. Keep working with doctors, counsellors and your church community; God uses all of them.</p>
`};

})();
