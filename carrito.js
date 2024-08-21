document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const buyAllButton = document.getElementById('buy-all');

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            return;
        }

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.alt}">
                <div class="cart-item-details">
                    <h3>${item.nombre}</h3>
                    <h2>${item.precio}</h2>
                    <button class="remove-button" data-name="${item.nombre}">Eliminar</button>
                </div>
            `;

            const removeButton = cartItem.querySelector('.remove-button');
            removeButton.addEventListener('click', () => {
                removeItemFromCart(item.nombre);
            });

            cartItemsContainer.appendChild(cartItem);
        });
    }

    function removeItemFromCart(nombre) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems = cartItems.filter(item => item.nombre !== nombre);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
    }

    function buyAll() {
        localStorage.removeItem('cart');
        renderCart();
        alert('¡Gracias por tu compra!');
    }

    buyAllButton.addEventListener('click', buyAll);
    renderCart();
});