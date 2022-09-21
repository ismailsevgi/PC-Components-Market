import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from '../../Features/basketSlice';

const CardButton = ({ id }) => {
  const dispatch = useDispatch();
  let data = useSelector((state) => {
    return state.products.productsArray;
  });

  return (
    <button
      key={id}
      className='cardButton'
      onClick={() => {
        const obj = data.GPUs.find((obj) => obj.id === id);
        dispatch(ADD_TO_BASKET({ ...obj, quantity: 1 }));
      }}
    >
      ADD
    </button>
  );
};

export default CardButton;
