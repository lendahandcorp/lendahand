import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import dataService from '../services/dataService';


const Profile = (props) => {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [user_img, setUserImg] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [user_tags, setUserTags] = useState("");
    const [errors,  setErrors] = useState({});
    // Get user Id
    const params = useParams();
    const userId = params.userId; // need to add some from App.js to get userId from params. Currently, it is NOT set it up.
  
    const navigate = useNavigate();
    
    useEffect(() => {
      dataService.getOneData( userId, (data) => {
        console.log(data)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setUserImg(data.user_img)
        setIntroduction(data.introduction)  // we are missing this from DB
        setFrequentTags(data.frequent_tags)  // ??
        setBeenHelped(data.been_helped)
        setHelpedOthers(data.helped_others)
      })
    }, [] )
  
  return (
  <div className="container">
        <div class="row">
            <div class="col">
                <img src={user_img}></img>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="d-flex">
                    <h2 name="first_name">{first_name}</h2>
                    <h2 name="last_name">{last_name}</h2>
                </div>
                <p name="email">{email}</p>
                <p name="introduction">{introduction}</p>
                <div name="user_tags" class="d-flex">
                    { frequent_tags.map( tag => {
                        return (
                            <div class="btn btn-light btn-outline-dark">{tag}</div> //modify the btn if neeeded in css
                        )
                    }) }
                </div>
                <div>Number of posts...</div>
            </div>
            <div class="col d-flex">
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
            <Post></Post>
        </div>
    </div>
    )
}

export default Profile;