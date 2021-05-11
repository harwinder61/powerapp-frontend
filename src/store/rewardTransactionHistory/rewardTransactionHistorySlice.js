import { createSlice } from '@reduxjs/toolkit';
import rewardTransactionHistory from '../../services/rewardTransactionHistory/';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

export const getRewardTransactionHistory = (dealGroupID, selectedPage, searchText) => async dispatch => {
	return rewardTransactionHistory
		.getRewardTransactionHistoryList(dealGroupID, selectedPage, searchText)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(rewardTransactionHistorySuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(rewardTransactionHistoryError(error));
		});
};


export const addRewardTransactionHistory = (param, history) => async dispatch => {

	return rewardTransactionHistory
		.addRewardTransactionHistory(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
				dispatch(loadingStatus(false))
			} else {
				toast.info(res.data.Message)
				history.push("/reward")
			}
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};

const initialState = {
	success: false,
	rewardTransactionHistory: null,
};

const rewardTransactionHistorySlice = createSlice({
	name: 'rewardTransactionHistory',
	initialState,
	reducers: {

		rewardTransactionHistorySuccess: (state, action) => {
			state.success = true;
			state.rewardTransactionHistory = action.payload
		},
		rewardTransactionHistoryError: (state, action) => {
			state.success = false;
			state.rewardTransactionHistory = null;
		},
	},
	extraReducers: {}
});

export const { rewardTransactionHistorySuccess, rewardTransactionHistoryError } = rewardTransactionHistorySlice.actions;

export default rewardTransactionHistorySlice.reducer;
