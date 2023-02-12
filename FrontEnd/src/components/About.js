import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';


const About = (props) => {

    return (
        <div class="container">
            <h1 className="text-center"> About us!</h1>

            <br/>
            <h3>Vision</h3>
            <p>
            A sense of belonging and engangment
            </p>

            <br/>
            <h3>Mission</h3>
            <p>
                Lend-A-Hand acts as a community gathering, and a channel of communication. we engage community to provide helps each other out
            </p>

            <br/>
            <h3>Values</h3>
            <p>
                We are together in the community, we value relationships.
            </p>

            <br/>
            <h3>Who we are</h3>
            <p>
                Project lend a hand began from ideas of IT web programming students from Nova Scotia Community Collge in 2023.
            </p>
        </div>
    )
}

export default About