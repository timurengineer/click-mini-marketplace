const productsContainer = document.getElementById('products');

async function loadProducts() {
	const result = await fetch('https://fakestoreapi.com/products');
	const data = await result.json();

	data.forEach(item => {
		const card = document.createElement('div');
		card.classList = 'product-card';

		card.innerHTML = `
			<img src="${item.image}" alt="${item.title}"/>
			<h4>${item.title}</h4>
			<p>$${item.price}</p>
			<button class="add-btn" data-id="${item.id}">Add to cart</button>
		`;

		productsContainer.appendChild(card);
	});

	document.querySelectorAll('.add-btn').forEach(btn => {
		btn.onclick = () => addToLocalCart(Number(btn.dataset.id));
	});
}

loadProducts();

function addToLocalCart(id) {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];

	const existingItem = cart.find(x => x.id === id);
	if (existingItem) {
		existingItem.count = (existingItem.count || 1) + 1;
	} else {
		cart.push({ id, count: 1 });
	}

	localStorage.setItem('cart', JSON.stringify(cart));
	window.dispatchEvent(new Event('cartUpdated'));
}
