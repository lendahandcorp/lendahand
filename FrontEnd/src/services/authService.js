import axios from 'axios';

class authService {

    signin(credentials, callback){
        // take care of login
        axios.post(`${process.env.REACT_APP_API_URL}/pokemon/user/login`, credentials)
        .then(
            response => {
                if(response.status=== 200) {
                    localStorage.setItem('token', response.headers['x-auth-token'])
                    callback(null)
                }
            })
            .catch(error => {
                callback(error.response)
            })
    }

    register(credentials, callback){
        // take care of register
        axios.post(`${process.env.REACT_APP_API_URL}/pokemon/user/register`, credentials)
        .then(
            response => {
                if(response.status=== 201) {
                    localStorage.setItem('token', response.headers['x-auth-token'])
                    callback(null)
                }
            })
            .catch( error => {
                callback(error.response)
            })
    }

    isAuthenticated(){
        // do stuff after login
        return localStorage.getItem('token')
    }

    signout(){
        localStorage.removeItem('token')
    }
}

export default new authService()