import axios from 'axios';

class offerhistoryService {
	sdk = { auth0Manage: null };

	getOfferhistoryList = (fieldName, selectedPage, searchText) => {
		const url = `${process.env.REACT_APP_API}api/coupon/get-coupon-transactions?dealGroupID=${fieldName}&page=${selectedPage}&CouponCode=${searchText}`;
		return axios
			.get(url)

	};

	addOfferhistory = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/coupon/add-coupon-transaction`, param)
	}



}

const instance = new offerhistoryService();

export default instance;
