import React, { useRef } from 'react';
import Dropdown from '../Dropdown/Dropdown';

//tag e göre create olacak
//Price Slide
//Brand DropDown
//

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
