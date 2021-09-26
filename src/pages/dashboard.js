import React, {useState} from "react";
import { useAuth } from "../context/AuthUserContext";
import { useHistory } from "react-router";
import * as ROUTES from '../constants/routes';

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
        <div>
            <h1>Profile</h1>
            <p>Email: <strong>{currentUser.email}</strong></p>
            {error ? <p>{error}</p> : null}

            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Dashboard;