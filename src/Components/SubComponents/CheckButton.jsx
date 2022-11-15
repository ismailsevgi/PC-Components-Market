import React from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_CHECK } from '../../Features/basketSlice';
import { useSetBasketMutation } from '../../Features/firebaseApi';

const userId = localStorage.getItem('userDocId');

function CheckButton({ id, value = true }) {
  const dispatch = useDispatch();
  const [setBasket] = useSetBasketMutation();

  return (
    <input
      type='checkbox'
      className='onoffswitch-checkbox'
      onClick={() => {
        if (userId != 'null') {
          setBasket({ type: 'check', productId: id });
        } else {
          dispatch(CHANGE_CHECK({ id, value }));
        }
      }}
      defaultChecked={value}
    />
  );
}

export default CheckButton;
