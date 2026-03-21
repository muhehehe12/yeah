/* =============================================
   Gyros Thessaloniki — script.js
   ============================================= */

// ── Promo bar dismiss ──
const promoBar   = document.getElementById('promo-bar');
const promoClose = document.getElementById('promo-close');
if (promoClose) {
  promoClose.addEventListener('click', () => {
    promoBar.classList.add('hidden');
    try { sessionStorage.setItem('promo-closed', '1'); } catch(e) {}
  });
  try { if (sessionStorage.getItem('promo-closed')) promoBar.classList.add('hidden'); } catch(e) {}
}

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });

// ── Mobile nav toggle ──
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// ── Language selector ──
const langBtn  = document.getElementById('lang-btn');
const langDrop = document.getElementById('lang-drop');
const langCur  = document.getElementById('lang-cur');
const langFlag = document.getElementById('lang-flag');

langBtn.addEventListener('click', e => {
  e.stopPropagation();
  const open = langDrop.classList.toggle('open');
  langBtn.classList.toggle('open', open);
  langBtn.setAttribute('aria-expanded', open);
});

langDrop.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    langCur.textContent  = li.dataset.lang;
    langFlag.innerHTML   = li.dataset.flag;
    langDrop.classList.remove('open');
    langBtn.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', e => {
  if (!langBtn.contains(e.target) && !langDrop.contains(e.target)) {
    langDrop.classList.remove('open');
    langBtn.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  }
});

// ── Scroll reveal ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Smooth scroll with navbar offset ──
const navH = () => navbar.offsetHeight + (promoBar && !promoBar.classList.contains('hidden') ? promoBar.offsetHeight : 0) + 10;
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH(), behavior: 'smooth' });
  });
});

// ── Reservation form ──
const resForm    = document.getElementById('res-form');
const resSuccess = document.getElementById('res-success');
const resSubmit  = document.getElementById('res-submit');

// Set min date to today
const dateInput = document.getElementById('res-date');
if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

resForm.addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('res-name').value.trim();
  const email   = document.getElementById('res-email').value.trim();
  const date    = document.getElementById('res-date').value;
  const guests  = document.getElementById('res-guests').value;
  if (!name || !email || !date || !guests) return;

  resSubmit.textContent = 'Sending…';
  resSubmit.disabled = true;

  // Simulate submission — replace with Formspree or real endpoint
  setTimeout(() => {
    resForm.reset();
    resSubmit.textContent = 'Reserve Now →';
    resSubmit.disabled = false;
    resSuccess.classList.add('visible');
    setTimeout(() => resSuccess.classList.remove('visible'), 7000);
  }, 1000);
});

// ══════════════════════════════════════════
// HERO CANVAS — subtle floating particles
// Only animates while hero is in viewport
// ══════════════════════════════════════════
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;

  const AMBER  = 'rgba(230,145,56,';
  const CRIM   = 'rgba(139,0,0,';
  const WHITE  = 'rgba(242,242,242,';
  const COUNT  = 55;
  const DIST   = 130;
  const SPEED  = 0.28;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function mkP() {
    const r = Math.random();
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * SPEED, vy: (Math.random() - .5) * SPEED,
      r: Math.random() * 1.3 + .5,
      c: r < .08 ? CRIM : r < .25 ? AMBER : WHITE,
      a: Math.random() * .35 + .08,
    };
  }

  function init() { resize(); particles = Array.from({ length: COUNT }, mkP); }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < DIST) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = AMBER + (1 - d/DIST) * .12 + ')';
          ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.c + p.a + ')'; ctx.fill();
    });
    animId = requestAnimationFrame(draw);
  }

  const heroEl = document.getElementById('hero');
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { if (!animId) draw(); }
    else { cancelAnimationFrame(animId); animId = null; }
  }, { threshold: 0.01 }).observe(heroEl);

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => { p.x = Math.min(p.x, W); p.y = Math.min(p.y, H); });
  }, { passive: true });

  init(); draw();
})();
