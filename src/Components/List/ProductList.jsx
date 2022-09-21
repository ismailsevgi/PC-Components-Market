import React from 'react';
import Card from '../Carts/Card';
import { useSelector } from 'react-redux';

function ProductList() {
  let data = useSelector((state) => {
    return state.products.productsArray;
  });

  return (
    <div className='productList'>
      {data.GPUs.map((gpu) => {
        return (
          <Card
            key={gpu.id}
            id={gpu.id}
            title={gpu.title}
            img={gpu.img}
            body={gpu.specs.Memory}
            price={gpu.price}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
