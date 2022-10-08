import React from 'react';
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

  return (
    <div key={id} className='productListItem'>
      <Link to={`/productDetails/` + id}>
        <div className='imageContainer'>
          <FavoriteBadge />
          <img className='productListItem-img' src={img || <Skeleton />} />
        </div>

        <h3 className='productListItem-title'>
          {title}

          <br></br>
          <span>${price}</span>
        </h3>
      </Link>

      <CardButton id={id} />
    </div>
  );
});

export default Card;
