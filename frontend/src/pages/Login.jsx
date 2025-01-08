import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logo from '../assets/img/logo.png';

function Login() {
  const initialValues = {
    username: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required!';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    }
    return errors;
  };

  return (
    <>
      <div className='body-bg'>
        <div className='l-form login'>
          {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className='form__message--success'>Logged in successfully</div>
          ) : (
            console.log('Entered Details', formValues)
          )} */}

          <div class='image-container'></div>

          <div class='form-container'>
            <div class='form-wrapper'>
              <Link to='/'>
                <img src={logo} className='logo-image' alt='VibeStream Logo' />
              </Link>

              <form class='form' onSubmit={handleSubmit}>
                <span class='form__title'>Log in to VibeStream</span>

                {/* FULLNAME */}
                <div class='form__group'>
                  <span class='form__label'>Username</span>
                  <div className='form__field'>
                    <i class='bx bx-user'></i>
                    <input
                      className='form__input'
                      type='text'
                      name='username'
                      placeholder='Enter your Username here'
                      value={formValues.username}
                      onChange={handleChange}
                    />
                  </div>
                  <p className='form__error'>{formErrors.username}</p>
                </div>

                {/* PASSWORD */}
                <div class='form__group'>
                  <span class='form__label'>Password</span>
                  <div className='form__field'>
                    <i class='bx bx-lock-alt'></i>
                    <input
                      className='form__input'
                      type='password'
                      name='password'
                      placeholder='Enter your Password here'
                      value={formValues.password}
                      onChange={handleChange}
                    />
                  </div>
                  <p className='form__error'>{formErrors.password}</p>
                </div>

                <button class='form__button'>Log In</button>

                <div class='form__policy-info form__policy-info--underline'>
                  <Link to='/privacy' className='form_link'>
                    Forgot your password?
                  </Link>
                </div>
              </form>

              <div class='form__have-account-text'>
                <span>Don't have an account? </span>
                <Link to='/register' className='form_link'>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
