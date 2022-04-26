import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANlmiffDUh1yp28mxGh7ChWVGeKK8CWTA",
  authDomain: "taller-2-react.firebaseapp.com",
  projectId: "taller-2-react",
  storageBucket: "taller-2-react.appspot.com",
  messagingSenderId: "757813928689",
  appId: "1:757813928689:web:2e9c5b6bb9c2d56b807f50"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}