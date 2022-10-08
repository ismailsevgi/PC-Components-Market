import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoadingPage({ loadingTitle, loadingMsg }) {
  const navigate = useNavigate();
  let userStatus = useSelector((state) => state.user.email);
  setTimeout(() => {
    window.location.href = '/store';
  }, 3000);

  console.log('Loading user status: ', userStatus);

  return userStatus ? (
    <div className=''>
      <h1>You logged in successfully</h1>
      <h3>Will be directed to main page...</h3>
      <a href='/store'>You can click here to go main page</a>
    </div>
  ) : (
    <div className=''>
      <h1>You logged out successfully</h1>
      <h3>Will be directed to main page...</h3>
      <a href='/store'>You can click here to go main page</a>
    </div>
  );
}

export default LoadingPage;
