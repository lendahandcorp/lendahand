import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataService from '../services/dataService';

import Post from './Post';

const Profile = (props) => {
  //User
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user_img, setUserImg] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [frequent_tags, setFrequentTags] = useState('');
  const [been_helped, setBeenHelped] = useState('');
  const [helped_others, setHelpedOthers] = useState('');
  //Posts
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("")
  // const [availablity, setAvailablity] = useState("");
  // const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({});
  // Get user Id
  const params = useParams();
  const userId = params.userId; // need to add some from App.js to get userId from params. Currently, it is NOT set it up.

  const navigate = useNavigate();

  useEffect(() => {
    dataService.getOneUser(userId, (data) => {
      // console.log(data)
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setUserImg(data.user_img);
      setIntroduction(data.introduction); // we are missing this from DB
      setFrequentTags(data.frequent_tags); // ??
      setBeenHelped(data.been_helped);
      setHelpedOthers(data.helped_others);
    });
  }, []);

  const full_name = first_name + ' ' + last_name;

  // question: getting posts?
  // useEffect(() => {
  //   dataService.getOneUser( userId, (data) => {
  //     // console.log(data)
  //     setTitle(data.title)
  //     setBody(data.body)
  //     setAvailablity(data.availablity)
  //     setStatus(data.status)
  //   })
  // }, [] )

  return (
    <div className="container">
      <div class="row">
        {/* need to set orange background in css! */}
        <div class="col">
          <img src={user_img}></img>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <h2>{full_name}</h2>
          <p>{email}</p>
          <p>{introduction}</p>
          <div class="d-flex">
            {frequent_tags.map((tag) => {
              return (
                <div class="btn btn-light btn-outline-dark">{tag}</div> //modify the btn if neeeded in css
              );
            })}
          </div>
          <div class="d-flex">
            <div>Number of posts...</div>
            <div>??</div>
          </div>
        </div>
        <div class="col-md-6 d-flex">
          <div>
            <h2>Hands Requested</h2>
            <div>{been_helped}</div>
          </div>
          <div>
            <h2>Hands Given</h2>
            <div>{helped_others}</div>
          </div>
        </div>
      </div>
      {/* Posts will be listed here. Needs to modify! */}
      <div class="row">
        <Post />
      </div>
    </div>
  );
};

export default Profile;
