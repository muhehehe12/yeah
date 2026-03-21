/* =============================================
   Gyros Thessaloniki v2 — script.js
   Fire particles · Custom cursor · All UX
   ============================================= */

'use strict';

/* ── Promo bar ── */
const promoBar   = document.getElementById('promo-bar');
const promoClose = document.getElementById('promo-close');
if (promoClose) {
  promoClose.addEventListener('click', () => {
    promoBar.classList.add('gone');
    try { sessionStorage.setItem('promo-closed', '1'); } catch(e) {}
  });
  try { if (sessionStorage.getItem('promo-closed')) promoBar.classList.add('gone'); } catch(e) {}
}

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('stuck', window.scrollY > 20);
}, { passive: true });

/* ── Mobile burger ── */
const burger  = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');
burger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ── Language selector ── */
const langToggle = document.getElementById('lang-toggle');
const langList   = document.getElementById('lang-list');
const lFlag      = document.getElementById('l-flag');
const lCode      = document.getElementById('l-code');
const lChev      = document.getElementById('l-chev');

langToggle.addEventListener('click', e => {
  e.stopPropagation();
  const open = langList.classList.toggle('open');
  langToggle.classList.toggle('open', open);
  langToggle.setAttribute('aria-expanded', open);
  lChev.style.transform = open ? 'rotate(180deg)' : '';
});
langList.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    lFlag.textContent = li.dataset.flag;
    lCode.textContent = li.dataset.code;
    langList.classList.remove('open');
    langToggle.classList.remove('open');
    lChev.style.transform = '';
  });
});
document.addEventListener('click', e => {
  if (!langToggle.contains(e.target) && !langList.contains(e.target)) {
    langList.classList.remove('open');
    langToggle.classList.remove('open');
    lChev.style.transform = '';
  }
});

/* ── Custom cursor ── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

if (cursor && cursorTrail) {
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animCursor() {
    tx += (mx - tx) * 0.18;
    ty += (my - ty) * 0.18;
    cursor.style.left       = mx + 'px';
    cursor.style.top        = my + 'px';
    cursorTrail.style.left  = tx + 'px';
    cursorTrail.style.top   = ty + 'px';
    requestAnimationFrame(animCursor);
  })();

  const hoverEls = document.querySelectorAll('a, button, .dish-card, .pillar, .gal-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ── Smooth scroll with offset ── */
const getNavH = () => {
  const nb = navbar.offsetHeight;
  const pb = promoBar && !promoBar.classList.contains('gone') ? promoBar.offsetHeight : 0;
  return nb + pb + 12;
};
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - getNavH(), behavior: 'smooth' });
  });
});

/* ── Scroll reveal ── */
const srObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); srObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.sr').forEach(el => srObs.observe(el));

/* ==================
   3D TILT EFFECT
   ================== */
document.querySelectorAll('.dish-card, .tc').forEach(card => {
  card.classList.add('glass-card', 'tilt-card');
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
    card.style.boxShadow = `${-x * 16}px ${-y * 16}px 32px rgba(255,165,0,.15)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

/* ── Reservation form ── */
const resForm  = document.getElementById('res-form');
const formOk   = document.getElementById('form-ok');
const resBtn   = document.getElementById('res-btn');
const dateInp  = document.getElementById('fd');
if (dateInp) dateInp.min = new Date().toISOString().split('T')[0];

resForm.addEventListener('submit', e => {
  e.preventDefault();
  const n = document.getElementById('fn').value.trim();
  const em = document.getElementById('fe').value.trim();
  const dt = document.getElementById('fd').value;
  const gs = document.getElementById('fg-sel').value;
  if (!n || !em || !dt || !gs) return;

  resBtn.textContent = 'Sending…';
  resBtn.disabled = true;
  setTimeout(() => {
    resForm.reset();
    resBtn.textContent = 'Reserve Now →';
    resBtn.disabled = false;
    formOk.classList.add('show');
    setTimeout(() => formOk.classList.remove('show'), 7000);
  }, 1100);
});

/* ══════════════════════════════════════════════
   FIRE PARTICLE ENGINE
   Canvas renders glowing embers + sparks
   on the hero section only.
   Pauses when hero leaves viewport.
══════════════════════════════════════════════ */
(function FireEngine() {
  const canvas = document.getElementById('fire-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;

  /* Particle pool */
  const POOL_SIZE = 120;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* Ember / spark particle */
  function mkParticle() {
    const isEmber = Math.random() < 0.55;
    return {
      type:  isEmber ? 'ember' : 'spark',
      x:     Math.random() * W,
      y:     H + 20,
      vx:    (Math.random() - 0.5) * (isEmber ? 1.2 : 2.5),
      vy:    -(Math.random() * (isEmber ? 2.5 : 4) + 1),
      life:  1,
      decay: Math.random() * 0.008 + (isEmber ? 0.004 : 0.009),
      r:     Math.random() * (isEmber ? 3.5 : 1.8) + (isEmber ? 1.5 : 0.8),
      hue:   isEmber ? Math.random() * 30 + 10 : Math.random() * 50 + 20,   // 10-40 = red-orange, 20-70 = orange-yellow
      wobble: Math.random() * 0.08,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      wobblePhase: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const p = mkParticle();
      // Stagger initial positions along height
      p.y = Math.random() * H;
      p.life = Math.random();
      particles.push(p);
    }
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    /* Spawn new particles to maintain pool */
    while (particles.length < POOL_SIZE) particles.push(mkParticle());

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
      /* Update */
      p.wobblePhase += p.wobbleSpeed;
      p.x  += p.vx + Math.sin(p.wobblePhase) * p.wobble * 8;
      p.y  += p.vy;
      p.vy -= 0.018;  // slight upward acceleration (hot air)
      p.life -= p.decay;

      if (p.life <= 0) return;

      const alpha = Math.min(p.life * 1.4, 1);
      const radius = p.r * (p.type === 'ember' ? (0.5 + p.life * 0.5) : 1);

      if (p.type === 'ember') {
        /* Glowing ember — radial gradient */
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3.5);
        grad.addColorStop(0,   `hsla(${p.hue}, 100%, 88%, ${alpha * 0.95})`);
        grad.addColorStop(0.3, `hsla(${p.hue}, 100%, 60%, ${alpha * 0.7})`);
        grad.addColorStop(0.7, `hsla(${p.hue}, 90%, 40%, ${alpha * 0.35})`);
        grad.addColorStop(1,   `hsla(${p.hue}, 80%, 20%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      } else {
        /* Spark — thin bright dot with tail */
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 4, p.y - p.vy * 4);
        ctx.strokeStyle = `hsla(${p.hue}, 100%, 75%, ${alpha * 0.8})`;
        ctx.lineWidth = p.r * 0.8;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 90%, ${alpha})`;
        ctx.fill();
      }
    });

    /* Occasional burst of sparks from base */
    if (frame % 45 === 0) {
      const bx = Math.random() * W * 0.8 + W * 0.1;
      for (let i = 0; i < 6; i++) {
        const sp = mkParticle();
        sp.type = 'spark';
        sp.x = bx + (Math.random() - 0.5) * 40;
        sp.y = H - 10;
        sp.vy = -(Math.random() * 6 + 3);
        sp.vx = (Math.random() - 0.5) * 4;
        sp.r  = Math.random() * 1.5 + 0.5;
        sp.decay = 0.014;
        particles.push(sp);
      }
    }

    animId = requestAnimationFrame(draw);
  }

  /* Pause when hero is off-screen */
  const heroEl = document.getElementById('hero');
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { if (!animId) draw(); }
    else { cancelAnimationFrame(animId); animId = null; }
  }, { threshold: 0.01 }).observe(heroEl);

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => { p.x = Math.min(p.x, W); p.y = Math.min(p.y, H); });
  }, { passive: true });

  init();
  draw();
})();

/* ══════════════════════════════════════════════
   AMBIENT GLOW GRID — a subtle animated
   heat-haze / shimmer on the menu section.
   Uses a second off-screen canvas drawn
   onto a CSS filter backdrop.
══════════════════════════════════════════════ */
(function AmbientGlow() {
  const section = document.querySelector('.menu');
  if (!section) return;

  const orbs = [];
  for (let i = 0; i < 5; i++) {
    orbs.push({
      el: (() => {
        const d = document.createElement('div');
        d.style.cssText = `
          position:absolute;pointer-events:none;border-radius:50%;
          filter:blur(80px);opacity:0;will-change:transform,opacity;
          background:radial-gradient(circle, rgba(255,${60 + i*25},0,.28), transparent 70%);
        `;
        section.appendChild(d);
        return d;
      })(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      w: 300 + Math.random() * 300,
      speedX: (Math.random() - 0.5) * 0.04,
      speedY: (Math.random() - 0.5) * 0.03,
      phase: Math.random() * Math.PI * 2,
    });
  }

  const orbObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) startOrbs();
    else stopOrbs();
  }, { threshold: 0.1 });
  orbObs.observe(section);

  let running = false;
  function startOrbs() {
    if (running) return;
    running = true;
    animOrbs();
  }
  function stopOrbs() { running = false; }

  function animOrbs() {
    if (!running) return;
    const t = Date.now() * 0.001;
    orbs.forEach((o, i) => {
      o.x += o.speedX;
      o.y += o.speedY;
      if (o.x < -10 || o.x > 110) o.speedX *= -1;
      if (o.y < -10 || o.y > 110) o.speedY *= -1;
      const alpha = 0.25 + Math.sin(t * 0.5 + o.phase + i) * 0.15;
      o.el.style.cssText = `
        position:absolute;pointer-events:none;border-radius:50%;
        filter:blur(80px);will-change:transform,opacity;
        left:${o.x}%;top:${o.y}%;
        width:${o.w}px;height:${o.w}px;
        opacity:${Math.max(0, alpha)};
        background:radial-gradient(circle, rgba(255,${80 + i*25},0,.3), transparent 70%);
        transform:translate(-50%,-50%);
      `;
    });
    requestAnimationFrame(animOrbs);
  }
})();

/* ── Video fallback: if network fails, use Unsplash still ── */
document.querySelectorAll('video').forEach(v => {
  v.addEventListener('error', () => {
    const section = v.closest('section');
    if (!section) return;
    const imgs = {
      hero: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80&auto=format&fit=crop',
      about: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&auto=format&fit=crop',
      reservations: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop',
    };
    const key = section.classList[0];
    if (imgs[key]) {
      v.style.cssText = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.35;z-index:0;background:url(${imgs[key]}) center/cover;`;
      v.remove();
    }
  }, { once: true });
});
