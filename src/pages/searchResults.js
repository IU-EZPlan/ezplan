import React, { useState, useEffect } from 'react';
import HotelCard from '../components/hotel/card';
import * as API_ROUTES from "../constants/api-routes"

const Search = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [hotel, sethotel] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault()

      // endpoint si currently getting hotel results in ohio    
      fetch(API_ROUTES.HOTELS + `?location=${searchString}`).then(function(response) {
          if (response.ok) { return response.json();} 
          else { throw response; }
    
        }).then(function(data) {
          // console.log(data.result);
          // console.log("got data");
          sethotel(data.result);
        });
  }

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });

    }, []);

  return (
    <div className="container-fluid">
        <form className="form-inline mb-4" onSubmit={handleSubmit}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>

        <div className="alert alert-warning alert-dismissible fade show mb-4" role="alert">
            Showing hotel results for <strong>{searchString}</strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        
        {/* <p>The current time is {currentTime}.</p> */}
        <div className="row">
        {hotel.map(h => (
            <div className="col-sm-6 col-md-4 col-xl-3 mb-3" key={h.hotel_id}>
                <HotelCard  
                    name={h.hotel_name} 
                    address={h.address} 
                    imgURL={h.max_photo_url}
                />
            </div>
        ))}
        </div>

    </div>
  );
}

export default Search;