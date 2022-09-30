import React, { useState } from 'react';

function ImageListCreator({ imageListArray, setChangeImg }) {
  const imagesArray = Object.entries(imageListArray);

  return (
    <div className='imagesMasonary'>
      {imagesArray.map((arr, index) => (
        <div key={index} className='imageBox'>
          <img
            src={arr[1]}
            onMouseEnter={() => {
              setChangeImg(arr[0]);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageListCreator;
