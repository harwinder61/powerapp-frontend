import axios from 'axios';

class AuthService {
	authLogin = (param) => {
		const url = `${process.env.REACT_APP_API}api/auth/login`;
		return axios
			.post(url, param)

	};
}

const instance = new AuthService();

export default instance;
