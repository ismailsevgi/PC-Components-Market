import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTER } from '../../Features/filterSlice';

function FilterBar() {
  const dispatch = useDispatch();
  let label = useSelector((state) => state.filter.label);

  return (
    <div className='filterBar'>
      <div className='radios'>
        <input
          type='radio'
          id='allProducts'
          name='products'
          onClick={() => {
            dispatch(SET_FILTER({ type: 'filtering', label: 'all' }));
          }}
        />
        <input
          type='radio'
          id='GPU'
          name='products'
          onClick={() => {
            dispatch(SET_FILTER({ type: 'filtering', label: 'gpu' }));
          }}
        />
        <input
          type='radio'
          id='CPU'
          name='products'
          onClick={() => {
            dispatch(SET_FILTER({ type: 'filtering', label: 'cpu' }));
          }}
        />
        <input
          type='radio'
          id='mobo'
          name='products'
          onClick={() => {
            dispatch(SET_FILTER({ type: 'filtering', label: 'mobo' }));
          }}
        />
        <input
          type='radio'
          id='ram'
          name='products'
          onClick={() => {
            dispatch(SET_FILTER({ type: 'filtering', label: 'ram' }));
          }}
        />
        <input
          type='radio'
          id='ssd'
          name='products'
          onClick={() => {
            dispatch(SET_FILTER({ type: 'filtering', label: 'ssd' }));
          }}
        />
        <input
          type='radio'
          id='hdd'
          name='products'
          onClick={() => {
            dispatch(SET_FILTER({ type: 'filtering', label: 'hdd' }));
          }}
        />
        <input
          type='radio'
          id='case'
          name='products'
          onClick={() => {
            dispatch(SET_FILTER({ type: 'filtering', label: 'case' }));
          }}
        />
        <input
          type='radio'
          id='psu'
          name='products'
          onClick={() => {
            dispatch(SET_FILTER({ type: 'filtering', label: 'psu' }));
          }}
        />
      </div>
      <div className='labels'>
        <label
          htmlFor='allProducts'
          className={label === 'allProducts' ? 'label-activated' : 'label'}
        >
          <h3>All</h3>
        </label>

        <label
          htmlFor='GPU'
          className={label === 'GPUs' ? 'label-activated' : 'label'}
        >
          <h3>GPU</h3>
        </label>

        <label
          htmlFor='CPU'
          className={label === 'CPUs' ? 'label-activated' : 'label'}
        >
          <h3>CPU</h3>
        </label>

        <label
          htmlFor='mobo'
          className={label === 'mobo' ? 'label-activated' : 'label'}
        >
          <h3>Motherboard</h3>
        </label>

        <label
          htmlFor='ram'
          className={label === 'ram' ? 'label-activated' : 'label'}
        >
          <h3>RAM</h3>
        </label>

        <label
          htmlFor='ssd'
          className={label === 'ssd' ? 'label-activated' : 'label'}
        >
          <h3>SSD</h3>
        </label>

        <label
          htmlFor='hdd'
          className={label === 'hdd' ? 'label-activated' : 'label'}
        >
          <h3>HDD</h3>
        </label>

        <label
          htmlFor='case'
          className={label === 'case' ? 'label-activated' : 'label'}
        >
          <h3>Case</h3>
        </label>

        <label
          htmlFor='psu'
          className={label === 'psu' ? 'label-activated' : 'label'}
        >
          <h3>PSU</h3>
        </label>

        <span>DropDown</span>
      </div>
    </div>
  );
}

export default FilterBar;
