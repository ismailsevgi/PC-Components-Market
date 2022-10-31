import { faV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuth } from 'firebase/auth';
import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function FavoriteBadge({ fontSize = '1rem', id }) {
  const params = useParams();
  const [addFavorites] = useAddFavoritesMutation();

  const auth = getAuth();
  const [solid, setSolid] = useState(false);
  const favArr = useSelector((state) => state.user.userFavorites);

  useEffect(() => {
    if (favArr.includes(id)) {
      setSolid(true);
    } else {
      setSolid(false);
    }
  }, [favArr]);

  return (
    <div className='favBadge' style={{ fontSize: fontSize }}>
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

export { BasketBadge, FavoriteBadge };
