//this is a placeholder component for the body section.
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

import Post from './Post';

const Home = (props) => {

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
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        </div>
    )
}

export default Home