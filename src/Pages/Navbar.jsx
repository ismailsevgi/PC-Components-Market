import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BasketBadge } from '../Components/SubComponents/Badges';

//logo images

import transGpu from '../Images/transparent/transparentGpu.png';
import transCpu from '../Images/transparent/transparentCpu.png';
import transMobo from '../Images/transparent/transparentMobo.png';
import transRam from '../Images/transparent/transRam.png';
import transHardDrive from '../Images/transparent/transHardDrive.png';
import transCase from '../Images/transparent/transCase.png';
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
    <div className='navbar'>
      <div className='navigation-logo'>
        <img src={transHardDrive} />
        <img src={transMobo} />
        <img src={transGpu} />
        <span>SELL IT</span>
        <img src={transCpu} />
        <img src={transRam} />
        <img src={transCase} />
      </div>
      <div className='navContainer'>
        <div className='navigation'>
          <div className='navigation-links'>
            <Link to='/store'>Products</Link>
            {userDetails.userStatus && <Link to='/dashboard'>Dashboard</Link>}

            {userDetails.userStatus && <Link to='/orders'>Orders</Link>}
          </div>

          <div class='mini-links'>
            <i class='fas fa-bars'></i>
          </div>

          <div className='loggers'>
            <div className='loggers-icons'>
              <div className='basketDiv'>
                <div className='logoWrapper'>
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
            </div>
            <div className='loggers-panel'>
              {userDetails.displayName == '' ? (
                <div className='loginButton'>
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
                <div className='logoutButton'>
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
                    <span>LOGOUT</span>

                    <FontAwesomeIcon icon='fa-solid fa-right-from-bracket' />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
