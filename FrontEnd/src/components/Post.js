//this is a placeholder component for the body section.
import React from 'react';
import { Link } from 'react-router-dom';

const no_image = require('../img/no_image.png');



const Post = (props) => {

    const spotsLeft = () => {
        return props.data.people_needed - props.data.people_accepted.length
    }

    return (
        <article class="post vt-post">
            <div class="row">
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div class="post-type post-img">
                        <a href="#"><img src={props.data.image != "" ? props.data.image : no_image} class="img-fluid" alt="blank" /></a>
                    </div>
                    <div class="author-info author-info-2">

                    </div>
                </div>
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                    <div class="caption">
                        <h3 class="md-heading"><a href="#">{props.data.title}</a></h3>
                        <p> {props.data.body} </p>
                        <button type="button" onClick={() => props.goToProfile(props.data.writer)} className="btn btn-sm btn-outline-secondary">view author</button>
                        <button type="button" onClick={() => props.showPost(props.data._id)} className="btn btn-sm btn-outline-secondary">view post</button>
                    </div>
                    <ul class="list-inline">
                        <li>
                            <div class="info">
                                {
                                    props.data.people_needed == props.data.people_accepted.length 
                                    ? <p>Spots left (full)</p>

                                    : <p>Spots left {spotsLeft()}/{props.data.people_needed}</p>
                                }
                                
                                <p>Posted on:</p>
                                <strong>Mar 21, 2015</strong>
                            </div>
                        </li>
                        <li>
                        </li>
                    </ul>

                    <ul class="list-inline">
                        {
                            props.data.tags.map(tag => {
                                return <li class="d-inline" 
                                            onClick={() => props.tagClicked(tag)} 
                                        >
                                            {" #"+tag}
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <br />
        </article>
    )
}

export default Post