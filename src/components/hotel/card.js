import React, { useState } from "react";

import { useAuth } from "../../context/AuthUserContext";
import { database } from '../../firebase';

const HotelCard = ({tripName, hotel_data, name, trans_name, address, imgURL, latloc, lonloc, price, currency_code, review_score, review_word, amenity, website, city, zip, can_cancel}) => {
    const [added, setAdded] = useState(false);

    const imageStyle = {
        backgroundImage: `url(${imgURL})`,
        minHeight: "25vh",
        backgroundSize: "cover",
        backgroundPosition: "center"
    }

    const getReviewClass = () => {
        if (review_word === "Superb" || review_word === "Very good" || review_word === "Fabulous") {
            return "text-success"
        } else if (review_word !== "Good" && review_word !== "Pleasent") {
            return "text-danger"
        } else {
            return ""
        }
    }

    const { currentUser } = useAuth();
    const addHotelToTrip = async () => {
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        await database.collection('users').doc(currentUser.uid).collection('trips').doc(tripName).update({
            'hotel': {...hotel_data}
        });
        
        setAdded(true);
        await delay(3000);
        setAdded(false);
    }   

    return (
        <div className="card h-100">
            <div className="card-img-top" style={imageStyle}>
                <p className="btn btn-primary p-1">$ {Math.round(price)} {currency_code}</p>
            </div>
            {/* <img className="card-img-top" src={imgURL} alt="main_photo" style={{maxHeight: "25vh"}}/> */}

            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p>{address} <br/> {city}, {zip}</p>
                <p className={getReviewClass()}>{review_score ? `${review_score}/10: ` : ""} {review_word}</p>
                <p className="text-muted">{amenity} <br/>
                {can_cancel ? "Free Canellation": null}</p>

            </div>
            <div className="card-footer border-top border-0 bg-transparent">
                <p><a href={website} target="_blank" rel="noreferrer">Visit website</a></p>
                <button className={`btn btn-block btn-${added ? "success": "primary"}`} onClick={addHotelToTrip}>{added ? "Added!": "Add to Trip"}</button>
            </div>
        </div>
    )
}

export default HotelCard;