import React, { useState } from 'react';
import { useAsync, IfPending, IfRejected, IfFulfilled } from 'react-async';

import HotelCard from '../components/hotel/card';
import * as API_ROUTES from "../constants/api-routes"
import PromptScreen from "../components/screenPrompt";

import { useAuth } from "../context/AuthUserContext";
import { database } from '../firebase';
import "../styles/search.css";


const getTrips = async ({id}) => {
    var list_of_trips = [];

    await database.collection('users').doc(id)
          .collection('trips').onSnapshot((snap) => {
              return snap.forEach((doc) => {
                // console.log(doc.id)
                list_of_trips.push({"id": doc.id, "data": doc.data()})

                return doc.data()
              })
          });

    // console.log(list_of_trips);
    return list_of_trips
}

const Search = () => {
    const { currentUser } = useAuth();

    const [isSearched, setIsSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [results, setResults] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [adults, setAdultNumber] = useState(1);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [checkin, setCheckIn] = useState("");
    const [checkout, setCheckOut] = useState("");

    // Fetch State used in the functions below
    const fetchState = useAsync(getTrips, {id: currentUser.uid} );


    const handleTripChange = async (trip) => {
        console.log(trip);

        const tripDetails = await (await database.collection('users').doc(currentUser.uid).collection('trips').doc(trip).get()).data()
        console.log(tripDetails)

        setSearchString(tripDetails.location);
        setAdultNumber(tripDetails.adults);
        setChildren(tripDetails.children);
        setRooms(tripDetails.rooms);
        setCheckIn(tripDetails.checkInDate);
        setCheckOut(tripDetails.checkOutDate);
    }

    const searchForHotels = (e) => {
        e.preventDefault();
        setIsSearched(false);
    
        // endpoint uses routes and search string. String is required by hotels api    
        fetch(API_ROUTES.HOTELS + `?location=${searchString}&&adults=${adults}&&checkIN=${checkin}&&checkOUT=${checkout}&&rooms=${rooms}&&children=${children}`)
          .then((response) => {
            if (response.ok) { 
                return response.json();
              } else { 
                throw response; 
              }
      
          }).then((data) => {
            setResults(data.result);
            setIsSearched(true);
            setLoading(true);
    
          }).catch((error) => {
              setError(error.message);
    
          }).finally(() => {
              setLoading(false);
          });
    }


  const handleSubmit = (e) => {
  }

  return (
    <div className="container-fluid search">
        <div className="row">
            <div className="col-sm-3 sidebar">
                <form onSubmit={handleSubmit}>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Your Trips</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={(e) => handleTripChange(e.target.value)}>
                            <option defaultValue>Choose...</option>

                            <IfPending state={fetchState}>
                                <option>Loading...</option>
                            </IfPending>

                            <IfRejected state={fetchState}>
                                <option>ERROR</option>
                            </IfRejected>

                            <IfFulfilled state={fetchState}>
                                {(data) => {
                                    // console.log("data", data); // This is printing just fine

                                    const options = data.map((t, index) => 
                                        <option key={index} value={t.id}>{t.id}</option>
                                    );

                                    console.log(options);
                                    return options
                                }}
                            </IfFulfilled>
                        </select>
                    </div>

                    <button className="btn btn-block btn-primary mt-3" type="submit">Search for Events</button>
                    <button className="btn btn-block btn-primary mt-3" type="buttom" onClick={searchForHotels}>Search for Hotels</button>
                </form>
            </div>


            <div className="col-sm-9" style={{backgroundColor: "#fafbfa"}}>

                {isSearched ? 
                    <div className="alert alert-warning alert-dismissible fade show mb-4" role="alert">
                        Showing hotel results for <strong>{searchString}</strong>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                : null }

                {results.length > 0 ? 
                    <div className="row">
                        {results.map(h => (
                            <div className="col-sm-6 col-md-4 col-xl-3 mb-3" key={h.hotel_id}>
                                <HotelCard  
                                    name={h.hotel_name} 
                                    address={h.address} 
                                    imgURL={h.max_photo_url}
                                    />
                            </div>
                        ))}
                    </div>
                : 
                    loading ?
                        <PromptScreen heading="Loading Results" type="loading" subtext="Your search results will appear shortly" />
                        :
                        error ? 
                        <PromptScreen heading="Something went wrong..." type="error" subtext="Trying searching again, or constact support" />
                            :
                            <PromptScreen heading="Search" type="waiting" subtext="Get hotel results by searching a location. Use filters for an advanced search." />
                }

            </div>
        </div>
        

    </div>
  );
}

export default Search;