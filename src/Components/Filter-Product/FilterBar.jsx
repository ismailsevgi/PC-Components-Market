import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LIST_PRODUCTS } from '../../Features/productListSlice';

function FilterBar() {
  const [label, setLabel] = useState('allProducts');

  const dispatch = useDispatch();

  return (
    <div className='filterBar'>
      <div className='radios'>
        <input
          type='radio'
          id='allProducts'
          name='products'
          onClick={() => {
            setLabel('allProducts');
            dispatch(LIST_PRODUCTS('allProducts'));
          }}
        />
        <input
          type='radio'
          id='GPUs'
          name='products'
          onClick={() => {
            setLabel('GPUs');
            dispatch(LIST_PRODUCTS('GPUs'));
          }}
        />
        <input
          type='radio'
          id='CPUs'
          name='products'
          onClick={() => {
            setLabel('CPUs');
            dispatch(LIST_PRODUCTS('CPUs'));
          }}
        />
      </div>
      <div className='labels'>
        <span className='break'>|</span>
        <label
          htmlFor='allProducts'
          className={label === 'allProducts' ? 'label-activated' : 'label'}
        >
          <h3>All Products</h3>
        </label>
        <span className='break'>|</span>

        <label
          htmlFor='GPUs'
          className={label === 'GPUs' ? 'label-activated' : 'label'}
        >
          <h3>GPUs</h3>
        </label>
        <span className='break'>|</span>
        <label
          htmlFor='CPUs'
          className={label === 'CPUs' ? 'label-activated' : 'label'}
        >
          <h3>CPUs</h3>
        </label>
        <span className='break'>|</span>
        <span>Filter DropDown at the end</span>
      </div>
    </div>
  );
}

export default FilterBar;
