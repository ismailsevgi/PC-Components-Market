import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_BASKET } from '../../Features/basketSlice';
import React, { useEffect } from 'react';
import { useGetProductQuery } from '../../Features/firebaseApi';
const CardButton = React.memo(({ id, width = 200, height = 50 }) => {
  let basketList = useSelector((state) => {
    return state.basket.basketItems;
  });

  const dispatch = useDispatch();

  const { isError, isFetching, data, error } = useGetProductQuery(id);

  useEffect(() => {}, [isFetching]);

  const handleClick = () => {
    //Find the item inside the basket
    const checkFind = basketList.find((obj) => {
      return obj.id === id;
    });

    //If basket has the item
    if (checkFind) {
      //Compare the quantity of product with the product in the basket
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
      dispatch(
        ADD_TO_BASKET({
          ...data,
          quantity: 1,
          check: true,
        })
      );
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
