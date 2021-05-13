import { createSlice } from '@reduxjs/toolkit';
import couponService from '../../services/couponService';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

export const getcoupon = (dealGroupID, selectedPage, searchText, sortObject) => async dispatch => {
	return couponService
		.getCouponList(dealGroupID, selectedPage, searchText, sortObject)
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
	dispatch(loadingStatus(true))

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

export const addCoupon = (param, history) => async dispatch => {

	return couponService
		.addCoupon(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
			} else {
				toast.info(res.data.Message)
				history.push("/coupons")
			}
			dispatch(getcoupon())
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};

export const updateCoupon = (param, history) => async dispatch => {

	return couponService
		.updateCoupon(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
			} else {
				toast.info(res.data.Message)
				history.push("/coupons")
			}
			dispatch(getcoupon())
		})
		.catch(error => {
			dispatch(loadingStatus(false))
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

export const { couponSuccess, couponError, couponDetailSuccess, couponDetailError } = couponSlice.actions;

export default couponSlice.reducer;
