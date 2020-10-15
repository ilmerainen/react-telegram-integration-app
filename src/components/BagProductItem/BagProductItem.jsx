import React from "react";
import PropTypes from 'prop-types';

import "./styles.scss";
import {useStore} from "../../store/store";
import BagProductItemProps from "../../prop-types/bagProductItem";

export default function BagProductItem({item}) {
	const {dispatch} = useStore();
	const {
		id, title, price, image, size, discount_price: discountPrice, quantity
	} = item;

	const handleIncrementQuantity = () => {
		dispatch({type: 'SET_BAG_ITEM_QUANTITY', payload: {id, quantity: quantity + 1}});
	};

	const handleDecrementQuantity = () => {
		const prepared = Math.max(0, quantity - 1);
		dispatch({type: 'SET_BAG_ITEM_QUANTITY', payload: {id, quantity: prepared}});
	};

	return <div className="list-item columns mb-5">
		<div className="columns column is-4">
			<div className="column product-image">
				<img className="product-image_img" src={image}/>
			</div>
			<div className="column">
				<h4>{title}</h4>
				<div>Размер {size}</div>
				<div>
					{discountPrice && <span>{discountPrice} руб.{' '}</span>}
					<span className={discountPrice && 'strike-price'}>{price} руб.</span>
				</div>
			</div>
		</div>
		<div className="column is-3 is-offset-5 is-flex is-align-items-center">
			<div className="column is-flex is-justify-content-space-between is-align-items-center">
				<button className="button" onClick={handleDecrementQuantity}>-</button>
				<div>{quantity}</div>
				<button className="button" onClick={handleIncrementQuantity}>+</button>
			</div>
		</div>
	</div>;
}

BagProductItem.propTypes = {
	item: PropTypes.shape(BagProductItemProps)
};
