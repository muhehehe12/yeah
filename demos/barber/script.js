/* ===========================
   BLADEHAUS — script.js
   =========================== */

/* ==================
   HERO CANVAS ANIMATION
   ================== */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, lines, rafId;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.speed = Math.random() * 0.4 + 0.1;
      this.angle = Math.random() * Math.PI * 2;
      this.drift = (Math.random() - 0.5) * 0.008;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.color = Math.random() > 0.85 ? '#E69138' : '#F2F2F2';
    }
    update() {
      this.angle += this.drift;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed * 0.5 - 0.15;
      this.pulse += this.pulseSpeed;
      if (this.y < -5 || this.x < -5 || this.x > W + 5) this.reset();
    }
    draw() {
      const alpha = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color === '#E69138'
        ? `rgba(230,145,56,${alpha})`
        : `rgba(242,242,242,${alpha * 0.6})`;
      ctx.fill();
    }
  }

  class ScanLine {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.len = Math.random() * 80 + 20;
      this.angle = (Math.random() - 0.5) * 0.3;
      this.speed = Math.random() * 1.2 + 0.3;
      this.opacity = Math.random() * 0.15 + 0.03;
      this.width = Math.random() * 0.8 + 0.2;
    }
    update() {
      this.y -= this.speed;
      this.x += Math.sin(this.angle) * 0.5;
      if (this.y + this.len < 0) {
        this.y = H + 20;
        this.x = Math.random() * W;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + Math.sin(this.angle) * this.len * 0.3, this.y + this.len);
      ctx.strokeStyle = `rgba(242,242,242,${this.opacity})`;
      ctx.lineWidth = this.width;
      ctx.stroke();
    }
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((W * H) / 8000), 140);
    particles = Array.from({ length: count }, () => new Particle());
    lines = Array.from({ length: 30 }, () => new ScanLine());
  }

  let frameCount = 0;
  function drawGrid() {
    if (frameCount % 3 !== 0) return;
    const spacing = 80;
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
  }

  function drawVignette() {
    const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(13,13,13,0.65)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  function animate() {
    rafId = requestAnimationFrame(animate);
    frameCount++;

    ctx.fillStyle = 'rgba(13,13,13,0.2)';
    ctx.fillRect(0, 0, W, H);

    drawGrid();
    lines.forEach(l => { l.update(); l.draw(); });
    particles.forEach(p => { p.update(); p.draw(); });
    drawVignette();
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(rafId);
    init();
    animate();
  });

  init();
  animate();
})();


/* ==================
   STICKY NAVBAR
   ================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* ==================
   MOBILE NAV TOGGLE
   ================== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  const spans = navToggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    document.body.style.overflow = 'hidden';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    document.body.style.overflow = '';
  }
});

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    document.body.style.overflow = '';
  });
});


/* ==================
   SCROLL REVEAL
   ================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});


/* ==================
   LANGUAGE SELECTOR
   ================== */
const translations = {
  en: {
    nav_home: 'Home', nav_services: 'Services', nav_gallery: 'Gallery', nav_team: 'Team', nav_book: 'Book Now',
    hero_eyebrow: 'Premium Barber Studio · Est. 2018',
    hero_line1: 'Cut.', hero_line2: 'Style.', hero_line3: 'Confidence.',
    hero_sub: 'Experience the ultimate barbering with precision and style.\nEvery cut tells a story — make yours iconic.',
    hero_cta: 'Book Appointment', hero_cta2: 'Our Services',
    scroll_hint: 'Scroll',
    about_label: 'About Us', about_title: 'Where Tradition\nMeets Modern Edge',
    about_badge: 'Years of Excellence',
    about_p1: 'At BLADEHAUS, every client walks in and leaves transformed. We combine old-school barbering mastery with contemporary design sensibility — delivering precision cuts, flawless fades, and grooming experiences that build confidence.',
    about_p2: 'Our shop is built on trust, loyalty, and a deep respect for the craft. We\'re proud to be a cornerstone of our community — a place where style is personal and service is always exceptional.',
    stat1: 'Happy Clients', stat2: 'Master Barbers', stat3: 'Satisfaction Rate',
    services_label: 'What We Do', services_title: 'Our Services',
    svc1_name: 'Signature Haircut', svc1_desc: 'Precision cuts tailored to your face shape and lifestyle. Includes wash, cut, and style finish.',
    svc2_name: 'Beard Sculpt', svc2_desc: 'Expert beard shaping, trimming, and conditioning. We define your edge with surgical precision.',
    svc3_name: 'Hot Towel Shave', svc3_desc: 'Classic straight razor shave with hot towel treatment. Pure luxury, ultra-smooth finish.',
    svc4_name: 'Full Grooming Package', svc4_desc: 'The complete experience: haircut, beard trim, hot towel treatment, and styling — all in one visit.',
    svc_book: 'Book →',
    gallery_label: 'Our Work', gallery_title: 'The Portfolio',
    g1: 'Classic Fade', g2: 'Textured Top', g3: 'Beard Lineup', g4: 'Skin Fade', g5: 'Shop Interior', g6: 'Pompadour',
    team_label: 'The Crew', team_title: 'Meet the Masters',
    t1_role: 'Head Barber & Founder', t1_bio: '15 years in the craft. Specializes in fades, skin tapers, and classic gentleman cuts.',
    t2_role: 'Senior Stylist', t2_bio: 'Beard architecture wizard. Known for razor-sharp lineups and modern textured cuts.',
    t3_role: 'Classic Shave Specialist', t3_bio: 'Master of the straight razor. Delivers an unmatched hot towel shave experience every time.',
    booking_label: 'Get in Touch', booking_title: 'Book Your\nAppointment',
    booking_desc: 'Ready for a fresh cut? Fill out the form and we\'ll confirm your slot within 24 hours. Walk-ins also welcome.',
    hours: 'Mon–Sat: 9:00 – 20:00',
    form_name: 'Full Name', form_email: 'Email', form_service: 'Service', form_select: 'Select a service',
    form_date: 'Preferred Date', form_msg: 'Message (optional)', form_submit: 'Book Appointment',
    form_success: '✦ Booking request sent! We\'ll be in touch soon.',
    trust_label: 'Why Choose Us', trust_title: 'Your Trust, Our Commitment',
    trust1: 'Certified Barbers', trust2: 'Hygiene Rated A+', trust3: '5★ Local Award 2024', trust4: 'Premium Products Only',
    rev1: '"Best fade I\'ve ever had. Marco is a true artist — I won\'t go anywhere else."',
    rev2: '"Incredible atmosphere, immaculate service. The hot towel shave is life-changing."',
    rev3: '"I bring my whole family here. Consistent quality, great team, always on time."',
    footer_rights: 'All rights reserved.'
  },
  ro: {
    nav_home: 'Acasă', nav_services: 'Servicii', nav_gallery: 'Galerie', nav_team: 'Echipa', nav_book: 'Rezervă',
    hero_eyebrow: 'Studio Premium de Frizerie · Est. 2018',
    hero_line1: 'Tunde.', hero_line2: 'Stilizează.', hero_line3: 'Încredere.',
    hero_sub: 'Descoperă o experiență de frizerie de top, cu precizie și stil.\nFiecare tunsoare spune o poveste — fă-o iconică.',
    hero_cta: 'Programare', hero_cta2: 'Serviciile Noastre',
    scroll_hint: 'Derulează',
    about_label: 'Despre Noi', about_title: 'Tradiție\nÎntâlnind Modernul',
    about_badge: 'Ani de Excelență',
    about_p1: 'La BLADEHAUS, fiecare client pleacă transformat. Combinăm măiestria frizeriei clasice cu sensibilitatea designului contemporan — oferind tunsori de precizie și experiențe de îngrijire ce inspiră încredere.',
    about_p2: 'Frizeria noastră este construită pe încredere, loialitate și respect profund pentru meserie. Suntem mândri să fim un punct de referință în comunitate.',
    stat1: 'Clienți Mulțumiți', stat2: 'Frizeri Maeștri', stat3: 'Rată de Satisfacție',
    services_label: 'Ce Oferim', services_title: 'Serviciile Noastre',
    svc1_name: 'Tunsoare Signature', svc1_desc: 'Tunsori de precizie adaptate formei feței și stilului tău. Include spălare, tuns și finisaj.',
    svc2_name: 'Sculptarea Bărbii', svc2_desc: 'Modelare, tundere și condiționare expertă a bărbii. Definim conturul cu precizie chirurgicală.',
    svc3_name: 'Ras cu Prosop Cald', svc3_desc: 'Ras clasic cu brici și tratament cu prosop cald. Lux pur, finisaj ultra-neted.',
    svc4_name: 'Pachet Complet', svc4_desc: 'Experiența completă: tunsoare, barbă, prosop cald și stilizare — totul într-o vizită.',
    svc_book: 'Rezervă →',
    gallery_label: 'Lucrările Noastre', gallery_title: 'Portofoliu',
    g1: 'Fade Clasic', g2: 'Top Texturat', g3: 'Barbă Precisă', g4: 'Fade pe Piele', g5: 'Interior Salon', g6: 'Pompadour',
    team_label: 'Echipa', team_title: 'Cunoaște Maeștrii',
    t1_role: 'Frizer Principal & Fondator', t1_bio: '15 ani în meserie. Specialist în fade-uri, tapers și tunsori clasice.',
    t2_role: 'Stilist Senior', t2_bio: 'Maestru în arhitectura bărbii. Cunoscut pentru alinieri precise și tunsori texturate moderne.',
    t3_role: 'Specialist Ras Clasic', t3_bio: 'Maestru al briciului. Oferă o experiență de ras cu prosop cald de neegalat.',
    booking_label: 'Contactează-ne', booking_title: 'Fă o\nRezerare',
    booking_desc: 'Gata pentru o tunsoare proaspătă? Completează formularul și confirmăm în 24 de ore. Primim și fără programare.',
    hours: 'Lun–Sâm: 9:00 – 20:00',
    form_name: 'Nume Complet', form_email: 'Email', form_service: 'Serviciu', form_select: 'Alege un serviciu',
    form_date: 'Data Preferată', form_msg: 'Mesaj (opțional)', form_submit: 'Rezervă Programare',
    form_success: '✦ Cerere trimisă! Te contactăm în curând.',
    trust_label: 'De Ce Noi', trust_title: 'Încrederea Ta, Angajamentul Nostru',
    trust1: 'Frizeri Certificați', trust2: 'Igienă Notată A+', trust3: '5★ Premiu Local 2024', trust4: 'Produse Premium',
    rev1: '"Cel mai bun fade pe care l-am avut vreodată. Marco este un adevărat artist."',
    rev2: '"Atmosferă incredibilă, serviciu impecabil. Rasul cu prosop cald îți schimbă viața."',
    rev3: '"Aduc toată familia aici. Calitate constantă, echipă grozavă, mereu punctuali."',
    footer_rights: 'Toate drepturile rezervate.'
  },
  de: {
    nav_home: 'Start', nav_services: 'Leistungen', nav_gallery: 'Galerie', nav_team: 'Team', nav_book: 'Buchen',
    hero_eyebrow: 'Premium Barbershop · Seit 2018',
    hero_line1: 'Schnitt.', hero_line2: 'Stil.', hero_line3: 'Selbstvertrauen.',
    hero_sub: 'Erlebe Barbering auf höchstem Niveau — mit Präzision und Stil.\nJeder Haarschnitt erzählt eine Geschichte — mach deinen unvergesslich.',
    hero_cta: 'Termin buchen', hero_cta2: 'Unsere Leistungen',
    scroll_hint: 'Scrollen',
    about_label: 'Über uns', about_title: 'Tradition trifft\nmodernes Design',
    about_badge: 'Jahre Exzellenz',
    about_p1: 'Bei BLADEHAUS verlässt jeder Kunde verwandelt den Salon. Wir verbinden klassisches Barbierhandwerk mit zeitgenössischem Designgefühl — für präzise Schnitte und Pflegeerlebnisse, die Selbstvertrauen schenken.',
    about_p2: 'Unser Shop ist auf Vertrauen, Loyalität und tiefem Respekt gegenüber dem Handwerk aufgebaut. Wir sind stolz darauf, ein Eckpfeiler unserer Gemeinschaft zu sein.',
    stat1: 'Zufriedene Kunden', stat2: 'Meisterbarbiere', stat3: 'Zufriedenheitsrate',
    services_label: 'Was wir bieten', services_title: 'Unsere Leistungen',
    svc1_name: 'Signature Haarschnitt', svc1_desc: 'Präzise Schnitte, angepasst an Gesichtsform und Lebensstil. Inklusive Waschen, Schneiden und Styling.',
    svc2_name: 'Bartformung', svc2_desc: 'Expertenhaftes Formen, Trimmen und Pflegen des Bartes. Wir definieren Ihre Konturen mit chirurgischer Präzision.',
    svc3_name: 'Heißtuch-Rasur', svc3_desc: 'Klassische Rasur mit Rasiermesser und Heißtuchbehandlung. Purer Luxus, ultraglatte Haut.',
    svc4_name: 'Komplett-Paket', svc4_desc: 'Das komplette Erlebnis: Haarschnitt, Bart, Heißtuch und Styling — alles in einem Besuch.',
    svc_book: 'Buchen →',
    gallery_label: 'Unsere Arbeit', gallery_title: 'Portfolio',
    g1: 'Klassischer Fade', g2: 'Strukturierter Oberkopf', g3: 'Bartkontur', g4: 'Skin Fade', g5: 'Salon-Ambiente', g6: 'Pompadour',
    team_label: 'Das Team', team_title: 'Unsere Meister',
    t1_role: 'Chefbarbier & Gründer', t1_bio: '15 Jahre im Handwerk. Spezialist für Fades, Skin-Tapers und klassische Herrenschnitte.',
    t2_role: 'Senior-Stylist', t2_bio: 'Bartarchitektur-Profi. Bekannt für rasiermesserscharfe Konturen und moderne texturierte Schnitte.',
    t3_role: 'Spezialist für klassische Rasur', t3_bio: 'Meister des Rasiermessers. Bietet jedes Mal ein unvergleichliches Heißtuch-Rasurerlebnis.',
    booking_label: 'Kontakt', booking_title: 'Termin\nbuchen',
    booking_desc: 'Bereit für einen frischen Schnitt? Füllen Sie das Formular aus und wir bestätigen Ihren Termin binnen 24 Stunden.',
    hours: 'Mo–Sa: 9:00 – 20:00 Uhr',
    form_name: 'Vollständiger Name', form_email: 'E-Mail', form_service: 'Leistung', form_select: 'Leistung wählen',
    form_date: 'Wunschdatum', form_msg: 'Nachricht (optional)', form_submit: 'Termin buchen',
    form_success: '✦ Anfrage gesendet! Wir melden uns bald.',
    trust_label: 'Warum wir', trust_title: 'Ihr Vertrauen, unser Versprechen',
    trust1: 'Zertifizierte Barbiere', trust2: 'Hygiene bewertet A+', trust3: '5★ Lokaler Preis 2024', trust4: 'Nur Premium-Produkte',
    rev1: '"Der beste Fade, den ich je hatte. Marco ist ein echter Künstler."',
    rev2: '"Unglaubliche Atmosphäre, tadelloser Service. Die Heißtuch-Rasur ist ein Erlebnis."',
    rev3: '"Ich bringe meine ganze Familie hierher. Konstante Qualität, tolles Team, immer pünktlich."',
    footer_rights: 'Alle Rechte vorbehalten.'
  },
  fr: {
    nav_home: 'Accueil', nav_services: 'Services', nav_gallery: 'Galerie', nav_team: 'Équipe', nav_book: 'Réserver',
    hero_eyebrow: 'Studio de Barbier Premium · Depuis 2018',
    hero_line1: 'Coupe.', hero_line2: 'Style.', hero_line3: 'Confiance.',
    hero_sub: 'Vivez l\'expérience ultime du barbering avec précision et style.\nChaque coupe raconte une histoire — faites la vôtre iconique.',
    hero_cta: 'Prendre Rendez-vous', hero_cta2: 'Nos Services',
    scroll_hint: 'Défiler',
    about_label: 'À propos', about_title: 'Tradition et\nModernité',
    about_badge: 'Années d\'Excellence',
    about_p1: 'Chez BLADEHAUS, chaque client repart transformé. Nous allions la maîtrise du barbier classique à une sensibilité design contemporaine — coupes précises, fondus parfaits et expériences de soin qui inspirent confiance.',
    about_p2: 'Notre salon est fondé sur la confiance, la loyauté et le respect profond du métier. Nous sommes fiers d\'être un pilier de notre communauté.',
    stat1: 'Clients Satisfaits', stat2: 'Barbiers Experts', stat3: 'Taux de Satisfaction',
    services_label: 'Ce que nous faisons', services_title: 'Nos Services',
    svc1_name: 'Coupe Signature', svc1_desc: 'Coupes précises adaptées à la forme de votre visage. Inclut lavage, coupe et finition.',
    svc2_name: 'Sculpture de Barbe', svc2_desc: 'Mise en forme, taille et soin expert de la barbe. Nous définissons votre contour avec précision.',
    svc3_name: 'Rasage Serviette Chaude', svc3_desc: 'Rasage classique au coupe-chou avec traitement à la serviette chaude. Luxe pur, finition ultra-douce.',
    svc4_name: 'Forfait Complet', svc4_desc: 'L\'expérience complète : coupe, barbe, serviette chaude et coiffage — en une seule visite.',
    svc_book: 'Réserver →',
    gallery_label: 'Notre Travail', gallery_title: 'Le Portfolio',
    g1: 'Fondu Classique', g2: 'Sommet Texturé', g3: 'Contour de Barbe', g4: 'Fondu Peau', g5: 'Intérieur Salon', g6: 'Pompadour',
    team_label: 'L\'Équipe', team_title: 'Rencontrez les Maîtres',
    t1_role: 'Barbier en Chef & Fondateur', t1_bio: '15 ans de métier. Spécialiste des dégradés et coupes gentleman classiques.',
    t2_role: 'Styliste Senior', t2_bio: 'Architecte de la barbe. Connu pour ses contours au rasoir et coupes texturées modernes.',
    t3_role: 'Spécialiste Rasage Classique', t3_bio: 'Maître du coupe-chou. Offre une expérience de rasage à la serviette chaude incomparable.',
    booking_label: 'Contact', booking_title: 'Prendre\nRendez-vous',
    booking_desc: 'Prêt pour une nouvelle coupe ? Remplissez le formulaire et nous confirmons votre créneau sous 24h.',
    hours: 'Lun–Sam : 9h00 – 20h00',
    form_name: 'Nom Complet', form_email: 'E-mail', form_service: 'Service', form_select: 'Choisir un service',
    form_date: 'Date Souhaitée', form_msg: 'Message (optionnel)', form_submit: 'Prendre Rendez-vous',
    form_success: '✦ Demande envoyée ! Nous vous contacterons bientôt.',
    trust_label: 'Pourquoi Nous', trust_title: 'Votre Confiance, Notre Engagement',
    trust1: 'Barbiers Certifiés', trust2: 'Hygiène Notée A+', trust3: '5★ Prix Local 2024', trust4: 'Produits Premium Uniquement',
    rev1: '"Le meilleur dégradé que j\'aie jamais eu. Marco est un véritable artiste."',
    rev2: '"Atmosphère incroyable, service impeccable. Le rasage à la serviette chaude est une révélation."',
    rev3: '"J\'amène toute ma famille ici. Qualité constante, super équipe, toujours à l\'heure."',
    footer_rights: 'Tous droits réservés.'
  }
};

let currentLang = 'en';

function applyTranslation(lang) {
  const t = translations[lang];
  if (!t) return;
  currentLang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        // handled via placeholder separately if needed
      } else {
        el.innerHTML = t[key].replace(/\n/g, '<br>');
      }
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyTranslation(btn.getAttribute('data-lang'));
  });
});


/* ==================
   BOOKING FORM
   ================== */
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

// Set min date to today
const dateInput = document.getElementById('fdate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = bookingForm.querySelector('[name="name"]').value.trim();
  const email = bookingForm.querySelector('[name="email"]').value.trim();
  const date = bookingForm.querySelector('[name="date"]').value;

  if (!name || !email || !date) {
    // Shake invalid fields
    bookingForm.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#8B0000';
        field.style.boxShadow = '0 0 0 3px rgba(139,0,0,0.2)';
        setTimeout(() => {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }, 2000);
      }
    });
    return;
  }

  const submitBtn = bookingForm.querySelector('[type="submit"]');
  submitBtn.textContent = '...';
  submitBtn.disabled = true;

  setTimeout(() => {
    bookingForm.reset();
    submitBtn.textContent = translations[currentLang]?.form_submit || 'Book Appointment';
    submitBtn.disabled = false;
    if (formSuccess) {
      formSuccess.textContent = translations[currentLang]?.form_success || '✦ Booking request sent!';
      formSuccess.classList.add('visible');
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    }
  }, 1200);
});


/* ==================
   SMOOTH SCROLL (fallback for older browsers)
   ================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ==================
   ACTIVE NAV LINK ON SCROLL
   ================== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle(
          'active-nav',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ==================
   3D TILT EFFECT
   ================== */
document.querySelectorAll('.service-card, .team-card, .review-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
    card.style.boxShadow = `${-x * 16}px ${-y * 16}px 32px rgba(230,145,56,.15)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});
