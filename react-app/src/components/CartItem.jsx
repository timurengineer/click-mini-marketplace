export default function CartItem({ item, remove }) {
	return (
		<div className='cart-item'>
			<img src={item.image} />
			<div>
				<h4>{item.title}</h4>
				<p>${item.price}</p>
			</div>
			<button onClick={() => remove(item.id)}>Remove</button>
		</div>
	);
}
