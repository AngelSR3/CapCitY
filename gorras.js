document.addEventListener("DOMContentLoaded", function() {
    fetch('/productos.json')
        .then(response => response.json())
        .then(data => {
            const gorrasContainer = document.getElementById('gorras');
            const filterSelect = document.getElementById('filter');

            function renderGorras(gorras) {
                gorrasContainer.innerHTML = '';
                gorras.forEach(gorra => {
                    const gorraItem = document.createElement('div');
                    gorraItem.className = 'product-item';

                    gorraItem.innerHTML = `
                        <img src="${gorra.img}" alt="${gorra.alt}">
                        <h3>${gorra.nombre}</h3>
                        <h2>${gorra.precio}</h2>
                        <button class="add-to-cart" data-product='${JSON.stringify(gorra)}'>Agregar al carrito</button>
                    `;

                    gorrasContainer.appendChild(gorraItem);
                });

                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const product = JSON.parse(this.getAttribute('data-product'));
                        addToCart(product);
                    });
                });
            }

            function filterGorras() {
                const selectedType = filterSelect.value;
                const filteredGorras = selectedType === 'all' ? data : data.filter(gorra => gorra.tipo === selectedType);
                renderGorras(filteredGorras);
            }
            filterSelect.addEventListener('change', filterGorras);
            renderGorras(data);
        })
        .catch(error => console.error('Error al cargar las gorras:', error));
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.nombre === product.nombre);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].cantidad = (cart[existingProductIndex].cantidad || 1) + 1;
    } else {
      
        product.cantidad = 1; 
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
}