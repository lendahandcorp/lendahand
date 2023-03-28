import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';


const About = (props) => {

    return (
        <div class="container mt-5 about">
            <div className="row mb-5">
                <div className="col-12">
                    <h1 className="text-center fw-bold"> About us</h1>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="fw-bold">Vision</h4>
                    <p className="fw-light">
                        A sense of belonging and engangment
                    </p>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="fw-bold">Mission</h4>
                    <p className="fw-light">
                        Lend-A-Hand acts as a community gathering, and a channel of communication. we engage community to provide helps each other out.
                    </p>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="fw-bold">Values</h4>
                    <p className="fw-light">
                        We are together in the community, we value relationships.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h4 className="fw-bold">Who we are</h4>
                    <p className="fw-light">
                        Project lend a hand began from ideas of IT web programming students from Nova Scotia Community Collge in 2023.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About