import '../css/styles.css';
import Navbar from './Pages/Navbar';
import Products from './Pages/Products';
import About from './Pages/About';
import React, { useEffect, useState } from 'react';
import Registration from './Pages/Registration';
import LoadingPage from './Components/SubComponents/LoadingPage';

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
import { getDocs, query, where } from 'firebase/firestore';

function App() {
  const dispatch = useDispatch();
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

        let userQuery = query(usersRef, where('userId', '==', userCred.uid));
        let data = {};
        getDocs(userQuery).then((dc) => {
          dc.forEach((e) => {
            data = { ...e.data() };
          });
          setUser({
            displayName: userCred.displayName,
            email: userCred.email,
            photoURL: userCred.photoURL,
            uid: userCred.uid,
            userFavorites: data.userFavorites,
            userBasket: data.userBasket,
            userStatus: true,
          });
        });
      }
      if (!userCred) {
        localStorage.setItem('userId', null);
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
            <Route path='/about' element={<About />} />

            <Route path='/productAdd' element={<CreateProductForm />} />
          </Routes>
        </div>
      </Router>
    </SkeletonTheme>
  );
}

export default App;
