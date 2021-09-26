import React, {useRef, useState} from "react";
import { useAuth } from "../context/AuthUserContext";
import { useHistory } from "react-router";
import * as ROUTES from '../constants/routes';

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    // TODO: need to add functionality to check that a password is strong enough
    // currently the passwird must be at least 6 characters long to meet firebase standards

    // on sibmit functional 
    const handleSubmit = (e) => {
        e.preventDefault();

        // If the password and the confirm password do not math
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match.")
        }

        setError("");
        setLoading(true);


        const promises = [];
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value !== currentUser.password) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        // Also need to check if the name has changed.


        
        Promise.all(promises).then(() => {
            history.push(ROUTES.DASHBOARD)
        }).catch(() => {
            setError("faild to update");
        }).finally(() => {
            setLoading(false);
        })


    }


    return (
        <div className="container">
            <h1>Update Profile</h1>
  
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
                            <input id="email" type="email" className="validate" required ref={emailRef} defaultValue={currentUser.email} />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>

                    {/* This row is for password */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" ref={passwordRef} placeholder="Leave blank to keep the same" />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>

                    {/* This row is for password confirmation */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="passwordConfrim" type="password" className="validate" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                        </div>
                    </div>

                    {error ? (
                        <p className="red-text">{error}</p>
                    ):null}

                    <button type="submit" disabled={loading}>Save Changes</button>
                </form>

                {/* Add in cancel button and redirect back to dashboard */}
            </div>
            
            <div>Already have an account? Log in</div>
        </div>
    )
}

export default UpdateProfile;