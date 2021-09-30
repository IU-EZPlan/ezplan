import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBLzGhvBRa7E2BiJr6N_3gCdb-t2bkHVF4",
    authDomain: "tour-management-93804.firebaseapp.com",
    projectId: "tour-management-93804",
    storageBucket: "tour-management-93804.appspot.com",
    messagingSenderId: "197250917552",
    appId: "1:197250917552:web:8e5d09d2bd09f6f2bc0775"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();

export default app;