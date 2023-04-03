import React from 'react';
import '../css/footer.css';


const Donate = (props) => {

    return (
        <div class="container mt-5 mb-5 donate">
            <div className="row mb-5">
                <div className="col-9 m-auto">
                    <h1 className="text-center fw-bold">Donate</h1>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-9 m-auto fw-normal text-center">
                    <p>
                      This is non-profit company, and we are run by donations. Please email us if you are interested in supporting us!
                    </p>
                    <p><a href="mailto:w0448225@nscc.ca?subject=Land A Hand Enquiry: <Reason>">capstoneteamawesome2023@gmail.com</a></p>
                </div>
            </div>
        </div>
    )
}

export default Donate;