import React from 'react';
import Filter from '../Components/Filter-Product/Filter';
import ProductList from '../Components/List/ProductList';

function Products() {
  return (
    <div className='product'>
      <div className='container'>
        <div className='listingPages'>
          <Filter />
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Products;
