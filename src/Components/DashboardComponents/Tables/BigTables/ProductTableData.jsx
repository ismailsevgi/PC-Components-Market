import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../../../../Features/firebaseApi';

export default function ProductTableData(props) {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this product?')) {
      await deleteProduct(id);
      toast.success('Your product is deleted!');
    }
  };

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
    <tr className='table-rows'>
      <th scope='row'>
        <Link to={`/productDetails/` + props.data.id}>
          {props.data.title.slice(0, 45)}
        </Link>
      </th>

      <td>{props.data.stock}</td>
      <td>{props.data.price}</td>
      <td>%{props.data.saleRate}</td>
      <td>
        {props.data.price - (props.data.price / 100) * props.data.saleRate}$
      </td>

      <td>
        <MDBIcon fas icon='edit' onClick={(e) => handleForm(e, props.data)} />
        <MDBIcon
          far
          icon='trash-alt'
          onClick={() => handleDelete(props.data.id)}
        />
      </td>
    </tr>
  );
}
