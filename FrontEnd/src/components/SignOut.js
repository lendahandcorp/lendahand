import  {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const SignOut = (props) => {
    const navigate = useNavigate();

   

    return(
        useEffect(() => {
            authService.signout() 
            if(!authService.isAuthenticated()) {
                navigate('/')
            } 
          }, )
    )


}

export default SignOut;