import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

function Spinner() {
  return (
    <MDBSpinner
      style={{
        width: '4rem',
        height: '4rem',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
  );
}

export default Spinner;
