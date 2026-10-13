/* Dar Sahar — shared chrome: header, menu, bag, quick view, WhatsApp, reveals */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => 'TT$' + n.toLocaleString('en-US');
  const byId = id => PRODUCTS.find(p => p.id === id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) document.documentElement.classList.add('reduced');
  Object.assign(window, { $, $$, money, byId });

  const ICON = {
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8h16M8 16h12"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>',
    wa: '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.2-.5-.2-.7.1l-1 1.3c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6 0-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4Z"/></svg>',
  };
  window.ICON = ICON;
  const LOGO = `<svg class="mark" viewBox="0 0 40 40" fill="none"><path d="M8 38V17C8 9.8 13.4 4 20 4s12 5.8 12 13v21" stroke="url(#lg)" stroke-width="1.6"/><path d="M23.5 13.5a7 7 0 1 0 2.6 9.6 5.6 5.6 0 1 1-2.6-9.6Z" fill="url(#lg)"/><path d="M20 27.5c0 2-1.4 3.4-3 3.4s-3-1.4-3-3.4c0-2 3-5.6 3-5.6s3 3.6 3 5.6Z" fill="url(#lg)" opacity=".75"/><defs><linearGradient id="lg" x1="8" y1="4" x2="32" y2="38"><stop stop-color="#efdcab"/><stop offset=".6" stop-color="#c9a45c"/><stop offset="1" stop-color="#8c6c33"/></linearGradient></defs></svg>`;
  window.LOGO = LOGO;

  /* ---------------- bag ---------------- */
  const KEY = 'darsahar.bag.v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  let bag = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(bag)); } catch {} renderBag(); updateFloat(); };
  function lineInfo(l) {
    if (l.custom) return { ...l.custom, unit: l.custom.price };
    const p = byId(l.id); if (!p) return null;
    const s = sizesFor(p).find(s => s.k === l.k) || sizesFor(p)[0];
    return { name: p.name, house: p.house, label: s.label, img: p.img, unit: s.price };
  }
  const subtotal = () => bag.reduce((t, l) => t + (lineInfo(l)?.unit || 0) * l.q, 0);
  const count = () => bag.reduce((t, l) => t + l.q, 0);
  window.Bag = {
    add(id, k, q = 1, custom) {
      const key = custom ? custom.key : id + '|' + k;
      const ex = bag.find(l => (l.custom ? l.custom.key : l.id + '|' + l.k) === key);
      if (ex) ex.q += q; else bag.push(custom ? { id, k, q, custom } : { id, k, q });
      save(); bump();
      const info = lineInfo(ex || bag[bag.length - 1]);
      toast(info.img, `<b>${info.name}</b> · ${info.label} added`);
    },
    items: () => bag, subtotal, count, lineInfo,
    clear() { bag = []; save(); },
  };

  const DELIVERY = { 'North / Port of Spain': 40, 'East / Arima / Sangre Grande': 40, 'Central / Chaguanas / Couva': 40, 'South / San Fernando': 45, 'West / Diego Martin / Chaguaramas': 40, 'Tobago (courier)': 65, 'Collect at our next expo': 0 };
  const FREE = 800;
  window.waText = function (extra = {}) {
    let t = `Hi ${SHOP}! 🌙 I'd like to place an order:\n\n`;
    bag.forEach(l => { const i = lineInfo(l); t += `• ${i.name}${i.house ? ' (' + i.house + ')' : ''} — ${i.label} × ${l.q} — ${money(i.unit * l.q)}\n`; if (l.custom?.picks) t += `   ↳ ${l.custom.picks.join(', ')}\n`; });
    const sub = subtotal(); t += `\nSubtotal: ${money(sub)}`;
    const area = extra.area || $('#bag-area')?.value; const name = extra.name || $('#bag-name')?.value;
    if (area) { const fee = sub >= FREE || !DELIVERY[area] ? 0 : DELIVERY[area]; t += `\nDelivery: ${area} — ${fee ? money(fee) : 'FREE'}\nTotal: ${money(sub + fee)}`; }
    if (name) t += `\n\nName: ${name}`;
    t += `\n\nPlease confirm availability. Thank you!`;
    return t;
  };
  window.waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  window.waProduct = (p, label) => `Hi ${SHOP}! 🌙 I'm interested in *${p.name}* by ${p.house}${label ? ' — ' + label : ''}. Is it in stock? Can you deliver to me?`;

  /* ---------------- chrome ---------------- */
  const page = document.body.dataset.page;
  const links = [['index.html', 'Home', 'home'], ['shop.html', 'Shop', 'shop'], ['finder.html', 'Scent Finder', 'finder'], ['discovery.html', 'Discovery Box', 'discovery'], ['house.html', 'Our House', 'house']];
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="ann" aria-label="Announcements"><div class="track">${Array(2).fill('<span>100% authentic Arabian fragrances</span><span>✦</span><span>Nationwide delivery · free over TT$800</span><span>✦</span><span>Try any scent as a 5ml decant</span><span>✦</span><span>Order straight on WhatsApp</span><span>✦</span>').join('')}</div></div>
    <header class="hdr"><div class="wrap">
      <a class="logo" href="index.html" aria-label="Dar Sahar home">${LOGO}<span><b>DAR SAHAR</b><small>ARABIAN PERFUME HOUSE</small></span></a>
      <nav class="nav">${links.map(([h, t, k]) => `<a href="${h}" class="${k === page ? 'on' : ''}">${t}</a>`).join('')}</nav>
      <div class="hdr-actions">
        <button class="icon-btn" id="bag-btn" aria-label="Open bag">${ICON.bag}<span class="bag-count"></span></button>
        <button class="icon-btn burger" id="burger" aria-label="Menu">${ICON.menu}</button>
      </div></div></header>
    <nav class="mnav" id="mnav"><button class="icon-btn mnav-close" id="mclose" aria-label="Close menu">${ICON.x}</button>
      ${links.map(([h, t], i) => `<a href="${h}">${t}<span>0${i + 1}</span></a>`).join('')}
      <div class="mfoot">Orders & questions on WhatsApp<br><a class="link" href="${waLink(`Hi ${SHOP}! 🌙 I have a question.`)}" target="_blank" rel="noopener">Chat with us →</a></div></nav>
    <div class="scrim" id="scrim"></div>
    <aside class="drawer" id="drawer" aria-label="Your bag"><header><h3>Your bag</h3><button class="icon-btn" id="dclose" aria-label="Close bag">${ICON.x}</button></header><div class="lines" id="lines"></div><footer id="dfoot"></footer></aside>
    <div class="qv" id="qv"></div>
    <div class="toast" id="toast"></div>`);
  document.body.classList.add('has-ann', 'grain');
  document.body.insertAdjacentHTML('beforeend', `
    <a class="wa-float" id="wa-float" target="_blank" rel="noopener">${ICON.wa}<span class="wl">Chat with us</span></a>
    <footer class="foot"><div class="wrap"><div class="cols">
      <div><a class="logo" href="index.html">${LOGO}<span><b>DAR SAHAR</b><small>ARABIAN PERFUME HOUSE</small></span></a>
        <p class="big">Smell like <em style="color:var(--gold2)">somewhere</em> else.</p>
        <p class="lead" style="font-size:14.5px">Authentic Arabian perfumes, body sprays and decants — sourced direct from the Gulf houses, delivered across Trinidad & Tobago.</p></div>
      <div><h5>Shop</h5><ul><li><a href="shop.html?g=her">For her</a></li><li><a href="shop.html?g=him">For him</a></li><li><a href="shop.html?g=unisex">Unisex</a></li><li><a href="shop.html?f=sale">On sale</a></li><li><a href="discovery.html">Discovery Box</a></li></ul></div>
      <div><h5>Help</h5><ul><li><a href="house.html#delivery">Delivery & payment</a></li><li><a href="house.html#authentic">Authenticity promise</a></li><li><a href="house.html#faq">FAQ</a></li><li><a href="finder.html">Scent Finder</a></li></ul></div>
      <div><h5>Visit</h5><ul><li>Online store · nationwide delivery</li><li><a href="house.html#events">Next expo booth</a></li><li><a href="${waLink(`Hi ${SHOP}! 🌙`)}" target="_blank" rel="noopener">WhatsApp us</a></li><li>Mon–Sat · 9am–8pm</li></ul></div>
    </div><div class="foot-base"><span>© 2026 Dar Sahar · Trinidad & Tobago · Concept build — not a real store. Photos: Unsplash.</span><a class="credit" href="https://wa.me/18682591409" target="_blank" rel="noopener">Concept site by <b>Portside Digital</b></a></div></div></footer>`);

  const hdr = $('.hdr');
  const onScroll = () => hdr.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  $('#burger').onclick = () => { $('#mnav').classList.add('open'); };
  $('#mclose').onclick = () => $('#mnav').classList.remove('open');

  /* drawer */
  const openBag = () => { renderBag(); $('#drawer').classList.add('on'); $('#scrim').classList.add('on'); };
  const closeAll = () => { $('#drawer').classList.remove('on'); $('#scrim').classList.remove('on'); $('#qv').classList.remove('on'); };
  window.openBag = openBag; window.closeAll = closeAll;
  $('#bag-btn').onclick = openBag; $('#dclose').onclick = closeAll; $('#scrim').onclick = closeAll;
  addEventListener('keydown', e => e.key === 'Escape' && closeAll());

  function renderBag() {
    const c = count(), bc = $('.bag-count');
    bc.textContent = c; bc.classList.toggle('show', c > 0);
    const L = $('#lines'), F = $('#dfoot');
    if (!bag.length) {
      L.innerHTML = `<div class="empty"><span class="ar">عطر</span><p>Your bag is empty — for now.</p><p style="margin-top:18px"><a class="btn ghost" href="shop.html">Browse the collection</a></p></div>`;
      F.innerHTML = `<a class="btn wa block" target="_blank" rel="noopener" href="${waLink(`Hi ${SHOP}! 🌙 Can you help me pick a fragrance?`)}">${ICON.wa} Ask us for a recommendation</a>`; return;
    }
    L.innerHTML = bag.map((l, i) => { const x = lineInfo(l); return `
      <div class="line"><img src="${x.img}" alt=""><div><h4>${x.name}</h4><small>${x.house ? x.house + ' · ' : ''}${x.label}</small>
        <div class="qty"><button data-q="${i}" data-d="-1" aria-label="Less">−</button><span>${l.q}</span><button data-q="${i}" data-d="1" aria-label="More">+</button></div></div>
        <div class="lp">${money(x.unit * l.q)}<button class="rm" data-rm="${i}">Remove</button></div></div>`; }).join('');
    const sub = subtotal(), left = Math.max(0, FREE - sub), prevArea = $('#bag-area')?.value || '', prevName = $('#bag-name')?.value || '';
    F.innerHTML = `
      <div class="row"><span>${left ? `Add ${money(left)} for free delivery` : '✦ You\'ve unlocked free delivery'}</span></div>
      <div class="free-bar"><i style="width:${Math.min(100, sub / FREE * 100)}%"></i></div>
      <div class="row tot"><span>Subtotal</span><b>${money(sub)}</b></div>
      <div class="fields"><input class="field" id="bag-name" placeholder="Your name" autocomplete="name" value="${prevName.replace(/"/g, '')}">
        <select class="field" id="bag-area"><option value="">Delivery area</option>${Object.keys(DELIVERY).map(a => `<option ${a === prevArea ? 'selected' : ''}>${a}</option>`).join('')}</select></div>
      <a class="btn wa block" id="bag-wa" target="_blank" rel="noopener">${ICON.wa} Send order on WhatsApp</a>
      <p style="font-size:12px;color:var(--mute2);text-align:center;margin-top:10px">We confirm stock & delivery time, then you pay by bank transfer, Linx or cash on delivery.</p>`;
    const wa = $('#bag-wa'); const upd = () => wa.href = waLink(waText()); upd();
    $('#bag-name').oninput = upd; $('#bag-area').onchange = upd;
  }
  $('#lines').addEventListener('click', e => {
    const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]');
    if (q) { const l = bag[+q.dataset.q]; l.q += +q.dataset.d; if (l.q < 1) bag.splice(+q.dataset.q, 1); save(); }
    if (r) { bag.splice(+r.dataset.rm, 1); save(); }
  });
  function bump() { const b = $('.bag-count'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }

  let tt;
  function toast(img, html) {
    const t = $('#toast'); t.innerHTML = `<img src="${img}" alt="">${html}<button id="t-view">View bag</button>`;
    t.classList.add('on'); $('#t-view').onclick = () => { t.classList.remove('on'); openBag(); };
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 3200);
  }
  window.toast = toast;

  /* WhatsApp float */
  function updateFloat() {
    const f = $('#wa-float'); if (!f) return;
    const n = count(); let text, label;
    if (n) { text = waText(); label = `Order on WhatsApp (${n})`; }
    else if (window.WA_CONTEXT) { [label, text] = window.WA_CONTEXT(); }
    else { text = `Hi ${SHOP}! 🌙 I'd like some help choosing a fragrance.`; label = 'Chat with us'; }
    f.href = waLink(text); $('.wl', f).textContent = label;
  }
  window.updateFloat = updateFloat;
  let lastY = 0; addEventListener('scroll', () => { const f = $('#wa-float'); if (f) f.classList.toggle('compact', scrollY > lastY && scrollY > 300); lastY = scrollY; }, { passive: true });

  /* cards + quick view */
  const famColor = { oud: '#6b4a2b', gourmand: '#c48a4a', amber: '#d99a3b', floral: '#c46b7a', fresh: '#6aa1b0', musk: '#d9cfc0' };
  const gLabel = { him: 'For him', her: 'For her', unisex: 'Unisex' };
  window.cardHTML = p => `
    <article class="card reveal" data-id="${p.id}">
      <a class="ph" href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name} — illustrative photo" loading="lazy">
        <div class="badges">${p.tags.includes('bestseller') ? '<span class="badge">Bestseller</span>' : ''}${p.tags.includes('new') ? '<span class="badge new">New</span>' : ''}${p.tags.includes('sale') ? '<span class="badge sale">Sale</span>' : ''}</div>
        <span class="gtag">${gLabel[p.g]}</span></a>
      <button class="quick" data-quick="${p.id}" aria-label="Quick add ${p.name}">${ICON.plus}<span>Quick add</span></button>
      <div class="meta"><div><a href="product.html?id=${p.id}"><h3>${p.name}</h3></a><div class="house">${p.house}</div>
        <div class="notes-mini"><span class="fam-dot" style="background:${famColor[p.fam]}"></span>${[...p.notes.top.slice(0, 1), ...p.notes.heart.slice(0, 1), ...p.notes.base.slice(0, 1)].join(' · ')}</div></div>
        <div class="price">${p.was ? `<s>${money(p.was)}</s>` : ''}${p.home || p.oil ? '' : '<small style="color:var(--mute2);font-size:11px;display:block">from ' + money(Math.min(...sizesFor(p).map(s => s.price))) + '</small>'}${money(p.price)}</div></div>
    </article>`;
  window.famColor = famColor; window.gLabel = gLabel;
  window.metersHTML = p => `<div class="meters"><div class="meter"><small>Projection</small><div class="dots">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= p.s ? 'f' : ''}"></i>`).join('')}</div></div><div class="meter"><small>Longevity</small><div class="dots">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= p.l ? 'f' : ''}"></i>`).join('')}</div></div></div>`;
  window.pyrHTML = p => `<div class="pyr"><div><b>Top</b><span>${p.notes.top.join(', ')}</span></div><div><b>Heart</b><span>${p.notes.heart.join(', ')}</span></div><div><b>Base</b><span>${p.notes.base.join(', ')}</span></div></div>`;

  function quickView(id) {
    const p = byId(id), S = sizesFor(p); let sel = S[0].k;
    const q = $('#qv');
    q.innerHTML = `<div class="box" role="dialog" aria-label="${p.name}"><img src="${p.img}" alt=""><div class="in">
      <button class="icon-btn x" aria-label="Close">${ICON.x}</button>
      <div class="eyebrow">${p.house} · ${gLabel[p.g]}</div><h2 style="font-size:46px;margin:10px 0 8px">${p.name}</h2>
      <p style="color:var(--mute);font-size:15px">${p.desc}</p>${pyrHTML(p)}${metersHTML(p)}
      <div class="sizes">${S.map(s => `<button class="size ${s.k === sel ? 'on' : ''}" data-k="${s.k}"><b>${s.label}</b><span>${money(s.price)}</span></button>`).join('')}</div>
      <div style="display:grid;gap:8px"><button class="btn gold block" id="qv-add">Add to bag</button>
      <a class="btn ghost block" id="qv-wa" target="_blank" rel="noopener">${ICON.wa} Ask about it on WhatsApp</a>
      <a class="link" style="text-align:center;margin-top:6px" href="product.html?id=${p.id}">See full details →</a></div></div></div>`;
    const wa = $('#qv-wa', q), upd = () => wa.href = waLink(waProduct(p, S.find(s => s.k === sel).label)); upd();
    q.onclick = e => { if (e.target === q || e.target.closest('.x')) { closeAll(); } const s = e.target.closest('.size'); if (s) { sel = s.dataset.k; $$('.size', q).forEach(b => b.classList.toggle('on', b === s)); upd(); } };
    $('#qv-add', q).onclick = () => { Bag.add(p.id, sel); closeAll(); };
    q.classList.add('on'); $('#scrim').classList.add('on');
  }
  window.quickView = quickView;
  document.addEventListener('click', e => { const b = e.target.closest('[data-quick]'); if (b) { e.preventDefault(); quickView(b.dataset.quick); } });

  /* reveals */
  window.revealAll = function (root = document) {
    const els = $$('.reveal', root).filter(e => !e.dataset.rv); els.forEach(e => e.dataset.rv = 1);
    if (reduced || !window.gsap) { els.forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; }); return; }
    if (window.ScrollTrigger) ScrollTrigger.batch(els, { start: 'top 90%', once: true, onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .08 }) });
    else els.forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
  };
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  renderBag(); updateFloat();
  addEventListener('DOMContentLoaded', () => { revealAll(); updateFloat(); });
  addEventListener('storage', e => { if (e.key === KEY) { bag = load(); renderBag(); updateFloat(); } });
})();
