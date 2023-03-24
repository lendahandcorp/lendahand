//this is a placeholder component for the body section.
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dataService from '../services/dataService';

const Applicant = (props) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        // dataService.getOneUser(props.data.reviewer, user => {
        //     console.log(user);
        //     setUser(user);
        // })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <img alt="Bootstrap Image Preview" src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" />
                </div>
                <div className="col-md-9">
                    <p>
                        user 1
                    </p>
                    {
                        props.accepted == true
                            ?
                            <button type="button" class="btn btn-outline-secondary">
                                Revoke
                            </button>
                            :
                            <button type="button" class="btn btn-outline-secondary">
                                Accept
                            </button>
                    }

                </div>
            </div>
        </div>
    )
}

export default Applicant