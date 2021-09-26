import React, {useRef, useState} from "react";
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


    // TODO: need to add functionality to check that a password is strong enough
    // currently the passwird must be at least 6 characters long to meet firebase standards

    // on sibmit functional 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push(ROUTES.DASHBOARD)
        } catch {
            return setError("Failed to sign in.");
        }
        setLoading(false);
    }


    return (
        <div className="container">
            <h1>Login Page</h1>
  
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>

                    {/* This row is for email */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" required ref={emailRef}/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>

                    {/* This row is for password */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" required ref={passwordRef}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>

                    {error ? (
                        <p className="red-text">{error}</p>
                    ):null}

                    <button type="submit" disabled={loading}>Login</button>
                </form>
            </div>
            
            <div>Need an account? Sign in</div>
        </div>
    )
}

export default Login;