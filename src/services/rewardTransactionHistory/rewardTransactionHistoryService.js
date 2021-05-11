import axios from 'axios';

class RewardTransactionHistory {
	sdk = { auth0Manage: null };

	getRewardTransactionHistoryList = (dealGroupID, selectedPage) => {
		const url = `${process.env.REACT_APP_API}api/Coupon/get-reward-points-log?dealGroupID=${dealGroupID}&page=${selectedPage}`;
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
