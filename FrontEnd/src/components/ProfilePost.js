import React from 'react';
import { Link } from 'react-router-dom';
import '../css/profile.css';
import componentService from '../services/componentService';

const ProfilePost = (props) => {

  // Convert the date
  const getDate = (d) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = new Date(d);

    let str = `${months[date.getMonth()]} 
                ${date.getDate()}${getDaySuffix(date.getDate())}, 
                ${date.getFullYear()}`

    return str;
  }

  const getDaySuffix = (i) => {
      const daySuffix = [ "st", "nd", "rd", "th"]

      if(i > 3) {
          return daySuffix[3];
      }else {
          return daySuffix[i - 1];
      }
  }

  // Get the excerpt
  let readmore;
  const excerpt = (b) => {
      const str = b
      if(str.length <= 300){
          readmore = false
          return str
      } else{
          const test = str.substring(0,300);
          readmore = true
          return test
      }
  }

  // Give Color ID fpr tags
  const getTagColorId = (num) => {
    let newNum = num.toString(7);
    newNum = newNum.match(/(\d)$/g)[0];
    newNum = parseInt(newNum, 7);
    newNum++;
    return newNum
    }

  return (
      <div className="container mt-5 profilePost">
        {props.postData.map(item => {
                    let tag = item.tags
                    return (
                      <div class="row shadow-sm p-3 mb-5 bg-white rounded">
                        <div className="col-lg-6 col-sm-12">
                          <Link to={`/postDetails/${item._id}`}>
                          <img src={componentService.convertImageFromBase64(item.media, "img")}
                              alt="lol" 
                              className="rounded profilePost-img"
                              loading="lazy" 
                            />
                          </Link>
                        </div>
                        <div className="col-lg-6 col-sm-12 d-flex flex-column m-auto profilePost-content">
                          <div className="d-flex flex-column">
                            <h5 class="fw-bold"><Link to={`/postDetails/${item._id}`}>{item.title}</Link></h5>
                            <div className="fst-italic">Availability:
                            <span> {getDate(item.availability)}</span>
                            </div>
                            <div className="fw-light">
                              <span>{excerpt(item.body)}</span>
                              <span className=""><Link to={`/postDetails/${item._id}`}  className="text-secondary text-decoration-none">
                              {
                                  readmore == true ? ' [ ... Read More ]' : ''
                              }
                              </Link></span>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="tags-flex">
                              {tag.map((t,i) => { 
                                return (
                                <div class={`btn badge badge${getTagColorId(i)}`}>#{t.title}</div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                     </div>
                    )
        })}
      </div>
  );
};

export default ProfilePost;