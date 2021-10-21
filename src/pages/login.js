import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthUserContext";
import { useHistory } from "react-router";
import * as ROUTES from '../constants/routes';
import "../styles/login.css";
import logo from "../photos/logos/logo-black.png";


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
        <div className="login">
            <div className="w-sm-25 w-mg-50 text-center">
                <img src={logo} alt="logo" className="mx-auto w-50" />

                <div className="card-body">
                    <h3>Log into EZ Plan</h3>

                    <form onSubmit={handleSubmit} className="my-3">
                        <div className="form-group">
                            <input id="email" type="email" className="form-control" required ref={emailRef} placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <input id="password" type="password" className="form-control" required ref={passwordRef} placeholder="Password" />
                        </div>
                    
                        {error ? <p className="text-danger">{error}</p> : null}
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary btn-block text-center" disabled={loading}>Login</button>
                        </div>
                    </form>

                    <p>Need an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
                    <p><Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link></p>
                </div>
            </div>            
        </div>
    )
}

export default Login;