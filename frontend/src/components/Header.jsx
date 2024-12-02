import { Link } from "react-router-dom"
import React, { useState } from 'react';
import vibestreamLogo from '../assets/img/logo.png'
import perfil from '../assets/img/perfil.png'

function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <>
    {/*=============== HEADER ===============*/}
      <header className='l-header'>
        <nav className="nav">
          <Link to="/">
            <img src={vibestreamLogo} className='nav__logo' alt="VibeStream logo" />
          </Link>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#" className="nav__link">
                  <i className='bx bx-search-alt-2 nav__icon'></i>
                  <span className="nav__name">Search</span>
                </a>
              </li>

              <li className="nav__item">
                <Link to="/upload" className="nav__link">
                    <i className='bx bx-upload nav__icon'></i>
                    <span className="nav__name">Upload</span>
                </Link>
              </li>

              <li className="nav__item">
                <Link to="/discover" className="nav__link">
                    <i className='bx bx-star nav__icon'></i>
                    <span className="nav__name">Discover</span>
                </Link>
              </li>

              <li className="nav__item" id="account" onClick={toggleDropdown}>
                <a className="nav__link nav__button">
                    <i className='bx bx-user nav__icon'></i>
                    <span className="nav__name">Account</span>
                </a>

                <div className={`dropdown__list ${isDropdownVisible ? 'show-dropdown' : ''}`} id="dropdown__list">
                    <Link to="/" className="dropdown__link">
                        <i className='bx bxs-user-account'></i>
                        <span>Profile</span>
                    </Link>

                    <Link to="/" className="dropdown__link">
                        <i className='bx bxs-like' ></i>
                        <span>Likes</span>
                    </Link>

                    <Link to="/" className="dropdown__link">
                        <i className='bx bx-log-out'></i>
                        <span>Sign out</span>
                    </Link>
                </div>
              </li>
            </ul>
          </div>

          <img src={perfil} className="nav__img" alt=""></img>
        </nav>
      </header>
    </>
  )
}

export default Header