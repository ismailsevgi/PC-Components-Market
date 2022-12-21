import './css/styles.css';
//PAGES
import Navbar from './Pages/Navbar';
import Products from './Pages/Products';

import React, { useEffect, useState } from 'react';
import Registration from './Pages/Registration';
import LoadingPage from './Components/SubComponents/LoadingPage';
import Orders from './Pages/Orders';
import Basket from './Pages/Basket';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import Dashboard from './Pages/Dashboard';
import CreateProductForm from './Components/DashboardComponents/CreateProduct/CreateProductForm';
import OrderAccept from './Pages/OrderAccept';

//Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

//SkeletonLoadingProvider
import { SkeletonTheme } from 'react-loading-skeleton';

//Firebase
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { usersRef as usersCollection } from './DataBASE/firebase.js';
import { useDispatch } from 'react-redux';
import { SET_USER } from './Features/userSlice';
import { SET_OFFLINE_BASKET } from './Features/basketSlice';
import { useSetBasketMutation } from './Features/firebaseApi';
import Footer from './Components/Footer/Footer';

function App() {
  const auth = getAuth();

  const dispatch = useDispatch();

  localStorage.setItem('userId', null);
  localStorage.setItem('userBasket', []);

  localStorage.setItem('userDocId', null);
  localStorage.setItem('userEmail', null);

  const [setBasket] = useSetBasketMutation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        localStorage.setItem('userDocId', userCred.uid);
        localStorage.setItem('userEmail', userCred.email);
        localStorage.setItem('userPhotoURL', userCred.photoURL);

        let userRef = doc(usersCollection, userCred.uid);

        getDoc(userRef).then((dc) => {
          localStorage.setItem('userName', dc.data().userName);
          localStorage.setItem('userFavorites', dc.data().userFavorites);

          dispatch(
            SET_USER({
              displayName: dc.data().userName,
              email: dc.data().email,
              photoURL: userCred.photoURL,
              uid: userCred.uid,
              userFavorites: dc.data().userFavorites,
              userBasket: dc.data().userBasket,
              userStatus: true,
              userName: dc.data().userName,
            })
          );

          const { basketItems } = JSON.parse(
            localStorage.getItem('userBasket')
          );

          if (basketItems.length > 0) {
            setBasket({ type: 'merge', basketItems });
          }

          setUser({
            displayName: dc.data().userName,
            email: dc.data().email,
            photoURL: userCred.photoURL,
            uid: userCred.uid,
            userFavorites: dc.data().userFavorites,
            userBasket: dc.data().userBasket,
            userStatus: true,
          });
        });
      }
      if (!userCred) {
        localStorage.setItem('userId', null);

        localStorage.setItem('userDocId', null);
        localStorage.setItem('userEmail', null);
        dispatch(SET_OFFLINE_BASKET(localStorage.getItem('userBasket')));
        dispatch(
          SET_USER({
            displayName: '',
            email: '',
            photoURL: '',
            uid: '',
            userFavorites: '',
            userBasket: '',
            userStatus: false,
            userName: '',
          })
        );
      }
    });
    unsub();
  }, []);

  return (
    <SkeletonTheme baseColor='#999999' highlightColor='#888888'>
      <Router>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/loading' element={<LoadingPage />} />
            <Route path='/' element={<Navigate to='/store' />} />
            <Route path='/store' element={<Products />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/basket/:userId' element={<Basket />} />
            <Route path='/regist' element={<Registration />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route
              path='/productDetails/:id'
              element={<ProductDetailsPage />}
            />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orderAccept/:orderId' element={<OrderAccept />} />

            <Route path='/productAdd' element={<CreateProductForm />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </SkeletonTheme>
  );
}

export default App;
