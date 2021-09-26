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
        <div className="container">
            <div class="card my-5">
                <div class="card-body">
                    <h1>Forogt Password</h1>

                    <form className="my-3" onSubmit={handleSubmit}>

                        {/* This row is for email */}
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="form-control" required ref={emailRef}/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>

                        {error ? (
                            <p className="red-text">{error}</p>
                        ):null}

                        {message ? (
                            <p className="red-text">{message}</p>
                        ):null}

                        <button type="submit" className="btn btn-primary" disabled={loading}>Reset login</button>
                    </form>
                    
                    <div>Ready to <Link to={ROUTES.LOGIN}>Login</Link></div>

                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;