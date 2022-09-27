import React from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import { BasketBadge } from '../Components/SubComponents/Badges';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='navigation'>
          <div className='navigation-logo pl-2'>R.S.</div>

          <div className='navigation-links pl-1'>
            <Link to='/'>Store</Link>
            <Link to='/sellers'>Sellers</Link>
            <Link to='/about'>About</Link>

            <Link to='/contact'>Contact</Link>
          </div>
          <div className='navigation-searchBar pr-2'>
            <input placeholder='Search...' />
            <i className='fa-solid fa-magnifying-glass'></i>
          </div>
        </div>

        <div className='loggers'>
          <div className='loggers-icons'>
            <Link to='basket'>
              <div className='basketDiv'>
                <BasketBadge />
                <i className='fa-solid fa-cart-shopping'></i>
              </div>
            </Link>
          </div>
          <div className='loggers-buttons'>
            <button className='loggers-buttons-log'>Log In</button>
            <button className='loggers-buttons-sign'>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
