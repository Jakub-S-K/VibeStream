import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import Message from '../components/Message';
import logo from '../assets/img/logo.png';

function Register() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { setAlert } = useAlert();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userImagePreview, setUserImagePreview] = useState(null);
  const [bio, setBio] = useState('');

  //=============== STEP 1. USERNAME & PASSWORD & EMAIL ===============//

  //==========FORM INPUTS CHANGE==========//
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //==========FORM INPUTS VALIDATION==========//
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = 'Username is required!';
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

  //==========FIRST FORM SUBMIT==========//
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    async function performRegister(credentials) {
      try {
        const response = await fetch('http://localhost:3001/api/register', {
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
        setStep(2);
      } catch (error) {
        setError(`Error: ${error}`);
      }
    }

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      performRegister({
        nickname: formValues.username,
        password: formValues.password,
        email: formValues.email,
      });

      setIsSubmit(false);
    }
  }, [isSubmit]);

  //=============== STEP 2. AVATAR & BIO ===============//

  //==========USER IMAGE CHANGE==========//
  const handleUserImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      return;
    }

    const maxSize = 16 * 1024 * 1024;

    if (file.size > maxSize) {
      alert('File size exceeds the maximum limit of 16 MB.');
      return;
    }

    setUserImage(file);
    setUserImagePreview(URL.createObjectURL(file));
  };

  //==========USER BIO CHANGE==========//
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  //==========SECOND FORM SUBMIT==========//
  const handleAvatarAndBioSubmit = async (e) => {
    e.preventDefault();

    if (!bio && !userImage) {
      setError('Please provide at least a bio or a picture.');
      return;
    }

    const formData = new FormData();

    formData.append('id', user.id);

    if (bio) {
      formData.append('bio', bio);
    }
    if (userImage) {
      formData.append('files', userImage);
    }

    try {
      const response = await fetch(
        'http://localhost:3001/api/register/optional',
        {
          method: 'POST',
          body: formData,
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        setError(resData.message);
        return;
      }

      setAlert('Registration complete. Welcome aboard!', 'success');
      navigate('/');
      setUserImage(null);
      setBio('');
    } catch (error) {
      setError('Error.');
    }
  };

  //==========CLOSE ERROR MESSAGE==========//
  const closeError = () => {
    setError(null);
  };

  //==========CLOSE SUCCESS MESSAGE==========//
  const closeSuccess = () => {
    setSuccess(null);
  };

  return (
    <>
      <div className='body-bg'>
        <div className='l-form'>
          <div class='image-container'></div>

          <div class='form-container'>
            {/*==========ERROR==========*/}
            {error && (
              <Message type='error' message={error} onClose={closeError} />
            )}

            {/*==========SUCCESS==========*/}
            {success && (
              <Message
                type='success'
                message={success}
                onClose={closeSuccess}
              />
            )}

            <div class='form-wrapper'>
              {/*=============== STEP 1. USERNAME & PASSWORD & EMAIL ===============*/}
              {step === 1 && (
                <>
                  <Link to='/'>
                    <img
                      src={logo}
                      className='logo-image'
                      alt='VibeStream Logo'
                    />
                  </Link>

                  <form class='form' onSubmit={handleSubmit}>
                    <span class='form__title'>Create your Free Account</span>

                    {/* USERNAME */}
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
                      <p className='form__error'>
                        {formErrors.confirmPassword}
                      </p>
                    </div>

                    <button class='form__button'>Create Account</button>

                    <div class='form__policy-info'>
                      <span>By signing up, you agree to our </span>
                      <Link to='/privacy' className='form__link'>
                        Privacy Policy
                      </Link>
                      <span>.</span>
                    </div>
                  </form>

                  <div class='form__have-account-text'>
                    <span>Already have an account? </span>
                    <Link to='/login' className='form__link'>
                      Log in
                    </Link>
                  </div>
                </>
              )}
              {/*=============== STEP 2. AVATAR & BIO ===============*/}
              {step === 2 && (
                <>
                  <form class='form' onSubmit={handleAvatarAndBioSubmit}>
                    <h2 className='register__title'>
                      Hey, {formValues.username}!
                    </h2>
                    <p className='register__text'>
                      Share a bit about yourself! Add a profile picture and
                      write a short bio to let others know who you are.
                    </p>

                    <input
                      type='file'
                      accept='image/*'
                      style={{ display: 'none' }}
                      onChange={handleUserImageChange}
                      id='image-file-input'
                    />
                    <div
                      className='register__user-image'
                      onClick={() =>
                        document.getElementById('image-file-input').click()
                      }
                      style={{
                        backgroundImage: userImagePreview
                          ? `url(${userImagePreview})`
                          : 'none',
                      }}
                    >
                      {!userImagePreview && (
                        <i class='bx bx-image-add album__cover-icon'></i>
                      )}
                    </div>

                    {/*=====DESCRIPTION INPUT=====*/}

                    <textarea
                      className='register__textarea form__textarea'
                      name='description'
                      placeholder='Tell us about yourself...'
                      value={bio}
                      onChange={handleBioChange}
                      onInput={autoResizeTextarea}
                    />

                    <button
                      type='submit'
                      className='form__button register__button'
                    >
                      Save
                    </button>
                  </form>

                  <Link to={'/'} className='form__link'>
                    Skip
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function autoResizeTextarea(e) {
  const textarea = e.target;
  const minHeight = 80;
  const maxHeight = 140;

  textarea.style.height = 'auto';
  const newHeight = Math.min(
    Math.max(textarea.scrollHeight, minHeight),
    maxHeight
  );
  textarea.style.height = `${newHeight}px`;
}

export default Register;
