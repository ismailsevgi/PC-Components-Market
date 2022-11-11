import React from 'react';

import { format, addDays } from 'date-fns';

export default function CreatedOrders({ product }) {
  let dateTwoDays = format(addDays(new Date(), 2), 'MMM/dd');
  let dateSevenDays = format(addDays(new Date(), 7), 'MMM/dd/yyyy');

  console.log('product: ', product);
  return (
    <div key={product.id} className='productContainer'>
      <div className='imageContainer'>
        <img src={product.productImageUrl} />
      </div>
      <div className='productDetails'>
        <div className='title'>
          <h3>{product.title}</h3>
          <h5>Status: Waiting</h5>
        </div>
        <br></br>
        <h5>Seller: {product.seller}</h5>
        <h5>
          Estimated delivery time: From {dateTwoDays} to {dateSevenDays}
        </h5>
      </div>
    </div>
  );
}
