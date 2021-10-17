import React, { useState, useEffect } from 'react';
import HotelCard from '../components/hotel/card';

const Search = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [hotel, sethotel] = useState([]);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });

    // endpoint si currently getting hotel results in ohio    
    fetch("/hotels?location=michigan").then(function(response) {
        if (response.ok) { return response.json();} 
        else { throw response; }

      }).then(function(data) {
        // console.log(data.result);
        // console.log("got data");
        sethotel(data.result);
      });
    }, []);

  return (
    <div className="App">
        <p>The current time is {currentTime}.</p>
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