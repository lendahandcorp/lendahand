import React from 'react';
import '../css/profile.css';
const no_image = require('../img/no_image.png');

const ProfilePost = (props) => {

  const getDate = (d) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = new Date(d);

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

  return (
      <div className="container mt-5">
        {props.postData.map(item => {
                    let tag = item.tags
                    return (
                      <div class="row shadow-sm p-3 mb-5 bg-white rounded">
                        <div className="col-sm">
                        <img src={ item.media = null ? item.media: `https://source.unsplash.com/WLUHO9A_xik/200x200`}
                            alt="lol" 
                            className="rounded profile-post-img"
                           />
                        </div>
                        <div className="col-sm shadow-sm p-3 mb-5 bg-white rounded">
                          <h5 class="fw-bold">{item.title}</h5>
                          <div className="fst-italic">Availability:
                          <span> {getDate(item.availability)}</span>
                          </div>
                          <div className="fw-light">{item.body}</div>
                          <div className="tags-flex">
                            {tag.map((t,i) => { 
                              return (
                              <div class={`btn badge badge${getTagColorId(i)}`}>#{t.title}</div>
                              )
                            })}
                          </div>
                        </div>
                     </div>
                    )
        })}
      </div>
  );
};

export default ProfilePost;