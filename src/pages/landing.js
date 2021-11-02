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


        <section className="landing-content" style={{padding: "5vh"}}>
            <div className="container my-5">
                <h2 className="mb-5">HOW IT WORKS</h2>

                <div className="row my-5">
                    <div className="col-sm-12">
                        <h3 className="btn btn-lg btn-primary">1</h3>
                        <h3>Create a New Trip</h3>
                        <p>Sign up and create a new trip in your dashboard.</p>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col-sm-12">
                        <h3 className="btn btn-lg btn-primary">2</h3>
                        <h3>Search and Explore for Hotels and Events</h3>
                        <p>We search for hotels using the location you define. Then, once you add a hotel to your itinerary, we find events closest to where you'll stay.</p>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col-sm-12">
                        <h3 className="btn btn-lg btn-primary">3</h3>
                        <h3>Create your personalized itinerary</h3>
                        <p>With one click, add as many events as you want and we'll handle the rest!</p>
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