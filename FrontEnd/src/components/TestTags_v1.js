import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';

import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'

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
        <div style={{ margin: 10 }}>
      <div className='input-group'>
        <InputTags 
            values={tags} 
            // onTags={(value) => setTags(value.values)} 
            onTags={(value) => console.log(value)} 

            className='tag-bar'
        />
        
        <button
          className='btn btn-outline-secondary'
          type='button'
          data-testid='button-clearAll'
          onClick={() => {
            setTags([])
          }}
        >
          Delete all
        </button>
      </div>
      <button type="button" onClick={() => Testy()} className="btn btn-primary rounded-pill mb-4 createButton shadow-sm">Testy</button>
      <hr />
      <ol>
        {tags.map((item, index) => (
          <li key={item + index}>{item}</li>
        ))}
      </ol>
    </div>
    )
}

export default TestTags;