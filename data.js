// Dar Sahar — concept catalogue. Fictional shop; fragrance names are the real
// Gulf-house perfumes a T&T reseller would stock. Photos are illustrative (Unsplash).
window.WA = '18682591409';
window.SHOP = 'Dar Sahar';

window.FAMILIES = {
  oud:      { label: 'Oud & Smoke',      img: 'img/oudwood.jpg',   blurb: 'Dark resinous agarwood, incense, leather.' },
  gourmand: { label: 'Sweet & Gourmand', img: 'img/vanilla.jpg',   blurb: 'Dates, praline, vanilla, caramel.' },
  amber:    { label: 'Warm Amber',       img: 'img/amber.jpg',     blurb: 'Glowing resins, tobacco, spice.' },
  floral:   { label: 'Rose & Florals',   img: 'img/rose.jpg',      blurb: 'Taifi rose, jasmine, orchid.' },
  fresh:    { label: 'Fresh & Island',   img: 'img/dunes-blue.jpg',blurb: 'Citrus and air, made for the heat.' },
  musk:     { label: 'Clean Musk',       img: 'img/whitemusk.jpg', blurb: 'Soft skin scents, fresh laundry.' },
};

// s = sillage (projection) 1–5, l = longevity 1–5. body = body spray available.
window.PRODUCTS = [
  { id:'khamrah', name:'Khamrah', house:'Lattafa', g:'unisex', fam:'gourmand', price:550, img:'img/khamrah.jpg', tags:['bestseller'], body:true, s:5, l:5,
    notes:{ top:['Cinnamon','Nutmeg','Bergamot'], heart:['Dates','Praline','Tuberose'], base:['Vanilla','Tonka','Amberwood','Myrrh'] },
    desc:'The one everybody asks about. Warm cinnamon and sticky dates melt into praline and vanilla — a cozy, boozy trail that lasts from morning lime to evening lime.',
    when:['night','occasion'], mood:['sweet','amber'] },
  { id:'khamrah-waha', name:'Khamrah Waha', house:'Lattafa', g:'unisex', fam:'gourmand', price:600, img:'img/khamrah-waha.jpg', tags:['new'], s:4, l:4,
    notes:{ top:['Pineapple','Lemon','Pink pepper'], heart:['Dates','Cardamom','Lavender'], base:['Vanilla','White musk','Benzoin'] },
    desc:'Khamrah\'s brighter sibling. The same date-and-vanilla heart, lifted with juicy pineapple so it breathes in the Caribbean heat. Worth the hype.',
    when:['day','everyday'], mood:['sweet','fresh'] },
  { id:'yara', name:'Yara', house:'Lattafa', g:'her', fam:'gourmand', price:450, img:'img/yara.jpg', tags:['bestseller'], body:true, s:3, l:4,
    notes:{ top:['Orchid','Heliotrope','Tangerine'], heart:['Gourmand accord','Tropical fruits'], base:['Vanilla','Musk','Sandalwood'] },
    desc:'Pink, creamy and impossibly soft — like vanilla whipped cream on warm skin. The compliment-getter of the collection.',
    when:['everyday','day'], mood:['sweet','floral'] },
  { id:'yara-moi', name:'Yara Moi', house:'Lattafa', g:'her', fam:'floral', price:450, img:'img/yara-moi.jpg', tags:[], body:true, s:3, l:3,
    notes:{ top:['Jasmine','Peach'], heart:['Caramel','Rose'], base:['Amber','Vanilla','Patchouli'] },
    desc:'The white Yara. Jasmine and peach over a whisper of caramel — elegant enough for church, sweet enough for brunch after.',
    when:['day','everyday'], mood:['floral','sweet'] },
  { id:'yara-tous', name:'Yara Tous', house:'Lattafa', g:'her', fam:'gourmand', price:450, img:'img/yara-tous.jpg', tags:['sale'], was:495, s:3, l:3,
    notes:{ top:['Mango','Coconut','Passionfruit'], heart:['Jasmine','Orange blossom'], base:['Vanilla','Musk','Cashmeran'] },
    desc:'A tropical one: mango, coconut and passionfruit on vanilla. It smells like a beach lime with a pina colada in hand.',
    when:['day','everyday'], mood:['sweet','fresh'] },
  { id:'asad', name:'Asad', house:'Lattafa', g:'him', fam:'amber', price:450, img:'img/asad.jpg', tags:['bestseller'], body:true, s:5, l:5,
    notes:{ top:['Black pepper','Pineapple','Tobacco'], heart:['Coffee','Iris','Patchouli'], base:['Amber','Vanilla','Benzoin','Dry woods'] },
    desc:'"The lion." Spicy black pepper and tobacco over a smouldering amber base — confident, dark and noticed the second you walk in.',
    when:['night','occasion'], mood:['amber','smoky'] },
  { id:'sakeena', name:'Sakeena', house:'Lattafa', g:'her', fam:'floral', price:550, img:'img/sakeena.jpg', tags:[], s:4, l:4,
    notes:{ top:['Red berries','Saffron'], heart:['Rose','Jasmine','Raspberry'], base:['Vanilla','Praline','Musk'] },
    desc:'A floral fruity gourmand in a jewel of a bottle. Saffron-kissed berries open into rose and a praline dry-down. Pure date-night energy.',
    when:['night','occasion'], mood:['floral','sweet'] },
  { id:'liquid-brun', name:'Liquid Brun', house:'French Avenue', g:'him', fam:'amber', price:600, img:'img/liquid-brun.jpg', tags:['new'], s:4, l:4,
    notes:{ top:['Cinnamon','Cardamom','Bergamot'], heart:['Orange blossom','Praline'], base:['Bourbon vanilla','Ambroxan','Guaiac wood'] },
    desc:'Smooth like aged rum. Spiced cardamom, glowing orange blossom and a bourbon-vanilla base. Take it to the beach — on your skin and your clothes.',
    when:['night','everyday'], mood:['amber','sweet'] },
  { id:'dunescape', name:'Dunescape', house:'Armaf', g:'him', fam:'fresh', price:535, img:'img/dunescape.jpg', tags:[], s:3, l:3,
    notes:{ top:['Lemon','Mandarin','Blood orange','Ginger'], heart:['Juniper','Sage','Lavender'], base:['Vetiver','Cedar','Musk'] },
    desc:'Clean, energizing refined freshness. Citrus and ginger with an aromatic sage heart — the office-safe, heat-proof everyday pick.',
    when:['day','everyday'], mood:['fresh'] },
  { id:'opulent-musk', name:'Opulent Musk', house:'Lattafa', g:'unisex', fam:'musk', price:450, img:'img/opulent-musk.jpg', tags:[], body:true, s:2, l:4,
    notes:{ top:['Bergamot','Pear'], heart:['White musk','Rose'], base:['Sandalwood','Vanilla','Cashmere woods'] },
    desc:'Your skin, but better. A soft, powdery white musk that sits close and lingers for hours. Layer it under anything.',
    when:['everyday','day'], mood:['clean','floral'] },
  { id:'cdni', name:'Club de Nuit Intense', house:'Armaf', g:'him', fam:'fresh', price:550, img:'img/cdni.jpg', tags:['bestseller'], s:5, l:5,
    notes:{ top:['Lemon','Pineapple','Blackcurrant','Apple'], heart:['Birch','Jasmine','Rose'], base:['Musk','Ambergris','Patchouli','Vanilla'] },
    desc:'The legendary smoky-pineapple bomb. Bright up top, smoky birch underneath, and projection that fills a fete.',
    when:['night','occasion','everyday'], mood:['fresh','smoky'] },
  { id:'oud-glory', name:'Oud for Glory', house:'Lattafa · Badee Al Oud', g:'unisex', fam:'oud', price:500, img:'img/badee.jpg', tags:['bestseller'], s:5, l:5,
    notes:{ top:['Saffron','Nutmeg','Lavender'], heart:['Agarwood (Oud)','Patchouli'], base:['Oud','Musk'] },
    desc:'Real oud character without the price of a Gulf boutique. Saffron and nutmeg, then dark, resinous agarwood for days.',
    when:['night','occasion'], mood:['smoky','amber'] },
  { id:'hayaati', name:'Hayaati', house:'Lattafa', g:'him', fam:'amber', price:400, img:'img/hayaati.jpg', tags:['sale'], was:450, s:4, l:4,
    notes:{ top:['Apple','Bergamot','Cinnamon'], heart:['Cardamom','Lavender','Geranium'], base:['Amber','Vanilla','Tonka'] },
    desc:'"My life." Fresh apple over warm cardamom and amber — an easy crowd-pleaser and a perfect first Arabian fragrance.',
    when:['everyday','day'], mood:['amber','fresh'] },
  { id:'fakhar', name:'Fakhar Black', house:'Lattafa', g:'him', fam:'fresh', price:450, img:'img/fakhar.jpg', tags:[], s:3, l:4,
    notes:{ top:['Apple','Ginger','Bergamot'], heart:['Lavender','Juniper','Sage'], base:['Tonka','Vetiver','Amberwood'] },
    desc:'Sharp, polished and modern — crisp apple and ginger over a smooth tonka base. The suit-and-tie fragrance.',
    when:['day','everyday'], mood:['fresh'] },
  { id:'abiyedh', name:'Ana Abiyedh Rouge', house:'Lattafa', g:'unisex', fam:'amber', price:400, img:'img/abiyedh.jpg', tags:[], s:4, l:5,
    notes:{ top:['Saffron','Jasmine'], heart:['Amberwood','Ambergris'], base:['Fir resin','Cedar'] },
    desc:'Glowing, airy saffron-amber — the luxurious "cotton candy and fire" profile everyone loves, at a fraction of the price.',
    when:['occasion','night'], mood:['amber','sweet'] },
  { id:'ramz-gold', name:'Ramz Gold', house:'Lattafa', g:'her', fam:'floral', price:350, img:'img/ornate.jpg', tags:['new'], s:3, l:3,
    notes:{ top:['Pear','Mandarin'], heart:['Rose','Orange blossom'], base:['Vanilla','Musk','Amber'] },
    desc:'Golden, juicy and joyful. Pear and mandarin over orange blossom — a bright little everyday treat.',
    when:['day','everyday'], mood:['floral','fresh'] },
  { id:'oud-attar', name:'Pure Oud Attar', house:'Dar Sahar Reserve', g:'unisex', fam:'oud', price:300, img:'img/attar.jpg', tags:[], s:3, l:5, oil:true,
    notes:{ top:['Cambodian oud'], heart:['Smoked woods','Leather'], base:['Resin','Musk'] },
    desc:'Concentrated, alcohol-free oud oil. One drop on the wrist, one behind the ear. The traditional way — 3ml roll-on lasts months.',
    when:['occasion','night'], mood:['smoky'] },
  { id:'bakhoor-set', name:'Bakhoor Burner Set', house:'Dar Sahar Home', g:'unisex', fam:'oud', price:250, img:'img/bakhoor.jpg', tags:[], s:5, l:3, home:true,
    notes:{ top:['Sandalwood'], heart:['Oud chips','Rose'], base:['Amber','Musk'] },
    desc:'Electric burner + 40g of oud-and-rose bakhoor bricks. Scent the house the way it\'s done in the Gulf — and your clothes on the way out.',
    when:['occasion','everyday'], mood:['smoky','amber'] },
];

// Size options per product
window.sizesFor = function (p) {
  if (p.home) return [{ k:'set', label:'Burner + 40g', price:p.price }];
  if (p.oil)  return [{ k:'3ml', label:'3ml roll-on', price:p.price }, { k:'6ml', label:'6ml roll-on', price:Math.round(p.price*1.8/5)*5 }];
  const s = [
    { k:'100', label:'100ml bottle', price:p.price },
    { k:'10',  label:'10ml decant',  price:Math.max(110, Math.round(p.price*0.24/5)*5) },
    { k:'5',   label:'5ml decant',   price:Math.max(70,  Math.round(p.price*0.14/5)*5) },
  ];
  if (p.body) s.push({ k:'body', label:'Body spray 250ml', price:150 });
  return s;
};

window.REVIEWS = [
  { n:'Kristal R.', a:'Chaguanas', t:'Ordered Khamrah on Tuesday, had it in my hands Thursday. Sealed box, batch code checked out. My husband keeps "borrowing" it.', p:'khamrah' },
  { n:'Jason M.', a:'San Fernando', t:'Bought three 5ml decants to try before committing. Ended up getting the full Asad. The decant idea is genius.', p:'asad' },
  { n:'Aaliyah K.', a:'Arima', t:'Yara is my everyday now. People stop me in the grocery to ask what I\'m wearing. Packaging was so neat too.', p:'yara' },
  { n:'Ravi S.', a:'Couva', t:'Met them at the expo, smelled everything, then ordered on WhatsApp the next day. Easy, friendly, real stuff.', p:'cdni' },
];
