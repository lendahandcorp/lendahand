import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';
import {
  titleValidator,
  locationValidator,
  availabilityValidator,
  tagsValidator,
  bodyValidator,
  peopleNeededValidator,
} from './Validator';


const PostEdit = (props) => {

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState("");
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [availability, setAvailability] = useState('');
  const [location, setLocation] = useState('');
  const [people_needed, setPeople_needed] = useState(0);
  const [displayEmail, setDisplayEmail] = useState(false);
  const [displayPhone, setDisplayPhone] = useState(false);
  const [media, setMedia] = useState('');
  const [defaultDate, setDefaultDate] = useState('');
  const [titleError, setTitleError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');
  const [tagsError, setTagsError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [peopleNeededError, setPeopleNeededError] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dataService.getOnePost(params.id, post => {
      setTitle(post.title);
      setBody(post.body);
      setWriter(post.writer);
      //setTags(post.title);
      setAvailability(post.availability);
      setLocation(post.location);
      setPeople_needed(post.people_needed);
      setDefaultDate(defaultDateFunc(post.availability))
      setTags(arrToTagArr(post.tags));
      setMedia(post.media);
      console.log(arrToTagArr(post.tags));
      console.log(defaultDate);
    })

  }, [])

  const defaultDateFunc = (a) => {
    console.log(a);
    let date = new Date(a);
    //let s = date.toLocaleString();
    //let s = "2017-06-01T08:30";
    let s = `${date.getUTCFullYear()}-${addLeadingZero(date.getUTCMonth())}-${addLeadingZero(date.getUTCDate())}T${addLeadingZero(date.getUTCHours())}:${addLeadingZero(date.getUTCMinutes())}`
    //let s = "2023-04-01T00:00:00.000Z";
    console.log(s);
    return s;
  }

  const arrToTagArr = (a) => {
    let b = a.map((t => {
      return t.title
    }))
    return b;
  }
  const arrToTagString = (a) => {
    let s = '';
    a.map((t => {
      s = s + "#" + t
    }))
    return s;
  }

  const addLeadingZero = (n) => {
    if (n < 10)
      n = '0' + n;
    return n;
  };

  const objectify = (tags) => {

    let objectedTags = [];

    tags.forEach(tag => {
      objectedTags.push({ title: tag })
    });

    return objectedTags
  }

  const convertImage = (a) => {
    return `data:image/png;base64,${a}`;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const isTitleValid = titleValidator(title);
    if (isTitleValid !== '') {
      setTitleError(isTitleValid);
    }
    const isLocationValid = locationValidator(location);
    if (isLocationValid !== '') {
      setLocationError(isLocationValid);
    }
    const isAvailabilityValid = availabilityValidator(availability);
    if (isAvailabilityValid !== '') {
      setAvailabilityError(isAvailabilityValid);
    }
    const isTagsValid = tagsValidator(tags);
    if (isTagsValid !== '') {
      setTagsError(isTagsValid);
    }
    const isBodyValid = bodyValidator(body);
    if (isBodyValid !== '') {
      setBodyError(isBodyValid);
    }
    const isPeopleNeededValid = peopleNeededValidator(people_needed);
    if (isPeopleNeededValid !== '') {
      setPeopleNeededError(isPeopleNeededValid);
    }

    if (
      isTitleValid === '' &&
      isLocationValid === '' &&
      isAvailabilityValid === '' &&
      isTagsValid === '' &&
      isBodyValid === '' &&
      isPeopleNeededValid === ''
    ) {

      console.log(objectify(tags))

      let post = {
        title: title,
        writer: writer,
        body: body,
        tags: objectify(tags),
        availability: availability,
        location: location,
        people_needed: people_needed,
        applicants: [],
        people_accepted: []
      }

      console.log(post)
      dataService.updatePost(params.id, post, (success) => {
        if (success) {
          navigate('/');
        } else {
        }
      });
      //navigate('/');
    }
  }

  const convertTagsToArray = (rawTagString, element) => {
    //this gurantees that the searched tags bar always starts with a #.
    //its not neccesary but makes it look nicer.
    if (rawTagString[0] != '#')
      rawTagString = '#' + rawTagString;

    //this uses regex to limit the search bar to only having one # in a row.
    rawTagString = rawTagString.replace(/##+/g, "#");

    //this uses regex to limit the search bar to only alphanumeric and # symbols.
    rawTagString = rawTagString.replace(/(?=\W)([^#])/g, "");


    //this uses regex to split the raw string into seperate strings that start with #
    //and populate a new array with the new strings.
    //if no matches (and therefore returns undefined) it defaults to an empty array.
    let splitTags = rawTagString.match(/((?<=#)|^)[a-z|A-Z]+/g) ?? [];
    element.value = rawTagString;
    setTags(splitTags);
  }

  const fileManip = (a) => {
    console.log(a)
    let f = a;
    console.log(f[0])
    console.log(f.length)

    let file = a[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {

      let p = new RegExp("^(data:image/png;base64,)", "g");
      let g = "data:image/png;base64,jkfgfhkdujfkgjdfghdkfjgdkfgjdkfjghkdfjghkdfjghkdfj"
      let image = reader.result.replace(p, "");
      console.log(image);
      setMedia(image);
      //console.log(reader.result);
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleChange = (event) => {
    //console.log(event.target.value)
    switch (event.target.name) {
      case 'title':
        setTitle(event.target.value);
        break;
      case 'media':
        //setMedia(fileManip(event.target.files))
        //setMedia(fileManip(event.target.files))
        fileManip(event.target.files)
        break;
      case 'body':
        setBody(event.target.value);
        break;
      case 'tags':
        convertTagsToArray(event.target.value, event.target);
        break;
      case 'availability':
        setAvailability(event.target.value);
        break;
      case 'location':
        setLocation(event.target.value);
        break;
      case 'people_needed':
        setPeople_needed(event.target.value);
        break;
    }
  }

  // return (
  //     <input type="date" {...innerProps} onChange={handleChange} />
  // );
  return (
    <form className="form-create-post w-50 mx-auto" onSubmit={handleSubmit}>

      <h1 className="h3 mb-3 font-weight-normal text-center">Edit Post</h1>

      {/* Validators */}
      <p
        className={
          titleError ? 'alert alert-danger text-center' : 'hidden'
        }
      >
        {titleError}
      </p>
      <p
        className={
          locationError ? 'alert alert-danger text-center' : 'hidden'
        }
      >
        {locationError}
      </p>
      <p
        className={
          availabilityError ? 'alert alert-danger text-center' : 'hidden'
        }
      >
        {availabilityError}
      </p>
      <p
        className={
          tagsError ? 'alert alert-danger text-center' : 'hidden'
        }
      >
        {tagsError}
      </p>
      <p
        className={bodyError ? 'alert alert-danger text-center' : 'hidden'}
      >
        {bodyError}
      </p>
      <p
        className={
          peopleNeededError ? 'alert alert-danger text-center' : 'hidden'
        }
      >
        {peopleNeededError}
      </p>

<<<<<<< HEAD
      {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text"
          id="title"
          name="title"
          className="form-control"
          placeholder="..."
          defaultValue={title}
          onChange={handleChange}
          onBlur={() => {
            const error = titleValidator(title);
            setTitleError(error);
        }}
        />
      </div>

      {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
      {/* <div className="form-group">
=======
    // return (
    //     <input type="date" {...innerProps} onChange={handleChange} />
    // );
    return (
        <form className="form-create-post w-50 mx-auto my-5 shadow-sm py-3 px-5 mb-5 bg-white rounded" onSubmit={handleSubmit}>

            <h1 className="h3 mb-5 mt-4 fw-bold text-center">Edit Post</h1>

            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-4">
                <label htmlFor="title" className="mb-2">Title</label>
                <input type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="..."
                    defaultValue={title}
                    onChange={handleChange}
                    required />
            </div>

            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            {/* <div className="form-group">
>>>>>>> dev
                <label htmlFor="media">Image</label>
                <input type="file"
                    id="media"
                    name="media"
                    className="form-control"
                    accept="image/png, image/jpeg"
                    value={convertImage(media)}
                    onChange={handleChange}
                    required />
            </div> */}

<<<<<<< HEAD
      {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input type="text"
          id="location"
          name="location"
          className="form-control"
          placeholder="..."
          defaultValue={location}
          onChange={handleChange}
          onBlur={() => {
            const error = locationValidator(location);
            setLocationError(error);
        }}
        />
      </div>

      {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
      <div className="form-group">
        <label htmlFor="availability">End Date</label>
        <input type="datetime-local"
          id="availability"
          name="availability"
          className="form-control"
          placeholder="..."
          defaultValue={defaultDate}
          onChange={handleChange}
          onBlur={() => {
            const error = availabilityValidator(availability);
            setAvailabilityError(error);
        }}
        />
      </div>

      {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input type="text"
          id="tags"
          name="tags"
          className="form-control"
          placeholder="..."
          defaultValue={arrToTagString(tags)}
          onChange={handleChange}
          onBlur={() => {
            const error = tagsValidator(tags);
            setTagsError(error);
        }}
        />
      </div>

      {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
      <div className="form-group">
        <label htmlFor="body">Description</label>
        <textarea cols="50" rows="3"
          id="body"
          name="body"
          className="form-control"
          placeholder="..."
          defaultValue={body}
          onChange={handleChange}
          onBlur={() => {
            const error = bodyValidator(body);
            setBodyError(error);
        }}
        />
      </div>
      {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
      <div className="form-group">
        <label htmlFor="people_needed">People Needed</label>
        <input type="number"
          id="people_needed"
          name="people_needed"
          className="form-control"
          value={people_needed}
          onChange={handleChange}
          onBlur={() => {
            const error = peopleNeededValidator(people_needed);
            setPeopleNeededError(error);
        }}
        />
      </div>


      <button type="submit"
        className="btn btn-lg btn-primary btn-block" >Create Post</button>
    </form>
  )
=======
            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-4">
                <label htmlFor="location" className="mb-2">Location</label>
                <input type="text"
                    id="location"
                    name="location"
                    className="form-control"
                    placeholder="..."
                    defaultValue={location}
                    onChange={handleChange}
                    required />
            </div>

            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-4">
                <label htmlFor="availability" className="mb-2">End Date</label>
                <input type="datetime-local"
                    id="availability"
                    name="availability"
                    className="form-control"
                    placeholder="..."
                    defaultValue={defaultDate}
                    onChange={handleChange}
                    required />
            </div>

            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-4">
                <label htmlFor="tags" className="mb-2">Tags</label>
                <input type="text"
                    id="tags"
                    name="tags"
                    className="form-control"
                    placeholder="..."
                    defaultValue={arrToTagString(tags)}
                    onChange={handleChange}
                    required />
            </div>

            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-4">
                <label htmlFor="body" className="mb-2">Description</label>
                <textarea cols="50" rows="3"
                    id="body"
                    name="body"
                    className="form-control"
                    placeholder="..."
                    defaultValue={body}
                    onChange={handleChange}
                    required />
            </div>
            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-5">
                <label htmlFor="people_needed" className="mb-2">People Needed</label>
                <input type="number"
                    id="people_needed"
                    name="people_needed"
                    className="form-control"
                    value={people_needed}
                    onChange={handleChange}
                    required />
            </div>


            <button type="submit"
                className="btn btn-lg btn-primary btn-block mt-5 mb-3 d-flex" >Create Post</button>
        </form>
    )
>>>>>>> dev
}

export default PostEdit