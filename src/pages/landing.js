import React from "react";
import '../styles/landing.css'


const Landing = () => {
    return (
        <>
        <div className="landing-hero">
            <div className="container">
                <h1>ADVENTURE AWAITS</h1>
            </div>
        </div>



        <section className="landing-content">
            <div  className="row" style={{backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,0.4)), url("https://expertphotography.b-cdn.net/wp-content/uploads/2018/12/IMG_5420-1-1024x683.jpg")`, height: "90vh", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="col-sm-6 p-3">
                    <h2 className="w-50">GET UP CLOSE AND PERSONAL WITH BIG BEN</h2>

                    <div class="card my-3" style={{maxWidth: "18rem", backgroundColor: "rgba(0,0,0,.7)"}}>
                        <div class="card-header bg-transparent border border-4">Explore London</div>
                        <div class="card-body border border-4">
                            <h5 class="card-title">Success card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div class="card-footer bg-transparent border border-4">Trip Details</div>
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
                <h2>DREAM BIGGER</h2>
                <p>EZ Plan is available to curate your next adventure in locales close to home and around the world. Your dates. Your fun. On your time.</p>
                <p>For more information or to book your private adventure, sign up now! It's completely free.</p>
            </div>
        </section>

        </>
    )
}

export default Landing;