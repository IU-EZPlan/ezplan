import React, {useState} from "react";
import { useAuth } from "../context/AuthUserContext";

 // this page is only visible to users who are logged in
const Dashboard = () => {

    const [error, setError] = useState();
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {

    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: <strong>{currentUser.email}</strong></p>

            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Dashboard;