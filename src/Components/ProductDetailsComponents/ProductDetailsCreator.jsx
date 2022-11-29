import React from 'react';

const ProductDetailsCreator = React.memo(({ details }) => {
  const productSpecs = Object.entries(details);

  return (
    <table className='productDetails-table'>
      <tbody>
        <tr>
          <td className='header'>Product Details</td>
        </tr>
        {productSpecs.map((arr, index) => {
          return (
            <tr key={index}>
              <td className='keys'>{arr[0]}</td>
              <td className='values'>{arr[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default ProductDetailsCreator;
