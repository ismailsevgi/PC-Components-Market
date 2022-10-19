import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

function Spinner() {
  return (
    <>
      <MDBSpinner
        style={{
          width: '5rem',
          height: '5rem',
          margin: '5rem auto',
          display: 'block',
        }}
      >
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    </>
  );
}

export default Spinner;
