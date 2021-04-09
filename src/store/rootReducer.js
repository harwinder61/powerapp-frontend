import { combineReducers } from '@reduxjs/toolkit';
import coupon from './coupon/couponSlice';
import global from './global/globalSlice';
import auth from './auth/authSlice';
import member from './member/memberSlice';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		coupon,
		global,
		member,
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'auth/user/userLoggedOut') {
		state = undefined;
	}

	return combinedReducer(state, action);
};


export default createReducer;
