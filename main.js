document.addEventListener("DOMContentLoaded", function() {
    fetch('/productos.json')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products');

            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';

                productItem.innerHTML = `
                    <img src="${product.img}" alt="${product.alt}">
                    <h3>${product.nombre}</h3>
                    <h2>${product.precio}</h2>
                    <button class="add-to-cart" data-product='${JSON.stringify(product)}'>Agregar al carrito</button>
                `;

                productsContainer.appendChild(productItem);
            });

            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const product = JSON.parse(this.getAttribute('data-product'));
                    addToCart(product);
                });
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
}
