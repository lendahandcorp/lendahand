import React from 'react';
import { useNavigate } from 'react-router-dom';

import Post from './Post';

let tempPosts = [
    {
        title: "title",
        body: "beep boop bop i am description text beepee",
        poster_id: 1,
        post_id: 1
    },
    {
        title: "title2",
        body: "beep boop bop i am description text beepee",
        poster_id: 1,
        post_id: 2
    },
    {
        title: "title3",
        body: "beep boop bop i am description text beepee",
        poster_id: 2,
        post_id: 3
    },
    {
        title: "title4",
        body: "beep boop bop i am description text beepee",
        poster_id: 3,
        post_id: 4
    }
]

const Home = (props) => {

    const navigate = useNavigate();

    const gotToProfile = (id) => {
        navigate('/profile/' + id);
    }

    const showPost = (id) => {
        //navigate('/post/' + id); // this will be for when post-page is made
    }



    return (
        <div class="container">
            {/* <h1>Home.</h1> */}
            {/* Search bar */}
            <div class="input-group rounded">
                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <span class="input-group-text border-0" id="search-addon">
                    <i class="fas fa-search"></i>
                </span>
            </div>

            {/* Post Container */}
            <div class="container">
                <div class="col-md-12 col-lg-12">

                    {
                        tempPosts.forEach(tc => {
                            return <Post data={tc} goToProfile={gotToProfile} />
                        })
                    }
                    

                </div>
            </div>
        </div>
    )
}

export default Home