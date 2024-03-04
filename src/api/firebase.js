import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPOrVrJQIMkDuC8filTzuJoy1QOUFLnCc",
  authDomain: "bernanda-portoweb.firebaseapp.com",
  projectId: "bernanda-portoweb",
  storageBucket: "bernanda-portoweb.appspot.com",
  messagingSenderId: "425054966889",
  appId: "1:425054966889:web:731ed924d90ff62871fef8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);


export { database };
