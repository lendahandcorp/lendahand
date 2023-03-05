//this is a placeholder component for the body section.
import React from 'react';
import { useParams } from 'react-router-dom';

const no_image = require('../img/no_image.png');
const tempPosts = require('../pseudodata_posts.json')

const PostDetails = (props) => {
    const params = useParams();

    const data = () => {
        return tempPosts[( params.id - 1 )];
    }

    console.log(params.id)
    return (
        <div className="container">
            <h1 className="text-center">
                {data().title}
            </h1>  
            <img src={data().image} class="img-fluid" alt="blank" />
            <p>
                {data().body}
            </p>

            {/* container for reviews */}
            <div className="container">

            </div>
        </div>
    )
}

export default PostDetails