import React from "react";

const DashboardTrip = ({trip}) => {
    return (
        <div className="col-sm-12 mb-4" key={trip.id}>
            <div className="card" style={{borderRadius: "20px"}}>
                <div className="card-body">
                    <h3>{trip.id}</h3>
                    <p><span className={`badge badge-${trip.status === "pending" ? "primary" : "secondary"} secondary`}>{trip.status}</span></p>
                    <p>{trip.checkInDate}</p>
                    <p>Trip</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardTrip;