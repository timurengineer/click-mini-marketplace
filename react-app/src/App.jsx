import { useEffect, useState } from 'react';
import CartList from './components/CartList';

export default function App() {
	const [cart, setCart] = useState(() => {
		return JSON.parse(localStorage.getItem('cart')) || [];
	});
	const [products, setProducts] = useState([]);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	useEffect(() => {
		const handleStorageChange = () => {
			setCart(JSON.parse(localStorage.getItem('cart')) || []);
		};

		window.addEventListener('cartUpdated', handleStorageChange);
	}, []);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then(r => r.json())
			.then(d => setProducts(d));
	}, []);

	function removeItem(id) {
		setCart(cart.filter(i => i.id !== id));
	}

	const detailed = cart
		.map(c => products.find(p => p.id === c.id))
		.filter(Boolean);
	const total = detailed.reduce((s, p) => s + p.price, 0);
	return (
		<div>
			<h2>Cart: ({detailed.length})</h2>
			<CartList items={detailed} remove={removeItem} />
			<h3>Total: ${total.toFixed(2)}</h3>
		</div>
	);
}
