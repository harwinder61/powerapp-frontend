import axios from 'axios';

class RewardTransactionHistory {
	sdk = { auth0Manage: null };

	getRewardTransactionHistoryList = (dealGroupID, selectedPage, searchObject) => {
		let url = `${process.env.REACT_APP_API}api/Coupon/get-reward-points-log?dealGroupID=${dealGroupID}&RewardType=${searchObject?.RewardType?.value}&page=${selectedPage}`;
		if(searchObject?.CustomerID?.value !== "") {
			url = url.concat(`&CustomerID=${Number.parseInt(searchObject?.CustomerID?.value)}`)
	   }
	   if(searchObject?.TransactionDate?.value !== "") {
		url = url.concat(`&TransactionDate=${searchObject?.TransactionDate?.value}`)
   		}

		
		return axios
			.get(url)

	};

	addRewardTransactionHistory = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/coupon/add-reward-point-transaction`, param)
	}

}

const instance = new RewardTransactionHistory();

export default instance;
