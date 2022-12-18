import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function OfflineBasketBadge() {
  //Gets recent amount of basket items

  const itemsInBasket = useSelector((state) => {
    return state.basket.basketItems;
  });

  return (
    <span className='badge'>
      <p>{itemsInBasket.length}</p>
    </span>
  );
}

export default OfflineBasketBadge;
