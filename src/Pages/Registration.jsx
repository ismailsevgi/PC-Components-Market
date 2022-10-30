import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import app, { usersRef } from '../DataBASE/firebase';
import { LOGIN_USER } from '../Features/userSlice';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import HintMark from '../Components/SubComponents/HintMark';
import { toast } from 'react-toastify';
import { addDoc, serverTimestamp } from 'firebase/firestore';

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.userStatus);
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
        console.log(
          `${formRefRegist.current.firstName.value} ${formRefRegist.current.lastName.value} ${formRefRegist.current.email.value}
          ${formRefRegist.current.password.value}
          ${formRefRegist.current.passwordConfirm.value}`
        );

        createUserWithEmailAndPassword(
          auth,
          formRefRegist.current.email.value,
          formRefRegist.current.password.value
        )
          .then((cred) => {
            toast.success('Kayıt Başarılı');

            updateProfile(cred.user, {
              displayName: `${formRefRegist.current.firstName.value} ${formRefRegist.current.lastName.value}`,
            }).then(() => {
              try {
                //adds a user's private doc inside "users" collection
                addDoc(usersRef, {
                  id: cred.user.uid,
                  userName: `${formRefRegist.current.firstName.value} ${formRefRegist.current.lastName.value}`,
                  birth: '',
                  gender: '',
                  createdAt: serverTimestamp(),

                  userBasket: [],
                  userFavorites: [],
                })
                  .then(() => {
                    toast.success('Profile has created');
                    navigate('/loading');
                  })
                  .catch((error) => {
                    toast.error(
                      'Profile Dosyası oluşturulamadı: ',
                      error.massege
                    );
                  });
              } catch (err) {
                console.log('Something went wrong: ', err);
                toast.error('Something went wrong: ', err);
              }
            });
          })
          .catch((err) =>
            toast.error('Kayıt sırasında bir hata oldu: ', err.message)
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

          //burada users collection dan user'ın dökümanı çekilip redux a kayıt edilecek

          dispatch(
            LOGIN_USER({
              userId: cred.user.uid,

              email: formRef.current.email.value,
            })
          );
        })
        .then(() => {
          navigate('/loading');
        })
        .catch((err) =>
          toast.error('Giriş sırasında bir hata oldu: ', err.message)
        );
    }
  };

  function googleLog() {
    signInWithPopup(auth, googleAuthProvider)
      .then((auth) => {
        //direct to loading page
        dispatch(
          REGIST_USER({
            email: auth.user.email,
            userId: auth.user.uid,
          })
        );
        navigate('/loading');
        console.log('auth?', auth);
      })
      .catch((err) => {
        console.log('Something went wrong: ', err.massege);
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
