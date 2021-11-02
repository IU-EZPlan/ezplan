import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import "../styles/home.css";
            

const Home = () => {
    return (
        <>
        <div className="home-hero">
            <div className="container">
                <h1>EXPLORE THE WORLD</h1>
                <p>Grab the helm and go on an adventure.</p>
                <Link to={ROUTES.SIGN_UP}>
                    <button className="btn border-white text-white">Start Here</button>
                </Link>
            </div>
        </div>

        
        <section className="row">
            <div className="col-sm-6 col-md-3 explore-highlight" style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://cdn.tourradar.com/s3/content-pages/499/436x336/9CSXn4.jpeg')"}}>
                <div className="card explore-highlight-card w-75 h-75">
                    <div className="card-body">
                        <h4 className="card-title">Asia</h4>
                        <p>Shop at lavish malls is Dubai, go surfing in Bali, or take on Mt. Everest!</p>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 col-md-3 explore-highlight" style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://cdn.businesstraveller.com/wp-content/uploads/2018/02/iStock-540229848.jpg')"}}>
                <div className="card explore-highlight-card w-75 h-75">
                    <div className="card-body">
                        <h4 className="card-title">Sydney</h4>
                        <p>Go on the famous Sydney Opera House Tour.</p>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 col-md-3 explore-highlight" style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://www.pedc.ir/Portals/0/news/Rio3-1-980x699.jpg?ver=UEpkIPlmG7hNthqGNqk2RA%3D%3D')"}}>
                <div className="card explore-highlight-card w-75 h-75">
                    <div className="card-body">
                        <h4 className="card-title">Brazil</h4>
                        <p>Visit the capital and see one of the most famous locations in the world.</p>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 col-md-3 explore-highlight" style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://www.pandotrip.com/wp-content/uploads/2018/03/The-Great-Sphinx-Egypt.jpg')"}}>
                <div className="card explore-highlight-card w-75 h-75">
                    <div className="card-body">
                        <h4 className="card-title">Egypt</h4>
                        <p>Visit the Pyramids of Giza, cruise the Nile River, and explore historic Cario</p>
                    </div>
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
                            <h5 className="card-title">London, England, UK</h5>
                            <p className="card-text">London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations. Across the Thames River, the London Eye observation wheel provides panoramic views of the South Bank cultural complex, and the entire city.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="landing-content">
            <div  className="row" style={{backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,0.4)), url("http://www.cartogramme.com/wp-content/uploads/2017/11/Kualoa-Ranch2-970x710.jpg")`, height: "90vh", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="col-sm-6 p-3">
                    <h2 className="w-50">SEE THE FILMING SITES FOR OVER 200 HOLLYWOOD MOVIES AND TV SHOWS</h2>

                    <div className="card my-3" style={{maxWidth: "18rem", backgroundColor: "rgba(0,0,0,.7)"}}>
                        <div className="card-header bg-transparent border border-4">Explore Oahu</div>
                        <div className="card-body border border-4">
                            <h5 className="card-title">Kualoa Ranch, Oahu, Hawai'i, USA</h5>
                            <p className="card-text">4,000-acre nature retreat offering ATVs, a zip-line, beaches & tours of Hollywood film locations, including the famous bone-yard featured in the blockbuster film, Jurassic Park.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="landing-content">
            <div  className="row" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.2)), url("https://media.gadventures.com/media-server/cache/f8/9d/f89d295583a1d4c0f5f6e6183a7446bb.jpg")`, height: "90vh", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="col-sm-6 p-3">
                    <h2 className="w-50">BASK IN THE GLORY OF THE SERENGETI</h2>

                    <div className="card my-3" style={{maxWidth: "18rem", backgroundColor: "rgba(0,0,0,.7)"}}>
                        <div className="card-header bg-transparent border border-4">Explore The Serengeti</div>
                        <div className="card-body border border-4">
                            <h5 className="card-title">Serengeti National Park, Tanzania, Africa</h5>
                            <p className="card-text">The Serengeti ecosystem is a geographical region in Africa, spanning northern Tanzania. The protected area within the region includes approximately 30,000 km² of land, including the Serengeti National Park and several game reserves.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="landing-content landing-content-footer">
            <div className="container">
                <h2>PLAN YOUR ADVENTURE NOW</h2>
                <p>What are you waiting for?</p>
                <p>Sign up now to start personalizing a tour just right for you.</p>
                <Link to={ROUTES.SIGN_UP}>
                    <button className="btn border-white text-white">Sign Up</button>
                </Link>
            </div>
        </section>
        </>
    )
}

export default Home;