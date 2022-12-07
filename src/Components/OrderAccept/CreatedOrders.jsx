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
          <h3>{product.title.slice(0, 50)}</h3>
        </div>
        <br></br>
        <h5>Seller: {product.seller}</h5>
        <h5>
          <span>Estimated delivery time:</span>
          <span> From {dateTwoDays}</span>
          <span> to {dateSevenDays}</span>
        </h5>
      </div>
    </div>
  );
}
