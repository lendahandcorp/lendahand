//this is a placeholder component for the body section.
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dataService from '../services/dataService';
import '../css/applicant.css'

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
            <div className="mb-4 d-flex volunteer shadow-sm p-3 bg-white rounded">
                <div>
                    <img className="rounded" alt="Bootstrap Image Preview" src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" />
                </div>
                <div>
                    <p className="fw-bold">
                        Robert De Niro
                    </p>
                    {
                        props.accepted == true
                            ?
                            <button type="button" class="btn btn-danger">
                                Revoke
                            </button>
                            :
                            <button type="button" class="btn btn-primary">
                                Accept
                            </button>
                    }

                </div>
            </div>
        </div>
    )
}

export default Applicant