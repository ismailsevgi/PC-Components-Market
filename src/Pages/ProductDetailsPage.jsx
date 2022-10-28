import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import CommentsCreator from '../Components/ProductDetailsComponents/CommentsCreator';
import ProductDetailsCreator from '../Components/ProductDetailsComponents/ProductDetailsCreator';
import ImageListCreator from '../Components/ProductDetailsComponents/ImageListCreator';
import axios from 'axios';
import { useGetProductQuery } from '../Features/firebaseApi';
import { toast } from 'react-toastify';
import Spinner from '../Components/SubComponents/Spinner';
import CardButton from '../Components/SubComponents/CardButton';
import { FavoriteBadge } from '../Components/SubComponents/Badges';
import { useDispatch } from 'react-redux';
import { ADD_TO_BASKET } from '../Features/basketSlice';

//favBadge takes solid prop as true if user has added it into his fav product!

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const params = useParams();
  console.log('params: ', params.id);
  const { isFetching, isError, isSuccess, data, error } = useGetProductQuery(
    params.id
  );

  //useState ile resim değiştirilecek
  const [changeImg, setChangeImg] = useState('1');

  const [images, setImages] = useState([]);
  //Params gets the id from the URL

  useEffect(() => {
    isError && toast.error(error);
  }, [isError]);

  useEffect(() => {
    console.log('isFetching: ', isFetching);
    if (data) {
      setImages([...data.images]);
      setChangeImg(data.images[0]);
      console.log('images: ', images);
    }
  }, [data, isFetching]);

  function handleChange(changeImg) {
    //if data comes and set images array with url's
    if (images) {
      return changeImg;
    }
  }

  return !isFetching ? (
    <div className='ProductDetailsPage'>
      <div className='container'>
        <div className='leftCol'>
          <div className='allProductImagesContainer'>
            <div className='imageContainer'>
              {isFetching ? (
                <Spinner />
              ) : (
                //
                <img src={handleChange(changeImg)} alt='Product Image' />
              )}
            </div>

            {images.length > 0 && (
              <ImageListCreator
                imageListArray={data.images}
                setChangeImg={setChangeImg}
              />
            )}
          </div>
          <hr></hr>
        </div>
        <div className='rightCol'>
          <div className='titleDiv'>
            <h1 className='titleDiv-title'>{data && data.title}</h1>
            <span className='titleDiv-brand'>Brand: {data.brand}</span>
            <div className='titleDiv-price'>
              {data.saleRate > 0 ? (
                <div className='oldPrice'>
                  <div className='topFont'>
                    <span className='sale'>
                      {data.price}
                      <span className='dolarSign'>$</span>
                    </span>
                    <span>{data.saleRate}%</span>
                  </div>

                  <h1>{data.price - (data.price / 100) * 20}$</h1>
                </div>
              ) : (
                <h1>{data.price}</h1>
              )}
              <div className='titleDiv-price-buttons'>
                <button className='favoriteContainer'>
                  <FavoriteBadge solid={true} fontSize='2.4rem' />
                </button>
                <CardButton id={params.id} />
              </div>
            </div>
            <hr></hr>
            <div className='titleDiv-reviews'>
              <span>Stars 5</span>
              <span>203 ratings</span>
            </div>
          </div>
          <hr></hr>
          <div className='productDetails'>
            {data && <ProductDetailsCreator details={data.specs} />}
          </div>
          <hr></hr>
        </div>
        {data && <CommentsCreator />}
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default ProductDetailsPage;
