import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import vibestreamLogo from '../assets/img/logo.png';
import perfil from '../assets/img/perfil.png';

function Header() {
  const { user, logout } = useAuth();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  console.log(dropdownRef);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/*=============== HEADER ===============*/}
      <header className='l-header'>
        <nav className='nav'>
          <Link to='/'>
            <img
              src={vibestreamLogo}
              className='nav__logo'
              alt='VibeStream logo'
            />
          </Link>

          <div className='nav__menu' id='nav-menu'>
            <ul className='nav__list'>
              {/*=============== SEARCH ===============*/}
              <li className='nav__item'>
                <Link to='/search' className='nav__link'>
                  <i className='bx bx-search-alt-2 nav__icon'></i>
                  <span className='nav__name'>Search</span>
                </Link>
              </li>

              {/*=============== UPLOAD ===============*/}
              <li className='nav__item'>
                <Link to='/upload' className='nav__link'>
                  <i className='bx bx-upload nav__icon'></i>
                  <span className='nav__name'>Upload</span>
                </Link>
              </li>

              {/*=============== DISCOVER ===============*/}
              <li className='nav__item'>
                <Link to='/discover' className='nav__link'>
                  <i className='bx bx-star nav__icon'></i>
                  <span className='nav__name'>Discover</span>
                </Link>
              </li>

              {user ? (
                <>
                  {/*=============== ACCOUNT ===============*/}
                  <li
                    className='nav__item'
                    id='account'
                    onClick={toggleDropdown}
                    ref={dropdownRef}
                  >
                    <a className='nav__link nav__button'>
                      <i className='bx bx-user nav__icon'></i>
                      <span className='nav__name'>Account</span>
                    </a>

                    <div
                      className={`dropdown__list ${
                        isDropdownVisible ? 'show-dropdown' : ''
                      }`}
                      id='dropdown__list'
                    >
                      <Link
                        to={`/user/${user.username}`}
                        className='dropdown__link'
                      >
                        <i className='bx bxs-user-account'></i>
                        <span>Profile</span>
                      </Link>

                      <Link to='/' className='dropdown__link'>
                        <i className='bx bxs-like'></i>
                        <span>Likes</span>
                      </Link>

                      <Link onClick={logout} className='dropdown__link'>
                        <i className='bx bx-log-out'></i>
                        <span>Sign out</span>
                      </Link>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  {/*=============== LOG IN ===============*/}
                  <li className='nav__item'>
                    <Link to='/login' className='nav__link'>
                      <i class='bx bx-user nav__icon'></i>
                      <span className='nav__name'>Log in</span>
                    </Link>
                  </li>

                  {/*=============== SIGN UP ===============*/}
                  <li className='nav__item'>
                    <Link to='/register' className='nav__link'>
                      <i class='bx bxs-user nav__icon'></i>
                      <span className='nav__name'>Sign up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <img src={perfil} className='nav__img' alt=''></img>
        </nav>
      </header>
    </>
  );
}

export default Header;
