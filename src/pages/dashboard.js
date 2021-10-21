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
                <div className="col-xs-12 col-md-6 col-lg-3">
                    <div className="card profile">
                        <div className="card-body">
                            <div className="name-and-pic mb-4">
                                <img src={currentUser.photoURL} alt="profile pic" width="50%" />
                            </div>

                            <div className="card-body">
                                <div className="mb-3">
                                    <input type="text" readonly class="form-control-plaintext border-bottom" id="staticEmail" value={currentUser.displayName} />
                                    <p><small>Display Name</small></p>
                                </div>

                                <div className="mb-3">
                                    <input type="text" readonly class="form-control-plaintext border-bottom" id="staticEmail" value={currentUser.email} />
                                    <p><small>Email</small></p>
                                </div>
                            </div>


                            {/* If there's an error, it shows here */}
                            {error ? <p>{error}</p> : null}


                            <div className=" bg-transparent">
                                <Link to={ROUTES.UPDATE_PROFILE}>
                                    <button type="button" className="btn btn-secondary btn-block mb-3">Update Profile</button>
                                </Link>
                                <button type="button" className="btn btn-danger btn-block" onClick={handleLogout}>Log Out</button>
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