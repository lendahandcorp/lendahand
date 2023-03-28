//this is a placeholder component for the body section.
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';
import componentService from '../services/componentService';
import dataService from '../services/dataService';
const no_image = require('../img/no_image.png');

const blank_images = require('../img/blank_images.json')

const Post = (props) => {


    const [writer, setWriter] = useState({})

    useEffect(() => {
        dataService.getOneUser(props.data.writer, user => {
            //console.log(user);
            setWriter(user);
        })
    }, [])


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

    const aa = () => {
        //console.log(props.data.post_id)
    }
    
    const convertImage = (a, imageType) => {
        //console.log(a);
        var regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        
        //console.log(props.data.title + " a ("+imageType+")");
        // if( props.data.title == "Testing by Joy a"){
        //     console.log("s");
        //     if(imageType == "img"){
        //         console.log(a);
        //     }
        // }
        // if(typeof a != "string"){
        //     console.log(props.data.title + " ("+imageType+") " + typeof(a));
        // }
        if(a === undefined || a === null || !regex.test(a) || a === "" || typeof a != "string"){
            console.log(props.data.title + " ("+imageType+") " + typeof(a));

            if(imageType == "img"){
                //console.log(props.data.title + " img");
                return blank_images.image;

            } else if(imageType == "pic"){
                //console.log(props.data.title + " pic");
                return blank_images.picture;
            } 
        } else {
            //console.log(props.data.title + " a ("+imageType+")");
            return `data:image/png;base64,${a}`;
        }
    }

    const username = () => {
        return `${writer.firstName} ${writer.lastName}`
    }

    return (
        <article className="d-flex justify-content-center">
            <div className="row shadow-sm p-3 mb-5 bg-white rounded w-75">
                <div className="col-sm">

                    <div>
                        <img src={ componentService.convertImageFromBase64(props.data.media, "img") }
                            alt="lol" 
                            className="rounded "
                            onClick={() => props.showPost(props.data._id)}
                            //onClick={() => aa()}
                             />
                    </div>

                    <div class="btn mt-3" onClick={() => props.goToProfile(props.data.writer)}>
                        <img src={ componentService.convertImageFromBase64(writer.picture, "pic") } alt="lol" class="rounded-circle" />
                        <span>By {username()}</span>
                    </div>

                </div>

                <div className="col-sm">

                    <h5 className="fw-bold" onClick={() => props.showPost(props.data._id)}>{props.data.title}</h5>
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
                    <br />
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
                    <br />

                    <div class="flex-d mt-2 justify-content-sm-center flex-row-reverse">
                        <button type="button" class="btn customButton rounded shadow-sm text-white fw-bold">Quick Help</button>
                    </div>


                </div>

            </div>
        </article>
    )
}

export default Post