import React, { useEffect, useState } from 'react';

export default function ProductTableData(props) {
  function handleForm(e, id) {
    e.preventDefault();

    props.setFormState({
      productId: props.data.id,
      productTitle: props.data.title,
      productHaggle: props.data.haggle,
      productStock: props.data.stock,
      productOgPrice: props.data.price,
      productSaleRate: props.data.saleRate,
    });

    if (!props.modalRef.current.classList.contains('activated')) {
      props.modalRef.current.classList.add('activated');
    }
  }

  return (
    <tr key={props.data.id} className='productTable-rows-row'>
      <td className='productTable-rows-row-data'>{props.data.title}</td>
      <td className='productTable-rows-row-data'>
        <div className='hangleDiv'>{props.data.haggle ? 'YES' : 'NO'}</div>
      </td>
      <td className='productTable-rows-row-data'>{props.data.stock}</td>
      <td className='productTable-rows-row-data'>{props.data.price}</td>
      <td className='productTable-rows-row-data'>%{props.data.saleRate}</td>
      <td className='productTable-rows-row-data'>
        {props.data.price - (props.data.price / 100) * props.data.saleRate}$
      </td>

      <td className='productTable-rows-row-data'>
        <button>DEL</button>
        <button onClick={(e) => handleForm(e, props.data)}>EDIT</button>
        <button>UPDATE</button>
      </td>
    </tr>
  );
}
