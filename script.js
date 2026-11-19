/* ===== EDIT YOUR CONTACT DETAILS HERE ===== */
const CONTACT = {
  email: "",   // e.g. "shlok@example.com"  — leave empty to hide the Email button
};
/* ========================================== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Certifications data ---------- */
const CERTS = [
  // EY
  { t: "AI in Spreadsheets", i: "EY", d: "Oct 2026", id: "PKA0P4XEOWQP6", s: "AI in spreadsheets", c: "ai" },
  { t: "AI Creativity eLearning Program", i: "EY", d: "Oct 2026", id: "D3PQVK0ZWQVOO", s: "AI creativity", c: "ai" },
  { t: "AI Literacy Essentials eLearning Program", i: "EY", d: "Sep 2026", id: "6J3Z2XKMNDYK", c: "ai" },
  { t: "Prompt Engineering for Study and Work", i: "EY", d: "Sep 2026", id: "H1W5DJDL1389X", s: "AI prompting", c: "ai" },
  // LinkedIn Learning
  { t: "Excel for Business Analysts", i: "LinkedIn Learning", d: "Oct 2026", s: "Microsoft Excel", c: "analytics" },
  { t: "Supply Chain Foundations", i: "LinkedIn Learning", d: "Nov 2026", c: "supply" },
  { t: "Job Skills: Supply Chain and Operations", i: "LinkedIn Learning", d: "Nov 2026", c: "supply" },
  { t: "Careers in Supply Chain and Operations", i: "LinkedIn Learning", d: "Nov 2026", s: "Supply chain management", c: "supply" },
  { t: "Operations Management Foundations", i: "LinkedIn Learning", c: "ops" },
  { t: "Implementing Supply Chain Management", i: "LinkedIn Learning", d: "Nov 2026", c: "supply" },
  { t: "Inventory Management Foundations", i: "LinkedIn Learning", d: "Nov 2026", s: "Inventory management", c: "supply" },
  { t: "Understanding Logistics", i: "LinkedIn Learning", d: "Nov 2026", s: "Logistics management", c: "supply" },
  { t: "Purchasing Foundations", i: "LinkedIn Learning", d: "Nov 2026", s: "Purchasing", c: "supply" },
  { t: "Supply Chain and Operations Management Tips", i: "LinkedIn Learning", d: "Nov 2026", c: "ops" },
  { t: "Supply Chain Foundations: Risk and Resilience", i: "LinkedIn Learning", d: "Nov 2026", s: "Supply chain risk management", c: "supply" },
  { t: "Lean Six Sigma Foundations", i: "LinkedIn Learning", d: "Nov 2026", s: "Lean Six Sigma", c: "ops" },
  { t: "Process Improvement Foundations", i: "LinkedIn Learning", d: "Nov 2026", c: "ops" },
];
const COLORS = { ai: "#f472b6", analytics: "#22d3ee", supply: "#fbbf24", ops: "#a78bfa" };
const LABELS = { ai: "AI & Digital", analytics: "Analytics", supply: "Supply Chain", ops: "Operations" };

const grid = $('#certGrid');
grid.innerHTML = CERTS.map((c, n) => `
  <article class="card cert tilt" data-cat="${c.c}" style="--c:${COLORS[c.c]};animation-delay:${n * 40}ms">
    <span class="issuer">${c.i}</span>
    <h3>${c.t}</h3>
    ${c.s ? `<p class="meta">Skill: ${c.s}</p>` : ''}
    ${c.id ? `<p class="id">ID · ${c.id}</p>` : ''}
    <div class="badge"><span>${c.d ? 'Issued ' + c.d : 'Completed'}</span><b>${LABELS[c.c]}</b></div>
  </article>`).join('');

$$('.filters button').forEach(b => b.addEventListener('click', () => {
  $$('.filters button').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  const f = b.dataset.f;
  $$('.cert').forEach((el, n) => {
    const show = f === 'all' || el.dataset.cat === f;
    el.classList.toggle('hide', !show);
    if (show) { el.style.animation = 'none'; el.offsetWidth; el.style.animation = ''; el.style.animationDelay = (n % 6) * 50 + 'ms'; }
  });
}));

/* ---------- Typewriter ---------- */
const roles = ["an MBA candidate.", "a business analytics enthusiast.", "an operations thinker.", "a supply chain learner.", "a problem solver."];
let ri = 0, ci = 0, del = false;
const typed = $('#typed');
(function type() {
  const w = roles[ri];
  typed.textContent = w.slice(0, ci += del ? -1 : 1);
  let t = del ? 35 : 80;
  if (!del && ci === w.length) { t = 1800; del = true; }
  else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; t = 350; }
  setTimeout(type, reduce ? 99999 : t);
})();
if (reduce) typed.textContent = roles[0];

/* ---------- Scroll reveal, counters, bars ---------- */
$$('.grid > .reveal, .stats').forEach((el, i) => el.style.setProperty('--d', (i % 3) * 0.1 + 's'));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  $$('[data-count]', e.target).forEach(countUp);
  $$('.bar', e.target).forEach((b, i) => setTimeout(() => b.classList.add('in'), i * 120));
  io.unobserve(e.target);
}), { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

function countUp(el) {
  const end = +el.dataset.count, dur = 1400, t0 = performance.now();
  (function f(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}

/* ---------- Nav + progress ---------- */
const nav = $('#nav'), prog = $('#progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  nav.classList.toggle('scrolled', scrollY > 30);
}, { passive: true });

/* ---------- Cursor glow, card spotlight + 3D tilt ---------- */
const glow = $('.cursor-glow');
addEventListener('pointermove', e => { glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });
document.addEventListener('pointermove', e => {
  const card = e.target.closest && e.target.closest('.card');
  if (!card) return;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  card.style.setProperty('--mx', x * 100 + '%');
  card.style.setProperty('--my', y * 100 + '%');
  if (!reduce && matchMedia('(hover:hover)').matches)
    card.style.transform = `perspective(900px) rotateY(${(x - .5) * 8}deg) rotateX(${(.5 - y) * 8}deg) translateZ(0)`;
});
document.addEventListener('pointerout', e => {
  const card = e.target.closest && e.target.closest('.card');
  if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
});

/* ---------- Magnetic buttons ---------- */
$$('.magnetic').forEach(b => {
  b.addEventListener('pointermove', e => {
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
  });
  b.addEventListener('pointerleave', () => b.style.transform = '');
});

/* ---------- Contact / footer ---------- */
if (CONTACT.email) { const m = $('#mailBtn'); m.href = 'mailto:' + CONTACT.email; m.hidden = false; }
$('#yr').textContent = new Date().getFullYear();

/* ---------- Particle network background ---------- */
(() => {
  const cv = $('#bg'), ctx = cv.getContext('2d');
  let W, H, P = [], dpr = Math.min(devicePixelRatio || 1, 2);
  const mouse = { x: -999, y: -999 };
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  function size() {
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(110, Math.floor(W * H / 14000));
    P = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.6 + .6, h: Math.random() }));
  }
  size(); addEventListener('resize', size);
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of P) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 140) { p.x += dx / d * 1.6; p.y += dy / d * 1.6; }
    }
    for (let i = 0; i < P.length; i++) {
      const a = P[i];
      ctx.fillStyle = a.h > .5 ? 'rgba(34,211,238,.8)' : 'rgba(167,139,250,.8)';
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
      for (let j = i + 1; j < P.length; j++) {
        const b = P[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) { ctx.strokeStyle = `rgba(150,160,255,${(1 - d / 130) * .22})`; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 180) { ctx.strokeStyle = `rgba(34,211,238,${(1 - dm / 180) * .5})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
    }
    if (!reduce) requestAnimationFrame(draw);
  }
  draw();
})();
