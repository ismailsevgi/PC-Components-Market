import React from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_CHECK } from '../../Features/basketSlice';
import { useSetBasketMutation } from '../../Features/firebaseApi';

const userId = localStorage.getItem('userId');

function CheckButton({ id, value = true }) {
  const dispatch = useDispatch();
  const [setBasket] = useSetBasketMutation();

  return (
    <input
      type='checkbox'
      className='onoffswitch-checkbox'
      onClick={() => {
        if (userId) {
          //online basket change if there is an user
          setBasket({ type: 'check', productId: id });
        } else {
          //offline basket change if there is no user
          dispatch(CHANGE_CHECK({ id, value }));
        }
      }}
      defaultChecked={value}
    />
  );
}

export default CheckButton;
