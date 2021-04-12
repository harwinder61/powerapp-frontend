import { createSlice } from '@reduxjs/toolkit';
import membershipService from '../../services/membershipService';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

export const getmemberShip = (dealGroupID) => async dispatch => {
	return membershipService
		.getMemberShipList(dealGroupID)
		.then(res => {
			dispatch(loadingStatus(false))
			dispatch(memberShipDetailSuccess(null))
			return dispatch(memberShipSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(memberShipError(error));
		});
};

export const getmemberShipById = (membershipTypeID) => async dispatch => {
	return membershipService
		.getMemberShipById(membershipTypeID)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(memberShipDetailSuccess(res?.data?.Data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(memberShipDetailError(error));
		});
};

export const addMemberShip = (param, history) => async dispatch => {

	return membershipService
		.addMemberShip(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
			} else {
				toast.info(res.data.Message)
				history.push("/membership")
			}
			dispatch(getmemberShip())
		})
		.catch(error => {
			dispatch(loadingStatus(false))

		});
};

export const updateMemberShip = (param, history) => async dispatch => {

	return membershipService
		.updateMemberShip(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
			} else {
				toast.info(res.data.Message)
				history.push("/membership")
			}
			dispatch(getmemberShip())
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};


const initialState = {
	success: false,
	memberShip: null,
	memberShipDetail: null,
};

const memberShipSlice = createSlice({
	name: 'memberShip',
	initialState,
	reducers: {

		memberShipSuccess: (state, action) => {
			state.success = true;
			state.memberShip = action.payload
		},
		memberShipError: (state, action) => {
			state.success = false;
			state.memberShip = null;
		},
		memberShipDetailSuccess: (state, action) => {
			state.success = true;
			state.memberShipDetail = action.payload
		},
		memberShipDetailError: (state, action) => {
			state.success = false;
			state.memberShipDetail = null;
		},
	},
	extraReducers: {}
});

export const { memberShipSuccess, memberShipError, memberShipDetailSuccess, memberShipDetailError } = memberShipSlice.actions;

export default memberShipSlice.reducer;
