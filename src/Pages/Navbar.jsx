import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BasketBadge } from '../Components/SubComponents/Badges';

import { url } from '../Images/gpuImgUrl';
//import auth from '../DataBASE/firebase';
import { getAuth, signOut } from 'firebase/auth';

//ICONs
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar({ userDetails }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const location = useLocation();

  //------------------------------

  return (
    <div className='container-fluid'>
      <div className='navbar navbar-expand-lg'>
        <div className='navigation collapse navbar-collapse pl-5 pl-5'>
          <div className='navigation-links'>
            <div className='navigation-logo'>
              <img src={url} />
              <span>COMP CELL</span>
            </div>
            <Link to='/store'>Products</Link>
            {userDetails.userStatus && <Link to='/dashboard'>Dashboard</Link>}

            {userDetails.userStatus && <Link to='/orders'>Orders</Link>}
          </div>

          <div className='loggers'>
            <div className='loggers-icons'>
              <div className='basketDiv'>
                {userDetails.uid.length > 0 ? (
                  <Link to={`/basket/${userDetails.uid}`}>
                    <BasketBadge />
                    <i className='fa-solid fa-cart-shopping'></i>
                  </Link>
                ) : (
                  <Link to='/basket'>
                    <BasketBadge />
                    <i className='fa-solid fa-cart-shopping'></i>
                  </Link>
                )}
              </div>
            </div>
            {userDetails.displayName == '' ? (
              <div className='loggers-buttons'>
                <button
                  className='btn btn-light loggers-buttons-log'
                  type='submit'
                  onClick={() => navigate('/regist')}
                >
                  LOGIN
                </button>

                <button
                  className='btn btn-dark loggers-buttons-sign'
                  onClick={() => navigate('/regist')}
                  type='submit'
                >
                  Sign In
                </button>
              </div>
            ) : (
              <div className='userBox'>
                <label htmlFor='logout' className='userPanel'>
                  LOGOUT
                  <button
                    id='logout'
                    className='logoutUser'
                    onClick={() => {
                      signOut(auth)
                        .then(() => {
                          console.log('User Logged out');
                        })
                        .catch((err) => {
                          console.log('Something went wrong: ', err.massege);
                        });
                      navigate('/loading');
                    }}
                  >
                    <FontAwesomeIcon icon='fa-solid fa-right-from-bracket' />
                  </button>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
