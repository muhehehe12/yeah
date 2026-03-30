document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 800);

    // Initialize Components
    renderGallery();
    renderReviews();
    
    // Intersection Observer for Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 80) {
        nav.classList.add('scrolled');
        nav.classList.remove('py-6');
    } else {
        nav.classList.remove('scrolled');
        nav.classList.add('py-6');
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
        mobileMenu.classList.remove('translate-x-full');
        menuIcon.setAttribute('data-lucide', 'x');
        menuIcon.classList.replace('text-white', 'text-gray-900');
    } else {
        mobileMenu.classList.add('translate-x-full');
        menuIcon.setAttribute('data-lucide', 'menu');
        if (window.scrollY <= 80) menuIcon.classList.replace('text-gray-900', 'text-white');
    }
    lucide.createIcons();
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('translate-x-full');
        menuIcon.setAttribute('data-lucide', 'menu');
        if (window.scrollY <= 80) menuIcon.classList.replace('text-gray-900', 'text-white');
        lucide.createIcons();
    });
});

// --- DATA: GALLERY ---
const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800', border: true },
    { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
    { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800' },
    { src: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=800' },
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' }
];

function renderGallery() {
    const grid = document.getElementById('photo-grid');
    grid.innerHTML = galleryImages.map((img, i) => `
        <div class="relative group cursor-pointer overflow-hidden rounded-2xl break-inside-avoid mb-6 transform transition-all duration-500 hover:z-10 bg-gray-100" onclick="openLightbox(${i})">
            <img src="${img.src}" class="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <i data-lucide="zoom-in" class="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 drop-shadow-lg scale-50 group-hover:scale-100 duration-300"></i>
            </div>
        </div>
    `).join('');
    setTimeout(() => lucide.createIcons(), 100);
}

// Lightbox
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

// --- DATA: REVIEWS ---
const reviews = [
    { name: 'Diana M.', text: 'Locație superbă, perfect întreținută. Ne-am simțit extraordinar de bine!', date: 'Acum o lună' },
    { name: 'Alexandru T.', text: 'Gazdă foarte amabilă. Foișorul încălzit ne-a salvat seara, a fost genial.', date: 'Mai 2025' },
    { name: 'Cristina B.', text: 'Ideal pentru evenimente. Am organizat botezul fetiței și piscina + curtea au fost highlight-ul zilei.', date: 'August 2024' },
    { name: 'Mihai D.', text: 'Exact ca în poze. Te deconectezi complet de București deși ești la 20 min distanță.', date: 'Decembrie 2024' }
];

function renderReviews() {
    const slider = document.getElementById('reviews-slider');
    slider.innerHTML = reviews.map(r => `
        <div class="slide bg-white p-8 rounded-2xl shadow-xl flex flex-col justify-between shrink-0 h-full border border-gray-100">
            <div>
                <div class="flex text-gold text-lg mb-4">★★★★★</div>
                <p class="text-gray-700 italic text-base leading-relaxed mb-6 font-medium">"${r.text}"</p>
            </div>
            <div class="flex items-center gap-4 border-t border-gray-100 pt-4">
                <div class="w-10 h-10 rounded-full bg-nature text-white flex items-center justify-center font-bold font-playfair shadow-md">
                    ${r.name.charAt(0)}
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 text-sm">${r.name}</h4>
                    <span class="text-xs text-gray-400 font-medium">${r.date}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// --- CHATBOT ---
const cbWindow = document.getElementById('chatbot-window');
const cbMsgs = document.getElementById('chatbot-msgs');
const cbInput = document.getElementById('chatbot-input');
let isChatOpen = false;

function toggleChatbot() {
    isChatOpen = !isChatOpen;
    const btnBadge = document.querySelector('#chatbot-btn span');
    
    if (isChatOpen) {
        cbWindow.classList.remove('hidden');
        cbInput.focus();
        if(btnBadge) btnBadge.style.display = 'none'; // hide badge
    } else {
        cbWindow.classList.add('hidden');
    }
}

const botResponses = [
    { keywords: ['pret', 'seara', 'cost', 'tarif', 'cat costa', 'noapte'], answer: "Tariful variază în funcție de numărul de persoane, tipul de eveniment și zi (weekend/cursul săptămânii). Trimite-ne un mesaj pe WhatsApp cu detalii și îți facem o ofertă pe loc!" },
    { keywords: ['capacitate', 'persoane', 'oaspeti', 'locuri', 'câți', 'cati'], answer: "Putem găzdui confortabil pană la 25-30 de persoane pentru evenimente de o zi în curte și foișor, iar pentru dormit avem capacitate de aproximativ 10-12 locuri." },
    { keywords: ['rezervare', 'disponibil', 'liber', 'data'], answer: "Poți verifica disponibilitatea exactă trimițându-ne un mesaj rapid pe WhatsApp. Răspundem de obicei în 10 minute!" },
    { keywords: ['muzica', 'boxa', 'sistem'], answer: "Avem un sistem audio profesional integrat, inclusiv boxă Bluetooth pentru zona de exterior/piscină. Nu este nevoie să aduceți aparatură suplimentară." },
    { keywords: ['mancare', 'catering', 'gratar', 'bbq'], answer: "Avem o zonă de BBQ mare și o bucătărie complet utilată pe care o puteți folosi gratuit. La cerere, putem recomanda parteneri de catering locali extraodrinari." },
    { keywords: ['buna', 'salut', 'hei', 'ajutor'], answer: "Salut! Cu ce te pot ajuta legat de Casa de la Dârza?" }
];

function handleChatSubmit(e) {
    e.preventDefault();
    const text = cbInput.value.trim();
    if (!text) return;
    
    // User Msg
    addMessage(text, 'user');
    cbInput.value = '';
    
    const typingId = 'typing-' + Date.now();
    addTypingIndicator(typingId);
    
    // Bot Sim
    setTimeout(() => {
        document.getElementById(typingId)?.remove();
        const lower = text.toLowerCase();
        let reply = "Preferi să discutăm direct? Dă-ne un mesaj sau un telefon la 0785501643 pentru a răspunde la toate întrebările.";
        
        for (const res of botResponses) {
            if (res.keywords.some(k => lower.includes(k))) {
                reply = res.answer;
                break;
            }
        }
        addMessage(reply, 'bot');
    }, 1200 + Math.random() * 800);
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    if (sender === 'user') {
        div.className = `chat-bubble ${sender} p-3 shadow-md border border-green-800 text-sm`;
        div.innerText = text;
    } else {
        div.className = `chat-bubble ${sender} p-3 shadow-sm border border-gray-100 text-sm`;
        div.innerHTML = text; // to allow <br>
    }
    cbMsgs.appendChild(div);
    cbMsgs.scrollTop = cbMsgs.scrollHeight;
}

function addTypingIndicator(id) {
    const div = document.createElement('div');
    div.id = id;
    div.className = `chat-bubble bot p-3 shadow-sm border border-gray-100 typing-indicator`;
    div.innerHTML = `<span></span><span></span><span></span>`;
    cbMsgs.appendChild(div);
    cbMsgs.scrollTop = cbMsgs.scrollHeight;
}
