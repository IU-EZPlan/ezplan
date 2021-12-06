import React, { useState, useEffect } from 'react';

import HotelCard from '../components/hotel/card';
import EventCard from '../components/event/card';
import * as API_ROUTES from "../constants/api-routes"
import PromptScreen from "../components/screenPrompt";

import { useAuth } from "../context/AuthUserContext";
import { database } from '../firebase';
import "../styles/search.css";



const Search = () => {
    const { currentUser } = useAuth();
    const [isSearched, setIsSearched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [tripData, setTripData] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState("");

    const [currentTrip, setCurrentTrip] = useState("");
    const [searchString, setSearchString] = useState("");
    const [adults, setAdultNumber] = useState(1);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [checkin, setCheckIn] = useState("");
    const [checkout, setCheckOut] = useState("");


    useEffect(() => {
        database.collection('users').doc(currentUser.uid)
          .collection('trips').onSnapshot((snap) => {
              var list_of_trips = [];

              snap.forEach((doc) => {
                // console.log(doc.id)
                list_of_trips.push({"id": doc.id, ...doc.data()})
              });

              setTripData(list_of_trips);
              setLoading(false);
          });

    }, [currentUser.uid])


    const handleTripChange = async (trip) => {
        // console.log(trip);
        if (trip === "Choose...") { setSearchString(""); return; }
        setCurrentTrip(trip);

        const tripDetails = await (await database.collection('users').doc(currentUser.uid).collection('trips').doc(trip).get()).data()
        // console.log(tripDetails)

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
        setSearchType("hotel");
        setLoading(true);

        if (searchString === "") { return; }
    
        // endpoint uses routes and search string. String is required by hotels api    
        fetch(API_ROUTES.HOTELS + `?location=${searchString}&&adults=${adults}&&checkIN=${checkin}&&checkOUT=${checkout}&&rooms=${rooms}&&children=${children}`)
          .then((response) => {
            if (response.ok) { 
                return response.json();
              } else { 
                throw response; 
              }
      
          }).then((data) => {
            //   console.log(data);
            //   console.log(data.result);
            setSearchResults(data.result);
            setIsSearched(true);
            setLoading(true);
    
          }).catch((error) => {
              setError(error.message);
    
          }).finally(() => {
              setLoading(false);
          });
    }


  const searchForEvents = async (e) => {
    e.preventDefault();
    setIsSearched(false);
    setSearchType("event");
    setLoading(true);

    var latString = "";    
    const tripSnap = await (await database.collection('users').doc(currentUser.uid).collection('trips').doc(currentTrip).get()).data();


    if (tripSnap.hotel) {
        latString = tripSnap.hotel.latitude + "," + tripSnap.hotel.longitude;
        // lat,lon : String
    }

    fetch(API_ROUTES.EVENTS + `?location=${latString}&&children=${children > 0 ? "yes" : "no"}&&checkIN=${checkin}&&checkOUT=${checkout}`)
      .then((response) => {
        if (response.ok) { 
            return response.json();
          } else { 
            throw response; 
          }
  
      }).then((data) => {
        // console.log(data.result);

        setSearchResults(data.result);
        setIsSearched(true);
        setLoading(true);

      }).catch((error) => {
          setError(error.message);

      }).finally(() => {
          setLoading(false);
      });
  }
  

  const getTripOptions = () => {
      const options = tripData.map((t, index) => {
          if (t.status === "pending") {
            return <option key={index} value={t.id}>{t.id}</option>
          } else {
            return null;
          }
      }).filter(t => t !== null);


      if (options.length === 0) {
        return (<option>No Trip Options</option>)
      } else {
          return options
      }
  }

  const formatSearchResults = () => {
    if (searchResults && searchResults.length > 0) {
        if (searchType === "hotel") {
            return searchResults.map((h) => {
                return <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={h.hotel_id}>
                    <HotelCard 
                        tripName={currentTrip}
                        hotel_data={h}
                        name={h.hotel_name}
                        trans_name={h.hotel_name_trans}
                        address={h.address}
                        imgURL={h.max_photo_url}
                        latloc={h.latitude}
                        lonloc={h.longitude}
                        price={h.min_total_price}
                        currency_code={h.currency_code}
                        review_score={h.review_score}
                        review_word={h.review_score_word}
                        amenity={h.ribbon_text}
                        website={h.url}
                        city={h.city}
                        zip={h.zip}
                        can_cancel={h.is_free_cancellable}
                    />
                </div>
            })


        } else {
            // console.log(searchResults);

            return searchResults.map((e) => {
                // console.log(e)
                return <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <EventCard 
                        tripName={currentTrip}
                        event={e}
                    />
                </div>
            })
        }

    } else if (searchResults && searchResults.length === 0 && isSearched) {
        return <PromptScreen heading="No Results" type="waiting" subtext="There are no event results near this hotel during your dates."/>
    } else if (loading) {
        return <PromptScreen heading="Loading Results" type="loading" subtext="Your search results will appear shortly"/>
    } else if (error) {
        return <PromptScreen heading="Something went wrong..." type="error" subtext="Trying searching again, or constact support" />
    } else {
        return <PromptScreen heading="Search" type="waiting" subtext="Get hotel or event results by selecting one of your trips and clicking the button." />
    }
  }

  return (
    <div className="container-fluid search">
        <div className="row">
            <form className="col-sm-12 d-flex mb-3">

                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Your Trips</label>
                    </div>

                    <select className="custom-select" id="inputGroupSelect01" onChange={(e) => handleTripChange(e.target.value)}>
                        <option defaultValue>Choose...</option>
                        {loading ?
                            <option>Loading...</option>
                        :
                            <>{getTripOptions()}</>
                        }
                    </select>
                </div>

                <button className="btn btn-block btn-primary mt-0 ml-3 w-50" type="button" onClick={searchForHotels}>Search for Hotels</button>
                <button className="btn btn-block btn-primary mt-0 ml-3 w-50" type="button" onClick={searchForEvents}>Search for Events</button>
            </form>
        </div>

        <div className="row">
            <div className="col-sm-12" style={{backgroundColor: "#fafbfa"}}>

                {isSearched ? 
                    <div className="alert alert-warning alert-dismissible fade show mb-4" role="alert">
                        Showing <strong>{searchType}</strong> results for <strong>{searchString}</strong>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                : null }

                <div className="row my-3">
                    {formatSearchResults()}
                </div>
            </div>
        </div>
        
    </div>
  );
}

export default Search;