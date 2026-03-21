// Smooth scroll for nav links (single-page sections)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Optional: fade-in effect for half-loaded sections
window.addEventListener('scroll', () => {
  document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      section.classList.add('aos-animate');
    }
  });
});

// Demo preview click animation (fade-out then redirect)
document.querySelectorAll('.panel a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const url = link.getAttribute('href');
    document.body.style.transition = 'opacity 0.6s';
    document.body.style.opacity = '0';
    setTimeout(() => window.location.href = url, 600);
  });
});
