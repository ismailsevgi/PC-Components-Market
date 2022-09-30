import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Payment from '../Components/CheckOut/Payment';
import BasketList from '../Components/List/BasketList';

//Sub Components
// import BasketButton from '../Components/SubComponents/BasketButton';
// import CheckButton from '../Components/SubComponents/CheckButton';

//Shipment cost rate will be determined by seller
//Gift Checkbox and Animation

const initialBasketState = { price: 0, shipment: 0 };

function Basket() {
  const itemsInBasket = useSelector((state) => {
    return state.basket.basketItems;
  });

  const [total, setTotal] = useState(initialBasketState);

  useEffect(() => {
    //if basket has any item init. Reduce will do its job.
    //if basket is empty then total will be set to its initialState
    if (itemsInBasket.length > 0) {
      const output = itemsInBasket.reduce(
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
  }, [itemsInBasket]);
  return (
    <div className='basket'>
      <div className='basketNav'>
        <div className='basketNav-Title'>
          <h1>Shopping Basket</h1>
          <p>Delete all items</p>
        </div>
        <span>Price</span>
      </div>

      <div className='container'>
        <BasketList />
        <Payment
          price={total.price}
          shipment={total.shipment}
          length={itemsInBasket.length}
        />
      </div>
    </div>
  );
}

export default Basket;
