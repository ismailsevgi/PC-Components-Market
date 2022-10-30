import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuth } from 'firebase/auth';
import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddFavoritesMutation } from '../../Features/firebaseApi';

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

function FavoriteBadge({ top = 0, right = 0, fontSize = '1rem', id }) {
  const params = useParams();
  const [addFavorites] = useAddFavoritesMutation();

  const auth = getAuth();
  const [solid, setSolid] = useState(false);
  const favArr = useSelector((state) => state.user.userFavorites);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    if (favArr.includes(params.id || id)) {
      setSolid(true);
    } else {
      setSolid(false);
    }
    console.log('Refetch: ', refetch);
  }, [favArr, refetch]);

  if (top && right) {
    return (
      <div
        className='favBadge'
        style={{
          position: 'absolute',
          top: top,
          right: right,
          fontSize: fontSize,
        }}
      >
        {solid ? (
          <MDBIcon
            fas
            icon='heart'
            onClick={() => {
              setRefetch((refetch) => !refetch);
              addFavorites({ id: auth.currentUser.uid, url: params.id });
            }}
          />
        ) : (
          <MDBIcon
            far
            icon='heart'
            onClick={() => {
              setRefetch((refetch) => !refetch);
              addFavorites({ id: auth.currentUser.uid, url: params.id });
            }}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className='favBadge' style={{ fontSize: fontSize }}>
        {solid ? (
          <MDBIcon
            fas
            icon='heart'
            onClick={() => {
              setRefetch((refetch) => !refetch);
              addFavorites({ id: auth.currentUser.uid, url: params.id });
            }}
          />
        ) : (
          <MDBIcon
            far
            icon='heart'
            onClick={() => {
              setRefetch((refetch) => !refetch);
              addFavorites({ id: auth.currentUser.uid, url: params.id });
            }}
          />
        )}
      </div>
    );
  }
}

export { BasketBadge, FavoriteBadge };
