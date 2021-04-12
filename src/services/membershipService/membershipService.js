import axios from 'axios';

class MembershipService {
	sdk = { auth0Manage: null };

	getMemberShipList = (dealGroupID) => {
		const url = `${process.env.REACT_APP_API}api/Coupon/GetMembershipTypes?dealGroupID=${dealGroupID}`;
		return axios
			.get(url)

	};

	getMemberShipById = (membershipTypeID) => {
		const url = `${process.env.REACT_APP_API}api/Coupon/GetMembershipTypeByID?membershipTypeID=${membershipTypeID}`;
		return axios
			.get(url)

	};

	addMemberShip = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/Coupon/AddMembershipType`, param)
	}

	
updateMemberShip = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/Coupon/UpdateMembershipType`, param)
	}


}

const instance = new MembershipService();

export default instance;
