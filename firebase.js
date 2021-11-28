// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCS174Wqh0eMYiVxcRa4KyBValicEPI5z4",
    authDomain: "insta-2-332011.firebaseapp.com",
    projectId: "insta-2-332011",
    storageBucket: "insta-2-332011.appspot.com",
    messagingSenderId: "260786856242",
    appId: "1:260786856242:web:c9a4623c33634b54acf72b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage  }