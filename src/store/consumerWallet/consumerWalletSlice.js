import { createSlice } from '@reduxjs/toolkit';
import ConsumerWalletService from '../../services/consumerWalletService';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

/**
 * define all action to access consumer store
 */

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
		.then( async res => {
			await dispatch( setDealerValue(res?.data.Data.Items, dealerGroupId ))
			
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

export const setTenderCouponValue = (search) => async dispatch => {
	return dispatch(setTenderCouponResult(search));

};

const callAPi =async (response, dealerGroupId) => {
	const resultData = await Promise.all(
		 response.map( async (list) => {
			let result = await ConsumerWalletService.getDealerInfo( list.DealerNumber, dealerGroupId)
		   return result?.data?.Data
	   })
	)
	return resultData
}

export const setDealerValue = (response, dealerGroupId) => async dispatch => {
	return dispatch(setDealerObject(await callAPi(response, dealerGroupId)))
};

export const addtendercoupon = (param, history) => async dispatch => {

	return ConsumerWalletService
		.addTenderCoupon(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
			} else {
				toast.info(res.data.Message)
				history.push("/consumer-wallet")
			}
			dispatch(loadingStatus(false))

		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};

export const addCouponWallet = (param, history) => async dispatch => {

	return ConsumerWalletService
		.addCouponWallet(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
				dispatch(loadingStatus(false))

			} else {
				toast.info(res.data.Message)
				history.push("/consumer-wallet")
			}
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};



const initialState = {
	success: false,
	consumerWallet: null,
	consumerSpecificWallet: null,
	searchObject: null,
	couponDataObject: null,
	tenderCouponResult: null,
	dealerList:[]
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
		setAddCouponObject: (state, action) => {
			state.success = true;
			state.couponDataObject = action.payload
		},
		setTenderCouponResult: (state, action) => {
			state.success = true;
			state.tenderCouponResult = action.payload
		},
		
		setDealerObject: (state, action) => {
			state.success = true;
			state.dealerList = action.payload
		},
	},
	extraReducers: {}
});

export const { consumerWalletSuccess, consumerWalletError, consumerSpecificWalletSuccess, setAddCouponObject, consumerSpecificWalletError, setSearchObject, setTenderCouponResult, setDealerObject } = consumerWalletSlice.actions;

export default consumerWalletSlice.reducer;
