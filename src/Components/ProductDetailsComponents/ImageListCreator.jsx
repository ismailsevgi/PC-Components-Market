import React, { useEffect, useRef, useState } from 'react';

function ImageListCreator({ imageListArray, setChangeImg }) {
  //imageListArray: tüm url stringlerini içeren bir liste
  const [radio, setRadio] = useState(0);

  function handleRadio(index) {
    console.log('Gelen Index NO:', index);
    setRadio(index);
  }

  return (
    <div className='imagesMasonary'>
      {imageListArray?.map((url, index) => (
        <div key={index} className='imageBox'>
          <img
            className={
              index == radio ? 'product-image activated' : 'product-image'
            }
            src={url}
          />
          <label className='background-image' htmlFor={index}></label>
          <input
            type='radio'
            id={index}
            name='selectProduct'
            className='selectProduct'
            onClick={() => {
              setChangeImg(url);
              handleRadio(index);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageListCreator;
