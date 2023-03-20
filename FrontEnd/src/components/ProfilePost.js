import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import componentService from '../services/componentService';
import '../css/app.css';
import '../css/profile.css';

const ProfilePost = (props) => {


 const getTagColorId = (num) => {
  let newNum = num.toString(7);
  newNum = newNum.match(/(\d)$/g)[0];
  newNum = parseInt(newNum, 7);
  newNum++;
  return newNum
}

  return (
      <div className="row justify-content-md-center">
        {props.postData.map(item => {
                    let tag = item.tags
                    return (
                     <div className="col-md-10 shadow-sm p-3 mb-5 bg-white rounded w-75">
                       <h5 class="fw-bold">{item.title}</h5>
                       <div className="availablity">Availability: {item.availability}</div>
                       <div className="fw-light">{item.body}</div>
                       <div className="tags-flex">
                        {tag.map((t,i) => { 
                          return (
                          <div class={`btn badge badge${getTagColorId(i)}`}>{t.title}</div>
                          )
                        })}
                       </div>
                     </div>
                    )
        })}
      </div>
  );
};

export default ProfilePost;
