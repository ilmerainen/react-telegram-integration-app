import axios from "axios";

const apiUrl = 'https://designer.fstrk.io/api';

export default class ApiService {
	static instance = null;
	chatUuid = null;
	botKey = null;

	static getInstance() {
		if (ApiService.instance) {
			return ApiService.instance;
		} else {
			ApiService.instance = new ApiService();
			return ApiService.instance;
		}
	}

	setCredentials(chatUuid, botKey) {
		this.chatUuid = chatUuid;
		this.botKey = botKey;
	}

	async getBag() {
		return await axios.get(`${apiUrl}/partners/chats/${this.chatUuid}/variables/`, {
			headers: {
				'bot-key': this.botKey,
			},
		});
	}

	async saveBag(cartId, products) {
		const prepared = products.map(({
																		 id: guid,
																		 title,
																		 price,
																		 image,
																		 size,
																		 discount_price,
																		 quantity
																	 }) => ({
			guid,
			title,
			price,
			image,
			size,
			discount_price,
			quantity,
		}));

		await axios.post(`${apiUrl}/partners/chats/${this.chatUuid}/variables/`,
			{
				[`cart-${cartId}`]: {
					products: prepared,
				}
			}, {
				headers: {
					'bot-key': this.botKey,
				}
			});
	}

	async pushMessageToTelegram(msgId) {
		await axios.post(`${apiUrl}/partners/chats/${this.chatUuid}/push/`,
			{
				get_params: {
					bot_key: this.botKey,
					chat_uuid: this.chatUuid,
				},
				is_async: false,
				node: msgId,
			}, {
				headers: {
					'bot-key': this.botKey,
				}
			});
	}
}