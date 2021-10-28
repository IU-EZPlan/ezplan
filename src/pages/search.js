import React, { useEffect, useState } from 'react';
import HotelCard from '../components/hotel/card';
import * as API_ROUTES from "../constants/api-routes"
import PromptScreen from "../components/screenPrompt";


import { useAuth } from "../context/AuthUserContext";
import { database } from '../firebase';
import "../styles/search.css";

const Search = () => {
  const [results, setResults] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [trips, setTrips] = useState([]);

  const { currentUser } = useAuth();



  useEffect(async () => {
    const list_of_trips = await database.collection('users').doc(currentUser.uid)
        .collection('trips').onSnapshot((snap) => {
            return snap.forEach((doc) => {
                return doc.id
            })
        });

    setTrips(list_of_trips)

  }, [])



  const handleSubmit = (e) => {
      e.preventDefault();
      setIsSearched(false);

    //   endpoint uses routes and search string. String is required by hotels api    
      fetch(API_ROUTES.HOTELS + `?location=${searchString}&&adults=2&&checkIN=2021-10-15&&checkOUT=2021-10-20&&rooms=1children=0`)
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



  return (
    <div className="container-fluid search">
        <div className="row">
            <div className="col-sm-3 sidebar">
                <form onSubmit={handleSubmit}>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Your Trips</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01" onChange={(e) => setSearchString(e.target.value)}>
                            <option selected>Choose...</option>
                            <option value="ohio">One</option>
                            <option value="bloomington">Two</option>
                            <option value="michigan">Three</option>
                        </select>
                    </div>

                    <button className="btn btn-block btn-primary mt-3" type="submit">Search</button>
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