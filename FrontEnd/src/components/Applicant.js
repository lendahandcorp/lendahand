//this is a placeholder component for the body section.
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dataService from '../services/dataService';
import componentService from '../services/componentService';

const Applicant = (props) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        dataService.getOneUser(props.id, user => {
            setUser(user);
        })
    }, [])

    return (
        <div className="container-fluid">
            <div className="mb-4 d-flex volunteer shadow-sm p-3 bg-white rounded">
                <div>
                    <img className="rounded" alt="Bootstrap Image Preview" src={componentService.convertImageFromBase64(user.media, "pic")} />
                </div>
                <div>
                    <p className="fw-bold">
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