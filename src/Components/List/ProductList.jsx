import React, { useEffect } from 'react';
import Card from '../Carts/Card';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../Features/productListSlice';
import Skeleton from 'react-loading-skeleton';
import CardSkeleton from '../Carts/CardSkeleton';

function ProductList() {
  let data = useSelector((state) => {
    return state.products.data;
  });
  let loading = false;
  let notFound = false;

  const dispatch = useDispatch();

  useEffect(() => {
    if ((data.status === 'idle', data)) {
      console.log('idle');
      dispatch(fetchProducts());
    }
    if ((data.status === 'loading', data)) {
      console.log('Loading!');
      loading = true;
    }

    if (data.status === 'succeeded') {
      console.log('SUCCESS!', data);
    }
    if (data.status === 'failed') {
      console.log('Failed!', data);
      notFound = true;
    }
  }, [data.status]);

  console.log('Data: ', data);

  // const allEntries = Object.entries(data);

  // let AllProducts = [];
  // allEntries.forEach((arr) => (AllProducts = AllProducts.concat(arr[1])));

  return (
    <div className='productList'>
      {data.length > 0 ? (
        data.map((obj) => {
          return (
            <Card
              key={obj.id}
              id={obj.id}
              title={obj.title}
              img={obj.img}
              price={obj.price}
              tag={obj.tag}
              stock={obj.stock}
            />
          );
        })
      ) : (
        <CardSkeleton cards={8} />
      )}
    </div>
  );
}

export default ProductList;
