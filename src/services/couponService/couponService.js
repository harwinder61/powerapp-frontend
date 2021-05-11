import axios from 'axios';

class CouponService {
	sdk = { auth0Manage: null };

	getCouponList = (dealGroupID, dealerNumber, selectedPage, searchText, sortObject) => {
		const url = `${process.env.REACT_APP_API}api/coupon/get-coupons?DealGroupID=${dealGroupID}&dealerNumber=${dealerNumber}&page=${selectedPage}&CouponDescription=${searchText}&SortColumn=${sortObject?.SortColumn}&SortDirection=${sortObject?.SortDirection ? "asc" : "desc"}`;
		return axios
			.get(url)

	};

	getCouponById = (coupnCodeID) => {
		const url = `${process.env.REACT_APP_API}api/coupon/get-coupon-by-id?coupnCodeID=${coupnCodeID}`;
		return axios
			.get(url)

	};


	addCoupon = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/coupon/add-coupon`, param)
	}

	updateCoupon = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/coupon/update-coupon`, param)
	}


}

const instance = new CouponService();

export default instance;
