import React from 'react';
import { useDispatch } from 'react-redux';
import {
  REMOVE_FROM_BASKET,
  DECREASE_AMOUNT,
  INCREASE_AMOUNT,
} from '../../Features/basketSlice';
import { useSetBasketMutation } from '../../Features/firebaseApi';

const BasketButton = React.memo(({ icon, handle, id, stock }) => {
  const dispatch = useDispatch();
  const [setBasket] = useSetBasketMutation();
  const userId = localStorage.getItem('userId');
  console.log('Basket Button rendered ');

  const myFunc = (handle) => {
    if (handle === 'handleSub') {
      //If there is an user active in website, firebase functions will be executed
      //otherwise offline basket will be used.

      userId != 'null'
        ? setBasket({ type: 'decrease', productId: id })
        : dispatch(DECREASE_AMOUNT(id));
    }
    if (handle === 'handleDelete') {
      console.log('dellll');
      console.log(userId != 'null');
      userId != 'null'
        ? setBasket({ type: 'delete', productId: id })
        : dispatch(REMOVE_FROM_BASKET(id));
    }
    if (handle === 'handleAdd') {
      console.log('addd');
      userId != 'null'
        ? setBasket({ type: 'increase', productId: id, stock })
        : dispatch(INCREASE_AMOUNT(id));
    }
  };

  return (
    <button onClick={() => myFunc(handle)}>
      {icon === 'Add' && <i className='fa-solid fa-plus'></i>}
      {icon === 'Sub' && <i className='fa-solid fa-minus'></i>}
      {icon === 'Del' && <i className='fa-solid fa-trash-can'></i>}
    </button>
  );
});

export default BasketButton;
