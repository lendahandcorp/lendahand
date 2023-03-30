//this is a placeholder component for the body section.
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dataService from '../services/dataService';
import componentService from '../services/componentService';

const Review = (props) => {
    const [writer, setWriter] = useState([])

    useEffect(() => {
        console.log(props.data);
        dataService.getOneUser(props.data.reviewer, user => {
            // console.log(user);
            setWriter(user);
        })
    }, [])

    const starFilled = (i) => {
        return <svg style={{ color: 'orange' }} key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
    }
    const starEmpty = (i) => {
        return <svg style={{ color: 'orange' }} key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
    }
    const rating = (stars) => {
        return Array.from({ length: 5 }).map((s, i) => {
            if (i < stars)
                return starFilled(i);
            else
                return starEmpty(i);
        })
    }
    const convertImage = (a) => {
        if (a != undefined) {
            return `data:image/png;base64,${a}`;
        } else {
            return `.../img/no_image.png`
            //when first loaded, media (a) is sometimes undefined.
            //console.log("media is undefined")
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* <div className="col-md-3">
                    <img alt="rounded-circle home_post_user-img" src={componentService.convertImageFromBase64(writer.picture, "pic")} />
                </div> */}
                <div class="col-md-3 btn mt-3 post_user" onClick={() => props.goToProfile(props.data.writer)}>
                    <img src={componentService.convertImageFromBase64(writer.picture, "pic")} alt="lol" class="rounded-circle home_post_user-img" />
                </div>
                <div className="col-md-9">
                    <p>
                        {props.data.description}
                    </p>
                    <p>
                        <strong>posted by {`${writer.firstName} ${writer.lastName}`}</strong>
                        &emsp;
                        &emsp;
                        &emsp;
                        <strong>rating: {rating(props.data.stars)}</strong>
                        &emsp;
                        &emsp;
                        <div className="container d-flex justify-content-end">
                            <div className="dropdown">
                                <button
                                    className="btn dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="text-dark fa-solid fa-ellipsis-vertical fa-2xl"></i>
                                </button>

                                <div
                                    className="dropdown-menu dropdown-menu-right shadow-sm bg-white rounded border-popup"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    {props.OwnerOfPost() || props.Administrator() ? (
                                        <>
                                            <Link
                                                className="dropdown-item text-danger"
                                                onClick={() => props.DeleteReview(props.data._id)}
                                            >
                                                <span className="d-flex justify-content-between">
                                                    Delete Review <i className="fa-solid fa-trash mt-1"></i>
                                                </span>
                                            </Link>
                                        </>
                                    ) : null}

                                </div>
                            </div>

                        </div>
                        {/* <button type="button" class="btn btn-outline-secondary">
                            :
                        </button> */}
                        
                        {/* <button type="button" className="btn btn-success" onClick={() => props.DeleteReview(props.data._id)}> delete </button> */}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Review