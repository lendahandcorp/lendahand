import React, { useState } from 'react';
import '../css/signin.css';
import { Link, useNavigate } from "react-router-dom";
import authService from '../services/authService'
import {emailValidator, passwordValidator} from './Validator'



const SignIn = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault()
        const isEmailValid = emailValidator(email)
        if(isEmailValid !== "") {
            setEmailError(isEmailValid)
        }
        const isPasswordValid = passwordValidator(password)
        if(isPasswordValid !== "") {
            setPasswordError(isPasswordValid)
        }
        if(isEmailValid === "" && isPasswordValid === "")
        {       
            authService.signin({ email, password }, (error)=> {
                if(!error) {
                    navigate('/')
                    props.updateNav()
                }
                else {
                    if(error.status===401) {
                        setErrors(error.data.message)
                    }
                }
            })
        }

    }

    return ( 
        <div className="card1 p-5">
            <div className="d-flex justify-content-center mb-4">
                <h3 className="text-white">Sign In</h3>
            </div>
            <div className="card-signin card">
                <form className="form-signin" onSubmit={handleSubmit}>
                    {/* <div className="mx-auto alertDiv">
                    <p className={errors ? 'alert alert-danger text-center' : 'hidden'}>{errors}</p>
                    <p className={emailError ? 'alert alert-danger text-center' : 'hidden'}>{emailError}</p>
                    <p className={passwordError ? 'alert alert-danger text-center' : 'hidden'}>{passwordError}</p>
                    </div> */}

                    {/* <h1 className="h3 mb-5 font-weight-normal text-center">Sign in</h1> */}
                    
                    <p className={errors ? 'text-danger text-center' : 'hidden'}>{errors}</p>
                    <span><p className={emailError ? 'text-danger validationErr' : 'hidden'}>{emailError}</p></span>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="sr-only form-label">Email</label>
                        <input onChange={e => setEmail(e.target.value)} name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address"  autoFocus  
                        onBlur={() => {
                        const error = emailValidator(email);
                        setEmailError(error);}} />
                    </div>

                    <br/>

                    <p className={passwordError ? 'text-danger validationErr' : 'hidden'}>{passwordError}</p>
                    <div className="mb-3">
                    <label htmlFor="inputPassword" className="sr-only form-label">Password</label>
                    <input onChange={e => setPassword(e.target.value)} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" 
                     onBlur={() => {
                        const error = passwordValidator(password);
                        setPasswordError(error);}}/>
                    </div>

                    <div className="d-flex mt-5">
                        <button className="btn signin-btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <p>Don't have an account? <Link to="/register"><span className="link-primary "><u>Sign up</u></span></Link></p>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default SignIn;