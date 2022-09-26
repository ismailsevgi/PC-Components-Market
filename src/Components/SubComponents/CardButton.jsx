import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_BASKET } from '../../Features/basketSlice';
import React from 'react';
const CardButton = ({ id, tag }) => {
  const dispatch = useDispatch();
  let data = useSelector((state) => {
    return state.products.productsArray;
  });

  return (
    <button
      key={id}
      className='cardButton'
      onClick={() => {
        console.log('Gelen Tag: ', tag);
        switch (tag) {
          case 'gpu':
            dispatch(
              ADD_TO_BASKET({
                ...data.GPUs.find((obj) => obj.id === id),
                quantity: 1,
                check: true,
              })
            );
            break;

          case 'cpu':
            dispatch(
              ADD_TO_BASKET({
                ...data.CPUs.find((obj) => obj.id === id),
                quantity: 1,
                check: true,
              })
            );
            break;
        }
      }}
    >
      ADD
    </button>
  );
};

export default CardButton;
