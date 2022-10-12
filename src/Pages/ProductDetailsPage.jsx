import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentsCreator from '../Components/ProductDetailsComponents/CommentsCreator';
import ProductDetailsCreator from '../Components/ProductDetailsComponents/ProductDetailsCreator';
import ImageListCreator from '../Components/ProductDetailsComponents/ImageListCreator';
import axios from 'axios';

//Note: Getting products from the redux but not api.
//Requesting item before loding product page will result nothing
//FIREBASE FOR FETCHING

function ProductDetailsPage() {
  //useState ile resim değiştirilecek
  const [changeImg, setChangeImg] = useState(1);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  //Params gets the id from the URL

  const params = useParams();

  useEffect(() => {
    if (product) {
      console.log('product: ', product);
      setImages([...Object.entries(product.images)]);
      console.log('images: ', images);
    }

    if (!product) {
      axios
        .get(
          'https://63342f3090a73d0fede8ebdd.mockapi.io/computerProducts/products/' +
            params.id
        )
        .then((response) => {
          setProduct(response.data);
        });
    }
  }, [product]);

  function handleChange(changeImg) {
    let image = images.find((arr) => arr[0] == changeImg);

    return image[1];
  }

  return product ? (
    <div className='ProductDetailsPage'>
      <div className='container'>
        <div className='leftCol'>
          <div className='allProductImagesContainer'>
            <div className='imageContainer'>
              {changeImg === 1 && product != null ? (
                <img src={product.img} />
              ) : (
                <img src={handleChange(changeImg)} />
              )}
            </div>

            {images.length > 0 && (
              <ImageListCreator
                imageListArray={product.images}
                setChangeImg={setChangeImg}
              />
            )}
          </div>
          <hr></hr>
        </div>
        <div className='rightCol'>
          <div className='titleDiv'>
            <h1 className='titleDiv-title'>{product && product.title}</h1>
            <span className='titleDiv-brand'>"Brand: MSI //search" </span>
            <div className='titleDiv-price'>
              {product.saleRate > 0 ? (
                <div className='oldPrice'>
                  <div className='topFont'>
                    <span className='sale'>
                      {product.price}
                      <span className='dolarSign'>$</span>
                    </span>
                    <span>{product.saleRate}%</span>
                  </div>

                  <h1>{product.price - (product.price / 100) * 20}$</h1>
                </div>
              ) : (
                <h1>{product.price}</h1>
              )}
              <div className='titleDiv-price-buttons'>
                FAV | ADDLIST | ADDBASKET
              </div>
            </div>
            <hr></hr>
            <div className='titleDiv-reviews'>
              <span>Stars 5</span>
              <span> 203 ratings</span>
            </div>
          </div>
          <hr></hr>
          <div className='productDetails'>
            {product && <ProductDetailsCreator details={product.specs} />}
          </div>
          <hr></hr>
        </div>
        {product && <CommentsCreator />}
      </div>
    </div>
  ) : (
    <div>Going to be fetch specifically</div>
  );
}

export default ProductDetailsPage;
