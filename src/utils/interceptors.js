/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
import axios from 'axios';
import { uuid } from 'uuidv4';

export default {
    setupInterceptors: (store) => {
        axios.interceptors.request.use(function (config) {
            config.headers["Request-Id"] = uuid();

            return config;
        }, (error) => {
            console.log("res error", error.response)
            // if (error?.response?.status === 401) {
            //     localStorage.clear()
            
            //     // store.dispatch(Actions2.showMessage({
            //     //     message: 'Session Expired',
            //     //     anchorOrigin: {
            //     //         vertical: 'top',
            //     //         horizontal: 'center'
            //     //     }
            //     // }));
            //     history.push('/')
            // }
            
            return Promise.reject(error);
        })
    }
}