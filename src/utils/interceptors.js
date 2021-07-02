/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
import axios from 'axios';
import { uuid } from 'uuidv4';
import { toast } from 'react-toastify';
import { authLogout } from "../store/auth/authSlice"


export default {
    setupInterceptors: (store) => {
        axios.interceptors.request.use(function (config) {
            config.headers["Request-Id"] = uuid();

            return config;
        }, (error) => {
            return Promise.reject(error);
        })
        axios.interceptors.response.use(response => {
        
            return response;
        } , (error) => {
            console.log("res error 1", error.response)
            if (error?.response?.status === 401) {
                toast.error("Token expired")
                store.dispatch(authLogout());
                // history.push('/')
            }
            
            return Promise.reject(error);
        })
    }
    
}

// setupInterceptors: (store) => {
//     axios.interceptors.response.use(response => {
        
//         return response;
//     }
