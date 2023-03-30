import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';



const ReviewCreate = (props) => {

    const [description, setDescription] = useState('');
    const [stars, setStars] = useState(1);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();


        let review = {
            personBeingReviewed: props.poster,
            reviewer: componentService.grabMyUserDetails().userId,
            post_id: props.post_id,
            description: description,
            stars: parseInt(stars)
        }

        console.log(review);

        dataService.createReview(review, (success) => {
            if (success) {
                props.updateData();
                //navigate('/');
            } else {
            }
        });
    }

    const handleChange = (event) => {
        //console.log(event.target.value)
        switch (event.target.name) {
            case 'description':
                setDescription(event.target.value);
                break;
            case 'stars':
                setStars(event.target.value);
                break;
        }
    }

    return (
        <form className="form-create-post w-50 mx-auto" onSubmit={handleSubmit}>

            <h1 className="h3 mb-3 font-weight-normal text-center">Create Review</h1>

            <div className="form-group">
                <label htmlFor="body">Review</label>
                <textarea cols="50" rows="3"
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="..."
                    onChange={handleChange}
                    required />
            </div>

            <div className="form-group">
                <label htmlFor="stars">Stars</label>
                <input type="number"
                    id="stars"
                    name="stars"
                    className="form-control"
                    onChange={handleChange}
                    required />
            </div>


            <button type="submit"
                className="btn btn-lg btn-primary btn-block" >Create Review</button>
        </form>
    )
}

export default ReviewCreate