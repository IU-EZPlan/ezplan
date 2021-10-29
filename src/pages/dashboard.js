import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useAsync, IfPending, IfRejected, IfFulfilled } from 'react-async';

import { useAuth } from "../context/AuthUserContext";
import { database } from "../firebase";

import NewAdventureForm from "../components/newTripForm";
import DashboardTrip from "../components/dashboardTrip";
import * as ROUTES from '../constants/routes';
import "../styles/dashboard.css";


const trips = async ({id}) => {
    var list_of_trips = [];

    await database.collection("users").doc(id).collection('trips')
        .onSnapshot((snap) => {
            snap.forEach((doc) => {
                console.log(doc.data(), doc.id);
                list_of_trips.push({id: doc.id, ...doc.data()});
            })
    })

    return list_of_trips
}


const Dashboard = () => {
    const history = useHistory();
    const [error, setError] = useState();
    const { currentUser, logout } = useAuth();
    
    const fetchState = useAsync(trips, {id: currentUser.uid});

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
                            <div className="name-and-pic mb-3">
                                <img src={currentUser.photoURL} alt="profile pic" width="50%" />
                            </div>

                            <div className="mb-3">
                                <input type="text" readOnly className="form-control-plaintext border-bottom" id="staticEmail" value={currentUser.displayName} />
                                <small>Display Name</small>
                            </div>

                            {/* If there's an error, it shows here */}
                            {error ? <p>{error}</p> : null}

                            <div>
                                <Link to={ROUTES.UPDATE_PROFILE}>
                                    <button type="button" className="btn btn-secondary btn-block mb-3">Update Profile</button>
                                </Link>
                                <button type="button" className="btn btn-danger btn-block" onClick={handleLogout}>Log Out</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h3>Past Tours</h3>

                        <IfPending state={fetchState}>LOADING</IfPending>
                        <IfRejected state={fetchState}>ERROR</IfRejected>
                        <IfFulfilled state={fetchState}>
                            {(data) => {
                                const trips = data.map((t) => {
                                    if (t.status === "complete") {
                                        console.log(t.id);
                                        return t.id;
                                    } 
                                    return null;
                                });

                                const filterTrips = trips.filter(t => t !== null);
                                console.log(filterTrips);

                                if (filterTrips.length === 0) {
                                    return <p>No past trips</p>
                                } else {
                                    return filterTrips.map((t, index) => <p key={index}>{t}</p>)
                                }

                            }}
                        </IfFulfilled>

                        
                    </div>
                </div>


                <div className="col-xs-12 col-md-6 col-lg-9">
                    <NewAdventureForm userID={currentUser.uid} />

                    <div className="row">

                        <IfPending state={fetchState}>LOADING</IfPending>
                        <IfRejected state={fetchState}>ERROR</IfRejected>
                        <IfFulfilled state={fetchState}>
                            {(data) => {
                                console.log(data);

                                const trips = data.map((trip, index) => {
                                    if (trip.status === "pending") {
                                        return <DashboardTrip trip={trip} />
                                    }
                                    return null;
                                });

                                const filterTrips = trips.filter(t => t !== null);
                                console.log(filterTrips);

                                if (filterTrips.length === 0) {
                                    return <p>No Pending Trips</p>
                                } else {
                                    return filterTrips
                                }


                            }}
                        </IfFulfilled>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;