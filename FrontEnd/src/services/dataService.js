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

    getReviews(id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/reviews/${id}`, this.getUserId())
        .then(response => {
            callback(response.data);
        })
    }

    getAllReviews(callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/reviews`)
        .then(response => {
            callback(response.data);
             
        })
    }

    getPosts(callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/posts`)
        .then(response => {
            callback(response.data);
        })
    }

    getOnePost(id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(response => {
                callback(response.data)
            })
    }

    getTags(callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/tags/`)
            .then(response => {
                callback(response.data);
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

    createReview(APIdata, callback) {
        console.log(APIdata)
        axios.post(`${process.env.REACT_APP_API_URL}/reviews`, APIdata, this.getUserId())
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

    DeleteReview(id, callback) {
        axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${id}`, this.getUserId())
            .then(
                response => {
                    console.log(response);
                    if (response.status === 201) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                callback(false)
            })
    }

    updatePost(param, APIdata, callback) {
        console.log(APIdata)
        axios.put(`${process.env.REACT_APP_API_URL}/posts/${param}`, APIdata, this.getUserId())
            .then(
                response => {
                    if (response.status === 204) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                callback(false)
            })
    }

    acceptApplicant(applicant_id, post_id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${post_id}`)
        .then(response => {

            let APIdata = response.data;

            APIdata.applicants = APIdata.applicants.filter(a => {
                return a != applicant_id;
            })

            APIdata.tags = APIdata.tags.map(tag => {
                return {title: tag.title}
            })
            delete APIdata["__v"]

            APIdata.people_accepted.push(applicant_id);

            axios.put(`${process.env.REACT_APP_API_URL}/posts/${post_id}`, APIdata, this.getUserId())
            .then(
                response => {
                    if (response.status === 204) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                callback(false)
            })
        })
    }

    //This is for development only.
    clearApplicant(post_id, callback) {

        axios.get(`${process.env.REACT_APP_API_URL}/posts/${post_id}`)
        .then(response => {

            let APIdata = response.data;


            APIdata.tags = APIdata.tags.map(tag => {
                return {title: tag.title}
            })
            delete APIdata["__v"]

            APIdata.people_accepted = [];
            APIdata.applicants = [];

            axios.put(`${process.env.REACT_APP_API_URL}/posts/${post_id}`, APIdata, this.getUserId())
            .then(
                response => {
                    if (response.status === 204) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                callback(false)
            })
        })
    }

    ClosePost(post_id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${post_id}`)
        .then(response => {


            let APIdata = response.data;

            APIdata.tags = APIdata.tags.map(tag => {
                return {title: tag.title}
            })
            delete APIdata["__v"]

            APIdata.status = "Closed";


            axios.put(`${process.env.REACT_APP_API_URL}/posts/${post_id}`, APIdata, this.getUserId())
            .then(
                response => {
                    if (response.status === 204) {
                        //console.log(response.data.status)
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                callback(false)
            })
        })
    }
    OpenPost(post_id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${post_id}`)
        .then(response => {


            let APIdata = response.data;
            //console.log(APIdata.tags)

            APIdata.tags = APIdata.tags.map(tag => {
                return {title: tag.title}
            })
            delete APIdata["__v"]
            //console.log(APIdata)
            APIdata.status = "Open";


            axios.put(`${process.env.REACT_APP_API_URL}/posts/${post_id}`, APIdata, this.getUserId())
            .then(
                response => {
                    if (response.status === 204) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                callback(false)
            })
        })
    }

    revokeApplicant(applicant_id, post_id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${post_id}`)
        .then(response => {

            let APIdata = response.data;

            APIdata.people_accepted = APIdata.people_accepted.filter(a => {
                return a != applicant_id;
            })

            APIdata.tags = APIdata.tags.map(tag => {
                return {title: tag.title}
            })
            delete APIdata["__v"]

            APIdata.applicants.push(applicant_id);


            axios.put(`${process.env.REACT_APP_API_URL}/posts/${post_id}`, APIdata, this.getUserId())
            .then(
                response => {
                    if (response.status === 204) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                callback(false)
            })
        })
    }

    addApplicant(applicant_id, post_id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${post_id}`)
        .then(response => {
            //console.log(response.data)

            let APIdata = response.data;

            APIdata.tags = APIdata.tags.map(tag => {
                return {title: tag.title}
            })
            delete APIdata["__v"]

            APIdata.applicants.push(applicant_id);

            axios.put(`${process.env.REACT_APP_API_URL}/posts/${post_id}`, APIdata, this.getUserId())
            .then(
                response => {
                    if (response.status === 204) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                callback(false)
            })
        })
    }

    deletePost(id, callback) {
        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, this.getUserId())
            .then(
                response => {
                    //console.log(response);
                    if (response.status === 200) {
                        callback(true)
                    }
                })
            .catch(error => {
                console.log(error)
                console.log(error.response)
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
        axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`, this.getUserId())
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