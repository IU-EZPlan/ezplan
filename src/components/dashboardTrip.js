import React, { useState, useEffect, useRef } from "react";

import getSymbolFromCurrency from 'currency-symbol-map';

import { useAuth } from "../context/AuthUserContext";
import { database } from '../firebase';
import * as API_ROUTES from "../constants/api-routes";
import "../styles/timeline.css";


const DashboardTrip = ({trip}) => {
    const { currentUser } = useAuth();
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCostInUSD, setTotalCostInUSD] = useState();

    const reviewText = useRef();
    const [rating, setRating] = useState(5);


    useEffect(() => {
        
        database.collection("users").doc(currentUser.uid).collection('trips').doc(trip.id).collection("itinerary")
        .onSnapshot((snap) => {
                var list_of_events = [];

                snap.forEach((doc) => {
                    list_of_events.push({id: doc.id, ...doc.data()});
                });

                setItinerary(list_of_events);
                setLoading(false);
        });

    }, [currentUser.uid, trip.id]);


    const currency_conversion = async (base, amount) => {

        fetch(API_ROUTES.CURRENCY + `?base=${base}&&amount=${amount}&&to=USD`)
        .then((response) => {
          if (response.ok) { 
              return response.json();

            } else { 
              throw response; 
            }
    
        }).then((data) => {
          setTotalCostInUSD(data.amount);
  
        }).catch((error) => {
            console.log(error);
  
        });
    }

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

    const submitReview = async () => {
        const reviewDetails = reviewText.current.value;

        await database.collection('reviews').doc(`${trip.id}-${currentUser.uid}`).set({
            "rating": rating,
            "username": currentUser.displayName,
            "comments": reviewDetails,
            ...trip
            // can change this base on what we want present in the review
        });
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
        const currency_code = trip.hotel.price_breakdown.currency;
        const currency_symbol = getSymbolFromCurrency(currency_code)

        if (trip.hotel) {
            var date1 = new Date(trip.checkInDate);
            var date2 = new Date(trip.checkOutDate);

            const difference_in_days = (date2 - date1) / (1000 * 3600 * 24);
            const price = trip.hotel.min_total_price.toFixed(2);
            // const price = Math.round(trip.hotel.min_total_price * 100) / 100;

            items.push({
                name: "Hotel",
                details: `${currency_symbol} ${numberWithCommas(price)}/night  x  ${difference_in_days} days`,
                total: price * difference_in_days
            });
        }

        // Need to add in the intinerary totaling
        if (itinerary) {
            itinerary.map((i) => {
                return items.push({
                    name: i.name,
                    details: i.price ? `${currency_symbol} ${numberWithCommas(i.price)}  x  ${i.quantity} person(s)` : "Check Ticket Master for Price",
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

        if (currency_symbol !== "$"){
            currency_conversion(currency_code, numberWithCommas(sum))
        }


        return (
            <div className="py-4 mb-4">
                {items.map((i) => {
                    return (
                        <div className="mb-2">
                            <strong>{i.name}</strong>
                            <div className="d-flex justify-content-between">
                                <p className="text-muted"><em>{i.details}</em></p>
                                <p>{currency_symbol} {numberWithCommas(i.total)}</p>
                            </div>
                        </div>
                    )
                })}

                <hr/>
                <div className="d-flex justify-content-between">
                    <strong>Subtotal</strong>
                    <p>{currency_symbol} {numberWithCommas(sum)}</p>
                </div>

                    {currency_symbol !== "$" ? 
                        <div className="float-right">
                            <p><em>In USD this is equal to $ {numberWithCommas(parseFloat(totalCostInUSD))}</em></p>
                        </div>
                        :
                        null
                    }
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

        // Sort the itinerary before add all items
        itinerary.sort(function(a,b) {
            return new Date(a.date) - new Date(b.date);
        });

        // For item in trip itinerary, sort them by date, then add them to the items list
        if (itinerary) {
            itinerary.map((i) => {
                return items.push({
                    title: i.name,
                    subtexts: [i.price],
                    link: i.url,
                    place: [],
                    time: i.time ? new Date(i.date + ' ' + i.time).toUTCString() : new Date(i.date).toUTCString(),
                    item_classes: "b-danger",
                    dat_line_classes: ""
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

                        <div className="tl-date text-muted mt-1">
                            {item.link ? 
                            <a href={item.link}>Ticket Master</a>
                            : null }
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
        <div className="col-sm-12 mb-4" key={`dash-${trip.id}`}>
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
                                <button type="button" className="btn btn-secondary w-25 ml-2" data-toggle="modal" data-target={`#review-${trip.id}`}><small>Write a Review</small></button>
                            </div>
                            

                        </div>
                    </div>


                    {/* Collapse to show Itinerary */}
                    <div className="row collapse" id={`collapseExample-${trip.id}`}>
                        <div className="col-sm-12 col-lg-6 py-4">
                            <h3>Itinerary</h3>
                            {loading ? 
                                <p>Loading ...</p>
                            :
                                <>

                                    {trip.hotel || trip.itinerary ? <>{formatIntineray()}</> : <p>No hotel or event found. Add to this trip in search tab.</p>}
                                </>
                            }

                        </div>

                        <div className="col-sm-12 col-lg-6 py-4">
                            <h3>Total Costs</h3>
                            {loading ? 
                                <p>Loading ...</p>
                            :
                                <>
                                    {trip.hotel || trip.itinerary ? <>{formatCosts()}</> : <p>No hotel or event found. Add to this trip to see the costs calculated.</p>}
                                </>
                            }
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

        {/* <!-- Review Modal --> */}
        <div className="modal fade" id={`review-${trip.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Write a Review</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <h5>How was your <strong>{trip.id}</strong> trip?</h5>

                        <form>
                            <div className="form-group my-4">
                                <label htmlFor="rating"><small>How would you rate this trip?</small></label>
                                <select className="custom-select" onChange={(e) => {setRating(e.target.value)}}>
                                    <option value="1">1 star</option>
                                    <option value="2">2 stars</option>
                                    <option value="3">3 stars</option>
                                    <option value="4">4 stars</option>
                                    <option value="5" defaultValue>5 stars</option>
                                </select>
                            </div>

                            <div className="form-group mt-5">
                                <label htmlFor="textarea"><small>What's the reason for this rating?</small></label>
                                <textarea className="form-control rounded-1" id="textarea" rows="3" ref={reviewText} required></textarea>
                            </div>
                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={submitReview}>Submit</button>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default DashboardTrip;