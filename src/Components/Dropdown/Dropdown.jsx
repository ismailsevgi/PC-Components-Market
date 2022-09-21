import React, { useRef, useState } from 'react';

function Dropdown() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  console.log('isActive: ', isActive);
  const onClick = () => {
    setIsActive(!isActive);
  };
  return (
    /* 
    <button onClick={onClick} className='menu-trigger'>
        <span>Add Filter</span>
      </button>

      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? 'menu-active' : 'menu-inactive'}`}
      >
        <ul>
          <li>
            <a href='#'>Messages</a>
          </li>
          <li>
            <a href='#'>Trips</a>
          </li>
          <li>
            <a href='#'>Saved</a>
          </li>
        </ul>
      </nav>
    */
    <div className='menu-container'></div>
  );
}

export default Dropdown;
