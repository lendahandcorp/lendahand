//this is a placeholder component for the body section.
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';
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
                        <h3 class="md-heading"><a href="#">The Heading Text Size Should Match</a></h3>
                        <p> Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <a class="btn btn-default" href="#" role="button">Read More</a> 
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