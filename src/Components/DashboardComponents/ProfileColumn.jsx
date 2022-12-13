import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { MDBIcon } from 'mdb-react-ui-kit';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { storage } from '../../DataBASE/firebase';
import { usersRef as usersCollection } from '../../DataBASE/firebase.js';

export default function ProfileColumn({ dataArray }) {
  var userId = localStorage.getItem('userId');

  const myUserData = useSelector((state) => state.user);

  var auth = getAuth().currentUser;
  const updateProfileRef = useRef();

  function openInput() {
    if (updateProfileRef.current.classList.contains('activated')) {
      updateProfileRef.current.classList.remove('activated');
    } else {
      updateProfileRef.current.classList.add('activated');
    }
  }

  function handleChange(e) {
    async function uploadProfilePhoto(file) {
      if (!file) return;
      const userStorageRef = ref(storage, `${userId}/${file.name}`);
      let snapshot = await uploadBytes(userStorageRef, file);

      await getDownloadURL(snapshot.ref).then((url) => {
        try {
          updateProfile(auth, {
            photoURL: url,
          });
          setTimeout(() => {
            toast.success('Profile Photo changed successfully!');

            setUser((prev) => {
              return { ...prev, photoUrl: url };
            });
          }, 1000);
        } catch (err) {
          toast.error('Went Wrong Something - Yoda');
        }
      });
    }

    uploadProfilePhoto(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, surname, email } = e.target.elements;

    updateProfile(auth, {
      email: email.value,
    });
    usersCollection;

    let userRef = doc(usersCollection, localStorage.getItem('userDocId'));

    updateDoc(userRef, {
      userName: `${name.value} ${surname.value}`,
    });

    getDoc(userRef).then((dc) => {
      toast.success('Profile Informations Updated!');
      setUser((prev) => {
        return {
          ...prev,
          userName: dc.data().userName,
        };
      });
    });
  }

  return (
    <div className='profileCol'>
      <div className='profileCol-imageContainer'>
        <img src={myUserData.photoURL} referrerpolicy='no-referrer' />
        <div className='wrapper'>
          <label htmlFor='imageFile'>
            <i className='fas fa-camera-retro'></i>
          </label>

          <input
            id='imageFile'
            type='file'
            onChange={(e) => handleChange(e)}
            alt='Your profile photo'
          />
        </div>
      </div>

      <div className='profileCol-userInformations'>
        <div className='table'>
          <p>User Informations</p>
          <p>
            <MDBIcon fas icon='cog' onClick={() => openInput()} />
          </p>

          <p>Fullname</p>
          <p>{myUserData.displayName}</p>

          <p>Email</p>
          <p>{myUserData ? myUserData.email : 'Not known'}</p>

          <p>Products</p>
          <p>{dataArray && dataArray.length}</p>

          <p>Sold</p>
          <p>5</p>
        </div>
        <div ref={updateProfileRef} className='updateProfile'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              className='form-control'
              id='name'
              placeholder='Your name'
            />
            <label htmlFor='surname'>Surname</label>
            <input
              name='surname'
              className='form-control'
              id='surname'
              placeholder='Your surname'
              required
            />
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              className='form-control'
              id='email'
              placeholder='Your email'
              required
            />
            <button>SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}
