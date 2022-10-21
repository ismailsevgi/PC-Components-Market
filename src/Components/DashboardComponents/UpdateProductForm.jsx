import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { productsRef } from '../../DataBASE/firebase';
import { useUpdateProductMutation } from '../../Features/firebaseApi';

function UpdateProductForm({ formState, modalRef }) {
  const [updateFormState, setUpdateFormState] = useState({});

  //YARIN YAPILACAK İLK ŞEY: BURADA UPDATE EDİLEN STATEİN ÖZELLİKLERİ FİREBASE DE GÜNCELLENECEK!

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    setUpdateFormState({ ...formState });

    console.log('updateFormState after mounted up');
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
    console.log(updateFormState);

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
    <form className='updateForm' onSubmit={(e) => submitUpdate(e)}>
      <button onClick={(e) => handleForm('close', e)}>X</button>
      <div className='productDiv'>
        <label>Product Name:</label>
        <input name='productName' value={updateFormState.productTitle} />
      </div>

      <div className='stockDiv'>
        <label>Stock</label>
        <input
          type='number'
          value={updateFormState.productStock}
          onChange={(e) => handleForm('stock', e)}
        />
      </div>
      <div className='originalPriceDiv'>
        <label>Original Price</label>
        <input
          type='number'
          onChange={(e) => handleForm('ogPrice', e)}
          value={updateFormState.productOgPrice}
        />
      </div>
      <div className='saleRateDiv'>
        <label>Sale Rate</label>
        <input
          type='number'
          max={100}
          onChange={(e) => handleForm('saleRate', e)}
          value={updateFormState.productSaleRate}
        />
      </div>
      <button>UPDATE</button>
    </form>
  );
}

export default UpdateProductForm;
