import { createSlice } from '@reduxjs/toolkit';
import couponService from '../../services/couponService';
import { loadingStatus } from '../global/globalSlice';

export const getcoupon = () => async dispatch => {
	return couponService
		.getcoupon()
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(couponSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(couponError(error));
		});
};

export const addCoupon = (param) => async dispatch => {

	return couponService
		.addCoupon(param)
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
	},
	extraReducers: {}
});

export const {  couponSuccess, couponError } = couponSlice.actions;

export default couponSlice.reducer;
