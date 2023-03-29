//this is a placeholder component for the body section.
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/post.css';
const no_image = require('../img/no_image.png');



const Post = (props) => {
    const getDate = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(props.data.availability);

        let str = `${months[date.getMonth()]} 
                    ${date.getDate()}${getDaySuffix(date.getDate())}, 
                    ${date.getFullYear()}`
        //console.log(str);
        return str;
    }

    const getDaySuffix = (i) => {
        const daySuffix = [ "st", "nd", "rd", "th"]
        //console.log(i);
        if(i > 3) {
            return daySuffix[3];
        }else {
            return daySuffix[i - 1];
        }
    }

    const getTagColorId = (num) => {
        let newNum = num.toString(7);
        newNum = newNum.match(/(\d)$/g)[0];
        newNum = parseInt(newNum, 7);
        newNum++;
        return newNum
    }

    const spotsLeft = () => {
        return props.data.people_needed - props.data.people_accepted.length
    }

    const convertImage = (a) => {
        return `data:image/png;base64,${a}`;
    }

    return (
        <article className="d-flex justify-content-center">
            <div className="row shadow-sm p-3 mb-5 bg-white rounded w-75">
                <div className="col-sm">

                    <div>
                        <img src={convertImage(props.data.media)}
                            alt="lol" 
                            className="rounded postImage"
                            onClick={() => props.showPost(props.data.post_id)}
                             />
                    </div>

                    <div className="btn mt-3 d-flex justify-content-between user" onClick={() => props.goToProfile(props.data.writer)}>
                        <img src="https://source.unsplash.com/WLUHO9A_xik/35x35" alt="lol" className="rounded-circle" />
                        <span className="mt-1">By Jason Sunnyassy</span>
                    </div>

                </div>

                <div className="col-sm d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column">
                        <a className="fw-bold pointer-cursor text-decoration-none h4" onClick={() => props.showPost(props.data._id)}>{props.data.title}</a>
                        {/* <h5 class="fw-bold" >
                            <button type="button" class="btn" onClick={() => props.showPost(props.data.post_id)}>
                                {props.data.title}
                            </button>
                        </h5> */}
                        {/* <button type="button" class="btn" onClick={() => props.showPost(props.data.post_id)}>
                            <h5 class="fw-bold" >
                                {props.data.title}
                            </h5>
                        </button> */}
                        

                        <h6 className="fst-italic">Availability: {getDate()} </h6>

                        <span className="fw-light">
                            {props.data.body}
                        </span>
                    </div>
                    <div className="d-flex">
                        {/* <span class="badge badge1">#furniture</span> */}
                        {/* <span class="badge badge2">#Uhaul</span> */}
                        {
                            props.data.tags.map((tag, i) => {
                                return  <span key={i} class={`badge btn badge badge${getTagColorId(i)}`}
                                    onClick={() => props.tagClicked(tag.title)}
                                >
                                    {" #" + tag.title}
                                </span>
                            })
                        }
                        
                        <div class="d-flex mt-2 justify-content-sm-center justify-content-between ml-5">
                            <button type="button" class="btn customButton rounded shadow-sm text-white fw-bold">Quick Help</button>
                        </div>
                    </div>
                        {/* <div class="d-flex mt-2 justify-content-sm-center flex-row-reverse">
                            <button type="button" class="btn customButton rounded shadow-sm text-white fw-bold">Quick Help</button>
                        </div> */}
                    

                </div>

            </div>
        </article>
    )
}

export default Post