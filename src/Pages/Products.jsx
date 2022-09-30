import React from 'react';
import Filter from '../Components/Filter-Product/Filter';
import ProductList from '../Components/List/ProductList';
import FilterBar from '../Components/Filter-Product/FilterBar';
function Products() {
  return (
    <div className='product'>
      <div className='container'>
        <FilterBar />
        <div className='listingPages'>
          <Filter />
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Products;
