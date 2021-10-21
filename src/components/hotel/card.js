import React from "react"

const HotelCard = ({name, address, imgURL}) => {
    return (
        <div className="card h-100">
            <img className="card-img-top" src={imgURL} alt="main_photo" />
            <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <p>{address}</p>
            </div>
            <div className="card-footer border-top border-2">Trip Details</div>
        </div>
    )
}

export default HotelCard;