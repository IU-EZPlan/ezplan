import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { useAuth } from "../context/AuthUserContext";
import { database } from "../firebase";

import NewAdventureForm from "../components/newTripForm";
import DashboardTrip from "../components/dashboardTrip";
import * as ROUTES from '../constants/routes';
import "../styles/dashboard.css";


const Dashboard = () => {
    const history = useHistory();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [tripData, setTripData] = useState([]);
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

    useEffect(() => {
        
        database.collection("users").doc(currentUser.uid).collection('trips')
        .onSnapshot((snap) => {
                var list_of_trips = [];

                snap.forEach((doc) => {
                    // console.log(doc.data(), doc.id);
                    list_of_trips.push({id: doc.id, ...doc.data()});
                });

                setTripData(list_of_trips);
                // console.log(tripData);
                setLoading(false);
        });

    }, [currentUser.uid]);

    const getPastTrips = () => {
        const trips = tripData.map((t) => {
            if (t.status === "complete"){
                return t.id
            }
            return null;
        })
        

        const filterTrips = trips.filter(t => t !== null);
        // console.log(filterTrips);

        if (filterTrips.length === 0) {
            return (<p>No Past Trips</p>)
        } else {
            return filterTrips.map((t, index) => {
                return <p key={index}>{t} <span className={`badge badge-success`}>complete</span></p>
            });
        }

    }

    const getPendingTrips = () => {
        const trips = tripData.map((trip, index) => {
            if (trip.status === "pending") {
                return <DashboardTrip key={index} trip={trip} />
            }
            return null;
        });

        const filterTrips = trips.filter(t => t !== null);
        // console.log(filterTrips);

        if (filterTrips.length === 0) {
            return <p className="p-3">No pending Trips</p>
        } else {
            return filterTrips
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
                        {loading ? 
                            <p>Loading. . .</p>
                        : 
                            <>{getPastTrips()}</>
                        }                        
                    </div>
                </div>


                <div className="col-xs-12 col-md-6 col-lg-9">
                    <NewAdventureForm userID={currentUser.uid} />

                    <div className="row">
                        {loading ? 
                            <p>Loading. . .</p>
                        : 
                            <>{getPendingTrips()}</>
                        }  
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;