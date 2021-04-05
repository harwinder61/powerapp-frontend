import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import { loadingStatus } from '../global/globalSlice';


export const authLogin = (param, history) => async dispatch => {
	dispatch(loadingStatus(true))
    return authService
		.authLogin(param)
		.then(res => {
			if(res.data.ExceptionError) {
				toast.error(res.data.Message)
			} else {
				dispatch(authEmailSuccess(param?.username))
				dispatch(authSuccess(res?.data));
				 history.push("/dashboard")
			}
			
			return dispatch(loadingStatus(false))
		})
		.catch(error => {
			dispatch(loadingStatus(false))
			toast.error("Invalid loging detail")
			return dispatch(authError(error));
		});
};


export const authLogout = (param, history) => async dispatch => {
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

export const {  authSuccess, authError, authEmailSuccess } = authSlice.actions;

export default authSlice.reducer;
