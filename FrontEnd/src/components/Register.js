import React, { useState } from 'react';
import { Buffer } from 'buffer';
import '../css/signin.css';
import { useNavigate } from 'react-router-dom';
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
      const buffer = Buffer.from(reader.result);
      console.log(buffer);
      setPicture(buffer);
    };
    // console.log(file);
    // setPicture(file);
  };

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      {/* Validators */}
      <p
        className={firstNameError ? 'alert alert-danger text-center' : 'hidden'}
      >
        {firstNameError}
      </p>
      <p
        className={lastNameError ? 'alert alert-danger text-center' : 'hidden'}
      >
        {lastNameError}
      </p>
      <p className={addressError ? 'alert alert-danger text-center' : 'hidden'}>
        {addressError}
      </p>
      <p
        className={
          telephoneNumberError ? 'alert alert-danger text-center' : 'hidden'
        }
      >
        {telephoneNumberError}
      </p>
      <p className={emailError ? 'alert alert-danger text-center' : 'hidden'}>
        {emailError}
      </p>
      <p
        className={passwordError ? 'alert alert-danger text-center' : 'hidden'}
      >
        {passwordError}
      </p>
      {/* HTML */}
      <h1 className="h3 mb-3 font-weight-normal text-center">
        Register to Lend a Hand
      </h1>
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
        required
        autoFocus
      />
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
        required
        autoFocus
      />
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
        required
        autoFocus
      />
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
        required
        autoFocus
      />
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
      />
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
        required
        autoFocus
      />
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
        required
      />
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default Register;
