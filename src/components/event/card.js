import React, { useState } from "react";


import { useAuth } from "../../context/AuthUserContext";
import { database } from '../../firebase';

const EventCard = ({event, tripName}) => {
    const [added, setAdded] = useState(false);
    const imageStyle = {
        backgroundImage: `url(${event.image})`,
        minHeight: "25vh",
        backgroundSize: "cover",
        backgroundPosition: "center"
    }

    const { currentUser } = useAuth();
    const addEventToItinerary = async () => {
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        console.log(event);

        await database.collection('users').doc(currentUser.uid).collection('trips').doc(tripName).update({
            // 'itinerary': FieldValue.arrayUnion(event)
            
        });
        
        setAdded(true);
        await delay(3000);
        setAdded(false);
    }  

    return (
        <div className="card h-100">
            <div className="card-img-top" style={imageStyle}>
                {/* <p className="btn btn-primary p-1">$ {Math.round(price)} {currency_code}</p> */}
            </div>

            <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="text-muted">{new Date(event.date + " " + event.time).toUTCString()}</p>
                <p>{event.info}</p>
            </div>
            <div className="card-footer border-top border-0 bg-transparent">
                <p><a href={event.url} target="_blank" rel="noreferrer">Visit website</a></p>
                <button className={`btn btn-block btn-${added ? "success": "primary"}`} onClick={addEventToItinerary}>{added ? "Added!": "Add to Trip"}</button>
            </div>
        </div>
    )
}

export default EventCard;