import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetOrderMutation } from '../../Features/firebaseApi';

const initialBasketState = { price: 0, shipment: 0 };

/*Validate dom nesting div inside p succreligious*/
function Payment({ array }) {
  const [setOrder] = useSetOrderMutation();
  const navigate = useNavigate();
  console.log("Payment'a gelen array: ", array);

  const [total, setTotal] = useState(initialBasketState);
  const userDocId = localStorage.getItem('userDocId');

  function handlePayment(arr) {
    console.log('Proceeding to order...', localStorage.getItem('userDocId'));

    if (userDocId == 'null') {
      toast.error('You have to login first');
    } else {
      let test = setOrder(arr);
      test.then((orderId) => {
        navigate(`/orderAccept/${orderId.data}`);
      });
    }
  }

  useEffect(() => {
    if (array?.length) {
      const output = array.reduce(
        (prev, cur) => {
          if (cur.check) {
            return {
              price: prev.price + cur.price * cur.quantity,
              shipment: prev.shipment >= 100 ? 0 : prev.shipment + cur.shipment,
            };
          } else {
            return { price: prev.price + 0, shipment: prev.shipment + 0 };
          }
        },
        { price: 0, shipment: 0 }
      );

      //Arranges shipment cost if its higher than 100
      setTotal(() => {
        if (output.shipment > 100) {
          return { ...output, shipment: 0 };
        } else {
          return output;
        }
      });
    } else {
      setTotal(initialBasketState);
    }
  }, [array]);

  return (
    <div className='payment'>
      <button
        onClick={() => handlePayment(array)}
        className='payment-button mt-1'
        disabled={array?.length > 0 ? false : true}
      >
        Proceed to checkout
      </button>
      <hr></hr>
      <div className='payment-items'>
        <div className='row1'>Items{`(${array?.length})`}</div>
        <div className='row1'>${total?.price ? total?.price : 0}</div>
        <div className='row2'>Shipping</div>
        <div className='row2'>${total?.shipment ? total.shipment : 0}</div>
        <div className='shipmentDiv row3'>
          {array?.length === 0 ? (
            <></>
          ) : array?.length < 4 && array?.shipment < 100 ? (
            <div className='shipmentDetails'>
              <span className='green'>To get free shipment</span>
              <span className='red'>{` add ${
                4 - array?.length
              } more different items !`}</span>
            </div>
          ) : (
            <div className='shipmentDetails'>
              <span className='green'>Free Shipment!</span>
            </div>
          )}
        </div>
        <div className='total'>Subtotal: </div>
        <div className='price'>{total?.price + total?.shipment}$</div>
      </div>
    </div>
  );
}

export default Payment;
