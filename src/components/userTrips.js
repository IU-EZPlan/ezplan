import React, { useRef, useState } from "react";
import { database } from "../firebase";


const UserTrips = ({ userID }) => {
    const [error, setError] = useState("");
    const name = useRef();
    const checkin = useRef();
    const checkout = useRef();

    const createNewTrip = async (e) => {
        e.preventDefault();
        const nameStr = name.current.value;
        const startDate = checkin.current.value;
        const endDate = checkout.current.value;

        // Get list of trip names
        const list_of_trips = await database.collection('users').doc(userID)
            .collection('trips').onSnapshot((snap) => {
                snap.forEach((doc) => {
                    console.log(doc.data(), doc.id)
                })
        })

        console.log(list_of_trips);

        // await database.collection('users').doc(userID).collection('trips').doc(nameStr).set({
        //     status: "pending",
        //     checkInDate: startDate,
        //     checkOutDate: endDate,
        // });
    }


    return (
        <>
            <div className="d-flex align-items-center mb-4">
                <h3>My Adventures</h3>
                <button type="button" className="btn btn-primary ml-auto" data-toggle="modal" data-target="#exampleModal">
                    New Adventure
                </button>
            </div>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Adventure</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Fill out the form to create a new intinerary.</p>

                            <form className="mt-4">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Name" ref={name} required/>
                                    <small id="emailHelp" className="form-text text-muted">Give your adventure a name that you'll recognize it by.</small>
                                </div>

                                <div className="form-group d-flex justify-content-between">
                                    <div className="d-flex flex-column">
                                        <input type="date" name="checkin" placeholder="Check In Date" ref={checkin} required/>
                                        <small className="form-text text-muted">Arrival / Check In Date</small>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <input type="date" name="checkout" placeholder="Check Out Date" ref={checkout} required/>
                                        <small className="form-text text-muted">Departure / Check Out Date</small>
                                    </div>
                                </div>

                                <button type="button" className="btn btn-block btn-primary mt-5" onClick={createNewTrip}>Create New Adventure</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">

                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">

                        </div>
                    </div>
                </div>

            </div>
                    
        </>
    )
}

export default UserTrips;