import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';
import '../css/profile.css';
import ProfilePost from './ProfilePost';
import { descriptionValidator } from './Validator';

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

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [hands_requested, setHandsRequested] = useState('');
  const [hands_given, setHandsGiven] = useState('');
  const full_name = first_name + ' ' + last_name;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // User Data
  useEffect(() => {
    dataService.getOneUser(userId, (info) => {
      setFirstName(info.firstName);
      setLastName(info.lastName);
      setEmail(info.email)
      setUserImg(info.picture)
      setDescription(info.description);
    });
  }, []);

  // Get the most used three tags for the user
  const [tags, updateTags] = useState([]);

  useEffect(() => {
    componentService.MostCommonTagsForUser(userId , 3, (ts) => updateTags(ts) )
  }, []);

 // Posts Data
  const [postData, updatePostData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const resp = await componentService.grabMyPosts(userId)
      updatePostData(resp.postCreatedByUser);
      setHandsRequested(resp.postCreatedByUser.length);
      setHandsGiven(resp.postAttendedByUser.length);
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
  
  // Set Value for disable for Description
  const [isReadOnly, setIsReadOnly] = useState({ value: true })

  // Give Color ID fpr tags
  const getTagColorId = (num) => {
    let newNum = num.toString(7);
    newNum = newNum.match(/(\d)$/g)[0];
    newNum = parseInt(newNum, 7);
    newNum++;
    return newNum
    }

  return (
    <div className="container-fluid profile">
      <div className="row mb-3 profile-background">
        <div className="col d-flex justify-content-center">
          <img 
          className="rounded-circle profile-img" 
          src={ componentService.convertImageFromBase64(user_img, "pic") }
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
              placeholder="Insert your description here"
              onChange={(event) => { setDescription(event.target.value); }}
              autoFocus
              value={description}
              onBlur={() => {
                const error = descriptionValidator(description);
                setDescriptionError(error);
              }}
              disabled = {isReadOnly}
            />
            <div className="mt-3 d-flex flex-row-reverse">
              <div className="p-2"><button className="btn mt-1 form-btn btn buttonSubmit mr-3" type="submit" onClick={() => {  setIsReadOnly(true); } }>Submit</button></div>
              <div className="p-2"><button className="btn mt-1 form-btn btn buttonEdit" type="edit" onClick={() => { setIsReadOnly(false); } }>Edit</button></div>
            </div>
          </form> :
          <div className="description">
            <p className="fw-normal desc-p">{description}</p>
          </div>  }
          <div className="d-flex mt-5"> 
            <p className="mt-2 fw-bold">Tags used: </p>
            <ul className="profile-tags d-flex">
              {
                tags.map( (tag, i) => {
                  return (<li key={i} className={`btn badge badge${getTagColorId(i)}`}>#{tag.title}</li>)
                })
               }
            </ul>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex hands-box m-auto mt-3 justify-content-lg-end justify-content-center">
          <div className="hands">
            <h4 className="fw-bold">Hands<br />Requested</h4>
            <div className="hands-circle shadow">{hands_requested}</div>
          </div>
          <div className="hands">
            <h4 className="fw-bold">Hands<br />Given</h4>
            <div className="hands-circle shadow">{hands_given}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 m-sm-100 m-auto profile-post">
            <h2>My Posts </h2>
            <div className="post-num mt-5 fw-bold">{postData.length} posts</div>
          <ProfilePost key={postData._id} postData={postData} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;