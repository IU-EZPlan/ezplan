import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthUserContext";
import { useHistory } from "react-router";
import * as ROUTES from '../constants/routes';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    // on sibmit functional 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push(ROUTES.ACCOUNT);
        } catch {
            return setError("Failed to sign in.");
        }
        setLoading(false);
    }


    return (
        <div className="container d-flex justify-content-center">
            <div className="card my-5 w-75">
                <div className="card-body">

                    <h3 className="text-center">Log into EZ Plan</h3>

                    <form onSubmit={handleSubmit} className="my-3">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input id="email" type="email" className="form-control" required ref={emailRef} placeholder="Email" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input id="password" type="password" className="form-control" required ref={passwordRef} placeholder="Password" />
                        </div>
                    
                        {error ? <p className="text-danger">{error}</p> : null}
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary d-flex" disabled={loading}>Login</button>
                        </div>
                    </form>
                </div>

                <div className="ml-3 text-center">
                    <p>Need an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
                    <p><Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link></p>
                </div>
            </div>            
        </div>
    )
}

export default Login;