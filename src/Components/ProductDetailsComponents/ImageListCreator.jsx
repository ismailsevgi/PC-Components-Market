import React from 'react';

function ImageListCreator({ imageListArray, setChangeImg }) {
  //imageListArray: tüm url stringlerini içeren bir liste

  return (
    <div className='imagesMasonary'>
      {imageListArray?.map((url, index) => (
        <div key={index} className='imageBox'>
          <img
            src={url}
            onMouseEnter={() => {
              setChangeImg(url);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageListCreator;
