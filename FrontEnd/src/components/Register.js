import React, { useState } from 'react';
import { Buffer } from 'buffer';
import '../css/register.css';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import {
  firstNameValidator,
  lastNameValidator,
  addressValidator,
  emailValidator,
  phoneValidator,
  passwordValidator,
} from './Validator';

const Register = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [picture, setPicture] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [telephoneNumberError, setTelephoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const isFirstNameValid = firstNameValidator(firstName);
    if (isFirstNameValid !== '') {
      setFirstNameError(isFirstNameValid);
    }
    const isLastNameValid = lastNameValidator(lastName);
    if (isLastNameValid !== '') {
      setLastNameError(isLastNameValid);
    }
    const isAddressValid = addressValidator(address);
    if (isAddressValid !== '') {
      setAddressError(isAddressValid);
    }
    const isPhoneValid = phoneValidator(phone);
    if (isPhoneValid !== '') {
      setTelephoneNumberError(isPhoneValid);
    }
    const isEmailValid = emailValidator(email);
    if (isEmailValid !== '') {
      setEmailError(isEmailValid);
    }
    const isPasswordValid = passwordValidator(password);
    if (isPasswordValid !== '') {
      setPasswordError(isPasswordValid);
    }

    if (
      isFirstNameValid === '' &&
      isLastNameValid === '' &&
      isAddressValid === '' &&
      isPhoneValid === '' &&
      isEmailValid === '' &&
      isPasswordValid === ''
    ) {
      // Invoke auth.Service that call API to insert data
      authService.register(
        { firstName, lastName, address, phone, picture, email, password },
        (error) => {
          if (!error) {
            navigate('/'); //Redirect to main with token in browser storage with the name x-auth-token
          } else {
            console.log(error.data.message);
          }
        }
      );
    }
  };

  const handleImageBuffer = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = Buffer.from(reader.result).toString('base64');
      console.log(buffer);
      setPicture(buffer);
    };
    // console.log(file);
    // setPicture(file);
  };

  return (
    <div className="bg-register p-5">
      <div className="d-flex justify-content-center mb-4">
        <h3 className="text-white">Join Us</h3>
      </div>
      <div className="card-register card">
        <form className="form-signin" onSubmit={handleSubmit}>
          {/* Validators */}
          <p
            className={
              firstNameError ? 'alert alert-danger text-center' : 'hidden'
            }
          >
            {firstNameError}
          </p>
          <p
            className={
              lastNameError ? 'alert alert-danger text-center' : 'hidden'
            }
          >
            {lastNameError}
          </p>
          <p
            className={
              addressError ? 'alert alert-danger text-center' : 'hidden'
            }
          >
            {addressError}
          </p>
          <p
            className={
              telephoneNumberError ? 'alert alert-danger text-center' : 'hidden'
            }
          >
            {telephoneNumberError}
          </p>
          <p
            className={emailError ? 'alert alert-danger text-center' : 'hidden'}
          >
            {emailError}
          </p>
          <p
            className={
              passwordError ? 'alert alert-danger text-center' : 'hidden'
            }
          >
            {passwordError}
          </p>

          {/* HTML */}
          {/* <h1 className="h3 mb-3 font-weight-normal text-center">Register to Lend a Hand</h1> */}

          <label htmlFor="inputFirstName" className="sr-only">
            First Name
          </label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            type="text"
            id="firstName"
            className="form-control"
            placeholder="Enter First Name"
            autoFocus
            onBlur={() => {
              const error = firstNameValidator(firstName);
              setFirstNameError(error);
          }}
          />

          <br />

          <label htmlFor="inputLastName" className="sr-only">
            Last Name
          </label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Enter Last Name"
<<<<<<< HEAD
            onBlur={() => {
              const error = lastNameValidator(lastName);
              setLastNameError(error);
          }}
=======
            required
>>>>>>> dev
          />

          <br />

          <label htmlFor="inputAddress" className="sr-only">
            Address
          </label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            type="text"
            id="address"
            className="form-control"
            placeholder="Enter Address"
<<<<<<< HEAD
            onBlur={() => {
              const error = addressValidator(address);
              setAddressError(error);
          }}
=======
            required
>>>>>>> dev
          />

          <br />

          <label htmlFor="inputTelephoneNumber" className="sr-only">
            Telephone Number
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            name="telephoneNumber"
            type="number"
            id="telephoneNumber"
            className="form-control"
            placeholder="Enter Telephone Number"
<<<<<<< HEAD
            onBlur={() => {
              const error = phoneValidator(phone);
              setTelephoneNumberError(error);
          }}
=======
            required
>>>>>>> dev
          />

          <br />

          {/* Picture is Not Mandatory */}
          <label htmlFor="inputPicture" className="sr-only">
            Picture
          </label>
          <input
            onChange={handleImageBuffer}
            name="picture"
            type="file"
            id="picture"
            className="form-control"
            required
          />

          <br />

          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
<<<<<<< HEAD
            onBlur={() => {
              const error = emailValidator(email);
              setEmailError(error);
          }}
=======
            required
>>>>>>> dev
          />

          <br />

          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            onBlur={() => {
              const error = passwordValidator(password);
              setPasswordError(error);}}
          />

          <div className="d-flex mt-4">
            <button
              className="btn register-btn btn-lg btn-primary btn-block"
              type="submit"
            >
              Register
            </button>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <p>
              Already a member? <Link to="/signin">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
