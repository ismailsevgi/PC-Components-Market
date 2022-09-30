import '../css/styles.css';
import Navbar from './Pages/Navbar';
import Products from './Pages/Products';
import About from './Pages/About';
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Basket from './Pages/Basket';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  /* NOTE: <Route path='/productDetails/:id' element={<ProductDetailsPage />} /> with ":id" 
    useParams going to return an object with "{ id: n} property "
  */

  return (
    <SkeletonTheme baseColor='#999999' highlightColor='#888888'>
      <Router>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/basket' element={<Basket />} />

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
