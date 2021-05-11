import { createSlice } from '@reduxjs/toolkit';
import offerhistoryService from '../../services/offerhistoryService';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

export const getofferhistory = (dealGroupID, selectedPage, searchText) => async dispatch => {
	return offerhistoryService
		.getOfferhistoryList(dealGroupID, selectedPage, searchText)
		.then(res => {
			dispatch(loadingStatus(false))
			dispatch(offerhistoryDetailSuccess(null))
			return dispatch(offerhistorySuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(offerhistoryError(error));
		});
};

export const getofferhistoryById = (id) => async dispatch => {
	dispatch(loadingStatus(true))

	return offerhistoryService
		.getOfferhistoryById(id)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(offerhistoryDetailSuccess(res?.data?.Data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(offerhistoryDetailError(error));
		});
};

export const addOfferhistory = (param, history) => async dispatch => {

	return offerhistoryService
		.addOfferhistory(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
				dispatch(loadingStatus(false))

			} else {
				toast.info(res.data.Message)
				history.push("/offerhistorys")
			}
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};

export const updateOfferhistory = (param, history) => async dispatch => {

	return offerhistoryService
		.updateOfferhistory(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
			} else {
				toast.info(res.data.Message)
				history.push("/offerhistorys")
			}
			dispatch(getofferhistory())
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};


const initialState = {
	success: false,
	offerhistory: null,
	offerhistoryDetail: null,
};

const offerhistorySlice = createSlice({
	name: 'offerhistory',
	initialState,
	reducers: {

		offerhistorySuccess: (state, action) => {
			state.success = true;
			state.offerhistory = action.payload
		},
		offerhistoryError: (state, action) => {
			state.success = false;
			state.offerhistory = null;
		},
		offerhistoryDetailSuccess: (state, action) => {
			state.success = true;
			state.offerhistoryDetail = action.payload
		},
		offerhistoryDetailError: (state, action) => {
			state.success = false;
			state.offerhistoryDetail = null;
		},
	},
	extraReducers: {}
});

export const { offerhistorySuccess, offerhistoryError, offerhistoryDetailSuccess, offerhistoryDetailError } = offerhistorySlice.actions;

export default offerhistorySlice.reducer;
