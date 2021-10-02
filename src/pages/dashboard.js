import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useHistory } from "react-router";
import { useAuth } from "../context/AuthUserContext";

import * as ROUTES from '../constants/routes';
import "../styles/dashboard.css";

 // this page is only visible to users who are logged in
const Dashboard = () => {
    const history = useHistory();
    const [error, setError] = useState();
    const { currentUser, logout } = useAuth();


    const handleLogout = async () => {
        setError("");

        try {
            await logout(); 
            history.push(ROUTES.LOGIN);
        } catch {
            setError("failed to log out");
        }
    }

    return (
        <div className="container-fluid my-3">
            <div className="row">
                <div className="col-xs-12 col-md-6 col-lg-4">
                    <div className="card profile">
                        <div className="card-body">
                            <div className="name-and-pic mb-5">
                                <img src={currentUser.photoURL} alt="profile pic" width="50%" />
                                <h4>My Account</h4>
                            </div>

                            <div className="card-body ml-2 mr-2">
                                <p>Display Name: <strong>{currentUser.displayName}</strong></p>
                                <p>Email: <strong>{currentUser.email}</strong></p>
                            </div>

                            {error ? <p>{error}</p> : null}
                            <div className="card-footer bg-transparent d-flex justify-content-between">

                                <button type="button" className="btn btn-danger mr-5" onClick={handleLogout}>Log Out</button>
                                <Link to={ROUTES.UPDATE_PROFILE}>
                                    <button type="button" className="btn btn-secondary">Update Profile</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-8">

                    <p>Things we need to add:</p>
                    <ul>
                        <li>View Itinerary</li>
                        <li>Change Itinerary -- Maybe drag and drop?</li>
                        <li>Share Itinerary with friends</li>
                    </ul>

                </div>
            </div>

        </div>
    )
}

export default Dashboard;