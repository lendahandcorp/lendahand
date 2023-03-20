import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import componentService from '../services/componentService';
import '../css/app.css';
import '../css/profile.css';
import ProfilePost from './ProfilePost';

const Profile = (props) => {
  
  // User
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user_img, setUserImg] = useState('');
  // const [description, setDescription] = useState('');
  const [been_helped, setBeenHelped] = useState('');
  const [helped_others, setHelpedOthers] = useState(''); 
  const [errors, setErrors] = useState({});

  // Get User Id
  const userId = componentService.grabMyUserDetails().userId;

  const navigate = useNavigate();

  useEffect(() => {
    authService.getOneUser(userId, (data) => {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setUserImg(data.photo);
      // setDescription(data.description);
      setBeenHelped(data.been_helped);
      console.log(data.been_helped)
      setHelpedOthers(data.helped_others);
    });
  }, []);


  const full_name = first_name + ' ' + last_name;

 //Post
 const [postData, updatePostData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const resp = await componentService.grabMyPosts(userId)
      updatePostData(resp.postCreatedByUser);
    }
    getPostData();
  }, []);

  console.log(postData)

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col profile-col">
          <img 
          className="card-img-top rounded-circle profile-img" 
          src={user_img}
          data-holder-rendered="true" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <h2>{full_name}</h2>
          <p>{email}</p>
          <p className="introduction">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="d-flex">
            <div className="tags btn btn-outline-secondary">#gardening</div>
            <div className="tags btn btn-outline-secondary">#painting</div>
          </div>
          <div className="post-num">{postData.length} posts</div>
        </div>
        <div className="col-md-6 d-flex hands-box">
          <div className="hands">
            <h2>Hands Requested</h2>
            <div className="hands-circle">{been_helped}</div>
          </div>
          <div className="hands">
            <h2>Hands Requested</h2>
            <div className="hands-circle">{helped_others}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ProfilePost key={postData._id} postData={postData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
