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
                <div className="col-md-12">
                    <p>
                        Accepted a volunteer to fill this spot.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Applicant