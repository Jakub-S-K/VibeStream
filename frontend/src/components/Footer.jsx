import { Link } from "react-router-dom"
import vibestreamLogo from '../assets/img/logo.png'

function Footer() {
  return (
    <>
    {/*=============== FOOTER ===============*/}
      <footer className="footer1 section">
        <div className="footer1__container container">
          <div className="footer1__data">
            <h3 className="footer1__title">Privacy</h3>
            <a href="#" className="footer1__link">Privacy Policy</a>
            <a href="#" className="footer1__link">Community Guidelines</a>
          </div>

          <div className="footer1__data">
            <h3 className="footer1__title">Information</h3>
            <a href="#" className="footer1__link">About Us</a>
            <a href="#" className="footer1__link">Contact Us</a>
          </div>
        </div>
      </footer>

      <footer className="footer2 section">
        <div className="footer2__container container">
          <Link to="/">
            <img src={vibestreamLogo} className="footer2__logo" alt="VibeStream logo" />
          </Link>

          <p className="footer2__text">&copy; 2024 VibeStream</p>
        </div>
      </footer>
    </>
  )
}

export default Footer