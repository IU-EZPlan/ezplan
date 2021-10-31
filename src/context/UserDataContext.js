// https://www.youtube.com/watch?v=PKwu15ldZ7k

import React, { createContext, useContext, useState, useEffect } from "react";
import { database, auth } from '../firebase';
import { useAuth } from "./AuthUserContext";

// Creating a Context
const UserDataContext = createContext();

// Exporting a function to be able to use the context above
export const FirestoreData = () => {
    return useContext(UserDataContext)
}

export const UserDataProvider = ({children}) => {
    const { currentUser } = useAuth();

    // useState allows us to set and access the state of a variable throughout the entire app
    const [loading, setLoading] = useState(true);

    async function tripData() {
        var list_of_trips = [];

        await database.collection('users').doc(currentUser.uid).collection('trips').onSnapshot((snap) => {
            snap.forEach((doc) => {
                list_of_trips.push({id: doc.id, ...doc.data()})
            });
        });

        return list_of_trips
    }

    useEffect(() => { 
        const unsubscribe = auth.onAuthStateChanged(user => {
            // setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, [])

    const value = {
        currentUser, 
        tripData
    }

    return (
        <UserDataContext.Provider value={value}>
            {!loading && children}
        </UserDataContext.Provider>
    )
}