/* =============================================
   HONOM — script.js
   ============================================= */

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


// === SCROLL REVEAL ===
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// === CONTACT FORM ===
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) return;

  // Simulate submission (replace with a real endpoint or Formspree)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    successMsg.classList.add('visible');

    setTimeout(() => successMsg.classList.remove('visible'), 5000);
  }, 900);
});


// === SMOOTH SCROLL OFFSET (for fixed navbar) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});
