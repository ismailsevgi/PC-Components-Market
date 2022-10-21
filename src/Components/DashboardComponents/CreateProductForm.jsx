import React, { useEffect, useRef, useState } from 'react';
import { storage } from '../../DataBASE/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';
import HintMark from '../SubComponents/HintMark';
import ProductTempleteTypes from './ProductTempleteTypes';
import { useFormik } from 'formik';
import Select from 'react-select';
import UploadImg from './UploadImg';

import { useAddProductMutation } from '../../Features/firebaseApi';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreateProductForm() {
  const [productType, setProductType] = useState('cpu');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();
  const userId = useSelector((state) => state.user.userId);
  const [progress, setProgress] = useState(0);

  const createProductForm = useFormik({
    initialValues: {
      title: '',
      brand: '',

      images: [],
      name: '',
      price: 0,
      saleRate: 0,
      shipment: 0,
      specs: {},
      tag: 'cpu',
      stock: 0,
      productOwner: userId,
    },
    onSubmit: async (values) => {
      //RESİMLER YÜKLENENE KADAR BUTTON DISABLE OLMALI
      await addProduct(values);
      navigate('/dashboard');
    },
  });

  createProductForm.values.productOwner = userId;

  const tagOptions = [
    { value: 'cpu', label: 'CPU' },
    { value: 'gpu', label: 'GPU' },
    { value: 'mobo', label: 'Motherboard' },
    { value: 'ram', label: 'RAM' },
    { value: 'psu', label: 'PSU' },
    { value: 'case', label: 'Computer Case' },
  ];

  function handleProductType({ value }) {
    console.log('Seçilen Value', value);

    //gönderilen objede productOwnerId ve kendi id si olmalı

    setProductType(value);
  }

  return (
    <div className='container'>
      <form
        className='createProductsForm'
        onSubmit={createProductForm.handleSubmit}
      >
        <div className='formTitle'>
          <h2> SET A NEW PRODUCT </h2>
        </div>

        <div className='leftSide'>
          <div className='labelBox'>
            <HintMark
              hintMassage={
                'Write your products specific features like brand, speed'
              }
            />
            <label htmlFor='name' className='label-title'>
              Product Title
            </label>
          </div>
          <input
            className='input'
            type='text'
            name='title'
            onChange={createProductForm.handleChange}
            value={createProductForm.values.title}
            required
          />
          <div className='labelBox'>
            <label htmlFor='exampleFormControlSelect1'>Product Type</label>
          </div>
          <Select onChange={(e) => handleProductType(e)} options={tagOptions} />

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
        </div>

        <div className='rightSide'>
          <div className='addSpecs'>
            <ProductTempleteTypes
              specsHandler={createProductForm}
              type={productType}
            />
          </div>

          <UploadImg
            setImages={setImages}
            images={images}
            productName={createProductForm.values.title}
            formImages={createProductForm.values.images}
            progress={progress}
            setProgress={setProgress}
          />
        </div>
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
