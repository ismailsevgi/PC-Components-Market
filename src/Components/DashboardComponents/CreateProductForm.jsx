import React, { useState } from 'react';
import HintMark from '../SubComponents/HintMark';
import ProductTempleteTypes from './ProductTempleteTypes';
import { useFormik } from 'formik';
import Select from 'react-select';
import UploadImg from './UploadImg';
import { useAddProductMutation } from '../../Features/firebaseApi';
import { useNavigate } from 'react-router-dom';

import HandleCountry from './HandleCountry';

function CreateProductForm() {
  const [productType, setProductType] = useState('cpu');
  const [country, setCountry] = useState({
    value: 'Afghanistan',
    label: 'Afghanistan',
  });
  const [city, setCity] = useState('');

  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();

  const [progress, setProgress] = useState(0);

  const createProductForm = useFormik({
    initialValues: {
      title: '',
      brand: '',
      condition: 1,
      country: '',
      city: '',
      images: [],
      name: '',
      price: 0,
      saleRate: 0,
      shipment: 0,
      specs: {},
      description: '',
      tag: 'cpu',
      stock: 0,
      productOwner: localStorage.getItem('userDocId'),
      sellerEmail: localStorage.getItem('userEmail'),
    },
    onSubmit: async (values) => {
      //RESİMLER YÜKLENENE KADAR BUTTON DISABLE OLMALI
      await addProduct({ values, productType, country, city });
      navigate('/dashboard');
    },
  });

  createProductForm.values.productOwner = localStorage.getItem('userDocId');

  const styleSheet = {
    option: (base, state) => ({
      ...base,

      fontSize: 13,
      fontWeight: 900,
      color: 'black!important',
    }),
  };

  const conditionOptions = [
    { value: 1, label: 'very bad' },
    { value: 2, label: 'bad' },
    { value: 3, label: 'good' },
    { value: 4, label: 'very good' },
    { value: 5, label: 'perfect' },
  ];

  const tagOptions = [
    { value: 'cpu', label: 'CPU' },
    { value: 'gpu', label: 'GPU' },
    { value: 'mobo', label: 'Motherboard' },
    { value: 'ram', label: 'RAM' },
    { value: 'psu', label: 'PSU' },
    { value: 'case', label: 'Computer Case' },
    { value: 'ssd', label: 'SSD' },
    { value: 'hdd', label: 'HDD' },
  ];

  function handleProductType({ value }) {
    setProductType(value);
    console.log(createProductForm.values);
  }

  function handleCondition({ value }) {
    createProductForm.values.condition = value;
  }

  return (
    <div className='container-fluid'>
      <form
        className='createProductsForm'
        onSubmit={createProductForm.handleSubmit}
      >
        <div className='formTitle'>
          <h2>PRODUCT FORM </h2>
        </div>

        <div className='leftSide'>
          <div className='generalContainer'>
            <div className='labelBox'>
              <h2>General</h2>
            </div>
            <div style={{ opacity: 0 }}>-</div>
            <div className='labelBox'>
              <label htmlFor='name' className='label-title'>
                Product Title
              </label>
            </div>
            <input
              className='input form-control'
              type='text'
              name='title'
              onChange={createProductForm.handleChange}
              value={createProductForm.values.title}
              required
            />
            <div className='labelBox'>
              <label htmlFor='exampleFormControlSelect1'>Product Type</label>
            </div>
            <Select
              onChange={(e) => handleProductType(e)}
              options={tagOptions}
              styles={styleSheet}
            />

            <div className='labelBox'>
              <label>Price</label>
            </div>
            <input
              name='price'
              onChange={createProductForm.handleChange}
              value={createProductForm.values.price}
              className='form-control'
              placeholder='Enter price'
            />
            <div className='labelBox'>
              <label>BRAND</label>
            </div>
            <input
              name='brand'
              onChange={createProductForm.handleChange}
              value={createProductForm.values.brand}
              className='form-control'
              placeholder="Enter product's brand"
            />
            <div className='labelBox'>
              <label>MODAL</label>
            </div>
            <input
              name='name'
              onChange={createProductForm.handleChange}
              value={createProductForm.values.name}
              className='form-control'
              placeholder="Enter product's modal"
            />
            <div className='labelBox'>
              <label>STOCK</label>
            </div>
            <input
              name='stock'
              onChange={createProductForm.handleChange}
              value={createProductForm.values.stock}
              className='form-control'
              placeholder='Enter stock size'
            />
            <div className='labelBox'>
              <label>SALE RATE</label>
            </div>
            <input
              name='saleRate'
              onChange={createProductForm.handleChange}
              value={createProductForm.values.saleRate}
              className='form-control'
              placeholder="Enter product's sale rate"
            />
            <div className='labelBox'>
              <label>Shipment Cost</label>
            </div>
            <input
              name='shipment'
              onChange={createProductForm.handleChange}
              value={createProductForm.values.shipment}
              type='number'
              className='form-control'
              placeholder="Enter product's sale rate"
            />
            <div className='labelBox'>
              <label htmlFor='exampleFormControlSelect1'>
                Current Condition
              </label>
            </div>
            <Select
              onChange={(e) => handleCondition(e)}
              options={conditionOptions}
            />
            <HandleCountry
              setCity={setCity}
              setCountry={setCountry}
              country={country}
            />
          </div>
        </div>

        <div className='rightSide'>
          <div className='addSpecs'>
            <h2>Product Specs</h2>
            <ProductTempleteTypes
              specsHandler={createProductForm}
              type={productType}
            />
          </div>
          <div className='textAreaContainer'>
            <label>Short description about your product</label>
            <textarea
              onChange={createProductForm.handleChange}
              value={createProductForm.values.description}
              className='productDescription'
            ></textarea>
          </div>
        </div>
        <UploadImg
          productName={createProductForm.values.title}
          formImages={createProductForm.values.images}
          progress={progress}
          setProgress={setProgress}
        />
        <button
          disabled={progress === 0 || progress === 100 ? false : true}
          type='submit'
          className='btn btn-primary submit'
        >
          CREATE
        </button>
      </form>
    </div>
  );
}

export default CreateProductForm;
