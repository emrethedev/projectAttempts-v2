import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';

// App Components Begin
/**
 * STATEFUL COMPONENTS
 */

/**
 * 1) - Courses
 * This component provides the 'Courses' screen from the
 * REST API's /api/courses route and rendering a list of courses.
 */
import Courses from './comps/Courses.js';

/**
 * 2) - CourseDetail
 * This component provides the 'Course Detail' screen from the
 * REST API's /api/courses/:id route and rendering the course.
 */
import CourseDetail from './comps/CourseDetail.js';

/**
 * 3) - UserSignIn
 * This component provides the 'Sign In' screen by rendering a form
 * that allows a user to sign using their existing account information
 */
import UserSignIn from './comps/UserSignIn.js';

/**
 * 4) - UserSignUp
 * This component provides the 'Sign Up' screen by rendering a form
 * that allows a user to sign up by creating a new account.
 */
import UserSignUp from './comps/UserSignUp.js';

/**
 * 5) - CreateCourse
 * This component provides the 'Create Course' screen by rendering a
 * form that allows a user to create a new course.
 */
import CreateCourse from './comps/CreateCourse.js';

/**
 * 6) - UpdateCourse
 * This component provides the 'Update Course' screen by rendering a
 * form that allows a user to update one of their existing courses.
 */
import UpdateCourse from './comps/UpdateCourse.js';

/**
 * STATELESS COMPONENTS
 */

/**
 * 1) - Header
 * Displays the top menu bar for the application and includes
 * buttons for signing in and signing up.
 */
import Header from './comps/Header.js';

/**
 * 2) - UserSignOut
 * Signs out the authenticated user and redirects the user
 * to the default route
 */
import UserSignOut from './comps/UserSignOut.js';

/**
 * TODO
 * /error - UnhandledError - Display a message letting the user know that an unexpected error has occurred.
 * /notfound - NotFound - Display a message letting the user know that the requested page can't be found.
 * /forbidden Forbidden - Displays a message letting the user know that they can't access the requested page.
 *
 * Components add here
 */

/**
 * NotFound
 * Display a message letting the user
 * know that the requested page can't be found.
 */
import NotFound from './comps/NotFound.js';

/**
 * Forbidden
 * Display a message letting the user know that they can't access
 * the requested page.
 */
import Forbidden from './comps/Forbidden.js';

/**
 * UnhandledError
 * Display a message letting the user know that an unexpected error
 * has occurred.
 */
import UnhandledError from './comps/UnhandledError.js';
// App Components End

/**
 * Context
 */
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);

// Routes
class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <HeaderWithContext />
            <Switch>
              <Route exact path='/' component={CoursesWithContext} />
              <Route path='/error' component={UnhandledError} />
              <PrivateRoute
                path='/courses/create'
                component={CreateCourseWithContext}
              />
              <Route
                exact
                path='/courses/:id'
                component={CourseDetailWithContext}
              />
              <PrivateRoute
                exact
                path='/courses/:id/update'
                component={UpdateCourseWithContext}
              />
              <Route path='/signin' component={UserSignInWithContext} />
              <Route path='/signup' component={UserSignUpWithContext} />
              <Route path='/signout' component={UserSignOutWithContext} />
              <Route path='/forbidden' component={Forbidden} />
              <Route component={NotFound} />
            </Switch>
          </div>
      </Router>
    );
  }
}
export default App;
