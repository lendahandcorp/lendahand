import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';

import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'

import '../css/tagbar.css';
import '../css/tags_in_tagbar.css';

const TestTags = (props) => {
    const [tags, setTags] = useState(['beep', 'bop']);

    const tagIndex = useRef(0);




    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
    }



    const handleChange = (ntags) => {
        //tagIndex.current = 0;
        setTags(ntags)
    }

    const Testy = () => {
        console.log(tags);
    }

    const getTagColorId = () => {
        console.log(tagIndex.current)
        tagIndex.current = tagIndex.current + 1;
        let num = tagIndex.current;
        let newNum = num.toString(7);
        newNum = newNum.match(/(\d)$/g)[0];
        newNum = parseInt(newNum, 7);
        newNum++;
        return newNum
    }

    return (
        <div class="input-group">
            <TagsInput
                value={tags}
                className="form-control border-0 bg-light"
                onChange={handleChange}
                addKeys={[9, 13, 32]}
                onlyUnique="true"
                tagProps={{
                    className: `tap-react-tagsinput-tag btn badge badge${getTagColorId()}`,
                    placeholder: "add a tag",
                    classNameRemove: 'react-tagsinput-remove'
                }}
            />

            <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link searchIcon"><i class="fa fa-search"></i></button>
            </div>
        </div>


    )
}

export default TestTags;