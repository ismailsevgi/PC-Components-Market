import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_BASKET } from '../../Features/basketSlice';
import React from 'react';
const CardButton = React.memo(({ id }) => {
  const dispatch = useDispatch();
  let data = useSelector((state) => {
    return state.products.data;
  });

  let basketList = useSelector((state) => {
    return state.basket.basketItems;
  });

  return (
    <button
      key={id}
      className='cardButton'
      onClick={() => {
        //Find the item inside the basket
        const checkFind = basketList.find((obj) => {
          return obj.id === id;
        });
        //Find the item inside the store
        const product = data.find((obj) => {
          return obj.id === id;
        });

        //If basket has the item
        if (checkFind) {
          //Compare the quantity of product with the product in the basket
          if (checkFind.quantity < product.stock) {
            dispatch(
              ADD_TO_BASKET({
                ...data.find((obj) => obj.id === id),
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
              ...data.find((obj) => obj.id === id),
              quantity: 1,
              check: true,
            })
          );
        }
      }}
    >
      ADD
    </button>
  );
});

export default CardButton;
