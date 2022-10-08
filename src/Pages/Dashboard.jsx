import React from 'react';
import anonImg from '../Images/profile.webp';
function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='container'>
        <div className='profileCol'>
          <div className='profileCol-imageContainer'>
            <img src={anonImg} />
          </div>
          <h2>İsmail Sevgi</h2>
          <div className='profileCol-userDetails'>//tableMaybe</div>
        </div>
        <div className='dashboard-panel'>
          <div className='productsTable'>
            user's products table -addProductPopup -changingPrice
          </div>
          <div className='orderTable'>//Gelen siparişlerin olduğu table</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
