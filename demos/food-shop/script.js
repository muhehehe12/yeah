document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Cart Logic
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalValue = document.getElementById('cartTotalValue');
    const cartCount = document.querySelector('.cart-count');
    const addBtns = document.querySelectorAll('.add-btn');

    let cart = [];

    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }

    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                count += item.quantity;
                
                const cartItemEl = document.createElement('div');
                cartItemEl.classList.add('cart-item');
                cartItemEl.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div class="cart-item-qty">
                        <button class="qty-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus" data-index="${index}">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemEl);
            });
        }

        cartTotalValue.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = count;

        // Add event listeners to qty buttons
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (e.target.classList.contains('plus')) {
                    cart[index].quantity++;
                } else if (e.target.classList.contains('minus')) {
                    cart[index].quantity--;
                    if (cart[index].quantity === 0) {
                        cart.splice(index, 1);
                    }
                }
                updateCart();
            });
        });
    }

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.menu-item');
            const title = card.querySelector('.item-header h3').textContent;
            const priceText = card.querySelector('.item-header .price').textContent;
            const price = parseFloat(priceText.replace('$', ''));

            const existingItem = cart.find(item => item.title === title);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ title, price, quantity: 1 });
            }

            // Little micro-animation on adding
            btn.innerHTML = 'Added! <span>✓</span>';
            btn.style.backgroundColor = 'var(--accent)';
            setTimeout(() => {
                btn.innerHTML = 'Add to Cart <span>+</span>';
                btn.style.backgroundColor = '';
            }, 1000);

            updateCart();
            
            // Auto open cart on first item added
            if(cart.length === 1 && cart[0].quantity === 1) {
                toggleCart();
            }
        });
    });

    // Account Button Logic
    const accountBtn = document.querySelector('.account-btn');
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            if (accountBtn.textContent === 'Log In') {
                accountBtn.textContent = 'My Account';
                accountBtn.style.background = 'var(--accent)';
                accountBtn.style.color = 'white';
                accountBtn.style.borderColor = 'var(--accent)';
            } else {
                accountBtn.textContent = 'Log In';
                accountBtn.style.background = 'transparent';
                accountBtn.style.color = 'var(--text-main)';
                accountBtn.style.borderColor = 'var(--glass-border)';
            }
        });
    }
});
