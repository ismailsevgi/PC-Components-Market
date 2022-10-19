import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import { BasketBadge } from '../Components/SubComponents/Badges';
import userImage from '../Images/profile.webp';

import app from '../DataBASE/firebase';
//import auth from '../DataBASE/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';

//ICONs
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const auth = getAuth(app);

function Navbar() {
  const [userLog, setUserLog] = useState([false, '']);
  let email = useSelector((state) => state.user.email);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubUserLog = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLog([true, user.displayName]);
      } else {
        setUserLog([false, '']);
      }
    });
    unsubUserLog();
  }, [email]);

  //userId si ile kayıtlanmış olan userObjesi çekilir ve profil resmi alınır!
  //Profil resmi yoksa anon resim kullanılır

  return (
    <div className='container'>
      <div className='navbar navbar-expand-lg'>
        <div className='navigation collapse navbar-collapse'>
          <div className='navigation-links pl-1'>
            <div className='navigation-logo pl-2'>R.S.</div>
            <Link to='/store'>Store</Link>
            <Link to='/sellers'>Sellers</Link>
            <Link to='/about'>About</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/contact'>Contact</Link>
          </div>

          <div className='loggers'>
            <div className='loggers-icons'>
              <div className='basketDiv'>
                <Link to='/basket'>
                  <BasketBadge />
                  <i className='fa-solid fa-cart-shopping'></i>
                </Link>
              </div>
            </div>
            {!userLog[0] ? (
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
                <div
                  className='userIMG'
                  onClick={() => {
                    console.log(auth.currentUser);
                  }}
                >
                  <img src={userImage} />
                </div>
                <div className='userPanel'>
                  <h2>{userLog[1]}</h2>
                  <button
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
