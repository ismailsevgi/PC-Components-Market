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
import CreateProductForm from './Components/DashboardComponents/CreateProductForm';
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

function App() {
  const auth = getAuth();

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
    userStatus: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        localStorage.setItem('userId', userCred.uid);
        localStorage.setItem('userDocId', userCred.displayName);
        localStorage.setItem('userEmail', userCred.email);
        localStorage.setItem('userPhotoURL', userCred.photoURL);

        let userRef = doc(usersCollection, userCred.displayName);

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

          const userBasket = localStorage.getItem('userBasket');

          if (userBasket) {
            const basketItems = JSON.parse(userBasket).basketItems;
            updateDoc(userRef, {
              userBasket: [...dc.data().userBasket, ...basketItems],
            });
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
      }
    });
    unsub();
  }, []);

  return (
    <SkeletonTheme baseColor='#999999' highlightColor='#888888'>
      <Router>
        <div className='App'>
          <Navbar userDetails={user} />
          <Routes>
            <Route path='/loading' element={<LoadingPage />} />
            <Route path='/' element={<Navigate to='/store' />} />
            <Route path='/store' element={<Products />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/basket/:userId' element={<Basket />} />
            <Route path='/regist' element={<Registration />} />
            <Route
              path='/dashboard'
              element={<Dashboard userDetails={user} />}
            />
            <Route
              path='/productDetails/:id'
              element={
                <ProductDetailsPage
                  userDocId={localStorage.getItem('userDocId')}
                />
              }
            />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orderAccept/:orderId' element={<OrderAccept />} />

            <Route path='/productAdd' element={<CreateProductForm />} />
          </Routes>
        </div>
      </Router>
    </SkeletonTheme>
  );
}

export default App;
