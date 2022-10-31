import React, { useEffect, useState } from 'react';
import CardButton from '../SubComponents/CardButton';
import { FavoriteBadge } from '../SubComponents/Badges';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Card = React.memo(({ id, title, img, price, tag, stock }) => {
  /*Link Note: <Link to={`/productDetails/id=` + id}> means saving id into the URL
    Without "id=" is also useable but to clarification, I wanted to leave it.
  */
  //Stock is for later arrangements

  console.log("Card'a gelen id: ", id);

  return (
    <div key={id} className='productListItem'>
      <Link to={`/productDetails/` + id}>
        <div className='imageContainer'>
          <img className='productListItem-img' src={img || <Skeleton />} />
        </div>

        <h3 className='productListItem-title'>
          {title.slice(0, 30)}

          <br></br>
          <span>${price}</span>
        </h3>
      </Link>
      <div className='buttons'>
        <CardButton id={id} />
        <button className='favoriteContainer'>
          <FavoriteBadge id={id} />
        </button>
      </div>
    </div>
  );
});

export default Card;
