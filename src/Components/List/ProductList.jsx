import React from 'react';
import Card from '../Carts/Card';
import { useSelector } from 'react-redux';

function ProductList() {
  let data = useSelector((state) => {
    return state.products.productsArray;
  });

  const allEntries = Object.entries(data);

  let AllProducts = [];
  allEntries.forEach((arr) => (AllProducts = AllProducts.concat(arr[1])));

  return (
    <div className='productList'>
      {AllProducts.map((obj) => {
        return (
          <Card
            key={obj.id}
            id={obj.id}
            title={obj.title}
            img={obj.img}
            body={obj.specs.Memory}
            price={obj.price}
            tag={obj.tag}
          />
        );
      })}

      {/* {data.GPUs.map((gpu) => {
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
      })} */}
    </div>
  );
}

export default ProductList;
