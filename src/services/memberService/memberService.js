import axios from 'axios';

class MemberService {
	sdk = { auth0Manage: null };

	getMemberList = (dealGroupID, dealerNumber) => {
		const url = `${process.env.REACT_APP_API}api/Coupon/GetMembers?dealGroupID=${dealGroupID}`;
		return axios
			.get(url)

	};
	
	getMemberById = (memberCustomerID, dealGroupID) => {
		const url = `${process.env.REACT_APP_API}api/Coupon/GetMember?memberCustomerID=${memberCustomerID}&dealGroupID=${dealGroupID}`;
		return axios
			.get(url)

	};
	
	addMember = ( param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/Coupon/AddMember`, param)
	}

	updateMember = ( param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/Coupon/UpdateMember`, param)
	}


}

const instance = new MemberService();

export default instance;
