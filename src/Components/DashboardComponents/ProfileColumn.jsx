import React from 'react';
import anonImg from '../../Images/profile.webp';
export default function ProfileColumn({ userDetails, dataArray }) {
  return (
    <div className='profileCol'>
      <div className='profileCol-imageContainer'>
        <img src={anonImg} />
      </div>
      <h2>{'Not Ready'}</h2>
      <div className='profileCol-userDetails'>
        <table>
          <thead>
            <tr>
              <td>User Informations</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User ID</td>
              <td>{userDetails.displayName}</td>
            </tr>
            <tr>
              <td>Birth Date</td>
              <td>Not Specified</td>
            </tr>

            <tr>
              <td>Email</td>
              <td>{userDetails ? userDetails.email : 'Not known'}</td>
            </tr>
            <tr>
              <td>Ongoing Purchases</td>
              <td>3.2</td>
            </tr>
            <tr>
              <td>Products</td>
              <td>{dataArray && dataArray.length}</td>
            </tr>
            <tr>
              <td>Sold</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
