import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

const twitter = require('../img/twitter.png');
const instagram = require('../img/instagram.png');
const facebook = require('../img/facebook.png');


const Footer = (props) => {
    return (
      <footer className="text-muted">
        <div className="container d-flex justify-content-between">
          <div className="float-left socials">
            <div className="d-flex justify-content-between">
              <a href="https://twitter.com/LendAHandCanada/" target="_blank" rel="noreferrer">
                {/* <img className="social-link" src={twitter} alt="twitter"/> */}
                <i className="fa-brands fa-twitter fa-2xl"></i>
              </a>
              <a href="https://www.instagram.com/lend_a_hand_canada/" target="_blank" rel="noreferrer">
                {/* <img className="social-link" src={instagram} alt="instagram"/> */}
                <i className="fa-brands fa-instagram fa-2xl"></i>
              </a>
              <a href="/" target="_blank" rel="noreferrer" disabled>
                {/* <img className="social-link" src={facebook} alt="facebook" /> */}
                <i className="fa-brands fa-facebook fa-2xl"></i>
              </a>
            </div>
            <div className='text-center mt-3'>
              <p className='text-light fw-bold'>Connect with us</p>
            </div>
          </div>
          <div className="float-right other-links">
            <ul className="nav d-flex justify-content-between align-items-center">
                <li className="nav-item"><Link to="/donate" className="foot-link">Donate</Link></li>
                <li className="nav-item"><Link to="/security" className="foot-link">Security</Link></li>

                <li className="nav-item"><Link to="/About" className="foot-link">About Us</Link></li>
                
                <li className="nav-item btn"><Link to="/contact" className="btn customButton2 rounded shadow-sm fw-bold">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-center mt-3 text-white"><small>Made with <i class="fa-solid fa-heart"></i> by Team Awesome.</small></p>
        </div>
      </footer>
    );
}
 
export default Footer;