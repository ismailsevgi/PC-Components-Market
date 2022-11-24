import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTER, SET_PLACEMENT } from '../../Features/filterSlice';

function FilterBar() {
  const dispatch = useDispatch();
  let label = useSelector((state) => state.filter.label);
  let placement = useSelector((state) => state.filter.placement);

  return (
    <div className='filterBar'>
      <div className='radios'>
        <input
          type='radio'
          id='favorites'
          name='products'
          onClick={() => {
            dispatch(
              SET_FILTER({
                type: 'favorites',
                label: localStorage.getItem('userDocId'),
              })
            );
          }}
        />
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
        <div className='inputField'>
          <input
            className='form-control searchInput'
            placeholder='Seach product'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.target.value === '') {
                  dispatch(SET_FILTER({ type: 'filtering', label: 'all' }));
                } else {
                  dispatch(
                    SET_FILTER({ type: 'custom', label: e.target.value })
                  );
                }
              }
            }}
          />

          <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
        </div>

        <select
          value={placement}
          onChange={(e) => dispatch(SET_PLACEMENT(e.target.value))}
        >
          <option defaultValue={'newest'}>Newest</option>
          <option value={'LowToHigh'}>Price: Low to High</option>
          <option value={'HighToLow'}>Price: High to Low</option>
        </select>
        <label
          htmlFor='favorites'
          className={label === 'allProducts' ? 'label-activated' : 'label'}
        >
          <h3>Favorites</h3>
        </label>
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
      </div>
    </div>
  );
}

export default FilterBar;
