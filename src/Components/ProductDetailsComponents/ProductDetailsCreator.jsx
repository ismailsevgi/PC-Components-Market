import React from 'react';

function ProductDetailsCreator({ details }) {
  const productSpecs = Object.entries(details);
  console.log('Creator Gelen Obj:', productSpecs);

  return (
    <div>
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
    </div>
  );
}

export default ProductDetailsCreator;
