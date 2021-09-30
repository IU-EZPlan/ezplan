// https://www.youtube.com/watch?v=PKwu15ldZ7k

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from '../firebase';

// Creating a Context
const AuthContext = createContext();

// Exporting a function to be able to use the context above
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    // useState allows us to set and access the state of a variable throughout the entire app
    const [currentUser, setCurrentUser] = useState();

    // signup function uses auth from firebase to create a push a new user to the database.
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut(); 
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    // UseEffect is like a constructor. only runs once when the page is loaded
    useEffect(() => {        
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, [])

    const value = {
        currentUser, 
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}