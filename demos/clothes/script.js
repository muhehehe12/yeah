/* =============================================
   ENITA — script.js
   Full interactivity: cart, filters, modals,
   parallax, product data, animations
   ============================================= */

// ── Product Data ──────────────────────────────
const PRODUCTS = [
  {
    id: 1, name: 'Void Cargo Jacket', brand: 'ENITA', price: 289, oldPrice: null,
    cat: 'outerwear', badge: 'new', isNew: true,
    sizes: ['XS','S','M','L','XL'],
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80&auto=format&fit=crop',
    desc: 'Oversized cargo silhouette in heavyweight ripstop. Four zip pockets, dropped shoulders, raw hem. Made to move in the dark.',
    slug: 'void-cargo-jacket'
  },
  {
    id: 2, name: 'Ashen Fleece Pullover', brand: 'ENITA', price: 148, oldPrice: 210,
    cat: 'tops', badge: 'sale', isNew: false,
    sizes: ['S','M','L','XL','XXL'],
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80&auto=format&fit=crop',
    desc: 'Double-layered heavyweight fleece in washed ash grey. Boxy fit, dropped seams, raw edges. A piece that gets better with wear.',
    slug: 'ashen-fleece-pullover'
  },
  {
    id: 3, name: 'Nocturne Track Pants', brand: 'ENITA', price: 168, oldPrice: null,
    cat: 'bottoms', badge: 'new', isNew: true,
    sizes: ['XS','S','M','L'],
    img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&auto=format&fit=crop',
    desc: 'Relaxed track pants in washed nylon. Tapered ankle, adjustable drawstring, deep side pockets. Urban transit essentials.',
    slug: 'nocturne-track-pants'
  },
  {
    id: 4, name: 'Ghost Linen Shirt', brand: 'ENITA', price: 119, oldPrice: null,
    cat: 'tops', badge: null, isNew: false,
    sizes: ['S','M','L','XL'],
    img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80&auto=format&fit=crop',
    desc: 'Washed linen in off-white. Extended back hem, collarless, single-button at neck. Summer in the city. Slightly worn-in.',
    slug: 'ghost-linen-shirt'
  },
  {
    id: 5, name: 'Industrial Belt', brand: 'ENITA', price: 62, oldPrice: null,
    cat: 'accessories', badge: null, isNew: false,
    sizes: ['ONE'],
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&auto=format&fit=crop',
    desc: 'Hardware-clip canvas belt. Adjustable 115cm length, matte black buckle. Designed to outlast trends.',
    slug: 'industrial-belt'
  },
  {
    id: 6, name: 'Raw Edge Denim', brand: 'ENITA', price: 198, oldPrice: 240,
    cat: 'bottoms', badge: 'sale', isNew: false,
    sizes: ['28','30','32','34','36'],
    img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&q=80&auto=format&fit=crop',
    desc: 'Straight-fit selvedge denim, left raw at hem. Acid washed in small batches — no two pairs are identical. Heavy 12oz.',
    slug: 'raw-edge-denim'
  },
  {
    id: 7, name: 'Obsidian Overshirt', brand: 'ENITA', price: 159, oldPrice: null,
    cat: 'outerwear', badge: 'new', isNew: true,
    sizes: ['XS','S','M','L','XL'],
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&auto=format&fit=crop',
    desc: 'Military shirt with Enita hardware. Chest and arm pockets, structured collar, relaxed through the body.',
    slug: 'obsidian-overshirt'
  },
  {
    id: 8, name: 'Urban Knit Beanie', brand: 'ENITA', price: 48, oldPrice: null,
    cat: 'accessories', badge: null, isNew: false,
    sizes: ['ONE'],
    img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1511511450668-52a434f84c0a?w=600&q=80&auto=format&fit=crop',
    desc: 'Extra-chunky ribbed beanie in 100% merino. Slightly elongated, sits off-centre. The non-negotiable.',
    slug: 'urban-knit-beanie'
  },
  {
    id: 9, name: 'Signal Bomber', brand: 'ENITA', price: 319, oldPrice: null,
    cat: 'outerwear', badge: 'new', isNew: true,
    sizes: ['S','M','L','XL'],
    img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&auto=format&fit=crop',
    desc: 'Satin shell bomber with contrast lining. MA-1 heritage, reinterpreted for the city. Worn by the awake.',
    slug: 'signal-bomber'
  },
  {
    id: 10, name: 'Washed Longsleeve', brand: 'ENITA', price: 88, oldPrice: null,
    cat: 'tops', badge: null, isNew: false,
    sizes: ['XS','S','M','L','XL','XXL'],
    img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format&fit=crop',
    desc: 'Over-dyed enzyme-washed cotton. Oversized boxy fit, pre-faded to a near-vintage state. Lived-in from day one.',
    slug: 'washed-longsleeve'
  },
  {
    id: 11, name: 'Slate Cargo Shorts', brand: 'ENITA', price: 129, oldPrice: null,
    cat: 'bottoms', badge: null, isNew: false,
    sizes: ['S','M','L','XL'],
    img: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80&auto=format&fit=crop',
    desc: 'Six-pocket cargo shorts in stone washed canvas. Relaxed cut, mid-thigh length. No logos. Just form.',
    slug: 'slate-cargo-shorts'
  },
  {
    id: 12, name: 'Noir Tote', brand: 'ENITA', price: 79, oldPrice: null,
    cat: 'accessories', badge: null, isNew: true,
    sizes: ['ONE'],
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format&fit=crop',
    desc: 'Heavy-duty canvas tote. Drop handles, internal zip pocket. 100% unbranded — minimal, intentional, yours.',
    slug: 'noir-tote'
  },
];

// ── State ─────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('enita-cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('enita-wishlist') || '[]');
let activeCategory = 'all';
let sortOrder = 'featured';
let visibleCount = 8;

// ── Helpers ───────────────────────────────────
const $ = id => document.getElementById(id);
function fmtPrice(n) { return '€' + n; }
function saveCart() { localStorage.setItem('enita-cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('enita-wishlist', JSON.stringify(wishlist)); }

function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Promo bar ─────────────────────────────────
const promoBar = $('promo-bar');
const promoClose = $('promo-close');
if (promoClose) {
  if (sessionStorage.getItem('enita-promo')) promoBar.classList.add('hidden');
  promoClose.addEventListener('click', () => {
    promoBar.classList.add('hidden');
    sessionStorage.setItem('enita-promo', '1');
  });
}

// ── Navbar ────────────────────────────────────
const navbar = $('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

const navToggle = $('nav-toggle');
const navLinks  = $('nav-links');
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

// ── Hero Parallax ─────────────────────────────
const heroImg = $('hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrollY * 0.28}px) scale(1.05)`;
    }
  }, { passive: true });
}

// ── Scroll Reveal ─────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Smooth scroll ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const off = navbar.offsetHeight + 12;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
  });
});

// ── Search Overlay ────────────────────────────
const searchOverlay = $('search-overlay');
const searchBtn     = $('search-btn');
const searchClose   = $('search-close');
const searchInput   = $('search-input');

searchBtn.addEventListener('click', () => {
  searchOverlay.classList.add('open');
  setTimeout(() => searchInput.focus(), 100);
});
searchClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
searchOverlay.addEventListener('click', e => {
  if (e.target === searchOverlay) searchOverlay.classList.remove('open');
});
document.querySelectorAll('.search-hints span').forEach(hint => {
  hint.addEventListener('click', () => {
    searchInput.value = hint.textContent;
    searchInput.focus();
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchOverlay.classList.remove('open');
    closeModal();
    closeQV();
  }
});

// ── Collection Cards → filter shop ────────────
document.querySelectorAll('.col-card[data-category]').forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    const cat = card.dataset.category;
    activeCategory = cat;
    visibleCount = 8;
    renderProducts();
    // activate filter btn
    document.querySelectorAll('.filter-btn[data-filter-type="cat"]').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === cat);
    });
    // scroll to shop
    const shopEl = $('shop');
    window.scrollTo({ top: shopEl.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 12, behavior: 'smooth' });
  });
});

// ── Filters ───────────────────────────────────
document.querySelectorAll('.filter-btn[data-filter-type="cat"]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-filter-type="cat"]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.filter;
    visibleCount = 8;
    renderProducts();
  });
});
const sortSelect = $('sort-select');
sortSelect.addEventListener('change', () => {
  sortOrder = sortSelect.value;
  visibleCount = 8;
  renderProducts();
});

// ── Product Render ────────────────────────────
function getFilteredProducts() {
  let list = PRODUCTS.filter(p => activeCategory === 'all' || p.cat === activeCategory);
  if (sortOrder === 'price-asc') list.sort((a,b) => a.price - b.price);
  else if (sortOrder === 'price-desc') list.sort((a,b) => b.price - a.price);
  else if (sortOrder === 'new') list.sort((a,b) => b.id - a.id);
  return list;
}

function renderProducts() {
  const grid = $('product-grid');
  const all = getFilteredProducts();
  const toShow = all.slice(0, visibleCount);
  const countEl = $('product-count');
  if (countEl) countEl.textContent = `${all.length} items`;

  const loadBtn = $('load-more-btn');
  if (loadBtn) loadBtn.style.display = visibleCount >= all.length ? 'none' : 'inline-block';

  grid.innerHTML = toShow.map(p => `
    <div class="product-card" data-id="${p.id}" data-slug="${p.slug}">
      <div class="product-img-wrap" onclick="goToProduct('${p.slug}')">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge.toUpperCase()}</span>` : ''}
        <div class="product-actions">
          <button class="product-quick-view" data-id="${p.id}">Quick View</button>
          <button class="product-wish ${wishlist.includes(p.id) ? 'wished' : ''}" data-id="${p.id}" aria-label="Wishlist">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${wishlist.includes(p.id) ? '#8B0000' : 'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
      </div>
      <div class="product-info" onclick="goToProduct('${p.slug}')">
        <span class="product-brand">${p.brand}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          ${fmtPrice(p.price)}
          ${p.oldPrice ? `<span class="old">${fmtPrice(p.oldPrice)}</span>` : ''}
        </div>
        <div class="product-sizes-mini">
          ${p.sizes.slice(0,4).map(s => `<span class="psz">${s}</span>`).join('')}
          ${p.sizes.length > 4 ? `<span class="psz">+${p.sizes.length-4}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Re-bind Quick View
  grid.querySelectorAll('.product-quick-view').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openQV(parseInt(btn.dataset.id)); });
  });
  // Re-bind Wishlist
  grid.querySelectorAll('.product-wish').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); toggleWishlist(parseInt(btn.dataset.id), btn); });
  });

  // Animate cards in
  grid.querySelectorAll('.product-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity .5s ease, transform .5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 50);
  });
}

function goToProduct(slug) {
  window.location.href = `product.html?slug=${slug}`;
}

// Load more
const loadMoreBtn = $('load-more-btn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    visibleCount += 4;
    renderProducts();
  });
}

// ── Wishlist ──────────────────────────────────
function toggleWishlist(id, btn) {
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    btn.classList.add('wished');
    btn.querySelector('svg').setAttribute('fill', '#8B0000');
    showToast('Added to wishlist ♥');
  } else {
    wishlist.splice(idx, 1);
    btn.classList.remove('wished');
    btn.querySelector('svg').setAttribute('fill', 'none');
    showToast('Removed from wishlist');
  }
  saveWishlist();
}

// ── Cart ──────────────────────────────────────
function openCart() {
  $('cart-panel').classList.add('open');
  $('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  $('cart-panel').classList.remove('open');
  $('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
$('cart-btn').addEventListener('click', openCart);
$('cart-close').addEventListener('click', closeCart);
$('cart-overlay').addEventListener('click', closeCart);

const cartShopLink = $('cart-shop-link');
if (cartShopLink) {
  cartShopLink.addEventListener('click', e => {
    e.preventDefault();
    closeCart();
    const shopEl = $('shop');
    if (shopEl) window.scrollTo({ top: shopEl.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 12, behavior: 'smooth' });
  });
}

function addToCart(productId, size) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const key = `${productId}-${size}`;
  const existing = cart.find(c => c.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ key, id: productId, name: p.name, img: p.img, price: p.price, size, qty: 1 });
  }
  saveCart();
  renderCart();
  bumpCount();
  openCart();
  showToast(`${p.name} added to cart`);
}

function removeFromCart(key) {
  cart = cart.filter(c => c.key !== key);
  saveCart();
  renderCart();
}

function changeQty(key, delta) {
  const item = cart.find(c => c.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(key); return; }
  saveCart();
  renderCart();
}

function renderCart() {
  const itemsEl  = $('cart-items');
  const emptyEl  = $('cart-empty');
  const footerEl = $('cart-footer');
  const countEl  = $('cart-count');
  const labelEl  = $('cart-item-label');
  const subtotal = $('cart-subtotal');

  const total = cart.reduce((acc, c) => acc + c.price * c.qty, 0);
  const itemCount = cart.reduce((acc, c) => acc + c.qty, 0);

  countEl.textContent = itemCount;
  if (labelEl) labelEl.textContent = `(${itemCount} item${itemCount !== 1 ? 's' : ''})`;

  if (cart.length === 0) {
    emptyEl.style.display = 'flex';
    itemsEl.innerHTML = '';
    if (footerEl) footerEl.style.display = 'none';
  } else {
    emptyEl.style.display = 'none';
    if (footerEl) footerEl.style.display = 'flex';
    if (subtotal) subtotal.textContent = fmtPrice(total);
    itemsEl.innerHTML = cart.map(item => `
      <li class="cart-item" data-key="${item.key}">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">Size: ${item.size}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-key="${item.key}" data-delta="-1">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-key="${item.key}" data-delta="1">+</button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
          <span class="cart-item-price">${fmtPrice(item.price * item.qty)}</span>
          <button class="cart-item-remove" data-key="${item.key}">&times;</button>
        </div>
      </li>
    `).join('');

    itemsEl.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => changeQty(btn.dataset.key, parseInt(btn.dataset.delta)));
    });
    itemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.key));
    });
  }
}

function bumpCount() {
  const c = $('cart-count');
  c.classList.add('bump');
  setTimeout(() => c.classList.remove('bump'), 200);
}

// ── Quick View Modal ──────────────────────────
const qvOverlay = $('qv-overlay');
const qvModal   = $('qv-modal');
const qvClose   = $('qv-close');
let selectedSize = null;

function openQV(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  selectedSize = p.sizes[0];

  $('qv-inner').innerHTML = `
    <div class="qv-gallery">
      <img src="${p.img}" alt="${p.name}" id="qv-main-img" />
    </div>
    <div class="qv-details">
      <span class="qv-brand">${p.brand}</span>
      <div class="qv-name">${p.name}</div>
      <div class="qv-price">
        ${fmtPrice(p.price)}
        ${p.oldPrice ? `<span class="old" style="font-size:12px;text-decoration:line-through;color:var(--white-mid);margin-left:8px;">${fmtPrice(p.oldPrice)}</span>` : ''}
      </div>
      <div class="qv-desc">${p.desc}</div>
      <div>
        <div class="qv-size-label">Select Size</div>
        <div class="size-grid" id="qv-size-grid">
          ${p.sizes.map(s => `<button class="size-btn ${s === selectedSize ? 'selected' : ''}" data-size="${s}">${s}</button>`).join('')}
        </div>
      </div>
      <div class="qv-actions">
        <button class="btn btn-full" id="qv-add-btn">Add to Cart</button>
        <span class="qv-full-link" data-slug="${p.slug}">View Full Details &rarr;</span>
      </div>
    </div>
  `;

  // Size selection
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSize = btn.dataset.size;
    });
  });

  // Add to cart from QV
  const addBtn = $('qv-add-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart(p.id, selectedSize);
      closeQV();
    });
  }

  // Full product link
  const fullLink = document.querySelector('.qv-full-link');
  if (fullLink) {
    fullLink.addEventListener('click', () => {
      closeQV();
      setTimeout(() => goToProduct(fullLink.dataset.slug), 200);
    });
  }

  qvOverlay.classList.add('open');
  qvModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQV() {
  qvOverlay.classList.remove('open');
  qvModal.classList.remove('open');
  document.body.style.overflow = '';
}

qvClose.addEventListener('click', closeQV);
qvOverlay.addEventListener('click', closeQV);

// ── Auth Modal ────────────────────────────────
const modalOverlay = $('modal-overlay');
const authModal    = $('auth-modal');
const modalClose   = $('modal-close');
const accountBtn   = $('account-btn');

function openModal() {
  modalOverlay.classList.add('open');
  authModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalOverlay.classList.remove('open');
  authModal.classList.remove('open');
  document.body.style.overflow = '';
}
accountBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

// Modal tabs
document.querySelectorAll('.mtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    $('login-pane').classList.toggle('hidden', tab.dataset.tab !== 'login');
    $('signup-pane').classList.toggle('hidden', tab.dataset.tab !== 'signup');
  });
});

// Fake form submissions
const loginForm = $('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = loginForm.querySelector('button');
    btn.textContent = 'Signing in…'; btn.disabled = true;
    setTimeout(() => { closeModal(); showToast('Welcome back.'); btn.textContent = 'Sign In →'; btn.disabled = false; loginForm.reset(); }, 900);
  });
}
const signupForm = $('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = signupForm.querySelector('button');
    btn.textContent = 'Creating…'; btn.disabled = true;
    setTimeout(() => { closeModal(); showToast('Account created. Welcome to Enita.'); btn.textContent = 'Create Account →'; btn.disabled = false; signupForm.reset(); }, 900);
  });
}

// Newsletter
const newsletterForm = $('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    btn.textContent = 'Done ✓'; btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.disabled = false; newsletterForm.reset(); showToast('You\'re in the circle.'); }, 900);
  });
}

// ── Init ──────────────────────────────────────
renderProducts();
renderCart();
