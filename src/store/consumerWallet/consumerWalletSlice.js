import { createSlice } from '@reduxjs/toolkit';
import ConsumerWalletService from '../../services/consumerWalletService';
import { loadingStatus } from '../global/globalSlice';

export const getConsumerWallet = (selectedPage, searchText, dealerGroupId) => async dispatch => {
	return ConsumerWalletService
		.getConsumerWalletList(selectedPage, searchText, dealerGroupId)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(consumerWalletSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(consumerWalletError(error));
		});
};


export const getConsumerSpecificWallet = (selectedPage, searchText, dealerGroupId) => async dispatch => {
	return ConsumerWalletService
		.getConsumerSpecificWalletList(selectedPage, searchText, dealerGroupId)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(consumerSpecificWalletSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(consumerSpecificWalletError(error));
		});
};

export const setSearchValue = (search) => async dispatch => {
	return dispatch(setSearchObject(search));

};


const initialState = {
	success: false,
	consumerWallet: null,
	consumerSpecificWallet: null,
	searchObject: null
};

const consumerWalletSlice = createSlice({
	name: 'consumerWallet',
	initialState,
	reducers: {

		consumerWalletSuccess: (state, action) => {
			state.success = true;
			state.consumerWallet = action.payload
		},
		consumerWalletError: (state, action) => {
			state.success = false;
			state.consumerWallet = null;
		},
		consumerSpecificWalletSuccess: (state, action) => {
			state.success = true;
			state.consumerSpecificWallet = action.payload
		},
		consumerSpecificWalletError: (state, action) => {
			state.success = false;
			state.consumerSpecificWallet = null;
		},
		setSearchObject: (state, action) => {
			state.success = true;
			state.searchObject = action.payload
		},

	},
	extraReducers: {}
});

export const { consumerWalletSuccess, consumerWalletError, consumerSpecificWalletSuccess, consumerSpecificWalletError, setSearchObject } = consumerWalletSlice.actions;

export default consumerWalletSlice.reducer;
