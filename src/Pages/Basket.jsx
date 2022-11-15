import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Payment from '../Components/CheckOut/Payment';
import Spinner from '../Components/SubComponents/Spinner';
import BasketList from '../Components/List/BasketList';

import {
  useSetBasketMutation,
  useGetBasketQuery,
} from '../Features/firebaseApi';

import { useParams } from 'react-router-dom';

const initialBasketState = { price: 0, shipment: 0 };

const Basket = () => {
  console.log('Basket Rendered...: ');
  const params = useParams();

  const itemsInBasket = useSelector((state) => {
    return state.basket.basketItems;
  });

  const { isFetching, data, error, isError } = useGetBasketQuery();
  console.log('Basket.jsx Data: ', data);
  useEffect(() => {
    //data geldiği anda basketSlice'a dispatch etmem gerek
    if (data !== 'error' && data !== undefined) {
      const output = data.reduce(
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
  }, [isFetching]);

  useEffect(() => {
    isError && console.log('FETCH: ', error, error.message);
  }, [isError]);

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
        <BasketList
          itemsInBasket={params.userId ? data : itemsInBasket}
          userStatus={params.userId ? true : false}
        />
        <Payment
          price={total.price}
          shipment={total.shipment}
          length={itemsInBasket.length}
          array={params.userId ? data : itemsInBasket}
        />
      </div>
    </div>
  );
};

export default Basket;
