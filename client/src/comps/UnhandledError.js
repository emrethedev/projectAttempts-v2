/** 
 * UnhandledError.js 
 * Display a message letting the user know that 
 * an unexpected error has occurred.
*/

import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <React.Fragment>
    <div className='actions--bar'>
      <div className='bounds'>
        <div className='grid-100'>
          <Link className='button button-secondary' to='/'>
            Back
          </Link>
        </div>
      </div>
    </div>
    <div className='bounds course--detail'>
      <h1>There's a problem!</h1>
      <p>Oops! We just encountered an unexpected error. We can't put a finger on it.</p>
    </div>
  </React.Fragment>
);
