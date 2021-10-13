import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

import * as ROUTES from "../constants/routes";
import { useAuth } from "../context/AuthUserContext";
import '../styles/navbar.css';

const LoggedOutNav = () => {
    const location = useLocation();

    return (
        <>
        <nav className={`navbar navbar-expand-lg navbar-light w-100 ${location.pathname === ROUTES.LANDING ? "position-fixed nav-transparent" : ""}`}>
            <Link className="navbar-brand" to={ROUTES.LANDING}>EZ Plan</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.HOME}>EXPLORE</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.LOGIN}>LOGIN</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.SIGN_UP}>Signup</Link>
                    </li> */}
                </ul>
            </div>
        </nav>
        </>    
    )
}

const LoggedInNav = () => {
    const location = useLocation();

    return (
        <>
        <nav className={`navbar navbar-expand-lg navbar-light w-100 ${location.pathname === ROUTES.LANDING ? "position-fixed nav-transparent" : ""}`}>
            <Link className="navbar-brand" to={ROUTES.LANDING}>EZ Plan</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.ACCOUNT}>My Account</Link>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    )
}

const Navbar = () => {
    const { currentUser } = useAuth();

    return (currentUser && currentUser.email ? <LoggedInNav /> : <LoggedOutNav />)
}

export default Navbar;