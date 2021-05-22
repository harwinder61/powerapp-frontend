import { createSlice } from '@reduxjs/toolkit';
import userService from '../../services/userService';
import { loadingStatus } from '../global/globalSlice';
import { toast } from 'react-toastify';

export const getUser = (selectedPage, searchText) => async dispatch => {
	return userService
		.getUserList(selectedPage, searchText)
		.then(res => {
			dispatch(loadingStatus(false))
			dispatch(userDetailSuccess(null))
			return dispatch(userSuccess(res?.data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(userError(error));
		});
};

export const getuserById = (id) => async dispatch => {
	dispatch(loadingStatus(true))

	return userService
		.getUserById(id)
		.then(res => {
			dispatch(loadingStatus(false))
			return dispatch(userDetailSuccess(res?.data?.Data));
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			return dispatch(userDetailError(error));
		});
};

export const addUser = (param, history) => async dispatch => {

	return userService
		.addUser(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
			} else {
				toast.info(res.data.Message)
				history.push("/user")
			}
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};

export const updateUser = (param, history) => async dispatch => {

	return userService
		.updateUser(param)
		.then(res => {
			if (!res.data.Status) {
				toast.error(res.data.Message)
			} else {
				toast.info(res.data.Message)
				history.push("/user")
			}
		})
		.catch(error => {
			dispatch(loadingStatus(false))
		});
};


const initialState = {
	success: false,
	user: null,
	userDetail: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {

		userSuccess: (state, action) => {
			state.success = true;
			state.user = action.payload
		},
		userError: (state, action) => {
			state.success = false;
			state.user = null;
		},
		userDetailSuccess: (state, action) => {
			state.success = true;
			state.userDetail = action.payload
		},
		userDetailError: (state, action) => {
			state.success = false;
			state.userDetail = null;
		},
	},
	extraReducers: {}
});

export const { userSuccess, userError, userDetailSuccess, userDetailError } = userSlice.actions;

export default userSlice.reducer;
