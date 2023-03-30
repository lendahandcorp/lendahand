import React, { useState } from 'react';
import '../css/signin.css';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { emailValidator, passwordValidator } from './Validator';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(emailValidator(event.target.value));
    setErrors('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(passwordValidator(event.target.value));
    setErrors('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (emailValidator(email) !== '') {
      setEmailError(emailValidator(email));
      return;
    }

    if (passwordValidator(password) !== '') {
      setPasswordError(passwordValidator(password));
      return;
    }

    authService.signin({ email, password }, (error) => {
      if (!error) {
        navigate('/');
        props.updateNav();
      }
      // else {
      //   if (error.status === 401) {
      //     setErrors(error.data.message);
      //   }
      // }
      setErrors('Email address and password combination is incorrect.');
    });
  };

  return (
    <div className="card1 p-5">
      <div className="d-flex justify-content-center mb-4">
        <h3 className="text-white">Sign In</h3>
      </div>
      <div className="card-signin card">
        <form className="form-signin" onSubmit={handleSubmit}>
          <p className={errors ? 'text-danger text-center' : 'hidden'}>
            {errors}
          </p>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="sr-only form-label">
              Email
            </label>
            <input
              onChange={handleEmailChange}
              value={email}
              name="email"
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              autoFocus
            />
            <p className={emailError ? 'text-danger validationErr' : 'hidden'}>
              {emailError}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="sr-only form-label">
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              value={password}
              name="password"
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
            />
            <p
              className={passwordError ? 'text-danger validationErr' : 'hidden'}
            >
              {passwordError}
            </p>
          </div>
          <div className="d-flex mt-5">
            <button
              className="btn signin-btn btn-lg btn-primary btn-block"
              type="submit"
            >
              Sign in
            </button>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
