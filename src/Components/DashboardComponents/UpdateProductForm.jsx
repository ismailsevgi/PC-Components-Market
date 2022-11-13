import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';

import { useUpdateProductMutation } from '../../Features/firebaseApi';

function UpdateProductForm({ formState, modalRef }) {
  const [updateFormState, setUpdateFormState] = useState({});

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    setUpdateFormState({ ...formState });
  }, [formState]);

  const handleForm = (type, e) => {
    e && e.preventDefault();
    switch (type) {
      case 'close':
        if (modalRef.current.classList.contains('activated')) {
          modalRef.current.classList.remove('activated');
        }
        break;
      case 'haggle':
        setUpdateFormState((prev) => {
          return {
            ...prev,
            productHaggle: !prev.productHaggle,
          };
        });
        break;
      case 'ogPrice':
        setUpdateFormState((prev) => {
          return {
            ...prev,
            productOgPrice: e.target.value,
          };
        });
        break;
      case 'saleRate':
        setUpdateFormState((prev) => {
          return {
            ...prev,
            productSaleRate: e.target.value,
          };
        });
        break;
      case 'stock':
        setUpdateFormState((prev) => {
          return {
            ...prev,
            productStock: e.target.value,
          };
        });
        break;
      case 'title':
        setUpdateFormState((prev) => {
          return {
            ...prev,
            productTitle: e.target.value,
          };
        });
        break;
    }
  };

  const submitUpdate = async (e) => {
    e.preventDefault();

    await updateProduct({
      id: updateFormState.productId,
      formData: {
        price: updateFormState.productOgPrice,
        saleRate: updateFormState.productSaleRate,
        stock: updateFormState.productStock,
        title: updateFormState.productTitle,
      },
    });
    if (modalRef.current.classList.contains('activated')) {
      modalRef.current.classList.remove('activated');
    }
  };

  return (
    <div className='bg-productForm-content'>
      <h1>Update Form</h1>
      <form className='updateForm' onSubmit={(e) => submitUpdate(e)}>
        <div className='formContent'>
          <div className='productName'>
            <label htmlFor='productName' className='productName-label'>
              Product Name
            </label>
            <input name='productName' value={updateFormState.productTitle} />
          </div>
          <div className='productDetails'>
            <div className='productStock'>
              <label htmlFor='productStock' className='productStock-label'>
                Stock
              </label>
              <input
                type='number'
                value={updateFormState.productStock}
                onChange={(e) => handleForm('stock', e)}
              />
            </div>
            <div className='productOriginalPrice'>
              <label
                htmlFor='productOriginalPrice'
                className='productOriginalPrice-label'
              >
                Original Price
              </label>
              <input
                type='number'
                onChange={(e) => handleForm('ogPrice', e)}
                value={updateFormState.productOgPrice}
              />
            </div>
            <div className='productSaleRate'>
              <label
                htmlFor='productSaleRate'
                className='productSaleRate-label'
              >
                Sale Rate
              </label>
              <input
                type='number'
                max={100}
                onChange={(e) => handleForm('saleRate', e)}
                value={updateFormState.productSaleRate}
              />
            </div>
          </div>
        </div>
        <div className='buttons'>
          <button className='btn btn-info'>UPDATE</button>
          <button
            className='btn btn-danger'
            onClick={(e) => handleForm('close', e)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProductForm;
