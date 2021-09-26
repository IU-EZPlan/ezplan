import React, {useRef, useState} from "react";
import { useAuth } from "../../context/AuthUserContext";
import { useHistory } from "react-router";
import * as ROUTES from '../../constants/routes';

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

    // on sibmit functional 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // If the password and the confirm password do not math
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match.")
        }

        try {
            setError("");
            setLoading(true);
            console.log(emailRef.current.value, passwordConfirmRef.current.value);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push(ROUTES.DASHBOARD)
        } catch {
            return setError("Failed to create an account");
        }
        setLoading(false);
    }


    return (
        <div className="container">
            <h1>Sign up</h1>
  
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    {/* This row is for first and last name */}
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Placeholder" id="first_name" type="text" className="validate" required/>
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="last_name" type="text" className="validate"/>
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                    </div>

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

                    {/* This row is for password confirmation */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="passwordConfrim" type="password" className="validate" required ref={passwordConfirmRef} />
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                        </div>
                    </div>

                    {error ? (
                        <p className="red-text">{error}</p>
                    ):null}

                    <button type="submit" disabled={loading}>Sign up</button>
                </form>
            </div>
            
            <div>Already have an account? Log in</div>
        </div>
    )
}

export default SignUp