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

	
	// getUserById = (UserID) => {
	// 	const url = `${process.env.REACT_APP_API}api/users/get-user-by-userid?UserID=${UserID}`;
	// 	return axios
	// 		.get(url)

	// };

	// getUserByEmail = (Email) => {
	// 	const url = `${process.env.REACT_APP_API}api/users/get-user-by-email?Email=${Email}`;
	// 	return axios
	// 		.get(url)

	// };


	// addUser = (param) => {
	// 	return axios
	// 		.post(`${process.env.REACT_APP_API}api/users/add-user`, param)
	// }

	// updateUser = (param) => {
	// 	return axios
	// 		.post(`${process.env.REACT_APP_API}api/users/update-user`, param)
	// }


}

const instance = new ConsumerWalletService();

export default instance;
