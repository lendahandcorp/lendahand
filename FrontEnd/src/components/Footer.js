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
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                {/* <img className="social-link" src={twitter} alt="twitter"/> */}
                <i className="fa-brands fa-twitter fa-2xl"></i>
              </a>
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                {/* <img className="social-link" src={instagram} alt="instagram"/> */}
                <i className="fa-brands fa-instagram fa-2xl"></i>
              </a>
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
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
                <li className="nav-item"><Link to="/#" className="foot-link">Donate</Link></li>
                <li className="nav-item"><Link to="/#" className="foot-link">Security</Link></li>
                <li className="nav-item"><Link to="/#" className="foot-link">Feedback</Link></li>
                <li className="nav-item btn"><Link to="/contact" className="btn customButton2 rounded shadow-sm fw-bold">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-center mt-3 text-white"><small>2023 Copyright</small></p>
        </div>
      </footer>
    );
}
 
export default Footer;