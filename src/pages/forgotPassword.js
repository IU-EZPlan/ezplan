import React, {useRef, useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthUserContext";
import * as ROUTES from '../constants/routes';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");



    // on sibmit functional 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setMessage("")
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Request Successful. Check email for further instructions.")
        } catch {
            return setError("Failed to reset password.");
        }
        setLoading(false);
    }


    return (
        <div className="container d-flex justify-content-center">
            <div class="card my-5 w-75">
                <div class="card-body">
                    <h3 className="text-center">Forogt Password</h3>

                    <form className="my-3" onSubmit={handleSubmit}>

                        {/* This row is for email */}
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="form-control" required ref={emailRef}/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>


                        {error ? <p className="text-danger">{error}</p> : null}
                        {message ? <p className="text-danger">{message}</p> : null}

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary m-3" disabled={loading}>Reset Password</button>

                            <div>Return to <Link to={ROUTES.LOGIN}>Login</Link></div>
                        </div>
                    </form>
                    

                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;