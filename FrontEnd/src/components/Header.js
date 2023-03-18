import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import componentService from '../services/componentService';
import '../css/header.css';

const Header = () => {

  const navigate = useNavigate();

  const logo = require('../img/logo.png');

  const logout = () => {
    authService.signout().catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark justify-content-between">
      <div className="container">
        <Link to="/#" className="d-flex align-items-center">
        <img className="logo-img navbar-brand" src={logo} alt="logo"/>
        </Link>

        <div className="d-flex justify-content-between">       
          <div className="navbar-nav">
          { authService.isAuthenticated() ? 
            <div className="nav-item active dropdown d-block">
              <button class="btn nav-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {componentService.grabMyUserDetails().email}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><button type="button" className="dropdown-item" onClick={() => navigate('/postcreate')}>Write a Post</button></li>
                <li><Link className="dropdown-item" onClick={ () => logout() }>Sign out</Link></li>
              </ul>
            </div>
          :
            <div className="d-flex navbar-nav">
              <Link className="nav-link nav-item" to="/signin">Sign in</Link>
              <Link className="nav-link nav-item" to="/register">Register</Link>
            </div> 
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
