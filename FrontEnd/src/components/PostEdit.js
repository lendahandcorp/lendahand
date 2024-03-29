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

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import '../css/tags_in_tagbar.css';
import '../css/postEdit.css';
//i hate git
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
    const [editingImage, setEditingImage] = useState(false);

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

    const openImageEdit = () => {
        setEditingImage(true);
    }

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

        let post = {
            title: title,
            writer: writer,
            body: body,
            tags: objectify(tags),
            availability: availability,
            location: location,
            people_needed: people_needed,
            applicants: [],
            people_accepted: [],
            media: media
        }

        console.log(post)
        dataService.updatePost(params.id, post, (success) => {
            if (success) {
                navigate(`/postDetails/${params.id}`);
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
        let file = a[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let p = new RegExp("^(data:image/png;base64,)|^(data:image/jpeg;base64,)", "g");
            let image = reader.result.replace(p, "");
            console.log(image);
            setMedia(image);
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
                //setMedia(fileManip(event.target.files))
                //setMedia(fileManip(event.target.files))
                fileManip(event.target.files)
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
            default:
                break;
        }
    }

    // return (
    //     <input type="date" {...innerProps} onChange={handleChange} />
    // );
    return (
        <form className="form-edit-post mx-auto my-5 shadow-sm py-3 px-5 mb-5 bg-white rounded" onSubmit={handleSubmit}>
            <h1 className="h3 mb-5 mt-4 fw-bold text-center">Edit Post</h1>
            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-4">
                <label htmlFor="title" className="mb-2 fw-bold">Title</label>
                <input type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Enter Title here"
                    defaultValue={title}
                    onChange={handleChange}
                    required />
                {titleError && <p className="text-danger">{titleError}</p>}

            </div>

            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            {
                editingImage ?
                    <div className="form-group mb-4">
                        <label htmlFor="media" className="mb-2 fw-bold">Image</label>
                        <input type="file"
                            id="media"
                            name="media"
                            className="form-control"
                            accept="image/*"
                            onChange={handleChange}
                            required />
                    </div>
                    :
                    <>
                        <img
                            src={componentService.convertImageFromBase64(media, 'img')}
                            alt="Post Image"
                            className="rounded editImage"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm col-12"
                            onClick={() => setEditingImage(true)}
                        >
                            Change Image
                        </button>
                    </>
            }




            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-4">
                <label htmlFor="location" className="mb-2 fw-bold">Location</label>
                <input type="text"
                    id="location"
                    name="location"
                    className="form-control"
                    placeholder="example: 5685 Leeds St, Halifax, NS B3K 4M2"
                    defaultValue={location}
                    onChange={handleChange}
                    required />
                {locationError && <p className="text-danger">{locationError}</p>}

            </div>

            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-4">
                <label htmlFor="availability" className="mb-2 fw-bold">End Date</label>
                <input type="datetime-local"
                    id="availability"
                    name="availability"
                    className="form-control"
                    placeholder="Enter end date"
                    defaultValue={defaultDate}
                    onChange={handleChange}
                    required />
                {availabilityError && <p className="text-danger">{availabilityError}</p>}

            </div>

            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            {/* <div className="form-group mb-4">
                <label htmlFor="tags" className="mb-2 fw-bold">Tags</label>
                <input type="text"
                    id="tags"
                    name="tags"
                    className="form-control"
                    placeholder="example: #help"
                    defaultValue={arrToTagString(tags)}
                    onChange={handleChange}
                    required />
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
                    addOnBlur={true}
                    tagProps={{
                        className: `tap-react-tagsinput-tag btn badge badge1`,
                        placeholder: "add a tag",
                        classNameRemove: 'react-tagsinput-remove'
                    }}
                />
                {tagsError && <p className="text-danger">{tagsError}</p>}
            </div>

            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-4">
                <label htmlFor="body" className="mb-2 fw-bold">Description</label>
                <textarea cols="50" rows="3"
                    id="body"
                    name="body"
                    className="form-control"
                    placeholder="Enter description here"
                    defaultValue={body}
                    onChange={handleChange}
                    required />
                {bodyError && <p className="text-danger">{bodyError}</p>}

            </div>
            {/*OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo*/}
            <div className="form-group mb-5">
                <label htmlFor="people_needed" className="mb-2 fw-bold">People Needed</label>
                <input type="number"
                    id="people_needed"
                    name="people_needed"
                    className="form-control"
                    placeholder="Enter a number"
                    value={people_needed}
                    onChange={handleChange}
                    required />
                {peopleNeededError && <p className="text-danger">{peopleNeededError}</p>}

            </div>

            <button type="submit"
                className="btn btn-lg btn-block mt-5 mb-3 d-flex edit-post-btn" >Edit Post</button>
        </form>
    )
}

export default PostEdit;