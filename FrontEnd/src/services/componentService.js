import jwtDecode from 'jwt-decode';
import axios from 'axios'
const blank_images = require('../img/blank_images.json')

class componentService {

    // Return jwt decoded to read user details
    grabMyUserDetails () {
        const userDetail = jwtDecode(localStorage.getItem('token'));
        /** Return is an object like this:
         * {userId: '63f414487cf34484cee0fda8', email: 'john2@email.com', iat: 1678456289}
        **/ 
        return userDetail;
    }

    //imageType decides what blank image is returned if a is not base64.
    convertImageFromBase64 (a, imageType) {
        var regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        
        if(a === undefined || a === null || !regex.test(a) || a === "" || typeof a != "string"){

            if(imageType == "img")  return blank_images.image;
            else if(imageType == "pic") return blank_images.picture;

        } else {
            return `data:image/png;base64,${a}`;
        }
    }


    // Return an object with hands requested and hands given per userID
    async grabMyPosts (userID) {

        let posts = await axios.get(`${process.env.REACT_APP_API_URL}/posts`)

        let userPosts = {
            "postCreatedByUser": "",
            "postAttendedByUser": ""
        }
        // Returning posts where userID appears on "writer" property of post
        userPosts.postCreatedByUser = posts.data.filter(post => post.writer === userID)

        // Returning posts where userID appears on "people_accepted" array property of post
        let postAttendedByUser = []
        posts.data.forEach(post => {
            if(post.people_accepted.filter(peopleAccepted =>peopleAccepted.userID === userID).length!==0) {
                postAttendedByUser.push(post)
            }
        });
        userPosts.postAttendedByUser = postAttendedByUser

        return userPosts
    }

    insertUserDescription (userID, description, token, callback) {

        axios.put(`${process.env.REACT_APP_API_URL}/users/${userID}`, description, token)
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

export default new componentService();