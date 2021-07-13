import { combineReducers } from '@reduxjs/toolkit';
import coupon from './coupon/couponSlice';
import global from './global/globalSlice';
import auth from './auth/authSlice';
import member from './member/memberSlice';
import common from './common/commonSlice';
import memberShip from './membership/membershipSlice';
import offerhistory from './offerhistory/offerhistorySlice';
import rewardTransactionHistory from './rewardTransactionHistory/rewardTransactionHistorySlice'
import rewardType from './rewardType/rewardTypeSlice'
import user from './user/userSlice'
import consumerWallet from './consumerWallet/consumerWalletSlice'

/**
 * Define Root reducer
 * @param {*} asyncReducers 
 * @returns reducer
 */
const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		coupon,
		global,
		member,
		common,
		memberShip,
		offerhistory,
		rewardTransactionHistory,
		rewardType,
		user,
		consumerWallet
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
