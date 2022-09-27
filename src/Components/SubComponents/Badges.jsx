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
    <div className='badge'>
      <p>{itemsInBasket.length}</p>
    </div>
  );
}

//Favorite Badge

function FavoriteBadge() {
  const element = <i class='fa-solid fa-heart'></i>;
  return (
    <div className='badge'>
      <div className='saleBadge'>
        <i class='fa-regular fa-heart'></i>
      </div>
    </div>
  );
}

export { BasketBadge, FavoriteBadge };
