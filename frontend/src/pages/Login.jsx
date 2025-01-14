import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logo from '../assets/img/logo.png';
import Message from '../components/Message';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [error, setError] = useState(null);
  const initialValues = {
    username: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //==========FORM INPUTS CHANGE==========//
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //==========FORM INPUTS VALIDATION==========//
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

  //==========FORM SUBMIT==========//
  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    async function performLogin(credentials) {
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        const resData = await response.json();

        if (!response.ok) {
          setError(resData.message);
          return;
        }

        login(resData);
        navigate(from, { replace: true });
      } catch (error) {
        setError('Error');
      }
    }

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      performLogin({
        nickname: formValues.username,
        password: formValues.password,
      });

      setIsSubmit(false);
    }
  }, [isSubmit]);

  //==========CLOSE ERROR MESSAGE==========//
  const closeError = () => {
    setError(null);
  };

  return (
    <>
      <div className='body-bg'>
        <div className='l-form login'>
          <div class='image-container'></div>

          <div class='form-container'>
            {/*==========ERROR==========*/}
            {error && (
              <Message type='error' message={error} onClose={closeError} />
            )}

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
                  <Link to='/privacy' className='form__link'>
                    Forgot your password?
                  </Link>
                </div>
              </form>

              <div class='form__have-account-text'>
                <span>Don't have an account? </span>
                <Link to='/register' className='form__link'>
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
