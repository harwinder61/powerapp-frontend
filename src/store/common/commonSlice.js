import { createSlice } from '@reduxjs/toolkit';
import commonService from '../../services/commonService';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

export const getrewardlist = (fieldName) => async dispatch => {
	return commonService
		.getRewardList(fieldName)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(commonDetailSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(commonError(error));
		});
};



export const getRewardType = (fieldName) => async dispatch => {
	return commonService
		.getRewardList(fieldName)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(rewardTypeSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(rewardTypeError(error));
		});
};

export const getOperationType = (fieldName) => async dispatch => {
	return commonService
		.getRewardList(fieldName)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(operationTypeSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(operationTypeError(error));
		});
};

export const updateDealerGroupState = (groupId, name) => async dispatch => {
	toast.info("Successfully update")
	return dispatch(dealerGroupSuccess({
		dealerGroupId: groupId,
		dealerGroupName: name
	}));
};

const initialState = {
	success: false,
	common: null,
	commonDetail: null,
	rewardType: null,
	operationType: null,
	dealerGroup: {
		dealerGroupId: 3,
		dealerGroupName: "Jones Group"
	}
};

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {

		commonSuccess: (state, action) => {
			state.success = true;
			state.common = action.payload
		},
		commonError: (state, action) => {
			state.success = false;
			state.common = null;
		},
		commonDetailSuccess: (state, action) => {
			state.success = true;
			state.commonDetail = action.payload
		},
		commonDetailError: (state, action) => {
			state.success = false;
			state.commonDetail = null;
		},

		rewardTypeSuccess: (state, action) => {
			state.success = true;
			state.rewardType = action.payload
		},
		rewardTypeError: (state, action) => {
			state.success = false;
			state.rewardType = null;
		},

		operationTypeSuccess: (state, action) => {
			state.success = true;
			state.operationType = action.payload
		},
		operationTypeError: (state, action) => {
			state.success = false;
			state.operationType = null;
		},
		dealerGroupSuccess: (state, action) => {
			state.success = true;
			state.dealerGroup = action.payload
		},
		
	},
	extraReducers: {}
});

export const { commonSuccess, commonError, commonDetailSuccess, commonDetailError, rewardTypeSuccess, rewardTypeError, operationTypeSuccess, operationTypeError, dealerGroupSuccess } = commonSlice.actions;

export default commonSlice.reducer;
