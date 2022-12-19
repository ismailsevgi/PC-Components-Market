import React from 'react';
import CardButton from '../SubComponents/CardButton';
import { FavoriteBadge } from '../SubComponents/Badges';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Card = React.memo(({ id, title, img, price, tag, stock, saleRate }) => {
  /*Link Note: <Link to={`/productDetails/id=` + id}> means saving id into the URL
    Without "id=" is also useable but to clarification, I wanted to leave it.
  */
  //Stock is for later arrangements

  let userDocId = localStorage.getItem('userDocId');

  return (
    <div key={id} className='productListItem'>
      <div className='imageContainer'>
        <button className='favoriteDiv'>
          {userDocId != 'null' ? <FavoriteBadge id={id} /> : <span></span>}
        </button>
        <Link to={`/productDetails/` + id}>
          <img className='productListItem-img' src={img || <Skeleton />} />
        </Link>
      </div>

      <div className='productListItem-title'>
        <div className='title'>
          <Link to={`/productDetails/` + id}>{title.slice(0, 40)}</Link>
        </div>
        {saleRate > 0 ? (
          <div className='priceContainer'>
            <div className='priceContainer-old'>
              <div className='saleContainer'>
                <span className='saleContainer-oldPrice'>{price}$</span>

                <span className='saleContainer-rate'>{'%' + saleRate}</span>
              </div>
              <span className='currentPrice'>
                {(price - (price / 100) * saleRate).toFixed(2)}$
              </span>
            </div>
          </div>
        ) : (
          <div className='priceContainer'>
            <span>{''}</span>
            <span className='currentPrice'>{price.toFixed(2)}$</span>
          </div>
        )}
      </div>

      <CardButton id={id} />
    </div>
  );
});

export default Card;
