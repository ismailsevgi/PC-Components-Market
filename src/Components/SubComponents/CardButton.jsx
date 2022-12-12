import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_BASKET } from '../../Features/basketSlice';
import React, { useEffect } from 'react';
import {
  useGetProductQuery,
  useSetBasketMutation,
} from '../../Features/firebaseApi';

const CardButton = React.memo(({ id, width = 200, height = 50 }) => {
  let basketList = useSelector((state) => {
    return state.basket.basketItems;
  });

  let userId = localStorage.getItem('userDocId');

  const dispatch = useDispatch();

  const { isError, isFetching, data, error } = useGetProductQuery(id);
  const [setBasket] = useSetBasketMutation();
  useEffect(() => {}, [isFetching]);

  const handleClick = () => {
    //Find the item inside the basket

    //If there is no user: Use Redux Local State
    if (userId == 'null') {
      const checkFind = basketList.find((obj) => {
        return obj.id === id;
      });
      if (checkFind) {
        //type increase
        //Compare the quantity of product with the product in the basket
        console.log('ürün zaten var');
        if (checkFind.quantity < data.stock) {
          dispatch(
            ADD_TO_BASKET({
              ...data,
              quantity: 1,
              check: true,
            })
          );
        } else {
          //if it exceeds stock, throw alert!

          alert('You can not add more: stock exceed!');
        }
      } else {
        console.log('Selam ürün ilk kez ekleniyor', data);
        //type add

        dispatch(
          ADD_TO_BASKET({
            ...data,
            quantity: 1,
            check: true,
          })
        );
      }
    }

    //If there is a user: Use RTK Query
    if (userId != 'null') {
      console.log('GÖNDERİLECEK PRODUCT ID: ', id);

      setBasket({
        type: 'add',
        product: {
          ...data,
          quantity: 1,
          check: true,
        },
        productId: id,
      });
    }
  };

  return (
    <button
      key={id}
      className='cardButton'
      onClick={() => handleClick(id)}
      style={{ width: width, height: height }}
    >
      ADD
    </button>
  );
});

export default CardButton;
