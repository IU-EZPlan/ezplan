import React from "react";
import '../styles/landing.css'

import logo from "../photos/logos/logo-title-black-2.png";

const Landing = () => {
    return (
        <>
            <div className="landing-hero">
                <div>
                    <img src={logo} alt="landing logo" />
                    <h4>Get started planning things to do with a customized itinerary for your next vacation</h4>
                </div>
            </div>

            <div className="container mt-2 mb-5">
                <div className="row">
                    <div className="col-xs-12">
                        <h2>Welcome to EZ Plan</h2>
                        <p>Get started on your vacation by planning your personalized tour itinerary</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h3>Step 1</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h3>Step 2</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h3>Step 3</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;