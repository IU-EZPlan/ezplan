import firebase from 'firebase/compat/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBLzGhvBRa7E2BiJr6N_3gCdb-t2bkHVF4",
    authDomain: "tour-management-93804.firebaseapp.com",
    projectId: "tour-management-93804",
    storageBucket: "tour-management-93804.appspot.com",
    messagingSenderId: "197250917552",
    appId: "1:197250917552:web:8e5d09d2bd09f6f2bc0775"
};

class Firebase {
    constructor() {
      firebase.initializeApp(config);

      this.auth = firebase.auth();
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
}
   
export default Firebase;