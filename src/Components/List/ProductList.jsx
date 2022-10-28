import React, { useEffect } from 'react';
import Card from '../Carts/Card';
import { useSelector, useDispatch } from 'react-redux';

import CardSkeleton from '../Carts/CardSkeleton';
import { useGetProductsQuery } from '../../Features/firebaseApi';
import { toast } from 'react-toastify';

function ProductList() {
  let label = useSelector((state) => state.filter.label);

  const {
    isError,

    isLoading,
    isSuccess,

    data: productList,
    error,
  } = useGetProductsQuery({ type: 'filtering', label: label });

  useEffect(() => {
    isError && toast.error('Something went wrong: ', error);
  }, [isError, isSuccess]);

  return (
    <div className='productList'>
      {productList?.map((obj) => {
        return (
          <Card
            key={obj.id}
            id={obj.id}
            title={obj.title}
            img={obj.images[0]}
            price={obj.price}
            tag={obj.tag}
            stock={obj.stock}
          />
        );
      })}

      {isLoading && <CardSkeleton cards={8} />}
    </div>
  );
}

export default ProductList;
