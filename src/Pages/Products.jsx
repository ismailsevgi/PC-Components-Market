import React from 'react';

import ProductList from '../Components/List/ProductList';
import FilterBar from '../Components/Filter-Product/FilterBar';
import SideMiniFilterBar from '../Components/Filter-Product/SideMiniFilterBar';

function Products() {
  return (
    <div className='product'>
      <div className='container-fluid'>
        <div className='storePageWrapper'>
          <FilterBar />
          <SideMiniFilterBar />
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Products;
