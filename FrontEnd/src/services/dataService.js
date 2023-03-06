import axios from 'axios'
import authService from './authService';

class dataService {

    getUserId() {
        return {
            headers: {
                "x-auth-token": authService.isAuthenticated()
            }
        }
    }


    getPosts(callback) {
        //axios.get(`${process.env.REACT_APP_API_URL}/posts`)
        axios.get(`${process.env.REACT_APP_API_URL}/posts`)
            .then(response => {
                callback(response.data)
            })
    }

    getOnePost(id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(response => {
                callback(response.data)
            })
    }




    createPost(APIdata, callback) {
        axios.post(`${process.env.REACT_APP_API_URL}/posts`, APIdata, this.getUserId())
            .then(
                response => {
                    if (response.status === 201) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error.response)
                callback(false)
            })
    }

    updatePost(param, APIdata, token, callback) {
        console.log(APIdata)
        axios.put(`${process.env.REACT_APP_API_URL}/posts/${param}`, APIdata, token)
            .then(
                response => {
                    if (response.status === 204) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error.response)
                callback(false)
            })
    }

    deletePost(id, token, callback) {
        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, token)
            .then(
                response => {
                    if (response.status === 204) {
                        callback(true)
                    }
                })
            .catch(error => {
                callback(false)
            })
    }





    getUsers(callback) {
        //axios.get(`${process.env.REACT_APP_API_URL}/posts`)
        axios.get(`${process.env.REACT_APP_API_URL}/users`)
            .then(response => {
                callback(response.data)
            })
    }

    getOneUser(id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then(response => {
                callback(response.data)
            })
    }

    createUser(APIdata, token, callback) {
        axios.post(`${process.env.REACT_APP_API_URL}/users`, APIdata, token)
            .then(
                response => {
                    if (response.status === 201) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error.response)
                callback(false)
            })
    }

    updateUsert(param, APIdata, token, callback) {
        console.log(APIdata)
        axios.put(`${process.env.REACT_APP_API_URL}/users/${param}`, APIdata, token)
            .then(
                response => {
                    if (response.status === 204) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error.response)
                callback(false)
            })
    }

}

export default new dataService()