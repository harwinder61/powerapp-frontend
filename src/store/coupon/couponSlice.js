import { createSlice } from '@reduxjs/toolkit';
import couponService from '../../services/couponService';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

export const getcoupon = (dealGroupID, dealerNumber) => async dispatch => {
	return couponService
		.getCouponList(dealGroupID, dealerNumber)
		.then(res => {
			dispatch(loadingStatus(false))
			dispatch(couponDetailSuccess(null))
			return dispatch(couponSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(couponError(error));
		});
};

export const getcouponById = (id) => async dispatch => {
	return couponService
		.getCouponById(id)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(couponDetailSuccess(res?.data?.Data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(couponDetailError(error));
		});
};

export const addCoupon = (param) => async dispatch => {

	return couponService
		.addCoupon(param)
		.then(res => {
			if(!res.data.Status) {
				toast.error(res.data.Message)
			} 
			dispatch(getcoupon())
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			// return dispatch(userProfileError(error));
		});
};

export const updateCoupon = (param) => async dispatch => {

	return couponService
		.updateCoupon(param)
		.then(res => {
			dispatch(getcoupon())
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			// return dispatch(userProfileError(error));
		});
};


const initialState = {
	success: false,
	coupon: null,
	couponDetail: null,
};

const couponSlice = createSlice({
	name: 'coupon',
	initialState,
	reducers: {
		
		couponSuccess: (state, action) => {
			state.success = true;
			state.coupon = action.payload
		},
		couponError: (state, action) => {
			state.success = false;
			state.coupon = null;
		},
		couponDetailSuccess: (state, action) => {
			state.success = true;
			state.couponDetail = action.payload
		},
		couponDetailError: (state, action) => {
			state.success = false;
			state.couponDetail = null;
		},
	},
	extraReducers: {}
});

export const {  couponSuccess, couponError, couponDetailSuccess, couponDetailError } = couponSlice.actions;

export default couponSlice.reducer;
