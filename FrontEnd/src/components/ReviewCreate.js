import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';
import { reviewDesValidator, reviewStarsValidator} from "./Validator";



const ReviewCreate = (props) => {

    const [description, setDescription] = useState('');
    const [stars, setStars] = useState(1);
    const [descriptionError, setDescriptionError] = useState('');
    const [starError, setStarError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (reviewDesValidator(description) !== '') {
            setDescriptionError(reviewDesValidator(description));
            return;
          }
      
          if (reviewStarsValidator(stars) !== '') {
              setStarError(reviewStarsValidator(stars));
            return;
          }

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
                setDescriptionError(reviewDesValidator(event.target.value));

                break;
            case 'stars':
                setStars(event.target.value);
                setStarError(reviewStarsValidator(event.target.value));
                break;
                default:
                break;
        }
    }

    return (
        

        <div><h1 className="h3 mb-3 font-weight-normal text-center">Create Review</h1>
        <div className="d-flex justify-content-center">
            <div className="w-45 shadow-sm px-4 py-5 mb-5 bg-white rounded">
                <form className="review-post mx-auto" onSubmit={handleSubmit}>

            <div className="form-group mt-3">
                <label htmlFor="body" className="mb-2 fw-bold">Review</label>
                <textarea cols="50" rows="3"
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Please insert your review here"
                    onChange={handleChange}
                    required />
            </div>

            <div className="form-group mt-3">
                <label htmlFor="stars" className="mb-2 fw-bold">Stars</label>
                <input type="number"
                    id="stars"
                    name="stars"
                    className="form-control"
                    placeholder="Please enter a number from 1-5"
                    onChange={handleChange}
                    required />
            </div>

                    <div className="d-flex mt-4">
                        <button type="submit"
                            className="btn btn-lg btn-primary btn-block mx-auto" >Create Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default ReviewCreate