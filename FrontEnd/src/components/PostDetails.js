//this is a placeholder component for the body section.
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';

//test

import Review from './Review';
import Applicant from './Applicant';
import ApplicantEmpty from './ApplicantEmpty';
import ReviewCreate from './ReviewCreate';

const no_image = require('../img/no_image.png');
const tempPosts = require('../pseudodata_posts.json')
const blank_images = require('../img/blank_images.json')

const PostDetails = (props) => {
    const [post, setPost] = useState({})
    const [writer, setWriter] = useState([])
    const [reviews, setReviews] = useState([])
    const [reviewers, setReviewers] = useState([])
    const [volunteers, setVolunteers] = useState([])

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        updateData();
    }, [])

    const updateData = () => {
        dataService.getOnePost(params.id, post => {

            console.log(post);
            //console.log(post.applicants)

            dataService.getOneUser(post.writer, user => {
                console.log(user);
                setWriter(user);
            })
            dataService.getReviews(post._id, newReviews => {
                //console.log(newReviews);
                setReviews(newReviews);
            })

            //console.log(post);
            console.log(`Status: ${post.status}`);
            //console.log(post);
            setPost(post);
        })
    }

    const getDate = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(post.availability);

        let str = `${months[date.getMonth()]} 
                    ${date.getDate()}${getDaySuffix(date.getDate())}, 
                    ${date.getFullYear()}`
        //console.log(str);
        return str;
    }

    const getDaySuffix = (i) => {
        const daySuffix = ["st", "nd", "rd", "th"]
        //console.log(i);
        if (i > 3) {
            return daySuffix[3];
        } else {
            return daySuffix[i - 1];
        }
    }

    const goToEdit = () => {
        //console.log('%c user attempted to go to profile:' + params.id, 'color:blue');
        navigate('/postedit/' + params.id);
    }

    // const convertImage = (a) => {
    //     console.log(a);
    //     if(a === undefined || a === null){

    //         return blank_images.image;

    //     } else {
    //         return `data:image/png;base64,${a}`;
    //         //when first loaded, media (a) is sometimes undefined.
    //         //console.log("media is undefined")
    //     }

    // }

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

    const applyForPost = () => {
        dataService.addApplicant(componentService.grabMyUserDetails().userId, params.id, (success) => {
            if (success) {
                //console.log("U71")
                updateData();
            } else {
                //console.log("U72")
            }
        });
    }

    const AcceptApplication = (applicant_id) => {
        dataService.acceptApplicant(applicant_id, params.id, (success) => {
            if (success) {
                //console.log("U71")
                updateData();
            } else {
                //console.log("U72")
            }
        });
    }

    const RevokeApplication = (applicant_id) => {
        dataService.revokeApplicant(applicant_id, params.id, (success) => {
            if (success) {
                //console.log("U71")
                updateData();
            } else {
                //console.log("U72")
            }
        });
    }

    const ClearApplicants = () => {
        dataService.clearApplicant(params.id, (success) => {
            if (success) {
                //console.log("U71")
                updateData();
            } else {
                //console.log("U72")
            }
        });
    }

    const ClosePost = () => {
        dataService.ClosePost(params.id, (success) => {
            if (success) {
                //console.log("U71")
                updateData();
            } else {
                //console.log("U72")
            }
        });
    }
    const OpenPost = () => {
        dataService.OpenPost(params.id, (success) => {
            if (success) {
                //console.log("U71")
                updateData();
            } else {
                //console.log("U72")
            }
        });
    }

    const deletePost = () => {
        dataService.deletePost(params.id, (success) => {
            if (success) {
                //console.log("U71 DEL")
                navigate('/');
            } else {
                //console.log("U72 DEL")
            }
        });
    }

    const getAllApplicants = () => {
        if (post.length > 0) {
            return post.applicants.map((applicant, i) => {
                return <Applicant key={i} accepted={false} id={applicant} />
            })
        } else {
            console.log("loading applicants...")
        }
        // console.log(post)
        // console.log(post.applicants)
    }

    const testy = () => {

        if (post.applicants == null) {
            console.log("NONE")
        }
        else {
            console.log("GOTEM")
        }

        //console.log("loading applicants...")
    }

    const OwnerOfPost = () => {
        return componentService.grabMyUserDetails().userId == writer._id
    }
    const NotTheOwnerOfPost = () => {
        return componentService.grabMyUserDetails().userId != writer._id
    }
    const PostIsOpen = () => {
        return post.status == "Open"
    }
    const PostIsClosed = () => {
        return post.status == "Closed"
    }
    const Administrator = () => {
        return true
    }

    // console.log(params.id)
    return (
        <div className="container-fluid">
        <div className="shadow-sm p-3 mb-5 bg-white rounded mx-2 my-5">
            <div className="row">
                <div className="col-md-6">
                <img
                    alt="Bootstrap Image Preview"
                    src={componentService.convertImageFromBase64(post.media, 'img')}
                    className="rounded postImage"
                />
                <p>
                    <span className="fw-bold">Author: {`${writer.firstName} ${writer.lastName}`}</span>
                </p>
                {post.status == 'Closed' ? <p className="fw-bold text-danger">Closed</p> : <p className="fw-bold">Ends: {getDate()}</p>}

                {/* <button>
                        <i className="fa-solid fa-ellipsis-vertical fa-xl"></i>
                    </button> */}

                </div>
                <div className="col-md-6">
                        <div className="d-flex">
                            {/* <span>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </span> */}
                            {/* <button type="button" className="btn btn-success" onClick={() => navigate(`/postedit/${params.id}`)}>
                                edit
                            </button>
                            <button type="button" className="btn btn-success" onClick={() => deletePost()}>
                                Delete
                            </button> */}
                            <div className="d-flex flex-column">
                                <h2>
                                    {post.title}
                                </h2>
                                <p>
                                    {post.body}
                                </p>
                            </div>

                            {/* <button>
                                <i className="fa-solid fa-ellipsis-vertical fa-xl"></i>
                            </button> */}

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
                    {OwnerOfPost() || Administrator() ? (
                        <> 
                        <a
                        className="dropdown-item"
                        onClick={() => navigate(`/postedit/${params.id}`)}
                        >
                        <span className="d-flex justify-content-between">
                            Edit Post <i class="fa-solid fa-pen text-dark mt-1"></i>
                        </span>
                        </a>

                        <a
                        className="dropdown-item text-danger"
                        onClick={() => deletePost()}
                        >
                        <span className="d-flex justify-content-between">
                            Delete Post <i className="fa-solid fa-trash mt-1"></i>
                        </span>
                        </a>

                        <a
                        className="dropdown-item text-danger"
                        onClick={() => ClearApplicants()}
                        >
                        <span className="d-flex justify-content-between">
                            <p>Clear Applicants</p> <i class="fa-solid fa-circle-xmark mt-1"></i>
                        </span>
                        </a>

                        <hr />

                        <a
                        className="dropdown-item"
                        onClick={() => OpenPost()}
                        >
                        <span className="d-flex justify-content-between">
                            Open Post <i class="fa-solid fa-book-open text-dark mt-1"></i>
                        </span>
                        </a>

                        <a
                        className="dropdown-item text-success"
                        onClick={() => ClosePost()}
                        >
                        <span className="d-flex justify-content-between">
                            Close Post <i class="fa-solid fa-circle-check mt-1"></i>
                        </span>
                        </a>
                    </>
                    ) : null}

                    </div>
                    </div>
                    
                </div>
                        </div>
                    </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                {!OwnerOfPost() && PostIsOpen() ? (
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => applyForPost()}
                    >
                    Apply
                    </button>
                ) : null}
                {!OwnerOfPost() && PostIsClosed() ? (
                    <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => deletePost()}
                    >
                    Review
                    </button>
                ) : null}
                </div>
            </div>
      </div>

      <br />
      <br />
      <br />
      {(OwnerOfPost() || Administrator()) && PostIsOpen() ? (
        <>
        <div className="d-flex people">
            <div>
                <h4 className="mb-3 title">Accepted</h4>
                <div className="row">
                    <div className="col-md-12">
                    {post.people_accepted != null //testy(): null
                        ? post.people_accepted.map((person_accepted, i) => {
                            return (
                            <Applicant
                                key={i}
                                accepted={true}
                                id={person_accepted}
                                RevokeApplication={RevokeApplication}
                            />
                            );
                        })
                        : null}
                    <ApplicantEmpty />
                    </div>
                </div>
            </div>

            <div className="mx-auto">
                <h4 className="mb-3 title">Volunteered</h4>
                <div className="row">
                    <div className="col-md-12">
                    {post.applicants != null //testy(): null
                        ? post.applicants.map((applicant, i) => {
                            return (
                            <Applicant
                                key={i}
                                accepted={false}
                                id={applicant}
                                AcceptApplication={AcceptApplication}
                            />
                            );
                        })
                        : null}
                    </div>
                </div>
            </div>
        </div>  
        </>
      ) : null}

      <br />
      <br />
      <br />

      {(OwnerOfPost() || Administrator()) && PostIsClosed() ? (
        <>
          <h4>Write Review</h4>
          <div className="row">
            <div className="col-md-12">
              <ReviewCreate poster={post.writer} post_id={post._id} />
            </div>
          </div>
        </>
      ) : null}
      {PostIsClosed() ? (
        <>
          <h4 className="mb-3 title">Reviews</h4>
          <div className="row">
            <div className="col-md-12">
              {post._id != null
                ? reviews.map((review, i) => {
                    return <Review key={i} data={review} />;
                  })
                : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
    )
}

export default PostDetails