import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';


import '../css/tagbar.css';

const TestTags = (props) => {
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = (event) => {
    }

    const Testy = () => {
        console.log(tags);
    }
    return (
        <input 
            type="text"
            className="form-control"
            data-role="tagsinput"
            />

    )
}

export default TestTags;