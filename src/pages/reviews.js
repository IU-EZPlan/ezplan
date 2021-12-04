import React, { useState, useEffect } from "react";
import { database } from '../firebase';


const Reviews = () => {
    const [reviewItems, setReviewItems] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        database.collection("reviews").onSnapshot((snap) => {
            var list_of_reviews = [];

                snap.forEach((doc) => {
                    // console.log(doc.data(), doc.id);
                    list_of_reviews.push({id: doc.id, ...doc.data()});
                });

                setReviewItems(list_of_reviews);
                setLoading(false);
        });
    });

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getRatingColor = (rating) => {
        if (rating === 5) {
            return "success"
        } else if (rating === 4) {
            return "primary"
        } else if (rating <= 2) {
            return "danger"
        }

        return "secondary"
    }

    return (
        <div className="container-fluid my-5">
            <h1>Reviews</h1>

            {loading ?
                <p>Loading...</p>
            :
            
            <div className="row mt-5">
                {reviewItems.map((r) => {
                    return (
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card" style={{width: "18rem"}}>
                                <img className="card-img-top" src={r.imageURL} alt="card-cap"/>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h3 className="card-title">{capitalizeFirstLetter(r.location)}</h3>
                                        <h4><span className={`badge badge-${getRatingColor(r.rating)}`}>{r.rating} Stars</span></h4>
                                    </div>
                                    <p className="card-text">{r.comments}</p>
                                    <p className="card-text"><small><span className="text-muted">Review submitted by</span> {r.username}</small></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
            }

        </div>
    )
}

export default Reviews;