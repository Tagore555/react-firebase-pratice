import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCL-LafOa6Y-Ygv8rYv2caa8Wwsyd4bWaM",
    authDomain: "connection-pratice.firebaseapp.com",
    projectId: "connection-pratice",
    storageBucket: "connection-pratice.appspot.com",
    messagingSenderId: "979006274938",
    appId: "1:979006274938:web:65f8abb37150fbd6426ac3",
    measurementId: "G-0S2X0Y8G9R"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { auth,googleAuth,db,storage };
