/**
 * Forbidden.js 
 * Displays a message letting the user know 
 * that they can't access the requested page.
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
      <h1>Forbidden!</h1>
      <p>
        Uh-oh! You cannot access this page.
      </p>
    </div>
  </React.Fragment>
);
