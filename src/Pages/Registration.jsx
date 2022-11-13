import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import app, { usersRef as usersCollection } from '../DataBASE/firebase';

import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import HintMark from '../Components/SubComponents/HintMark';
import { toast } from 'react-toastify';
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore';

function Registration() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState('login');
  const auth = getAuth(app);
  const formRef = useRef();
  const formRefRegist = useRef();
  const googleAuthProvider = new GoogleAuthProvider();

  const handleForm = (e) => {
    setFormState((prev) => {
      if (prev === 'regist') {
        return 'login';
      } else {
        return 'regist';
      }
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (formState === 'regist') {
      if (
        formRefRegist.current.password.value ===
          formRefRegist.current.passwordConfirm.value &&
        formRefRegist.current.password.value.length > 5
      ) {
        createUserWithEmailAndPassword(
          auth,
          formRefRegist.current.email.value,
          formRefRegist.current.password.value
        )
          .then((cred) => {
            toast.success('Kayıt Başarılı');

            try {
              //adds a user's private doc inside "users" collection
              addDoc(usersCollection, {
                userName: `${formRefRegist.current.firstName.value} ${formRefRegist.current.lastName.value}`,
                birth: '',
                gender: '',
                createdAt: serverTimestamp(),

                userBasket: [],
                userFavorites: [],
              })
                .then((userRef) => {
                  updateProfile(cred.user, {
                    displayName: userRef.id,
                  });

                  const documentRef = doc(usersCollection, userRef.id);

                  updateDoc(documentRef, {
                    email: cred.user.email,
                    ordersBasket: [],
                    productRequests: [],
                    userId: cred.user.uid,
                    id: userRef.id,
                  }).then(() => {
                    toast.success('Profile has created');
                    navigate('/loading');
                  });
                })
                .catch((error) => {
                  toast.error(
                    'Profile Dosyası oluşturulamadı: ',
                    error.massege
                  );
                });
            } catch (err) {
              toast.error('Something went wrong: ', err);
            }
          })
          .catch((err) =>
            toast.error('Something went wrong while registering', err.message)
          );

        // navigate('/store');
      } else {
        toast.error('Şifreler aynı değil');
      }
    }

    if (formState === 'login') {
      signInWithEmailAndPassword(
        auth,
        formRef.current.email.value,
        formRef.current.password.value
      )
        .then((cred) => {
          console.log('Giriş Başarılı ', cred.user);
          navigate('/loading');
        })

        .catch((err) =>
          toast.error('Giriş sırasında bir hata oldu: ', err.message)
        );
    }
  };

  function googleLog() {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (userCred) => {
        console.log('Google log..:', userCred);
        let userDoc = doc(usersCollection, userCred.user.displayName);
        let userObj = await getDoc(userDoc);
        if (userObj.data()) {
          toast.success('Logged In Successfully');
          navigate('/loading');
        } else {
          console.log('There is no userObj, created a new one...');
          try {
            addDoc(usersCollection, {
              userId: userCred.user.uid,
              userName: userCred.user.displayName,
              birth: '',
              gender: '',
              createdAt: serverTimestamp(),
              email: userCred.user.email,
              userBasket: [],
              userFavorites: [],
              productRequests: [],
              basketOrders: [],
            })
              .then((userRef) => {
                updateProfile(userCred.user, {
                  displayName: userRef.id,
                });

                const documentRef = doc(usersCollection, userRef.id);
                updateDoc(documentRef, {
                  id: userRef.id,
                }).then(() => {
                  toast.success('Profile has created');
                  navigate('/loading');
                });
              })
              .catch((error) => {
                toast.error('Profile Dosyası oluşturulamadı: ', error.massege);
              });
          } catch (error) {
            toast.error(
              "User document couldn't have been created: ",
              error.massege
            );
          }
        }

        //getDoc işler eğer userDoc zaten varsa
      })
      .catch((err) => {
        toast.error('Something went wrong: ', err, err.massege);
      });
  }

  return (
    <div className='container form-container'>
      {formState !== 'regist' ? (
        <form ref={formRef} className='registration-form' onSubmit={submitForm}>
          <h1>LOGIN</h1>
          <div className='form-group emailBox'>
            <label htmlFor='email'>
              <HintMark
                hintMassage={
                  "We'll never share your email with anyone else unless you want."
                }
              />
              Email
            </label>
            <input
              aria-describedby='emailHelp'
              className='form-control'
              name='email'
              placeholder='Enter your email...'
            />
          </div>
          <div className='form-group emailBox'>
            <label htmlFor='password'>Password</label>
            <input
              className='form-control'
              name='password'
              placeholder='Enter your email...'
            />
          </div>
          <button className='btn btn-primary loginbtn'>LOGIN</button>
          <div className='otherBtns'>
            <MDBBtn
              className='m-1'
              style={{ backgroundColor: '#dd4b39' }}
              href='#'
              onClick={googleLog}
            >
              <MDBIcon fab icon='google' />
            </MDBBtn>
            <MDBBtn
              className='m-1'
              style={{ backgroundColor: '#3b5998' }}
              href='#'
            >
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn
              className='m-1'
              style={{ backgroundColor: '#55acee' }}
              href='#'
            >
              <MDBIcon fab icon='twitter' />
            </MDBBtn>
          </div>
          <small>
            <a onClick={handleForm}>Don't you have an account yet?</a>
          </small>
        </form>
      ) : (
        <form
          ref={formRefRegist}
          className=' registration-form'
          onSubmit={submitForm}
        >
          <h1>SIGN UP</h1>
          <div className='form-group nameBox'>
            <label htmlFor='firstName'>First Name: </label>
            <input
              className='form-control'
              name='firstName'
              placeholder='Enter your firstname...'
            />
          </div>
          <div className='form-group lastnameBox'>
            <label htmlFor='lastName'>Last Name: </label>
            <input
              className='form-control'
              name='lastName'
              placeholder='Enter your lastname...'
            />
          </div>
          <div className='form-group emailBox'>
            <label htmlFor='email'>Email</label>
            <input
              className='form-control'
              name='email'
              placeholder='Enter your email...'
            />
          </div>
          <div className='form-group passwordBox'>
            <label htmlFor='password'>Password</label>
            <input
              className='form-control'
              name='password'
              placeholder='Enter your password...'
            />
          </div>

          <div className='passwordConfirmBox'>
            <label htmlFor='passwordConfirm'>Confirm Password</label>
            <input
              className='form-control'
              type='passwordConfirm'
              name='passwordConfirm'
              placeholder='Confirm your password...'
            />
          </div>

          <button className='btn btn-primary loginbtn'>SIGN UP</button>
          <div className='otherBtns'>
            <MDBBtn
              className='m-1'
              style={{ backgroundColor: '#dd4b39' }}
              href='#'
              onClick={googleLog}
            >
              <MDBIcon fab icon='google' />
            </MDBBtn>
            <MDBBtn
              className='m-1'
              style={{ backgroundColor: '#3b5998' }}
              href='#'
            >
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn
              className='m-1'
              style={{ backgroundColor: '#55acee' }}
              href='#'
            >
              <MDBIcon fab icon='twitter' />
            </MDBBtn>
          </div>
          <small>
            <a onClick={handleForm}>Already have an account?</a>
          </small>
        </form>
      )}
    </div>
  );
}

export default Registration;
