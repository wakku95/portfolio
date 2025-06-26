// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDEvfy8ViEP2kv9IkNhS2iObRCsPMy27UI",
	authDomain: "portfolio-20e78.firebaseapp.com",
	projectId: "portfolio-20e78",
	storageBucket: "portfolio-20e78.firebasestorage.app",
	messagingSenderId: "735006747710",
	appId: "1:735006747710:web:75f61a39a29dae4790b56f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
