import React, {useContext, useReducer} from "react";
import PropTypes from 'prop-types';

const initialState = {
	bagItems: [],
};

function reducer(state, action) {
	switch (action.type) {
		case 'SET_BAG_ITEM_QUANTITY': {
			const bagItems = [...state.bagItems];
			const product = bagItems.find(item => item.id === action.payload.id);
			product.quantity = action.payload.quantity;

			return {...state};
		}
		case 'SET_BAG_ITEMS': {
			const bagItems = action.payload.map(({
																						 guid, title, price, image,
																						 choices,
																						 discount_price, quantity
																					 }) => {
				const obj = {
					id: guid,
					title,
					price,
					image,
					discount_price,
					quantity,
				};

				if (choices) {
					const {field_multichoice: {value: size}} = choices;
					obj.size = size;
				}

				return obj;
			});

			return {
				...state,
				bagItems: [...bagItems],
			};
		}
		default: {
			throw Error('There is no such type of action');
		}
	}
}

const StoreContext = React.createContext({
	state: initialState,
	dispatch() {
	},
});

export const StoreProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <StoreContext.Provider value={{state, dispatch}}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
	children: PropTypes.element,
};

export const useStore = () => useContext(StoreContext);
