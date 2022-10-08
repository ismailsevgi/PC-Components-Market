import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import app from '../DataBASE/firebase';
import { REGIST_USER, LOGIN_USER } from '../Features/userSlice';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../Components/SubComponents/LoadingPage';
import { useNavigate } from 'react-router-dom';

//güncel plan
//burada verileri al dispatch et
//reduxSlice üzerinden değişiklik olsun

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.userStatus);
  const [formState, setFormState] = useState('login');
  const auth = getAuth(app);
  const formRef = useRef();
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

  const submitForm = (e) => {
    e.preventDefault();

    if (formState === 'regist') {
      if (
        formRef.current.password.value ===
          formRef.current.passwordConfirm.value &&
        formRef.current.password.value.length > 5
      ) {
        dispatch(
          REGIST_USER({
            firstName: formRef.current.firstName.value,
            lastName: formRef.current.lastName.value,

            email: formRef.current.email.value,
            password: formRef.current.password.value,
          })
        );
      } else {
        alert('Şifreler aynı değil');
      }
    }

    if (formState === 'login') {
      dispatch(
        LOGIN_USER({
          email: formRef.current.email.value,
          password: formRef.current.password.value,
        })
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

  //You have already Logged in
  //so user will be directed to the main page
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     //log
  //   } else {
  //     //
  //   }
  // });

  return (
    <div className='container'>
      {formState === 'regist' ? <h1>SIGN UP FORM</h1> : <h1>LOGIN FORM</h1>}

      <form ref={formRef} className='registrationForm' onSubmit={submitForm}>
        {formState === 'regist' && (
          <>
            <div className='emailBox'>
              <label htmlFor='first name'>First name</label>
              <input name='firstName' placeholder='Enter your email...' />
            </div>
            <div className='emailBox'>
              <label htmlFor='last name'>Last Name</label>
              <input name='lastName' placeholder='Enter your email...' />
            </div>
          </>
        )}

        <div className='emailBox'>
          <label htmlFor='email'>Email</label>
          <input name='email' placeholder='Enter your email...' />
        </div>
        <div className='passwordBox'>
          <label htmlFor='password'>Password</label>
          <input name='password' placeholder='Enter your password...' />
        </div>
        {formState === 'regist' && (
          <div className='passwordConfirmBox'>
            <label htmlFor='passwordConfirm'>Confirm Password</label>
            <input
              type='passwordConfirm'
              name='passwordConfirm'
              placeholder='Confirm your password...'
            />
          </div>
        )}

        <button>SUBMIT</button>
        <div>
          <button onClick={googleLog}>G</button>
        </div>
      </form>

      <a onClick={handleForm}>Already have an account?</a>
    </div>
  );
}

export default Registration;
