import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDconq6_QNrXKHqs8KGqS46HsyUFCz7s3Y",
  authDomain: "moguri-c42db.firebaseapp.com",
  projectId: "moguri-c42db",
  storageBucket: "moguri-c42db.appspot.com",
  messagingSenderId: "909960395719",
  appId: "1:909960395719:web:2fda9eaa0fcdd43288f7e2",
  measurementId: "G-BGCLJ971FL",
};

firebase.initializeApp(config);

export default firebase;
