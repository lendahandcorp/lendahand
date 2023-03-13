import jwtDecode from 'jwt-decode';
import axios from 'axios'

class componentService {

    // Return jwt decoded to read user details
    grabMyUserDetails () {
        const userDetail = jwtDecode(localStorage.getItem('token'));
        /** Return is an object like this:
         * {userId: '63f414487cf34484cee0fda8', email: 'john2@email.com', iat: 1678456289}
        **/ 
        return userDetail;
    }

    // Return an object with hands requested and hands given per userID
    async countMyHands (userID) {

        let posts = await axios.get(`${process.env.REACT_APP_API_URL}/posts`)

        let userHands = {
            "handsRequested": "",
            "handsGiven": ""
        }
        // Counting how many times userID appears on "writer" property of post
        userHands.handsRequested = posts.data.reduce((handsRequestedCounter, post)=>{
            if(post.writer === userID) handsRequestedCounter += 1
            return handsRequestedCounter
        },0)
        // Counting how many times userID appears on "people_accepted" array property of post
        userHands.handsGiven = posts.data.reduce((handsGivenCounter, post)=>{
            if(post.people_accepted.filter(userAccepted => userAccepted.userID === userID).length !== 0) handsGivenCounter += 1
            return handsGivenCounter
        },0)

        return userHands
    }







}

export default new componentService();