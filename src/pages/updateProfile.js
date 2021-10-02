import React, {useRef, useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthUserContext";
import { useHistory } from "react-router";
import * as ROUTES from '../constants/routes';

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const fname = useRef();
    const lname = useRef();

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
            return setError("Passwords do not match.");
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


        
        Promise.all(promises).then(() => {
            history.push(ROUTES.ACCOUNT)
        }).catch(() => {
            setError("faild to update");
        }).finally(() => {
            setLoading(false);
        })

    }


    return (
        <div className="container-fluid m-3">
            <h1>Update Profile</h1>

  
            <div className="row">
                <div className="ccol-xs-12 col-sm-6 col-md-4 card">
                    <div className="card-body">
                      
                        <form className="" onSubmit={handleSubmit}>
                            {/* This row is for first and last name.  The name is not allowed to be changed. */}
                            <div className="row my-2">
                                <div className="input-field col s12">
                                    <input id="name" type="text" className="form-control" ref={fname} disabled defaultValue={currentUser.displayName} />
                                    <label htmlFor="first_name">Display Name</label>
                                </div>
                            </div>

                            {/* This row is for email */}
                            <div className="row my-2">
                                <div className="input-field col s12">
                                    <input id="email" type="email" className="form-control" required ref={emailRef} defaultValue={currentUser.email} />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>

                            {/* This row is for password */}
                            <div className="row my-2">
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="form-control" ref={passwordRef} placeholder="Leave blank to keep the same" />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>

                            {/* This row is for password confirmation */}
                            <div className="row my-2">
                                <div className="input-field col s12">
                                    <input id="passwordConfrim" type="password" className="form-control" ref={passwordConfirmRef} />
                                    <label htmlFor="passwordConfirm">Confirm Password</label>
                                </div>
                            </div>

                            {error ? (
                                <p className="red-text">{error}</p>
                            ):null}

                            <div>
                                <button type="submit" className="btn btn-primary mr-3" disabled={loading}>Save Changes</button>

                                <Link to={ROUTES.ACCOUNT}>
                                    <button type="button" className="btn btn-secondary">Cancel</button>
                                </Link>
                            </div>
                        </form>
  
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateProfile;