import React from "react";
import logo from "../photos/logos/logo-black.png";
import "../styles/screens.css";


const PromptScreen = ({heading, subtext, type}) => {
    return (
        <div className="screen w-100">
            <div>
                <img src={logo} alt="loading" />
                <h1>{heading}</h1>
                <p>{subtext}</p>
            </div>
        </div>
    )
}

export default PromptScreen;