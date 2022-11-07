import { getAuth } from 'firebase/auth';
import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useAddFavoritesMutation,
  useGetFavoritesQuery,
} from '../../Features/firebaseApi';

//Basket Item Counter
function BasketBadge() {
  //Gets recent amount of basket items
  const itemsInBasket = useSelector((state) => {
    return state.basket.basketItems;
  });

  //Underline problem with yusuf
  return (
    <span className='badge'>
      <p>{itemsInBasket.length}</p>
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

export { BasketBadge, FavoriteBadge };
