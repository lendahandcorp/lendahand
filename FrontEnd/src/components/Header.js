import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import componentService from '../services/componentService';
import '../css/header.css';

const Header = () => {

  const navigate = useNavigate();

  const logo = require('../img/logo.png');

  const [data, updateData] = useState();
  useEffect(() => {
    const getData = async (userId) => {
      const resp = await componentService.countMyHands(userId);
      updateData(resp);
    }
    getData(componentService.grabMyUserDetails().userId);
  }, []);

  const logout = () => {
    authService.signout().catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark justify-content-between mb-4">
    <div className="container">
      <Link to="/#" className="d-flex align-items-center">
       <img className="logo-img navbar-brand" src={logo} alt="logo"/>
      </Link>

      {/* <div className="collapse navbar-collapse">   */}
      <div>       
        <nav className="navbar-nav d-block float-right">
        { authService.isAuthenticated() ? 
          <div className="nav-item active dropdown d-block float-right">
            <Link className="nav-link dropdown-toggle" to="/#" aria-expanded="false">
              {componentService.grabMyUserDetails().email} - {JSON.stringify(data.handsRequested)}
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" onClick={ () => logout() }>Sign out</Link>
            </div>
          </div>
        :
          <div className="d-flex float-right">
            <Link className="nav-link nav-item" to="/signin">Sign in</Link>
            <Link className="nav-link nav-item" to="/register">Register</Link>
          </div> 
          }
        </nav>
      </div>
    </div>
  </nav>
  );
};

export default Header;
