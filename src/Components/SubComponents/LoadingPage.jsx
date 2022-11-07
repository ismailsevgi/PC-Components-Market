import React from 'react';

import { useNavigate } from 'react-router-dom';

function LoadingPage({ loadingTitle, loadingMsg }) {
  const navigate = useNavigate();

  setTimeout(() => {
    window.location.href = '/store';
  }, 3000);

  return (
    <div className='container loadingContainer'>
      <div className='loadingBox'>
        <h3>Will be directed to main page...</h3>
        <a href='/store'>You can click here to go main page</a>
      </div>
    </div>
  );
}

export default LoadingPage;
