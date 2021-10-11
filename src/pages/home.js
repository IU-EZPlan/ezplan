import React from "react";
import "../styles/home.css";


            


// <p>Things we need to add:</p>
// <ul>
// <li>Search</li>
// <li>Options to explore</li>
// <li>Cards for users to explore and book quickly</li>
// </ul> 
            

const Home = () => {
    return (
        <div className="container-fluid mt-3">
            <form>
                {/* Search Bar and Button Row */}
                <div className="row container-fluid">
                    <div className="col-12 d-flex">
                        <input type="Search" className="form-control rounded" placeholder="Search" />

                        <button className="btn btn-primary ml-4" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">

                            <i className="fa fa-filter"></i>
                        </button>
                    </div>
                </div>

                {/* Filter Reveal container */}
                <div className="row container-fluid">
                    <div className="collapse col-12 mt-3" id="collapseExample">
                        <h3>Dates</h3>
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label class="form-check-label" for="flexCheckChecked">
                            Currently Available
                        </label>
                        </div>

                        {/* <div className="card card-body">
                            <h3>Be able to Filter their search here</h3>
                        </div> */}

                        <hr />
                    </div>
                </div>
            </form>

            <section className="my-5">
                <h3 className="container-fluid mb-2">Recommended</h3>
                <div className="row container-fluid">


                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="card trip mb-3">
                            <img src="https://ipt.imgix.net/201349/x/0/1.jpg?ar=1.91%3A1&w=1200&fit=crop" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Sunset Boat Ride</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="card rounded mb-3">
                            <img src="https://ipt.imgix.net/201349/x/0/1.jpg?ar=1.91%3A1&w=1200&fit=crop" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Sunset Boat Ride</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="card mb-3">
                            <img src="https://ipt.imgix.net/201349/x/0/1.jpg?ar=1.91%3A1&w=1200&fit=crop" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Sunset Boat Ride</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="card mb-3">
                            <img src="https://ipt.imgix.net/201349/x/0/1.jpg?ar=1.91%3A1&w=1200&fit=crop" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Sunset Boat Ride</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>





                </div>
            </section>
        </div>
    )
}

export default Home;