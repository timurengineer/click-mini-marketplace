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
		return () => window.removeEventListener('cartUpdated', handleStorageChange);
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
		.map(c => {
			const product = products.find(p => p.id === c.id);
			return product ? { ...product, count: c.count || 1 } : null;
		})
		.filter(Boolean);
	const total = detailed.reduce((s, p) => s + p.price * p.count, 0);

	return (
		<div className='cart-container'>
			<h2 className='cart-title'>Cart</h2>
			{detailed.length > 0 && (
				<p className='cart-count'>{detailed.length} items</p>
			)}
			{detailed.length === 0 ? (
				<div className='cart-empty'>
					<p className='empty-title'>Your cart is empty</p>
					<p className='empty-subtitle'>Add products from the catalog</p>
				</div>
			) : (
				<>
					<CartList items={detailed} remove={removeItem} />
					<div className='cart-total'>
						<span className='total-label'>Total:</span>
						<span className='total-amount'>${total.toFixed(2)}</span>
					</div>
				</>
			)}
		</div>
	);
}
