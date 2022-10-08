import React from 'react';

import ProductList from '../Components/List/ProductList';
import FilterBar from '../Components/Filter-Product/FilterBar';

function Products() {
  return (
    <div className='product'>
      <div className='container'>
        <FilterBar />
        <div className='listingPages'>
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Products;
