(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = () => innerWidth <= 820;

  /* content */
  $('#moods').innerHTML = Object.entries(FAMILIES).map(([k, f], i) => `
    <a class="mood reveal" href="shop.html?fam=${k}"><img src="${f.img}" alt="" loading="lazy"><span class="n">0${i + 1}</span>
      <div><h3>${f.label}</h3><p>${f.blurb}</p></div></a>`).join('');
  $('#best').innerHTML = ['khamrah', 'yara', 'asad', 'cdni', 'oud-glory', 'khamrah-waha'].map(id => cardHTML(byId(id))).join('');
  $('#revs').innerHTML = REVIEWS.map(r => { const p = byId(r.p); return `
    <article class="rev reveal"><div class="stars">★★★★★</div><p>“${r.t}”</p>
      <footer><img src="${p.img}" alt=""><div><b>${r.n}</b>${r.a} · bought ${p.name}</div></footer></article>`; }).join('');
  revealAll();

  /* gold motes */
  const cv = $('#motes'), cx = cv.getContext('2d'); let W, H, motes = [];
  const size = () => { const d = Math.min(devicePixelRatio, 2); W = cv.width = cv.offsetWidth * d; H = cv.height = cv.offsetHeight * d; motes = Array.from({ length: mobile() ? 28 : 60 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.6 + .4) * d, v: Math.random() * .25 + .08, a: Math.random() * Math.PI * 2 })); };
  size(); addEventListener('resize', size);
  let heroVisible = true;
  new IntersectionObserver(([e]) => heroVisible = e.isIntersecting).observe($('#hero'));
  (function tick(t) {
    if (heroVisible && !reduced) {
      cx.clearRect(0, 0, W, H);
      for (const m of motes) {
        m.y -= m.v; m.x += Math.sin(t / 2000 + m.a) * .25; if (m.y < -5) { m.y = H + 5; m.x = Math.random() * W; }
        const tw = .45 + .55 * Math.sin(t / 700 + m.a * 3);
        cx.beginPath(); cx.arc(m.x, m.y, m.r, 0, 7); cx.fillStyle = `rgba(230,207,152,${.5 * tw})`; cx.fill();
      }
    }
    requestAnimationFrame(tick);
  })(0);

  if (reduced || !window.gsap) return;

  /* intro */
  gsap.from('.h-copy h1 .ln>span', { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: .1, delay: .15 });
  gsap.from(['.h-copy .eyebrow', '.h-copy .lead', '.h-ctas'], { opacity: 0, y: 20, duration: 1.2, ease: 'expo.out', stagger: .1, delay: .5 });
  gsap.from('#arch', { opacity: 0, scale: .94, duration: 1.8, ease: 'expo.out', delay: .2 });

  /* hero: arch window opens to full-bleed */
  const mm = gsap.matchMedia();
  mm.add({ d: '(min-width: 821px)', m: '(max-width: 820px)' }, ctx => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: 1 } });
    tl.to('#hcopy', { y: ctx.conditions.d ? -80 : -140, opacity: 0, duration: .35, ease: 'power2.in' }, 0)
      .to('#ring', { opacity: 0, scale: 1.1, duration: .3 }, 0)
      .to('#arch', { clipPath: 'inset(0vh 0vw 0vh 0vw round 0vw 0vw 0px 0px)', duration: 1, ease: 'power2.inOut' }, .05)
      .to('#arch img', { x: 0, y: 0, scale: 1, duration: 1, ease: 'power2.inOut' }, .05)
      .fromTo('#htwo', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out' }, .75)
      .to({}, { duration: .25 });
    ScrollTrigger.create({ trigger: '#hero', start: 'top top', end: 'bottom bottom', onUpdate: s => $('#arch').classList.toggle('dim', s.progress > .55) });
  });

  /* parallax bits */
  [['#decimg', -8], ['#expoimg', -10]].forEach(([s, y]) => gsap.fromTo(s, { yPercent: -y }, { yPercent: y, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom top', scrub: true } }));
})();

/* anatomy steps — works with or without GSAP */
(function () {
  const steps = $$('.step'), imgs = $$('#avis img');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const s = e.target; steps.forEach(x => x.classList.toggle('on', x === s));
    imgs.forEach(i => i.classList.toggle('on', i.dataset.s === s.dataset.s));
    $('#atag').textContent = s.dataset.t; $('#atime').textContent = s.dataset.time;
  }), { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach(s => io.observe(s)); steps[0].classList.add('on');
})();
