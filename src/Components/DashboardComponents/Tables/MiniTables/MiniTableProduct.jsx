import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../../../../Features/firebaseApi';

function MiniTableProduct(props) {
  const [deleteProduct] = useDeleteProductMutation();

  console.log('MiniTableProduct:', MiniTableProduct);
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
    <div className='productTable'>
      <div className='row'>
        <div className='column'>Product Name</div>
        <div className='column'>
          <Link to={`/productDetails/` + props.data.id}>
            {props.data.title.slice(0, 45)}
          </Link>
        </div>
      </div>
      <div className='row'>
        <div className='column'>Stock</div>
        <div className='column'>{props.data.stock}</div>
      </div>
      <div className='row'>
        <div className='column'>Price</div>
        <div className='column'>{props.data.price}</div>
      </div>
      <div className='row'>
        <div className='column'>Sale Rate</div>
        <div className='column'>%{props.data.saleRate}</div>
      </div>
      <div className='row'>
        <div className='column'>Net Price</div>
        <div className='column'>
          {props.data.price - (props.data.price / 100) * props.data.saleRate}$
        </div>
      </div>
      <div className='row'>
        <div className='column'>
          <MDBIcon fas icon='edit' onClick={(e) => handleForm(e, props.data)} />
          <MDBIcon
            far
            icon='trash-alt'
            onClick={() => handleDelete(props.data.id)}
          />
        </div>
      </div>
    </div>
  );
}

export default MiniTableProduct;
