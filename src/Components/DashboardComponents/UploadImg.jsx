import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { storage } from '../../DataBASE/firebase';
import Spinner from '../SubComponents/Spinner';
export default function UploadImg({
  setImages,
  images,
  progress,
  setProgress,

  productName,
  formImages,
}) {
  const userId = useSelector((state) => state.user.userId);

  console.log('productName: ', productName);

  //yüklemeden sonra url string ini imageHandler ile formikteki arraye kayıt edilecek

  useEffect(() => {
    const uploadImage = () => {
      if (images.length === 0) return;

      images.map((img) => {
        const userStorageRef = ref(
          storage,
          `${userId}/${productName}/${img.name}`
        );
        const uploadTask = uploadBytesResumable(userStorageRef, img);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;

              default:
                break;
            }
          },
          (error) => {
            console.log('error: ', error);
            toast.error('Something went wrong, please try again');
          },
          () => {
            toast.info('Image Upload Successfully!');
            setProgress(0);
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
              formImages.push(downloadURLs);
            });
          }
        );
      });
    };
    images && uploadImage();
  }, [images]);

  function handleChange(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage['id'] = v4();
      setImages((prev) => [...prev, newImage]);
    }
  }

  console.log('current progress: ', images);
  return (
    <div className='uploadImageCanvas'>
      {images.length > 0 ? (
        <div className='images'>
          {formImages?.map((url) => {
            return (
              <div className='image'>
                <img src={url} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className='wrapper'>
          {progress !== 0 ? (
            <Spinner />
          ) : (
            <>
              <FontAwesomeIcon icon='fa-solid fa-upload'></FontAwesomeIcon>
              <input type='file' multiple onChange={(e) => handleChange(e)} />
              <small>Upload Images of your product</small>
            </>
          )}
        </div>
      )}
    </div>
  );
}
