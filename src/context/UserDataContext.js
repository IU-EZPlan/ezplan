// https://www.youtube.com/watch?v=PKwu15ldZ7k

import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from '../firebase';
import { useAuth } from "./AuthUserContext";

// Creating a Context
const UserDataContext = createContext();

// Exporting a function to be able to use the context above
export const getUserData = () => {
    return useContext(UserDataContext)
}

export const UserDataProvider = ({children}) => {
    const { currentUser } = useAuth();

    // useState allows us to set and access the state of a variable throughout the entire app
    const [loading, setLoading] = useState(true);


    const value = {
        currentUser, 
        
    }

    return (
        <UserDataContext.Provider value={value}>
            {!loading && children}
        </UserDataContext.Provider>
    )
}