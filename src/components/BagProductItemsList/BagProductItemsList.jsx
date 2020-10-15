import React from "react";

import BagProductItem from "../BagProductItem/BagProductItem";
import {useStore} from "../../store/store";

export default function BagProductItemsList() {
	const {state} = useStore();
	const items = state.bagItems;

	return <div>
		{items.map(function (item) {
			return <BagProductItem
				key={item.id}
				item={item}
			/>;
		})}
	</div>;
}
