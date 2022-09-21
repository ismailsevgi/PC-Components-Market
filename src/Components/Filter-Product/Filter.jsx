import React, { useRef } from 'react';
import Dropdown from '../Dropdown/Dropdown';

function Filter() {
  return (
    <div className='filter'>
      <h3>Filter</h3>
      <Dropdown />
      <Dropdown />
    </div>
  );
}

export default Filter;
