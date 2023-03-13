//this is a placeholder component for the body section.
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';
const no_image = require('../img/no_image.png');



const Post = (props) => {

    const spotsLeft = () => {
        return props.data.people_needed - props.data.people_accepted.length
    }

    return (
        // <article class="post vt-post">
        //     <div class="row">
        //         <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
        //             <div class="post-type post-img">
        //                 <a href="#"><img src={props.data.image != "" ? props.data.image : no_image} class="img-fluid" alt="blank" /></a>
        //             </div>
        //             <div class="author-info author-info-2">

        //             </div>
        //         </div>
        //         <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
        //             <div class="caption">
        //                 <h3 class="md-heading"><a href="#">{props.data.title}</a></h3>
        //                 <p> {props.data.body} </p>
        //                 <button type="button" onClick={() => props.goToProfile(props.data.poster_id)} className="btn btn-sm btn-outline-secondary">view poster</button>
        //                 <button type="button" onClick={() => props.showPost(props.data.post_id)} className="btn btn-sm btn-outline-secondary">view post</button>
        //             </div>
        //             <ul class="list-inline">
        //                 <li>
        //                     <div class="info">
        //                         <p>Posted on:</p>
        //                         <strong>Mar 21, 2015</strong>
        //                     </div>
        //                 </li>
        //                 <li>
        //                 </li>
        //             </ul>

        //             <ul class="list-inline">
        //                 {
        //                     props.data.tags.map(tag => {
        //                         return <li class="d-inline" 
        //                                     onClick={() => props.tagClicked(tag)} 
        //                                 >
        //                                     {" #"+tag}
        //                                 </li>
        //                     })
        //                 }
        //             </ul>
        //         </div>
        //     </div>
        //     <br />
        // </article>
        <article>
        <div class="row shadow-sm p-3 mb-5 bg-white rounded w-75">
        <div class="col-sm">
    
        <div>
            <img src="https://source.unsplash.com/WLUHO9A_xik/200x200" alt="lol" class="rounded" />
        </div>
    
        <div class="mt-3">
            <img src="https://source.unsplash.com/WLUHO9A_xik/35x35" alt="lol" class="rounded-circle" />
            <span>By Jason Sunnyassy</span>
        </div>
    
        </div>
    
        <div class="col-sm">
        
        <h5 class="fw-bold">Help for moving out</h5>
        
        <h6 class="fst-italic">Availability: 01 Dec 2023</h6>
        
        <span class="fw-light">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure dolores neque libero accusantium fugit amet
            repellat? Quod eligendi, obcaecati nostrum iure, inventore delectus, fugiat ad dolor libero porro velit
            eveniet.
        </span>

        <br/>
        
        <span class="badge badge1">#furniture</span>
        <span class="badge badge2">#Uhaul</span>
        <br/>

            <div class="flex-d mt-2 justify-content-sm-center flex-row-reverse">
            <button type="button" class="btn customButton rounded shadow-sm text-white fw-bold">Quick Help</button>
            </div>


        </div>
    
    </div>
  </article>
    )
}

export default Post