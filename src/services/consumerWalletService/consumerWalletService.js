import axios from 'axios';

class ConsumerWalletService {
	sdk = { auth0Manage: null };

	getConsumerWalletList = (selectedPage, searchObject,dealerGroupId) => {
		let url = `${process.env.REACT_APP_API}api/couponwallet/get-coupon-wallet-summary?DealGroupID=${dealerGroupId}&page=${selectedPage}&SocialMediaId=${searchObject?.SocialMediaId?.value ? searchObject?.SocialMediaId?.value : ""}&PhoneNumber=${searchObject?.PhoneNumber?.value ? searchObject?.PhoneNumber?.value : ""}&Vin=${searchObject?.Vin?.value ? searchObject?.Vin?.value : ""}`;
		if(searchObject?.CustomerId?.value !== "") {
			url = url.concat(`&CustomerId=${searchObject?.CustomerId?.value}`)
	    }
	
		return axios
			.get(url)
	};

	getConsumerSpecificWalletList = (selectedPage, searchObject,dealerGroupId) => {
		console.log("searchObject", searchObject)
		let url = `${process.env.REACT_APP_API}api/couponwallet/get-customer-couponwallet?DealGroupID=${dealerGroupId}&page=${selectedPage}&SocialMediaId=${searchObject?.SocialMediaId ? searchObject?.SocialMediaId : ""}&PhoneNumber=${searchObject?.PhoneNumber ? searchObject?.PhoneNumber : ""}&Vin=${searchObject?.Vin ? searchObject?.Vin : ""}`;
		if(searchObject?.CustomerId) {
			url = url.concat(`&CustomerId=${searchObject?.CustomerId}`)
	    }
	
		return axios
			.get(url)
	};
	getDealerInfo = (dealerNumber,dealerGroupId) => {
		let url = `${process.env.REACT_APP_API}api//dealer/get-dealer-info?DealGroupID=${dealerGroupId}&DealerNumber=${dealerNumber}`;
		return axios.get(url);
	};

	
	addTenderCoupon = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/couponwallet/tender-coupon`, param)
	}

	addCouponWallet = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/couponwallet/add-coupon-to-wallet`, param)
	}

	
}

const instance = new ConsumerWalletService();

export default instance;
