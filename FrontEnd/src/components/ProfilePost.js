import React from 'react';
import { useState, useEffect } from 'react';
import '../css/post.css';
import { useNavigate } from 'react-router-dom';
import dataService from '../services/dataService';
import componentService from '../services/componentService';
import {
    titleValidator,
    locationValidator,
    availabilityValidator,
    tagsValidator,
    bodyValidator,
    peopleNeededValidator,
} from './Validator';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import '../css/tags_in_tagbar.css';
//i hate git
const PostCreate = (props) => {
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
    const [titleError, setTitleError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [availabilityError, setAvailabilityError] = useState('');
    const [tagsError, setTagsError] = useState('');
    const [bodyError, setBodyError] = useState('');
    const [peopleNeededError, setPeopleNeededError] = useState('');

    const navigate = useNavigate();

    const objectify = (tags) => {
        let objectedTags = [];
        tags.forEach(tag => {
            objectedTags.push({ title: tag })
        });
        return objectedTags
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (titleValidator(title) !== '') {
            setTitleError(titleValidator(title));
            return;
        }

        if (locationValidator(location) !== '') {
            setLocationError(locationValidator(location));
            return;
        }

        if (availabilityValidator(availability) !== '') {
            setAvailabilityError(availabilityValidator(availability));
            return;
        }

        if (tagsValidator(tags) !== '') {
            setTagsError(tagsValidator(tags));
            return;
        }

        if (bodyValidator(body) !== '') {
            setBodyError(bodyValidator(body));
            return;
        }

        if (peopleNeededValidator(people_needed) !== '') {
            setPeopleNeededError(peopleNeededValidator(people_needed));
            return;
        }

        console.log(objectify(tags))

        let post = {
            title: title,
            writer: componentService.grabMyUserDetails().userId,
            body: body,
            tags: objectify(tags),
            availability: availability,
            status: "Open",
            location: location,
            people_needed: people_needed,
            applicants: [],
            people_accepted: [],
            media: media
        }

        // let post = {
        //     "title": "tagtest 1",
        //     "writer": '63e018aa42a38b860599766c',
        //     "body": "tt",
        //     "tags": ["tt1","tt2"],
        //     "availability": '2002-12-09',
        //     "location": "123 tt",
        //     "people_needed": 3,
        // }

        dataService.createPost(post, (success) => {
            if (success) {
                navigate('/');
            } else {
            }
        });
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
            let p = new RegExp("^(data:image/png;base64,)|^(data:image/jpeg;base64,)", "g");
            //let g = "data:image/png;base64,jkfgfhkdujfkgjdfghdkfjgdkfgjdkfjghkdfjghkdfjghkdfj"
            let image = reader.result.replace(p, "");
            console.log(image);
            setMedia(image);
            //console.log(reader.result);
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    
    const handleTagChange = (ntags) => {
        //tagIndex.current = 0;
        setTags(ntags)
        console.log(tags);
    }

    const handleChange = (event) => {
        //console.log(event.target.value)
        switch (event.target.name) {
            case 'title':
                setTitle(event.target.value);
                setTitleError(titleValidator(event.target.value));
                break;
            case 'media':
                fileManip(event.target.files)
                break;
            case 'writer':
                setWriter(event.target.value);
                break;
            case 'body':
                setBody(event.target.value);
                setBodyError(bodyValidator(event.target.value));
                break;
            case 'tags':
                convertTagsToArray(event.target.value, event.target);
                setTagsError(tagsValidator(event.target.value));
                break;
            case 'availability':
                //console.log(event.target.value)
                setAvailability(event.target.value);
                setAvailabilityError(availabilityValidator(event.target.value));
                break;
            case 'location':
                setLocation(event.target.value);
                setLocationError(locationValidator(event.target.value));
                break;
            case 'people_needed':
                setPeople_needed(event.target.value);
                setPeopleNeededError(peopleNeededValidator(event.target.value));
                break;
            case 'displayEmail':
                setDisplayEmail(event.target.checked);
                break;
            case 'displayPhone':
                setDisplayPhone(event.target.checked);
                break;
                default:
                break;
        }
    }
    return (
        <form className="form-create-post mx-auto my-5 shadow-sm py-3 px-5 mb-5 bg-white rounded" onSubmit={handleSubmit}>

            <h1 className="h3 mb-5 mt-4 fw-bold text-center">Create Post</h1>

            <div className="form-group mb-4">
                <label htmlFor="title" className="mb-2 fw-bold">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Enter Title here"
                    onChange={handleChange}
                    required
                />
                {titleError && <p className="text-danger">{titleError}</p>}
            </div>

            <div className="form-group mb-4">
                <label htmlFor="media" className="mb-2 fw-bold">Image</label>
                <input
                    type="file"
                    id="media"
                    name="media"
                    className="form-control"
                    accept="image/png"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="location" className="mb-2 fw-bold">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-control"
                    placeholder="example: 5685 Leeds St, Halifax, NS B3K 4M2"
                    onChange={handleChange}
                    required
                />
                {locationError && <p className="text-danger">{locationError}</p>}
            </div>

            <div className="form-group mb-4">
                <label htmlFor="availability" className="mb-2 fw-bold">End Date</label>
                <input
                    type="datetime-local"
                    id="availability"
                    name="availability"
                    className="form-control"
                    placeholder="Enter end date"
                    onChange={handleChange}
                    required
                />
                {availabilityError && <p className="text-danger">{availabilityError}</p>}
            </div>

            {/* <div className="form-group mb-4">
                <label htmlFor="tags" className="mb-2 fw-bold">Tags</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="form-control"
                    placeholder="example: #help"
                    onChange={handleChange}
                    required
                />
                {tagsError && <p className="text-danger">{tagsError}</p>}
            </div> */}
            <div className="form-group mb-4">
                <label htmlFor="tags" className="mb-2 fw-bold">Tags</label>
                <TagsInput
                    value={tags}
                    className="form-control border-0 bg-light"
                    id="tags"
                    name="tags"
                    onChange={handleTagChange}
                    addKeys={[9, 13, 32]}
                    onlyUnique="true"
                    tagProps={{
                        className: `tap-react-tagsinput-tag btn badge badge1`,
                        placeholder: "add a tag",
                        classNameRemove: 'react-tagsinput-remove'
                    }}
                /> 
                {tagsError && <p className="text-danger">{tagsError}</p>}
            </div>


            <div className="form-group mb-4">
                <label htmlFor="body" className="mb-2 fw-bold">Description</label>
                <textarea
                    cols="50"
                    rows="3"
                    id="body"
                    name="body"
                    className="form-control"
                    placeholder="Enter description here"
                    onChange={handleChange}
                    required
                ></textarea>
                {bodyError && <p className="text-danger">{bodyError}</p>}
            </div>

            <div className="form-group mb-5">
                <label htmlFor="people_needed" className="mb-2 fw-bold">People Needed</label>
                <input
                    type="number"
                    id="people_needed"
                    name="people_needed"
                    className="form-control"
                    placeholder="Enter a number"
                    onChange={handleChange}
                    required
                />
                {peopleNeededError && <p className="text-danger">{peopleNeededError}</p>}
            </div>



            <button type="submit"
                className="btn btn-lg btn-block mt-5 mb-3 d-flex create-post-btn" >Create Post</button>
        </form>
    )
}
export default PostCreate