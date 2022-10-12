import React, { useEffect } from 'react';
import Card from '../Carts/Card';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../Features/productListSlice';
import CardSkeleton from '../Carts/CardSkeleton';

function ProductList() {
  let data = useSelector((state) => {
    return state.products.data;
  });

  let productState = useSelector((state) => state.products);

  //For Loading Skeleton
  let loading = false;
  let notFound = false;

  const dispatch = useDispatch();

  useEffect(() => {
    //if data isn't falsy

    if ((productState.status === 'idle', data)) {
      dispatch(fetchProducts());
      loading = true;
    }
    if ((productState.status === 'loading', data)) {
      // loading = true;
      loading = true;
    }

    if (productState.status === 'succeeded') {
      // loading = false;
      loading = false;
    }
    if (productState.status === 'failed') {
      // notFound = true;
      loading = false;
    }
  }, []);

  return (
    <div className='productList'>
      {productState.filteredDatas.length > 0 ? (
        productState.filteredDatas.map((obj) => {
          return (
            <Card
              key={obj.id}
              id={obj.id}
              title={obj.title}
              img={obj.images['1']}
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
