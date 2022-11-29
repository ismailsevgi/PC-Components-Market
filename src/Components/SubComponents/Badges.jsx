import { getAuth } from 'firebase/auth';
import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useAddFavoritesMutation,
  useGetBasketQuery,
  useGetFavoritesQuery,
} from '../../Features/firebaseApi';

//Basket Item Counter
function BasketBadge() {
  const [productAmount, setProductAmount] = useState(0);
  const { data, error, isFetching } = useGetBasketQuery();

  //Gets recent amount of basket items
  const itemsInBasket = useSelector((state) => {
    return state.basket.basketItems;
  });

  useEffect(() => {
    if (data !== 'error' && data !== undefined) {
      console.log('TEST 1');
      setProductAmount(data.length);
    } else {
      console.log('TEST 2');
      setProductAmount(itemsInBasket.length);
    }
  }, [isFetching, itemsInBasket]);

  //Underline problem with yusuf
  return (
    <span className='badge'>
      <p>{productAmount}</p>
    </span>
  );
}

//Favorite Badge

function FavoriteBadge({ fontSize = '1rem', id }) {
  const params = useParams();
  const [addFavorites] = useAddFavoritesMutation();
  const { isFetching, isError, error, data } = useGetFavoritesQuery();
  const auth = getAuth();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    if (data?.includes(id)) {
      setSolid(true);
    } else {
      setSolid(false);
    }
  }, [isFetching]);

  //favori butonu buraya çek
  //fetch true ise disable et
  return (
    <div className='favoriteContainer' disabled={!isFetching}>
      {solid ? (
        <MDBIcon
          fas
          icon='heart'
          onClick={() => {
            addFavorites({ id: auth.currentUser.uid, url: id });
          }}
        />
      ) : (
        <MDBIcon
          far
          icon='heart'
          onClick={() => {
            addFavorites({ id: auth.currentUser.uid, url: id });
          }}
        />
      )}
    </div>
  );
}

function StarsBadge({ amount }) {
  let myArray = new Array(3).fill(0);

  return (
    <div className='starsContainer'>
      <div className='condition'>Condition:</div>
      <div className='stars'>
        <div className='light'>
          {new Array(amount).fill(0).map((n) => {
            console.log('mapped');
            return <MDBIcon key={n} icon='star' />;
          })}
        </div>
        <div className='dark'>
          {new Array(5 - amount).fill(0).map((n) => {
            console.log('mapped');
            return <MDBIcon key={n} icon='star' />;
          })}
        </div>
      </div>
      <p></p>
    </div>
  );
}

export { BasketBadge, FavoriteBadge, StarsBadge };
