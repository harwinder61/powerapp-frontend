import { combineReducers } from '@reduxjs/toolkit';
import coupon from './coupon/couponSlice';
import global from './global/globalSlice';
import auth from './auth/authSlice';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		coupon,
		global,
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
