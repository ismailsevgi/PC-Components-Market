import '../css/styles.css';
import Navbar from './Pages/Navbar';
import Products from './Pages/Products';
import About from './Pages/About';
import React from 'react';
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
import { saveUser } from './Features/userSlice';
import { useDispatch } from 'react-redux';
import Dashboard from './Pages/Dashboard';

function App() {
  /* NOTE: <Route path='/productDetails/:id' element={<ProductDetailsPage />} /> with ":id" 
    useParams going to return an object with "{ id: n} property "
  */

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(saveUser());
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
            <Route path='/regist' element={<Registration />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route
              path='/productDetails/:id'
              element={<ProductDetailsPage />}
            />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </Router>
    </SkeletonTheme>
  );
}

export default App;
