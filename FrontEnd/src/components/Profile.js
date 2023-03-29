import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';
import '../css/profile.css';
import ProfilePost from './ProfilePost';
import { Buffer } from 'buffer';
import { descriptionValidator } from './Validator';
const no_image = require('../img/no_image.png');


const Profile = () => {

  // Get Id for Viewed User
  const params = useParams();
  const userId = params.UserId;

 // Get my User Id
  const currentUserId = componentService.grabMyUserDetails().userId;
  const token = authService.isAuthenticated();

  // User
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user_img, setUserImg] = useState('');
  const [img_type, SetImgType] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [been_helped, setBeenHelped] = useState('');
  const [helped_others, setHelpedOthers] = useState(''); 
  const [errors, setErrors] = useState({});

  const full_name = first_name + ' ' + last_name;

  const navigate = useNavigate();

  const findImgType = (e) => {
    let s = e.slice(0,3)
    if( s = '/9j' ){
      return 'jpg'
    } else{
      return 'png'
    }
  }

  useEffect(() => {
    dataService.getOneUser(userId, (info) => {
      setFirstName(info.firstName);
      setLastName(info.lastName);
      setEmail(info.email)
      // let x = Buffer.isBuffer(info.picture)
      // if(x)
      setUserImg(info.picture)
      SetImgType(findImgType(info.picture))
      setDescription(info.description);
      setBeenHelped(info.been_helped);
      setHelpedOthers(info.helped_others);
    });
  }, []);

  console.log(Buffer.isBuffer(user_img))
  // console.log(img_type)
  // Get Image URL
  const img_url = `data:image/png;base64,${user_img}`
  console.log(img_url)

 // Posts
 const [postData, updatePostData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const resp = await componentService.grabMyPosts(userId)
      updatePostData(resp.postCreatedByUser);
    }
    getPostData();
  }, []);

// Handle Inserting Description
  const handleSubmit = (event) => {
    event.preventDefault();
    const isDesValid = descriptionValidator(description);
    if (isDesValid !== '') {
      setDescriptionError(isDesValid);
    }

    if (isDesValid === ''){

    setErrors({});
    componentService.insertUserDescription( currentUserId, {description}, token, (error) => {

      if(!error){
        navigate('/')
      }else{

        console.log(error) //access denied

        switch(error.status){
          case 400: { setErrors(error.message); break; }
          case 404: { setErrors(error.statusTe); break;}
        }
      }
    })
  }
  };

  // console.log(description)
  
  // ** Remove it after getting funtion from other member **
  // Get the first three duplicate tags
  let newArr = []
  for(var i=0; i<postData.length; i++){

    let tags = postData[i].tags
    for(var x=0;x<tags.length;x++){
      newArr.push(tags[x].title)
    }
  }

  let array = []
  for (var i=0; i<newArr.length; i++)
  {
    for (var j=i; j<newArr.length; j++)
    {
      if (newArr[i] == newArr[j]){
        array.push(newArr[i])
      }

    }
  }

  let unique = [];
  for(i=0; i < array.length; i++){ 
      if(unique.indexOf(array[i]) === -1) { 
          unique.push(array[i]); 
      } 
  }

  const tagsArray = unique.slice(0, 3);

  return (
    <div className="container-fluid profile">
      <div className="row mb-3 profile-background">
        <div className="col d-flex justify-content-center">
          <img 
          className="rounded-circle profile-img" 
          src={user_img ? img_url: no_image}
          data-holder-rendered="true" />
        </div>
      </div>
      <div className="container">
      <div className="row mb-3">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <h1 className="fw-bold">{full_name}</h1>
          <p className="fst-italic email">{email}</p>
          { userId == currentUserId ?
          
          <form onSubmit={(event) => handleSubmit(event)}>
             {/* Validators */}
             <p
            className={
              descriptionError ? 'alert alert-danger text-center' : 'hidden'
            }
          >
            {descriptionError}
          </p>
            <textarea
              name="description"
              type="description"
              rows = {8}
              id="inputDescription"
              className="form-control"  
              placeholder="Description"
              onChange={(event) => { setDescription(event.target.value); }}
              autoFocus
              value={description}
              onBlur={() => {
                const error = descriptionValidator(description);
                setDescriptionError(error);
            }}
            />
            <button className="btn btn-primary mt-1 form-btn" type="submit">
              Submit
            </button>
          </form> :
          <div className="description">
            <p className="fw-normal desc-p">{description}</p>
          </div>  }
          <div className="d-flex">
            <ul className="tags">
              {
                tagsArray.map(tag => {
                  return(
                    <li className="tag btn">#{tag}</li>
                  )
                })
              }
            </ul>
          </div>
          <div className="post-num">{postData.length} posts</div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex hands-box m-auto mt-3 justify-content-lg-end justify-content-center">
          <div className="hands">
            <h4 className="fw-bold">Hands Requested</h4>
            <div className="hands-circle shadow">{been_helped}</div>
          </div>
          <div className="hands">
            <h4 className="fw-bold">Hands Given</h4>
            <div className="hands-circle shadow">{helped_others}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 w-75 m-auto">
          <ProfilePost key={postData._id} postData={postData} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;