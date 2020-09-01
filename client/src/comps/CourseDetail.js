/**
 * CourseDetail.js
 * This component provides the 'Course Detail' screen
 * by retrieving the detail for a course from the
 * REST API's /api/courses/:id route and rendering the course.
 * The component also renders a 'Delete Course' button that
 * when clicked should send a DELETE request to the REST API's
 * /api/courses/:id route in order to delete a course.
 * This component also renders an 'Update Course' button
 * for navigating to the 'Update Course' screen.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//  import axios from 'axios';

// Add Support for Rendering Markdown Formatted Text
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
  state = {
    course: '',
    author: [],
    authUser: [],
  };

  componentDidMount() {
    const { context } = this.props;

    context.data
      .getCourse(this.props.match.params.id)
      .then((course) => {
        if (course) {
          this.setState({
            course,
            author: course.User,
            // PROCESS AUTH'D USER
            authUser: context.authenticatedUser,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push('/error'); //UnhandledError
      });
  }

  render() {
    const { course, author } = this.state;

    return (
      <div>
        <div className='actions--bar'>
          <div className='bounds'>
            <div className='grid-100'>
              {this.AddButtons()}
              <Link className='button button-secondary' to='/'>
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className='bounds course--detail'>
          <div className='grid-66'>
            <div className='course--header'>
              <h4 className='course--label'>Course</h4>
              <h3 className='course--title'>{course.title}</h3>
              <p>By {author.firstName + ' ' + author.lastName}</p>
            </div>
            <div className='course--description'>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
          </div>
          <div className='grid-25 grid-right'>
            <div className='course--stats'>
              <ul className='course--stats--list'>
                <li className='course--stats--list--item'>
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className='course--stats--list--item'>
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Add buttons for when manipulating courses
   */
  AddButtons = () => {
    const courseId = this.props.match.params.id;
    const { authUser, author } = this.state;

    if (authUser) {
      if (author.id === authUser.id) {
        return (
          <span>
            <Link className='button' to={`/courses/${courseId}/update`}>
              Update Course
            </Link>
            <button className='button' onClick={() => this.delete()}>
              Delete Course{' '}
            </button>
          </span>
        );
      }
    }
  };

  /**
   * Process removal of a user
   */
  delete = () => {
    const { context } = this.props;
    const { authUser } = this.state;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    const userId = authUser.id;
    console.info(userId);
    const courseId = this.props.match.params.id;

    context.data
      .deleteCourse(courseId, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.info('Course deleted');
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push('/error');
      });
  };
}
