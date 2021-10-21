import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
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
            <div className="container my-5">
                <h1 className="mb-5">WELCOME TO EZ PLAN</h1>
                <p>We want you to conveniently plan your next adventure. With EZ Plan, you're able to share share your tour plans, access special deals, and benefit from our partner base.</p>
                <p>Our mission is to provide you with a free service that allows you to plan your next affordable dream vacation.</p>
                <Link to={ROUTES.SIGN_UP}>
                    <button className="btn border-white text-white">Explore</button>
                </Link>
            </div>
        </section>


        <section className="my-5" style={{padding: "5vh"}}>
            <div className="container">
                <h2 className="mb-5">HOW IT WORKS</h2>

                <div className="row  mx-auto">
                    <div className="col-md-4 h-100 steps">
                        <h3 className="btn btn-lg btn-primary">1</h3>
                        <h3>Search and explore things to do</h3>
                    </div>
                    <div className="col-md-4 h-100 steps">
                        <h3 className="btn btn-lg btn-primary">2</h3>
                        <h3>Create your personalized itinerary</h3>
                    </div>
                    <div className="col-md-4 h-100 steps">
                        <h3 className="btn btn-lg btn-primary">3</h3>
                        <h3>Go on your adventure!</h3>
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