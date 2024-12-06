import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logo from '../assets/img/logo.png';

function Register() {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = 'Username is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters';
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Those passwords didn’t match. Try again.';
    }
    return errors;
  };

  return (
    <>
      <div className='body-bg'>
        <div className='l-form'>
          {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className='form__message--success'>Signed in successfully</div>
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
                <span class='form__title'>Create your Free Account</span>

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

                {/* EMAIL */}
                <div class='form__group'>
                  <span class='form__label'>Email</span>
                  <div className='form__field'>
                    <i class='bx bx-envelope'></i>
                    <input
                      className='form__input'
                      type='text'
                      name='email'
                      placeholder='Enter your Email here'
                      value={formValues.email}
                      onChange={handleChange}
                    />
                  </div>
                  <p className='form__error'>{formErrors.email}</p>
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

                {/* CONFIRM PASSWORD */}
                <div class='form__group'>
                  <span class='form__label'>Confirm Password</span>
                  <div className='form__field'>
                    <i class='bx bx-lock-alt'></i>
                    <input
                      className='form__input'
                      type='password'
                      name='confirmPassword'
                      placeholder='Confirm your Password here'
                      value={formValues.confirmPasswordpassword}
                      onChange={handleChange}
                    />
                  </div>
                  <p className='form__error'>{formErrors.confirmPassword}</p>
                </div>

                <button class='form__button'>Create Account</button>

                <div class='form__policy-info'>
                  <span>By signing up, you agree to our </span>
                  <Link to='/privacy' className='form_link'>
                    Privacy Policy
                  </Link>
                  <span>.</span>
                </div>
              </form>

              <div class='form__have-account-text'>
                <span>Already have an account? </span>
                <Link to='/login' className='form_link'>
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
