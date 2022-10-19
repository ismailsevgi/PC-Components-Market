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
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

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

  return (
    <div className='container form-container'>
      {formState !== 'regist' ? (
        <form className='registration-form'>
          <h1>LOGIN</h1>
          <div className='form-group emailBox'>
            <label htmlFor='first name'>First name</label>
            <input
              aria-describedby='emailHelp'
              className='form-control'
              name='firstName'
              placeholder='Enter your email...'
            />
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else unless you want.
            </small>
          </div>
          <div className='form-group emailBox'>
            <label htmlFor='last name'>Last Name</label>
            <input
              className='form-control'
              name='lastName'
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
          ref={formRef}
          className=' registration-form'
          onSubmit={submitForm}
        >
          <h1>SIGN UP</h1>
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
