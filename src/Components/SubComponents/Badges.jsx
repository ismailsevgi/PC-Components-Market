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

  console.log('basketbadge: itemsInBasket, ', isFetching),
    useEffect(() => {
      if (data !== 'error' && data !== undefined) {
        console.log('Data var ONline brrr', data);

        setProductAmount(data.length);
      } else {
        console.log('Data yok OFFline brrr');
        setProductAmount(itemsInBasket.length);
      }
    }, [isFetching]);

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
    <button className='favoriteContainer' disabled={!isFetching}>
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
    </button>
  );
}

function StarsBadge({ amount }) {
  let myArray = new Array(3).fill(0);

  return (
    <div className='starsContainer'>
      {new Array(amount).fill(0).map((n) => {
        console.log('mapped');
        return <MDBIcon key={n} icon='star' />;
      })}
    </div>
  );
}

export { BasketBadge, FavoriteBadge, StarsBadge };
