export default function CartItem({ item, remove }) {
	return (
		<div className='cart-item'>
			<img src={item.image} alt={item.title} />
			<div className='cart-item-info'>
				<h4>{item.title}</h4>
				<div className='cart-item-meta'>
					<span className='price'>${item.price.toFixed(2)}</span>
					<span className='qty'>Qty: {item.count}</span>
				</div>
			</div>
			<button className='remove-btn' onClick={() => remove(item.id)}>
				&times;
			</button>
		</div>
	);
}
