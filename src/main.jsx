import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './Features/Store';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faRightFromBracket,
  faQuestion,
  faUpload,
  faMagnifyingGlass,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

library.add(
  faRightFromBracket,
  faQuestion,
  faUpload,
  faMagnifyingGlass,
  faCartShopping
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={1500} position='bottom-left' />
      <App />
    </Provider>
  </React.StrictMode>
);
