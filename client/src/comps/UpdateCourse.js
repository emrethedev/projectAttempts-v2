/**
 * UpdateCourse.js
 * This component provides the 'Update Course' screen by rendering a
 * form that allows a user to update one of their existing courses.
 * The component also renders an 'Update Course' button that when
 * clicked sends a PUT request to the REST API's /api/courses/:id
 * route. This component also renders a 'Cancel' button that returns
 * the user to the 'Course Detail' screen.
 */

import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
  state = {
    author: [],
    courseId: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    errors: [],
  };

  componentDidMount() {
    const { context } = this.props;

    context.data
      .getCourse(this.props.match.params.id)
      .then((course) => {
        if (course) {
          this.setState({
            courseId: course.id,
            author: course.User,
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: course.userId,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push('/error');
      });
  }

  render() {
    const {
      author,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className='bounds course--detail'>
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Update Course'
            elements={() => (
              <React.Fragment>
                <div className='grid-66'>
                  <div className='course--header'>
                    <h4 className='course--label'>Course</h4>
                    <div>
                      <input
                        id='title'
                        name='title'
                        type='text'
                        value={title}
                        onChange={this.change}
                        className='input-title course--title--input'
                        placeholder='Course title...'
                      />
                    </div>
                    <p>By {author.firstName + ' ' + author.lastName}</p>
                  </div>
                  <div className='course--description'>
                    <div>
                      <textarea
                        id='description'
                        name='description'
                        type='text'
                        value={description}
                        onChange={this.change}
                        placeholder='Course description...'
                      />
                    </div>
                  </div>
                </div>
                <div className='grid-25 grid-right'>
                  <div className='course--stats'>
                    <ul className='course--stats--list'>
                      <li className='course--stats--list--item'>
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id='estimatedTime'
                            name='estimatedTime'
                            type='text'
                            className='course--time--input'
                            value={estimatedTime}
                            onChange={this.change}
                            placeholder='Hours'
                          />
                        </div>
                      </li>
                      <li className='course--stats--list--item'>
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id='materialsNeeded'
                            name='materialsNeeded'
                            type='text'
                            value={materialsNeeded}
                            onChange={this.change}
                            placeholder='Materials'
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    );
  }
  
  // Process changes
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  // Process the submission
  submit = () => {
    const { context } = this.props;

    const {
      courseId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      errors,
    } = this.state;

    const authUser = context.authenticatedUser;

    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    const course = {
      courseId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      errors,
    };

    context.data
      .updateCourse(courseId, course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.info('The course has been modified');
          this.props.history.push('/courses/' + courseId);
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push('/error');
      });
  };

  // Abort current activity
  cancel = () => {
    const courseId = this.props.match.params.id;
    const { from } = this.props.location.state || {
      from: { pathname: `/courses/${courseId}` },
    };

    this.props.history.push(from);
  };
}
