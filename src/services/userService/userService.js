import axios from 'axios';

class UserService {
	sdk = { auth0Manage: null };

	getUserList = (selectedPage, searchObject) => {
		let url = `${process.env.REACT_APP_API}api/users/find-user?page=${selectedPage ? selectedPage : 1}&FirstName=${searchObject?.FirstName?.value ? searchObject?.FirstName?.value : ""}&LastName=${searchObject?.LastName?.value ? searchObject?.LastName?.value : ""}&Email=${searchObject?.Email?.value ? searchObject?.Email?.value : ""}&UserType=${searchObject?.UserType?.value ? searchObject?.UserType?.value : ""}`;
		
		return axios
			.get(url)

	};

	getUserById = (UserID) => {
		const url = `${process.env.REACT_APP_API}api/users/get-user-by-userid?UserID=${UserID}`;
		return axios
			.get(url)

	};


	addUser = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/users/add-user`, param)
	}

	updateUser = (param) => {
		return axios
			.post(`${process.env.REACT_APP_API}api/users/update-user`, param)
	}


}

const instance = new UserService();

export default instance;
