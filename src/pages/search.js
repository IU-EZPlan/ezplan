import React, { useState } from 'react';
import HotelCard from '../components/hotel/card';
import * as API_ROUTES from "../constants/api-routes"
import PromptScreen from "../components/screenPrompt";
import "../styles/search.css";

const Search = () => {
  const [results, setResults] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Advances Search Variables
  const [adultTravelers, setAdultTravelers] = useState(2);
  const [childTravelers, setChildTravelers] = useState(0);
  const [rooms, setRooms] = useState(1);


  const handleSubmit = (e) => {
      e.preventDefault();
      setIsSearched(false);

    //   endpoint uses routes and search string. String is required by hotels api    
      fetch(API_ROUTES.HOTELS + `?location=${searchString}`)
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
    <div className="container-fluid search">
        <form onSubmit={handleSubmit}>
            <div className="row container-fluid">
                <div className="col-12 d-flex">
                    <input type="Search" className="form-control rounded border" placeholder="Search for hotels in..." value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                    <button className="btn btn-outline-success ml-2" type="submit">Search</button>
                    <button className="btn btn-primary ml-4" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">

                        <i className="fa fa-filter"></i>
                    </button>
                </div>
            </div>


            <div className="row collapse container-fluid" id="collapseExample">
                <div className="col-md-4 mt-3">
                    <h3>Travelers</h3>

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

                <div className="col-md-4 mt-3">
                    <h3>Dates</h3>

                    <div className="input-row">
                        <p>Need to add in date picker here for check in and check out dates</p>
                    </div>
                </div>
    
    
    
            <hr />

            </div>
        </form>

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
            error ? 
            <PromptScreen heading="Something went wrong..." type="error" subtext="Trying searching again, or constact support" />
            :
                loading ?
                <PromptScreen heading="Loading Results" type="loading" subtext="Your search results will appear shortly" />
                :
                <PromptScreen heading="Search" type="waiting" subtext="Get hotel results by searching a location. Use filters for an advanced search." />
        }

    </div>
  );
}

export default Search;