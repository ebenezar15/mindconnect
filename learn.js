/* MindConnect — learning layer: room order, takeaways, paths, redesigned home with visual map */
(function(){
const {$,$$,esc,store,W,neuralCanvas,done,num,GROUP_C,openSearch,reduce}=window.MC;
const R=window.ROOMS;

window.ROOMS_META=[
 {id:"home",grp:"Begin",label:"Start here"},
 {id:"mind",grp:"The mind",label:"What is the mind?"},
 {id:"mindword",grp:"The mind",label:"Mind & heart in Scripture"},
 {id:"brain",grp:"The mind",label:"Brain map"},
 {id:"loop",grp:"The mind",label:"How the mind works"},
 {id:"body",grp:"Mind & body",label:"Mind–body connection"},
 {id:"flesh",grp:"Mind & body",label:"Body, flesh & sarx"},
 {id:"lab",grp:"Mind & body",label:"Activity lab"},
 {id:"likes",grp:"Mind & body",label:"Likes & lies that feel true"},
 {id:"toxic",grp:"Fruit & roots",label:"Toxic vs life-giving"},
 {id:"sickness",grp:"Fruit & roots",label:"Sickness, genes & healing"},
 {id:"life",grp:"Fruit & roots",label:"Beliefs & long life"},
 {id:"faith",grp:"Faith",label:"Faith that moves mountains"},
 {id:"adam",grp:"Faith",label:"Why renew after Jesus?"},
 {id:"ot",grp:"Faith",label:"OT pioneers"},
 {id:"design",grp:"Pain & suffering",label:"Designed for life"},
 {id:"pain",grp:"Pain & suffering",label:"How pain works"},
 {id:"message",grp:"Pain & suffering",label:"The message of pain"},
 {id:"birth",grp:"Pain & suffering",label:"Childbirth without the curse"},
 {id:"genes",grp:"Genetics",label:"Genetics at a glance"},
 {id:"decided",grp:"Genetics",label:"How your genetics is decided"},
 {id:"traits",grp:"Genetics",label:"How traits pass on"},
 {id:"passes",grp:"Genetics",label:"What passes to a child"},
 {id:"behaviour",grp:"Genetics",label:"Genes & behaviour"},
 {id:"dna",grp:"DNA & blood",label:"DNA: the living script"},
 {id:"inchrist",grp:"DNA & blood",label:"In Adam, in Christ"},
 {id:"blood",grp:"DNA & blood",label:"The blood"},
 {id:"seed",grp:"DNA & blood",label:"The seed"},
 {id:"web",grp:"DNA & blood",label:"The living web"},
 {id:"christblood",grp:"The blood of Christ",label:"The blood of Christ"},
 {id:"bloodpower",grp:"The blood of Christ",label:"The power of the blood"},
 {id:"heal",grp:"Self-healing",label:"The healing body"},
 {id:"mindheal",grp:"Self-healing",label:"The healing mind"},
 {id:"rewire",grp:"Practice",label:"Rewire studio"}
];

window.DATA.learn={
 mind:{v:"Rom 12:2",t:["The mind is not the same as the brain: the brain is the instrument, the mind is the music being played through it.","Scripture sees a person as layers of one whole: spirit, heart, mind, soul, brain and body.","God designed the mind for union, connection, beholding and change. Plasticity is grace built into biology."]},
 mindword:{v:"Mark 12:30",t:["The Bible uses many words for the inner life (lev, nephesh, ruach, nous, kardia, psychē…); they overlap rather than divide you into parts.","The heart is the core of the person where mind, will and emotion meet; the mind is how the heart perceives and reasons.","Thoughts come from many sources; Scripture tells us to test, take captive, set, and think on what is true."]},
 brain:{v:"2 Cor 10:5",t:["Twelve brain regions work together; the prefrontal cortex calms the amygdala when it is online.","Under high stress the thinking brain 'flips its lid': calm the body first, then reason.","Repetition thickens new pathways and unused ones get pruned: this is renewal in neural terms."]},
 loop:{v:"Prov 23:7",t:["Event → belief → thought → feeling → body → action → outcome, and outcomes feed back as 'evidence'.","The same event produces a lie loop or a truth loop depending on the belief filter.","You can break the loop at any step, but the deepest change happens at the belief."]},
 body:{v:"Prov 14:30",t:["A thought can become a hormone within seconds through the stress axis or the vagus nerve.","Chronic stress slows healing and raises inflammation; peace and connection switch on repair.","The body is built to heal; the mind largely decides whether it gets the chance."]},
 flesh:{v:"John 1:14",t:["Body (sōma) and flesh (sarx) are different words; 'the Word became flesh', so flesh is not evil in itself.","'Flesh' in Paul often means a way of living from self apart from God, a mindset, not your physical body.","Religion's body-shame came from Greek dualism and asceticism, which Scripture rejects (Col 2:20-23; 1 Tim 4:1-5)."]},
 lab:{v:"Phil 4:8",t:["Every activity has a chemical signature: dopamine, oxytocin, serotonin, endorphins, cortisol, adrenaline.","The same reward system can bond you to love or hijack you into compulsion.","Meet the root need in love and the habit loop loses its power."]},
 likes:{v:"Ps 37:4",t:["Likes come from God's design, genes, attachment, reward learning, culture, wounds and choice.","Lies feel true through repetition, emotional reasoning, early memory, bias and desire.","Feelings are messengers, not masters; the same repetition that built a lie can build the truth."]},
 toxic:{v:"Gal 6:7-8",t:["Each toxic pattern is a lie protecting a wound.","Toxic patterns cost the body (stress chemistry) and the life (relationships, freedom).","Fruit grows from union with the Vine; works of the flesh come from striving."]},
 sickness:{v:"John 9:3",t:["Sickness is woven from many threads: genes, epigenetics, stress, lifestyle, environment, childhood adversity, heart issues.","Your genes are listening: choices and relationships change their expression.","Jesus never blamed the sick; God heals at the creation level and the new-creation level."]},
 life:{v:"3 John 2",t:["Beliefs shape life through attention, choices, relationships, body chemistry and faith.","Relational faith trusts a Person; 'manifesting' tries to control outcomes.","Long life links to optimism, purpose, relationships and faith; immortality comes through resurrection."]},
 faith:{v:"Mark 11:22-24",t:["'Have the faith of God': doubt is a divided heart, not a lack of effort.","Bold faith is relational: asking from a known Father's heart, with forgiveness.","Opposition comes from legal theology, fear, control and real abuses; avoid both ditches."]},
 adam:{v:"Eph 4:23",t:["Adam's mind was whole in union; the fall began with a lie about God's character.","Renewal without a new heart would have been just more law.","After Jesus, identity comes first and renewal follows: experience catches up to identity."]},
 ot:{v:"Heb 11:13",t:["Abraham, Joseph, Caleb, Hannah, David, Elijah, Daniel and others lived renewed-mind principles by faith.","They reframed suffering, talked to their souls, worshipped before battles and rested.","Their lessons are practical patterns we can copy today."]},
 design:{v:"1 Cor 15:26",t:["The body was made for life sustained by communion with God; death is an enemy.","Your body is packed with repair systems; stress accelerates their falling behind.","A renewed mind slows wear and opens healing, while bodily immortality waits for the resurrection."]},
 pain:{v:"Ps 147:3",t:["Pain is the brain's protective verdict about danger, not a direct readout of damage.","Safety, meaning and love turn pain down; fear and isolation turn it up.","Suffering is pain plus the layers the mind adds, and each layer can heal."]},
 message:{v:"Isa 53:4",t:["Jesus healed, felt, carried and refused to blame pain; God is not its author.","Pain is a messenger: protect, rest, attend, grieve, set boundaries, meet needs.","In the new creation pain retires because danger is gone."]},
 birth:{v:"John 16:21",t:["In Genesis 3 only the serpent and the ground are cursed; the woman's pain is a description, not a decree.","The same Hebrew word describes Adam's toil and Eve's labour.","Safety, support and trust help birth's own pain relief work; medical relief is common grace."]},
 genes:{v:"Jer 1:5",t:["DNA is decided at conception by a shuffle of both parents' chromosomes.","Most traits are polygenic and shaped by environment; heritability describes groups, not you.","Some things are fixed, many can be influenced, and habits, beliefs and attachment can change."]},
 decided:{v:"Ps 139:13-14",t:["You have 46 chromosomes in 23 pairs: one of each pair from each parent.","Crossing over and random splitting give each parent about 8.4 million combinations, so every child is new.","The father's sperm sets the chromosome pattern for sex; mitochondrial DNA comes from the mother."]},
 traits:{v:"John 9:2-3",t:["Recessive (25%), dominant (50%) and X-linked (mostly sons) patterns explain single-gene conditions.","Most traits are polygenic: many small genes plus environment, forming a bell curve.","Running in families is not the same as 'only genes'; understanding replaces blame."]},
 passes:{v:"2 Tim 1:5",t:["Five channels shape a child: DNA, the womb, epigenetic marks, home and the wider world.","DNA gives tendencies, not memories, beliefs, skills or faith.","Patterns that travel through relationships can be healed through relationships."]},
 behaviour:{v:"Prov 22:6",t:["Heritability ranges from about 80% (height) to low (infant attachment).","There is no single gene for anger, kindness or faith; genes build sensitivities, experience directs them.","Sensitive 'orchid' children struggle more in harsh settings and flourish most with warm care."]},
 dna:{v:"Ps 139:16",t:["DNA forms through meiosis, fertilisation, reprogramming, division and differentiation.","The sequence is mostly fixed; life writes epigenetic marks in the margins.","Your mind changes which genes are read, not the letters themselves."]},
 inchrist:{v:"1 Cor 15:22",t:["Adam's inheritance reached us body-first; Christ's life reaches us spirit-first, then works outward.","Your DNA doesn't change at new birth; your spirit is joined to the Lord.","The legal gospel explains a changed verdict; the relational gospel explains a changed person."]},
 blood:{v:"Lev 17:11",t:["Blood carries oxygen, hormones, immune cells and fragments of DNA: the mind's chemistry reaches every cell through it.","Jesus took real human flesh and blood from Mary to heal humanity from within.","Peace changes the river: lower blood pressure, calmer clotting, less inflammation."]},
 seed:{v:"1 Pet 1:23",t:["Sperm and egg carry DNA plus some marks of the parents' recent life.","Stress reaches the seed through the brain's reproductive hormone axis.","Scripture's Seed is Christ; the incorruptible seed of new birth is God's life, not DNA."]},
 web:{v:"Exod 20:5-6",t:["Mind, body, blood, seed and DNA form one living web held within the spirit.","Most of what passes to children comes through home, words and habits, not cells.","God's design tilts toward blessing: harm to 3–4 generations, love to a thousand."]},
 christblood:{v:"Lev 17:11",t:["From Genesis to Revelation a scarlet thread shows God giving life, covering shame and binding himself in covenant.","In the relational reading the blood is God's own life given to us, not a payment to change his mind.","Forgiveness flows from God's heart, is revealed at the cross, and is received as release (aphesis)."]},
 bloodpower:{v:"Heb 9:14",t:["What blood does in the body (gives life, cleanses, defends, heals, unites, renews) pictures what Christ's blood does in a person.","Christ's blood purifies the conscience and removes the 'consciousness of sins' that keeps the mind replaying failure.","The blood's power is a Person's self-giving love, received in trust and remembrance, not a magic formula."]},
 heal:{v:"Exod 15:26",t:["A wound heals through four phases: clotting, inflammation, rebuilding and remodelling.","Ten body systems renew themselves constantly, from gut lining (days) to skeleton (years).","Stress slows healing measurably; sleep, calm and connection speed it up."]},
 mindheal:{v:"Ps 23:3",t:["The mind heals in the same four phases: safety, feeling, meaning, integration.","God built in sleep, tears, words, writing, play and relationship as healing tools.","Trauma, shame, lies about God and isolation can block healing; safety and love unblock it."]},
 rewire:{v:"Rom 12:2",t:["Pick the problem you're facing for a guided step-by-step plan.","Use the tools: check-in, breath prayer, thought biopsy, truth cards, urge surfing, conflict repair.","Track your rhythm and mood; small daily repetitions rewire the most."]}
};

const PATHS=[
 {k:"How the mind works",c:"--violet",d:"Start here if you're new.",r:["mind","mindword","brain","loop","likes"]},
 {k:"Mind, body & healing",c:"--living",d:"How thoughts reach cells, and how both heal.",r:["body","flesh","heal","mindheal","sickness","design"]},
 {k:"Identity & faith",c:"--glory",d:"Who you are in Christ and why renewal unfolds.",r:["adam","inchrist","faith","ot","life"]},
 {k:"Pain, suffering & birth",c:"--stress",d:"What pain is, what it says, and gentler birth.",r:["pain","message","birth"]},
 {k:"Genetics & inheritance",c:"--living",d:"How DNA is decided, how traits pass, what really reaches a child.",r:["genes","decided","traits","passes","behaviour"]},
 {k:"DNA, seed & generations",c:"--violet",d:"What we inherit and what we hand on.",r:["dna","seed","blood","web"]},
 {k:"The blood of Christ",c:"--stress",d:"Covenant, forgiveness, redemption and a cleansed conscience.",r:["blood","christblood","bloodpower"]},
 {k:"Daily renewal practice",c:"--glory",d:"Tools for real-life problems.",r:["toxic","lab","rewire"]}
];

/* ---------- visual map of all rooms ---------- */
function mapSVG(){
  const groups=[];window.ROOMS_META.slice(1).forEach(m=>{let g=groups.find(x=>x.k===m.grp);if(!g){g={k:m.grp,r:[]};groups.push(g)}g.r.push(m)});
  const W0=760,H0=420,cx=380,cy=215,d=done();let out="",links="",nodes="";
  groups.forEach((g,gi)=>{const a=-Math.PI/2+gi*2*Math.PI/groups.length,gx=cx+250*Math.cos(a),gy=cy+150*Math.sin(a);const c=GROUP_C[g.k]||"--glory";
   out+=`<circle cx="${gx}" cy="${gy}" r="${30+g.r.length*7}" fill="var(${c})" fill-opacity=".07" stroke="var(${c})" stroke-opacity=".35" stroke-dasharray="3 5"/>`;
   links+=`<line x1="${cx}" y1="${cy}" x2="${gx}" y2="${gy}" stroke="var(${c})" stroke-opacity=".25" class="flow-dash"/>`;
   out+=`<text x="${gx}" y="${gy+(gy<cy?-46-g.r.length*4:56+g.r.length*4)}" text-anchor="middle" font-size="11" font-weight="700" fill="var(${c})">${g.k}</text>`;
   g.r.forEach((m,i)=>{const b=i*2*Math.PI/g.r.length+gi,rr=g.r.length>1?18+g.r.length*3:0,x=gx+rr*Math.cos(b),y=gy+rr*Math.sin(b),isD=d.includes(m.id);
    nodes+=`<a href="#${m.id}" aria-label="${esc(m.label)}"><g class="mapnode"><circle cx="${x}" cy="${y}" r="11" fill="${isD?`var(${c})`:"var(--bg2)"}" stroke="var(${c})" stroke-width="2"/><text x="${x}" y="${y+3.5}" text-anchor="middle" font-size="8.5" font-family="var(--f-mono)" fill="${isD?"var(--bg)":"var(--fg)"}">${num(m.id)}</text><title>${esc(m.label)}</title></g></a>`})});
  return `<svg viewBox="0 -40 ${W0} ${H0+80}" role="img" aria-label="Map of all rooms">${links}${out}<circle cx="${cx}" cy="${cy}" r="50" fill="var(--glory-soft)" stroke="var(--glory)"><animate attributeName="r" values="46;54;46" dur="5s" repeatCount="indefinite"/></circle><text x="${cx}" y="${cy-3}" text-anchor="middle" font-family="var(--f-display)" font-size="16" fill="var(--fg)">Renewed</text><text x="${cx}" y="${cy+14}" text-anchor="middle" font-family="var(--f-display)" font-size="16" fill="var(--fg)">mind</text>${nodes}</svg>`;
}

R.home={html:()=>{
 const d=done(),total=window.ROOMS_META.length-1,n=d.filter(x=>x!=="home").length,last=store.get("last",null),lm=window.ROOMS_META.find(r=>r.id===last);
 const nextRoom=window.ROOMS_META.slice(1).find(r=>!d.includes(r.id));
 const C=2*Math.PI*42;
 return `
<section class="hero"><canvas id="heroCv" aria-hidden="true"></canvas>
 <div class="hero-in">
  <div class="copy">
   <span class="mono" style="color:var(--glory)">MindConnect · a relational gospel field guide</span>
   <h1>Your mind is where heaven meets your body.</h1>
   <p>${total} interactive rooms on the mind, brain, body, pain, DNA, blood and healing, read through Jesus, Scripture, psychology and physiology. Learn a room, mark it complete, and practise in the Rewire studio.</p>
   <div class="row"><a class="btn primary" href="#${lm?lm.id:(nextRoom||{id:"mind"}).id}">${lm?"Continue: "+esc(lm.label):"Begin the journey"}</a><a class="btn" href="#rewire">Rewire studio</a><button class="btn" type="button" id="homeSearch">Search</button></div>
  </div>
  <div class="panel" style="background:var(--bg);display:flex;gap:18px;align-items:center;flex-wrap:wrap">
   <svg width="120" height="120" viewBox="0 0 100 100" role="img" aria-label="${n} of ${total} rooms complete" style="flex:none"><circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg3)" stroke-width="9"/><circle cx="50" cy="50" r="42" fill="none" stroke="var(--living)" stroke-width="9" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-n/total)}" transform="rotate(-90 50 50)" style="transition:stroke-dashoffset 1s"/><text x="50" y="50" text-anchor="middle" font-family="var(--f-display)" font-size="22" fill="var(--fg)">${n}</text><text x="50" y="64" text-anchor="middle" font-size="8" fill="var(--muted)">of ${total} rooms</text></svg>
   <div style="display:flex;flex-direction:column;gap:6px;min-width:0;flex:1">
    <span class="mono muted">Your journey</span>
    <b style="font-size:1.05rem">${n===0?"Nothing completed yet":n===total?"Every room complete!":`${total-n} rooms to go`}</b>
    ${nextRoom?`<span class="muted" style="font-size:.9rem">Suggested next: <a href="#${nextRoom.id}">${esc(nextRoom.label)}</a></span>`:""}
    <span class="muted" style="font-size:.8rem">Progress is saved in this browser only.</span>
   </div>
  </div>
 </div>
</section>
${W.sec("The map","Every room, grouped by theme. Filled circles are rooms you've completed. Tap any number to go there.",`<div class="panel"><div class="diagram">${mapSVG()}</div></div>`)}
${W.sec("Learning paths","Six guided routes through the app. Follow one from left to right.",`
<div class="grid two">${PATHS.map(p=>{const c=p.r.filter(x=>d.includes(x)).length;return`<div class="card" style="gap:12px"><div class="row" style="justify-content:space-between"><span class="tag" style="color:var(${p.c})">${c}/${p.r.length} done</span></div><h4 style="font-family:var(--f-display);font-weight:400;font-size:1.35rem">${p.k}</h4><p>${p.d}</p>
 <div class="diagram"><svg viewBox="-40 0 ${p.r.length*90+30} 56" style="min-width:0" role="img" aria-label="${esc(p.k)} path"><line x1="20" y1="20" x2="${p.r.length*90-70}" y2="20" stroke="var(--line)" stroke-width="3"/>${p.r.map((id,i)=>{const m=window.ROOMS_META.find(x=>x.id===id),isD=d.includes(id);return`<a href="#${id}"><circle cx="${20+i*90}" cy="20" r="12" fill="${isD?`var(${p.c})`:"var(--bg2)"}" stroke="var(${p.c})" stroke-width="2"/><text x="${20+i*90}" y="24" text-anchor="middle" font-size="9" font-family="var(--f-mono)" fill="${isD?"var(--bg)":"var(--fg)"}">${num(id)}</text><text x="${20+i*90}" y="48" text-anchor="middle" font-size="8.5" fill="var(--muted)">${esc(m.label.length>16?m.label.slice(0,15)+"…":m.label)}</text></a>`}).join("")}</svg></div>
 <a class="btn" href="#${p.r.find(x=>!d.includes(x))||p.r[0]}">${c===p.r.length?"Review path":c?"Continue path":"Start path"} →</a></div>`}).join("")}</div>`)}
${W.sec("Quick help right now","Jump straight into a practical tool.",`
<div class="grid">${[["panic","Panic or anxiety now"],["sleep","Can't sleep"],["anger","Anger flaring"],["urge","A craving or urge"],["ruminate","Stuck overthinking"],["shame","Shame after failing"]].map(([k,t])=>`<button type="button" class="tile" data-qh="${k}"><b>${t}</b><span>Guided steps in the Rewire studio →</span></button>`).join("")}</div>`)}
${W.sec("The questions this app answers",null,`<div class="big-q">${window.ROOMS_META.slice(1).map(m=>`<a href="#${m.id}"><span class="mono" style="color:var(${GROUP_C[m.grp]})">${num(m.id)} · ${m.grp}</span><b>${esc(m.label)}</b><span>${esc(((window.DATA.learn[m.id]||{}).t||[""])[0])}</span></a>`).join("")}</div>`)}
<section class="grid two">
 <div class="card"><span class="tag g">The relational gospel lens</span><p style="color:var(--fg)">"Jesus did not come to change the Father's mind about us but to change our mind about the Father."</p><p>Sin is first a sickness of perception: we were "alienated… in your mind" (Col 1:21). Salvation is union restored. Renewal is the mind waking up to what is already true in Christ.</p></div>
 <div class="card"><span class="tag l">How to use MindConnect</span>${W.list(["Each room opens with key takeaways and a 'jump to' bar.","Tap anything that glows: diagrams, nodes, pills and cards open detail.","Press / (or the search button) to search every room.","Mark rooms complete to fill the map and your progress ring.","This is a teaching tool, not medical advice. Keep seeing your doctor and counsellor."])}</div>
</section>
${W.verse("Do not be conformed to this world, but be transformed by the renewing of your mind.","Romans 12:2")}`},
mount(){const cv=$("#heroCv");if(cv)neuralCanvas(cv);$("#homeSearch").onclick=openSearch;
 $$("[data-qh]").forEach(b=>b.onclick=()=>{store.set("studioTab","help");store.set("studioProb",b.dataset.qh);location.hash="rewire"})}};
})();
