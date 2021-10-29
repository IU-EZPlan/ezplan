import React, { useRef, useState } from "react";
import { database } from "../firebase";


const NewAdventureForm = ({ userID }) => {
    const [error, setError] = useState("");
    const name = useRef();
    const checkin = useRef();
    const checkout = useRef();
    const locationName = useRef();

    const createNewTrip = async (e) => {
        e.preventDefault();
        const nameStr = name.current.value;
        const startDate = checkin.current.value;
        const endDate = checkout.current.value;
        const loc = locationName.current.value;

        // Get list of trip names
        await database.collection('users').doc(userID)
            .collection('trips').onSnapshot((snap) => {
                snap.forEach((doc) => {
                    console.log(doc.data(), doc.id);
                    if (nameStr === doc.id) {
                        setError("The trip " + nameStr + " already exists");
                    }
                })
            })

        if (error !== "") {

            // Create a new trip in the databse
            await database.collection('users').doc(userID).collection('trips').doc(nameStr).set({
                status: "pending",
                checkInDate: startDate,
                checkOutDate: endDate,
                location: loc,
                adults: adultTravelers,
                children: childTravelers,
                rooms: rooms
            });

            // close the modal
            // var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {})
            // myModal.hide();
        }

        return;
            
    }


    // Advances Search Variables
    const [adultTravelers, setAdultTravelers] = useState(2);
    const [childTravelers, setChildTravelers] = useState(0);
    const [rooms, setRooms] = useState(1);

    //   ROOMS (min: 1, max: 5)
    const handleRoomCount = (num) => {
        if (num === 1 && rooms < 5) {
            setRooms(rooms + 1);

        } else if (num === -1 && rooms > 1) {
            setRooms(rooms - 1);
        }
    }

    //   ADULT (min: 1, max: 10)
    const handleAdultCount = (num) => {
        if (num === 1 && adultTravelers < 10) {
            setAdultTravelers(adultTravelers + 1);

        } else if (num === -1 && adultTravelers > 1) {
            setAdultTravelers(adultTravelers - 1);
        }
    }

    //   CHILDREN (min: 0, max: 10)
    const handleChildCount = (num) => {
        if (num === 1 && childTravelers < 10) {
            setChildTravelers(childTravelers + 1);

        } else if (num === -1 && childTravelers > 0) {
            setChildTravelers(childTravelers - 1);
        }
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
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Adventure</h5>
                            <p>Fill out the form to create a new intinerary.</p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <form className="mt-4 container-fluid">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Name" ref={name} required/>
                                    <small id="emailHelp" className="form-text text-muted">Give your adventure a name that you'll recognize it by.</small>
                                    {error ? <p className="text-danger">{error}</p> : null}
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Trip Location" ref={locationName} required/>
                                    <small id="emailHelp" className="form-text text-muted">Where are you going?</small>
                                </div>

                                <div className="form-group">
                                    <h5>Travelers</h5>

                                    <div className="input-row">
                                        <div><p className="my-auto">Rooms</p></div>
                                        <div className="d-flex">
                                            <button className="btn btn-primary" onClick={() => {handleRoomCount(-1)}}><i className="fa fa-minus"></i></button>
                                            <p className="mx-4 my-auto">{rooms}</p>
                                            <button className="btn btn-primary" onClick={() => {handleRoomCount(1)}}><i className="fa fa-plus"></i></button>
                                        </div>
                                    </div>

                                    <div className="input-row">
                                        <div><p className="my-auto">Adults</p></div>
                                        <div className="d-flex">
                                            <button className="btn btn-primary"  onClick={() => {handleAdultCount(-1)}}><i className="fa fa-minus"></i></button>
                                            <p className="mx-4 my-auto">{adultTravelers}</p>
                                            <button className="btn btn-primary" onClick={() => {handleAdultCount(1)}}><i className="fa fa-plus"></i></button>
                                        </div>
                                    </div>

                                    <div className="input-row">
                                        <div><p className="my-auto">Children</p></div>
                                        <div className="d-flex">
                                            <button className="btn btn-primary"  onClick={() => {handleChildCount(-1)}}><i className="fa fa-minus"></i></button>
                                            <p className="mx-4 my-auto">{childTravelers}</p>
                                            <button className="btn btn-primary" onClick={() => {handleChildCount(1)}}><i className="fa fa-plus"></i></button>
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group justify-content-between">
                                    <h5>Dates</h5>
                                    
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
                    
        </>
    )
}

export default NewAdventureForm;