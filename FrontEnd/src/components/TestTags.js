import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import '../css/tags_in_tagbar.css';



const TestTags = (props) => {
    const [tags, setTags] = useState(['beep', 'bop']);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = (ntags) => {
        //tagIndex.current = 0;
        setTags(ntags)
        //console.log(tags);
    }

    const addTag = (tag) => {
        let t = [];
        t.push(...tags)
        t.push(tag)
        handleChange(t)
    }

    const removeTag = (tag) => {
        let t = [];
        t.push(...tags)
        let i = tags.indexOf(tag);
        t.splice(i, 1);
        handleChange(t)
    }

    const tagClicked = (tag) => {
        console.log(tags.indexOf(tag));
        console.log(tags);
        if(tags.indexOf(tag) > -1){
            removeTag(tag)
        } else {
            addTag(tag)
        }
    }

    return (
        <>
        <TagsInput
            value={tags}
            className="form-control border-0 bg-light"
            onChange={handleChange}
            addKeys={[9, 13, 32]}
            onlyUnique="true"
            addOnPaste={true}
            tagProps={{
                className: `tap-react-tagsinput-tag btn badge badge1`,
                placeholder: "add a tag",
                classNameRemove: 'react-tagsinput-remove'
            }}
        />
        <button 
            type="button" 
            onClick={() => tagClicked("test")} 
            className="btn btn-primary">
        Add Tag
        </button>
        </>
    )
}

export default TestTags;