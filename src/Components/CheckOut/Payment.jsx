import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetOrderMutation } from '../../Features/firebaseApi';

/*Validate dom nesting div inside p succreligious*/
function Payment({ length, shipment, price, array }) {
  const [setOrder] = useSetOrderMutation();
  const navigate = useNavigate();

  function handlePayment(arr) {
    console.log('Proceeding to order...');
    let test = setOrder(arr);
    test.then((orderId) => {
      navigate(`/orderAccept/${orderId.data}`);
    });
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
      <div className='payment-items'>
        <div className='row1'>Items{`(${length})`}</div>
        <div className='row1'>${price ? price : 0}</div>
        <div className='row2'>Shipping</div>
        <div className='row2'>${shipment ? shipment : 0}</div>
        <div className='shipmentDiv row3'>
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
        </div>
        <div className='total'>Subtotal: </div>
        <div className='price'>{price + shipment}$</div>
      </div>
    </div>
  );
}

export default Payment;
