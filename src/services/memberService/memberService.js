import axios from 'axios';

class MemberService {
	sdk = { auth0Manage: null };

	getMemberList = (dealGroupID, selectedPage, searchText) => {
		const url = `${process.env.REACT_APP_API}api/Coupon/get-members?dealGroupID=${dealGroupID}&CustomerName=${searchText?.CustomerName?.value}&SocialMediaID=${searchText?.SocialMediaID?.value}&MembershipTypeID=${searchText?.MembershipTypeID?.value}&MemberStatus=${searchText?.MemberStatus?.value}&page=${selectedPage}`;
		return axios
			.get(url)

	};

	getMemberById = (memberCustomerID, dealGroupID) => {
		const url = `${process.env.REACT_APP_API}api/Coupon/get-member?memberCustomerID=${memberCustomerID}&dealGroupID=${dealGroupID}`;
		return axios
			.get(url)

	};

	addMember = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/Coupon/add-member`, param)
	}

	updateMember = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/Coupon/update-member`, param)
	}


}

const instance = new MemberService();

export default instance;
