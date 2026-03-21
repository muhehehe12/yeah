/* =============================================
   HONOM — script.js  v4
   ============================================= */

// ── Promo bar dismiss ──
const promoBar   = document.getElementById('promo-bar');
const promoClose = document.getElementById('promo-close');
if (promoClose) {
  promoClose.addEventListener('click', () => {
    promoBar.classList.add('hidden');
    // Optionally persist dismissal
    try { sessionStorage.setItem('promo-closed', '1'); } catch(e) {}
  });
  try {
    if (sessionStorage.getItem('promo-closed')) promoBar.classList.add('hidden');
  } catch(e) {}
}

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile nav toggle ──
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

// ── Language selector ──
const langBtn      = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const langCurrent  = langBtn.querySelector('.lang-current');
const langFlag     = langBtn.querySelector('.lang-flag');

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = langDropdown.classList.toggle('open');
  langBtn.classList.toggle('open', open);
  langBtn.setAttribute('aria-expanded', open);
});

langDropdown.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    langCurrent.textContent = li.dataset.lang.toUpperCase();
    langFlag.textContent    = li.dataset.flag;
    langDropdown.classList.remove('open');
    langBtn.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
    // Placeholder: real i18n would go here
  });
});

document.addEventListener('click', (e) => {
  if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
    langDropdown.classList.remove('open');
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

// ── Smooth scroll with offset ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + (promoBar && !promoBar.classList.contains('hidden') ? promoBar.offsetHeight : 0) + 10;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

// ── Contact form ──
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
  if (!name || !email || !msg) return;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…'; btn.disabled = true;
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message →'; btn.disabled = false;
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 6000);
  }, 900);
});

// ══════════════════════════════════════════
// HERO CANVAS — particle network
// Runs ONLY in the hero section canvas.
// ══════════════════════════════════════════
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;

  const CA = 'rgba(230,145,56,';
  const CC = 'rgba(139,0,0,';
  const CW = 'rgba(242,242,242,';
  const COUNT = 60, DIST = 135, SPEED = 0.32;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function mkP() {
    const r = Math.random();
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * SPEED, vy: (Math.random() - .5) * SPEED,
      r: Math.random() * 1.4 + .6,
      color: r < .1 ? CC : r < .28 ? CA : CW,
      a: Math.random() * .4 + .12,
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
          ctx.strokeStyle = CA + (1 - d/DIST) * .16 + ')';
          ctx.lineWidth = .55; ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color + p.a + ')'; ctx.fill();
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
