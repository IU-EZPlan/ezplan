import React from "react";
import "../styles/home.css";
            

const Home = () => {
    return (
        <>
        <div className="home-hero">
            <div className="container">
                <h1>EXPLORE THE WORLD</h1>
                <p>Grab the helm and go on an adventure.</p>
                <button className="btn border-white text-white">Start Here</button>
            </div>
        </div>

        
        <section className="row">
            <div className="col-sm-6 col-md-3 explore-highlight" style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://cdn.tourradar.com/s3/content-pages/499/436x336/9CSXn4.jpeg')"}}>
                <div className="card explore-highlight-card w-75 h-75">
                    <div className="card-body">
                        <h4 className="card-title">Asia</h4>
                        <p>Shop at lavish malls is Dubai, go surfing in Bali, or take on Mt. Everest!</p>
                    </div>
                    <div className="card-footer border-top border-2">Trip Details</div>
                </div>
            </div>

            <div className="col-sm-6 col-md-3 explore-highlight" style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://cdn.businesstraveller.com/wp-content/uploads/2018/02/iStock-540229848.jpg')"}}>
                <div className="card explore-highlight-card w-75 h-75">
                    <div className="card-body">
                        <h4 className="card-title">Sydney</h4>
                        <p>Go on the famous Sydney Opera House Tour.</p>
                    </div>
                    <div className="card-footer border-top border-2">Trip Details</div>
                </div>
            </div>

            <div className="col-sm-6 col-md-3 explore-highlight" style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://www.pedc.ir/Portals/0/news/Rio3-1-980x699.jpg?ver=UEpkIPlmG7hNthqGNqk2RA%3D%3D')"}}>
                <div className="card explore-highlight-card w-75 h-75">
                    <div className="card-body">
                        <h4 className="card-title">Brazil</h4>
                        <p>Visit the capital and see one of the most famous locations in the world.</p>
                    </div>
                    <div className="card-footer border-top border-2">Trip Details</div>
                </div>
            </div>

            <div className="col-sm-6 col-md-3 explore-highlight" style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://www.pandotrip.com/wp-content/uploads/2018/03/The-Great-Sphinx-Egypt.jpg')"}}>
                <div className="card explore-highlight-card w-75 h-75">
                    <div className="card-body">
                        <h4 className="card-title">Egypt</h4>
                        <p>Visit the Pyramids of Giza, cruise the Nile River, and explore historic Cario</p>
                    </div>
                    <div className="card-footer border-top border-2">Trip Details</div>
                </div>
            </div>
        </section>


        <section className="landing-content">
            <div  className="row" style={{backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,0.4)), url("https://expertphotography.b-cdn.net/wp-content/uploads/2018/12/IMG_5420-1-1024x683.jpg")`, height: "90vh", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="col-sm-6 p-3">
                    <h2 className="w-50">GET UP CLOSE AND PERSONAL WITH BIG BEN</h2>

                    <div className="card my-3" style={{maxWidth: "18rem", backgroundColor: "rgba(0,0,0,.7)"}}>
                        <div className="card-header bg-transparent border border-4">Explore London</div>
                        <div className="card-body border border-4">
                            <h5 className="card-title">Success card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div className="card-footer bg-transparent border border-4">Trip Details</div>
                    </div>


                </div>
                <div className="col-sm-6 p-3">
                    <div>
                    </div>
                </div>
            </div>
        </section>

        <section className="landing-content landing-content-footer">
            <div className="container">
                <h2>PLAN YOUR ADVENTURE NOW</h2>
                <p>Sign up now to start personalizing a tour just right for you.</p>
            </div>
        </section>
        </>
    )
}

export default Home;