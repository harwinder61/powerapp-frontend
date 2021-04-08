import axios from 'axios';

class CouponService {
	sdk = { auth0Manage: null };

	getCouponList = (dealGroupID, dealerNumber) => {
		const url = `${process.env.REACT_APP_API}api/Coupon/GetCurrentCoupons?dealGroupID=${dealGroupID}&dealerNumber=${dealerNumber}`;
		return axios
			.get(url)

	};
	
	getCouponById = (coupnCodeID) => {
		const url = `${process.env.REACT_APP_API}api/Coupon/GetCouponByID?coupnCodeID=${coupnCodeID}`;
		return axios
			.get(url)

	};
	

	addCoupon = ( param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/Coupon/AddCoupon`, param)
	}

	updateCoupon = ( param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/Coupon/UpdateCoupon`, param)
	}


}

const instance = new CouponService();

export default instance;
