//this is a placeholder component for the body section.
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/post.css';
import componentService from '../services/componentService';
import dataService from '../services/dataService';
// const no_image = require('../img/no_image.png');
// const blank_images = require('../img/blank_images.json')

const Post = (props) => {
  const [writer, setWriter] = useState({});
  const [user_img, setUserImg] = useState({});

  useEffect(() => {
    dataService.getOneUser(props.data.writer, (user) => {
      setWriter(user);
      setUserImg(user.picture);
    });
  }, []);

  //Get the excerpt
  let readmore;
  const excerpt = (b) => {
    const str = b;
    if (str.length <= 300) {
      readmore = false;
      return str;
    } else {
      const test = str.substring(0, 300);
      readmore = true;
      return test;
    }
  };

  const getDate = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let date = new Date(props.data.availability);
    let str = `${months[date.getMonth()]} 
                    ${date.getDate()}${getDaySuffix(date.getDate())}, 
                    ${date.getFullYear()}`;
    return str;
  };
  const getDaySuffix = (i) => {
    const daySuffix = ['st', 'nd', 'rd', 'th'];

    if (i > 3) {
      return daySuffix[3];
    } else {
      return daySuffix[i - 1];
    }
  };
  const getTagColorId = (num) => {
    let newNum = num.toString(7);
    newNum = newNum.match(/(\d)$/g)[0];
    newNum = parseInt(newNum, 7);
    newNum++;
    return newNum;
  };
  const spotsLeft = () => {
    return props.data.people_needed - props.data.people_accepted.length;
  };

  // const aa = () => {
  //     //console.log(props.data.post_id)
  // }

  // const convertImage = (a, imageType) => {
  //     //console.log(a);
  //     var regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  //     if(a === undefined || a === null || !regex.test(a) || a === "" || typeof a != "string"){
  //         console.log(props.data.title + " ("+imageType+") " + typeof(a));

  //         if(imageType == "img"){
  //             //console.log(props.data.title + " img");
  //             return blank_images.image;

  //         } else if(imageType == "pic"){
  //             //console.log(props.data.title + " pic");
  //             return blank_images.picture;
  //         }
  //     } else {
  //         //console.log(props.data.title + " a ("+imageType+")");
  //         return `data:image/png;base64,${a}`;
  //     }
  // }

  const username = () => {
    return `${writer.firstName} ${writer.lastName}`;
  };

  return (
    <article className="d-flex justify-content-center">
      <div className="row shadow-sm p-3 mb-5 bg-white rounded w-75">
        <div className="col-sm">
          <Link to={`/postDetails/${props.data._id}`}>
            <img
              src={componentService.convertImageFromBase64(
                props.data.media,
                'img'
              )}
              alt="lol"
              className="rounded postImage"
              onClick={() => props.showPost(props.data._id)}
              //onClick={() => aa()}
            />
          </Link>

          <div
            className="btn mt-3 d-flex justify-content-around user"
            onClick={() => props.goToProfile(props.data.writer)}
          >
            <img
              src={componentService.convertImageFromBase64(
                writer.picture,
                'pic'
              )}
              alt="lol"
              class="rounded-circle img-fluid userImage"
            />
            <span className="mt-1 fw-bold">By {username()}</span>
          </div>
        </div>
        <div className="col-sm d-flex flex-column">
          <div className="d-flex flex-column">
            <Link to={`/postDetails/${props.data._id}`}>
              <h5
                class="fw-bold"
                onClick={() => props.showPost(props.data._id)}
              >
                {props.data.title}
              </h5>
            </Link>
            <h6 class="fst-italic">Availability: {getDate()} </h6>
          </div>

          <p class="fw-light">
            <span>{excerpt(props.data.body)}</span>
            <span className="">
              <Link
                to={`/postDetails/${props.data._id}`}
                className="text-secondary text-decoration-none"
              >
                {readmore == true ? ' [ ... Read More ]' : ''}
              </Link>
            </span>
          </p>
          <div className="d-flex">
            {props.data.tags.map((tag, i) => {
              return (
                <div
                  key={i}
                  className={`btn badge badge${getTagColorId(i)}`}
                  onClick={() => props.tagClicked(tag.title)}
                >
                  {' #' + tag.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
};
export default Post;
// <article>
//     <div class="row shadow-sm p-3 mb-5 bg-white rounded w-75 m-auto">
//         <div class="col-sm">

//             <div>
//                 <img src={ componentService.convertImageFromBase64(props.data.media, "img") }
//                     alt="lol"
//                     className="rounded home_post-img"
//                     onClick={() => props.showPost(props.data.post_id)}
//                      />
//             </div>

//             <div class="btn mt-3 mb-auto d-flex post_user align-item-end" onClick={() => props.goToProfile(props.data.writer)}>
//                 <img src="https://source.unsplash.com/WLUHO9A_xik/35x35" alt="lol" class="rounded-circle home_post_user-img" />
//                 <div className="mb-auto home_post_user-name">By {username()}</div>
//             </div>

//         </div>

//         <div class="col-sm">

//             <h5 class="fw-bold" onClick={() => props.showPost(props.data._id)}>{props.data.title}</h5>

//             <h6 class="fst-italic">Availability: {getDate()} </h6>

//             <p class="fw-light">
//                 <span>{excerpt(props.data.body)}</span>
//                 <span className=""><Link to={`/postDetails/${props.data._id}`}>
//                 {
//                     readmore == true ? '..Read More' : ''
//                 }
//                 </Link></span>
//             </p>
//             {
//                 props.data.tags.map((tag, i) => {
//                     return  <div key={i} class={`btn badge badge${getTagColorId(i)}`}
//                         onClick={() => props.tagClicked(tag.title)}
//                     >
//                         {" #" + tag.title}
//                     </div>
//                 })
//             }

//         </div>
//     </div>
// </article>