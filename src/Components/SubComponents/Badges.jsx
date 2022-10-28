import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBIcon } from 'mdb-react-ui-kit';
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

function FavoriteBadge({
  top = 0,
  right = 0,
  fontSize = '1rem',
  solid = false,
}) {
  //if props gives some value that means badge has to be a position property with top and high values.
  //if badge
  if (top && right) {
    return (
      <div
        className='favBadge'
        style={{
          position: 'absolute',
          top: top,
          right: right,
          fontSize: fontSize,
        }}
      >
        {solid ? <MDBIcon fas icon='heart' /> : <MDBIcon far icon='heart' />}
      </div>
    );
  } else {
    return (
      <div className='favBadge' style={{ fontSize: fontSize }}>
        {solid ? <MDBIcon fas icon='heart' /> : <MDBIcon far icon='heart' />}
      </div>
    );
  }
}

export { BasketBadge, FavoriteBadge };
