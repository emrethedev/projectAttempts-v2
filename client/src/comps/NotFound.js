/**
 * NotFound.js 
 * Display a message letting the user know 
 * that the requested page can't be found.
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
      <h1>Not Found - 404!</h1>
      <p>Sorry! We could not find the page you were looking for.</p>
    </div>
  </React.Fragment>
);
