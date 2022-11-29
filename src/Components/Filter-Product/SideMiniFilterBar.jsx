import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTER, SET_PLACEMENT } from '../../Features/filterSlice';

import imagesObj from '../../DataBASE/importedImages';

const opened = (animDelay) => {
  return {
    animationName: 'wave',
    visibility: 'hidden',
    animationDuration: '.8s',
    animationFillMode: 'forwards',
    animationDelay: animDelay,
  };
};

const closed = (animDelay) => {
  return {
    animationName: 'waveReverse',
    animationDuration: '.8s',
    animationDelay: animDelay,
    animationFillMode: 'forwards',
  };
};

function SideMiniFilterBar() {
  const dispatch = useDispatch();

  const [menuStatus, setMenuState] = useState(false);
  const [searchStatus, setSearchState] = useState(false);

  let label = useSelector((state) => state.filter.label);
  let placement = useSelector((state) => state.filter.placement);
  let userDocId = localStorage.getItem('userDocId');

  return (
    <div className='mini-filterBar'>
      <div className='mini-radios'>
        <input
          type='checkbox'
          name='menu-opener'
          id='menu-opener'
          onClick={() => setMenuState((prev) => !prev)}
        />

        {userDocId != 'null' && (
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
        )}

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
      <div className='labelsWrapper'>
        <label
          htmlFor='menu-opener'
          className={menuStatus ? 'menu-opened' : 'menu-closed'}
        >
          <i class='fas fa-bars'></i>
        </label>
        <div
          className='searchField'
          style={searchStatus ? { display: 'block' } : { display: 'none' }}
        >
          <div className='inputField'>
            <input
              className='form-control searchInput'
              placeholder='Seach product'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (e.target.value === '') {
                    dispatch(SET_FILTER({ type: 'filtering', label: 'all' }));
                    setSearchState(false);
                  } else {
                    dispatch(
                      SET_FILTER({ type: 'custom', label: e.target.value })
                    );
                    setSearchState(false);
                  }
                }
              }}
            />

            <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
          </div>

          <select
            value={placement}
            onChange={(e) => {
              dispatch(SET_PLACEMENT(e.target.value));
              setSearchState(false);
            }}
          >
            <option defaultValue={'newest'}>Newest</option>
            <option value={'LowToHigh'}>Price: Low to High</option>
            <option value={'HighToLow'}>Price: High to Low</option>
          </select>
        </div>
        <div className='mini-labels'>
          <label
            htmlFor='allProducts'
            className={label === 'search' ? 'label-activated' : 'label'}
            style={menuStatus ? opened('.1s') : closed('1s')}
            onClick={() => {
              setSearchState((prev) => !prev);
            }}
          >
            <img src={imagesObj.arrowColor} />
          </label>
          {userDocId != 'null' && (
            <label
              htmlFor='favorites'
              style={menuStatus ? opened('.2s') : closed('.9s')}
              className={
                label === localStorage.getItem('userDocId')
                  ? 'label-activated'
                  : 'label'
              }
            >
              <img src={imagesObj.hearthColor} />
            </label>
          )}

          <label
            htmlFor='GPU'
            className={label === 'gpu' ? 'label-activated' : 'label'}
            style={menuStatus ? opened('.3s') : closed('.8s')}
          >
            <img src={imagesObj.transGpu} />
          </label>

          <label
            htmlFor='CPU'
            className={label === 'cpu' ? 'label-activated' : 'label'}
            style={menuStatus ? opened('.4s') : closed('.7s')}
          >
            <img src={imagesObj.transCpu} />
          </label>

          <label
            htmlFor='mobo'
            className={label === 'mobo' ? 'label-activated' : 'label'}
            style={menuStatus ? opened('.5s') : closed('.6s')}
          >
            <img src={imagesObj.transMobo} />
          </label>

          <label
            htmlFor='ram'
            className={label === 'ram' ? 'label-activated' : 'label'}
            style={menuStatus ? opened('.6s') : closed('.5s')}
          >
            <img src={imagesObj.transRam} />
          </label>

          <label
            htmlFor='ssd'
            className={label === 'ssd' ? 'label-activated' : 'label'}
            style={menuStatus ? opened('.7s') : closed('.4s')}
          >
            <img src={imagesObj.transSsd} />
          </label>

          <label
            htmlFor='hdd'
            className={label === 'hdd' ? 'label-activated' : 'label'}
            style={menuStatus ? opened('.8s') : closed('.3s')}
          >
            <img src={imagesObj.transHdd} />
          </label>

          <label
            htmlFor='case'
            className={label === 'case' ? 'label-activated' : 'label'}
            style={menuStatus ? opened('.9s') : closed('.2s')}
          >
            <img src={imagesObj.transCase} />
          </label>

          <label
            htmlFor='psu'
            className={label === 'psu' ? 'label-activated' : 'label'}
            style={menuStatus ? opened('1s') : closed('.1s')}
          >
            <img src={imagesObj.transPsu} />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SideMiniFilterBar;
