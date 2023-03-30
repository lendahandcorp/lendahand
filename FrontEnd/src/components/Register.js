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

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'firstName':
        setFirstName(event.target.value);
        setFirstNameError(firstNameValidator(event.target.value));
        break;
      case 'lastName':
        setLastName(event.target.value);
        setLastNameError(lastNameValidator(event.target.value));
        break;
      case 'address':
        setAddress(event.target.value);
        setAddressError(addressValidator(event.target.value));
        break;
      case 'phone':
        setPhone(event.target.value);
        setTelephoneNumberError(phoneValidator(event.target.value));
        break;
      case 'email':
        setEmail(event.target.value);
        setEmailError(emailValidator(event.target.value));
        break;
      case 'password':
        setPassword(event.target.value);
        setPasswordError(passwordValidator(event.target.value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstNameValidator(firstName) !== '') {
      setFirstNameError(firstNameValidator(firstName));
      return;
    }

    if (lastNameValidator(lastName) !== '') {
      setLastNameError(lastNameValidator(lastName));
      return;
    }

    if (addressValidator(address) !== '') {
      setAddressError(addressValidator(address));
      return;
    }

    if (phoneValidator(phone) !== '') {
      setTelephoneNumberError(phoneValidator(phone));
      return;
    }

    if (emailValidator(email) !== '') {
      setEmailError(emailValidator(email));
      return;
    }

    if (passwordValidator(password) !== '') {
      setPasswordError(passwordValidator(password));
      return;
    }
    console.log(picture);
    // Invoke auth.Service that call API to insert data
    authService.register(
      { firstName, lastName, address, phone, picture, email, password },
      (error) => {
        if (!error) {
          navigate('/'); //Redirect to main with token in browser storage with the name x-auth-token
        } else {
          console.log(error.data);
        }
      }
    );
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
          {/* HTML */}
          {/* <h1 className="h3 mb-3 font-weight-normal text-center">Register to Lend a Hand</h1> */}

          <p
            className={firstNameError ? 'text-danger validationErr' : 'hidden'}
          >
            {firstNameError}
          </p>
          <label htmlFor="inputFirstName" className="sr-only">
            First Name
          </label>
          <input
            onChange={handleChange}
            name="firstName"
            type="text"
            id="firstName"
            className="form-control"
            placeholder="Enter First Name"
            autoFocus
            required
          />

          <br />

          <p className={lastNameError ? 'text-danger validationErr' : 'hidden'}>
            {lastNameError}
          </p>
          <label htmlFor="inputLastName" className="sr-only">
            Last Name
          </label>
          <input
            onChange={handleChange}
            name="lastName"
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Enter Last Name"
            required
          />

          <br />

          <p className={addressError ? 'text-danger validationErr' : 'hidden'}>
            {addressError}
          </p>
          <label htmlFor="inputAddress" className="sr-only">
            Address
          </label>
          <input
            onChange={handleChange}
            name="address"
            type="text"
            id="address"
            className="form-control"
            placeholder="Enter Address"
            required
          />

          <br />

          <p
            className={
              telephoneNumberError ? 'text-danger validationErr' : 'hidden'
            }
          >
            {telephoneNumberError}
          </p>
          <label htmlFor="inputTelephoneNumber" className="sr-only">
            Telephone Number
          </label>
          <input
            onChange={handleChange}
            name="phone"
            type="text"
            id="telephoneNumber"
            className="form-control"
            placeholder="TelephoneNumber"
            required
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

          <p className={emailError ? 'text-danger validationErr' : 'hidden'}>
            {emailError}
          </p>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
          />

          <br />

          <p className={passwordError ? 'text-danger validationErr' : 'hidden'}>
            {passwordError}
          </p>
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
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
