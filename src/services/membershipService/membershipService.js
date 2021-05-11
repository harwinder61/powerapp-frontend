import axios from 'axios';

class MembershipService {
	sdk = { auth0Manage: null };

	getMemberShipList = (dealGroupID) => {
		const url = `${process.env.REACT_APP_API}api/coupon/get-membershiptypes?dealGroupID=${dealGroupID}`;
		return axios
			.get(url)

	};

	getMemberShipById = (membershipTypeID) => {
		const url = `${process.env.REACT_APP_API}api/coupon/get-membershiptype-by-id?MembershipTypeID=${membershipTypeID}`;
		return axios
			.get(url)

	};

	addMemberShip = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/coupon/add-membershiptype`, param)
	}

	
updateMemberShip = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}/api/coupon/update-membershiptype`, param)
	}


}

const instance = new MembershipService();

export default instance;
