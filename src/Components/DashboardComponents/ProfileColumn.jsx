import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { MDBIcon } from 'mdb-react-ui-kit';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { storage } from '../../DataBASE/firebase';
import { usersRef as usersCollection } from '../../DataBASE/firebase.js';

export default function ProfileColumn({ userDetails, dataArray }) {
  var userId = localStorage.getItem('userId');
  const [user, setUser] = useState({
    photoUrl: localStorage.getItem('userPhotoURL'),
    userName: localStorage.getItem('userName'),
    userEmail: localStorage.getItem('userEmail'),
  });

  const myUserData = useSelector((state) => state.user);
  console.log('myUserData:', myUserData);

  var auth = getAuth().currentUser;
  const updateProfileRef = useRef();

  useEffect(() => {
    console.log('User Changed: ', user);
  }, [user]);

  function openInput() {
    if (updateProfileRef.current.classList.contains('activated')) {
      console.log('Kapandı');
      updateProfileRef.current.classList.remove('activated');
      console.log(updateProfileRef.current.classList);
    } else {
      console.log('Acildi');
      updateProfileRef.current.classList.add('activated');
      console.log(updateProfileRef.current.classList);
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
          console.log('Went Wrong Something - yoda', err);
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
        <table className='table'>
          <thead className='table-head'>
            <tr>
              <td>
                <h3>User Informations</h3>
              </td>
              <td style={{ textAlign: 'end', cursor: 'pointer' }}>
                <MDBIcon fas icon='cog' onClick={() => openInput()} />
              </td>
            </tr>
          </thead>
          <tbody className='table-rows'>
            <tr>
              <td>Fullname</td>
              <td>{myUserData.displayName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{userDetails ? userDetails.email : 'Not known'}</td>
            </tr>

            <tr>
              <td>Products</td>
              <td>{dataArray && dataArray.length}</td>
            </tr>
            <tr>
              <td>Sold</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
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
