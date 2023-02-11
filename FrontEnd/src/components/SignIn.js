import React, { useState } from 'react';
import '../css/signin.css';
import { useNavigate } from "react-router-dom";
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
        <form className="form-signin" onSubmit={handleSubmit}>
            <p className={errors ? 'alert alert-danger text-center' : 'hidden'}>{errors}</p>
            <p className={emailError ? 'alert alert-danger text-center' : 'hidden'}>{emailError}</p>
            <p className={passwordError ? 'alert alert-danger text-center' : 'hidden'}>{passwordError}</p>
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input onChange={e => setEmail(e.target.value)} name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input onChange={e => setPassword(e.target.value)} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
     );
}
 
export default SignIn;