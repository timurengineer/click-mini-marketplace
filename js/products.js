const productsContainer = document.getElementById('products');

async function loadProducts() {
	const result = await fetch('https://fakestoreapi.com/products');
	const data = await result.json();
	console.log(data);

	data.forEach(item => {
		const card = document.createElement('div');
		card.classList = 'product-card';

		card.innerHTML = `
			<img src="${item.image}" alt="${item.title}"/>
			<h4>${item.title}</h4>
			<p>${item.price}</p>
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

	const exists = cart.find(x => x.id === id);
	if (!exists) cart.push({ id });

	localStorage.setItem('cart', JSON.stringify(cart));
}
