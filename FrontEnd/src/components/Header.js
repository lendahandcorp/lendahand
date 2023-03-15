import { useState, useEffect } from 'react';
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

      {/* <div className="collapse navbar-collapse">   */}
      <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">


      <div className="d-flex justify-content-between">       
        <div className="navbar-nav">
        { authService.isAuthenticated() ? 
          <div className="nav-item active dropdown d-block">
            <Link className="nav-link dropdown-toggle" to="/#" aria-expanded="false">
              {componentService.grabMyUserDetails().email}
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" onClick={ () => logout() }>Sign out</Link>
            </div>
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
    </div>
  </nav>
  );
};

export default Header;
