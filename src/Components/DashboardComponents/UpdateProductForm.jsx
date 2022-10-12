import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { productsRef } from '../../DataBASE/firebase';

function UpdateProductForm({ formState, modalRef }) {
  const [updateFormState, setUpdateFormState] = useState({});

  //YARIN YAPILACAK İLK ŞEY: BURADA UPDATE EDİLEN STATEİN ÖZELLİKLERİ FİREBASE DE GÜNCELLENECEK!

  useEffect(() => {
    setUpdateFormState({ ...formState });

    console.log('updateFormState after mounted up');
  }, [formState]);

  const handleForm = (type, e) => {
    console.log('Gelen type', type, 'Gelen e', e);
    e && e.preventDefault();

    /*
        productHaggle: false
        productOgPrice: 0
        productSaleRate: 0
        productStock: 0
        productTitle: ""
    */
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

  const submitUpdate = (e) => {
    e.preventDefault();

    const docRef = doc(productsRef, updateFormState.productId);

    getDoc(docRef)
      .then((product) => {
        let data = product.data();

        updateDoc(docRef, {
          ...data,
          haggle: updateFormState.productHaggle,
          price: updateFormState.productOgPrice,
          saleRate: updateFormState.productSaleRate,
          stock: updateFormState.productStock,
          title: updateFormState.productTitle,
        }).then(() => {
          if (modalRef.current.classList.contains('activated')) {
            modalRef.current.classList.remove('activated');
          }
        });
      })
      .catch((err) => {
        alert('There is no doc', err.message);
      });
  };

  return (
    <form className='updateForm' onSubmit={(e) => submitUpdate(e)}>
      <button onClick={(e) => handleForm('close', e)}>X</button>
      <div className='productDiv'>
        <label>Product Name:</label>
        <input name='productName' value={updateFormState.productTitle} />
      </div>
      <div className='haggleDiv'>
        <label>Haggle</label>
        {updateFormState.productHaggle ? (
          <input type='checkbox' checked onClick={() => handleForm('haggle')} />
        ) : (
          <input type='checkbox' onClick={() => handleForm('haggle')} />
        )}
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
