import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadBytes,
} from 'firebase/storage';
import React, { useState, useEffect } from 'react';

import { v4 } from 'uuid';
import { storage } from '../../DataBASE/firebase';
import Spinner from '../SubComponents/Spinner';
export default function UploadImg({
  progress,
  setProgress,

  productName,
  formImages,
}) {
  //number will be determined according to amount of files...
  const [skeletonImgs, setSkeletonImgs] = useState(0);

  const userId = localStorage.getItem('userId');

  //yüklemeden sonra url string ini imageHandler ile formikteki arraye kayıt edilecek

  function handleChange(e) {
    const newImagesArray = [];
    async function uploadImage(images) {
      //images are files array
      if (images.length === 0) return;

      let counter = 0;
      setSkeletonImgs(images.length);
      setProgress(true);

      for (const img of images) {
        counter++;
        console.log('FOR...', counter);
        const userStorageRef = ref(
          storage,
          `${userId}/${productName}/${img.name}`
        );

        let snapshot = await uploadBytesResumable(userStorageRef, img);
        const downloadURL = await getDownloadURL(snapshot.ref);
        formImages.push(downloadURL);
      }

      console.log('İşlem Tamam: ', counter);
      setProgress(false);
    }

    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage['id'] = v4();
      newImagesArray.push(newImage);
    }

    uploadImage(newImagesArray);
  }

  return (
    <div className='uploadImageCanvas'>
      {formImages.length > 0 ? (
        <div className='images'>
          {formImages?.map((url) => {
            return (
              <div className='image'>
                <img src={url} />
              </div>
            );
          })}
        </div>
      ) : progress ? (
        <div className='skeletonImages'>
          {Array(skeletonImgs)
            .fill(0)
            .map((n, i) => {
              return <Spinner />;
            })}
        </div>
      ) : (
        <div className='wrapper'>
          <FontAwesomeIcon icon='fa-solid fa-upload'></FontAwesomeIcon>
          <input type='file' multiple onChange={(e) => handleChange(e)} />
          <small>Upload Images of your product</small>
        </div>
      )}
    </div>
  );
}
