//this is a placeholder component for the body section.
import React from 'react';
import { Link } from 'react-router-dom';

const no_image = require('../img/no_image.png');

const Post = (props) => {

    return (
        <article class="post vt-post">
            <div class="row">
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div class="post-type post-img">
                        <a href="#"><img src={no_image} class="img-fluid" alt="blank" /></a>
                    </div>
                    <div class="author-info author-info-2">
                        
                    </div>
                </div>
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                    <div class="caption">
                        <h3 class="md-heading"><a href="#">{props.tc.title}</a></h3>
                        <p> {props.tc.body} </p>
                        <button type="button" onClick={() => props.gotToProfile(props.tc.poster_id)} className="btn btn-sm btn-outline-secondary">view poster</button>
                    </div>
                    <ul class="list-inline">
                            <li>
                                <div class="info">
                                    <p>Posted on:</p>
                                    <strong>Mar 21, 2015</strong>
                                </div>
                            </li>
                            <li>
                            </li>
                        </ul>
                </div>
            </div>
            <br/>
        </article>
    )
}

export default Post