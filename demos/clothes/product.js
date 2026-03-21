/* =============================================
   ENITA — product.js
   Product page logic: renders product from slug,
   handles cart, wishlist, modals, accordion.
   ============================================= */

const PRODUCTS = [
  { id:1, name:'Void Cargo Jacket', brand:'ENITA', price:289, oldPrice:null, cat:'outerwear', badge:'new', sizes:['XS','S','M','L','XL'], img:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80&auto=format&fit=crop', desc:'Oversized cargo silhouette in heavyweight ripstop. Four zip pockets, dropped shoulders, raw hem. Made to move in the dark.', slug:'void-cargo-jacket' },
  { id:2, name:'Ashen Fleece Pullover', brand:'ENITA', price:148, oldPrice:210, cat:'tops', badge:'sale', sizes:['S','M','L','XL','XXL'], img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop', desc:'Double-layered heavyweight fleece in washed ash grey. Boxy fit, dropped seams, raw edges. A piece that gets better with wear.', slug:'ashen-fleece-pullover' },
  { id:3, name:'Nocturne Track Pants', brand:'ENITA', price:168, oldPrice:null, cat:'bottoms', badge:'new', sizes:['XS','S','M','L'], img:'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop', desc:'Relaxed track pants in washed nylon. Tapered ankle, adjustable drawstring, deep side pockets. Urban transit essentials.', slug:'nocturne-track-pants' },
  { id:4, name:'Ghost Linen Shirt', brand:'ENITA', price:119, oldPrice:null, cat:'tops', badge:null, sizes:['S','M','L','XL'], img:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80&auto=format&fit=crop', desc:'Washed linen in off-white. Extended back hem, collarless, single-button at neck. Summer in the city. Slightly worn-in.', slug:'ghost-linen-shirt' },
  { id:5, name:'Industrial Belt', brand:'ENITA', price:62, oldPrice:null, cat:'accessories', badge:null, sizes:['ONE'], img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop', desc:'Hardware-clip canvas belt. Adjustable 115cm length, matte black buckle. Designed to outlast trends.', slug:'industrial-belt' },
  { id:6, name:'Raw Edge Denim', brand:'ENITA', price:198, oldPrice:240, cat:'bottoms', badge:'sale', sizes:['28','30','32','34','36'], img:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80&auto=format&fit=crop', desc:'Straight-fit selvedge denim, left raw at hem. Acid washed in small batches — no two pairs are identical. Heavy 12oz.', slug:'raw-edge-denim' },
  { id:7, name:'Obsidian Overshirt', brand:'ENITA', price:159, oldPrice:null, cat:'outerwear', badge:'new', sizes:['XS','S','M','L','XL'], img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop', desc:'Military shirt with Enita hardware. Chest and arm pockets, structured collar, relaxed through the body.', slug:'obsidian-overshirt' },
  { id:8, name:'Urban Knit Beanie', brand:'ENITA', price:48, oldPrice:null, cat:'accessories', badge:null, sizes:['ONE'], img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1511511450668-52a434f84c0a?w=800&q=80&auto=format&fit=crop', desc:'Extra-chunky ribbed beanie in 100% merino. Slightly elongated, sits off-centre. The non-negotiable.', slug:'urban-knit-beanie' },
  { id:9, name:'Signal Bomber', brand:'ENITA', price:319, oldPrice:null, cat:'outerwear', badge:'new', sizes:['S','M','L','XL'], img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80&auto=format&fit=crop', desc:'Satin shell bomber with contrast lining. MA-1 heritage, reinterpreted for the city. Worn by the awake.', slug:'signal-bomber' },
  { id:10, name:'Washed Longsleeve ', brand:'ENITA', price:88, oldPrice:null, cat:'tops', badge:null, sizes:['XS','S','M','L','XL','XXL'], img:'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80&auto=format&fit=crop', desc:'Over-dyed enzyme-washed cotton. Oversized boxy fit, pre-faded to a near-vintage state. Lived-in from day one.', slug:'washed-longsleeve' },
  { id:11, name:'Slate Cargo Shorts', brand:'ENITA', price:129, oldPrice:null, cat:'bottoms', badge:null, sizes:['S','M','L','XL'], img:'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80&auto=format&fit=crop', desc:'Six-pocket cargo shorts in stone washed canvas. Relaxed cut, mid-thigh length. No logos. Just form.', slug:'slate-cargo-shorts' },
  { id:12, name:'Noir Tote', brand:'ENITA', price:79, oldPrice:null, cat:'accessories', badge:null, sizes:['ONE'], img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop', img2:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format&fit=crop', desc:'Heavy-duty canvas tote. Drop handles, internal zip pocket. 100% unbranded — minimal, intentional, yours.', slug:'noir-tote' },
];

let cart = JSON.parse(localStorage.getItem('enita-cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('enita-wishlist') || '[]');
let selectedSize = null;

const $ = id => document.getElementById(id);
function fmtPrice(n) { return '€' + n; }
function saveCart() { localStorage.setItem('enita-cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('enita-wishlist', JSON.stringify(wishlist)); }
function showToast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._tid); t._tid = setTimeout(() => t.classList.remove('show'), 2800);
}

// Get product from slug
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
document.title = `${product.name} — ENITA`;

function renderProduct() {
  const layout = $('product-layout');
  if (!layout) return;
  layout.innerHTML = `
    <div class="pg-gallery">
      <div class="pg-main-img">
        <img src="${product.img}" alt="${product.name}" id="pg-main-img" />
      </div>
      <div class="pg-thumbs">
        <div class="pg-thumb active" data-img="${product.img}">
          <img src="${product.img}" alt="${product.name}" />
        </div>
        <div class="pg-thumb" data-img="${product.img2}">
          <img src="${product.img2}" alt="${product.name} alternate" />
        </div>
      </div>
    </div>
    <div class="pg-details fade-up">
      <div class="pg-breadcrumb">
        <a href="index.html">Home</a> / <a href="index.html#shop">${product.cat.charAt(0).toUpperCase()+product.cat.slice(1)}</a> / <span>${product.name}</span>
      </div>
      <div class="pg-brand">${product.brand} — SS26</div>
      <div class="pg-name">${product.name}</div>
      <div class="pg-price">
        ${fmtPrice(product.price)}
        ${product.oldPrice ? `<span class="old">${fmtPrice(product.oldPrice)}</span>` : ''}
      </div>
      ${product.badge ? `<span class="product-badge badge-${product.badge}" style="margin-bottom:16px;display:inline-block;">${product.badge.toUpperCase()}</span>` : ''}
      <div class="pg-separator"></div>
      <div class="pg-size-header">
        <span class="pg-size-label">Select Size</span>
        <span class="pg-size-guide">Size Guide</span>
      </div>
      <div class="pg-sizes" id="pg-sizes">
        ${product.sizes.map(s => `<button class="pg-size-btn" data-size="${s}">${s}</button>`).join('')}
      </div>
      <div class="pg-size-error" id="pg-size-error"></div>
      <div class="pg-actions">
        <button class="btn btn-full" id="pg-add-btn">Add to Cart</button>
        <div class="pg-wish-row" id="pg-wish">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${wishlist.includes(product.id)?'#8B0000':'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span id="wish-label">${wishlist.includes(product.id)?'Saved to wishlist':'Save to Wishlist'}</span>
        </div>
      </div>
      <div class="pg-separator"></div>
      <p class="pg-desc">${product.desc}</p>
      <div class="pg-separator"></div>
      <div class="pg-accordion">
        <div class="acc-item">
          <div class="acc-head">Materials &amp; Care <span class="acc-icon">+</span></div>
          <div class="acc-body"><p>Outer: 100% Heavy-gauge ripstop nylon. Lining: Recycled polyester. Wash cold, hang dry. Do not tumble dry or bleach. Iron inside out only.</p></div>
        </div>
        <div class="acc-item">
          <div class="acc-head">Shipping &amp; Returns <span class="acc-icon">+</span></div>
          <div class="acc-body"><p>Free standard shipping on orders over €120. Express available at checkout. Returns accepted within 30 days — unworn, with original tags. No questions asked.</p></div>
        </div>
        <div class="acc-item">
          <div class="acc-head">Fit &amp; Sizing <span class="acc-icon">+</span></div>
          <div class="acc-body"><p>This piece runs oversized. If you prefer a slimmer silhouette, size down. Model is 187cm and wears size M. All measurements available in the size guide.</p></div>
        </div>
      </div>
    </div>
  `;

  // Thumb switching
  document.querySelectorAll('.pg-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.pg-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      $('pg-main-img').src = thumb.dataset.img;
    });
  });

  // Size selection
  document.querySelectorAll('.pg-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pg-size-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSize = btn.dataset.size;
      $('pg-size-error').textContent = '';
    });
  });

  // Add to cart
  $('pg-add-btn').addEventListener('click', () => {
    if (!selectedSize) { $('pg-size-error').textContent = 'Please select a size.'; return; }
    addToCart(product.id, selectedSize);
  });

  // Wishlist
  $('pg-wish').addEventListener('click', () => {
    const idx = wishlist.indexOf(product.id);
    const svg = document.querySelector('#pg-wish svg');
    const label = $('wish-label');
    if (idx === -1) {
      wishlist.push(product.id);
      svg.setAttribute('fill', '#8B0000');
      label.textContent = 'Saved to wishlist';
      showToast('Added to wishlist \u2665');
    } else {
      wishlist.splice(idx, 1);
      svg.setAttribute('fill', 'none');
      label.textContent = 'Save to Wishlist';
      showToast('Removed from wishlist');
    }
    saveWishlist();
  });

  // Accordion
  document.querySelectorAll('.acc-head').forEach(head => {
    head.addEventListener('click', () => {
      const body = head.nextElementSibling;
      const icon = head.querySelector('.acc-icon');
      const isOpen = body.classList.contains('open');
      document.querySelectorAll('.acc-body').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.acc-icon').forEach(ic => { ic.textContent = '+'; });
      if (!isOpen) { body.classList.add('open'); icon.textContent = '\u2212'; }
    });
  });
}

function renderRelated() {
  const relatedGrid = $('related-grid');
  if (!relatedGrid) return;
  let related = PRODUCTS.filter(p => p.id !== product.id && p.cat === product.cat);
  if (related.length < 4) {
    related = [...related, ...PRODUCTS.filter(p => p.id !== product.id && p.cat !== product.cat)].slice(0, 4);
  } else {
    related = related.slice(0, 4);
  }
  relatedGrid.innerHTML = related.map(p => `
    <div class="product-card" onclick="window.location.href='product.html?slug=${p.slug}'" style="cursor:pointer;">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge.toUpperCase()}</span>` : ''}
      </div>
      <div class="product-info">
        <span class="product-brand">${p.brand}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-price">${fmtPrice(p.price)}${p.oldPrice?`<span class="old">${fmtPrice(p.oldPrice)}</span>`:''}</div>
      </div>
    </div>
  `).join('');
}

// Cart
function openCart() { $('cart-panel').classList.add('open'); $('cart-overlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeCart() { $('cart-panel').classList.remove('open'); $('cart-overlay').classList.remove('open'); document.body.style.overflow = ''; }
$('cart-btn').addEventListener('click', openCart);
$('cart-close').addEventListener('click', closeCart);
$('cart-overlay').addEventListener('click', closeCart);

function addToCart(productId, size) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const key = `${productId}-${size}`;
  const existing = cart.find(c => c.key === key);
  if (existing) existing.qty += 1;
  else cart.push({ key, id: productId, name: p.name, img: p.img, price: p.price, size, qty: 1 });
  saveCart(); renderCart(); openCart();
  const cc = $('cart-count'); cc.classList.add('bump'); setTimeout(() => cc.classList.remove('bump'), 200);
  showToast(`${p.name} added to cart`);
}

function removeFromCart(key) { cart = cart.filter(c => c.key !== key); saveCart(); renderCart(); }
function changeQty(key, delta) {
  const item = cart.find(c => c.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(key); return; }
  saveCart(); renderCart();
}

function renderCart() {
  const itemsEl = $('cart-items'), emptyEl = $('cart-empty'), footerEl = $('cart-footer');
  const countEl = $('cart-count'), labelEl = $('cart-item-label'), subtotal = $('cart-subtotal');
  const total = cart.reduce((acc, c) => acc + c.price * c.qty, 0);
  const ic = cart.reduce((acc, c) => acc + c.qty, 0);
  if (countEl) countEl.textContent = ic;
  if (labelEl) labelEl.textContent = `(${ic} item${ic !== 1 ? 's' : ''})`;
  if (cart.length === 0) {
    emptyEl.style.display = 'flex'; itemsEl.innerHTML = '';
    if (footerEl) footerEl.style.display = 'none';
  } else {
    emptyEl.style.display = 'none'; if (footerEl) footerEl.style.display = 'flex';
    if (subtotal) subtotal.textContent = fmtPrice(total);
    itemsEl.innerHTML = cart.map(item => `
      <li class="cart-item" data-key="${item.key}">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">Size: ${item.size}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-key="${item.key}" data-delta="-1">\u2212</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-key="${item.key}" data-delta="1">+</button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
          <span class="cart-item-price">${fmtPrice(item.price * item.qty)}</span>
          <button class="cart-item-remove" data-key="${item.key}">&times;</button>
        </div>
      </li>`).join('');
    itemsEl.querySelectorAll('.qty-btn').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.key, parseInt(b.dataset.delta))));
    itemsEl.querySelectorAll('.cart-item-remove').forEach(b => b.addEventListener('click', () => removeFromCart(b.dataset.key)));
  }
}

// Auth modal
const modalOverlay = $('modal-overlay'), authModal = $('auth-modal'), modalClose = $('modal-close');
function openModal() { modalOverlay.classList.add('open'); authModal.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal() { modalOverlay.classList.remove('open'); authModal.classList.remove('open'); document.body.style.overflow = ''; }
$('account-btn').addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.querySelectorAll('.mtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    $('login-pane').classList.toggle('hidden', tab.dataset.tab !== 'login');
    $('signup-pane').classList.toggle('hidden', tab.dataset.tab !== 'signup');
  });
});
$('login-form').addEventListener('submit', e => { e.preventDefault(); const btn = e.target.querySelector('button'); btn.textContent = 'Signing in\u2026'; btn.disabled = true; setTimeout(() => { closeModal(); showToast('Welcome back.'); btn.textContent = 'Sign In \u2192'; btn.disabled = false; e.target.reset(); }, 900); });
$('signup-form').addEventListener('submit', e => { e.preventDefault(); const btn = e.target.querySelector('button'); btn.textContent = 'Creating\u2026'; btn.disabled = true; setTimeout(() => { closeModal(); showToast('Welcome to Enita.'); btn.textContent = 'Create Account \u2192'; btn.disabled = false; e.target.reset(); }, 900); });

// Navbar
const navbar = $('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 10); }, { passive: true });
const navToggle = $('nav-toggle'), navLinks = $('nav-links');
navToggle.addEventListener('click', () => { const o = navLinks.classList.toggle('open'); navToggle.classList.toggle('open', o); navToggle.setAttribute('aria-expanded', o); });

// Promo bar
const promoBar = $('promo-bar'), promoClose = $('promo-close');
if (sessionStorage.getItem('enita-promo')) promoBar.classList.add('hidden');
promoClose.addEventListener('click', () => { promoBar.classList.add('hidden'); sessionStorage.setItem('enita-promo', '1'); });

// Scroll reveal
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeCart(); } });

// Init
renderProduct();
renderRelated();
renderCart();
