import axios from 'axios';

class CouponService {
	sdk = { auth0Manage: null };

	getCouponList = () => {
		const url = `${process.env.REACT_APP_API}api/coupon`;
		return axios
			.post(url)

	};
	
	addCoupon = ( param) => {

		return axios
			.post(`${process.env.REACT_APP_API}api/coupon`, param)
	}

}

const instance = new CouponService();

export default instance;
