import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDvQlceOaAy3zbhdXXwLDP5D6mrajBQh54",
    authDomain: "myincomemanager.firebaseapp.com",
    projectId: "myincomemanager",
    storageBucket: "myincomemanager.appspot.com",
    messagingSenderId: "752244240187",
    appId: "1:752244240187:web:ead52860d7d8dda36bd11e",
    measurementId: "G-KX00EG1E1X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseApi = {

    signUpWithEmail: (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    },
    signInWithEmail: (email,password) => {
        return signInWithEmailAndPassword(auth, email, password)
    },
    setNewPassword: (newPassword) => {
        return updatePassword(auth.currentUser, newPassword);
    }
}

export default FirebaseApi;