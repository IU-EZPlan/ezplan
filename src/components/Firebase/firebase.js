// import firebase from 'firebase/compat/app';
import app, { database } from 'firebase/app';
import firebase from "firebase";

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBLzGhvBRa7E2BiJr6N_3gCdb-t2bkHVF4",
    authDomain: "tour-management-93804.firebaseapp.com",
    projectId: "tour-management-93804",
    storageBucket: "tour-management-93804.appspot.com",
    messagingSenderId: "197250917552",
    appId: "1:197250917552:web:8e5d09d2bd09f6f2bc0775"
};

// const app = initializeApp(firebaseConfig);
class Firebase {
    constructor() {
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        // app.initializeApp(firebaseConfig);

        this.auth = firebaseApp.auth();
        this.db = firebaseApp.database();
    }

    // *** Auth API ***
 
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***
 
    user = uid => this.db.ref(`users/${uid}`);
 
    users = () => this.db.ref('users');
}

export default Firebase;