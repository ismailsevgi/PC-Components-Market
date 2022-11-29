import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import ProductDetailsCreator from '../Components/ProductDetailsComponents/ProductDetailsCreator';
import ImageListCreator from '../Components/ProductDetailsComponents/ImageListCreator';

import { useGetProductQuery } from '../Features/firebaseApi';
import { toast } from 'react-toastify';
import Spinner from '../Components/SubComponents/Spinner';
import CardButton from '../Components/SubComponents/CardButton';
import { FavoriteBadge, StarsBadge } from '../Components/SubComponents/Badges';
import { useSelector } from 'react-redux';

//favBadge takes solid prop as true if user has added it into his fav product!

function ProductDetailsPage() {
  const params = useParams();

  const { isFetching, isError, isSuccess, data, error } = useGetProductQuery(
    params.id
  );

  const userStatus = useSelector((state) => {
    return state.user.userStatus;
  });

  console.log('Use Selector userStatus ', userStatus);

  //useState ile resim değiştirilecek
  const [changeImg, setChangeImg] = useState('1');

  const [images, setImages] = useState([]);
  //Params gets the id from the URL

  useEffect(() => {
    isError && toast.error(error);
  }, [isError]);

  useEffect(() => {
    if (data) {
      setImages([...data.images]);
      setChangeImg(data.images[0]);
      console.log('Gelen data:', data);
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
      <div className='mySinglePageContainer'>
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

                  <h1>{data.price - (data.price / 100) * data.saleRate}$</h1>
                </div>
              ) : (
                <div className='oldPrice'>
                  <h1>{data.price}</h1>
                </div>
              )}
              <div className='titleDiv-price-buttons'>
                {userStatus && (
                  <FavoriteBadge fontSize='2.4rem' id={params.id} />
                )}

                <CardButton id={params.id} />
              </div>
            </div>
            <hr></hr>
            <div className='titleDiv-reviews'>
              <StarsBadge amount={3} />
              <div className='locations'>
                <div>Country: </div>
                <div>{data?.country ? data.country : 'Unknown'}</div>
                <div>City: </div>
                <div>{data?.city ? data.city : 'Unknown'}</div>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className='productDetails'>
            {data && <ProductDetailsCreator details={data.specs} />}
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default ProductDetailsPage;
