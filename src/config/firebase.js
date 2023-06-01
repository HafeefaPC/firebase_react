import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5-XgeY8lAinxClDPbsfaxpv3g3TpROqs",
  authDomain: "fir-course-2c133.firebaseapp.com",
  projectId: "fir-course-2c133",
  storageBucket: "fir-course-2c133.appspot.com",
  messagingSenderId: "859789562005",
  appId: "1:859789562005:web:f1ba95a83dfa2e57b0cb9c",
  measurementId: "G-KBR2Y32GYB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);