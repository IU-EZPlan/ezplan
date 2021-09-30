import React, {useRef, useState} from "react";
import { useAuth } from "../context/AuthUserContext";
import { useHistory } from "react-router";
import * as ROUTES from '../constants/routes';
import { Link } from "react-router-dom";

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    // TODO: need to add functionality to check that a password is strong enough
    // currently the passwird must be at least 6 characters long to meet firebase standards
    function passwordReq(password) {
        if (password.length < 6) {
            setError("Password must beat least 6 characters long.");
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain a uppercase letter.");
            return false;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain a lowercase letter.");
            return false;
        }
        if (!/[!@#$%^&*)(+=._-]/.test(password) || !/[0-9]/.test(password)) {
            setError("Password must contain a special character and a number.");
            return false;
        }
        return true
    }

    // on sibmit functional 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // If the password and the confirm password do not math
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match.")
        }
        
        if(!passwordReq(passwordRef.current.value)){
            return
        }

        try {
            setError("");
            setLoading(true);
            console.log(emailRef.current.value, passwordConfirmRef.current.value);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push(ROUTES.ACCOUNT)
        } catch {
            return setError("Failed to create an account");
        }
        setLoading(false);
    }


    return (
        <div className="container">
            <div class="card my-5">
                <div class="card-body">
                    <h1>Sign up</h1>


                    <form className="my-3" onSubmit={handleSubmit}>
                        {/* This row is for first and last name */}
                        <div className="row">
                            <div className="input-field col s6">
                                <input placeholder="Placeholder" id="first_name" type="text" className="form-control" required/>
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="last_name" type="text" className="form-control"/>
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                        </div>

                        {/* This row is for email */}
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="form-control" required ref={emailRef}/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>

                        {/* This row is for password */}
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="form-control" required ref={passwordRef}/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                        {/* This row is for password confirmation */}
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="passwordConfrim" type="password" className="form-control" required ref={passwordConfirmRef} />
                                <label htmlFor="passwordConfirm">Confirm Password</label>
                            </div>
                        </div>

                        {error ? <p>{error}</p> : null}

                        <button type="submit" className="btn btn-primary" disabled={loading}>Sign up</button>
                    </form>

                    
                    <div>Already have an account? <Link to={ROUTES.LOGIN}>Log in</Link></div>
                </div>
            </div>
        </div>
    )
}

export default SignUp