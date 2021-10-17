import React, { useState, useEffect } from 'react';

const Search = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [hotel, sethotel] = useState([]);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });

    
    fetch("/hotels").then(function(response) {
        if (response.ok) {
            console.log(response);
            return response.json();
        } else {
            throw response;
        }
        // return response.json();
      }).then(function(data) {
        console.log(data);
        console.log("got data");
        // sethotel(data.testing);
      });
  }, []);

  return (
    <div className="App">
        <p>The current time is {currentTime}.</p>
        {/* <p>{hotel}</p> */}
    </div>
  );
}

export default Search;