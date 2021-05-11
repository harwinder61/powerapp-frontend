import { createSlice } from '@reduxjs/toolkit';
import memberService from '../../services/memberService';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

export const getmember = (dealGroupID, selectedPage, searchText) => async dispatch => {
	return memberService
		.getMemberList(dealGroupID, selectedPage, searchText)
		.then(res => {
			dispatch(loadingStatus(false))
			// dispatch(memberDetailSuccess(null))
			return dispatch(memberSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(memberError(error));
		});
};

export const getmemberById = (memberCustomerID, dealGroupID) => async dispatch => {
	return memberService
		.getMemberById(memberCustomerID, dealGroupID)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(memberDetailSuccess(res?.data?.Data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(memberDetailError(error));
		});
};

export const addMember = (param, history, id, value) => async dispatch => {

	return memberService
		.addMember(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
				dispatch(loadingStatus(false))

			} else {
				toast.info(res.data.Message)
				dispatch(memberDetailSuccess(null))
				history.push("/members")
			}
		})
		.catch(error => {
			console.log(error?.response)
			// toast.info(res.data.Message)
			dispatch(loadingStatus(false))

		});
};

export const updateMember = (param, history, id, value) => async dispatch => {

	return memberService
		.updateMember(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
				dispatch(loadingStatus(false))

			} else {
				dispatch(memberDetailSuccess(null))

				toast.info(res.data.Message)
				history.push("/members")
			}
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};


const initialState = {
	success: false,
	member: null,
	memberDetail: null,
};

const memberSlice = createSlice({
	name: 'member',
	initialState,
	reducers: {

		memberSuccess: (state, action) => {
			state.success = true;
			state.member = action.payload
		},
		memberError: (state, action) => {
			state.success = false;
			state.member = null;
		},
		memberDetailSuccess: (state, action) => {
			state.success = true;
			state.memberDetail = action.payload
		},
		memberDetailError: (state, action) => {
			state.success = false;
			state.memberDetail = null;
		},
	},
	extraReducers: {}
});

export const { memberSuccess, memberError, memberDetailSuccess, memberDetailError } = memberSlice.actions;

export default memberSlice.reducer;
