import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

const twitter = require('../img/twitter.png');
const instagram = require('../img/instagram.png');
const facebook = require('../img/facebook.png');


const Footer = (props) => {
    return (
      <footer className="text-muted bg-dark">
        <div className="container">
          <div className="float-left">
            <div>
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <img className="social-link" src={twitter} alt="twitter"/>
              </a>
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <img className="social-link" src={instagram} alt="instagram"/>
              </a>
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <img className="social-link" src={facebook} alt="facebook" />
              </a>
            </div>
            <div>
              <p>Connect with us</p>
            </div>
          </div>
          <div className="float-right">
            <ul className="nav">
              <li className="nav-item"><Link to="/#" className="nav-link">Donate</Link></li>
              <li className="nav-item"><Link to="/#">Security</Link></li>
              <li className="nav-item"><Link to="/#">Feedback</Link></li>
              <li className="nav-item btn"><Link to="/#">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    );
}
 
export default Footer;