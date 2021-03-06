import React, {useRef, useState} from "react";
import { useAuth } from "../context/AuthUserContext";
import { useHistory } from "react-router";
import * as ROUTES from '../constants/routes';
import { Link } from "react-router-dom";
import { database } from "../firebase";

import logo from "../photos/logos/logo-black.png";


const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const fname = useRef();
    const lname = useRef();

    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


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
        
        if (!passwordReq(passwordRef.current.value)) {
            return
        }

        try {
            setError("");
            setLoading(true);

            const res =  await signup(emailRef.current.value, passwordRef.current.value);
            const newUser = res.user;

            await newUser.updateProfile({
                displayName: fname.current.value + " " + lname.current.value,
                photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            });

            // If we were using firestore database
            await database.collection('users').doc(newUser.uid).set({
                email: newUser.email,
                first_name: fname.current.value,
                last_name: lname.current.value,
                photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            });

            await database.collection('users').doc(newUser.uid).collection('trips').doc('setup').set({'setup': true})

            history.push(ROUTES.ACCOUNT);
        } catch {
            return setError("Failed to create an account");
        }


        setLoading(false);
    }


    return (
        <div className="signup">
            <div className="w-75">
                <div className="text-center">

                <img src={logo} alt="logo" className="mx-auto w-25" />
                </div>


                <div className="card-body">
                    <h3 className="text-center mb-5">Sign Up for EZ Plan</h3>


                    <form className="my-3" onSubmit={handleSubmit}>
                        {/* This row is for first and last name */}
                        <div className="row my-2">
                            <div className="input-field col-sm-6">
                                <input id="first_name" type="text" className="form-control" required ref={fname} placeholder="Ex. John"/>
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="input-field col-sm-6">
                                <input id="last_name" type="text" className="form-control" ref={lname} placeholder="Ex. Doe" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                        </div>

                        {/* This row is for email */}
                        <div className="row my-2">
                            <div className="input-field col-12">
                                <input id="email" type="email" className="form-control" required ref={emailRef} placeholder="Ex. johndoe3@gmail.com"/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>

                        {/* This row is for password */}
                        <div className="row my-2">
                            <div className="input-field col-12">
                                <input id="password" type="password" className="form-control" required ref={passwordRef}/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                        {/* This row is for password confirmation */}
                        <div className="row my-2">
                            <div className="input-field col-12">
                                <input id="passwordConfrim" type="password" className="form-control" required ref={passwordConfirmRef} />
                                <label htmlFor="passwordConfirm">Confirm Password</label>
                            </div>
                        </div>

                        {error ? <p className="text-danger">{error}</p> : null}

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary my-3 btn-block" disabled={loading}>Sign up</button>
                            <div>Already have an account? <Link to={ROUTES.LOGIN}>Log in</Link></div>
                        </div>
                    </form>

                    
                </div>
            </div>
        </div>
    )
}

export default SignUp