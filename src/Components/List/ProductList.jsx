import React, { useEffect } from 'react';
import Card from '../Carts/Card';
import { useSelector, useDispatch } from 'react-redux';

import CardSkeleton from '../Carts/CardSkeleton';
import { useGetProductsQuery } from '../../Features/firebaseApi';
import { toast } from 'react-toastify';

function ProductList() {
  let label = useSelector((state) => state.filter.label);
  let placement = useSelector((state) => state.filter.placement);

  let {
    isError,

    isLoading,
    isSuccess,

    data: productList,
    error,
  } = useGetProductsQuery({ type: 'filtering', label: label });

  useEffect(() => {
    isError && toast.error('Something went wrong: ', error);
  }, [isError, isSuccess]);

  console.log(productList?.slice().sort((a, b) => a.price - b.price));

  return (
    <div className='productList'>
      {productList
        ?.slice()
        .sort((a, b) => {
          switch (placement) {
            case 'newest':
              return a.id - b.id;
              break;
            case 'LowToHigh':
              return a.price - b.price;
              break;
            case 'HighToLow':
              return b.price - a.price;
              break;
          }
        })
        .map((obj) => {
          return (
            <Card
              key={obj.id}
              id={obj.id}
              title={obj.title}
              img={obj.images[0]}
              price={obj.price}
              tag={obj.tag}
              stock={obj.stock}
              saleRate={obj.saleRate}
            />
          );
        })}

      {isLoading && <CardSkeleton cards={8} />}
    </div>
  );
}

export default ProductList;
