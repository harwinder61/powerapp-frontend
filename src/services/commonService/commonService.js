import axios from 'axios';

class CommonService {
	sdk = { auth0Manage: null };

	getRewardList = (fieldName) => {
		const url = `${process.env.REACT_APP_API}api/general/get-field-definition-values?FieldName=${fieldName}`;
		return axios
			.get(url)

	};
	getDealerInfoList = (DealGroupID) => {
		const url = `${process.env.REACT_APP_API}api/dealer/get-dealer-info-all?DealGroupID=${DealGroupID}`;
		return axios
			.get(url)

	};
}

const instance = new CommonService();

export default instance;
