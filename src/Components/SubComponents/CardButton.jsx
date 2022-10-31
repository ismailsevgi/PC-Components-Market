import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_BASKET } from '../../Features/basketSlice';
import React, { useEffect } from 'react';
import {
  useGetProductQuery,
  useSetBasketMutation,
} from '../../Features/firebaseApi';

//Şuanda ürünü elde etmeyi query'ye bağlamak şart
//dökümanın Id sine göre fetch ediyor
//içindeki id ye göre fetch etmesi lazım
//useGetQuery'ye bir where query si lazım

const CardButton = React.memo(({ id, width = 200, height = 50 }) => {
  let basketList = useSelector((state) => {
    return state.basket.basketItems;
  });

  const dispatch = useDispatch();

  const [setBasket] = useSetBasketMutation();
  const { isError, isFetching, data, error } = useGetProductQuery(id);

  useEffect(() => {
    console.log('Data: ', data);
  }, [isFetching]);

  const handleClick = () => {
    //Find the item inside the basket
    const checkFind = basketList.find((obj) => {
      return obj.id === id;
    });

    //If basket has the item
    if (checkFind) {
      //Compare the quantity of product with the product in the basket
      console.log('checkFind: ', checkFind);
      if (checkFind.quantity < data.stock) {
        console.log('Selam ürün zaten var', data);
        dispatch(
          ADD_TO_BASKET({
            ...data,
            quantity: 1,
            check: true,
          })
        );
      } else {
        //if it exceeds stock, throw alert!
        console.log('Selam', data);
        alert('You can not add more: stock exceed!');
      }
    } else {
      console.log('Selam ürün ilk kez ekleniyor', data);
      dispatch(
        ADD_TO_BASKET({
          ...data,
          quantity: 1,
          check: true,
        })
      );
    }
    setBasket({ id, basketList });
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
