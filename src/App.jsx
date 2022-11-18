import '../css/styles.css';
import Navbar from './Pages/Navbar';
import Products from './Pages/Products';
import About from './Pages/About';
import React, { useEffect, useState } from 'react';
import Registration from './Pages/Registration';
import LoadingPage from './Components/SubComponents/LoadingPage';
import Orders from './Pages/Orders';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import Basket from './Pages/Basket';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useDispatch } from 'react-redux';
import Dashboard from './Pages/Dashboard';
import CreateProductForm from './Components/DashboardComponents/CreateProductForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { usersRef } from './DataBASE/firebase';
import { doc, getDoc } from 'firebase/firestore';
import OrderAccept from './Pages/OrderAccept';
import { usersRef as usersCollection } from './DataBASE/firebase.js';

function App() {
  const auth = getAuth();

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

        let userRef = doc(usersCollection, userCred.displayName);

        getDoc(userRef).then((dc) => {
          localStorage.setItem('userName', dc.data().userName);
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
            <Route path='/store' element={<Products userDetails={user} />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/basket/:userId' element={<Basket />} />
            <Route path='/regist' element={<Registration />} />
            <Route
              path='/dashboard'
              element={<Dashboard userDetails={user} />}
            />
            <Route
              path='/productDetails/:id'
              element={<ProductDetailsPage />}
            />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orderAccept/:orderId' element={<OrderAccept />} />
            <Route path='/about' element={<About />} />

            <Route path='/productAdd' element={<CreateProductForm />} />
          </Routes>
        </div>
      </Router>
    </SkeletonTheme>
  );
}

export default App;
