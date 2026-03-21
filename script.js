// Gotham Minimalist - Trust-building subtle animations & logic

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links (Elegant interaction)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Intersection Observer for subtle fade-in effects on scroll
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply fade-in classes to layout elements dynamically
  document.querySelectorAll('section, .card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Contact form submission UX
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button');
      const originalText = btn.textContent;
      
      btn.textContent = 'ENCRYPTING & SENDING...';
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';
      
      setTimeout(() => {
        btn.textContent = 'MESSAGE SECURED';
        btn.style.background = '#e2e4e9';
        btn.style.borderColor = '#e2e4e9';
        btn.style.color = '#000';
        btn.style.opacity = '1';
        this.reset();
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style = '';
        }, 4000);
      }, 1500);
    });
  }
});