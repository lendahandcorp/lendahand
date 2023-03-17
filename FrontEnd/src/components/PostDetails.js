//this is a placeholder component for the body section.
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';

const no_image = require('../img/no_image.png');
const tempPosts = require('../pseudodata_posts.json')

const PostDetails = (props) => {
    const [post, setPost] = useState([])
    const [writer, setWriter] = useState([])

    const params = useParams();

    useEffect(() => {
        dataService.getOnePost(params.id, post => {
            dataService.getOneUser("63f414487cf34484cee0fda8", user => {
                console.log(user);
                setWriter(user);
            })
            console.log(post);
            setPost(post);
        })

    }, [])

    const getDate = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(post.availability);

        let str = `${months[date.getMonth()]} 
                    ${date.getDate()}${getDaySuffix(date.getDate())}, 
                    ${date.getFullYear()}`
        //console.log(str);
        return str;
    }

    const getDaySuffix = (i) => {
        const daySuffix = ["st", "nd", "rd", "th"]
        //console.log(i);
        if (i > 3) {
            return daySuffix[3];
        } else {
            return daySuffix[i - 1];
        }
    }

    const convertImage = (a) => {
        //return `data:image/png;base64,${a}`;
        return `data:image/png;base64,${a}`;
    }

    const userRating = (a) => {
        return `XX---`;
    }
    const averageRating = (a) => {
        return `XXX--`;
    }


    // console.log(params.id)
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <img alt="Bootstrap Image Preview" src={convertImage(post.media)} />
                    <p>
                        <span>Author: {`${writer.firstName} ${writer.lastName}`}</span>
                    </p>
                    <p>
                        Ends: {getDate()}
                    </p>
                </div>
                <div class="col-md-6">

                    <button type="button" class="btn btn-success">
                        edit
                    </button>
                    <h2>
                        {post.title}
                    </h2>
                    <p>
                        {post.body}
                    </p>
                    <p>
                        <a class="btn" href="#">View details »</a>
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6">
                            <p>
                                User rating: {userRating()}
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p>
                                Average post rating: {averageRating()}
                            </p>
                        </div>
                    </div>
                    {
                        post.status == "Open"
                            ?  
                            <button type="button" class="btn btn-primary">
                                Apply
                            </button>   :null  
                    }
                    {
                        post.status == "Closed"
                            ?   
                            <button type="button" class="btn btn-sm btn-outline-secondary">
                                Review
                            </button>   :null    
                    }
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                </div>
            </div>
        </div>
    )
}

export default PostDetails