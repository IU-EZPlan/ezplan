import React, {useState} from "react";
import { useAuth } from "../context/AuthUserContext";
import { useHistory } from "react-router";
import * as ROUTES from '../constants/routes';
import { Link } from "react-router-dom";

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
        <div className="container-fluid">
            <h1>Dashboard/Profile</h1>
            <p>User that's currently logged in</p>
            <p>Email: <strong>{currentUser.email}</strong></p>
            {error ? <p>{error}</p> : null}

            <button type="button" class="btn btn-secondary" onClick={handleLogout}>Log Out</button>
            <Link to={ROUTES.UPDATE_PROFILE}>
                <button type="button" class="btn btn-secondary">UpdateProfile</button>
            </Link>

            <hr/>
            <p>Things we need to add:</p>
            <ul>
                <li>View Itinerary</li>
                <li>Change Itinerary --> Maybe drag and drop?</li>
                <li>Share Itinerary with friends</li>
            </ul>
        </div>
    )
}

export default Dashboard;