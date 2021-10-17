import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

import * as ROUTES from "../constants/routes";
import { useAuth } from "../context/AuthUserContext";
import '../styles/navbar.css';

const isPositionFixed = (pathname) => {
    if (pathname === ROUTES.LANDING) {
        return true;
    } else if (pathname === ROUTES.HOME) {
        return true;
    } else {
        return false;
    }
}

const LoggedOutNav = () => {
    const location = useLocation();

    return (
        <>
        <nav className={`navbar navbar-expand-lg w-100 ${isPositionFixed(location.pathname) ? "position-fixed nav-transparent navbar-dark" : "navbar-light"}`}>
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
        <nav className={`navbar navbar-expand-lg w-100 ${isPositionFixed(location.pathname) ? "position-fixed nav-transparent navbar-dark" : "navbar-light"}`}>
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