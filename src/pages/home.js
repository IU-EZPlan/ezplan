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