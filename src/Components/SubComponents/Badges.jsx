import React from 'react';
import { useSelector } from 'react-redux';

//Basket Item Counter
function BasketBadge() {
  //Gets recent amount of basket items
  const itemsInBasket = useSelector((state) => {
    return state.basket.basketItems;
  });

  //Underline problem with yusuf
  return (
    <span className='badge'>
      <p>{itemsInBasket.length}</p>
    </span>
  );
}

//Favorite Badge

function FavoriteBadge() {
  const element = <i className='fa-solid fa-heart'></i>;
  return (
    <div className='badge'>
      <div className='saleBadge'>
        <i className='fa-regular fa-heart'></i>
      </div>
    </div>
  );
}

export { BasketBadge, FavoriteBadge };
