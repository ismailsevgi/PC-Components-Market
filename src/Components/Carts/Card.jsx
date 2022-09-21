import React from 'react';
import CardButton from '../SubComponents/CardButton';

function Card({ id, title, img, body, price }) {
  return (
    <div key={id} className='productListItem'>
      <img className='productListItem-img' src={img} />
      <h3 className='productListItem-title'>
        {title}

        <span>{body}</span>
        <br></br>
        <span>${price}</span>
      </h3>
      <CardButton id={id} />
    </div>
  );
}

export default Card;
