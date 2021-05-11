import axios from 'axios';

class RewardTypeService {
	sdk = { auth0Manage: null };

	getRewardTypeList = (dealGroupID, selectedPage) => {
		const url = `${process.env.REACT_APP_API}api/coupon/get-dealer-options?dealGroupID=${dealGroupID}&page=${selectedPage}`;
		return axios
			.get(url)

	};

	updateRewardType = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/coupon/update-dealer-options`, param)
	}


}

const instance = new RewardTypeService();

export default instance;
