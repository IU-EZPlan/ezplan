import React from "react";
import '../styles/landing.css'

import logo from "../photos/logos/logo-title-black-2.png";

const Landing = () => {
    return (
        <div>
            <div className="landing-hero">
                <div>
                    <img src={logo} alt="landing logo" />
                </div>
            </div>
        </div>
    )
}

export default Landing;