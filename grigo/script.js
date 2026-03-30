// --- DATA ---
const rooms = [
  { id: "dubla-standard", name: "Cameră Dublă Standard", size: 28, capacity: 2, beds: "1 Pat Matrimonial", price: 350, images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"], description: "O cameră elegantă cu vedere la pădure, dotată cu toate facilitățile moderne pentru un sejur confortabil.", amenities: ["WiFi Gratuit", "Sistem Climatizare", "TV Smart", "Minibar", "Seif"], rating: 4.8, reviews: 124 },
  { id: "dubla-deluxe-cada", name: "Cameră Dublă Deluxe cu Cadă", size: 45, capacity: 2, beds: "1 Pat Matrimonial King", price: 532, images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"], description: "Luxul suprem într-un spațiu generos cu o cadă free-standing spectaculoasă și balcon privat cu vedere panoramică.", amenities: ["WiFi Gratuit", "Cadă Free-standing", "Balcon Privat", "Sistem Climatizare", "TV Smart", "Minibar Premium", "Seif"], rating: 4.9, reviews: 89, featured: true },
  { id: "dubla-deluxe-twin", name: "Cameră Dublă Deluxe Twin", size: 45, capacity: 2, beds: "2 Paturi Single", price: 532, images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80"], description: "Perfectă pentru două persoane care preferă paturie separate. Spațioasă, elegantă, cu balcon privat.", amenities: ["WiFi Gratuit", "2 Paturi Single", "Balcon Privat", "Sistem Climatizare", "TV Smart", "Minibar"], rating: 4.8, reviews: 67 },
  { id: "suite-superioare", name: "Suită Superioară", size: 65, capacity: 3, beds: "1 Pat King + Canapea", price: 780, images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80"], description: "Suita noastră de top oferă o experiență cu adevărat memorabilă cu living separat, jacuzzi și terasa privată.", amenities: ["WiFi Gratuit", "Living Separat", "Jacuzzi", "Terasă Privată", "Sistem Climatizare", "TV Smart", "Minibar Premium"], rating: 5.0, reviews: 42, featured: true },
];

const facilities = [
  { icon: "⚡", title: "Încărcare EV", description: "Stații de încărcare pentru vehicule electrice" },
  { icon: "💆", title: "Spa & Wellness", description: "Tratamente de relaxare și revitalizare" },
  { icon: "🔑", title: "Acces cu Card", description: "Sistem modern de securitate cu carduri" },
  { icon: "🍷", title: "Vinotecă", description: "Selecție premium de vinuri locale" },
  { icon: "🍺", title: "Beer Garden", description: "Grădină de vară cu bere artizanală" },
  { icon: "🏊", title: "Activități Sport", description: "Piscină, tenis, biciclete, ATV" },
  { icon: "🍽️", title: "Restaurant", description: "Bucătărie tradițională bucovineană" },
  { icon: "🚗", title: "Parcare Gratuită", description: "Parcare supravegheată video" },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1610881648560-3581562ef831?w=800&q=80", alt: "Exterior han" },
  { src: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80", alt: "Camera deluxe" },
  { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", alt: "Interior living" },
  { src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", alt: "Restaurant" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80", alt: "Spa" },
  { src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80", alt: "Piscina" },
];

const testimonials = [
  { name: "Maria Ionescu", location: "București", rating: 5, date: "Octombrie 2024", text: "O experiență de neuitat! Camera cu cadă a fost absolut spectaculoasă, iar personalul extrem de amabil.", avatar: "M" },
  { name: "Alexandru Popa", location: "Cluj-Napoca", rating: 5, date: "Septembrie 2024", text: "Hanul Bucovinei este locul perfect pentru o escapadă romantică. Designul camerei, priveliștea, mâncarea – totul a fost impecabil.", avatar: "A" },
  { name: "Ana Constantin", location: "Brașov", rating: 5, date: "Iunie 2024", text: "Am venit cu familia și a fost o vacanță perfectă. Copiii au adorat activitățile, iar noi ne-am relaxat la spa. Vom reveni!", avatar: "A" },
];

const faqs = [
  { q: "Care este ora de check-in și check-out?", a: "Check-in: 15:00 | Check-out: 12:00. Late check-out disponibil la cerere, în funcție de disponibilitate." },
  { q: "Anularea rezervării este gratuită?", a: "Da! Oferiți anulare gratuită până la 7 zile înainte de check-in." },
  { q: "Sunt acceptate animale de companie?", a: "Acceptăm animale de companie mici (sub 10kg) în camerele Standard, cu un supliment de 50 RON/noapte." },
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    renderRooms();
    renderFacilities();
    renderGallery();
    renderTestimonials();
    renderFaq();
    
    // Intersection Observer for Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 60) {
        nav.classList.add('bg-black/90', 'backdrop-blur-xl', 'border-b', 'border-white/5', 'py-3');
        nav.classList.remove('bg-transparent', 'py-5');
    } else {
        nav.classList.add('bg-transparent', 'py-5');
        nav.classList.remove('bg-black/90', 'backdrop-blur-xl', 'border-b', 'border-white/5', 'py-3');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('translate-x-full', 'hidden');
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        mobileMenu.classList.add('translate-x-full', 'hidden');
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('translate-x-full', 'hidden');
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// --- RENDER FUNCTIONS ---
function renderRooms() {
    const grid = document.getElementById('rooms-grid');
    grid.innerHTML = rooms.map((room, i) => `
        <div class="group relative bg-[#151515] rounded-2xl overflow-hidden border border-white/5 card-hover reveal ${i % 2 !== 0 ? 'delay-1' : ''}">
            ${room.featured ? '<div class="absolute top-4 left-4 z-10 bg-[#DDA651] text-white text-xs font-bold px-3 py-1 rounded-full">✦ Recomandat</div>' : ''}
            <div class="relative h-56 overflow-hidden">
                <img src="${room.images[0]}" alt="${room.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent"></div>
                <div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                    <span class="text-[#DDA651] font-bold text-lg leading-none">${room.price}</span>
                    <span class="text-white/50 text-xs"> RON/noapte</span>
                </div>
            </div>
            <div class="p-5">
                <div class="flex items-start justify-between mb-2">
                    <h3 class="text-white font-semibold text-lg font-playfair leading-tight">${room.name}</h3>
                    <div class="flex items-center gap-1">
                        <span class="text-[#DDA651] text-xs">★</span>
                        <span class="text-white/70 text-xs">${room.rating}</span>
                        <span class="text-white/30 text-xs">(${room.reviews})</span>
                    </div>
                </div>
                <div class="flex gap-4 text-xs text-white/40 mb-3">
                    <span>📐 ${room.size}m²</span><span>👥 ${room.capacity} oaspeți</span><span>🛏 ${room.beds}</span>
                </div>
                <p class="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">${room.description}</p>
                <div class="flex flex-wrap gap-1.5 mb-5">
                    ${room.amenities.slice(0, 4).map(a => `<span class="text-xs bg-white/5 text-white/50 px-2 py-1 rounded-lg border border-white/5">${a}</span>`).join('')}
                    ${room.amenities.length > 4 ? `<span class="text-xs text-white/30 px-2 py-1">+${room.amenities.length - 4}</span>` : ''}
                </div>
                <button onclick="openBookingWizard('${room.id}')" class="w-full btn-gold py-3 rounded-xl text-sm font-semibold">Rezervă această cameră</button>
            </div>
        </div>
    `).join('');
}

function renderFacilities() {
    const grid = document.getElementById('facilities-grid');
    grid.innerHTML = facilities.map((f, i) => `
        <div class="group p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-[#DDA651]/5 hover:border-[#DDA651]/20 transition-all cursor-default reveal" style="animation-delay: ${i*0.08}s">
            <div class="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">${f.icon}</div>
            <h3 class="text-white font-semibold text-sm sm:text-base mb-1 group-hover:text-[#DDA651] transition-colors">${f.title}</h3>
            <p class="text-white/40 text-xs sm:text-sm leading-relaxed">${f.description}</p>
        </div>
    `).join('');
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = galleryImages.map((img, i) => `
        <div class="relative group cursor-pointer rounded-xl overflow-hidden masonry-item" onclick="openLightbox(${i})">
            <img src="${img.src}" alt="${img.alt}" class="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <i data-lucide="zoom-in" class="text-white opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6"></i>
            </div>
        </div>
    `).join('');
    // refresh icons for dynamically added ones
    setTimeout(() => lucide.createIcons(), 100);
}

function renderTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    grid.innerHTML = testimonials.map((t, i) => `
        <div class="bg-[#151515] border border-white/5 rounded-2xl p-6 relative card-hover reveal" style="animation-delay: ${i*0.1}s">
            <div class="flex gap-0.5 mb-3 text-[#DDA651] text-xs">★★★★★</div>
            <p class="text-white/70 text-sm leading-relaxed mb-4">"${t.text}"</p>
            <div class="flex items-center gap-3 pt-3 border-t border-white/5">
                <div class="w-9 h-9 rounded-full bg-[#DDA651]/20 text-[#DDA651] flex items-center justify-center font-bold text-sm">${t.avatar}</div>
                <div>
                    <p class="text-white text-sm font-semibold">${t.name}</p>
                    <p class="text-white/30 text-xs">${t.location} · ${t.date}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFaq() {
    const list = document.getElementById('faq-list');
    list.innerHTML = faqs.map((faq, i) => `
        <div class="border border-white/10 rounded-xl overflow-hidden reveal" style="animation-delay: ${i*0.07}s">
            <button class="w-full flex items-center justify-between px-5 py-4 text-left bg-white/[0.02] hover:bg-white/[0.04] transition-colors" onclick="toggleFaq(${i})">
                <span class="text-white font-medium text-sm pr-4">${faq.q}</span>
                <i data-lucide="chevron-down" id="faq-icon-${i}" class="text-white/40 w-4 h-4 transition-transform duration-200"></i>
            </button>
            <div id="faq-body-${i}" class="hidden">
                <p class="px-5 py-4 text-white/60 text-sm leading-relaxed border-t border-white/5">${faq.a}</p>
            </div>
        </div>
    `).join('');
}
function toggleFaq(index) {
    const body = document.getElementById(`faq-body-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        icon.classList.replace('text-white/40', 'text-[#DDA651]');
    } else {
        body.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
        icon.classList.replace('text-[#DDA651]', 'text-white/40');
    }
}

// --- LIGHTBOX ---
function openLightbox(index) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = galleryImages[index].src;
    lb.classList.remove('hidden');
    lb.classList.add('flex');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.getElementById('lightbox').classList.remove('flex');
}

// --- BOOKING WIZARD ---
let bwState = {
    step: 1,
    checkIn: null,
    checkOut: null,
    guests: { adults: 2, children: 0 },
    selectedRoomId: null,
};

const bwModal = document.getElementById('booking-modal');
function openBookingWizard(roomId = null) {
    bwModal.classList.remove('hidden');
    bwModal.classList.add('flex');
    if (roomId) {
        bwState.selectedRoomId = roomId;
    }
    renderBwStep();
}
function closeBookingWizard() {
    bwModal.classList.add('hidden');
    bwModal.classList.remove('flex');
    bwState = { step: 1, checkIn: null, checkOut: null, guests: { adults: 2, children: 0 }, selectedRoomId: null };
}

function updateGuests(type, diff) {
    const val = bwState.guests[type] + diff;
    if (type === 'adults' && val >= 1 && val <= 4) bwState.guests.adults = val;
    if (type === 'children' && val >= 0 && val <= 3) bwState.guests.children = val;
    document.getElementById('bw-adults').innerText = bwState.guests.adults;
    document.getElementById('bw-children').innerText = bwState.guests.children;
}

// Ensure checkout is after checkin
document.getElementById('bw-checkin').addEventListener('change', (e) => {
    bwState.checkIn = new Date(e.target.value);
    const co = document.getElementById('bw-checkout');
    const minCo = new Date(bwState.checkIn);
    minCo.setDate(minCo.getDate() + 1);
    co.min = minCo.toISOString().split('T')[0];
    if (bwState.checkOut && bwState.checkOut <= bwState.checkIn) {
        bwState.checkOut = minCo;
        co.value = co.min;
    }
    updateBwDates();
});
document.getElementById('bw-checkout').addEventListener('change', (e) => {
    bwState.checkOut = new Date(e.target.value);
    updateBwDates();
});

function updateBwDates() {
    if (bwState.checkIn && bwState.checkOut) {
        const nights = Math.ceil((bwState.checkOut - bwState.checkIn) / (1000 * 60 * 60 * 24));
        document.getElementById('bw-date-summary').classList.remove('hidden');
        document.getElementById('bw-date-summary-text').innerText = `${nights} nopți selectate`;
    }
}

function bwNext() {
    if (bwState.step === 1) {
        if (!bwState.checkIn || !bwState.checkOut) {
            document.getElementById('bw-date-error').classList.remove('hidden');
            return;
        }
        document.getElementById('bw-date-error').classList.add('hidden');
        populateBwRooms();
        bwState.step = 2;
    } else if (bwState.step === 2) {
        if (!bwState.selectedRoomId) {
            document.getElementById('bw-room-error').classList.remove('hidden');
            return;
        }
        document.getElementById('bw-room-error').classList.add('hidden');
        populateBwSummary();
        bwState.step = 3;
    } else if (bwState.step === 3) {
        const form = document.getElementById('bw-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const fn = document.getElementById('bw-fn').value;
        const ln = document.getElementById('bw-ln').value;
        document.getElementById('bw-ref').innerText = ("HB-" + Math.random().toString(36).slice(2,8)).toUpperCase();
        bwState.step = 4;
    }
    renderBwStep();
}

function bwPrev() {
    if (bwState.step > 1) {
        bwState.step--;
        renderBwStep();
    } else {
        closeBookingWizard();
    }
}

function renderBwStep() {
    // Hide all steps
    for (let i = 1; i <= 4; i++) document.getElementById(`bw-step-${i}`).classList.add('hidden');
    // Show current
    document.getElementById(`bw-step-${bwState.step}`).classList.remove('hidden');
    
    // Header
    const title = document.getElementById('bw-title');
    const subtitle = document.getElementById('bw-subtitle');
    const footer = document.getElementById('bw-footer');
    
    if (bwState.step === 4) {
        title.innerText = "Rezervare Confirmată! 🎉";
        subtitle.classList.add('hidden');
        footer.classList.add('hidden');
    } else {
        title.innerText = "Rezervare Cameră";
        subtitle.classList.remove('hidden');
        subtitle.innerText = `Pasul ${bwState.step} din 3`;
        footer.classList.remove('hidden');
    }
    
    // Buttons
    document.getElementById('bw-btn-back-text').innerText = bwState.step === 1 ? "Anulează" : "Înapoi";
    document.getElementById('bw-btn-next-text').innerText = bwState.step === 3 ? "Confirmă Rezervarea" : "Continuă";
    
    // Stepper header builder
    const stp = document.getElementById('bw-stepper');
    if (bwState.step < 4) {
        const labels = ['Date', 'Cameră', 'Detalii'];
        stp.innerHTML = labels.map((l, i) => `
            <div class="flex items-center gap-2 flex-1">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${bwState.step > i+1 ? 'bg-[#DDA651] text-white' : bwState.step === i+1 ? 'bg-[#DDA651] text-white' : 'bg-white/10 text-white/40'}">
                    ${bwState.step > i+1 ? '✓' : i+1}
                </div>
                <span class="text-xs hidden sm:block ${bwState.step >= i+1 ? 'text-[#DDA651]' : 'text-white/30'}">${l}</span>
                ${i < 2 ? `<div class="h-px flex-1 transition-all ${bwState.step > i+1 ? 'bg-[#DDA651]' : 'bg-white/10'}"></div>` : ''}
            </div>
        `).join('');
    }
}

function populateBwRooms() {
    const list = document.getElementById('bw-rooms-list');
    const totalGuests = bwState.guests.adults; // Simple capacity check
    const nights = Math.ceil((bwState.checkOut - bwState.checkIn) / 86400000);
    
    document.getElementById('bw-rooms-subtitle').innerText = `${nights} nopți · ${bwState.guests.adults} adulți ${bwState.guests.children > 0 ? '+ ' + bwState.guests.children + ' copii' : ''}`;
    
    list.innerHTML = rooms.map(room => {
        const isCompatible = room.capacity >= totalGuests;
        const isSelected = bwState.selectedRoomId === room.id;
        const total = room.price * nights;
        
        return `
            <div onclick="if(${isCompatible}) bwSelectRoom('${room.id}')" class="border rounded-xl overflow-hidden transition-all ${isCompatible ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} ${isSelected ? 'border-[#DDA651] bg-[#DDA651]/5' : 'border-white/10'}">
                <div class="flex">
                    <div class="relative w-28 h-24 shrink-0 bg-gray-800">
                        <img src="${room.images[0]}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 p-3 flex justify-between items-start">
                        <div>
                            <p class="text-white text-sm font-semibold">${room.name}</p>
                            <p class="text-white/40 text-xs mt-1">👥 Max: ${room.capacity} oaspeți · 🛏 ${room.beds}</p>
                        </div>
                        <div class="text-right ml-3">
                            <p class="text-[#DDA651] font-bold text-lg leading-none">${room.price}</p>
                            <p class="text-white/40 text-[10px] uppercase">RON / nopate</p>
                            <p class="text-white/70 text-xs mt-1 font-semibold">${total} total</p>
                            ${isSelected ? `<div class="mt-1 flex justify-end"><div class="w-4 h-4 rounded-full bg-[#DDA651] text-white flex items-center justify-center text-[10px]">✓</div></div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function bwSelectRoom(id) {
    bwState.selectedRoomId = id;
    populateBwRooms();
}

function populateBwSummary() {
    const room = rooms.find(r => r.id === bwState.selectedRoomId);
    const nights = Math.ceil((bwState.checkOut - bwState.checkIn) / 86400000);
    const total = room.price * nights;
    
    document.getElementById('bw-sum-room').innerText = room.name;
    document.getElementById('bw-sum-total').innerText = `${total} RON`;
    
    const formatDate = d => d ? d.toLocaleDateString('ro-RO', {day: 'numeric', month: 'short'}) : '';
    document.getElementById('bw-sum-nights').innerText = `${nights} nopți × ${room.price} RON`;
    document.getElementById('bw-sum-dates').innerText = `${formatDate(bwState.checkIn)} → ${formatDate(bwState.checkOut)}`;
}

// --- AI CHATBOT LOGIC ---
const cbWindow = document.getElementById('chatbot-window');
const cbMsgs = document.getElementById('chatbot-msgs');
const cbInput = document.getElementById('chatbot-input');
let isChatOpen = false;

function toggleChatbot() {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        cbWindow.classList.remove('hidden');
        cbInput.focus();
    } else {
        cbWindow.classList.add('hidden');
    }
}

const botResponses = [
    { keywords: ['pret', 'preț', 'cost', 'cat costa', 'bani'], answer: "Prețurile noastre pornesc de la 350 RON/noapte pentru Camerele Duble Standard și ajung până la 780 RON/noapte pentru Suita Superioară. Ce tip de cameră vă interesează?" },
    { keywords: ['mancare', 'bucatarie', 'restaurant', 'mic dejun', 'cina', 'pranz'], answer: "Avem un restaurant propriu care servește preparate tradiționale din Bucovina. Micul dejun este inclus pentru Suita Superioară, iar pentru restul camerelor poate fi adăugat la recepție." },
    { keywords: ['rezervare', 'rezerv', 'camera', 'disponibil'], answer: "Puteți rezerva direct apăsând butonul 'Rezervă Acum' din meniul principal sau folosind formularul nostru rapid. Avem anulare gratuită cu 7 zile înainte!" },
    { keywords: ['piscina', 'spa', 'masaj', 'relaxare'], answer: "Dispunem de un centru Spa & Wellness modern cu piscină încălzită, jacuzzi și servicii de masaj de relaxare." },
    { keywords: ['caine', 'pisica', 'animale', 'pet'], answer: "Acceptăm animale de companie mici (sub 10kg) în camerele Standard, cu un supliment de 50 RON/noapte." },
    { keywords: ['locatie', 'unde', 'adresa', 'harta'], answer: "Ne aflăm în inima Bucovinei, în Câmpulung Moldovenesc. Găsiți o hartă interactivă în secțiunea de Contact de la baza paginii." },
    { keywords: ['buna', 'salut', 'hei', 'ajutor'], answer: "Salut! Bine ați venit la Hanul Bucovinei. Cu ce informații vă pot fi de folos?" }
];

function handleChatSubmit(e) {
    e.preventDefault();
    const text = cbInput.value.trim();
    if (!text) return;
    
    // Add User Message
    addMessage(text, 'user');
    cbInput.value = '';
    
    // Typing indicator
    const typingId = 'typing-' + Date.now();
    addTypingIndicator(typingId);
    
    // Simulated AI Processing
    setTimeout(() => {
        document.getElementById(typingId)?.remove();
        const lowerText = text.toLowerCase();
        let reply = "Ne cerem scuze, dar nu am înțeles exact. Ne puteți contacta telefonic la +40 740 000 000 pentru mai multe detalii.";
        
        for (const res of botResponses) {
            if (res.keywords.some(k => lowerText.includes(k))) {
                reply = res.answer;
                break;
            }
        }
        addMessage(reply, 'bot');
    }, 1000 + Math.random() * 1000);
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `chat-bubble ${sender} p-3 rounded-t-xl text-white/90 ${sender === 'user' ? 'rounded-bl-xl' : 'rounded-br-xl'}`;
    div.innerText = text;
    cbMsgs.appendChild(div);
    cbMsgs.scrollTop = cbMsgs.scrollHeight;
}

function addTypingIndicator(id) {
    const div = document.createElement('div');
    div.id = id;
    div.className = `chat-bubble bot p-3 rounded-t-xl rounded-br-xl typing-indicator`;
    div.innerHTML = `<span></span><span></span><span></span>`;
    cbMsgs.appendChild(div);
    cbMsgs.scrollTop = cbMsgs.scrollHeight;
}
