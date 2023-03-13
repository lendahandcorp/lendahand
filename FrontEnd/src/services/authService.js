import axios from 'axios';
import jwt from 'jwt-decode';

class authService {
  signin(credentials, callback) {
    // take care of login
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, credentials)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.headers['x-auth-token']);
          callback(null);
        }
      })
      .catch((error) => {
        callback(error.response);
      });
  }

  register(credentials, callback) {
    // take care of register
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/register`, credentials)
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem('token', response.headers['x-auth-token']);
          callback(null);
        }
      })
      .catch((error) => {
        callback(error.response);
      });
  }

  isAuthenticated() {
    // do stuff after login
    return localStorage.getItem('token');
  }

  signout() {
    localStorage.removeItem('token');
  }

  // for Profile Component
  getOneUser(id, callback) {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((response) => {
        callback(response.data);
      });
  }

  showEmail() {
    const auth = localStorage.getItem('token');
    // console.log(jwt(auth).email);
    return jwt(auth).email;
  }
}

export default new authService();
