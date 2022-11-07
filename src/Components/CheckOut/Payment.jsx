import React from 'react';
import { useSetOrderMutation } from '../../Features/firebaseApi';

/*Validate dom nesting div inside p succreligious*/
function Payment({ length, shipment, price, array }) {
  const [setOrder] = useSetOrderMutation();

  function handlePayment(arr) {
    console.log('Proceeding to order...');
    setOrder(arr);
  }

  return (
    <div className='payment'>
      <button
        onClick={() => handlePayment(array)}
        className='payment-button mt-1'
      >
        Proceed to checkout
      </button>
      <hr></hr>
      <div className='payment-items mt-1'>
        <span>Items{`(${length})`}</span>
        <span>${price ? price : 0}</span>
      </div>
      <div className='payment-items mt-1'>
        <span>Shipping</span>
        <span>${shipment ? shipment : 0}</span>
      </div>
      <div className='payment-items mt-1'>
        <p>
          {length === 0 ? (
            <></>
          ) : length < 4 && shipment < 100 ? (
            <div className='shipmentDetails'>
              <span className='green'>To get free shipment</span>
              <span className='red'>{` add ${
                4 - length
              } more different items !`}</span>
            </div>
          ) : (
            <div className='shipmentDetails'>
              <span className='green'>Free Shipment!</span>
            </div>
          )}
        </p>
      </div>
      <hr></hr>
      <div className='payment-items mt-1'>
        <span>Subtotal: </span>
        <span>{price + shipment}$</span>
      </div>
    </div>
  );
}

export default Payment;
