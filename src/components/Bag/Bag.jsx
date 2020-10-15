import React, {useCallback, useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';
import ApiService from "../../services/api/ApiService";
import BagProductItemsList from "../BagProductItemsList/BagProductItemsList";
import {useStore} from "../../store/store";
const apiService = ApiService.getInstance();

export default function Bag() {
	const {state, dispatch} = useStore();
	const params = (new URLSearchParams(useLocation().search));
	const [isLoading, setLoading] = useState(true);

	useEffect(function fetchBag() {
		apiService.setCredentials(params.get('chat_uuid'), params.get('bot_key'));
		apiService.getBag().then(({data}) => {
			dispatch({type: 'SET_BAG_ITEMS', payload: data[`cart-${params.get('ecommerce')}`].products});
			setLoading(false);
		});
	}, []);

	const handleMakingOrder = async () => {
		await apiService.saveBag(params.get('ecommerce'), state.bagItems);
		await apiService.pushMessageToTelegram(params.get('on_success_node'));
		window.location = params.get('on_close_url');
	};

	return <div className='bag mt-5 is-flex is-align-items-center is-justify-content-center'>
		{isLoading ?
			<h1>Loading</h1> :
			<div>
				<BagProductItemsList/>
				<button onClick={handleMakingOrder} className="button">Сделать заказ</button>
			</div>
		}
	</div>;
}

