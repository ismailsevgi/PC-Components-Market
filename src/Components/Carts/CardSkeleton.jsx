import React from 'react';
import Skeleton from 'react-loading-skeleton';

function CardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((n) => {
      return (
        <div className='card-skeleton'>
          <div className='card-skeleton-box'>
            <Skeleton />
          </div>
          <div className='card-skeleton-title'>
            <Skeleton />
          </div>
          <div className='card-skeleton-title'>
            <Skeleton />
          </div>

          <div className='card-skeleton-price'>
            <Skeleton />
          </div>

          <div className='card-skeleton-button'>
            <Skeleton />
          </div>
        </div>
      );
    });
}

export default CardSkeleton;
