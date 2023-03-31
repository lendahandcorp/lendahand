//this is a placeholder component for the body section.
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import dataService from '../services/dataService';
import componentService from '../services/componentService';
import '../css/applicant.css' 

const Applicant = (props) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        dataService.getOneUser(props.id, user => {
            setUser(user);
        })
    }, [])

    const navigate = useNavigate();

    return (
        <div className="container-fluid">
            <div className="mb-4 d-flex volunteer shadow-sm p-3 bg-white rounded">
                <div>
                    <img className="rounded-circle img-fluid userImage2" alt="Bootstrap Image Preview" src={componentService.convertImageFromBase64(user.picture, "pic")} />
                </div>
                <div
                >
                    <p className="fw-bold cursor-pointer"
                        onClick={() => {
                            navigate('/profile/' + user._id);
                            }}
                    >
                        {`${user.firstName} ${user.lastName}`}
                    </p>
                    {
                        props.accepted == true
                            ?
                            <button type="button" 
                                class="btn btn-danger"
                                onClick={() => props.RevokeApplication(props.id)}
                            >
                                Revoke
                            </button>
                            :
                            <button type="button" 
                                class="btn btn-primary"
                                onClick={() => props.AcceptApplication(props.id)}
                            >
                                Accept
                            </button>
                    }

                </div>
            </div>
        </div>
    )
}

export default Applicant