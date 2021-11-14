import React from "react";

import { useAuth } from "../context/AuthUserContext";
import { database } from '../firebase';
import "../styles/timeline.css";

const DashboardTrip = ({trip}) => {
    const { currentUser } = useAuth();

    const markAsComplete = async () => {
        await database.collection('users').doc(currentUser.uid).collection('trips').doc(trip.id).update({
            status: "complete"
        });

        window.location.reload();
    }

    const deleteTrip = async () => {
        await database.collection('users').doc(currentUser.uid).collection('trips').doc(trip.id).delete();

        window.location.reload();
    }

    const backgroundTitleStyle = {
        background: `linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.3)), url('${trip.imageURL}')`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        // borderRadius: "20px"
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const formatCosts = () => {
        var items = []
        if (trip.hotel) {
            var date1 = new Date(trip.checkInDate);
            var date2 = new Date(trip.checkOutDate);

            const difference_in_days = (date2 - date1) / (1000 * 3600 * 24);
            const price = trip.hotel.min_total_price.toFixed(2);
            // const price = Math.round(trip.hotel.min_total_price * 100) / 100;
            items.push({
                name: "Hotel",
                details: `$ ${numberWithCommas(price)}/night  x  ${difference_in_days} days`,
                total: price * difference_in_days
            });
        }

        // Need to add in the intinerary totaling
        if (trip.itinerary) {
            trip.itinerary.map((i) => {
                return items.push({
                    name: i.name,
                    details: i.price ? `$ ${numberWithCommas(i.price)}  x  ${i.quantity} person(s)` : "Check Ticket Master for Price",
                    total: 0
                });
            })
        }

        var sum = 0;
        if (items) {
            items.forEach((i) => {
                sum += i.total;
            })
        }
        return (
            <div className="py-4 mb-4">
                {items.map((i) => {
                    return (
                        <div className="mb-2">
                            <strong>{i.name}</strong>
                            <div className="d-flex justify-content-between">
                                <p className="text-muted"><em>{i.details}</em></p>
                                <p>$ {numberWithCommas(i.total)}</p>
                            </div>
                        </div>
                    )
                })}

                <hr/>
                <div className="d-flex justify-content-between">
                    <strong>Subtotal</strong>
                    <p>$ {numberWithCommas(sum)}</p>
                </div>
            </div>
        )
    }

    const formatIntineray = () => {
        var items = [];
        // First item
        if (trip.hotel) {
            items.push({
                title: "Check In",
                subtexts: [trip.hotel.hotel_name],
                place: [trip.hotel.address, trip.hotel.city + ", " + trip.hotel.zip],
                time:  new Date(trip.checkInDate + ' ' + trip.hotel.checkin.from).toUTCString(),
                item_classes: "active",
                dot_line_classes: "b-primary" // b-warning or b-danger
            })
        }

        // For item in trip itinerary, sort them by date, then add them to the items list
        if (trip.itinerary) {
            trip.itinerary.map((i) => {
                return items.push({
                    title: i.name,
                    subtexts: [i.price],
                    place: ["address", "city"],
                    time: new Date(i.date + ' ' + i.time).toUTCString(),
                    item_classes: "",
                    dat_line_classes: "b-primary"
                })
            })
        }

        // Last Item
        if (trip.hotel) {
            items.push({
                title: "Check Out",
                subtexts: [trip.hotel.hotel_name],
                place: [trip.hotel.address, trip.hotel.city + ", " + trip.hotel.zip],
                time:  new Date(trip.checkOutDate + ' ' + trip.hotel.checkout.until).toUTCString(),
                item_classes: "active",
                dot_line_classes: "b-primary" // b-warning or b-danger
            })
        }


        return (
        <div className="timeline px-4 mb-4">
            {items.map((item) => {
                return (
                <div className={`tl-item ${item.item_classes}`} key={item.title}>
                    <div className={`tl-dot ${item.dot_line_classes}`}></div>

                    <div className="tl-content">
                        <div><strong>{item.title}</strong></div>

                        {item.subtexts ? (
                            <>
                                {
                                    item.subtexts.map((text, index) => {
                                        return <p key={index}>{text}</p>
                                    })
                                }
                            </>
                        ): null}



                        <div className="tl-date text-muted mt-1">{item.time}</div>
                        <div className="tl-date text-muted mt-1">
                            {
                                item.place.map((text, index) => {
                                    return <span key={index}>{text} <br/></span>
                                })
                            }
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
        )
    }


    return (
        <>
        <div className="col-sm-12 mb-4" key={trip.id}>
            <div className="card border-start-4 dashboard-trip">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12 col-lg-6">
                            <div style={backgroundTitleStyle}>
                                <h3>{trip.id}</h3>
                            </div>
                        </div>

                        <div className="col-sm-12 col-lg-6">

                            {/* <h5><span className={`badge badge-secondary`}>{trip.status}</span></h5> */}

                            <div className="mb-3">
                                <input type="text" readOnly className="form-control-plaintext border-bottom" value={trip.location} />
                                <small>Destination</small>
                            </div>

                            <div className="mb-3 d-flex">
                                <div className="w-50 mr-2">
                                    <input type="text" readOnly className="form-control-plaintext  pb-0" value={trip.checkInDate} />
                                    <small>Arrival</small>
                                </div>
                                <div className="w-50 ml-2">
                                    <input type="text" readOnly className="form-control-plaintext  pb-0" value={trip.checkOutDate} />
                                    <small>Departure</small>
                                </div>
                            </div>

                            <div className="mb-3 d-flex">
                                <div className="w-50 mr-2">
                                    <input type="text" readOnly className="form-control-plaintext  pb-0" value={`Adults: ${trip.adults}, Children: ${trip.children}`} />
                                    <small>Travelers</small>
                                </div>
                                <div className="w-50 ml-2">
                                    <input type="text" readOnly className="form-control-plaintext pb-0" value={trip.rooms} />
                                    <small>Rooms</small>
                                </div>
                            </div>

                            <div className="mt-5 d-flex">
                                <button className="btn btn-primary w-50" type="button" data-toggle="collapse" data-target={`#collapseExample-${trip.id}`}>Show Itinerary</button>

                                <button type="button" className="btn btn-secondary w-25 ml-2" data-toggle="modal" data-target={`#mark-complete-${trip.id}`}><small>Mark Complete</small></button>
                                <button type="button" className="btn btn-danger w-25 ml-2" data-toggle="modal" data-target={`#delete-${trip.id}`}><small>Delete Trip</small></button>
                            </div>
                            

                        </div>
                    </div>


                    {/* Collapse to show Itinerary */}
                    <div className="row collapse" id={`collapseExample-${trip.id}`}>
                        <div className="col-sm-12 col-lg-8 col-xl-6 py-4">
                            <h3>Itinerary</h3>

                            {trip.hotel || trip.itinerary ? <>{formatIntineray()}</> : <p>No hotel or event found. Add to this trip in search tab.</p>}
                        </div>

                        <div className="col-sm-12 col-lg-4 col-xl-6">
                            <h3>Total Costs</h3>
                            {trip.hotel || trip.itinerary ? <>{formatCosts()}</> : <p>No hotel or event found. Add to this trip to see the costs calculated.</p>}
                        </div>
                    </div>
                </div>           
            </div>
        </div>



        {/* <!-- Mark Complete Modal --> */}
        <div className="modal fade" id={`mark-complete-${trip.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Mark as Complete</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <h5 className="text-warning">Warning!</h5>
                        <p>You are about to mark <strong>{trip.id}</strong> as complete. This action cannot be undone. <strong>Do you wish to continue?</strong></p>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-success" onClick={markAsComplete}>Mark Complete</button>
                    </div>
                </div>
            </div>
        </div>



        {/* <!-- Delete Complete Modal --> */}
        <div className="modal fade" id={`delete-${trip.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <h5 className="text-danger">Danger!</h5>
                        <p>You are about to delete <strong>{trip.id}</strong> as from your trips. This action cannot be undone. <strong>Do you wish to continue?</strong></p>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" onClick={deleteTrip}>Delete</button>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default DashboardTrip;