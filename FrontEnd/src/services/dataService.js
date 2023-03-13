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
            //console.log(response.data);


            this.getTags(tagList => {
                //console.log(tagList);
                //foreach post 
                


                let dataWithTags = response.data.map(post => {
                    post.tagData = [];
                    post.tagTitles = [];

                    //foreach tag inside the post add to the new field
                    //console.log(post);
                    //console.log(typeof(post.tags)[0]);
                    
                    if(typeof(post.tags)[0] != "string") {
                        post.tagTitles.push(post.tags[0].title);

                        return post;
                    }

                    post.tags.forEach(tag => {
                        //console.log(tag);

                        let tagname = tagList.filter(t => {
                            return t._id == tag
                        })
                        //console.log(tagname.length);
                        //console.log(tagname[0].title);
                        post.tagData.push(
                            {
                                id: tag,
                                title: tagname[0].title
                            }
                        );
                        post.tagTitles.push(tagname[0].title);

                        //console.log(post);
                    })

                    return post;
                })

                console.log(dataWithTags[0])

                callback(dataWithTags)
            })
        })
    }

    getOnePost(id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(response => {
                callback(response.data)
            })
    }


    getD(id, callback) {

        let userPosts = [];
        let helpedPosts = [];

        //get all posts
        this.getPosts(posts => {
            posts.forEach(post => {
                if (post.writer == id) {
                    //get all posts posted
                    console.log('posted');
                    userPosts.push(post);

                } else if (post.people_accepted.includes(id)) {
                    //get all posts worked in
                    console.log('helped');
                    helpedPosts.push(post);

                }
                //console.log(post);

            });
            console.log(`user posted : ${userPosts.length} posts. and helped ${helpedPosts.length} posts.`);

        })

        callback(userPosts, helpedPosts);
    }

    getTagById(tagId, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/tags/${tagId}`)
            .then(response => {
                console.log(response.data)
                callback(response.data);

            })
    }
    getTags(callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/tags/`)
            .then(response => {
                //console.log(response.data)
                callback(response.data);
            })
    }

    getTagsById(TagIds) {

        axios.get(`${process.env.REACT_APP_API_URL}/tags`)
            .then(response => {
                //console.log(response.data)


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