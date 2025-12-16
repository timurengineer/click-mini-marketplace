import CartItem from './CartItem';

export default function CartList({ items, remove }) {
	return (
		<div className='cart-items'>
			{items.map(item => (
				<CartItem key={item.id} item={item} remove={remove} />
			))}
		</div>
	);
}
