import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';
import '../css/app.css';
import '../css/profile.css';
import ProfilePost from './ProfilePost';

const Profile = (props) => {

  // Get User Id and email
  const params = useParams();
  const userId = params.UserId;
 
  const currentUserId = componentService.grabMyUserDetails().userId;
  const token = authService.isAuthenticated();

  // User
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user_img, setUserImg] = useState('');
  const [img_type, SetImgType] = useState('');
  const [description, setDescription] = useState('');
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
      console.log(info)
      setFirstName(info.firstName);
      setLastName(info.lastName);
      setEmail(info.email)
      setUserImg(info.picture)
      SetImgType(findImgType(info.picture))
      setDescription(info.description);
      setBeenHelped(info.been_helped);
      setHelpedOthers(info.helped_others);
    });
  }, []);

  //Get Image URL
  const img_url = `data:image/${img_type};base64,${user_img}`

 //Post
 const [postData, updatePostData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const resp = await componentService.grabMyPosts(userId)
      updatePostData(resp.postCreatedByUser);
    }
    getPostData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    componentService.insertUserDescription( userId, description, token, (error) => {

      if(!error){
        navigate(`/`)

      }else{

        console.log(error) //access denied

        switch(error.status){
          case 400: { setErrors(error.message); break; }
          case 404: { setErrors(error.statusTe); break;}
        }
      }
    })
  };
  
  // ** Remove it after getting funtion from others **
  // Getting the first three frequent tags --> randomly generated three of them
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
      <div className="row mb-3 img-row">
        <div className="col profile-col d-flex justify-content-center">
          <img 
          className="rounded-circle profile-img" 
          // src={img_url}
          src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg"
          data-holder-rendered="true" />
        </div>
      </div>
      <div className="container">
      <div className="row mb-3">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <h2>{full_name}</h2>
          <p>{email}</p>
          { userId == currentUserId ?
          <form method="post" className="form-create" onSubmit={handleSubmit}>
            <textarea
              name="description"
              rows={8} cols={40}
              type="description"
              id="inputDescription"
              className="form-control"  
              placeholder="Description"
              onChange={(e) => { setDescription(e.target.value); }}
              autoFocus
              defaultValue={description}
              value={description}
            />
            <button className="btn btn-primary mt-1 form-btn" type="submit">
              Submit
            </button>
          </form> :
          <div className="description">
            <p className="">{description}</p>
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
            <h4>Hands Requested</h4>
            <div className="hands-circle">{been_helped}</div>
          </div>
          <div className="hands">
            <h4>Hands Given</h4>
            <div className="hands-circle">{helped_others}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 w-75">
          <ProfilePost key={postData._id} postData={postData} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
