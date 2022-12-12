import React, { useState, useEffect, useRef } from 'react';
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
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const userDetails = useSelector((state) => state.user);

  const miniLinksRef = useRef();
  const loggersRef = useRef();

  //------------------------------

  return (
    <div className='navbar'>
      <div className='navigation-logo'>
        <img src={transHardDrive} />
        <img src={transMobo} />
        <img src={transGpu} />
        <Link to={'./store'}>
          <span>SELL IT</span>
        </Link>

        <img src={transCpu} />
        <img src={transRam} />
        <img src={transCase} />
      </div>
      <div className='navContainer'>
        <div className='navigation'>
          <div className='navigation-links'>
            <Link to='/store'>Products</Link>
            {userDetails.userStatus ? (
              <Link to='/dashboard'>Dashboard</Link>
            ) : (
              <a
                href='#'
                onClick={() => toast.error('You have to login first')}
                style={{ opacity: '.5' }}
              >
                Dashboard
              </a>
            )}

            {userDetails.userStatus ? (
              <Link to='/orders'>Orders</Link>
            ) : (
              <a
                href='#'
                onClick={() => toast.error('You have to login first')}
                style={{ opacity: '.5' }}
              >
                Orders
              </a>
            )}
          </div>

          <div
            ref={miniLinksRef}
            className='mini-links '
            onClick={() => {
              if (miniLinksRef.current.classList.contains('activated')) {
                miniLinksRef.current.classList.remove('activated');
                loggersRef.current.classList.remove('hide');
              } else {
                miniLinksRef.current.classList.add('activated');
                loggersRef.current.classList.add('hide');
              }
            }}
          >
            <i className='fas fa-bars'></i>
            <div className='links'>
              <Link to='/store'>Products</Link>
              {userDetails.userStatus && <Link to='/dashboard'>Dashboard</Link>}

              {userDetails.userStatus && <Link to='/orders'>Orders</Link>}
            </div>
          </div>

          <div ref={loggersRef} className='loggers'>
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
                    <span>LOGIN</span>
                    <FontAwesomeIcon icon='fa-solid fa-right-from-bracket' />
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
