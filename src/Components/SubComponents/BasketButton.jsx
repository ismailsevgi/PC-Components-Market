import React from 'react';
import { useDispatch } from 'react-redux';
import {
  REMOVE_FROM_BASKET,
  DECREASE_AMOUNT,
  INCREASE_AMOUNT,
} from '../../Features/basketSlice';

function BasketButton({ icon, handle, id }) {
  const dispatch = useDispatch();

  const myFunc = (handle) => {
    if (handle === 'handleSub') {
      console.log('subbb, gönderilen id:', id);
      dispatch(DECREASE_AMOUNT(id));
    }
    if (handle === 'handleDelete') {
      console.log('dellll');
      dispatch(REMOVE_FROM_BASKET(id));
    }
    if (handle === 'handleAdd') {
      console.log('addd');
      dispatch(INCREASE_AMOUNT(id));
    }
  };

  return (
    <button onClick={() => myFunc(handle)}>
      {icon === 'Add' && <i class='fa-solid fa-plus'></i>}
      {icon === 'Sub' && <i class='fa-solid fa-minus'></i>}
      {icon === 'Del' && <i class='fa-solid fa-trash-can'></i>}
    </button>
  );
}

export default BasketButton;
