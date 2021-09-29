import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { useAuth } from "../../context/AuthUserContext";
import '../../styles/navbar.css';

const LoggedOutNav = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light">
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
                        <Link className="nav-link" to={ROUTES.LOGIN}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.SIGN_UP}>Signup</Link>
                    </li>
                </ul>
            </div>
        </nav>
        </>    
    )
}

const LoggedInNav = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light">
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


                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item">Action</a>
                            <a className="dropdown-item">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item">Something else here</a>
                        </div>
                    </li> */}
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