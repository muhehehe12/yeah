/* =============================================
   HONOM — script.js  v3
   Canvas particles (hero only) + UX utilities
   ============================================= */

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });

// ── Mobile nav ──
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

// ── Scroll reveal ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Smooth scroll with navbar offset ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 12, behavior: 'smooth' });
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
    btn.textContent = 'Send Message'; btn.disabled = false;
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 5000);
  }, 900);
});

// ══════════════════════════════════════════
// HERO CANVAS — floating particle network
// Runs ONLY on the #hero section canvas.
// No animation on any other section.
// ══════════════════════════════════════════
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;

  // Palette references
  const C_AMBER   = 'rgba(230,145,56,';    // amber lines
  const C_CRIMSON = 'rgba(139,0,0,';       // crimson dots
  const C_WHITE   = 'rgba(242,242,242,';   // white dots

  const COUNT     = 55;    // number of particles
  const MAX_DIST  = 140;   // connection threshold
  const SPEED     = 0.35;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    const roll = Math.random();
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r:  Math.random() * 1.4 + 0.6,
      // 10% crimson, 20% amber, rest white-dim
      color: roll < 0.10 ? C_CRIMSON : roll < 0.30 ? C_AMBER : C_WHITE,
      alpha: Math.random() * 0.45 + 0.15,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const lineAlpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = C_AMBER + lineAlpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  // Pause when hero is off-screen (performance)
  const heroSection = document.getElementById('hero');
  const visObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      if (!animId) draw();
    } else {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }, { threshold: 0.01 });

  visObs.observe(heroSection);

  window.addEventListener('resize', () => {
    resize();
    // redistribute particles on resize
    particles.forEach(p => { p.x = Math.min(p.x, W); p.y = Math.min(p.y, H); });
  }, { passive: true });

  init();
  draw();
})();
