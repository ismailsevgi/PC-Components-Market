import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import { BasketBadge } from '../Components/SubComponents/Badges';
import userImage from '../Images/profile.webp';

import app from '../DataBASE/firebase';
//import auth from '../DataBASE/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';

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
    <div className='navbar'>
      <div className='container'>
        <div className='navigation'>
          <div className='navigation-logo pl-2'>R.S.</div>

          <div className='navigation-links pl-1'>
            <Link to='/store'>Store</Link>
            <Link to='/sellers'>Sellers</Link>
            <Link to='/about'>About</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/contact'>Contact</Link>
          </div>
          <div className='navigation-searchBar pr-2'>
            <input placeholder='Search...' />
            <i className='fa-solid fa-magnifying-glass'></i>
          </div>
        </div>

        <div className='loggers'>
          <div className='loggers-icons'>
            <Link to='/basket'>
              <div className='basketDiv'>
                <BasketBadge />
                <i className='fa-solid fa-cart-shopping'></i>
              </div>
            </Link>
          </div>
          {!userLog[0] ? (
            <div className='loggers-buttons'>
              <button
                className='loggers-buttons-log'
                onClick={() => navigate('/regist')}
              >
                LOGIN
              </button>
              <button
                className='loggers-buttons-sign'
                onClick={() => navigate('/regist')}
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
                  LOGOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
