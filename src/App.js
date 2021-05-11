import React, { useEffect } from 'react';

import './App.scss';
import Routers from './route.js';
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";
import axios from 'axios';

import { store, persistor } from "./store";
import Interceptor from "./utils/interceptors"
library.add(fab, far, fas);
Interceptor.setupInterceptors(store);

const App = () => {
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("access_token")}`
    }
  }, [token]);

  return (
    <div className="main-container">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routers />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
