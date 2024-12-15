import { Link } from 'react-router-dom';
import vibestreamLogo from '../assets/img/logo.png';

function NoMatch() {
  return (
    <>
      {/*=============== PAGE NOT FOUND ===============*/}
      <div className='no-match__wrapper'>
        <Link to='/'>
          <img
            src={vibestreamLogo}
            className='no-match__logo'
            alt='VibeStream logo'
          />
        </Link>
        <h2 className='section__title no-match__text'>Page not found</h2>
        <Link to='/' className='no-match__button'>
          Home
        </Link>
      </div>
    </>
  );
}

export default NoMatch;
