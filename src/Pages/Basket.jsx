import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../Components/SubComponents/Spinner';

// import BasketList from '../Components/List/BasketList';
// import Payment from '../Components/CheckOut/Payment';

const Payment = React.lazy(() => import('../Components/CheckOut/Payment'));
const BasketList = React.lazy(() => import('../Components/List/BasketList'));

import {
  useSetBasketMutation,
  useGetBasketQuery,
} from '../Features/firebaseApi';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Basket = () => {
  //if there is an online user it will use params to get user's current basket from database
  const params = useParams();
  const itemsInBasket = useSelector((state) => {
    return state.basket.basketItems;
  });

  console.log('Basket Rendered....');

  const { isFetching, data, error, isError } = useGetBasketQuery(
    localStorage.getItem('userDocId')
  );

  useEffect(() => {
    data && console.log('Data geldi: ', data);
  }, [isFetching]);

  useEffect(() => {
    isError && toast.error("We could't fetch your basket");
  }, [isError]);

  useEffect(() => {}, [itemsInBasket]);

  console.log('ItemsInBasket: ', itemsInBasket);

  return (
    <div className='basket'>
      <div className='basketNav'>
        <div className='basketNav-Title'>
          <h1>Shopping Basket</h1>
          <button className='btn btn-danger'>Delete all items</button>
        </div>
        <div className='priceFont'>Price</div>
      </div>

      <div className='basketContainer'>
        <Suspense>
          <BasketList
            itemsInBasket={params.userId ? data : itemsInBasket}
            userStatus={params.userId ? true : false}
          />
          <Payment array={params.userId ? data : itemsInBasket} />
        </Suspense>
      </div>
    </div>
  );
};

export default Basket;
