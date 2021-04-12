import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

import authService from '../../services/authService';
import { loadingStatus } from '../global/globalSlice';


export const setSession = access_token => {
	if (access_token) {
		localStorage.setItem('access_token', access_token);
		axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
	} else {
		localStorage.removeItem('access_token');
		delete axios.defaults.headers.common.Authorization;
	}
};



export const authLogin = (param, history) => async dispatch => {
	dispatch(loadingStatus(true))
	return authService
		.authLogin(param)
		.then(async res => {
			if (res.data.ExceptionError) {
				setSession(null)
				toast.error(res.data.Message)
			} else {
				await setSession(res?.data?.Data?.id_token)
				dispatch(authEmailSuccess(param?.username))
				dispatch(authSuccess(res?.data));
				await history.push("/coupons")
			}

			return dispatch(loadingStatus(false))
		})
		.catch(error => {
			setSession(null)
			dispatch(loadingStatus(false))
			toast.error("Invalid loging detail")
			return dispatch(authError(error));
		});
};


export const authLogout = (param, history) => async dispatch => {
	setSession(null)
	localStorage.clear()
	dispatch(authEmailSuccess(null))
	return dispatch(authSuccess(null));

};

const initialState = {
	success: false,
	userData: null,
	email: null
};

const authSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {

		authSuccess: (state, action) => {
			state.success = true;
			state.userData = action.payload;

		},
		authEmailSuccess: (state, action) => {
			state.email = action.payload
		},
		authError: (state, action) => {
			state.success = false;
			state.userData = null;
		},
	},
	extraReducers: {}
});

export const { authSuccess, authError, authEmailSuccess } = authSlice.actions;

export default authSlice.reducer;
