import { createSlice } from '@reduxjs/toolkit';
import RewardTypeService from '../../services/rewardType';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

export const getRewardType = (dealGroupID, selectedPage) => async dispatch => {
	return RewardTypeService
		.getRewardTypeList(dealGroupID, selectedPage)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(rewardTypeSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(rewardTypeError(error));
		});
};


export const updateRewardType = (param, dealGroupID, selectedPage) => async dispatch => {

	return RewardTypeService
		.updateRewardType(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
				dispatch(loadingStatus(false))

			} else {
				dispatch(getRewardType(dealGroupID, selectedPage))
				toast.info(res.data.Message)
			}
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};


const initialState = {
	success: false,
	rewardType: null,
};

const rewardTypeSlice = createSlice({
	name: 'rewardType',
	initialState,
	reducers: {

		rewardTypeSuccess: (state, action) => {
			state.success = true;
			state.rewardType = action.payload
		},
		rewardTypeError: (state, action) => {
			state.success = false;
			state.rewardType = null;
		},
	},
	extraReducers: {}
});

export const { rewardTypeSuccess, rewardTypeError } = rewardTypeSlice.actions;

export default rewardTypeSlice.reducer;
