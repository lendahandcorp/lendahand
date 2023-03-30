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
            <div className="row">
                <div className="col-md-3">
                    <img alt="Bootstrap Image Preview" src={componentService.convertImageFromBase64(user.media, "pic")} />
                </div>
                <div className="col-md-9">
                    <p>
                        {`${user.firstName} ${user.lastName}`}
                    </p>
                    {
                        props.accepted == true
                            ?
                            <button type="button" 
                                class="btn btn-outline-secondary"
                                onClick={() => props.RevokeApplication(props.id)}
                            >
                                Revoke
                            </button>
                            :
                            <button type="button" 
                                class="btn btn-outline-secondary"
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