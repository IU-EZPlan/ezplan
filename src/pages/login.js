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
        <div className="container">
            <div class="card my-5">
                <div class="card-body">
                    <h1>Login Page</h1>

                    <form onSubmit={handleSubmit} className="my-3">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input id="email" type="email" className="form-control" required ref={emailRef} placeholder="Enter email" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input id="password" type="password" className="form-control" required ref={passwordRef} placeholder="Password" />
                        </div>
                    
                        {error ? <p>{error}</p> : null}
                        <button type="submit" className="btn btn-primary" disabled={loading}>Login</button>
                    </form>
                </div>

                <div className="ml-3">
                    <p>Need an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
                    <p><Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link></p>
                </div>
            </div>            
        </div>
    )
}

export default Login;